// Student participation — events, competitions and activities, with any prize won. Families see it in their portal.
import React, { useState } from 'react';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Btn, Card, Empty, ErrorNote, fmtDate, IconBtn, Loading, Modal, PageHead, Search, Tag, today, toast } from '../ui.jsx';

export const CATEGORIES = ['Sanskrit', 'Academic', 'Sports', 'Cultural', 'Arts', 'Community', 'Other'];
const ACHIEVEMENTS = ['Participated', 'First place', 'Second place', 'Third place', 'Certificate of merit', 'Special mention'];
export const prizeTone = (a) => (/first|winner|gold/i.test(a) ? 'gold' : /second|third|merit|mention/i.test(a) ? 'green' : 'grey');

export default function Participation({ classId }) {
  const me = useMe();
  const classes = useClasses();
  const [cid, setCid] = useState(classId ? String(classId) : '');
  const list = useLoad(cid ? `/api/participation?class_id=${cid}` : null);
  const roster = useLoad(cid ? `/api/students?class_id=${cid}` : null);
  const [q, setQ] = useState('');
  const [form, setForm] = useState(null);
  const [err, setErr] = useState(null);
  const cls = (classes.data || []).find((c) => String(c.id) === String(cid));
  const rows = (list.data || []).filter((p) => !q.trim() || `${p.student} ${p.event} ${p.category} ${p.achievement}`.toLowerCase().includes(q.trim().toLowerCase()));

  const save = () => {
    setErr(null);
    api.post('/api/participation', { ...form, student_ids: [...form.student_ids] })
      .then((r) => { setForm(null); toast(`Recorded for ${r.length} student${r.length === 1 ? '' : 's'}.`); list.reload(); }).catch(setErr);
  };
  const toggle = (id) => setForm((f) => { const s = new Set(f.student_ids); s.has(id) ? s.delete(id) : s.add(id); return { ...f, student_ids: s }; });

  return (
    <>
      {!classId && (
        <PageHead kicker="Academics" title="Participation" actions={<ClassSelect classes={classes.data} value={cid} onChange={setCid} />}>
          Record who took part in competitions, events and activities — and any prizes. It shows on the student’s record and in the family portal.
        </PageHead>
      )}
      {!cid ? (classes.loading ? <Loading /> : <Empty title="No classes yet" />) : (
        <Card title={cls ? `${cls.label} · participation & achievements` : 'Participation'} tone="dark"
          right={<Btn kind="gold" sm icon="plus" onClick={() => { setErr(null); setForm({ event: '', category: 'Academic', achievement: 'Participated', held_on: today(), note: '', student_ids: new Set() }); }}>Record participation</Btn>}>
          <div className="pt-toolbar"><Search value={q} onChange={setQ} placeholder="Search students or events" /></div>
          {list.loading && !list.data ? <Loading /> : !rows.length ? <Empty title="Nothing recorded yet">Competitions, recitations, sports and other activities show here.</Empty> : (
            <div className="pt-tablewrap"><table className="pt-table">
              <thead><tr><th>Student</th><th>Event</th><th>Type</th><th>Result</th><th>Date</th><th /></tr></thead>
              <tbody>{rows.map((p) => (
                <tr key={p.id}>
                  <td><b style={{ fontWeight: 600 }}>{p.student}</b></td>
                  <td>{p.event}{p.note && <div className="muted">{p.note}</div>}</td>
                  <td className="muted">{p.category || '—'}</td>
                  <td><Tag tone={prizeTone(p.achievement)}>{p.achievement}</Tag></td>
                  <td style={{ whiteSpace: 'nowrap' }}>{fmtDate(p.held_on)}</td>
                  <td><div className="pt-rowacts">{p.can_edit && <IconBtn icon="trash" label="Remove" onClick={() => api.del(`/api/participation/${p.id}`).then(list.reload).catch((e) => toast(e.message, true))} />}</div></td>
                </tr>))}</tbody>
            </table></div>
          )}
        </Card>
      )}
      {form && (
        <Modal wide title="Record participation" kicker={cls && cls.label} onClose={() => setForm(null)}
          footer={<><Btn kind="line" onClick={() => setForm(null)}>Cancel</Btn><Btn disabled={!form.event.trim() || !form.student_ids.size} onClick={save}>Save for {form.student_ids.size || ''} student{form.student_ids.size === 1 ? '' : 's'}</Btn></>}>
          <div className="pt-form">
            <label className="pt-field full"><span>Event or activity <i>*</i></span><input className="pt-input" value={form.event} placeholder="e.g. Inter-school quiz, Bhagavad Gita recitation" onChange={(e) => setForm({ ...form, event: e.target.value })} /></label>
            <label className="pt-field"><span>Type</span><select className="pt-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
            <label className="pt-field"><span>Result</span>
              <input className="pt-input" list="pt-ach" value={form.achievement} onChange={(e) => setForm({ ...form, achievement: e.target.value })} />
              <datalist id="pt-ach">{ACHIEVEMENTS.map((a) => <option key={a} value={a} />)}</datalist></label>
            <label className="pt-field"><span>Date</span><input className="pt-input" type="date" value={form.held_on} onChange={(e) => setForm({ ...form, held_on: e.target.value })} /></label>
            <label className="pt-field"><span>Note</span><input className="pt-input" value={form.note} placeholder="Optional" onChange={(e) => setForm({ ...form, note: e.target.value })} /></label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <b style={{ fontSize: 14 }}>Students</b>
            <Btn kind="ghost" sm onClick={() => setForm({ ...form, student_ids: new Set((roster.data || []).map((s) => s.id)) })}>Whole class</Btn>
            <Btn kind="ghost" sm onClick={() => setForm({ ...form, student_ids: new Set() })}>Clear</Btn>
          </div>
          <div className="pt-pick">
            {(roster.data || []).map((s) => (
              <label key={s.id} className={form.student_ids.has(s.id) ? 'on' : ''}>
                <input type="checkbox" checked={form.student_ids.has(s.id)} onChange={() => toggle(s.id)} />
                <span>{s.roll_no ? `${s.roll_no}. ` : ''}{s.name}</span>
              </label>
            ))}
          </div>
          <ErrorNote error={err} />
        </Modal>
      )}
    </>
  );
}
