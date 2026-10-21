// One class: everything a class teacher, subject teacher or HOD does for it, in tabs.
import React from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useLoad, useMe } from '../api.js';
import { useClasses } from '../shared.jsx';
import { Card, Empty, Icon, initials, Loading, MANDALA, Seg, Stat, STATUS_WORD, Tag, today } from '../ui.jsx';
import Attendance from './Attendance.jsx';
import { ExamSheet } from './Exams.jsx';
import Homework from './Homework.jsx';
import Materials from './Materials.jsx';
import Participation from './Participation.jsx';
import Students from './Students.jsx';
import Timetable from './Timetable.jsx';

const TABS = [['', 'Overview'], ['students', 'Students'], ['attendance', 'Attendance'], ['exams', 'Exams & results'],
  ['homework', 'Homework'], ['materials', 'Study material'], ['activities', 'Participation'], ['timetable', 'Timetable']];

function Overview({ cls, subjects, canManage, me }) {
  const att = useLoad(`/api/attendance?class_id=${cls.id}&day=${today()}`);
  const roster = useLoad(`/api/students?class_id=${cls.id}`);
  const hw = useLoad(`/api/homework?class_id=${cls.id}`);
  const a = att.data;
  const counts = a ? a.students.reduce((x, s) => { if (s.status) x[s.status] = (x[s.status] || 0) + 1; return x; }, {}) : {};
  const girls = (roster.data || []).filter((s) => s.gender === 'Female').length;
  const due = (hw.data || []).filter((h) => h.due_on && h.due_on >= today());
  return (
    <>
      <div className="pt-grid" style={{ '--min': '180px' }}>
        <Stat label="Students" value={cls.students ?? '—'} note={roster.data ? `${girls} girls · ${roster.data.length - girls} boys` : ''} />
        <Stat label="Today" value={a ? (a.marked ? `${counts.P || 0} present` : 'Not marked') : '—'} note={a && a.marked ? ['A', 'L', 'H'].map((k) => `${counts[k] || 0} ${STATUS_WORD[k].toLowerCase()}`).join(' · ') : canManage ? 'Take attendance from the Attendance tab' : ''} tone="marigold" />
        <Stat label="Subjects" value={subjects.length} note={`${subjects.filter((s) => s.teacher_id).length} with a teacher`} />
        <Stat label="Homework due" value={due.length} note={due[0] ? `Next: ${due[0].subject}` : 'Nothing due'} />
      </div>
      <div className="pt-grid" style={{ '--min': '320px' }}>
        <Card title="Subjects & teachers" tone="dark">
          {!subjects.length ? <Empty title="No subjects yet" /> : (
            <div className="pt-list">{subjects.map((s) => (
              <div key={s.id} style={{ alignItems: 'center' }}>
                <span className="pt-avatar">{s.teacher ? initials(s.teacher) : '—'}</span>
                <span style={{ flex: 1 }}><b style={{ fontWeight: 600 }}>{s.name}</b><br /><small style={{ color: 'var(--color-neutral-600)' }}>{s.teacher || 'Not assigned'}</small></span>
                {s.teacher_id === me.id && <Tag tone="gold">You</Tag>}
              </div>))}</div>
          )}
        </Card>
        <Card title="Quick actions" pad>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))' }}>
            {[canManage && ['attendance', 'Take attendance', 'check'], canManage && ['students', 'Add a student', 'school'], ['exams', 'Enter exam marks', 'chart'],
              ['homework', 'Set homework', 'file'], ['materials', 'Share a PDF', 'upload'], ['activities', 'Record participation', 'activity']].filter(Boolean).map(([p, l, i]) => (
              <Link key={p} to={`/portal/classes/${cls.id}/${p}`} className="pt-btn line" style={{ justifyContent: 'flex-start', borderRadius: 16, padding: '14px 16px' }}><Icon name={i} />{l}</Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

export default function ClassRoom() {
  const { cid, '*': rest } = useParams();
  const me = useMe();
  const navigate = useNavigate();
  const classes = useClasses();
  const subjects = useLoad(`/api/subjects?class_id=${cid}`);
  const cls = (classes.data || []).find((c) => String(c.id) === String(cid));
  if (classes.loading && !classes.data) return <Loading />;
  if (!cls) return <Card pad><Empty title="Class not found">It may have been removed, or it is not one of your classes. <Link to="/portal/classes">Back to classes</Link></Empty></Card>;
  const tab = (rest || '').split('/')[0];
  const canManage = me.role === 'superadmin' || (me.role === 'hod' && cls.department_id === me.department_id) || cls.class_teacher_id === me.id;
  const mine = (subjects.data || []).filter((s) => s.teacher_id === me.id);
  const role = cls.class_teacher_id === me.id ? 'You are the class teacher' : mine.length ? `You teach ${mine.map((s) => s.name).join(', ')}` : me.role === 'hod' ? 'Your department' : '';

  return (
    <>
      <div className="pt-classhead">
        <img src={MANDALA} alt="" />
        <Link to={me.role === 'teacher' ? '/portal/classes' : `/portal/classes?grade=${encodeURIComponent(cls.name)}`} className="back"><Icon name="arrow" size={15} />{me.role === 'teacher' ? 'My classes' : cls.name}</Link>
        <div className="row">
          <span className="badge">{cls.section}</span>
          <div>
            <h1>{cls.label}</h1>
            <p>{[cls.department, cls.room, cls.academic_year].filter(Boolean).join(' · ')}</p>
          </div>
        </div>
        <div className="facts">
          <span><small>Class teacher</small>{cls.class_teacher || '—'}</span>
          <span><small>Students</small>{cls.students ?? '—'}</span>
          {role && <span><small>Your role</small>{role}</span>}
        </div>
      </div>
      <div className="pt-classtabs"><Seg value={tab} onChange={(t) => navigate(`/portal/classes/${cid}${t ? '/' + t : ''}`)} options={TABS.map(([v, l]) => ({ value: v, label: l }))} /></div>
      <Routes>
        <Route index element={<Overview cls={cls} subjects={subjects.data || []} canManage={canManage} me={me} />} />
        <Route path="students" element={<Students classId={cls.id} />} />
        <Route path="attendance" element={<Attendance classId={cls.id} />} />
        <Route path="exams" element={<ExamSheet classId={cls.id} />} />
        <Route path="homework" element={<Homework classId={cls.id} />} />
        <Route path="materials" element={<Materials classId={cls.id} />} />
        <Route path="activities" element={<Participation classId={cls.id} />} />
        <Route path="timetable" element={<Timetable classId={cls.id} />} />
        <Route path="*" element={<Navigate to={`/portal/classes/${cid}`} replace />} />
      </Routes>
    </>
  );
}
