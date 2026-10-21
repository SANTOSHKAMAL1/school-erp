"""Settings, read from environment variables (see .env.example)."""
import os
import secrets
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent          # backend/
load_dotenv(BASE_DIR / ".env")

ROOT_DIR = BASE_DIR.parent                                  # project root
ON_VERCEL = bool(os.getenv("VERCEL"))
# Vercel's disk is read-only except /tmp, which is wiped often: use DATABASE_URL + Blob there
DATA_DIR = Path(os.getenv("AG_DATA_DIR") or ("/tmp/arundhati-gurukulam" if ON_VERCEL else BASE_DIR / "data"))
UPLOAD_DIR = DATA_DIR / "uploads"
DB_PATH = DATA_DIR / "gurukulam.db"
FRONTEND_DIST = Path(os.getenv("AG_FRONTEND_DIST", ROOT_DIR / "frontend" / "dist"))

# Postgres when set (the Neon integration on Vercel sets these), otherwise SQLite at DB_PATH
DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL") or ""
# Uploads go to Vercel Blob when a Blob store is connected, otherwise to UPLOAD_DIR
BLOB_ENABLED = bool(os.getenv("BLOB_READ_WRITE_TOKEN") or os.getenv("BLOB_STORE_ID"))

DATA_DIR.mkdir(parents=True, exist_ok=True)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def _secret() -> str:
    env = os.getenv("AG_SECRET_KEY")
    if env:
        return env
    f = DATA_DIR / ".secret_key"           # generated once, kept with the data
    if not f.exists():
        f.write_text(secrets.token_urlsafe(48))
    return f.read_text().strip()


SECRET_KEY = _secret()
SESSION_HOURS = int(os.getenv("AG_SESSION_HOURS", "12"))
REMEMBER_DAYS = int(os.getenv("AG_REMEMBER_DAYS", "30"))
COOKIE_SECURE = os.getenv("AG_COOKIE_SECURE", "1" if ON_VERCEL else "0") == "1"   # set 1 behind HTTPS

SUPERADMIN_LOGIN = os.getenv("AG_SUPERADMIN_LOGIN", "superadmin")
SUPERADMIN_PASSWORD = os.getenv("AG_SUPERADMIN_PASSWORD", "Gurukulam@2026")
SUPERADMIN_NAME = os.getenv("AG_SUPERADMIN_NAME", "Super Admin")

MAX_PDF_BYTES = 40 * 1024 * 1024
MAX_IMAGE_BYTES = 15 * 1024 * 1024

# SMTP / Email OTP configuration
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER)
SMTP_FROM_NAME = os.getenv("SMTP_FROM_NAME", "Arundhati Gurukulam")
SMTP_TLS = os.getenv("SMTP_TLS", "1") == "1"

