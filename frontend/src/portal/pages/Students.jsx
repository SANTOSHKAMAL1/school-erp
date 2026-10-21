import React, { useState } from 'react';
import Crud from '../Crud.jsx';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, classOptions, useClasses } from '../shared.jsx';
import { Btn, Card, Confirm, Credentials, fmtDate, fmtTime, IconBtn, initials, Loading, Modal, PageHead, Stat, Tag } from '../ui.jsx';

function StudentCard({ s, onClose }) {
  const att = useLoad(`/api/attendance/student/${s.id}`);
  const res = useLoad(`/api/results/student/${s.id}`);
  const o = att.data && att.data.overall;
  return (
    <Modal wide title={s.name} kicker={`${s.class_label || 'No class'} · ${s.admission_no}`} onClose={onClose} footer={<Btn kind="dark" onClick={onClose}>Close</Btn>}>
      <div className="pt-grid" style={{ '--min': '160px' }}>
        <Stat label="Attendance" value={o && o.percent != null ? o.percent + '%' : '—'} note={o ? `${o.days} days · ${o.absent} absent` : ''} tone="marigold" />
        <Stat label="Roll no." value={s.roll_no || '—'} note={s.gender || ''} />
        <Stat label="Family login" value={<span style={{ fontSize: 20 }}>{s.login}</span>} note={s.last_login ? 'Last signed in ' + fmtTime(s.last_login) : 'Not signed in yet'} />
      </div>
      <div className="pt-form">
        {[['Parent / guardian', s.parent_name], ['Mother', s.mother_name], ['Mobile', s.phone], ['Email', s.email], ['Date of birth', fmtDate(s.dob)],
          ['Blood group', s.blood_group], ['Admitted on', fmtDate(s.admitted_on)], ['Address', s.address]].map(([k, v]) => (
          <div key={k} className="pt-field"><span style={{ color: 'var(--color-accent-700)', fontSize: 11.5, letterSpacing: '.12em', textTransform: 'uppercase' }}>{k}</span><div style={{ fontSize: 15 }}>{v || '—'}</div></div>
        ))}
      </div>
      <Card title="Results" tone="gold">
        {res.loading ? <Loading /> : (
          <table className="pt-table">
            <thead><tr><th>Assessment</th><th>Subject</th><th className="num">Marks</th><th className="num">Class avg.</th></tr></thead>
            <tbody>
              {(res.data || []).map((r) => (
                <tr key={r.id}><td>{r.name}{!r.published && <> <Tag>Draft</Tag></>}</td><td>{r.subject}</td>
                  <td className="num">{r.marks == null ? '—' : `${r.marks} / ${r.max_marks}`}</td><td className="num muted">{r.class_average ?? '—'}</td></tr>
              ))}
              {!(res.data || []).length && <tr><td colSpan="4" className="muted">No marks yet.</td></tr>}
            </tbody>
          </table>
        )}
      </Card>
    </Modal>
  );
}

function Reset({ s }) {
  const [ask, setAsk] = useState(false);
  const [cred, setCred] = useState(null);
  return (
    <>
      <IconBtn icon="key" label="Reset family password" onClick={() => setAsk(true)} />
      {ask && <Confirm title="Reset family password?" confirmLabel="Reset" onClose={() => setAsk(false)}
        onConfirm={() => api.post(`/api/students/${s.id}/reset-password`).then((r) => setCred({ who: s.parent_name || s.name, login: r.login, password: r.temp_password }))}>
        The family of {s.name} will get a new temporary password. They will be signed out on every device.
      </Confirm>}
      {cred && <Credentials {...cred} onClose={() => setCred(null)} />}
    </>
  );
}

export default function Students() {
  const me = useMe();
  const classes = useClasses();
  const [cid, setCid] = useState('');
  const [view, setView] = useState(null);
  const managed = (classes.data || []).filter((c) => me.role !== 'teacher' || c.class_teacher_id === me.id);
  const cls = (classes.data || []).find((c) => String(c.id) === String(cid));
  const canAdd = me.role !== 'teacher' ? managed.length > 0 : managed.length > 0;
  const canChange = (r) => me.role !== 'teacher' || managed.some((c) => c.id === r.class_id);

  return (
    <>
      <PageHead kicker={me.role === 'teacher' ? 'My classes' : 'People'} title={me.role === 'superadmin' ? 'Students & families' : 'Students'}>
        Adding a student creates the family login at the same time — the admission number is the Family ID, and parents can also sign in with the registered mobile number.
      </PageHead>
      <Crud key={cid} url={`/api/students?include_inactive=true${cid ? `&class_id=${cid}` : ''}`} createUrl="/api/students" itemUrl={(r) => `/api/students/${r.id}`}
        title={cls ? `${cls.label} · class teacher ${cls.class_teacher || '—'}` : 'All students'} tone="dark" noun="student" modalWide
        canCreate={canAdd} canEdit={canChange} canDelete={(r) => canChange(r) && r.active}
        searchKeys={['name', 'admission_no', 'parent_name', 'phone', 'class_label']}
        filters={<ClassSelect classes={classes.data} value={cid} onChange={setCid} auto={false} allLabel="All my classes" />}
        defaults={{ class_id: cid || (managed[0] ? String(managed[0].id) : ''), active: true }}
        columns={[
          { label: 'Student', render: (r) => <button type="button" onClick={() => setView(r)} className="pt-name" style={{ border: 0, background: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, color: 'inherit' }}>
            <span className="pt-avatar" style={{ background: r.gender === 'Female' ? 'var(--color-accent-200)' : 'var(--color-accent-2-300)' }}>{initials(r.name)}</span>
            <span><b>{r.name}</b><small>{r.admission_no}{r.roll_no ? ` · Roll ${r.roll_no}` : ''}</small></span></button> },
          { label: 'Class', render: (r) => r.class_label || '—' },
          { label: 'Parent', render: (r) => <span>{r.parent_name || '—'}<br /><span className="muted">{r.phone}</span></span> },
          { label: 'Family login', render: (r) => !r.active ? <Tag>Left</Tag> : r.last_login ? <Tag tone="green">Active</Tag> : <Tag tone="gold">Not signed in</Tag> },
        ]}
        fields={[
          { name: 'name', label: 'Student’s full name', required: true },
          { name: 'class_id', label: 'Class', type: 'select', required: true, blank: false, options: classOptions(managed) },
          { name: 'admission_no', label: 'Admission number (Family ID)', placeholder: 'Leave blank to number automatically', help: 'Cannot be changed later.' },
          { name: 'roll_no', label: 'Roll number' },
          { name: 'parent_name', label: 'Parent / guardian name', placeholder: 'e.g. Smt. Anuradha Rao' },
          { name: 'mother_name', label: 'Mother’s name' },
          { name: 'phone', label: 'Parent mobile', type: 'tel', help: 'Parents can sign in with this number too.' },
          { name: 'email', label: 'Parent email', type: 'email' },
          { name: 'dob', label: 'Date of birth', type: 'date' },
          { name: 'gender', label: 'Gender', type: 'select', options: [{ value: 'Female', label: 'Female' }, { value: 'Male', label: 'Male' }, { value: 'Other', label: 'Other' }] },
          { name: 'blood_group', label: 'Blood group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((x) => ({ value: x, label: x })) },
          { name: 'admitted_on', label: 'Admitted on', type: 'date' },
          { name: 'address', label: 'Address', type: 'textarea', full: true, rows: 2 },
          { name: 'active', label: 'Studying here (untick when the student leaves)', type: 'checkbox', full: true },
        ]}
        toForm={(r) => ({ ...r, class_id: r.class_id ? String(r.class_id) : '', dob: r.dob || '', admitted_on: r.admitted_on || '' })}
        fromForm={(v) => ({ ...v, class_id: v.class_id ? Number(v.class_id) : null, dob: v.dob || null, admitted_on: v.admitted_on || null })}
        deleteLabel="Mark as left"
        deleteText={(r) => `${r.name} will be marked as having left, and the family login will stop working. Records are kept.`}
        rowActions={(r) => canChange(r) && r.active ? <Reset s={r} /> : null}
        emptyText={canAdd ? 'Add the first student to this class.' : 'Students appear here once added to your classes.'}
      />
      {view && <StudentCard s={view} onClose={() => setView(null)} />}
    </>
  );
}
