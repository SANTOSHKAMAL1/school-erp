import React, { useState } from 'react';
import { api, ROLE_LABEL, setMe, useMe } from '../api.js';
import { Btn, Card, ErrorNote, Field, initials, PageHead, toast } from '../ui.jsx';

export default function Account() {
  const me = useMe();
  const [phone, setPhone] = useState(me.phone || '');
  const [email, setEmail] = useState(me.email || '');
  const [cur, setCur] = useState(''); const [pw, setPw] = useState(''); const [pw2, setPw2] = useState('');
  const [err, setErr] = useState(null);
  return (
    <>
      <PageHead kicker="You" title="Account & password" />
      <div className="pt-grid" style={{ '--min': '340px' }}>
        <Card title="Your details" tone="gold" pad>
          <div className="pt-name" style={{ margin: '0 0 20px' }}><span className="pt-avatar" style={{ width: 52, height: 52, fontSize: 17 }}>{initials(me.name)}</span>
            <span><b style={{ fontSize: 18 }}>{me.name}</b><small>{ROLE_LABEL[me.role]}{me.department ? ' · ' + me.department : ''} · login <b>{me.login}</b></small></span></div>
          <div className="pt-form">
            <Field label="Mobile"><input className="pt-input" value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
            <Field label="Email"><input className="pt-input" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
          </div>
          <div style={{ marginTop: 16 }}><Btn onClick={() => api.put('/api/auth/profile', { phone, email }).then((m) => { setMe(m); toast('Saved.'); }).catch((e) => toast(e.message, true))}>Save details</Btn></div>
        </Card>
        <Card title="Change password" tone="dark" pad>
          <form className="pt-form" onSubmit={(e) => {
            e.preventDefault(); setErr(null);
            if (pw !== pw2) { setErr(new Error('The two new passwords do not match.')); return; }
            api.post('/api/auth/change-password', { current: cur, new: pw }).then(() => { setCur(''); setPw(''); setPw2(''); toast('Password changed. Other devices have been signed out.'); }).catch(setErr);
          }}>
            <Field label="Current password" full><input className="pt-input" type="password" value={cur} onChange={(e) => setCur(e.target.value)} autoComplete="current-password" /></Field>
            <Field label="New password"><input className="pt-input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /></Field>
            <Field label="Type it again"><input className="pt-input" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} autoComplete="new-password" /></Field>
            <div className="full"><Btn kind="dark" type="submit">Change password</Btn></div>
          </form>
          <div style={{ marginTop: 12 }}><ErrorNote error={err} /></div>
        </Card>
      </div>
    </>
  );
}
