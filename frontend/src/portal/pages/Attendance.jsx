import React, { useEffect, useMemo, useState } from 'react';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Btn, Card, Empty, ErrorNote, Loading, PageHead, Seg, STATUS_WORD, Tag, toast, today } from '../ui.jsx';

function MarkSheet({ cid }) {
  const [day, setDay] = useState(today());
  const sheet = useLoad(cid ? `/api/attendance?class_id=${cid}&day=${day}` : null);
  const [marks, setMarks] = useState({});
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!sheet.data) return;
    const m = {};
    sheet.data.students.forEach((s) => { m[s.student_id] = s.status || (sheet.data.marked ? null : 'P'); });
    setMarks(m);
  }, [sheet.data]);
  const d = sheet.data;
  const counts = useMemo(() => Object.values(marks).reduce((a, v) => { if (v) a[v] = (a[v] || 0) + 1; return a; }, {}), [marks]);
  if (!cid) return <Empty title="No class chosen" />;
  if (sheet.loading && !d) return <Loading />;
  if (sheet.error) return <ErrorNote error={sheet.error} />;
  const save = () => {
    setBusy(true);
    api.post('/api/attendance', { class_id: Number(cid), day, entries: Object.entries(marks).filter(([, v]) => v).map(([k, v]) => ({ student_id: Number(k), status: v })) })
      .then((r) => { sheet.setData(r); toast(`Attendance saved for ${d.class_label}.`); })
      .catch((e) => toast(e.message, true)).finally(() => setBusy(false));
  };
  return (
    <Card title={`${d.class_label}`} tone="dark" right={<>
      <input type="date" className="pt-input" style={{ width: 170, minHeight: 36, padding: '6px 14px', background: 'var(--color-neutral-100)' }} value={day} max={today()} onChange={(e) => setDay(e.target.value)} />
      {d.marked ? <Tag tone="green">Saved</Tag> : <Tag tone="gold">Not saved yet</Tag>}
    </>}>
      <div className="pt-toolbar">
        <span style={{ fontSize: 14 }}>{['P', 'A', 'L', 'H'].map((k) => `${counts[k] || 0} ${STATUS_WORD[k].toLowerCase()}`).join(' · ')}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {d.can_edit && <Btn kind="line" sm onClick={() => setMarks(Object.fromEntries(d.students.map((s) => [s.student_id, 'P'])))}>Everyone present</Btn>}
          {d.can_edit && <Btn kind="primary" sm icon="check" disabled={busy || !d.students.length} onClick={save}>{busy ? 'Saving…' : 'Save attendance'}</Btn>}
        </span>
      </div>
      {!d.can_edit && <div style={{ padding: '14px 22px 0' }}><div className="pt-note info">Only the class teacher, HOD or administrator can mark attendance for this class. You can view it.</div></div>}
      {d.students.length === 0 ? <Empty title="No students in this class" /> : (
        <div className="pt-tablewrap">
          <table className="pt-table">
            <thead><tr><th>Roll</th><th>Student</th><th>Status</th></tr></thead>
            <tbody>
              {d.students.map((s) => (
                <tr key={s.student_id}>
                  <td className="muted" style={{ width: 70 }}>{s.roll_no || '—'}</td>
                  <td><b style={{ fontWeight: 600 }}>{s.name}</b><div className="muted">{s.admission_no}</div></td>
                  <td>
                    <div className="pt-att">
                      {['P', 'A', 'L', 'H'].map((k) => (
                        <button key={k} type="button" title={STATUS_WORD[k]} disabled={!d.can_edit} className={`${k} ${marks[s.student_id] === k ? 'on' : ''}`}
                          onClick={() => setMarks((m) => ({ ...m, [s.student_id]: k }))}>{k}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function MonthReport({ cid }) {
  const now = today().slice(0, 7);
  const [month, setMonth] = useState(now);
  const rep = useLoad(cid ? `/api/attendance/report?class_id=${cid}&month=${month}` : null);
  const d = rep.data;
  return (
    <Card title={d ? `${d.class_label} · monthly register` : 'Monthly register'} tone="gold" right={<>
      <input type="month" className="pt-input" style={{ width: 170, minHeight: 36, padding: '6px 14px' }} value={month} max={now} onChange={(e) => setMonth(e.target.value)} />
      <Btn kind="line" sm icon="print" onClick={() => window.print()}>Print</Btn>
    </>}>
      {rep.loading && !d ? <Loading /> : !d ? null : d.dates.length === 0 ? <Empty title="Nothing marked this month" /> : (
        <div className="pt-tablewrap">
          <table className="pt-table" style={{ fontSize: 13 }}>
            <thead><tr><th>Student</th>{d.dates.map((x) => <th key={x} style={{ padding: '10px 4px', textAlign: 'center' }}>{Number(x.slice(8))}</th>)}<th className="num">%</th></tr></thead>
            <tbody>
              {d.students.map((s) => (
                <tr key={s.student_id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{s.name}</td>
                  {d.dates.map((x) => <td key={x} style={{ padding: '6px 2px', textAlign: 'center' }}>{s.days[x] ? <span className={`pt-dot ${s.days[x]}`}>{s.days[x]}</span> : ''}</td>)}
                  <td className="num"><b style={{ color: s.percent != null && s.percent < 75 ? 'var(--color-accent)' : undefined }}>{s.percent ?? '—'}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default function Attendance() {
  const me = useMe();
  const classes = useClasses();
  const [cid, setCid] = useState('');
  const [tab, setTab] = useState('mark');
  const list = me.role === 'teacher' ? (classes.data || []).filter((c) => c.class_teacher_id === me.id).concat((classes.data || []).filter((c) => c.class_teacher_id !== me.id)) : classes.data;
  return (
    <>
      <PageHead kicker="Academics" title="Attendance" actions={<>
        <Seg value={tab} onChange={setTab} options={[{ value: 'mark', label: 'Mark a day' }, { value: 'month', label: 'Monthly register' }]} />
        <ClassSelect classes={list} value={cid} onChange={setCid} />
      </>}>
        Tap P for present, A absent, L late, H half day. Families see the record in their portal straight away.
      </PageHead>
      {classes.loading && !classes.data ? <Loading /> : !(classes.data || []).length ? <Empty title="No classes yet">Classes appear here once the HOD assigns them to you.</Empty>
        : tab === 'mark' ? <MarkSheet cid={cid} key={cid} /> : <MonthReport cid={cid} key={cid} />}
    </>
  );
}
