"""Pydantic request/response models for the Sports Recommendation API."""

from typing import List, Optional
from pydantic import BaseModel, Field


class UserFeatures(BaseModel):
    """29 user features matching the paper's feature schema."""

    # Interests (12 Likert 1-5)
    interest_team_vs_individual: int = Field(3, ge=1, le=5, description="1=solo, 5=team")
    interest_outdoor_preference: int = Field(3, ge=1, le=5, description="1=indoor, 5=outdoor")
    interest_competition_drive: int = Field(3, ge=1, le=5, description="1=casual, 5=fierce")
    interest_risk_tolerance: int = Field(3, ge=1, le=5, description="1=safe, 5=thrill-seeking")
    interest_creative_expression: int = Field(3, ge=1, le=5, description="1=routine, 5=creative")
    interest_social_enjoyment: int = Field(3, ge=1, le=5, description="1=solitary, 5=social")
    interest_endurance_interest: int = Field(3, ge=1, le=5, description="1=low, 5=high")
    interest_power_interest: int = Field(3, ge=1, le=5, description="1=low, 5=high")
    interest_speed_agility_interest: int = Field(3, ge=1, le=5, description="1=low, 5=high")
    interest_spectator_engagement: int = Field(3, ge=1, le=5, description="1=not a fan, 5=avid watcher")
    interest_ambition_level: int = Field(3, ge=1, le=5, description="1=recreational, 5=aspires to compete")
    interest_strategy_preference: int = Field(3, ge=1, le=5, description="1=physical, 5=highly strategic")

    # Strengths (8 Likert 1-5)
    strength_endurance_self: int = Field(3, ge=1, le=5, description="Self-rated endurance")
    strength_strength_self: int = Field(3, ge=1, le=5, description="Self-rated strength")
    strength_speed_self: int = Field(3, ge=1, le=5, description="Self-rated speed")
    strength_flexibility_self: int = Field(3, ge=1, le=5, description="Self-rated flexibility")
    strength_coordination_self: int = Field(3, ge=1, le=5, description="Self-rated coordination")
    strength_agility_self: int = Field(3, ge=1, le=5, description="Self-rated agility")
    strength_reaction_time_self: int = Field(3, ge=1, le=5, description="Self-rated reaction time")
    strength_strategy_self: int = Field(3, ge=1, le=5, description="Self-rated strategic ability")

    # Physical metrics (6 continuous)
    age: float = Field(22, ge=10, le=80, description="Age in years")
    height_cm: float = Field(170, ge=100, le=230, description="Height in cm")
    weight_kg: float = Field(70, ge=30, le=200, description="Weight in kg")
    sprint_100m_s: float = Field(14.0, ge=9, le=30, description="100m sprint time in seconds")
    jump_cm: float = Field(40, ge=10, le=120, description="Standing jump in cm")

    # Demographics (3)
    gender: str = Field("male", description="male, female, or other")
    region: str = Field("south_asia", description="south_asia, east_asia, europe, americas, africa, oceania")
    facility_access: int = Field(3, ge=1, le=5, description="1=no access, 5=full gym")


class TriedSports(BaseModel):
    """Sports the user has already tried, for discovery filtering."""
    tried: List[str] = Field(default_factory=list, description="List of sport IDs the user has tried")


class RecommendRequest(BaseModel):
    """Combined request for all recommendations."""
    features: UserFeatures
    tried_sports: List[str] = Field(default_factory=list, description="Sports the user has tried")
    top_k: int = Field(5, ge=1, le=20, description="Number of recommendations to return")


class SportRecommendation(BaseModel):
    """A single sport recommendation."""
    sport_id: str
    sport_name: str
    score: float
    rank: int
    is_discovery: bool = False


class RecommendResponse(BaseModel):
    """Full recommendation response."""
    play_recommendations: List[SportRecommendation]
    watch_recommendations: List[SportRecommendation]
    discovery_recommendations: List[SportRecommendation]
    feature_importance: dict


class SportInfo(BaseModel):
    """Metadata about a sport."""
    sport_id: str
    display_name: str
