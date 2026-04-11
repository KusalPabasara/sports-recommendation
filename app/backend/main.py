"""
Sports Recommendation API — FastAPI application.

Serves the exact stacking ensemble + discovery score models from the
ICDSIAI-26 paper for real-time sports recommendations.
"""

import sys
import os
import logging
import traceback
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ensure project src is importable for preprocessor dependencies
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, PROJECT_ROOT)

from app.backend.schemas import (
    RecommendRequest,
    RecommendResponse,
    SportInfo,
    SportRecommendation,
    UserFeatures,
)
from app.backend.inference import model_server


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load models at startup."""
    print("Loading models...")
    model_server.load()
    print("Models loaded successfully.")
    yield
    print("Shutting down.")


app = FastAPI(
    title="Sports Recommendation API",
    description=(
        "Interest-driven personalized sports recommendation using "
        "classical ensemble learning with a novel-sport discovery mechanism. "
        "Accepted at ICDSIAI-26."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok", "model_loaded": model_server._loaded}


@app.get("/api/sports", response_model=list[SportInfo])
async def get_sports():
    """Return list of all 20 sports with display names."""
    if not model_server._loaded:
        raise HTTPException(status_code=503, detail="Models not loaded yet")
    return model_server.get_sports()


@app.post("/api/recommend", response_model=RecommendResponse)
async def recommend(request: RecommendRequest):
    """
    Get personalized sport recommendations.

    Accepts 29 user features + optional tried sports list.
    Returns top-K play, watch, and discovery recommendations.
    """
    if not model_server._loaded:
        raise HTTPException(status_code=503, detail="Models not loaded yet")

    # Convert Pydantic model to flat dict for inference
    features = _flatten_features(request.features)

    try:
        result = model_server.predict(
            features=features,
            tried_sports=request.tried_sports,
            top_k=request.top_k,
        )
    except Exception as e:
        logger.error("Prediction error:\n%s", traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

    return RecommendResponse(
        play_recommendations=[SportRecommendation(**r) for r in result["play_recommendations"]],
        watch_recommendations=[SportRecommendation(**r) for r in result["watch_recommendations"]],
        discovery_recommendations=[SportRecommendation(**r) for r in result["discovery_recommendations"]],
        feature_importance=result["feature_importance"],
    )


def _flatten_features(uf: UserFeatures) -> dict:
    """Flatten Pydantic UserFeatures into the dict expected by inference."""
    return {
        "interest_team_vs_individual": uf.interest_team_vs_individual,
        "interest_outdoor_preference": uf.interest_outdoor_preference,
        "interest_competition_drive": uf.interest_competition_drive,
        "interest_risk_tolerance": uf.interest_risk_tolerance,
        "interest_creative_expression": uf.interest_creative_expression,
        "interest_social_enjoyment": uf.interest_social_enjoyment,
        "interest_endurance_interest": uf.interest_endurance_interest,
        "interest_power_interest": uf.interest_power_interest,
        "interest_speed_agility_interest": uf.interest_speed_agility_interest,
        "interest_spectator_engagement": uf.interest_spectator_engagement,
        "interest_ambition_level": uf.interest_ambition_level,
        "interest_strategy_preference": uf.interest_strategy_preference,
        "strength_endurance_self": uf.strength_endurance_self,
        "strength_strength_self": uf.strength_strength_self,
        "strength_speed_self": uf.strength_speed_self,
        "strength_flexibility_self": uf.strength_flexibility_self,
        "strength_coordination_self": uf.strength_coordination_self,
        "strength_agility_self": uf.strength_agility_self,
        "strength_reaction_time_self": uf.strength_reaction_time_self,
        "strength_strategy_self": uf.strength_strategy_self,
        "age": uf.age,
        "height_cm": uf.height_cm,
        "weight_kg": uf.weight_kg,
        "sprint_100m_s": uf.sprint_100m_s,
        "jump_cm": uf.jump_cm,
        "gender": uf.gender,
        "region": uf.region,
        "facility_access": uf.facility_access,
    }
