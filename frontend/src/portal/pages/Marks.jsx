import React, { useEffect, useState } from 'react';
import Crud from '../Crud.jsx';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Btn, Empty, ErrorNote, fmtDate, Loading, Modal, PageHead, Tag, toast } from '../ui.jsx';

function MarksEntry({ a, onClose }) {
  const sheet = useLoad(`/api/assessments/${a.id}/marks`);
  const [rows, setRows] = useState([]);
  const [pub, setPub] = useState(a.published);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  useEffect(() => { if (sheet.data) setRows(sheet.data.students.map((s) => ({ ...s, marks: s.marks ?? '' }))); }, [sheet.data]);
  const edit = sheet.data && sheet.data.can_edit;
  const save = () => {
    setBusy(true); setErr(null);
    api.post(`/api/assessments/${a.id}/marks`, { published: pub, entries: rows.map((r) => ({ student_id: r.student_id, marks: r.marks === '' ? null : Number(r.marks), remark: r.remark || '' })) })
      .then(() => { toast(pub ? 'Marks saved and published to families.' : 'Marks saved as a draft.'); onClose(true); })
      .catch(setErr).finally(() => setBusy(false));
  };
  const filled = rows.filter((r) => r.marks !== '').map((r) => Number(r.marks));
  return (
    <Modal wide title={`${a.name} · ${a.subject}`} kicker={`${a.class_label} · out of ${a.max_marks}`} onClose={() => onClose(false)}
      footer={edit ? <>
        <label className="pt-check" style={{ marginRight: 'auto' }}><input type="checkbox" checked={pub} onChange={(e) => setPub(e.target.checked)} /> Publish to families</label>
        <Btn kind="line" onClick={() => onClose(false)}>Cancel</Btn>
        <Btn kind="primary" disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save marks'}</Btn>
      </> : <Btn kind="dark" onClick={() => onClose(false)}>Close</Btn>}>
      {sheet.loading ? <Loading /> : (
        <>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 14 }}>
            <span>Entered <b>{filled.length}</b> / {rows.length}</span>
            <span>Average <b>{filled.length ? (filled.reduce((x, y) => x + y, 0) / filled.length).toFixed(1) : '—'}</b></span>
            <span>Highest <b>{filled.length ? Math.max(...filled) : '—'}</b></span>
          </div>
          <div className="pt-card pt-tablewrap">
            <table className="pt-table pt-marks">
              <thead><tr><th>Roll</th><th>Student</th><th className="num">Marks</th><th>Remark</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.student_id}>
                    <td className="muted">{r.roll_no}</td>
                    <td>{r.name}</td>
                    <td className="num">
                      <input className="pt-input" type="number" min="0" max={a.max_marks} step="0.5" disabled={!edit} value={r.marks}
                        onChange={(e) => setRows((x) => x.map((y, j) => j === i ? { ...y, marks: e.target.value } : y))}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const n = e.currentTarget.closest('tr').nextElementSibling; n && n.querySelector('input').focus(); } }} />
                    </td>
                    <td><input className="pt-input" style={{ minHeight: 36, padding: '6px 12px' }} disabled={!edit} value={r.remark || ''} placeholder="Optional"
                      onChange={(e) => setRows((x) => x.map((y, j) => j === i ? { ...y, remark: e.target.value } : y))} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <ErrorNote error={err} />
    </Modal>
  );
}

export default function Marks() {
  const me = useMe();
  const classes = useClasses();
  const [cid, setCid] = useState('');
  const [open, setOpen] = useState(null);
  const [n, setN] = useState(0);
  const subjects = useLoad(cid ? `/api/subjects?class_id=${cid}` : null);
  const mySubjects = (subjects.data || []).filter((s) => {
    if (me.role !== 'teacher') return true;
    const c = (classes.data || []).find((x) => String(x.id) === String(cid));
    return s.teacher_id === me.id || (c && c.class_teacher_id === me.id);
  });
  return (
    <>
      <PageHead kicker="Academics" title="Class tests" actions={<ClassSelect classes={classes.data} value={cid} onChange={setCid} />}>
        Unit tests and other assessments for one subject at a time. For Mid-term, Quarterly, Half-yearly and Annual, use Exams & results.
      </PageHead>
      {classes.loading && !classes.data ? <Loading /> : !cid ? <Empty title="No classes yet" /> : (
        <Crud key={cid + ':' + n} url={`/api/assessments?class_id=${cid}`} createUrl="/api/assessments" itemUrl={(r) => `/api/assessments/${r.id}`}
          title="Assessments" tone="dark" noun="assessment" canCreate={mySubjects.length > 0}
          canEdit={(r) => r.can_edit} canDelete={(r) => r.can_edit}
          searchKeys={['name', 'subject']}
          defaults={{ class_id: cid, max_marks: 50, subject_id: mySubjects[0] ? String(mySubjects[0].id) : '' }}
          columns={[
            { label: 'Assessment', render: (r) => <button type="button" onClick={() => setOpen(r)} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'inherit' }}><b style={{ fontWeight: 600 }}>{r.name}</b><div className="muted">{fmtDate(r.held_on)}</div></button> },
            { label: 'Subject', render: (r) => r.subject },
            { label: 'Out of', className: 'num', render: (r) => r.max_marks },
            { label: 'Entered', className: 'num', render: (r) => r.entered },
            { label: 'Average', className: 'num', render: (r) => r.average ?? '—' },
            { label: 'Status', render: (r) => r.published ? <Tag tone="green">Published</Tag> : <Tag tone="gold">Draft</Tag> },
          ]}
          fields={[
            { name: 'name', label: 'Assessment', required: true, placeholder: 'e.g. Term I, Unit test 2' },
            { name: 'subject_id', label: 'Subject', type: 'select', blank: false, options: mySubjects.map((s) => ({ value: String(s.id), label: s.name })) },
            { name: 'max_marks', label: 'Maximum marks', type: 'number', min: 1 },
            { name: 'held_on', label: 'Held on', type: 'date' },
            { name: 'published', label: 'Families can see the results', type: 'checkbox', full: true },
          ]}
          toForm={(r) => ({ ...r, subject_id: r.subject_id ? String(r.subject_id) : '', held_on: r.held_on || '' })}
          fromForm={(v) => ({ class_id: Number(cid), subject_id: v.subject_id ? Number(v.subject_id) : null, name: v.name, max_marks: Number(v.max_marks) || 100, held_on: v.held_on || null, published: !!v.published })}
          onCreated={(res) => setOpen({ ...res, can_edit: true })}
          rowActions={(r) => <Btn kind="ghost" sm icon="edit" onClick={() => setOpen(r)}>{r.can_edit ? 'Enter marks' : 'View'}</Btn>}
          deleteText={(r) => `Delete “${r.name}” and all marks entered for it?`}
          emptyText={mySubjects.length ? 'Create the first assessment for this class.' : 'You are not assigned a subject in this class.'}
        />
      )}
      {open && <MarksEntry a={open} onClose={(changed) => { setOpen(null); if (changed) setN((x) => x + 1); }} />}
    </>
  );
}
