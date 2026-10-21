# Arundhati Gurukulam — website + school portal

**Build 01** · React front end · FastAPI (Python) back end · SQLite

The public website (Home, Admissions, Contact, Mandatory Disclosure, Login) looks and behaves exactly as before. Each page was converted from the old 7.5 MB single file into real React components. Behind it is a portal with four kinds of login:

| Who | Creates | Can do |
|---|---|---|
| **Super Admin** | Departments, HODs | Everything. Also edits website content (ticker, FAQs, term dates, holidays, school details), notices on the home page, Mandatory Disclosure text + PDFs, fees, enquiries, activity log |
| **HOD** | Teachers, classes, subjects | Their own department: teachers, classes, timetables, students, attendance, results, circulars, leave |
| **Teacher** | Students (with a family login) | Their classes: attendance, marks, homework, timetable, circulars, messages, leave |
| **Parent / Student** (one login) | — | Dashboard, attendance calendar, results, homework, timetable, fees + receipts, circulars, messages to the class teacher, leave requests |

**ERP screens (Build 02):**
- **Classes & sections** — every grade as a card; open one to see its sections with student count and class teacher; open a section for its workspace: Overview, Students, Attendance, Exams & results, Homework, Study material, Participation, Timetable.
- **Exams & results** — one sheet per class for Mid-term, Quarterly, Half-yearly and Annual (or any other test): all subjects × all students, totals, % and rank. Subject teachers type their own column; the class teacher (or HOD / admin) presses **Announce result** and families see it in the **Report card**.
- **Faculty** (HOD, admin) — each teacher as a card with the section they look after, every subject and class they teach, and their weekly timetable.
- **Family portal** — report card from Mid-term to Annual, today's homework, study-material PDFs, activities & prizes, parent–teacher meetings, and *Call the school* / *Call the class teacher* buttons.
- **Edit the live website** (admin, HOD) — open the site with `/?edit=1` (or press *Edit this page*): click any text or photo to change it, or add a notice, circular or event with a PDF to the home page boards. Edits are stored as replacements and show for every visitor straight away; *Undo all edits* puts the original back.
- **Demo school** (admin → Setup) — one button loads a full sample school with ready logins (`hod.primary`, `t.anitha`, family `9876543210`, password `Demo@1234`); one button removes it again before going live. Same as `python -m app.seed --demo` / `--remove-demo`.

Everyone signs in on `/login` and picks their role tab. Every new account gets a temporary password, and the system asks them to change it the first time they sign in.

## Folder layout
```
backend/   FastAPI app (app/), requirements.txt, .env.example
frontend/  React source (src/) and the built site (dist/, committed — the server needs no Node)
deploy/    systemd unit + nginx config
```

## Run on the VPS (same pattern as the other juooa.cloud apps)
```bash
cd /root && git clone <repo> arundhati-gurukulam && cd arundhati-gurukulam/backend
python3 -m venv venv && venv/bin/pip install -r requirements.txt
cp .env.example .env && nano .env              # set AG_SUPERADMIN_PASSWORD
venv/bin/python -m app.seed                    # creates the database + super admin
cp ../deploy/arundhati-gurukulam.service /etc/systemd/system/
systemctl daemon-reload && systemctl enable --now arundhati-gurukulam
cp ../deploy/nginx.conf /etc/nginx/sites-available/arundhatigurukulam
ln -s /etc/nginx/sites-available/arundhatigurukulam /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx && certbot --nginx -d arundhatigurukulam.ac.in -d www.arundhatigurukulam.ac.in
```
Updates: `git pull && systemctl restart arundhati-gurukulam`

**Try it with sample data** (optional, before real use): `venv/bin/python -m app.seed --demo` (or *Demo school* in the admin portal) adds 3 departments, 3 HODs, 16 teachers, 16 sections and 128 students with attendance, Mid-term and Quarterly results, homework, study PDFs, participation and a parent–teacher meeting. All demo accounts use the password `Demo@1234`: `hod.primary`, `t.anitha`, and the family mobile `9876543210`. `python -m app.seed --remove-demo` (or *Remove demo school*) takes it all out again; records the school added itself stay.

**Forgot the super admin password:** `venv/bin/python -m app.seed --reset-superadmin` sets it back to the password in `.env`.

## Host on Vercel
`vercel.json` runs the React site and the FastAPI backend as two services in one Vercel project (`/api/*` and `/uploads/*` go to the backend, everything else to the site).
1. Import the repo in Vercel and keep the **Services** preset.
2. Under **Storage**, connect a **Neon** Postgres database (sets `DATABASE_URL`) and a **Blob** store with public access (sets `BLOB_READ_WRITE_TOKEN`). Without these the database and uploads live in `/tmp` and are lost whenever Vercel starts a new instance.
3. Add environment variables: `AG_SECRET_KEY` (a long random string), `AG_SUPERADMIN_PASSWORD`, `AG_SUPERADMIN_NAME`, and the `SMTP_*` values from `.env.example`. Then redeploy.

The super admin account is created on the first request. Vercel caps request bodies at 4.5 MB, so uploads on Vercel must be smaller than that, even though the app itself allows up to 40 MB.

## Change the front end
```bash
cd frontend && npm install && npm run dev      # dev server on :5173 (API proxied to :8120)
npm run build                                   # writes frontend/dist — commit it
```

## Where things live
- Database + uploads: `backend/data/` (back this folder up)
- API docs: `/api/docs`
- Converted design pages: `frontend/src/pages/<Page>/` — `template.jsx` (markup), `logic.js` (behaviour), `page.css`
- Portal: `frontend/src/portal/`

## Moving from the old single-file version
The old root files are replaced by `frontend/` and `backend/`. After you extract this build over the old repo, delete the old files (the new site no longer uses them):
```bash
rm -rf index.html api admin package.json package-lock.json images docs
git add -A && git commit -m "Build 01: React + FastAPI portal"
```
The images and the three disclosure PDFs are now in `frontend/public/`.
