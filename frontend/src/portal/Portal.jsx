import React, { lazy, Suspense, useEffect, useInsertionEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import designCss from '../pages/FamilyLoginPage/page.css?raw';
import './portal.css';
import { api, ROLE_LABEL, setMe, useMe } from './api.js';
import { Btn, ErrorNote, Field, Icon, initials, Loading, LOGO_DARK_BG, Modal, toast } from './ui.jsx';

const Overview = lazy(() => import('./pages/Overview.jsx'));
const People = lazy(() => import('./pages/People.jsx'));
const Classes = lazy(() => import('./pages/Classes.jsx'));
const Students = lazy(() => import('./pages/Students.jsx'));
const Attendance = lazy(() => import('./pages/Attendance.jsx'));
const Marks = lazy(() => import('./pages/Marks.jsx'));
const Homework = lazy(() => import('./pages/Homework.jsx'));
const Timetable = lazy(() => import('./pages/Timetable.jsx'));
const Circulars = lazy(() => import('./pages/Circulars.jsx'));
const Messages = lazy(() => import('./pages/Messages.jsx'));
const Leaves = lazy(() => import('./pages/Leaves.jsx'));
const Fees = lazy(() => import('./pages/Fees.jsx'));
const Website = lazy(() => import('./pages/Website.jsx'));
const Disclosure = lazy(() => import('./pages/Disclosure.jsx'));
const Enquiries = lazy(() => import('./pages/Enquiries.jsx'));
const Activity = lazy(() => import('./pages/Activity.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Family = lazy(() => import('./family/Family.jsx'));

// Sidebar per role: [group, [path, label, icon, element]]
const NAV = {
  superadmin: [
    ['', [['', 'Overview', 'home', <Overview />]]],
    ['People', [
      ['departments', 'Departments', 'layers', <People kind="departments" />],
      ['hods', 'HODs', 'user', <People kind="hods" />],
      ['teachers', 'Teachers', 'users', <People kind="teachers" />],
      ['students', 'Students & families', 'school', <Students />],
    ]],
    ['Academics', [
      ['classes', 'Classes & subjects', 'book', <Classes />],
      ['attendance', 'Attendance', 'check', <Attendance />],
      ['marks', 'Results', 'chart', <Marks />],
      ['timetable', 'Timetable', 'clock', <Timetable />],
      ['homework', 'Homework', 'file', <Homework />],
    ]],
    ['Office', [
      ['fees', 'Fees', 'rupee', <Fees />],
      ['circulars', 'Notices & circulars', 'bell', <Circulars />],
      ['leaves', 'Leave requests', 'leave', <Leaves />],
      ['messages', 'Messages', 'chat', <Messages />],
      ['enquiries', 'Enquiries', 'inbox', <Enquiries />],
    ]],
    ['Website', [
      ['website', 'Website content', 'globe', <Website />],
      ['disclosure', 'Mandatory disclosure', 'file', <Disclosure />],
      ['activity', 'Activity log', 'activity', <Activity />],
    ]],
  ],
  hod: [
    ['', [['', 'Overview', 'home', <Overview />]]],
    ['Department', [
      ['teachers', 'Teachers', 'users', <People kind="teachers" />],
      ['classes', 'Classes & subjects', 'book', <Classes />],
      ['students', 'Students', 'school', <Students />],
    ]],
    ['Academics', [
      ['attendance', 'Attendance', 'check', <Attendance />],
      ['marks', 'Results', 'chart', <Marks />],
      ['timetable', 'Timetable', 'clock', <Timetable />],
      ['homework', 'Homework', 'file', <Homework />],
    ]],
    ['Families', [
      ['circulars', 'Circulars', 'bell', <Circulars />],
      ['leaves', 'Leave requests', 'leave', <Leaves />],
      ['messages', 'Messages', 'chat', <Messages />],
    ]],
  ],
  teacher: [
    ['', [['', 'Overview', 'home', <Overview />]]],
    ['My classes', [
      ['students', 'Students', 'school', <Students />],
      ['attendance', 'Attendance', 'check', <Attendance />],
      ['marks', 'Marks', 'chart', <Marks />],
      ['homework', 'Homework', 'file', <Homework />],
      ['timetable', 'Timetable', 'clock', <Timetable />],
    ]],
    ['Families', [
      ['circulars', 'Circulars', 'bell', <Circulars />],
      ['messages', 'Messages', 'chat', <Messages />],
      ['leaves', 'Leave requests', 'leave', <Leaves />],
    ]],
  ],
};

function useDesignCss() {
  useInsertionEffect(() => {
    const el = document.createElement('style');
    el.setAttribute('data-page', 'portal-design');
    el.textContent = designCss;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
}

export default function Portal() {
  useDesignCss();
  const me = useMe();
  const [checked, setChecked] = useState(!!me);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Portal · Arundhati Gurukulam';
    api.get('/api/auth/me').then(setMe).catch(() => setMe(null)).finally(() => setChecked(true));
    const out = () => navigate('/login', { replace: true });
    window.addEventListener('ag-signed-out', out);
    return () => { window.removeEventListener('ag-signed-out', out); document.title = 'Arundhati Gurukulam'; };
  }, []);

  if (!checked) return <div className="pt"><Loading /></div>;
  if (!me) return <Navigate to="/login" replace />;

  const signOut = () => api.post('/api/auth/logout').finally(() => { setMe(null); navigate('/login', { replace: true }); });

  return (
    <div className="pt">
      <Suspense fallback={<Loading />}>
        {me.role === 'parent' ? <Family me={me} signOut={signOut} /> : <StaffShell me={me} signOut={signOut} />}
      </Suspense>
      {me.must_change_password && <ForcePassword me={me} signOut={signOut} />}
    </div>
  );
}

function StaffShell({ me, signOut }) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const loc = useLocation();
  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    const tick = () => api.get('/api/messages/unread').then((r) => setUnread(r.unread)).catch(() => {});
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, [loc.pathname]);
  const groups = NAV[me.role] || [];
  const flat = groups.flatMap(([, items]) => items);
  const current = flat.find(([p]) => p && loc.pathname.startsWith('/portal/' + p)) || flat[0];
  const sub = me.role === 'superadmin' ? 'Administration' : me.role === 'hod' ? (me.department || 'Head of Department') : 'Staff portal';

  return (
    <div className="pt-shell">
      {open && <div className="pt-scrim" onClick={() => setOpen(false)} />}
      <aside className={`pt-side ${open ? 'open' : ''}`}>
        <a href="/" className="pt-brand">
          <img src={LOGO_DARK_BG} alt="" />
          <span><b>Arundhati Gurukulam</b><small>{sub}</small></span>
        </a>
        {groups.map(([g, items]) => (
          <React.Fragment key={g || 'main'}>
            {g && <div className="pt-navgroup">{g}</div>}
            {items.map(([p, label, icon]) => (
              <NavLink key={p} to={'/portal/' + p} end={p === ''} className={({ isActive }) => `pt-nav ${isActive ? 'active' : ''}`}>
                <Icon name={icon} />{label}
                {p === 'messages' && unread > 0 && <span className="pt-badge">{unread}</span>}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
        <div className="pt-navgroup">You</div>
        <NavLink to="/portal/account" className={({ isActive }) => `pt-nav ${isActive ? 'active' : ''}`}><Icon name="key" />Account & password</NavLink>
        <button className="pt-nav" style={{ border: 0, background: 'none', cursor: 'pointer', textAlign: 'left' }} onClick={signOut}><Icon name="logout" />Sign out</button>
        <div className="pt-sidefoot">सुरक्षिता · सुशिक्षिता · सुशीला<br /><a href="/">← Back to the website</a></div>
      </aside>
      <main className="pt-main">
        <div className="pt-top">
          <button className="pt-icon pt-burger" aria-label="Menu" onClick={() => setOpen(true)}><Icon name="menu" /></button>
          <span className="pt-crumb">{loc.pathname.startsWith('/portal/account') ? 'Account & password' : current ? current[1] : ''}</span>
          <div className="pt-user">
            <span className="who"><b>{me.name}</b><span>{ROLE_LABEL[me.role]}{me.department ? ' · ' + me.department : ''}</span></span>
            <span className="pt-avatar">{initials(me.name)}</span>
          </div>
        </div>
        <div className="pt-content" key={loc.pathname}>
          <Suspense fallback={<Loading />}>
            <Routes>
              {flat.map(([p, , , el]) => <Route key={p} path={p === '' ? '/' : p + '/*'} element={el} />)}
              <Route path="account" element={<Account />} />
              <Route path="*" element={<Navigate to="/portal" replace />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function ForcePassword({ me, signOut }) {
  const [cur, setCur] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (pw !== pw2) { setErr(new Error('The two new passwords do not match.')); return; }
    setBusy(true);
    api.post('/api/auth/change-password', { current: cur, new: pw })
      .then(() => api.get('/api/auth/me')).then((m) => { setMe(m); toast('Password set. Welcome!'); })
      .catch((e2) => { setErr(e2); setBusy(false); });
  };
  return (
    <Modal title="Set your own password" kicker={`Welcome, ${me.name}`}
      footer={<><Btn kind="line" onClick={signOut}>Sign out</Btn><Btn kind="primary" disabled={busy} onClick={submit}>{busy ? 'Saving…' : 'Save password'}</Btn></>}>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-neutral-800)' }}>
        You signed in with a temporary password. Choose a new one that only you know — at least 8 characters, with letters and numbers.
      </p>
      <form className="pt-form" onSubmit={submit}>
        <Field label="Temporary password" full><input className="pt-input" type="password" value={cur} onChange={(e) => setCur(e.target.value)} autoComplete="current-password" /></Field>
        <Field label="New password"><input className="pt-input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /></Field>
        <Field label="Type it again"><input className="pt-input" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} autoComplete="new-password" /></Field>
        <button type="submit" hidden />
      </form>
      <ErrorNote error={err} />
    </Modal>
  );
}
