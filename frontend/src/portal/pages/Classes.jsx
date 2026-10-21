import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Crud from '../Crud.jsx';
import { api, useLoad, useMe } from '../api.js';
import { Btn, Empty, ErrorNote, IconBtn, Loading, Modal, PageHead, Tag, toast } from '../ui.jsx';

function SubjectsModal({ cls, teachers, onClose }) {
  const list = useLoad(`/api/subjects?class_id=${cls.id}`);
  const [name, setName] = useState('');
  const [tid, setTid] = useState('');
  const [err, setErr] = useState(null);
  const add = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    api.post('/api/subjects', { class_id: cls.id, name, teacher_id: tid ? Number(tid) : null })
      .then(() => { setName(''); setTid(''); list.reload(); }).catch(setErr);
  };
  const change = (s, teacher_id) => api.put(`/api/subjects/${s.id}`, { class_id: cls.id, name: s.name, teacher_id: teacher_id ? Number(teacher_id) : null })
    .then(() => { toast('Saved.'); list.reload(); }).catch(setErr);
  return (
    <Modal wide title={`Subjects · ${cls.label}`} kicker="Who teaches what" onClose={onClose} footer={<Btn kind="dark" onClick={onClose}>Done</Btn>}>
      <p style={{ fontSize: 14.5, color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>Subject teachers can enter marks and set homework for their subject. The class teacher can do it for every subject.</p>
      {list.loading && !list.data ? <Loading /> : (
        <div className="pt-card">
          <table className="pt-table">
            <thead><tr><th>Subject</th><th>Teacher</th><th /></tr></thead>
            <tbody>
              {(list.data || []).map((s) => (
                <tr key={s.id}>
                  <td><b style={{ fontWeight: 600 }}>{s.name}</b></td>
                  <td>
                    <select className="pt-select" value={s.teacher_id || ''} onChange={(e) => change(s, e.target.value)}>
                      <option value="">— Not assigned —</option>
                      {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </td>
                  <td><div className="pt-rowacts"><IconBtn icon="trash" label="Remove" onClick={() => api.del(`/api/subjects/${s.id}`).then(list.reload).catch(setErr)} /></div></td>
                </tr>
              ))}
              {!(list.data || []).length && <tr><td colSpan="3"><Empty title="No subjects yet" /></td></tr>}
            </tbody>
          </table>
        </div>
      )}
      <form onSubmit={add} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) auto', gap: 10 }}>
        <input className="pt-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Subject, e.g. Mathematics" />
        <select className="pt-select" value={tid} onChange={(e) => setTid(e.target.value)}>
          <option value="">— Teacher —</option>
          {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <Btn kind="primary" icon="plus" onClick={add}>Add</Btn>
      </form>
      <ErrorNote error={err} />
    </Modal>
  );
}

export default function Classes() {
  const me = useMe();
  const staff = useLoad('/api/staff');
  const depts = useLoad(me.role === 'superadmin' ? '/api/departments' : null);
  const [subjectsFor, setSubjectsFor] = useState(null);
  const teachers = staff.data || [];
  const canManage = me.role !== 'teacher';

  return (
    <>
      <PageHead kicker={me.role === 'hod' ? me.department : 'Academics'} title="Add or edit classes & subjects" actions={<Link className="pt-btn line" to="/portal/classes">Back to class cards</Link>}>
        Set up each class and section, choose its class teacher, and assign a teacher to every subject.
      </PageHead>
      <Crud url="/api/classes" title="Classes" tone="dark" noun="class" canCreate={canManage} canEdit={() => canManage} canDelete={() => canManage}
        searchKeys={['label', 'class_teacher', 'department']}
        defaults={{ section: 'A', academic_year: '2026-27', department_id: me.department_id ? String(me.department_id) : '' }}
        columns={[
          { label: 'Class', render: (r) => <b style={{ fontWeight: 600 }}>{r.label}</b> },
          ...(me.role === 'superadmin' ? [{ label: 'Department', render: (r) => r.department || '—' }] : []),
          { label: 'Class teacher', render: (r) => r.class_teacher || <Tag tone="red">Not assigned</Tag> },
          { label: 'Room', render: (r) => <span className="muted">{r.room || '—'}</span> },
          { label: 'Year', render: (r) => <span className="muted">{r.academic_year}</span> },
          { label: 'Students', className: 'num', render: (r) => r.students },
        ]}
        fields={[
          { name: 'name', label: 'Class', required: true, placeholder: 'e.g. Grade 5, LKG' },
          { name: 'section', label: 'Section', placeholder: 'A' },
          ...(me.role === 'superadmin' ? [{ name: 'department_id', label: 'Department', type: 'select', options: (depts.data || []).map((d) => ({ value: String(d.id), label: d.name })) }] : []),
          { name: 'class_teacher_id', label: 'Class teacher', type: 'select', blankLabel: '— Choose later —', options: teachers.map((t) => ({ value: String(t.id), label: t.name })) },
          { name: 'room', label: 'Room' },
          { name: 'academic_year', label: 'Academic year', placeholder: '2026-27' },
        ]}
        toForm={(r) => ({ ...r, department_id: r.department_id ? String(r.department_id) : '', class_teacher_id: r.class_teacher_id ? String(r.class_teacher_id) : '' })}
        fromForm={(v) => ({ name: v.name, section: v.section || 'A', room: v.room || '', academic_year: v.academic_year || '2026-27',
          department_id: v.department_id ? Number(v.department_id) : null, class_teacher_id: v.class_teacher_id ? Number(v.class_teacher_id) : null })}
        deleteText={(r) => `Delete ${r.label}? Only empty classes can be deleted.`}
        rowActions={(r) => <Btn kind="ghost" sm icon="book" onClick={() => setSubjectsFor(r)}>Subjects</Btn>}
      />
      {subjectsFor && <SubjectsModal cls={subjectsFor} teachers={teachers.filter((t) => !subjectsFor.department_id || !t.department_id || t.department_id === subjectsFor.department_id)} onClose={() => setSubjectsFor(null)} />}
    </>
  );
}
