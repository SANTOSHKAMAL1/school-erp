"""Arundhati Gurukulam — FastAPI app. Serves the API, uploaded files and the built React site."""
import mimetypes
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from . import config
from .db import Base, SessionLocal, engine
from .routers import academics, auth, classwork, comms, office, people, public, records
from .seed import ensure_base_data

app = FastAPI(title="Arundhati Gurukulam", docs_url="/api/docs", openapi_url="/api/openapi.json", redoc_url=None)

for r in (auth, public, people, academics, records, classwork, comms, office):
    app.include_router(r.router)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        ensure_base_data(db)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    resp = await call_next(request)
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    resp.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    resp.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    if request.url.path.startswith("/api/"):
        resp.headers.setdefault("Cache-Control", "no-store")
    return resp


@app.get("/api/health")
def health():
    return {"ok": True}


@app.api_route("/api/{rest:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
def api_404(rest: str):
    raise HTTPException(404, "Not found.")


@app.get("/uploads/{path:path}")
def uploads(path: str, download: int = 0):
    base = config.UPLOAD_DIR.resolve()
    f = (base / path).resolve()
    if base not in f.parents or not f.is_file():
        raise HTTPException(404, "File not found.")
    name = f.name.split("-", 1)[1] if "-" in f.name else f.name
    headers = {"Cache-Control": "public, max-age=86400"}
    if download:
        return FileResponse(f, filename=name, headers=headers)
    return FileResponse(f, headers={**headers, "Content-Disposition": f'inline; filename="{name}"'})


# ---------------- React build ----------------
DIST = config.FRONTEND_DIST
if (DIST / "static").is_dir():
    app.mount("/static", StaticFiles(directory=DIST / "static"), name="static")


@app.get("/{full_path:path}")
def spa(full_path: str):
    if not DIST.is_dir():
        return JSONResponse({"detail": "Front end not built. Run: cd frontend && npm install && npm run build"}, 503)
    target = (DIST / full_path).resolve()
    if full_path and DIST.resolve() in target.parents and target.is_file():
        cache = "public, max-age=604800" if full_path.startswith(("assets/", "images/", "docs/")) else "no-cache"
        return FileResponse(target, headers={"Cache-Control": cache})
    return FileResponse(DIST / "index.html", headers={"Cache-Control": "no-cache"})
