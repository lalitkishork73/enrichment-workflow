import asyncio
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.company import Company
from app.services.explorium_client import enrich_company


def enrich_job(company_id: str):
    db: Session = SessionLocal()
    company = None

    try:
        print(f"[WORKER] Starting job for {company_id}")

        company = db.get(Company, company_id)
        if not company:
            print("[WORKER] Company not found")
            return

        company.status = "processing"
        db.commit()

        print(f"[WORKER] Calling Explorium for {company.domain}")

        resp = asyncio.run(enrich_company(company.domain))

        if not resp or "data" not in resp:
            print("[WORKER] No enrichment data")
            company.status = "failed"
            db.commit()
            return

        data = resp["data"]

        company.industry = data.get("linkedin_industry_category")
        company.company_size = data.get("number_of_employees_range")
        company.revenue_range = data.get("yearly_revenue_range")

        company.status = "completed"

        print(f"[WORKER] Completed enrichment for {company.domain}")

    except Exception as e:
        print("[WORKER ERROR]:", str(e))
        if company:
            company.status = "failed"

    finally:
        db.commit()
        db.close()
