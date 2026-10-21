// Faculty: every teacher as a card — class teacher of, subjects and classes taught, contact — with their week.
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoad, useMe } from '../api.js';
import { Btn, Card, Empty, ErrorNote, Icon, initials, Loading, Modal, PageHead, Search, Seg, Stat, Tag, useReveal } from '../ui.jsx';
import { Grid } from './Timetable.jsx';

function TeacherWeek({ t, classes, onClose }) {
  const tt = useLoad(`/api/timetable?teacher_id=${t.id}`);
  const ct = classes.filter((c) => c.class_teacher_id === t.id);
  return (
    <Modal wide title={t.name} kicker={[t.designation, t.department].filter(Boolean).join(' · ')} onClose={onClose} footer={<Btn kind="dark" onClick={onClose}>Close</Btn>}>
      <div className="pt-grid" style={{ '--min': '170px' }}>
        <Stat label="Class teacher of" value={ct.length ? ct.map((c) => c.label).join(', ') : '—'} />
        <Stat label="Periods a week" value={tt.data ? tt.data.length : '—'} tone="marigold" />
        <Stat label="Subjects" value={(t.subjects || []).length} note={[...new Set((t.subjects || []).map((s) => s.split(' · ')[0]))].join(', ')} />
      </div>
      <div className="pt-form">
        {[['Login ID', t.login], ['Phone', t.phone ? <a href={`tel:${t.phone}`}>{t.phone}</a> : '—'], ['Email', t.email || '—'], ['Qualification', t.qualification || '—']].map(([k, v]) => (
          <div key={k} className="pt-field"><span style={{ color: 'var(--color-accent-700)', fontSize: 11.5, letterSpacing: '.12em', textTransform: 'uppercase' }}>{k}</span><div style={{ fontSize: 15 }}>{v}</div></div>
        ))}
      </div>
      {ct.length > 0 && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{ct.map((c) => <Link key={c.id} className="pt-btn line sm" to={`/portal/classes/${c.id}`}>Open {c.label}</Link>)}</div>}
      <Card title="Weekly timetable" tone="dark">{tt.loading ? <Loading /> : <Grid slots={tt.data || []} showClass />}</Card>
    </Modal>
  );
}

export default function Faculty() {
  const me = useMe();
  const staff = useLoad('/api/staff');
  const classes = useLoad('/api/classes');
  const [q, setQ] = useState('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(null);
  useReveal(staff.data);
  const rows = useMemo(() => (staff.data || []).filter((t) => (!role || t.role === role) &&
    (!q.trim() || `${t.name} ${(t.subjects || []).join(' ')} ${(t.class_teacher_of || []).join(' ')}`.toLowerCase().includes(q.trim().toLowerCase()))), [staff.data, q, role]);
  const all = staff.data || [];
  const teachers = all.filter((t) => t.role === 'teacher');
  const free = teachers.filter((t) => !(t.class_teacher_of || []).length && !(t.subjects || []).length).length;

  return (
    <>
      <PageHead kicker={me.role === 'hod' ? me.department : 'People'} title="Faculty"
        actions={<Link className="pt-btn primary" to="/portal/teachers"><Icon name="plus" size={17} />Add or manage teachers</Link>}>
        Every teacher{me.role === 'hod' ? ' in your department' : ''}, the class they look after and the subjects they teach. Open a card for their weekly timetable.
      </PageHead>
      {staff.loading && !staff.data ? <Loading /> : staff.error ? <ErrorNote error={staff.error} /> : (
        <>
          <div className="pt-grid" style={{ '--min': '180px' }}>
            <Stat label="Teachers" value={teachers.length} note={me.role === 'superadmin' ? `${all.length - teachers.length} HODs` : me.department} />
            <Stat label="Class teachers" value={teachers.filter((t) => (t.class_teacher_of || []).length).length} note="Look after a section" tone="marigold" />
            <Stat label="Not assigned" value={free} note={free ? 'No class or subject yet' : 'Everyone has a class'} />
          </div>
          <div className="pt-toolbar" style={{ padding: 0, border: 0 }}>
            <Search value={q} onChange={setQ} placeholder="Search by name, subject or class" />
            {me.role === 'superadmin' && <Seg value={role} onChange={setRole} options={[{ value: '', label: 'Everyone' }, { value: 'teacher', label: 'Teachers' }, { value: 'hod', label: 'HODs' }]} />}
          </div>
          {!rows.length ? <Card pad><Empty title={q ? 'No matches' : 'No teachers yet'}>{q ? 'Try another search.' : 'Add teachers with “Add or manage teachers”.'}</Empty></Card> : (
            <div className="pt-grid" style={{ '--min': '280px' }}>
              {rows.map((t) => {
                const groups = {};
                (t.subjects || []).forEach((s) => { const [sub, cl] = s.split(' · '); (groups[sub] = groups[sub] || []).push(cl); });
                return (
                  <button key={t.id} type="button" className="pt-teachercard pt-reveal" onClick={() => setOpen(t)}>
                    <span className="top">
                      <span className="pt-avatar lg">{initials(t.name)}</span>
                      <span className="nm"><b>{t.name}</b><small>{t.role === 'hod' ? 'Head of Department' : t.qualification || t.designation || 'Teacher'}</small></span>
                      {!t.last_login && <Tag>Not signed in</Tag>}
                    </span>
                    <span className="row"><small>Class teacher</small>{(t.class_teacher_of || []).length ? t.class_teacher_of.map((c) => <Tag key={c} tone="gold">{c}</Tag>) : <i>—</i>}</span>
                    <span className="row"><small>Teaches</small>
                      {Object.keys(groups).length ? Object.entries(groups).map(([sub, cls]) => <span key={sub} className="sub"><b>{sub}</b> {cls.join(', ')}</span>) : <i>No subjects yet</i>}
                    </span>
                    {t.phone && <span className="row muted"><Icon name="phone" size={14} />{t.phone}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
      {open && <TeacherWeek t={open} classes={classes.data || []} onClose={() => setOpen(null)} />}
    </>
  );
}
