// Demo school: one button fills the portal with a complete sample school and three ready logins for testing.
import React, { useState } from 'react';
import { api, useLoad } from '../api.js';
import { Btn, Card, Confirm, Empty, ErrorNote, Icon, Loading, PageHead, Tag, toast } from '../ui.jsx';

export function DemoLogins({ d }) {
  return (
    <div className="pt-grid" style={{ '--min': '240px' }}>
      {d.accounts.map((a) => (
        <div key={a.login} className="pt-card pt-demologin">
          <Tag tone={a.role === 'HOD' ? 'brown' : a.role === 'Teacher' ? 'gold' : 'green'}>{a.role}</Tag>
          <b>{a.name}</b>
          <span className="muted">{a.note}</span>
          <div className="pt-cred">
            <div className="row"><span>Login ID</span><code>{a.login}</code></div>
            <div className="row"><span>Password</span><code>{d.password}</code></div>
          </div>
          <Btn kind="line" sm icon="copy" onClick={() => { navigator.clipboard && navigator.clipboard.writeText(`${a.login} / ${d.password}`); toast('Copied.'); }}>Copy</Btn>
        </div>
      ))}
    </div>
  );
}

export default function Demo() {
  const s = useLoad('/api/demo');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [ask, setAsk] = useState(false);
  const load = () => {
    setBusy(true); setErr(null);
    api.post('/api/demo').then((r) => { s.setData(r); toast('Demo school ready — try the three logins.'); }).catch(setErr).finally(() => setBusy(false));
  };
  const d = s.data;
  return (
    <>
      <PageHead kicker="Setup" title="Demo school" actions={<a className="pt-btn line" href="/login" target="_blank" rel="noreferrer"><Icon name="arrow" size={16} />Open the login page</a>}>
        Fill the portal with a complete sample school — 3 departments, 16 teachers, 16 sections with 128 students, attendance,
        Mid-term and Quarterly results, homework, study PDFs, participation, fees, messages and a parent–teacher meeting — to try every screen.
      </PageHead>
      {s.loading && !d ? <Loading /> : s.error ? <ErrorNote error={s.error} /> : (
        <>
          <Card title={d.loaded ? 'Demo school is loaded' : 'Demo school is not loaded'} tone="dark" right={d.loaded
            ? <Btn kind="line" sm onClick={() => setAsk(true)} style={{ color: 'var(--color-accent-2-200)', borderColor: 'color-mix(in srgb,var(--color-accent-2-200) 40%,transparent)' }}>Remove demo school</Btn>
            : <Btn kind="gold" sm icon="plus" disabled={busy} onClick={load}>{busy ? 'Creating… (about 20 seconds)' : 'Load demo school'}</Btn>}>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {d.loaded ? (
                <>
                  <div className="pt-note info"><span>Sign in at <b>/login</b> with any of these. Choose the matching tab — <b>HOD</b>, <b>Teacher</b> or <b>Family</b>. Every demo account uses the same password.</span></div>
                  <DemoLogins d={d} />
                  <div className="pt-note"><span>Other demo logins work too: <code>hod.preprimary</code>, <code>hod.middle</code>, <code>t.vasudeva</code>, <code>t.meera</code> and every family ID from <code>agd001</code> to <code>agd128</code>.</span></div>
                </>
              ) : <Empty title="Nothing loaded">Use “Load demo school”. You can remove it again in one click before the school goes live — your own records stay.</Empty>}
              <ErrorNote error={err} />
            </div>
          </Card>
        </>
      )}
      {ask && <Confirm title="Remove the demo school?" confirmLabel="Remove demo school" onClose={() => setAsk(false)}
        onConfirm={() => api.del('/api/demo').then((r) => { s.setData(r); toast('Demo school removed.'); })}>
        This deletes the demo departments, teachers, classes, students and everything recorded for them. Records the school added itself stay.
      </Confirm>}
    </>
  );
}
