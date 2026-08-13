"""Vercel entrypoint for the SportFit FastAPI service."""

from app.backend.main import app

__all__ = ["app"]
