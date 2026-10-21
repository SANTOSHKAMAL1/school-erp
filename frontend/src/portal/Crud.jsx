// Generic list + add/edit/delete page used by most admin screens.
import React, { useMemo, useState } from 'react';
import { api, useLoad } from './api.js';
import { AutoField, Btn, Card, Confirm, Credentials, Empty, ErrorNote, IconBtn, Loading, Modal, Search, toast } from './ui.jsx';

/**
 * props:
 *  url            list endpoint
 *  createUrl      POST endpoint (default url)
 *  itemUrl(row)   PUT/DELETE endpoint
 *  columns        [{ label, render(row), className }]
 *  fields         [{ name, label, type, options, required, help, full }]  (or function(row) → fields)
 *  title, tone    card header
 *  noun           "teacher", used in buttons
 *  canCreate, canEdit(row), canDelete(row)
 *  toForm(row)    row → form values; fromForm(values) → payload
 *  searchKeys     [keys] for the search box
 *  filters        extra toolbar nodes
 *  onCreated(res) e.g. show credentials
 *  deleteText(row), deleteLabel
 *  rowActions(row, reload)  extra buttons
 */
export default function Crud(props) {
  const {
    url, createUrl, itemUrl = (r) => `${url.split('?')[0]}/${r.id}`, columns, fields, title, tone = 'plain', noun = 'item',
    canCreate = true, canEdit = () => true, canDelete = () => true, toForm = (r) => ({ ...r }), fromForm = (v) => v,
    searchKeys = ['name'], filters, onCreated, deleteText, deleteLabel = 'Delete', rowActions, emptyText,
    defaults = {}, headerRight, modalWide, createLabel,
  } = props;
  const list = useLoad(url);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null); // {row?, values}
  const [removing, setRemoving] = useState(null);
  const [cred, setCred] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const rows = useMemo(() => {
    const all = list.data || [];
    if (!q.trim()) return all;
    const n = q.trim().toLowerCase();
    return all.filter((r) => searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(n)));
  }, [list.data, q]);

  const fieldList = editing ? (typeof fields === 'function' ? fields(editing.row, editing.values) : fields) : [];

  function save(e) {
    e && e.preventDefault();
    setBusy(true);
    setErr(null);
    const payload = fromForm(editing.values, editing.row);
    const p = editing.row ? api.put(itemUrl(editing.row), payload) : api.post(createUrl || url.split('?')[0], payload);
    p.then((res) => {
      setEditing(null);
      toast(editing.row ? 'Saved.' : `${noun[0].toUpperCase() + noun.slice(1)} added.`);
      if (!editing.row && res && res.temp_password) setCred({ who: res.name, login: res.login, password: res.temp_password });
      if (!editing.row && onCreated) onCreated(res);
      list.reload();
    }).catch(setErr).finally(() => setBusy(false));
  }

  return (
    <>
      <Card title={title} tone={tone} right={<>
        {headerRight}
        {canCreate && <Btn kind={tone === 'dark' ? 'gold' : 'primary'} sm icon="plus" onClick={() => { setErr(null); setEditing({ row: null, values: { ...defaults } }); }}>{createLabel || `Add ${noun}`}</Btn>}
      </>}>
        <div className="pt-toolbar">
          <Search value={q} onChange={setQ} placeholder={`Search ${noun}s`} />
          {filters}
          <span className="muted" style={{ fontSize: 13, color: 'var(--color-neutral-600)' }}>{list.data ? `${rows.length} shown` : ''}</span>
        </div>
        {list.loading && !list.data ? <Loading /> : list.error ? <div style={{ padding: 22 }}><ErrorNote error={list.error} /></div> :
          rows.length === 0 ? <Empty title={q ? 'No matches' : `No ${noun}s yet`}>{q ? 'Try a different search.' : emptyText}</Empty> : (
            <div className="pt-tablewrap">
              <table className="pt-table">
                <thead><tr>{columns.map((c, i) => <th key={i} className={c.className}>{c.label}</th>)}<th /></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      {columns.map((c, i) => <td key={i} className={c.className}>{c.render ? c.render(r) : r[c.key]}</td>)}
                      <td>
                        <div className="pt-rowacts">
                          {rowActions && rowActions(r, list.reload)}
                          {canEdit(r) && <IconBtn icon="edit" label="Edit" onClick={() => { setErr(null); setEditing({ row: r, values: toForm(r) }); }} />}
                          {canDelete(r) && <IconBtn icon="trash" label={deleteLabel} onClick={() => setRemoving(r)} />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </Card>

      {editing && (
        <Modal wide={modalWide} title={editing.row ? `Edit ${noun}` : `Add ${noun}`} kicker={title} onClose={() => setEditing(null)}
          footer={<>
            <Btn kind="line" onClick={() => setEditing(null)}>Cancel</Btn>
            <Btn kind="primary" disabled={busy} onClick={save}>{busy ? 'Saving…' : editing.row ? 'Save changes' : `Add ${noun}`}</Btn>
          </>}>
          <form className="pt-form" onSubmit={save}>
            {fieldList.map((f) => f.render ? <React.Fragment key={f.name}>{f.render(editing.values, (k, v) => setEditing((s) => ({ ...s, values: { ...s.values, [k]: v } })))}</React.Fragment> : (
              <AutoField key={f.name} f={f} value={editing.values[f.name]}
                onChange={(k, v) => setEditing((s) => ({ ...s, values: { ...s.values, [k]: v } }))} />
            ))}
            <button type="submit" hidden />
          </form>
          <ErrorNote error={err} />
        </Modal>
      )}

      {removing && (
        <Confirm title={`${deleteLabel} ${noun}?`} confirmLabel={deleteLabel} onClose={() => setRemoving(null)}
          onConfirm={() => api.del(itemUrl(removing)).then(() => { toast('Done.'); list.reload(); })}>
          {deleteText ? deleteText(removing) : `This removes “${removing.name || removing.title || removing.label || 'this item'}”.`}
        </Confirm>
      )}
      {cred && <Credentials {...cred} role={noun} onClose={() => setCred(null)} />}
    </>
  );
}
