"""Default website content — the exact values the original pages shipped with.
The admin console edits copies of these stored in the database."""

DEFAULTS = {
    "ticker": [
        {"text": "Admissions for 2027–28 are open — Nursery to Grade 10"},
        {"text": "Ganesha Chaturthi holiday: school closed 5 September"},
        {"text": "Parent–teacher meeting for Grades 6–8 on 20 September"},
        {"text": "Sanskrit recitation evening at Raghavasadanam, 27 September"},
        {"text": "Half-yearly examinations begin 17 November"},
    ],
    "faqs": [
        {"q": "Which grades does Arundhati Gurukulam admit?",
         "a": "Nursery to Grade 10. It is a day school — children come each morning from across Bengaluru and go home each evening."},
        {"q": "Is this a traditional gurukulam or a regular school?",
         "a": "Both, and deliberately so. Sanskrit, Veda and the shastras are taught alongside mathematics, the sciences and languages — by the same teachers, in the same timetable, to the same standard."},
        {"q": "Does my child need to know Sanskrit before joining?",
         "a": "No. Sanskrit is taught from the beginning, by ear before by grammar. Children who join in later grades are given additional support to catch up."},
        {"q": "Where is the school, and what are the timings?",
         "a": "No.2, Raghavasadanam, Pampa Mahakavi Road, in the Uttaradi Math compound at Shankarapuram, Basavanagudi. Call the office for the current day timings."},
        {"q": "How do I apply, and can I visit first?",
         "a": "Leave your details in the enquiry form on this page and the office will call you. Visits are welcome on weekday mornings while classes are running — most families come and see a morning before applying."},
    ],
    "terms": [
        {"name": "Term I", "weeks": "14 weeks", "dates": "2 June – 12 September", "note": "Vidyarambham on 2 June. Mid-term break 11–15 August."},
        {"name": "Term II", "weeks": "13 weeks", "dates": "29 September – 24 December", "note": "Half-yearly examinations 17–24 November."},
        {"name": "Term III", "weeks": "13 weeks", "dates": "5 January – 10 April", "note": "Annual examinations 23 March – 4 April."},
    ],
    "holidays": [
        {"when": "2 Jun", "what": "Vidyarambham — school reopens"},
        {"when": "11–15 Aug", "what": "Mid-term break"},
        {"when": "15 Aug", "what": "Independence Day"},
        {"when": "5 Sep", "what": "Ganesha Chaturthi"},
        {"when": "13–27 Sep", "what": "Dasara holidays"},
        {"when": "8 Nov", "what": "Deepavali"},
        {"when": "25 Dec–4 Jan", "what": "Winter break"},
        {"when": "14 Jan", "what": "Makara Sankranti"},
        {"when": "26 Jan", "what": "Republic Day"},
        {"when": "17 Feb", "what": "Maha Shivaratri"},
        {"when": "30 Mar", "what": "Ugadi"},
        {"when": "11 Apr", "what": "Summer break begins"},
    ],
    "school": {
        "name": "Arundhati Gurukulam",
        "phone": "+91 96860 32212",
        "email": "support@arundhatigurukulam.com",
        "address": "No.2, Raghavasadanam, Pampa Mahakavi Road, Uttaradi Math Compound, Shankarapuram, Basavanagudi, Bengaluru – 560004",
        "academic_year": "2026–27",
        "current_term": "Term II",
    },
    "disclosure_text": {},
}

# Notices / circulars / events shown on the home page boards when the site starts.
SEED_BOARDS = [
    ("notice", "2026-09-14", None, "Admission enquiries for Nursery to Grade 10, academic year 2027–28, are now being taken at the office."),
    ("notice", "2026-09-11", None, "Revised school timings for the monsoon weeks: assembly begins at 8:45 am until 30 September."),
    ("notice", "2026-09-08", None, "Uniform and book distribution for new families, Saturday 19 September, 9 am to 12 noon."),
    ("notice", "2026-09-02", None, "Transport route changes for Jayanagar and Padmanabhanagar effective 8 September."),
    ("circular", "2026-09-12", None, "Circular 14/2026: Term II fee schedule and the last date for payment without late charge."),
    ("circular", "2026-09-09", None, "Circular 13/2026: Attendance requirement for Grades 9 and 10 ahead of the board examinations."),
    ("circular", "2026-09-03", None, "Circular 12/2026: Guidelines for the Sanskrit recitation evening and parent participation."),
    ("circular", "2026-08-28", None, "Circular 11/2026: Medical records and consent forms to be updated for every child."),
    ("event", "2026-09-10", "2026-09-27", "Sanskrit recitation evening — Grades 4 to 10 recite at Raghavasadanam, 5:30 pm."),
    ("event", "2026-09-10", "2026-09-20", "Parent–teacher meeting, Grades 6 to 8, in the main hall from 9 am."),
    ("event", "2026-09-10", "2026-09-15", "Results of the Term I assessment published to parent logins."),
    ("event", "2026-09-01", "2026-09-05", "Ganesha Chaturthi — school closed. Puja at the math for families who wish to attend."),
]

# Mandatory Disclosure rows (must match the page)
ROW_KEYS = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7",
    "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D4PGT", "D4TGT", "D4PRT", "D5", "D6", "D7",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9",
]
PHOTO_KEYS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7"]
DOC_KEYS = ROW_KEYS + PHOTO_KEYS
TEXT_KEYS = ROW_KEYS + [k + ".count" for k in ROW_KEYS if k.startswith("D")]
MAX_TEXT = 1000
