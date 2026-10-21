// Live editing of the public website by the super admin and HODs.
//
// Every visitor: the saved edits ({ text: {original: new}, img: {original src: new src} }) are applied to the
// rendered pages by swapping text-node values and image sources in place — the React tree is never restructured,
// so the design pages keep working. A MutationObserver re-applies them whenever a page re-renders.
//
// Editors: an "Edit this page" button turns on edit mode — click any text to change it, click a photo to replace
// it, or add a notice / circular / event (with a PDF) to the home page boards.
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { loadSite, toast } from './site.js';

// Opening the site to edit it skips the welcome screen and the admissions pop-up (the home page checks these flags)
if (typeof window !== 'undefined' && /[?&]edit=1/.test(window.location.search)) window.__AG_NAV = window.__AG_EDITING = 1;

const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
const inUi = (el) => !!(el && el.closest && el.closest('[data-ag-ui]'));
const SKIP = 'script,style,textarea,select,option,noscript,[data-ag-ui]';
let edits = { text: {}, img: {} };

/** Put the saved edits on screen (and take back any that were removed). */
function applyEdits(root) {
  if (!root) return;
  const t = edits.text || {}, im = edits.img || {};
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    let raw = n.nodeValue;
    if (n.__agShown === undefined && !t[norm(raw)]) continue;
    if (n.__agShown !== undefined && raw === n.__agShown) raw = n.__agRaw;       // showing our edit — work from the original
    const p = n.parentElement;
    if (!p || p.closest(SKIP)) continue;
    const k = norm(raw);
    const want = k && t[k] !== undefined ? raw.match(/^\s*/)[0] + t[k] + raw.match(/\s*$/)[0] : raw;
    if (want !== raw) { n.__agRaw = raw; n.__agShown = want; } else { delete n.__agRaw; delete n.__agShown; }
    if (n.nodeValue !== want) n.nodeValue = want;
  }
  root.querySelectorAll('img').forEach((img) => {
    if (inUi(img)) return;
    let raw = img.getAttribute('src');
    if (img.__agShown !== undefined && raw === img.__agShown) raw = img.__agRaw;
    const want = (raw && im[raw]) || raw;
    if (want !== raw) { img.__agRaw = raw; img.__agShown = want; } else { delete img.__agRaw; delete img.__agShown; }
    if (img.getAttribute('src') !== want) img.setAttribute('src', want);
  });
}

async function req(method, url, body) {
  const r = await fetch(url, { method, credentials: 'same-origin', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j && typeof j.detail === 'string' && j.detail) || `Could not save (${r.status}).`);
  return j;
}
async function upload(file) {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch('/api/uploads', { method: 'POST', credentials: 'same-origin', body: fd });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.detail || 'Upload failed.');
  return j;
}

const editableText = (n) => n && n.nodeType === 3 && norm(n.nodeValue) && n.parentElement && !n.parentElement.closest(SKIP);
function under(node, x, y) {
  const r = document.createRange();
  r.selectNodeContents(node);
  return [...r.getClientRects()].some((b) => x >= b.left - 2 && x <= b.right + 2 && y >= b.top - 2 && y <= b.bottom + 2);
}

/** The text node — or else the photo, even beneath an overlay — under the pointer. */
function hitAt(x, y, target) {
  const root = document.getElementById('dc-root');
  let node = null;
  if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); node = r && r.startContainer; }
  else if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); node = p && p.offsetNode; }
  if (editableText(node) && root.contains(node) && under(node, x, y)) return { text: node };
  const img = document.elementsFromPoint(x, y).find((el) => el.tagName === 'IMG' && !inUi(el) && root.contains(el));
  if (img) return { img };
  const texts = [];                                       // a small element such as a button: its only text
  const w = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n && texts.length < 2; n = w.nextNode()) if (editableText(n)) texts.push(n);
  return texts.length === 1 ? { text: texts[0] } : null;
}

function rectOf(hit) {
  if (!hit) return null;
  if (hit.img) return hit.img.getBoundingClientRect();
  const r = document.createRange();
  r.selectNodeContents(hit.text);
  return r.getBoundingClientRect();
}

const CSS = `
[data-ag-ui]{font:500 14px/1.45 var(--font-body,Figtree,system-ui,sans-serif);color:#2e2b25;letter-spacing:0;text-transform:none}
[data-ag-ui] *{box-sizing:border-box}
.agle-fab{position:fixed;left:18px;bottom:18px;z-index:2147483000;display:flex;gap:8px;align-items:center;border:0;cursor:pointer;border-radius:999px;padding:12px 20px;
  background:#402310;color:#f8e9c8;font-weight:700;box-shadow:0 10px 30px rgba(46,43,37,.35)}
.agle-fab:hover{background:#5a3016}
.agle-bar{position:fixed;left:0;right:0;top:0;z-index:2147483000;background:#402310;color:#f8e9c8;display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;
  padding:10px 16px;box-shadow:0 6px 24px rgba(0,0,0,.25)}
.agle-bar b{font-weight:700;color:#ffd27a}
.agle-bar .msg{flex:1 1 280px;font-size:13.5px}
.agle-btn{border:1px solid rgba(248,233,200,.35);background:none;color:inherit;border-radius:999px;padding:7px 14px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;white-space:nowrap}
.agle-btn:hover{background:rgba(248,233,200,.12)}
.agle-btn.gold{background:#f3b33d;border-color:#f3b33d;color:#402310}
.agle-btn.gold:hover{background:#ffc75a}
.agle-btn.red{background:#9b2c13;border-color:#9b2c13;color:#fff}
.agle-btn.line{border-color:rgba(64,35,16,.3);color:#402310}
.agle-btn.line:hover{background:#fbeedd}
.agle-hl{position:fixed;z-index:2147482990;pointer-events:none;border:2px dashed #e0851f;border-radius:6px;background:rgba(243,179,61,.12);transition:all .08s}
.agle-hl span{position:absolute;left:-2px;top:-24px;background:#e0851f;color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px 6px 6px 0;white-space:nowrap}
.agle-sheet{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483001;width:min(640px,calc(100vw - 24px));background:#fffaf2;border-radius:20px;
  box-shadow:0 20px 60px rgba(46,43,37,.45);padding:18px 20px;display:flex;flex-direction:column;gap:12px;max-height:80vh;overflow:auto}
.agle-sheet h4{margin:0;font:400 20px/1.2 var(--font-heading,Georgia,serif);color:#402310}
.agle-sheet .k{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a0522d}
.agle-sheet textarea,.agle-sheet input,.agle-sheet select{width:100%;font:inherit;font-size:15px;border:1px solid #e3d5c3;border-radius:12px;padding:10px 12px;background:#fff;color:#2e2b25}
.agle-sheet textarea{min-height:90px;resize:vertical;line-height:1.5}
.agle-sheet .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.agle-sheet .row .sp{flex:1}
.agle-sheet .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.agle-sheet label{display:flex;flex-direction:column;gap:5px;font-size:12.5px;font-weight:600;color:#5a3016}
.agle-sheet .full{grid-column:1/-1}
.agle-sheet .note{font-size:12.5px;color:#7a6a58}
.agle-sheet img{max-width:100%;max-height:220px;border-radius:12px;object-fit:cover;align-self:flex-start}
.agle-sheet .chk{flex-direction:row;align-items:center;gap:8px;font-weight:500}
.agle-sheet .chk input{width:18px;height:18px}
body.agle-on{padding-top:58px}
body.agle-on #dc-root a, body.agle-on #dc-root button{cursor:text}
@media (max-width:640px){.agle-sheet .grid{grid-template-columns:1fr}}
`;

function TextSheet({ hit, onClose }) {
  const node = hit.text;
  const orig = node.__agShown !== undefined && node.nodeValue === node.__agShown ? norm(node.__agRaw) : norm(node.nodeValue);
  const [val, setVal] = useState(edits.text[orig] ?? orig);
  const [busy, setBusy] = useState(false);
  const before = useRef(node.nodeValue);
  useEffect(() => {                                       // live preview while typing
    const raw = node.__agRaw ?? node.nodeValue;
    node.nodeValue = raw.match(/^\s*/)[0] + (val || ' ') + raw.match(/\s*$/)[0];
  }, [val]);
  const cancel = () => { node.nodeValue = before.current; onClose(); };
  const save = (value) => {
    setBusy(true);
    req('PUT', '/api/site-edits', { kind: 'text', original: orig, value })
      .then((r) => { edits = { text: r.text || {}, img: r.img || {} }; node.nodeValue = before.current; onClose(true); toast(value == null ? 'Original text restored.' : 'Saved — the website shows it now.'); })
      .catch((e) => { toast(e.message, true); setBusy(false); });
  };
  return (
    <div className="agle-sheet" data-ag-ui role="dialog" aria-label="Edit text">
      <span className="k">Edit text {edits.text[orig] !== undefined && '· changed before'}</span>
      <textarea autoFocus value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') cancel(); if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save(norm(val)); }} />
      {edits.text[orig] !== undefined && <span className="note">Original: “{orig.length > 160 ? orig.slice(0, 160) + '…' : orig}”</span>}
      <span className="note">The same text is changed wherever it appears on the website.</span>
      <div className="row">
        {edits.text[orig] !== undefined && <button type="button" className="agle-btn line" disabled={busy} onClick={() => save(null)}>Restore original</button>}
        <span className="sp" />
        <button type="button" className="agle-btn line" onClick={cancel}>Cancel</button>
        <button type="button" className="agle-btn red" disabled={busy || !norm(val)} onClick={() => save(norm(val) === orig ? null : norm(val))}>{busy ? 'Saving…' : 'Save'}</button>
      </div>
    </div>
  );
}

function ImageSheet({ hit, onClose }) {
  const img = hit.img;
  const orig = img.__agShown !== undefined && img.getAttribute('src') === img.__agShown ? img.__agRaw : img.getAttribute('src');
  const [busy, setBusy] = useState(false);
  const file = useRef();
  const save = (value) => {
    setBusy(true);
    req('PUT', '/api/site-edits', { kind: 'img', original: orig, value })
      .then((r) => { edits = { text: r.text || {}, img: r.img || {} }; onClose(true); toast(value ? 'Photo replaced on the website.' : 'Original photo restored.'); })
      .catch((e) => { toast(e.message, true); setBusy(false); });
  };
  return (
    <div className="agle-sheet" data-ag-ui role="dialog" aria-label="Replace photo">
      <span className="k">Replace photo</span>
      <img src={img.getAttribute('src')} alt="" />
      <span className="note">Choose a JPG, PNG or WebP photo. Use a picture of a similar shape so the layout stays the same.</span>
      <input ref={file} type="file" accept="image/*" hidden onChange={(e) => {
        const f = e.target.files[0];
        if (!f) return;
        setBusy(true);
        upload(f).then((r) => save(r.url)).catch((er) => { toast(er.message, true); setBusy(false); });
      }} />
      <div className="row">
        {edits.img[orig] && <button type="button" className="agle-btn line" disabled={busy} onClick={() => save(null)}>Restore original</button>}
        <span className="sp" />
        <button type="button" className="agle-btn line" onClick={() => onClose()}>Cancel</button>
        <button type="button" className="agle-btn red" disabled={busy} onClick={() => file.current.click()}>{busy ? 'Uploading…' : 'Upload new photo'}</button>
      </div>
    </div>
  );
}

function NoticeSheet({ onClose }) {
  const today = new Date().toISOString().slice(0, 10);
  const [f, setF] = useState({ category: 'notice', title: '', body: '', publish_on: today, event_on: '', attachment: '', on_website: true });
  const [busy, setBusy] = useState(false);
  const file = useRef();
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const save = () => {
    setBusy(true);
    req('POST', '/api/circulars', { ...f, audience: 'all', event_on: f.event_on || null, on_website: f.category !== 'meeting' && f.on_website })
      .then(() => { toast('Posted. Refreshing the page…'); setTimeout(() => window.location.reload(), 900); })
      .catch((e) => { toast(e.message, true); setBusy(false); });
  };
  return (
    <div className="agle-sheet" data-ag-ui role="dialog" aria-label="Add a notice">
      <h4>Add to the website</h4>
      <div className="grid">
        <label>Type
          <select value={f.category} onChange={(e) => set('category', e.target.value)}>
            <option value="notice">Notice</option><option value="circular">Circular</option><option value="event">Event / result</option>
            <option value="meeting">Parent–teacher meeting (families only)</option>
          </select></label>
        <label>Heading (optional)<input value={f.title} placeholder="e.g. Circular 16/2026" onChange={(e) => set('title', e.target.value)} /></label>
        <label className="full">Text<textarea value={f.body} placeholder="What should families read?" onChange={(e) => set('body', e.target.value)} /></label>
        <label>Publish on<input type="date" value={f.publish_on} onChange={(e) => set('publish_on', e.target.value)} /></label>
        {(f.category === 'event' || f.category === 'meeting') && <label>{f.category === 'meeting' ? 'Meeting date' : 'Event date'}<input type="date" value={f.event_on} onChange={(e) => set('event_on', e.target.value)} /></label>}
        <label className="full">PDF or photo (optional)
          <span className="row">
            <input ref={file} type="file" hidden accept=".pdf,image/*" onChange={(e) => { const x = e.target.files[0]; if (x) upload(x).then((r) => { set('attachment', r.url); toast('Attached.'); }).catch((er) => toast(er.message, true)); }} />
            <button type="button" className="agle-btn line" onClick={() => file.current.click()}>{f.attachment ? 'Replace file' : 'Attach a file'}</button>
            {f.attachment && <a href={f.attachment} target="_blank" rel="noreferrer">{f.attachment.split('/').pop()}</a>}
          </span></label>
        {f.category !== 'meeting' && <label className="chk full"><input type="checkbox" checked={f.on_website} onChange={(e) => set('on_website', e.target.checked)} /> Show on the home page boards (Notices · Circulars · Events)</label>}
      </div>
      <div className="row"><span className="sp" />
        <button type="button" className="agle-btn line" onClick={onClose}>Cancel</button>
        <button type="button" className="agle-btn red" disabled={busy || !f.body.trim()} onClick={save}>{busy ? 'Posting…' : 'Post'}</button>
      </div>
    </div>
  );
}

export default function LiveEdit() {
  const loc = useLocation();
  const [ready, setReady] = useState(false);
  const [editor, setEditor] = useState(null);
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(null);
  const [sheet, setSheet] = useState(null);
  const box = useRef(null);
  const site = !loc.pathname.startsWith('/portal');

  // Apply the saved edits for every visitor and keep them applied as pages re-render.
  useEffect(() => {
    loadSite().then((s) => { if (s && s.edits) edits = { text: s.edits.text || {}, img: s.edits.img || {} }; setReady(true); });
  }, []);
  useEffect(() => {
    if (!ready || !site || sheet) return undefined;          // paused while an edit box shows a live preview
    if (!editor && !Object.keys(edits.text).length && !Object.keys(edits.img).length) return undefined;   // nothing to apply
    const root = document.getElementById('dc-root');
    let raf = 0;
    const run = () => { raf = 0; applyEdits(root); };
    run();
    const mo = new MutationObserver((muts) => {
      if (muts.every((m) => inUi(m.target.nodeType === 3 ? m.target.parentElement : m.target))) return;
      if (!raf) raf = requestAnimationFrame(run);
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['src'] });
    return () => { mo.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [ready, site, loc.pathname, sheet, editor]);

  // Show the editor only to the super admin and HODs.
  useEffect(() => {
    let flag = false;
    try { flag = localStorage.getItem('ag-editor') === '1'; } catch (e) { /* private mode */ }
    if (!flag && !/[?&]edit=1/.test(loc.search)) return;
    req('GET', '/api/auth/session').then((r) => {
      const u = r && r.user;
      if (u && (u.role === 'superadmin' || u.role === 'hod')) { setEditor(u); if (/[?&]edit=1/.test(loc.search)) setOn(true); }
    }).catch(() => {});
  }, []);

  // Edit mode: hover outlines, clicks open the editor instead of following links.
  useEffect(() => {
    window.__AG_EDITING = on ? 1 : 0;
    if (!on || !site) return undefined;
    document.body.classList.add('agle-on');
    const scale = (() => { const p = document.createElement('div'); p.style.cssText = 'position:fixed;left:100px;top:0;width:1px;height:1px'; document.body.appendChild(p); const s = p.getBoundingClientRect().left / 100 || 1; p.remove(); return s; })();
    const page = (el) => el && !inUi(el) && document.getElementById('dc-root').contains(el);
    const move = (e) => {
      if (sheet || !page(e.target)) { setHover(null); return; }
      const h = hitAt(e.clientX, e.clientY, e.target);
      const r = rectOf(h);
      setHover(r && r.width ? { top: r.top / scale - 3, left: r.left / scale - 3, width: r.width / scale + 6, height: r.height / scale + 6, img: !!(h && h.img) } : null);
    };
    const block = (e) => { if (page(e.target)) { e.preventDefault(); e.stopPropagation(); } };
    const click = (e) => {
      if (!page(e.target)) return;
      e.preventDefault(); e.stopPropagation();
      if (sheet) return;
      const h = hitAt(e.clientX, e.clientY, e.target);
      if (h) { setHover(null); setSheet(h); }
    };
    window.addEventListener('mousemove', move, true);
    window.addEventListener('click', click, true);
    ['mousedown', 'pointerdown', 'submit', 'dblclick'].forEach((t) => window.addEventListener(t, block, true));
    return () => {
      document.body.classList.remove('agle-on');
      window.removeEventListener('mousemove', move, true);
      window.removeEventListener('click', click, true);
      ['mousedown', 'pointerdown', 'submit', 'dblclick'].forEach((t) => window.removeEventListener(t, block, true));
    };
  }, [on, site, sheet]);

  if (!editor || !site) return null;
  const close = (saved) => { setSheet(null); if (saved) applyEdits(document.getElementById('dc-root')); };
  const n = Object.keys(edits.text || {}).length + Object.keys(edits.img || {}).length;
  return createPortal(
    <div data-ag-ui ref={box}>
      <style>{CSS}</style>
      {!on ? (
        <button type="button" className="agle-fab" onClick={() => setOn(true)}>✎ Edit this page</button>
      ) : (
        <div className="agle-bar">
          <span className="msg"><b>Editing the live website.</b> Click any text or photo to change it — saved changes show for everyone straight away.</span>
          <button type="button" className="agle-btn gold" onClick={() => setSheet({ notice: true })}>+ Notice, circular or event</button>
          <a className="agle-btn" href="/portal/website">Ticker, FAQs & dates</a>
          <a className="agle-btn" href="/portal/disclosure">Disclosure PDFs</a>
          {n > 0 && <button type="button" className="agle-btn" onClick={() => {
            if (!window.confirm(`Undo all ${n} edits and show the original website text and photos?`)) return;
            req('DELETE', '/api/site-edits').then(() => { edits = { text: {}, img: {} }; applyEdits(document.getElementById('dc-root')); toast('Original website restored.'); }).catch((e) => toast(e.message, true));
          }}>Undo all edits ({n})</button>}
          <a className="agle-btn" href="/portal">Portal</a>
          <button type="button" className="agle-btn gold" onClick={() => { setOn(false); setSheet(null); setHover(null); }}>Done</button>
        </div>
      )}
      {on && hover && !sheet && <div className="agle-hl" style={hover}><span>{hover.img ? 'Click to replace photo' : 'Click to edit'}</span></div>}
      {sheet && sheet.text && <TextSheet hit={sheet} onClose={close} />}
      {sheet && sheet.img && <ImageSheet hit={sheet} onClose={close} />}
      {sheet && sheet.notice && <NoticeSheet onClose={() => setSheet(null)} />}
    </div>,
    document.body,
  );
}
