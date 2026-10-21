// Family portal — the parent/student view. Header and dashboard follow the
// "Family Portal" screen from the original design, now on live data.
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { api, useLoad } from '../api.js';
import Account from '../pages/Account.jsx';
import { Receipt } from '../pages/Fees.jsx';
import { Conversation } from '../pages/Messages.jsx';
import { Grid } from '../pages/Timetable.jsx';
import { Btn, Card, Empty, ErrorNote, fmtDate, initials, Loading, LOGO_DARK_BG, Modal, money, PageHead, Stat, STATUS_WORD, Tag, toast, today, useReveal } from '../ui.jsx';

const TABS = [['', 'Home'], ['attendance', 'Attendance'], ['results', 'Results'], ['homework', 'Homework'], ['timetable', 'Timetable'],
  ['fees', 'Fees'], ['circulars', 'Circulars'], ['messages', 'Messages'], ['leave', 'Leave'], ['account', 'Account']];

const box = { minWidth: 0, background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' };
const kicker = { fontSize: '11.5px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--color-accent-700)' };

export default function Family({ me, signOut }) {
  const fam = useLoad('/api/family');
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  const st = me.student || {};
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="fp-top">
        <div className="fp-bar">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
            <img src={LOGO_DARK_BG} alt="Arundhati Gurukulam" style={{ height: 44, width: 'auto' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 17 }}>Family Portal</span>
          </a>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--color-accent-800)', borderRadius: 999, padding: '7px 16px', fontSize: 13.5 }}>
            <span style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--color-accent-2-400)', color: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{initials(st.name || me.name)}</span>
            {st.name} · {st.class_label}
          </span>
          <button onClick={signOut} className="fp-out" style={{ background: 'none', border: '1px solid color-mix(in srgb,var(--color-bg) 45%,transparent)', borderRadius: 999, color: 'inherit', font: 'inherit', fontSize: 13.5, padding: '8px 18px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Sign out</button>
        </div>
      </div>
      <div className="fp-tabs">
        <nav aria-label="Family portal">
          {TABS.map(([p, l]) => (
            <NavLink key={p} to={'/portal/' + p} end={p === ''} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l}{p === 'messages' && fam.data && fam.data.unread_messages > 0 && <span className="pt-badge">{fam.data.unread_messages}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="fp-body" key={loc.pathname}>
        {fam.error ? <ErrorNote error={fam.error} /> : !fam.data ? <Loading /> : (
          <Routes>
            <Route path="/" element={<Home d={fam.data} reload={fam.reload} />} />
            <Route path="attendance" element={<FamAttendance d={fam.data} />} />
            <Route path="results" element={<FamResults d={fam.data} />} />
            <Route path="homework" element={<FamHomework d={fam.data} />} />
            <Route path="timetable" element={<FamTimetable d={fam.data} />} />
            <Route path="fees" element={<FamFees d={fam.data} />} />
            <Route path="circulars" element={<FamCirculars d={fam.data} />} />
            <Route path="messages" element={<FamMessages d={fam.data} reload={fam.reload} />} />
            <Route path="leave" element={<FamLeave d={fam.data} />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Navigate to="/portal" replace />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ Home (the design's dashboard)
function Home({ d, reload }) {
  const [note, setNote] = useState('');
  const school = d.school || {};
  useReveal(d);
  const send = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    api.post('/api/messages', { body: note }).then(() => { setNote(''); toast('Sent to the class teacher.'); reload(); }).catch((err) => toast(err.message, true));
  };
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={kicker}>{school.current_term || 'Term'} · {school.academic_year || ''}</span>
          <h1 style={{ margin: 0, fontSize: 'clamp(24px,2.3vw,32px)', lineHeight: 1.06 }}>Namaste, {d.student.parent_name}</h1>
        </div>
        <span style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>{d.today_label}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(186px,100%),1fr))', gap: 16 }}>
        {d.stats.map((s) => (
          <div key={s.label} className="pt-reveal" style={{ minWidth: 0, background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)', padding: '20px 22px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 7 }}>
            <span style={{ fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{s.label}</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px,2.1vw,30px)', lineHeight: 1, color: 'var(--color-accent-900)' }}>{s.value}</span>
            <span style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'var(--color-neutral-700)' }}>{s.note}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(330px,100%),1fr))', gap: 20, alignItems: 'start' }}>
        <div style={box} className="pt-reveal">
          <div style={{ padding: '16px 22px', background: 'var(--color-accent-2-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-accent-900)' }}>{new Date().getDay() === 0 ? 'Monday’s timetable' : 'Today’s timetable'}</span>
            <span style={{ marginLeft: 'auto', fontSize: '11.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-800)' }}>{d.student.class_label}</span>
          </div>
          {d.periods.length ? d.periods.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '13px 22px', borderBottom: '1px solid var(--color-divider)' }}>
              <span style={{ flex: '0 0 96px', fontSize: '12.5px', letterSpacing: '.06em', color: 'var(--color-accent-700)', fontWeight: 600 }}>{p.time}</span>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 15 }}>{p.subject}</span>
                <span style={{ fontSize: 13, color: 'var(--color-neutral-600)' }}>{p.teacher}</span>
              </span>
            </div>
          )) : <Empty title="No timetable yet">The class teacher will add it soon.</Empty>}
        </div>

        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={box} className="pt-reveal">
            <div style={{ padding: '16px 22px', background: 'var(--color-accent-900)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-accent-2-300)' }}>Circulars for you</span>
              {d.circulars_new > 0 && <span style={{ marginLeft: 'auto', background: 'var(--color-accent-2-500)', color: 'var(--color-accent-900)', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{d.circulars_new} new</span>}
            </div>
            {d.circulars.length ? d.circulars.slice(0, 3).map((c) => (
              <Link key={c.id} to="/portal/circulars" className="fp-circ" style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '14px 22px', borderBottom: '1px solid var(--color-divider)', textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: '11.5px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{c.date}</span>
                <span style={{ fontSize: '14.5px', lineHeight: 1.5 }}>{c.text}</span>
              </Link>
            )) : <Empty title="No circulars yet" />}
          </div>

          <div className="pt-reveal" style={{ background: 'var(--color-marigold-soft)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: '11.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-accent-800)' }}>Fees</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 26, lineHeight: 1, color: 'var(--color-accent-900)' }}>{d.fees.count ? d.fees.due_label : 'All paid'}</span>
            <span style={{ fontSize: '14.5px', lineHeight: 1.55, color: 'var(--color-accent-900)' }}>
              {d.fees.next ? `${d.fees.next.title}${d.fees.next.due_on ? ', due ' + fmtDate(d.fees.next.due_on, true) : ''}. Receipts for paid instalments are in the Fees tab.` : 'Nothing is due right now. Receipts are in the Fees tab.'}
            </span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
              <Link className="btn" to="/portal/fees" style={{ borderRadius: 999, padding: '12px 24px', fontSize: '14.5px', background: 'var(--color-accent-900)', color: 'var(--color-accent-2-100)', borderColor: 'var(--color-accent-900)' }}>{d.fees.count ? 'How to pay' : 'View fees'}</Link>
              <Link className="btn" to="/portal/fees" style={{ borderRadius: 999, padding: '12px 24px', fontSize: '14.5px', borderColor: 'var(--color-accent-900)', color: 'var(--color-accent-900)' }}>Receipts</Link>
            </div>
          </div>
        </div>
      </div>

      {d.homework.length > 0 && (
        <div style={box} className="pt-reveal">
          <div style={{ padding: '16px 22px', background: 'var(--color-accent-2-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-accent-900)' }}>Homework</span>
            <Link to="/portal/homework" style={{ marginLeft: 'auto', fontSize: 13.5 }}>See all</Link>
          </div>
          {d.homework.slice(0, 3).map((h) => (
            <div key={h.id} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '13px 22px', borderBottom: '1px solid var(--color-divider)', flexWrap: 'wrap' }}>
              <span style={{ flex: '0 0 120px', fontSize: '12.5px', letterSpacing: '.06em', color: 'var(--color-accent-700)', fontWeight: 600 }}>{h.subject}</span>
              <span style={{ flex: '1 1 260px', fontSize: 15 }}>{h.title}</span>
              {h.due_on && <span style={{ fontSize: 13, color: 'var(--color-neutral-600)' }}>Due {fmtDate(h.due_on)}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="pt-reveal" style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'clamp(20px,2.4vw,28px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 20, alignItems: 'center' }}>
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20 }}>Message the class teacher</span>
          <span style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--color-neutral-800)' }}>
            {d.student.class_teacher || 'The class teacher'} replies on weekday afternoons. For absences on the day, please telephone the office{school.phone ? ` on ${school.phone}` : ''}.
          </span>
        </div>
        <form onSubmit={send} style={{ minWidth: 0, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input className="input" type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write a short note" style={{ flex: '1 1 180px', minWidth: 0, borderRadius: 999, padding: '13px 20px', fontSize: 15, background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }} />
          <button className="btn fp-send" type="submit" style={{ borderRadius: 999, padding: '13px 26px', fontSize: 15, cursor: 'pointer', background: 'var(--color-accent)', color: 'var(--color-accent-2-100)', borderColor: 'var(--color-accent)' }}>Send</button>
        </form>
      </div>
    </>
  );
}

// ------------------------------------------------------------------ other tabs
function FamAttendance({ d }) {
  const now = today().slice(0, 7);
  const [month, setMonth] = useState(now);
  const a = useLoad(`/api/attendance/student/${d.student.id}?month=${month}`);
  const all = useLoad(`/api/attendance/student/${d.student.id}`);
  const o = all.data && all.data.overall;
  const [y, m] = month.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  const days = new Date(y, m, 0).getDate();
  const lead = (first.getDay() + 6) % 7;
  const rec = Object.fromEntries(((a.data && a.data.records) || []).map((r) => [r.day, r.status]));
  return (
    <>
      <PageHead kicker={d.student.class_label} title="Attendance" actions={<input type="month" className="pt-input" style={{ width: 180 }} value={month} max={now} onChange={(e) => setMonth(e.target.value)} />}>
        Marked by the class teacher each morning. Apply for leave in advance from the Leave tab.
      </PageHead>
      <div className="pt-grid" style={{ '--min': '190px' }}>
        <div className="pt-card pt-stat" style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
          <div className="pt-ring" style={{ '--p': o && o.percent != null ? o.percent : 0 }}><div>{o && o.percent != null ? Math.round(o.percent) + '%' : '—'}</div></div>
          <div><span className="l">This year</span><div className="n" style={{ marginTop: 6 }}>{o ? `${o.days} school days marked` : ''}</div></div>
        </div>
        <Stat label="Present" value={o ? o.present : '—'} note="days" />
        <Stat label="Absent" value={o ? o.absent : '—'} note="days" tone="marigold" />
        <Stat label="Late / half day" value={o ? o.late + o.half : '—'} note="days" />
      </div>
      <Card title={first.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} tone="dark" pad>
        {a.loading ? <Loading /> : (
          <div className="pt-cal">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => <div key={w} className="h">{w}</div>)}
            {Array.from({ length: lead }, (_, i) => <div key={'b' + i} className="d blank" />)}
            {Array.from({ length: days }, (_, i) => {
              const key = `${month}-${String(i + 1).padStart(2, '0')}`;
              const s = rec[key];
              return <div key={key} className={`d ${s || ''} ${key === today() ? 'today' : ''}`} title={s ? STATUS_WORD[s] : ''}>{i + 1}</div>;
            })}
          </div>
        )}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 16, fontSize: 13 }}>
          {['P', 'A', 'L'].map((k) => <span key={k} style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span className={`pt-dot ${k}`}>{k}</span>{STATUS_WORD[k]}</span>)}
        </div>
      </Card>
    </>
  );
}

function FamResults({ d }) {
  const r = useLoad(`/api/results/student/${d.student.id}`);
  const groups = {};
  (r.data || []).forEach((x) => { (groups[x.name] = groups[x.name] || []).push(x); });
  return (
    <>
      <PageHead kicker={d.student.class_label} title="Results">Marks appear here once the teacher publishes them.</PageHead>
      {r.loading ? <Loading /> : !Object.keys(groups).length ? <Card><Empty title="No results yet" /></Card> :
        Object.entries(groups).map(([name, rows]) => {
          const tot = rows.reduce((a, x) => a + (x.marks || 0), 0), max = rows.reduce((a, x) => a + x.max_marks, 0);
          return (
            <Card key={name} title={name} tone="dark" right={<Tag tone="gold">{max ? Math.round((100 * tot) / max) : 0}% overall</Tag>}>
              <div className="pt-tablewrap"><table className="pt-table">
                <thead><tr><th>Subject</th><th className="num">Marks</th><th style={{ width: '34%' }}>Score</th><th className="num">Class average</th><th>Remark</th></tr></thead>
                <tbody>{rows.map((x) => (
                  <tr key={x.id}><td><b style={{ fontWeight: 600 }}>{x.subject}</b><div className="muted">{fmtDate(x.held_on)}</div></td>
                    <td className="num">{x.marks == null ? '—' : `${x.marks} / ${x.max_marks}`}</td>
                    <td><div className="pt-bar"><i style={{ width: (x.percent || 0) + '%' }} /></div></td>
                    <td className="num muted">{x.class_average ?? '—'}</td><td className="muted">{x.remark}</td></tr>))}</tbody>
              </table></div>
            </Card>
          );
        })}
    </>
  );
}

function FamHomework({ d }) {
  const h = useLoad(`/api/homework?class_id=${d.student.class_id}`);
  return (
    <>
      <PageHead kicker={d.student.class_label} title="Homework" />
      <Card title="Set by the teachers" tone="gold">
        {h.loading ? <Loading /> : !(h.data || []).length ? <Empty title="No homework set" /> : (
          <div className="pt-list">{h.data.map((x) => (
            <div key={x.id} style={{ flexDirection: 'column', gap: 6 }}>
              <span className="meta">{x.subject} · {x.teacher} {x.due_on && (x.due_on >= today() ? <Tag tone="gold">Due {fmtDate(x.due_on)}</Tag> : <Tag>Was due {fmtDate(x.due_on)}</Tag>)}</span>
              <b style={{ fontWeight: 600, fontSize: 15.5 }}>{x.title}</b>
              {x.details && <span style={{ fontSize: 14.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', color: 'var(--color-neutral-800)' }}>{x.details}</span>}
              {x.attachment && <a href={x.attachment} target="_blank" rel="noreferrer">Open attachment</a>}
            </div>))}</div>
        )}
      </Card>
    </>
  );
}

function FamTimetable({ d }) {
  const t = useLoad(`/api/timetable?class_id=${d.student.class_id}`);
  return (
    <>
      <PageHead kicker={d.student.class_label} title="Timetable">The week at school. Today is highlighted.</PageHead>
      <Card title="Weekly timetable" tone="dark">{t.loading ? <Loading /> : <Grid slots={t.data || []} />}</Card>
    </>
  );
}

function FamFees({ d }) {
  const f = useLoad('/api/fees');
  const [rec, setRec] = useState(null);
  const school = d.school || {};
  const due = (f.data || []).filter((x) => x.status === 'due');
  return (
    <>
      <PageHead kicker={d.student.class_label} title="Fees" />
      <div className="pt-grid" style={{ '--min': '260px' }}>
        <div className="pt-card" style={{ background: 'var(--color-marigold-soft)', padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: '11.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-accent-800)' }}>Due now</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 30, color: 'var(--color-accent-900)' }}>{money(due.reduce((a, x) => a + x.amount, 0))}</span>
          <span style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--color-accent-900)' }}>Pay at the school office (cash, card, UPI or cheque) or by bank transfer quoting the admission number <b>{d.student.admission_no}</b>. The office records the payment and the receipt appears below.{school.phone ? ` Questions: ${school.phone}.` : ''}</span>
        </div>
      </div>
      <Card title="Instalments" tone="dark">
        {f.loading ? <Loading /> : !(f.data || []).length ? <Empty title="No fees listed" /> : (
          <div className="pt-tablewrap"><table className="pt-table">
            <thead><tr><th>For</th><th className="num">Amount</th><th>Due</th><th>Status</th><th /></tr></thead>
            <tbody>{f.data.map((x) => (
              <tr key={x.id}><td><b style={{ fontWeight: 600 }}>{x.title}</b>{x.note && <div className="muted">{x.note}</div>}</td><td className="num">{money(x.amount)}</td><td>{fmtDate(x.due_on)}</td>
                <td>{x.status === 'paid' ? <Tag tone="green">Paid {fmtDate(x.paid_on)}</Tag> : x.status === 'waived' ? <Tag>Waived</Tag> : x.due_on && x.due_on < today() ? <Tag tone="red">Overdue</Tag> : <Tag tone="gold">Due</Tag>}</td>
                <td><div className="pt-rowacts">{x.status === 'paid' && <Btn kind="ghost" sm icon="file" onClick={() => setRec(x)}>Receipt</Btn>}</div></td></tr>))}</tbody>
          </table></div>
        )}
      </Card>
      {rec && <Receipt f={rec} onClose={() => setRec(null)} />}
    </>
  );
}

function FamCirculars({ d }) {
  const c = useLoad('/api/circulars');
  return (
    <>
      <PageHead kicker="From the school" title="Circulars & notices" />
      <Card title="For your family" tone="dark">
        {c.loading ? <Loading /> : !(c.data || []).length ? <Empty title="Nothing yet" /> : (
          <div className="pt-list">{c.data.map((x) => (
            <div key={x.id} style={{ flexDirection: 'column', gap: 6 }}>
              <span className="meta">{fmtDate(x.publish_on, true)} · {x.category}{x.class_label ? ` · ${x.class_label}` : ''}</span>
              <span style={{ fontSize: 15, lineHeight: 1.6 }}>{x.title && <b style={{ fontWeight: 600 }}>{x.title}: </b>}{x.body}</span>
              {x.event_on && <span className="muted" style={{ fontSize: 13, color: 'var(--color-neutral-600)' }}>On {fmtDate(x.event_on, true)}</span>}
              {x.attachment && <a href={x.attachment} target="_blank" rel="noreferrer">Open attachment</a>}
            </div>))}</div>
        )}
      </Card>
    </>
  );
}

function FamMessages({ d, reload }) {
  useEffect(() => { const t = setTimeout(reload, 800); return () => clearTimeout(t); }, []);
  return (
    <>
      <PageHead kicker={d.student.class_label} title="Messages">A private conversation with the class teacher. For anything urgent on the day, please telephone the office.</PageHead>
      <Card><Conversation studentId={d.student.id} mineIsParent /></Card>
    </>
  );
}

function FamLeave({ d }) {
  const l = useLoad('/api/leaves');
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ from_day: today(), to_day: today(), reason: '' });
  const [err, setErr] = useState(null);
  const submit = () => api.post('/api/leaves', f).then(() => { setOpen(false); setF({ from_day: today(), to_day: today(), reason: '' }); toast('Sent to the class teacher.'); l.reload(); }).catch(setErr);
  return (
    <>
      <PageHead kicker={d.student.class_label} title="Leave" actions={<Btn icon="plus" onClick={() => { setErr(null); setOpen(true); }}>Apply for leave</Btn>}>
        Let the class teacher know in advance when {d.student.name.split(' ')[0]} will be away.
      </PageHead>
      <Card title="Requests" tone="dark">
        {l.loading ? <Loading /> : !(l.data || []).length ? <Empty title="No leave requests" /> : (
          <div className="pt-tablewrap"><table className="pt-table">
            <thead><tr><th>Dates</th><th>Reason</th><th>Status</th><th /></tr></thead>
            <tbody>{l.data.map((x) => (
              <tr key={x.id}><td style={{ whiteSpace: 'nowrap' }}>{fmtDate(x.from_day)}{x.to_day !== x.from_day && <> – {fmtDate(x.to_day)}</>}</td>
                <td>{x.reason}{x.response && <div className="muted">Teacher: {x.response}</div>}</td>
                <td>{x.status === 'pending' ? <Tag tone="gold">Waiting</Tag> : x.status === 'approved' ? <Tag tone="green">Approved</Tag> : <Tag tone="red">Declined</Tag>}</td>
                <td><div className="pt-rowacts">{x.status === 'pending' && <Btn kind="ghost" sm onClick={() => api.del(`/api/leaves/${x.id}`).then(l.reload)}>Withdraw</Btn>}</div></td></tr>))}</tbody>
          </table></div>
        )}
      </Card>
      {open && (
        <Modal title="Apply for leave" kicker={d.student.name} onClose={() => setOpen(false)} footer={<><Btn kind="line" onClick={() => setOpen(false)}>Cancel</Btn><Btn onClick={submit}>Send request</Btn></>}>
          <div className="pt-form">
            <label className="pt-field"><span>From</span><input className="pt-input" type="date" value={f.from_day} onChange={(e) => setF({ ...f, from_day: e.target.value, to_day: e.target.value > f.to_day ? e.target.value : f.to_day })} /></label>
            <label className="pt-field"><span>To</span><input className="pt-input" type="date" value={f.to_day} min={f.from_day} onChange={(e) => setF({ ...f, to_day: e.target.value })} /></label>
            <label className="pt-field full"><span>Reason</span><textarea className="pt-textarea" rows="3" value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} placeholder="e.g. Family function in Mysuru" /></label>
          </div>
          <ErrorNote error={err} />
        </Modal>
      )}
    </>
  );
}
