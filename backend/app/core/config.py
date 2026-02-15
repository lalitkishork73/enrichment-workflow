import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    # "postgresql://postgres:postgres@localhost:5432/enrichment_db"
)

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

EXPLORIUM_API_KEY = os.getenv("EXPLORIUM_API_KEY", "your_api_key_here")
