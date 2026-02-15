from redis import Redis
from rq import SimpleWorker
from app.core.config import REDIS_URL

redis_conn = Redis.from_url(REDIS_URL, decode_responses=False)

if __name__ == "__main__":
    print("RQ SimpleWorker starting (Windows mode)...")
    worker = SimpleWorker(["enrichment"], connection=redis_conn)
    worker.work()
