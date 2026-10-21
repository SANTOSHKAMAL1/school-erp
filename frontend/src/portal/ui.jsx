import React, { useEffect, useRef, useState } from 'react';
import { toast } from '../lib/site.js';
import { api } from './api.js';

export { toast };
export const LOGO_DARK_BG = '/assets/img-06-f5e5bb.png';
export const LOGO_LIGHT_BG = '/assets/img-03-55c76a.png';
export const MANDALA = '/assets/img-01-961cb5.png';

// ---------- icons (stroke, 24 grid) ----------
const P = {
  home: 'M3 11.5 12 4l9 7.5M5.5 10v9.5h5v-6h3v6h5V10',
  users: 'M16 19.5v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18v1.5M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM20 19.5V18a3.5 3.5 0 0 0-2.5-3.35M15.5 4.2a3.5 3.5 0 0 1 0 6.6',
  user: 'M19 20v-1.5a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4V20M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5',
  school: 'M3 9.5 12 5l9 4.5-9 4.5-9-4.5ZM7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5M21 9.5V15',
  check: 'M4 12.5 9 17.5 20 6.5',
  calendar: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12ZM4 10h16M8.5 3v4M15.5 3v4',
  chart: 'M4 20h16M7 16.5V11M12 16.5V6.5M17 16.5v-3.5',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 0 6.5 23H20',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3.5 2',
  rupee: 'M6.5 4h11M6.5 8.5h11M9 4c5 0 5 9 0 9H6.5l8 7',
  bell: 'M6 9.5a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5H3.5S6 15.5 6 9.5ZM10 20.5a2.2 2.2 0 0 0 4 0',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z',
  file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h6',
  inbox: 'M3 13.5 5.5 5h13l2.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19v-5.5ZM3 13.5h5l1.5 2.5h5l1.5-2.5h5',
  chat: 'M20.5 12a8 8 0 0 1-11.7 7.1L3.5 20.5l1.4-5.1A8 8 0 1 1 20.5 12Z',
  leave: 'M8 3v4M16 3v4M4 9h16M5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5ZM9 14.5l2 2 4-4',
  activity: 'M3 12h4l3-8 4 16 3-8h4',
  key: 'M14.5 9.5a5 5 0 1 0-4.6 5L12 16.5h2v2h2v2h4.5V17l-6.5-6.5a5 5 0 0 0 .5-1Z',
  plus: 'M12 5v14M5 12h14',
  edit: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4',
  trash: 'M4 7h16M10 11v6M14 11v6M5.5 7l1 12.5A1.5 1.5 0 0 0 8 21h8a1.5 1.5 0 0 0 1.5-1.5L18.5 7M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7',
  x: 'M18 6 6 18M6 6l12 12',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  menu: 'M4 7h16M4 12h16M4 17h16',
  logout: 'M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15M10 16.5 14.5 12 10 7.5M14.5 12H4',
  download: 'M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14',
  upload: 'M12 15V4M7.5 8.5 12 4l4.5 4.5M5 19.5h14',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z',
  send: 'M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z',
  copy: 'M9 9h10.5A1.5 1.5 0 0 1 21 10.5V20a1.5 1.5 0 0 1-1.5 1.5H10A1.5 1.5 0 0 1 8.5 20V9.5M15.5 9V4.5A1.5 1.5 0 0 0 14 3H4.5A1.5 1.5 0 0 0 3 4.5V14a1.5 1.5 0 0 0 1.5 1.5H8.5',
  print: 'M7 9V3.5h10V9M7 17.5H5A1.5 1.5 0 0 1 3.5 16v-5.5A1.5 1.5 0 0 1 5 9h14a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 1-1.5 1.5h-2M7 14h10v6.5H7z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  up: 'M12 19V5M6 11l6-6 6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
};
export function Icon({ name, size = 18, stroke = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name] || P.file} />
    </svg>
  );
}

export function initials(name = '') {
  const parts = name.replace(/^(Sri|Smt\.?|Dr\.?|Acharya|Ms\.?|Mr\.?|Mrs\.?)\s+/i, '').split(/\s+/).filter(Boolean);
  return ((parts[0] || '?')[0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

// ---------- dates & money ----------
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function fmtDate(s, long) {
  if (!s) return '—';
  const d = new Date(s.length <= 10 ? s + 'T00:00:00' : s);
  if (isNaN(d)) return s;
  return long ? d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
export function fmtTime(s) {
  if (!s) return '';
  const d = new Date(s.endsWith('Z') || s.includes('+') ? s : s + 'Z');
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
}
export function money(v) {
  return '₹\u00a0' + Number(v || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// ---------- layout pieces ----------
export function PageHead({ kicker, title, children, actions }) {
  return (
    <div className="pt-head">
      <div>
        {kicker && <span className="k">{kicker}</span>}
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
      {actions && <div className="pt-actions">{actions}</div>}
    </div>
  );
}

export function Card({ title, tone = 'plain', right, children, pad, className = '', style }) {
  return (
    <div className={`pt-card ${pad ? 'pad' : ''} ${pad && title ? 'titled' : ''} ${className}`} style={style}>
      {title && (
        <div className={`pt-cardhead ${tone}`}>
          <h3>{title}</h3>
          {right && <div className="right">{right}</div>}
        </div>
      )}
      {pad && title ? <div className="pt-cardbody">{children}</div> : children}
    </div>
  );
}

export function Stat({ label, value, note, tone }) {
  return (
    <div className={`pt-card pt-stat ${tone || ''}`}>
      <span className="l">{label}</span>
      <span className={`v ${typeof value === 'string' && value.length > 9 ? 'long' : ''}`}>{value}</span>
      {note && <span className="n">{note}</span>}
    </div>
  );
}

export function Btn({ kind = 'primary', icon, children, sm, ...rest }) {
  return (
    <button type="button" className={`pt-btn ${kind} ${sm ? 'sm' : ''}`} {...rest}>
      {icon && <Icon name={icon} size={sm ? 15 : 17} />}
      {children}
    </button>
  );
}

export function IconBtn({ icon, label, ...rest }) {
  return (
    <button type="button" className="pt-icon" aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={17} />
    </button>
  );
}

export function Tag({ tone = 'grey', children }) {
  return <span className={`pt-tag ${tone}`}>{children}</span>;
}

export function Loading() {
  return <div className="pt-loading"><div className="pt-spin" /></div>;
}

export function Empty({ title = 'Nothing here yet', children }) {
  return (
    <div className="pt-empty">
      <img src={MANDALA} alt="" />
      <b>{title}</b>
      {children && <span>{children}</span>}
    </div>
  );
}

export function ErrorNote({ error }) {
  if (!error) return null;
  return <div className="pt-note err">{error.message || String(error)}</div>;
}

export function Modal({ title, kicker, onClose, children, footer, wide }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="pt-modal-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div className={`pt-modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="pt-modal-head">
          <div>
            {kicker && <span className="k">{kicker}</span>}
            <h3>{title}</h3>
          </div>
          {onClose && <IconBtn icon="x" label="Close" onClick={onClose} />}
        </div>
        <div className="pt-modal-body">{children}</div>
        {footer && <div className="pt-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function Confirm({ title, children, confirmLabel = 'Delete', onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  return (
    <Modal title={title} kicker="Please confirm" onClose={onClose}
      footer={<>
        <Btn kind="line" onClick={onClose}>Cancel</Btn>
        <Btn kind="primary" disabled={busy} onClick={() => {
          setBusy(true);
          Promise.resolve(onConfirm()).then(onClose).catch((e) => { setErr(e); setBusy(false); });
        }}>{busy ? 'Working…' : confirmLabel}</Btn>
      </>}>
      <p style={{ fontSize: 15, lineHeight: 1.6 }}>{children}</p>
      <ErrorNote error={err} />
    </Modal>
  );
}

/** Shows a new login + temporary password once, with copy. */
export function Credentials({ who, login, password, onClose, role = 'family' }) {
  const text = `Arundhati Gurukulam ${role} login\nID: ${login}\nPassword: ${password}\nSign in at ${location.origin}/login — you will be asked to set your own password.`;
  return (
    <Modal title="Login created" kicker={who} onClose={onClose}
      footer={<>
        <Btn kind="line" icon="copy" onClick={() => { navigator.clipboard && navigator.clipboard.writeText(text); toast('Copied — share it with ' + who + '.'); }}>Copy details</Btn>
        <Btn kind="dark" onClick={onClose}>Done</Btn>
      </>}>
      <div className="pt-cred">
        <div className="row"><span>Login ID</span><code>{login}</code></div>
        <div className="row"><span>Password</span><code>{password}</code></div>
      </div>
      <div className="pt-note info">This password is shown only now. Share it privately — it must be changed at the first sign-in. You can reset it later if it is lost.</div>
    </Modal>
  );
}

// ---------- form fields ----------
export function Field({ label, required, help, full, children }) {
  return (
    <label className={`pt-field ${full ? 'full' : ''}`}>
      <span>{label}{required && <i> *</i>}</span>
      {children}
      {help && <small>{help}</small>}
    </label>
  );
}

/** Renders a field from a config: {name,label,type,options,required,help,full,placeholder} */
export function AutoField({ f, value, onChange }) {
  const common = { value: value ?? '', onChange: (e) => onChange(f.name, f.type === 'checkbox' ? e.target.checked : e.target.value), placeholder: f.placeholder, required: f.required };
  let input;
  if (f.type === 'select') {
    input = (
      <select className="pt-select" {...common}>
        {f.blank !== false && <option value="">{f.blankLabel || '— Choose —'}</option>}
        {(f.options || []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  } else if (f.type === 'textarea') {
    input = <textarea className="pt-textarea" rows={f.rows || 4} {...common} />;
  } else if (f.type === 'checkbox') {
    return (
      <label className={`pt-check ${f.full ? 'full' : ''}`} style={{ gridColumn: f.full ? '1 / -1' : undefined }}>
        <input type="checkbox" checked={!!value} onChange={common.onChange} /> {f.label}
      </label>
    );
  } else {
    input = <input className="pt-input" type={f.type || 'text'} {...common} step={f.step} min={f.min} max={f.max} />;
  }
  return <Field label={f.label} required={f.required} help={f.help} full={f.full}>{input}</Field>;
}

export function Search({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="pt-search grow">
      <Icon name="search" size={16} />
      <input className="pt-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

export function Seg({ value, options, onChange }) {
  return (
    <div className="pt-seg" role="tablist">
      {options.map((o) => (
        <button key={o.value} type="button" className={value === o.value ? 'on' : ''} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}

/** File picker that uploads and returns the URL. */
export function UploadButton({ onUploaded, label = 'Attach file', url = '/api/uploads', accept }) {
  const ref = useRef();
  const [busy, setBusy] = useState(false);
  return (
    <>
      <input ref={ref} type="file" hidden accept={accept} onChange={(e) => {
        const f = e.target.files[0];
        if (!f) return;
        setBusy(true);
        api.upload(url, f).then((r) => onUploaded(r)).catch((err) => toast(err.message, true))
          .finally(() => { setBusy(false); e.target.value = ''; });
      }} />
      <Btn kind="line" sm icon="upload" disabled={busy} onClick={() => ref.current.click()}>{busy ? 'Uploading…' : label}</Btn>
    </>
  );
}

/** Adds .in to .pt-reveal elements as they scroll into view. */
export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.pt-reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e, i) => { e.style.transitionDelay = Math.min(i, 6) * 60 + 'ms'; io.observe(e); });
    return () => io.disconnect();
  }, [dep]);
}

export const STATUS_WORD = { P: 'Present', A: 'Absent', L: 'Late', H: 'Half day' };
export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
