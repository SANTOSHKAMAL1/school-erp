"""Uploaded files: Vercel Blob when a store is connected, otherwise UPLOAD_DIR on disk.

`save` returns what to keep in the database: a full https:// URL for Blob, or the path under
UPLOAD_DIR for disk (served by the /uploads route in main.py)."""
import logging

from . import config

logger = logging.getLogger(__name__)


async def save(rel: str, data: bytes, content_type: str | None = None) -> str:
    if config.BLOB_ENABLED:
        from vercel.blob import put_blob
        blob = await put_blob(rel, data, access="public", content_type=content_type)
        return blob.url
    dest = config.UPLOAD_DIR / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    return rel


def remove(stored: str):
    if stored.startswith("https://"):
        from vercel.blob.sync import delete_blob
        try:
            delete_blob(stored)
        except Exception:                   # a missing file shouldn't block replacing it
            logger.warning("Could not delete blob %s", stored, exc_info=True)
    else:
        (config.UPLOAD_DIR / stored).unlink(missing_ok=True)


def url_for(stored: str) -> str:
    return stored if stored.startswith("https://") else f"/uploads/{stored}"
