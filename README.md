# Company Enrichment Workflow

## Overview

This project implements a **production-thinking company enrichment pipeline** similar to modern outbound data platforms. It allows users to upload a CSV of company domains, enriches the companies via the Explorium API, and displays results in a simple dashboard.

The system is designed with clean architecture, asynchronous processing, and containerized deployment in mind.

### 🔍 System Workflow Preview

![Workflow Preview](https://raw.githubusercontent.com/lalitkishork73/HTML-games/main/image.png)

---

## Demo Reference

### 🧪 Demo CSV

You can use the following sample CSV to test the system:

👉 https://raw.githubusercontent.com/lalitkishork73/HTML-games/main/domain.csv

Upload this file from the frontend to see the enrichment pipeline in action.

---

## What Was Built

### Backend

* FastAPI service for CSV ingestion and company APIs
* PostgreSQL for persistent storage
* Redis + RQ for background job processing
* Explorium integration using match → enrich flow
* Retry handling for failed enrichment jobs
* Dockerized backend and worker

### Frontend

* Next.js application
* React Query for server state management
* Tailwind CSS for styling
* CSV upload UI
* Live enrichment status table

### Infrastructure

* Docker Compose orchestration
* Separate backend and worker containers
* Environment-based configuration

---

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Redis
* RQ (Redis Queue)
* httpx
* Docker

### Frontend

* Next.js
* React
* TanStack React Query
* Tailwind CSS
* Axios

### DevOps / Infra

* Docker
* Docker Compose

---

## Architecture Flow

1. User uploads CSV from frontend
2. Backend parses domains
3. Companies stored with `pending` status
4. Job pushed to Redis queue
5. Worker processes enrichment:

   * Match business
   * Enrich firmographics
6. PostgreSQL updated
7. Frontend polls and displays results

---

## Environment Variables

Environment files are separated per service.

---

### Root `.env` (for Docker Compose)

**Location:** project root

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/enrichment
REDIS_URL=redis://localhost:6379/0
EXPLORIUM_API_KEY=your_api_key_here
```

This is injected into backend and worker containers by Docker Compose.

---

### Backend `.env`

**Location:** `backend/.env`

Used when running backend locally (without Docker).

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/enrichment
REDIS_URL=redis://localhost:6379/0
EXPLORIUM_API_KEY=your_api_key_here
```

---

### Frontend `.env.local`

**Location:** `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Running the Project

### Option 1 — Docker (Recommended)

From project root:

```bash
docker compose up --build
```

Services started:

* Backend → http://localhost:8000
* Frontend → http://localhost:3000
* PostgreSQL
* Redis
* Worker

---

### Option 2 — Local Development

#### Backend

```bash
cd backend
uvicorn app.main:app --reload
```

#### Worker

```bash
cd backend
python worker.py
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Key Tradeoffs

### 1. RQ over Celery

**Why chosen:**

* Simpler setup
* Redis already required
* Faster to implement within assignment scope

**Tradeoff:**

* Less feature-rich than Celery for large-scale workloads

---

### 2. Polling Instead of WebSockets

**Why chosen:**

* Simpler frontend implementation
* Sufficient for small batch enrichment

**Tradeoff:**

* Not real-time push
* Slightly more network overhead

---

### 3. Basic Data Mapping

**Why chosen:**

* Focus on core enrichment flow
* Keep schema minimal

**Tradeoff:**

* Not all Explorium fields are persisted

---

### 4. Single Worker Queue

**Why chosen:**

* Keeps architecture simple
* Enough for expected batch size

**Tradeoff:**

* Limited horizontal scalability without more queues

---

## What I Would Improve Next

If given more time, I would:

* Add bulk enrichment batching
* Add exponential backoff retry strategy
* Introduce structured logging
* Add Alembic migrations
* Improve frontend UX feedback
* Add rate limiting protection
* Add health checks for services
* Add unit and integration tests

---

## Notes

* The system is designed for small batch enrichment (5–20 domains).
* Worker must be running for enrichment to complete.
* Explorium API key is required for successful enrichment.

---

**End of README**
