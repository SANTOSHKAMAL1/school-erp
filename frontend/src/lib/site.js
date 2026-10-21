// Helpers the public design pages use to talk to the backend.

/** Read every field of a form as { "Label text": value }. */
export function collectForm(form) {
  const out = {};
  if (!form) return out;
  const els = form.querySelectorAll('input, select, textarea');
  els.forEach((el, i) => {
    if (['submit', 'button', 'checkbox', 'radio', 'hidden', 'password'].includes(el.type)) return;
    let label = el.closest('label');
    if (!label && el.id) label = form.querySelector(`label[for="${el.id}"]`);
    let text = '';
    if (label) {
      const span = label.querySelector('span');
      text = (span && span.textContent) || label.textContent || '';
      if (el.tagName === 'SELECT') text = text.replace(el.textContent, '');
    }
    text = (text || el.getAttribute('aria-label') || el.placeholder || 'Field ' + (i + 1)).trim().replace(/\s+/g, ' ');
    if (out[text] !== undefined) text = text + ' ' + (i + 1);
    out[text] = el.value || '';
  });
  return out;
}

export async function sendEnquiry(kind, fields) {
  const r = await fetch('/api/public/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, fields }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.detail || 'Could not send. Please call the office.');
  return j;
}

let siteCache = null;
/** Website content the admin edits (ticker, boards, FAQs, calendar). */
export function loadSite() {
  if (!siteCache) {
    siteCache = fetch('/api/public/site', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
    setTimeout(() => { siteCache = null; }, 60000);
  }
  return siteCache;
}

/** Small confirmation message in the page's own colours. */
export function toast(msg, bad) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.setAttribute('role', 'status');
  el.style.cssText =
    'position:fixed;left:50%;bottom:28px;transform:translate(-50%,20px);z-index:2000;max-width:min(520px,calc(100vw - 32px));' +
    'padding:14px 22px;border-radius:999px;font:500 15px/1.45 var(--font-body,Figtree,sans-serif);text-align:center;' +
    'box-shadow:0 12px 32px rgba(46,43,37,.28);opacity:0;transition:opacity .3s,transform .3s;' +
    (bad ? 'background:#ffe1d0;color:#643312' : 'background:#402310;color:#f0fae1');
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translate(-50%,0)'; });
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 400); }, 4200);
}
