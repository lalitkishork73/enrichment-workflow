import httpx
from app.core.config import EXPLORIUM_API_KEY

BASE_URL = "https://api.explorium.ai/v1"


async def enrich_company(domain: str):
    headers = {
        "api_key": EXPLORIUM_API_KEY,  # ✅ exact header from docs
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=30) as client:

        # ✅ STEP 1 — match business (CORRECT payload)
        match_payload = {
            "businesses_to_match": [
                {"domain": domain}
            ]
        }

        match_resp = await client.post(
            f"{BASE_URL}/businesses/match",
            headers=headers,
            json=match_payload,
        )

        print("MATCH STATUS:", match_resp.status_code)
        print("MATCH TEXT:", match_resp.text)

        match_resp.raise_for_status()
        match_data = match_resp.json()

        # ⚠️ Partner API returns list
        businesses = match_data.get("matched_businesses", [])
        if not businesses:
            return None

        business_id = businesses[0].get("business_id")
        if not business_id:
            return None

        # ✅ STEP 2 — firmographic enrichment
        enrich_payload = {
            "business_id": business_id
        }

        enrich_resp = await client.post(
            f"{BASE_URL}/businesses/firmographics/enrich",
            headers=headers,
            json=enrich_payload,
        )

        print("ENRICH STATUS:", enrich_resp.status_code)
        print("ENRICH TEXT:", enrich_resp.text)

        enrich_resp.raise_for_status()
        return enrich_resp.json()
