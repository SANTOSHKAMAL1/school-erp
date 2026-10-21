// API calls + the signed-in user.
import { useEffect, useState, useCallback } from 'react';

async function request(method, url, body, isForm) {
  const opts = { method, credentials: 'same-origin', headers: {} };
  if (body !== undefined) {
    if (isForm) opts.body = body;
    else {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
  }
  const r = await fetch(url, opts);
  let data = null;
  try { data = await r.json(); } catch (e) { /* empty */ }
  if (!r.ok) {
    let msg = (data && data.detail) || `Something went wrong (${r.status}).`;
    if (Array.isArray(msg)) msg = msg.map((d) => `${(d.loc || []).slice(-1)[0]}: ${d.msg}`).join('; ');
    const err = new Error(msg);
    err.status = r.status;
    if (r.status === 401 && !url.endsWith('/auth/login') && !url.endsWith('/auth/me')) {
      setMe(null);
      window.dispatchEvent(new CustomEvent('ag-signed-out'));
    }
    throw err;
  }
  return data;
}

export const api = {
  get: (u) => request('GET', u),
  post: (u, b) => request('POST', u, b ?? {}),
  put: (u, b) => request('PUT', u, b ?? {}),
  del: (u) => request('DELETE', u),
  upload: (u, file) => {
    const fd = new FormData();
    fd.append('file', file);
    return request('POST', u, fd, true);
  },
};

// ---- signed-in user store ----
let me = null;
const subs = new Set();
export function setMe(v) { me = v; subs.forEach((f) => f(v)); }
export function getMe() { return me; }
export function useMe() {
  const [v, set] = useState(me);
  useEffect(() => { subs.add(set); return () => subs.delete(set); }, []);
  return v;
}

/** Load data from a URL; returns { data, error, loading, reload, setData }. */
export function useLoad(url, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: !!url });
  const load = useCallback(() => {
    if (!url) { setState({ data: null, error: null, loading: false }); return Promise.resolve(); }
    setState((s) => ({ ...s, loading: true, error: null }));
    return api.get(url)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => setState({ data: null, error, loading: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);
  useEffect(() => { load(); }, [load]);
  return { ...state, reload: load, setData: (d) => setState((s) => ({ ...s, data: typeof d === 'function' ? d(s.data) : d })) };
}

export const ROLE_LABEL = { superadmin: 'Administrator', hod: 'Head of Department', teacher: 'Teacher', parent: 'Family' };
