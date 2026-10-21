import React, { useEffect } from 'react';
import { useLoad, useMe } from './api.js';

/** Classes the signed-in user can see (cached per page). */
export function useClasses() {
  return useLoad('/api/classes');
}

/** <select> of classes; picks the first one automatically when `auto`. */
export function ClassSelect({ classes, value, onChange, auto = true, allLabel, onlyManaged }) {
  const me = useMe();
  let list = classes || [];
  if (onlyManaged && me && me.role === 'teacher') list = list.filter((c) => c.class_teacher_id === me.id);
  useEffect(() => {
    if (auto && !value && list.length) onChange(String(list[0].id));
  }, [list.length]);
  return (
    <select className="pt-select" value={value || ''} onChange={(e) => onChange(e.target.value)} aria-label="Class">
      {allLabel && <option value="">{allLabel}</option>}
      {!allLabel && !list.length && <option value="">No classes</option>}
      {list.map((c) => <option key={c.id} value={c.id}>{c.label}{c.department ? ` · ${c.department}` : ''}</option>)}
    </select>
  );
}

export const classOptions = (classes) => (classes || []).map((c) => ({ value: String(c.id), label: c.label }));
