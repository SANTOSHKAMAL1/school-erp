import React, { useState } from 'react';
import Crud from '../Crud.jsx';
import { api, useLoad, useMe } from '../api.js';
import { Confirm, Credentials, fmtTime, IconBtn, initials, PageHead, Tag, toast } from '../ui.jsx';

function ResetPassword({ user, noun }) {
  const [ask, setAsk] = useState(false);
  const [cred, setCred] = useState(null);
  return (
    <>
      <IconBtn icon="key" label="Reset password" onClick={() => setAsk(true)} />
      {ask && (
        <Confirm title="Reset password?" confirmLabel="Reset" onClose={() => setAsk(false)}
          onConfirm={() => api.post(`/api/users/${user.id}/reset-password`).then((r) => setCred({ who: user.name, login: r.login, password: r.temp_password }))}>
          {user.name} will get a new temporary password and be signed out everywhere.
        </Confirm>
      )}
      {cred && <Credentials {...cred} role={noun} onClose={() => setCred(null)} />}
    </>
  );
}

const nameCell = (r) => (
  <div className="pt-name">
    <span className="pt-avatar">{initials(r.name)}</span>
    <span><b>{r.name}</b><small>{r.login}</small></span>
  </div>
);

export default function People({ kind }) {
  const me = useMe();
  const depts = useLoad(me.role === 'superadmin' ? '/api/departments' : null);
  const deptOptions = (depts.data || []).map((d) => ({ value: String(d.id), label: d.name }));
  const hods = useLoad(kind === 'departments' ? '/api/staff?role=hod' : null);

  if (kind === 'departments') {
    return (
      <>
        <PageHead kicker="People" title="Departments">Each department has a Head of Department who adds its teachers and runs its classes.</PageHead>
        <Crud url="/api/departments" title="All departments" tone="dark" noun="department"
          columns={[
            { label: 'Department', render: (r) => <div><b style={{ fontWeight: 600 }}>{r.name}</b><div className="muted">{r.description}</div></div> },
            { label: 'HOD', render: (r) => r.hod ? r.hod.name : <Tag tone="red">No HOD</Tag> },
            { label: 'Teachers', className: 'num', render: (r) => r.teachers },
            { label: 'Classes', className: 'num', render: (r) => r.classes },
          ]}
          fields={[
            { name: 'name', label: 'Name', required: true, full: true, placeholder: 'e.g. Primary' },
            { name: 'description', label: 'Description', full: true, placeholder: 'e.g. Grades 1 to 5' },
            { name: 'hod_id', label: 'Head of Department', type: 'select', full: true, blankLabel: '— Choose later —',
              options: (hods.data || []).map((h) => ({ value: String(h.id), label: `${h.name}${h.department ? ' (' + h.department + ')' : ''}` })),
              help: 'Create HOD accounts on the HODs page first.' },
          ]}
          toForm={(r) => ({ ...r, hod_id: r.hod ? String(r.hod.id) : '' })}
          fromForm={(v) => ({ name: v.name, description: v.description || '', hod_id: v.hod_id ? Number(v.hod_id) : null })}
          deleteText={(r) => `Delete “${r.name}”? Its classes and staff stay but lose the department link.`}
        />
      </>
    );
  }

  const isHod = kind === 'hods';
  const role = isHod ? 'hod' : 'teacher';
  const noun = isHod ? 'HOD' : 'teacher';
  const fields = [
    { name: 'name', label: 'Full name', required: true, placeholder: isHod ? 'e.g. Smt. Lakshmi Rao' : 'e.g. Sri Mahesh Kumar' },
    { name: 'login', label: 'Login ID', placeholder: isHod ? 'Leave blank to create one, e.g. hod.lakshmi' : 'Leave blank to create one, e.g. t.mahesh', help: 'Used to sign in. Letters, numbers, dots.' },
    { name: 'phone', label: 'Mobile', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'designation', label: 'Designation', placeholder: isHod ? 'Head of Department' : 'e.g. Primary teacher (PRT)' },
    { name: 'qualification', label: 'Qualification', placeholder: 'e.g. M.A., B.Ed.' },
  ];
  if (me.role === 'superadmin') fields.push({ name: 'department_id', label: 'Department', type: 'select', options: deptOptions, required: isHod });
  fields.push({ name: 'active', label: 'Account is active (can sign in)', type: 'checkbox', full: true });

  return (
    <>
      <PageHead kicker={me.role === 'hod' ? me.department : 'People'} title={isHod ? 'Heads of Department' : 'Teachers'}>
        {isHod ? 'HODs add the teachers in their department, set up classes and subjects, and see their department’s records.'
          : me.role === 'hod' ? 'Add the teachers in your department. Teachers add the students in the classes they lead.'
            : 'All teachers across departments. HODs add teachers for their own department.'}
      </PageHead>
      <Crud url={`/api/staff?role=${role}&include_inactive=true`} createUrl="/api/staff" itemUrl={(r) => `/api/staff/${r.id}`}
        title={isHod ? 'HOD accounts' : 'Teacher accounts'} tone="dark" noun={noun}
        searchKeys={['name', 'login', 'department', 'phone']}
        defaults={{ role, active: true, department_id: '' }}
        columns={[
          { label: 'Name', render: nameCell },
          ...(me.role === 'superadmin' ? [{ label: 'Department', render: (r) => r.department || <span className="muted">—</span> }] : []),
          { label: isHod ? 'Contact' : 'Class teacher of', render: (r) => isHod ? <span className="muted">{r.phone || r.email || '—'}</span> : (r.class_teacher_of || []).join(', ') || <span className="muted">—</span> },
          ...(!isHod ? [{ label: 'Subjects', render: (r) => <span className="muted">{(r.subjects || []).slice(0, 3).join(', ') || '—'}{(r.subjects || []).length > 3 ? ` +${r.subjects.length - 3}` : ''}</span> }] : []),
          { label: 'Last sign-in', render: (r) => <span className="muted">{r.last_login ? fmtTime(r.last_login) : 'Never'}</span> },
          { label: 'Status', render: (r) => !r.active ? <Tag tone="grey">Off</Tag> : r.must_change_password ? <Tag tone="gold">Temp password</Tag> : <Tag tone="green">Active</Tag> },
        ]}
        fields={fields}
        toForm={(r) => ({ ...r, department_id: r.department_id ? String(r.department_id) : '' })}
        fromForm={(v) => ({ ...v, role, department_id: v.department_id ? Number(v.department_id) : null })}
        deleteLabel="Switch off"
        canDelete={(r) => r.active}
        deleteText={(r) => `${r.name} will no longer be able to sign in. Their records stay. You can switch the account back on by editing it.`}
        rowActions={(r) => <ResetPassword user={r} noun={noun} />}
        emptyText={isHod ? 'Add an HOD for each department.' : 'Add your first teacher.'}
      />
    </>
  );
}
