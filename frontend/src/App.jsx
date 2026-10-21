import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage/index.jsx';
import { setNavigator } from './lib/nav.js';

const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage/index.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage/index.jsx'));
const DisclosurePage = lazy(() => import('./pages/DisclosurePage/index.jsx'));
const LoginPage = lazy(() => import('./pages/FamilyLoginPage/index.jsx'));
const Portal = lazy(() => import('./portal/Portal.jsx'));

const SITE_ROUTES = /^\/(admissions|contact|login|mandatory-disclosure)?$/;

/** Internal links in the design pages become client-side navigation. */
function useLinkRouting() {
  const navigate = useNavigate();
  setNavigator(navigate);
  useEffect(() => {
    function onClick(ev) {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      let a = ev.target;
      while (a && a.nodeName !== 'A') a = a.parentNode;
      if (!a || a.target || a.hasAttribute('download')) return;
      const raw = a.getAttribute('href') || '';
      if (!raw.startsWith('/')) return;
      const url = new URL(raw, location.origin);
      if (!SITE_ROUTES.test(url.pathname) && !url.pathname.startsWith('/portal')) return;
      if (url.pathname === location.pathname && url.hash) return; // same-page anchor
      ev.preventDefault();
      window.__AG_NAV = 1;
      navigate(url.pathname + url.search + url.hash);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);
}

/** Fresh page on every route change, like the original full-page loads. */
function useRouteReset() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; if (!hash) return; }
    document.documentElement.style.zoom = '';
    if (!hash) { window.scrollTo(0, 0); return; }
    let n = 0;
    const t = setInterval(() => {
      n++;
      const el = document.getElementById(hash.slice(1));
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60);
      if ((el && n > 6) || n > 30) clearInterval(t);
    }, 200);
    return () => clearInterval(t);
  }, [pathname, hash]);
}

function Loading() {
  return <div className="ag-wait"><div className="ag-spin" /><div>Arundhati Gurukulam</div></div>;
}

export default function App() {
  useLinkRouting();
  useRouteReset();
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mandatory-disclosure" element={<DisclosurePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal/*" element={<Portal />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
