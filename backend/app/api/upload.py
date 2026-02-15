from fastapi import APIRouter, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
from redis import Redis
from rq import Queue, Retry
import logging

from app.core.database import get_db
from app.core.config import REDIS_URL
from app.models.company import Company
from app.utils.csv_parser import parse_csv
from app.workers.enrich_worker import enrich_job
from app.schemas.company import CompanyResponse

router = APIRouter()
logger = logging.getLogger(__name__)

redis_conn = Redis.from_url(REDIS_URL, decode_responses=False)
queue = Queue("enrichment", connection=redis_conn)


@router.post("/upload")
async def upload_csv(file: UploadFile, db: Session = Depends(get_db)):
    try:
        contents = await file.read()
        domains = parse_csv(contents)
    except Exception as e:
        logger.exception("CSV parsing failed")
        raise HTTPException(status_code=400, detail="Invalid CSV file")

    created_ids = []
    skipped = 0

    for domain in domains:
        
        existing = (
            db.query(Company)
            .filter(Company.domain == domain)
            .first()
        )

    

        if existing:
            skipped += 1
            continue

        company = Company(domain=domain, status="pending")
        db.add(company)
        db.commit()
        db.refresh(company)

        created_ids.append(str(company.id))

        try:
            queue.enqueue(
                "app.workers.enrich_worker.enrich_job",
                str(company.id),
                retry=Retry(max=3, interval=[10, 30, 60]),
            )
        except Exception:
            logger.exception("Failed to enqueue job")
            company.status = "failed"
            db.commit()

    return {
        "message": "Processing started",
        "created": len(created_ids),
        "skipped": skipped,
    }


@router.get("/companies", response_model=list[CompanyResponse])
def list_companies(db: Session = Depends(get_db)):
    return db.query(Company).order_by(Company.created_at.desc()).all()
