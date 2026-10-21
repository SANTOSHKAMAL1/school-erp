// Classes as cards: grades → sections → the class workspace. Teachers see the classes they teach.
import React, { lazy, useMemo } from 'react';
import { Link, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useLoad, useMe } from '../api.js';
import { useClasses } from '../shared.jsx';
import { Btn, Card, Empty, ErrorNote, Icon, initials, Loading, PageHead, Stat, Tag, useReveal } from '../ui.jsx';

const ClassRoom = lazy(() => import('./ClassRoom.jsx'));
const ManageClasses = lazy(() => import('./Classes.jsx'));

function groupByGrade(classes) {
  const out = [];
  (classes || []).forEach((c) => {
    let g = out.find((x) => x.name === c.name);
    if (!g) out.push((g = { name: c.name, department: c.department, sections: [] }));
    g.sections.push(c);
  });
  return out;
}

/** One section as a card. `subjects` = what the signed-in teacher teaches there. */
export function SectionCard({ c, subjects, me }) {
  const navigate = useNavigate();
  const isCT = me && c.class_teacher_id === me.id;
  return (
    <button type="button" className="pt-classcard pt-reveal" onClick={() => navigate(`/portal/classes/${c.id}`)}>
      <span className="top">
        <span className="badge">{c.section}</span>
        <span className="nm"><b>{c.label}</b><small>{c.department || c.academic_year}</small></span>
        {isCT && <Tag tone="gold">Class teacher</Tag>}
      </span>
      <span className="row"><Icon name="school" size={16} /> {c.students ?? 0} student{c.students === 1 ? '' : 's'}</span>
      <span className="row"><Icon name="user" size={16} /> {c.class_teacher || <i>No class teacher yet</i>}</span>
      {subjects && subjects.length > 0 && <span className="subs">{subjects.map((s) => <span key={s.id}>{s.name}</span>)}</span>}
      <span className="go">Open class <Icon name="arrow" size={15} /></span>
    </button>
  );
}

/** The classes a teacher works in, as cards (used on My classes and the Overview). */
export function MyClassCards() {
  const me = useMe();
  const classes = useClasses();
  const subs = useLoad('/api/subjects?mine=true');
  useReveal(classes.data);
  if (classes.loading && !classes.data) return <Loading />;
  if (classes.error) return <ErrorNote error={classes.error} />;
  const list = [...(classes.data || [])].sort((a, b) => (b.class_teacher_id === me.id) - (a.class_teacher_id === me.id));
  if (!list.length) return <Card pad><Empty title="No classes yet">Your HOD assigns you as a class teacher or subject teacher.</Empty></Card>;
  return (
    <div className="pt-grid" style={{ '--min': '250px' }}>
      {list.map((c) => <SectionCard key={c.id} c={c} me={me} subjects={(subs.data || []).filter((s) => s.class_id === c.id && s.teacher_id === me.id)} />)}
    </div>
  );
}

function GradeBoard() {
  const me = useMe();
  const classes = useClasses();
  const [params, setParams] = useSearchParams();
  const grade = params.get('grade');
  const grades = useMemo(() => groupByGrade(classes.data), [classes.data]);
  useReveal(grade || classes.data);
  if (classes.loading && !classes.data) return <Loading />;
  if (classes.error) return <ErrorNote error={classes.error} />;
  const all = classes.data || [];
  const students = all.reduce((a, c) => a + (c.students || 0), 0);
  const noTeacher = all.filter((c) => !c.class_teacher_id).length;
  const manage = me.role !== 'teacher' && <Link className="pt-btn line" to="/portal/classes/manage"><Icon name="edit" size={16} />Add or edit classes & subjects</Link>;
  const g = grade && grades.find((x) => x.name === grade);

  if (g) {
    const total = g.sections.reduce((a, c) => a + (c.students || 0), 0);
    return (
      <>
        <PageHead kicker={<><Link to="/portal/classes" onClick={(e) => { e.preventDefault(); setParams({}); }}>All grades</Link> / {g.name}</>} title={g.name}
          actions={<><Btn kind="line" onClick={() => setParams({})}>← All grades</Btn>{manage}</>}>
          {g.sections.length} section{g.sections.length === 1 ? '' : 's'} · {total} students{g.department ? ` · ${g.department}` : ''}. Open a section to take attendance, enter marks, add students and more.
        </PageHead>
        <div className="pt-grid" style={{ '--min': '260px' }}>
          {g.sections.map((c) => <SectionCard key={c.id} c={c} me={me} />)}
        </div>
      </>
    );
  }
  return (
    <>
      <PageHead kicker={me.role === 'hod' ? me.department : 'Academics'} title="Classes & sections" actions={manage}>
        Every grade in {me.role === 'hod' ? 'your department' : 'the school'}. Open a grade to see its sections, students and class teachers.
      </PageHead>
      <div className="pt-grid" style={{ '--min': '180px' }}>
        <Stat label="Grades" value={grades.length} note={`${all.length} section${all.length === 1 ? '' : 's'}`} />
        <Stat label="Students" value={students} note="Studying now" tone="marigold" />
        <Stat label="Class teachers" value={all.length - noTeacher} note={noTeacher ? `${noTeacher} section${noTeacher === 1 ? '' : 's'} without one` : 'Every section has one'} />
      </div>
      {!grades.length ? <Card pad><Empty title="No classes yet">{me.role === 'teacher' ? 'Your HOD assigns classes.' : 'Add the first class with “Add or edit classes”.'}</Empty></Card> : (
        <div className="pt-grid" style={{ '--min': '230px' }}>
          {grades.map((x) => {
            const n = x.sections.reduce((a, c) => a + (c.students || 0), 0);
            return (
              <button key={x.name} type="button" className="pt-gradecard pt-reveal" onClick={() => setParams({ grade: x.name })}>
                <span className="k">{x.department || 'Grade'}</span>
                <b>{x.name}</b>
                <span className="n">{x.sections.length} section{x.sections.length === 1 ? '' : 's'} · {n} student{n === 1 ? '' : 's'}</span>
                <span className="secs">
                  {x.sections.map((c) => (
                    <span key={c.id} title={c.class_teacher || 'No class teacher'}>
                      <i>{c.section}</i>{c.class_teacher ? initials(c.class_teacher) : '—'}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

function MyClasses() {
  return (
    <>
      <PageHead kicker="My classes" title="My classes">
        Every class you teach. Open one to take attendance, add students, enter marks, set homework and share study material.
      </PageHead>
      <MyClassCards />
    </>
  );
}

export default function ClassesHome() {
  const me = useMe();
  return (
    <Routes>
      <Route index element={me.role === 'teacher' ? <MyClasses /> : <GradeBoard />} />
      {me.role !== 'teacher' && <Route path="manage" element={<ManageClasses />} />}
      <Route path=":cid/*" element={<ClassRoom />} />
    </Routes>
  );
}
