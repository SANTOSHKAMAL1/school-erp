import React from 'react';
import { Link } from 'react-router-dom';
import { useLoad, useMe } from '../api.js';
import { Card, Empty, ErrorNote, fmtDate, fmtTime, Icon, Loading, MANDALA, money, PageHead, Stat, Tag, useReveal, WEEKDAYS } from '../ui.jsx';
import { MyClassCards } from './ClassBoard.jsx';

function greet() {
  const h = new Date().getHours();
  return h < 12 ? 'Suprabhatam' : h < 17 ? 'Namaste' : 'Shubha sandhya';
}

export default function Overview() {
  const me = useMe();
  const { data: d, error, loading } = useLoad('/api/dashboard');
  const circ = useLoad('/api/circulars');
  useReveal(d);
  if (loading && !d) return <Loading />;
  if (error) return <ErrorNote error={error} />;
  const pct = d.students ? Math.round((100 * d.present_today) / Math.max(1, d.marked_today || d.students)) : 0;

  return (
    <>
      <div className="pt-card" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-accent-900)', color: 'var(--color-accent-2-200)', padding: 'clamp(24px,3vw,38px)' }}>
        <img src={MANDALA} alt="" style={{ position: 'absolute', right: '-90px', top: '-120px', width: 380, opacity: 0.12, animation: 'pt-turn 300s linear infinite' }} />
        <span style={{ fontSize: 11.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--color-accent-2-500)' }}>
          {new Date(d.today + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(26px,2.7vw,38px)', color: 'var(--color-bg)', position: 'relative' }}>{greet()}, {me.name.split(' ').slice(0, 2).join(' ')}</h1>
        <p style={{ marginTop: 10, maxWidth: '60ch', fontSize: 15.5, lineHeight: 1.6, position: 'relative' }}>
          {me.role === 'superadmin' && 'The whole school at a glance — people, attendance, fees and what families are asking.'}
          {me.role === 'hod' && `Your department${d.department ? ' — ' + d.department : ''}: teachers, classes and how today is going.`}
          {me.role === 'teacher' && (d.class_teacher_of.length ? `Class teacher of ${d.class_teacher_of.map((c) => c.label).join(', ')}.` : 'Your subjects and classes for today.')}
        </p>
        {d.unmarked_classes.length > 0 && (
          <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', position: 'relative' }}>
            <Tag tone="gold">Attendance not marked</Tag>
            <span style={{ fontSize: 14 }}>{d.unmarked_classes.slice(0, 8).join(', ')}{d.unmarked_classes.length > 8 ? ` and ${d.unmarked_classes.length - 8} more` : ''}</span>
            <Link to="/portal/attendance" className="pt-btn gold sm">Mark now</Link>
          </div>
        )}
      </div>

      <div className="pt-grid" style={{ '--min': '200px' }}>
        <div className="pt-reveal"><Stat label="Students" value={d.students} note={`${d.classes} class${d.classes === 1 ? '' : 'es'}`} /></div>
        <div className="pt-reveal"><Stat label="Present today" value={d.marked_today ? `${pct}%` : '—'} note={d.marked_today ? `${d.present_today} present · ${d.absent_today} absent` : 'Not marked yet'} tone="marigold" /></div>
        {me.role === 'superadmin' && <>
          <div className="pt-reveal"><Stat label="Staff" value={d.teachers + d.hods} note={`${d.hods} HODs · ${d.teachers} teachers · ${d.departments} departments`} /></div>
          <div className="pt-reveal"><Stat label="Fees due" value={money(d.fees_due)} note={`${d.fees_overdue} overdue · ${money(d.fees_collected)} collected`} tone="feature" /></div>
        </>}
        {me.role === 'hod' && <div className="pt-reveal"><Stat label="Teachers" value={d.teachers} note={d.department} /></div>}
        <div className="pt-reveal"><Stat label="Leave requests" value={d.pending_leaves} note="Waiting for a decision" /></div>
        <div className="pt-reveal"><Stat label="Messages" value={d.unread_messages} note="Unread from families" /></div>
      </div>

      {me.role === 'teacher' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="pt-head"><div><span className="k">Tap a class to open it</span><h1 style={{ fontSize: 24 }}>My classes</h1></div></div>
          <MyClassCards />
        </div>
      )}

      <div className="pt-grid" style={{ '--min': '340px' }}>
        {me.role === 'teacher' && (
          <Card title={`Today · ${WEEKDAYS[new Date().getDay() - 1] || 'Sunday'}`} tone="gold" className="pt-reveal">
            {d.today_periods.length ? (
              <div className="pt-list">
                {d.today_periods.map((p) => (
                  <div key={p.id}>
                    <span className="meta" style={{ flex: '0 0 104px' }}>{p.starts} – {p.ends}</span>
                    <span><b style={{ fontWeight: 600 }}>{p.subject}</b><br /><small style={{ color: 'var(--color-neutral-600)' }}>{p.class_label}</small></span>
                  </div>
                ))}
              </div>
            ) : <Empty title="No periods today">Your timetable shows here once the HOD sets it.</Empty>}
          </Card>
        )}
        {me.role === 'superadmin' && (
          <Card title="New enquiries" tone="dark" className="pt-reveal" right={<Link to="/portal/enquiries" className="pt-btn gold sm">All enquiries</Link>}>
            {d.recent_enquiries.length ? (
              <div className="pt-list">
                {d.recent_enquiries.map((e) => (
                  <div key={e.id} style={{ flexDirection: 'column', gap: 4 }}>
                    <span className="meta">{e.kind} · {fmtTime(e.created_at)} {e.status === 'new' && <Tag tone="gold">New</Tag>}</span>
                    <span style={{ fontSize: 14.5 }}><b style={{ fontWeight: 600 }}>{e.name || '—'}</b> · {e.phone} {e.grade && `· ${e.grade}`}</span>
                  </div>
                ))}
              </div>
            ) : <Empty title="No enquiries yet">Forms on the website land here.</Empty>}
          </Card>
        )}
        <Card title="Latest circulars" tone="dark" className="pt-reveal" right={<Link to="/portal/circulars" className="pt-btn gold sm">Open</Link>}>
          {circ.data && circ.data.length ? (
            <div className="pt-list">
              {circ.data.slice(0, 5).map((c) => (
                <div key={c.id} style={{ flexDirection: 'column', gap: 5 }}>
                  <span className="meta">{fmtDate(c.publish_on)} · {c.category}{c.class_label ? ` · ${c.class_label}` : ''}</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.5 }}>{c.title ? <b style={{ fontWeight: 600 }}>{c.title}: </b> : null}{c.body}</span>
                </div>
              ))}
            </div>
          ) : <Empty title="Nothing posted yet" />}
        </Card>
        <Card title="Quick actions" className="pt-reveal" pad>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', marginTop: 4 }}>
            {(me.role === 'superadmin' ? [['hods', 'Add an HOD', 'user'], ['/?edit=1', 'Edit the live website', 'eye'], ['classes', 'Classes & sections', 'layers'], ['fees', 'Record a payment', 'rupee'], ['circulars', 'Post a notice', 'bell'], ['demo', 'Demo school', 'school']]
              : me.role === 'hod' ? [['faculty', 'Faculty', 'users'], ['classes', 'Classes & sections', 'layers'], ['exams', 'Exam results', 'chart'], ['circulars', 'Call a parent meeting', 'bell'], ['/?edit=1', 'Edit the live website', 'eye'], ['teachers', 'Add a teacher', 'plus']]
                : [['attendance', 'Mark attendance', 'check'], ['exams', 'Enter exam marks', 'chart'], ['homework', 'Set homework', 'file'], ['materials', 'Share a PDF', 'upload']]
            ).map(([p, l, i]) => (p.startsWith('/') ? (
              <a key={p} href={p} className="pt-btn line" style={{ justifyContent: 'flex-start', borderRadius: 16, padding: '14px 16px' }}><Icon name={i} />{l}</a>
            ) : (
              <Link key={p} to={'/portal/' + p} className="pt-btn line" style={{ justifyContent: 'flex-start', borderRadius: 16, padding: '14px 16px' }}><Icon name={i} />{l}</Link>
            )))}
          </div>
        </Card>
      </div>
    </>
  );
}
