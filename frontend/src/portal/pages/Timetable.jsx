import React, { useEffect, useState } from 'react';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Btn, Card, Empty, Loading, PageHead, Seg, toast, WEEKDAYS } from '../ui.jsx';

const DEFAULT_TIMES = [['8:45', '9:30'], ['9:30', '10:15'], ['10:30', '11:15'], ['11:15', '12:00'], ['1:00', '1:45'], ['2:00', '3:00']];
const todayIdx = () => (new Date().getDay() + 6) % 7;

export function Grid({ slots, showClass }) {
  const periods = [...new Set(slots.map((s) => s.period))].sort((a, b) => a - b);
  if (!periods.length) return <Empty title="No timetable yet">It shows here once it is set.</Empty>;
  const at = (wd, p) => slots.filter((s) => s.weekday === wd && s.period === p);
  const t = todayIdx();
  return (
    <div className="pt-tablewrap" style={{ padding: 10 }}>
      <table className="pt-tt">
        <thead><tr><th>Period</th>{WEEKDAYS.map((w, i) => <th key={w} style={i === t ? { color: 'var(--color-accent)' } : null}>{w.slice(0, 3)}</th>)}</tr></thead>
        <tbody>
          {periods.map((p) => {
            const any = slots.find((s) => s.period === p);
            return (
              <tr key={p}>
                <th style={{ whiteSpace: 'nowrap' }}>{p}<br /><span style={{ fontWeight: 400, letterSpacing: 0, textTransform: 'none' }}>{any.starts}–{any.ends}</span></th>
                {WEEKDAYS.map((w, wd) => {
                  const cell = at(wd, p);
                  return cell.length ? (
                    <td key={w} className={wd === t ? 'today' : ''}>
                      {cell.map((c) => <div key={c.id}><b>{c.subject}</b><small>{showClass ? c.class_label : c.teacher}</small></div>)}
                    </td>
                  ) : <td key={w} className="empty">—</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Editor({ cid, slots, teachers, onSaved, onCancel }) {
  const periods = Math.max(6, ...slots.map((s) => s.period));
  const [rows, setRows] = useState(() => Array.from({ length: periods }, (_, i) => {
    const any = slots.find((s) => s.period === i + 1);
    return { starts: any ? any.starts : (DEFAULT_TIMES[i] || ['', ''])[0], ends: any ? any.ends : (DEFAULT_TIMES[i] || ['', ''])[1],
      cells: WEEKDAYS.map((_, wd) => { const c = slots.find((s) => s.period === i + 1 && s.weekday === wd); return { subject: c ? c.subject : '', teacher_id: c && c.teacher_id ? String(c.teacher_id) : '' }; }) };
  }));
  const [busy, setBusy] = useState(false);
  const set = (i, wd, k, v) => setRows((r) => r.map((row, j) => j !== i ? row : { ...row, cells: row.cells.map((c, x) => x === wd ? { ...c, [k]: v } : c) }));
  const save = () => {
    setBusy(true);
    const out = [];
    rows.forEach((r, i) => r.cells.forEach((c, wd) => { if (c.subject.trim()) out.push({ weekday: wd, period: i + 1, starts: r.starts, ends: r.ends, subject: c.subject, teacher_id: c.teacher_id ? Number(c.teacher_id) : null }); }));
    api.put(`/api/timetable/${cid}`, { slots: out }).then((r) => { toast('Timetable saved.'); onSaved(r); }).catch((e) => toast(e.message, true)).finally(() => setBusy(false));
  };
  return (
    <>
      <div className="pt-toolbar">
        <span style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>Type a subject in each slot; leave it blank for no class.</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Btn kind="line" sm icon="plus" onClick={() => setRows((r) => [...r, { starts: '', ends: '', cells: WEEKDAYS.map(() => ({ subject: '', teacher_id: '' })) }])}>Add period</Btn>
          <Btn kind="line" sm onClick={onCancel}>Cancel</Btn>
          <Btn kind="primary" sm disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save timetable'}</Btn>
        </span>
      </div>
      <div className="pt-tablewrap" style={{ padding: 10 }}>
        <table className="pt-tt">
          <thead><tr><th>Period</th>{WEEKDAYS.map((w) => <th key={w}>{w.slice(0, 3)}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ minWidth: 110 }}>
                  <b>{i + 1}</b>
                  <input value={r.starts} placeholder="8:45" onChange={(e) => setRows((x) => x.map((y, j) => j === i ? { ...y, starts: e.target.value } : y))} />
                  <input value={r.ends} placeholder="9:30" onChange={(e) => setRows((x) => x.map((y, j) => j === i ? { ...y, ends: e.target.value } : y))} />
                </td>
                {r.cells.map((c, wd) => (
                  <td key={wd}>
                    <input value={c.subject} placeholder="Subject" list="tt-subjects" onChange={(e) => set(i, wd, 'subject', e.target.value)} />
                    <select value={c.teacher_id} onChange={(e) => set(i, wd, 'teacher_id', e.target.value)}>
                      <option value="">Teacher</option>
                      {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <datalist id="tt-subjects">{['Prayer and recitation', 'Sanskrit', 'English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Music and games', 'Yoga', 'Art', 'Library'].map((s) => <option key={s} value={s} />)}</datalist>
      </div>
    </>
  );
}

export default function Timetable({ classId }) {
  const me = useMe();
  const classes = useClasses();
  const [mode, setMode] = useState(me.role === 'teacher' && !classId ? 'mine' : 'class');
  const [cid, setCid] = useState(classId ? String(classId) : '');
  const [editing, setEditing] = useState(false);
  const tt = useLoad(mode === 'mine' ? '/api/timetable' : cid ? `/api/timetable?class_id=${cid}` : null);
  const staff = useLoad(me.role !== 'teacher' ? '/api/staff' : null);
  const subs = useLoad(me.role === 'teacher' && cid ? `/api/subjects?class_id=${cid}` : null);
  useEffect(() => setEditing(false), [cid, mode]);
  const cls = (classes.data || []).find((c) => String(c.id) === String(cid));
  const canEdit = cls && (me.role !== 'teacher' || cls.class_teacher_id === me.id);
  const teachers = staff.data || (subs.data || []).filter((s) => s.teacher_id).map((s) => ({ id: s.teacher_id, name: s.teacher })).filter((t, i, a) => a.findIndex((x) => x.id === t.id) === i);
  return (
    <>
      {!classId && <PageHead kicker="Academics" title="Timetable" actions={<>
        {me.role === 'teacher' && <Seg value={mode} onChange={setMode} options={[{ value: 'mine', label: 'My week' }, { value: 'class', label: 'A class' }]} />}
        {mode === 'class' && <ClassSelect classes={classes.data} value={cid} onChange={setCid} />}
      </>}>
        {mode === 'mine' ? 'Every period you teach this week. Today is highlighted.' : 'The weekly timetable for a class. Families see their child’s timetable in the portal.'}
      </PageHead>}
      <Card title={mode === 'mine' ? 'My week' : cls ? cls.label : 'Timetable'} tone="dark"
        right={mode === 'class' && canEdit && !editing ? <Btn kind="gold" sm icon="edit" onClick={() => setEditing(true)}>Edit</Btn> : null}>
        {tt.loading && !tt.data ? <Loading /> : editing ? <Editor cid={cid} slots={tt.data || []} teachers={teachers} onCancel={() => setEditing(false)} onSaved={(r) => { tt.setData(r); setEditing(false); }} />
          : <Grid slots={tt.data || []} showClass={mode === 'mine'} />}
      </Card>
    </>
  );
}
