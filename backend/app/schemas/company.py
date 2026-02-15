from pydantic import BaseModel
from uuid import UUID

class CompanyResponse(BaseModel):
    id: UUID
    domain: str
    industry: str | None
    company_size: str | None
    revenue_range: str | None
    status: str

    class Config:
        from_attributes = True
