import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, useLoad } from '../api.js';
import { Btn, Card, Confirm, Empty, ErrorNote, IconBtn, Loading, PageHead, Seg, toast } from '../ui.jsx';

const SECTIONS = {
  ticker: { label: 'Announcement ticker', help: 'The gold “Announcements” strip that scrolls under the menu on the home page.', fields: [['text', 'Announcement', 'input']] },
  faqs: { label: 'FAQs', help: 'Questions and answers in the FAQ section of the home page.', fields: [['q', 'Question', 'input'], ['a', 'Answer', 'textarea']] },
  terms: { label: 'Term dates', help: 'The “Terms” tab of the term-dates popup on the home page.', fields: [['name', 'Term', 'input'], ['weeks', 'Length', 'input'], ['dates', 'Dates', 'input'], ['note', 'Note', 'input']] },
  holidays: { label: 'Holidays', help: 'The “Holidays” tab of the term-dates popup.', fields: [['when', 'When', 'input'], ['what', 'What', 'input']] },
  school: { label: 'School details', help: 'Contact details used across the portal and receipts.', object: true,
    fields: [['name', 'School name'], ['phone', 'Phone'], ['email', 'Email'], ['address', 'Address'], ['academic_year', 'Academic year'], ['current_term', 'Current term']] },
};

function ListEditor({ k, cfg }) {
  const s = useLoad(`/api/site/${k}`);
  const [items, setItems] = useState(null);
  const [busy, setBusy] = useState(false);
  const [reset, setReset] = useState(false);
  useEffect(() => { if (s.data) setItems(JSON.parse(JSON.stringify(s.data.value))); }, [s.data]);
  if (s.loading || !items) return <Loading />;
  if (s.error) return <ErrorNote error={s.error} />;
  const save = () => {
    setBusy(true);
    api.put(`/api/site/${k}`, { value: items }).then(() => toast('Saved — the website shows it now.')).catch((e) => toast(e.message, true)).finally(() => setBusy(false));
  };
  const setItem = (i, f, v) => setItems((x) => (cfg.object ? { ...x, [f]: v } : x.map((it, j) => (j === i ? { ...it, [f]: v } : it))));
  const move = (i, d) => setItems((x) => { const y = [...x]; const [m] = y.splice(i, 1); y.splice(i + d, 0, m); return y; });
  return (
    <Card title={cfg.label} tone="dark" right={<>
      <Btn kind="line" sm onClick={() => setReset(true)} style={{ color: 'var(--color-accent-2-200)', borderColor: 'color-mix(in srgb,var(--color-accent-2-200) 40%,transparent)' }}>Restore original</Btn>
      <Btn kind="gold" sm disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save'}</Btn>
    </>}>
      <div style={{ padding: '16px 22px 0' }}><div className="pt-note info">{cfg.help}</div></div>
      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {cfg.object ? (
          <div className="pt-form">
            {cfg.fields.map(([f, l]) => <label key={f} className={`pt-field ${f === 'address' ? 'full' : ''}`}><span>{l}</span><input className="pt-input" value={items[f] || ''} onChange={(e) => setItem(0, f, e.target.value)} /></label>)}
          </div>
        ) : (
          <>
            {items.length === 0 && <Empty title="Empty" />}
            {items.map((it, i) => (
              <div key={i} className="pt-card" style={{ padding: 16, background: 'var(--color-bg)', display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr) auto', gap: 14, alignItems: 'start' }}>
                <span className="pt-avatar" style={{ marginTop: 26 }}>{i + 1}</span>
                <div className="pt-form" style={{ gridTemplateColumns: cfg.fields.length > 2 ? 'repeat(2,minmax(0,1fr))' : '1fr' }}>
                  {cfg.fields.map(([f, l, type]) => (
                    <label key={f} className={`pt-field ${type === 'textarea' ? 'full' : ''}`}><span>{l}</span>
                      {type === 'textarea' ? <textarea className="pt-textarea" rows="3" value={it[f] || ''} onChange={(e) => setItem(i, f, e.target.value)} />
                        : <input className="pt-input" value={it[f] || ''} onChange={(e) => setItem(i, f, e.target.value)} />}
                    </label>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                  <IconBtn icon="up" label="Move up" disabled={i === 0} onClick={() => move(i, -1)} />
                  <IconBtn icon="down" label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)} />
                  <IconBtn icon="trash" label="Remove" onClick={() => setItems((x) => x.filter((_, j) => j !== i))} />
                </div>
              </div>
            ))}
            <div><Btn kind="line" icon="plus" onClick={() => setItems((x) => [...x, Object.fromEntries(cfg.fields.map(([f]) => [f, '']))])}>Add</Btn></div>
          </>
        )}
      </div>
      {reset && <Confirm title="Restore the original?" confirmLabel="Restore" onClose={() => setReset(false)}
        onConfirm={() => api.del(`/api/site/${k}`).then((r) => { setItems(r.value); toast('Restored.'); })}>
        This puts back the text the website launched with and removes your edits for “{cfg.label}”.
      </Confirm>}
    </Card>
  );
}

export default function Website() {
  const [k, setK] = useState('ticker');
  return (
    <>
      <PageHead kicker="Website" title="Website content" actions={<a className="pt-btn line" href="/" target="_blank" rel="noreferrer">Open the website</a>}>
        Change what the public website shows — the design stays exactly as it is. Notices, circulars and events on the home page boards are managed under <Link to="/portal/circulars">Notices & circulars</Link> (tick “Show on website”).
      </PageHead>
      <Seg value={k} onChange={setK} options={Object.entries(SECTIONS).map(([v, c]) => ({ value: v, label: c.label }))} />
      <ListEditor key={k} k={k} cfg={SECTIONS[k]} />
    </>
  );
}
