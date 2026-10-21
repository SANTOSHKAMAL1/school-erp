// Exam mark sheet: every subject of a class for one examination (Mid-term, Quarterly, Half-yearly, Annual),
// with totals, rank and an "Announce result" button that publishes the whole exam to families.
import React, { useEffect, useMemo, useState } from 'react';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Btn, Card, Confirm, Empty, ErrorNote, Loading, PageHead, Seg, Stat, Tag, toast } from '../ui.jsx';

const DEFAULT_MAX = { 'Mid-term': 50 };

export function ExamSheet({ classId }) {
  const exams = useLoad('/api/exams');
  const [exam, setExam] = useState('Quarterly');
  const [custom, setCustom] = useState('');
  const name = exam === '__other' ? custom.trim() : exam;
  const sheet = useLoad(name ? `/api/classes/${classId}/exam?name=${encodeURIComponent(name)}` : null);
  const [vals, setVals] = useState({});
  const [max, setMax] = useState(100);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [announce, setAnnounce] = useState(false);
  const d = sheet.data;

  useEffect(() => {
    if (!d) return;
    const v = {};
    d.students.forEach((s) => d.subjects.forEach((sub) => { const m = s.marks[sub.id]; v[`${s.id}:${sub.id}`] = m == null ? '' : String(m); }));
    setVals(v);
    setMax(DEFAULT_MAX[d.exam] || 100);
    setErr(null);
  }, [d]);

  const editable = (d ? d.subjects : []).filter((s) => s.can_edit);
  const dirty = useMemo(() => d && d.students.some((s) => editable.some((sub) => {
    const m = s.marks[sub.id]; return (vals[`${s.id}:${sub.id}`] ?? '') !== (m == null ? '' : String(m));
  })), [vals, d]);

  // Live totals while typing
  const live = useMemo(() => {
    if (!d) return [];
    const rows = d.students.map((s) => {
      let tot = 0, out = 0;
      d.subjects.forEach((sub) => {
        const v = vals[`${s.id}:${sub.id}`];
        const m = sub.max_marks || max;
        if (v !== '' && v != null && !isNaN(Number(v))) { tot += Number(v); out += m; }
      });
      return { ...s, tot, out, pct: out ? Math.round((1000 * tot) / out) / 10 : null };
    });
    const order = rows.filter((r) => r.pct != null).sort((a, b) => b.pct - a.pct);
    order.forEach((r, i) => { r.rk = i + 1; });
    return rows;
  }, [vals, d, max]);

  const save = () => {
    setBusy(true); setErr(null);
    const entries = [];
    editable.forEach((sub) => {
      const cells = d.students.map((s) => ({ student_id: s.id, subject_id: sub.id, raw: vals[`${s.id}:${sub.id}`] ?? '' }));
      if (!sub.assessment_id && cells.every((c) => c.raw === '')) return;   // nothing typed for a new subject
      cells.forEach((c) => entries.push({ student_id: c.student_id, subject_id: c.subject_id, marks: c.raw === '' ? null : Number(c.raw) }));
    });
    if (!entries.length) { setBusy(false); toast('Type some marks first.', true); return; }
    api.post(`/api/classes/${classId}/exam`, { name, max_marks: Number(max) || 100, entries })
      .then((r) => { sheet.setData(r); toast(`${name} marks saved.${r.published ? '' : ' Announce the result when every subject is in.'}`); })
      .catch(setErr).finally(() => setBusy(false));
  };
  const publish = (on) => api.post(`/api/classes/${classId}/exam/publish`, { name, published: on })
    .then((r) => { sheet.setData(r); toast(on ? 'Result announced — families can see it now.' : 'Result withdrawn from the family portal.'); });

  const filled = live.filter((r) => r.pct != null);
  const avg = filled.length ? Math.round((10 * filled.reduce((a, r) => a + r.pct, 0)) / filled.length) / 10 : null;
  const best = filled.reduce((a, r) => (!a || r.pct > a.pct ? r : a), null);
  const pass = filled.filter((r) => r.pct >= 35).length;

  return (
    <>
      <div className="pt-actions">
        <Seg value={exam} onChange={setExam} options={[...(exams.data || ['Mid-term', 'Quarterly', 'Half-yearly', 'Annual']).map((x) => ({ value: x, label: x })), { value: '__other', label: 'Other test…' }]} />
        {exam === '__other' && <input className="pt-input" style={{ width: 220, minHeight: 38 }} placeholder="e.g. Unit test 2" value={custom} onChange={(e) => setCustom(e.target.value)} />}
      </div>
      {!name ? <Empty title="Name the test" /> : sheet.loading && !d ? <Loading /> : sheet.error ? <ErrorNote error={sheet.error} /> : !d ? null : (
        <>
          <div className="pt-grid" style={{ '--min': '170px' }}>
            <Stat label="Class average" value={avg != null ? avg + '%' : '—'} note={`${filled.length} of ${d.students.length} students have marks`} />
            <Stat label="Top of the class" value={best ? best.pct + '%' : '—'} note={best ? best.name : ''} tone="marigold" />
            <Stat label="Passed (35%+)" value={filled.length ? `${pass} / ${filled.length}` : '—'} />
            <Stat label="Result" value={d.published ? 'Announced' : 'Not announced'} note={d.published ? 'Families can see it' : 'Only staff can see the marks'} tone={d.published ? 'feature' : ''} />
          </div>
          <Card title={`${d.exam} · ${d.class_label}`} tone="dark" right={<>
            <Btn kind="line" sm icon="print" onClick={() => window.print()} style={{ color: 'var(--color-accent-2-200)', borderColor: 'color-mix(in srgb,var(--color-accent-2-200) 40%,transparent)' }}>Print</Btn>
            {editable.length > 0 && <Btn kind="gold" sm icon="check" disabled={busy || !dirty} onClick={save}>{busy ? 'Saving…' : dirty ? 'Save marks' : 'Saved'}</Btn>}
            {d.can_publish && (d.published
              ? <Btn kind="line" sm onClick={() => publish(false).catch((e) => toast(e.message, true))} style={{ color: 'var(--color-accent-2-200)', borderColor: 'color-mix(in srgb,var(--color-accent-2-200) 40%,transparent)' }}>Withdraw result</Btn>
              : <Btn kind="primary" sm icon="send" disabled={dirty || !d.subjects.some((s) => s.assessment_id)} onClick={() => setAnnounce(true)}>Announce result</Btn>)}
          </>}>
            {editable.length > 0 && d.subjects.some((s) => s.can_edit && !s.assessment_id) && (
              <div className="pt-toolbar">
                <span style={{ fontSize: 14 }}>New subjects are marked out of</span>
                <input className="pt-input" type="number" min="1" style={{ width: 90, minHeight: 36, padding: '6px 12px' }} value={max} onChange={(e) => setMax(e.target.value)} />
                <span className="muted" style={{ fontSize: 13, color: 'var(--color-neutral-600)' }}>Tab or Enter moves to the next box. {editable.length < d.subjects.length && 'Grey columns belong to other subject teachers.'}</span>
              </div>
            )}
            {d.students.length === 0 ? <Empty title="No students in this class" /> : !d.subjects.length ? <Empty title="No subjects yet">The HOD adds subjects under Classes & sections.</Empty> : (
              <div className="pt-tablewrap">
                <table className="pt-table pt-exam">
                  <thead>
                    <tr>
                      <th>Roll</th><th>Student</th>
                      {d.subjects.map((s) => <th key={s.id} className="num" title={s.teacher || ''}>{s.name}<small>{s.assessment_id ? `out of ${s.max_marks}` : s.can_edit ? `out of ${max}` : 'not entered'}</small></th>)}
                      <th className="num">Total</th><th className="num">%</th><th className="num">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {live.map((r) => (
                      <tr key={r.id}>
                        <td className="muted">{r.roll_no}</td>
                        <td style={{ whiteSpace: 'nowrap' }}><b style={{ fontWeight: 600 }}>{r.name}</b></td>
                        {d.subjects.map((sub) => {
                          const k = `${r.id}:${sub.id}`;
                          const out = sub.max_marks || max;
                          const v = vals[k] ?? '';
                          const bad = v !== '' && (isNaN(Number(v)) || Number(v) < 0 || Number(v) > out);
                          return (
                            <td key={sub.id} className={`num ${sub.can_edit ? '' : 'locked'}`}>
                              {sub.can_edit ? (
                                <input className={`pt-input ${bad ? 'bad' : ''}`} inputMode="decimal" value={v} aria-label={`${r.name} ${sub.name}`}
                                  onChange={(e) => setVals((x) => ({ ...x, [k]: e.target.value }))}
                                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const n = e.currentTarget.closest('tr').nextElementSibling; const i = [...e.currentTarget.closest('tr').children].indexOf(e.currentTarget.closest('td')); n && n.children[i] && n.children[i].querySelector('input') && n.children[i].querySelector('input').focus(); } }} />
                              ) : (v === '' ? '—' : v)}
                            </td>
                          );
                        })}
                        <td className="num"><b>{r.out ? `${r.tot}/${r.out}` : '—'}</b></td>
                        <td className="num"><b style={{ color: r.pct != null && r.pct < 35 ? 'var(--color-accent)' : undefined }}>{r.pct ?? '—'}</b></td>
                        <td className="num">{r.rk ? (r.rk <= 3 ? <Tag tone="gold">{r.rk}</Tag> : r.rk) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <ErrorNote error={err} />
          </Card>
        </>
      )}
      {announce && (
        <Confirm title={`Announce the ${name} result?`} confirmLabel="Announce result" onClose={() => setAnnounce(false)} onConfirm={() => publish(true)}>
          Families of {d.class_label} will see the {name} marks for every subject in their portal, and a notice goes to the class. Subjects with no marks yet are left out — you can add them later.
        </Confirm>
      )}
    </>
  );
}

export default function Exams() {
  const me = useMe();
  const classes = useClasses();
  const [cid, setCid] = useState('');
  return (
    <>
      <PageHead kicker="Academics" title="Exams & results" actions={<ClassSelect classes={classes.data} value={cid} onChange={setCid} />}>
        Enter Mid-term, Quarterly, Half-yearly and Annual marks for the whole class in one sheet, then announce the result — families see it in their report card.
        {me.role === 'teacher' && ' You can type marks for the subjects you teach; the class teacher announces the result.'}
      </PageHead>
      {classes.loading && !classes.data ? <Loading /> : !cid ? <Empty title="No classes yet" /> : <ExamSheet key={cid} classId={cid} />}
    </>
  );
}
