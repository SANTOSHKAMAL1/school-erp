// Lets non-React code (the converted design pages) navigate inside the app.
let nav = null;
export function setNavigator(fn) { nav = fn; }
export function go(path, opts) {
  window.__AG_NAV = 1;
  if (nav) nav(path, opts);
  else window.location.assign(path);
}
