import React, { useEffect, useMemo, useRef, useState } from 'react';
import DisclosureLogic from '../../pages/DisclosurePage/logic.js';
import { api, useLoad } from '../api.js';
import { Btn, Card, Confirm, fmtDate, Loading, PageHead, Tag, toast } from '../ui.jsx';

// Row titles and the values the page ships with come straight from the page itself.
function pageRows() {
  const L = new DisclosureLogic({});
  L.state = { open: {}, docs: {}, text: {}, viewer: null };
  const v = L.renderVals();
  const pick = (rows, kind) => rows.map((r) => ({ key: r.key, n: r.n, title: r.title, def: r.value, pdfRow: r.noPdf || (!r.value && !r.hasPdf) || r.hasPdf, builtIn: r.href, count: r.count, kind }));
  return [
    ['A', 'General information', pick(v.general)],
    ['B', 'Documents and information', pick(v.documents)],
    ['C', 'Results and academics', pick(v.academics)],
    ['D', 'Staff (teaching)', pick(v.staff, 'staff')],
    ['E', 'School infrastructure', pick(v.infra)],
    ['P', 'Photographs of the school', v.photos.map((p, i) => ({ key: 'P' + (i + 1), n: String(i + 1), title: p.title, photo: true }))],
  ];
}

function DocCell({ row, doc, onChange }) {
  const ref = useRef();
  const [busy, setBusy] = useState(false);
  const [del, setDel] = useState(false);
  const up = (file) => {
    setBusy(true);
    api.upload(`/api/disclosure/docs/${row.key}`, file).then(() => { toast(`Uploaded for ${row.key}.`); onChange(); })
      .catch((e) => toast(e.message, true)).finally(() => setBusy(false));
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <input ref={ref} type="file" hidden accept={row.photo ? 'image/jpeg,image/png,image/webp' : 'application/pdf'} onChange={(e) => { e.target.files[0] && up(e.target.files[0]); e.target.value = ''; }} />
      {doc ? <a href={doc.url} target="_blank" rel="noreferrer" className="pt-tag green" style={{ textDecoration: 'none' }}>{row.photo ? 'Photo' : 'PDF'} · {doc.name.slice(0, 28)}</a>
        : row.builtIn ? <a href={row.builtIn} target="_blank" rel="noreferrer" className="pt-tag grey" style={{ textDecoration: 'none' }}>Built-in PDF</a>
          : <Tag tone={row.pdfRow || row.photo ? 'red' : 'grey'}>{row.photo ? 'No photo' : 'No PDF'}</Tag>}
      <Btn kind="line" sm icon="upload" disabled={busy} onClick={() => ref.current.click()}>{busy ? 'Uploading…' : doc ? 'Replace' : 'Upload'}</Btn>
      {doc && <Btn kind="ghost" sm onClick={() => setDel(true)}>Remove</Btn>}
      {del && <Confirm title={`Remove the file for ${row.key}?`} confirmLabel="Remove" onClose={() => setDel(false)}
        onConfirm={() => api.del(`/api/disclosure/docs/${row.key}`).then(onChange)}>{row.title}</Confirm>}
    </div>
  );
}

export default function Disclosure() {
  const sections = useMemo(pageRows, []);
  const live = useLoad('/api/disclosure-docs');
  const [vals, setVals] = useState(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (!live.data || vals) return;
    const t = live.data.text || {};
    const out = {};
    sections.forEach(([, , rows]) => rows.forEach((r) => {
      if (r.photo) return;
      out[r.key] = Object.prototype.hasOwnProperty.call(t, r.key) ? t[r.key] : r.def || '';
      if (r.kind === 'staff') out[r.key + '.count'] = Object.prototype.hasOwnProperty.call(t, r.key + '.count') ? t[r.key + '.count'] : r.count || '';
    }));
    setVals(out);
  }, [live.data]);
  const set = (k, v) => { setVals((x) => ({ ...x, [k]: v })); setDirty(true); };
  const save = () => {
    setBusy(true);
    api.put('/api/disclosure/text', { values: vals }).then(() => { toast('Saved — the Mandatory Disclosure page shows it now.'); setDirty(false); })
      .catch((e) => toast(e.message, true)).finally(() => setBusy(false));
  };
  if (!vals) return <Loading />;
  const docs = live.data.docs || {};
  return (
    <>
      <PageHead kicker="Website" title="Mandatory disclosure" actions={<>
        <a className="pt-btn line" href="/mandatory-disclosure" target="_blank" rel="noreferrer">Open the page</a>
        <Btn disabled={busy || !dirty} onClick={save}>{busy ? 'Saving…' : dirty ? 'Save text' : 'Saved'}</Btn>
      </>}>
        Edit the text of every row and upload the PDFs (up to 40 MB) and school photographs (up to 15 MB). Uploads go live immediately; text goes live when you press Save.
      </PageHead>
      {sections.map(([letter, name, rows]) => (
        <Card key={letter} title={`${letter === 'P' ? '' : letter + ' · '}${name}`} tone={letter === 'P' ? 'gold' : 'dark'}>
          <div className="pt-tablewrap">
            <table className="pt-table">
              <thead><tr><th style={{ width: 54 }}>No.</th><th>Item</th>{letter !== 'P' && <th style={{ minWidth: 260 }}>Shown on the page</th>}<th>{letter === 'P' ? 'Photo' : 'Document'}</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td className="muted">{r.key.replace(/^D4(PGT|TGT|PRT)$/, '$1')}</td>
                    <td style={{ maxWidth: 360, lineHeight: 1.45 }}>{r.title}</td>
                    {letter !== 'P' && (
                      <td>
                        {r.kind === 'staff' && <input className="pt-input" style={{ marginBottom: 6, minHeight: 36, padding: '6px 14px' }} placeholder="Number" value={vals[r.key + '.count']} onChange={(e) => set(r.key + '.count', e.target.value)} />}
                        <textarea className="pt-textarea" rows={(vals[r.key] || '').length > 60 ? 3 : 1} style={{ minHeight: 40, borderRadius: 18 }} value={vals[r.key]} placeholder={r.pdfRow ? 'Leave empty to show just the PDF' : ''} onChange={(e) => set(r.key, e.target.value)} />
                      </td>
                    )}
                    <td><DocCell row={r} doc={docs[r.key]} onChange={live.reload} />{docs[r.key] && <div className="muted" style={{ marginTop: 4 }}>{fmtDate(docs[r.key].uploadedAt)}</div>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
      {dirty && <div style={{ position: 'sticky', bottom: 16, display: 'flex', justifyContent: 'flex-end' }}><Btn disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save text'}</Btn></div>}
    </>
  );
}
