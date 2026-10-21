// Small runtime the converted design pages run on. It reproduces how the
// original Claude Design runtime rendered them (same state semantics, same
// hover-class sheet, same text wrapping) so the pages look and behave the same.
import React, { useInsertionEffect } from 'react';

const h = React.createElement;

/** Base class for page logic — state merges synchronously, like the original. */
export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.__host = null;
  }
  setState(update, cb) {
    this.__host && this.__host.__setLogicState(update, cb);
  }
  forceUpdate() {
    this.__host && this.__host.forceUpdate();
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  renderVals() {
    return {};
  }
}

// ---- template helpers ----
/** text interpolation: same output as the runtime's walkText */
export function I(v) {
  if (v === undefined || v === null || typeof v === 'boolean') return null;
  if (React.isValidElement(v) || Array.isArray(v)) return v;
  return h('span', { className: 'sc-interp' }, String(v));
}
/** attribute interpolation inside a string */
export const S = (v) => (v ?? '');
/** list for sc-for */
export const L = (v) => (Array.isArray(v) ? v : []);
/** value/checked default */
export const D = (v, d) => (v === undefined ? d : v);
export function css(str) {
  if (typeof str !== 'string') return str;
  const o = {};
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    o[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o;
}
export const cx = (...a) => a.filter(Boolean).join(' ') || undefined;

// ---- pseudo-class sheet (style-hover / style-active) ----
let sheetEl = null;
const pcCache = new Map();
let pcN = 0;
function stripComments(c) {
  return c.replace(/\/\*[\s\S]*?\*\//g, '');
}
function importantify(c) {
  c = stripComments(c);
  const decls = [];
  let start = 0, depth = 0, quote = '';
  for (let i = 0; i < c.length; i++) {
    const ch = c[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = '';
    } else if (ch === "'" || ch === '"') quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')') depth = Math.max(0, depth - 1);
    else if (ch === ';' && depth === 0) {
      decls.push(c.slice(start, i));
      start = i + 1;
    }
  }
  decls.push(c.slice(start));
  return decls.map((d) => d.trim()).filter(Boolean)
    .map((d) => (/!\s*important$/i.test(d) ? d : d + ' !important')).join(';');
}
export function pc(pseudo, cssText) {
  const k = pseudo + '|' + cssText;
  const hit = pcCache.get(k);
  if (hit) return hit;
  if (typeof document === 'undefined') return '';
  if (!sheetEl) {
    sheetEl = document.createElement('style');
    sheetEl.setAttribute('data-dc-pseudo', '');
    document.head.appendChild(sheetEl);
  }
  const cls = 'scp' + (pcN++).toString(36);
  const isEl = pseudo === 'before' || pseudo === 'after';
  const sel = isEl ? '.' + cls + '::' + pseudo : '.' + cls + ':' + pseudo;
  try {
    sheetEl.sheet.insertRule(sel + '{' + (isEl ? cssText : importantify(cssText)) + '}', sheetEl.sheet.cssRules.length);
  } catch (e) {
    /* invalid rule — ignore like a browser would */
  }
  pcCache.set(k, cls);
  return cls;
}

// ---- page CSS: present only while the page is mounted ----
function usePageCss(text, name) {
  useInsertionEffect(() => {
    const el = document.createElement('style');
    el.setAttribute('data-page', name);
    el.textContent = text;
    document.head.appendChild(el);
    return () => el.remove();
  }, [text, name]);
}

/** Build a React page component from a logic class + template. */
export function mountPage(Logic, template, pageCss, defaults, name) {
  class Host extends React.Component {
    constructor(props) {
      super(props);
      this.state = { v: 0 };
      this.logic = new Logic(this.userProps());
      this.logic.__host = this;
    }
    userProps() {
      return { ...defaults, ...this.props };
    }
    __setLogicState(update, cb) {
      const prev = this.logic.state;
      const patch = typeof update === 'function' ? update(prev) : update;
      this.logic.state = { ...prev, ...patch };
      this.setState((s) => ({ v: s.v + 1 }), cb);
    }
    componentDidMount() {
      try { this.logic.componentDidMount(); } catch (e) { console.error(e); }
    }
    componentDidUpdate(prevProps) {
      this.logic.props = this.userProps();
      try { this.logic.componentDidUpdate(prevProps); } catch (e) { console.error(e); }
    }
    componentWillUnmount() {
      try { this.logic.componentWillUnmount(); } catch (e) { console.error(e); }
    }
    render() {
      const userProps = this.userProps();
      this.logic.props = userProps;
      let vals = userProps;
      try {
        vals = { ...userProps, ...(this.logic.renderVals() || {}) };
      } catch (e) {
        console.error(name + '.renderVals()', e);
      }
      return h('div', { className: 'sc-host', 'data-sc-name': name }, template(vals));
    }
  }
  function Page(props) {
    usePageCss(pageCss, name);
    return h(Host, props);
  }
  Page.displayName = name;
  return Page;
}
