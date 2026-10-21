// Study material — notes, worksheets and syllabus PDFs shared with a class. Families see them in their portal.
import React, { useState } from 'react';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Btn, Card, Confirm, Empty, ErrorNote, fmtDate, Icon, IconBtn, Loading, Modal, PageHead, Tag, toast, UploadButton } from '../ui.jsx';

export function MaterialList({ items, onDelete }) {
  if (!items.length) return <Empty title="No study material yet">PDFs, worksheets and notes shared with the class appear here.</Empty>;
  return (
    <div className="pt-files">
      {items.map((m) => (
        <div key={m.id} className="pt-file">
          <span className="ic"><Icon name="file" size={22} /></span>
          <div className="tx">
            <span className="meta">{m.subject}{m.class_label ? ` · ${m.class_label}` : ''} · {fmtDate(m.created_at)}</span>
            <b>{m.title}</b>
            {m.description && <span className="d">{m.description}</span>}
            <span className="by">{m.teacher}</span>
          </div>
          <div className="acts">
            <a className="pt-btn line sm" href={m.url} target="_blank" rel="noreferrer"><Icon name="eye" size={15} />Open</a>
            <a className="pt-btn ghost sm" href={m.url} download={m.filename || true}><Icon name="download" size={15} /></a>
            {onDelete && m.can_edit && <IconBtn icon="trash" label="Remove" onClick={() => onDelete(m)} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Materials({ classId }) {
  const me = useMe();
  const classes = useClasses();
  const [cid, setCid] = useState(classId ? String(classId) : '');
  const list = useLoad(cid ? `/api/materials?class_id=${cid}` : null);
  const subjects = useLoad(cid ? `/api/subjects?class_id=${cid}` : null);
  const [adding, setAdding] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [subj, setSubj] = useState('');
  const [err, setErr] = useState(null);
  const cls = (classes.data || []).find((c) => String(c.id) === String(cid));
  const mine = (subjects.data || []).filter((s) => me.role !== 'teacher' || s.teacher_id === me.id || (cls && cls.class_teacher_id === me.id));
  const canAdd = mine.length > 0 || (cls && (me.role !== 'teacher' || cls.class_teacher_id === me.id));
  const shown = (list.data || []).filter((m) => !subj || String(m.subject_id || '') === subj);

  const save = () => {
    setErr(null);
    api.post('/api/materials', { ...adding, class_id: Number(cid), subject_id: adding.subject_id ? Number(adding.subject_id) : null })
      .then(() => { setAdding(null); toast('Shared with the class.'); list.reload(); }).catch(setErr);
  };
  return (
    <>
      {!classId && (
        <PageHead kicker="Academics" title="Study material" actions={<ClassSelect classes={classes.data} value={cid} onChange={setCid} />}>
          Share notes, worksheets and syllabus PDFs with a class. Families can open and download them from the portal.
        </PageHead>
      )}
      {!cid ? (classes.loading ? <Loading /> : <Empty title="No classes yet" />) : (
        <Card title={cls ? `${cls.label} · study material` : 'Study material'} tone="dark" right={<>
          <select className="pt-select" style={{ minHeight: 36, padding: '6px 34px 6px 14px', width: 'auto' }} value={subj} onChange={(e) => setSubj(e.target.value)} aria-label="Subject">
            <option value="">All subjects</option>
            {(subjects.data || []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {canAdd && <Btn kind="gold" sm icon="plus" onClick={() => { setErr(null); setAdding({ title: '', description: '', url: '', filename: '', subject_id: mine[0] ? String(mine[0].id) : '' }); }}>Share material</Btn>}
        </>}>
          <div style={{ padding: 18 }}>{list.loading && !list.data ? <Loading /> : <MaterialList items={shown} onDelete={setRemoving} />}</div>
        </Card>
      )}
      {adding && (
        <Modal title="Share study material" kicker={cls && cls.label} onClose={() => setAdding(null)}
          footer={<><Btn kind="line" onClick={() => setAdding(null)}>Cancel</Btn><Btn disabled={!adding.url || !adding.title.trim()} onClick={save}>Share with the class</Btn></>}>
          <div className="pt-form">
            <label className="pt-field full"><span>Title <i>*</i></span><input className="pt-input" value={adding.title} placeholder="e.g. Chapter 5 notes" onChange={(e) => setAdding({ ...adding, title: e.target.value })} /></label>
            <label className="pt-field"><span>Subject</span>
              <select className="pt-select" value={adding.subject_id} onChange={(e) => setAdding({ ...adding, subject_id: e.target.value })}>
                {(me.role !== 'teacher' || (cls && cls.class_teacher_id === me.id)) && <option value="">General (all subjects)</option>}
                {mine.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select></label>
            <div className="pt-field"><span>File <i>*</i></span>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <UploadButton label={adding.url ? 'Replace file' : 'Choose PDF or file'} onUploaded={(r) => setAdding((a) => ({ ...a, url: r.url, filename: r.name, title: a.title || r.name.replace(/\.[a-z0-9]+$/i, '') }))} />
                {adding.url && <Tag tone="green">{adding.filename}</Tag>}
              </div></div>
            <label className="pt-field full"><span>Note for families</span><textarea className="pt-textarea" rows="3" value={adding.description} placeholder="Optional — what to do with it" onChange={(e) => setAdding({ ...adding, description: e.target.value })} /></label>
          </div>
          <ErrorNote error={err} />
        </Modal>
      )}
      {removing && <Confirm title="Remove this material?" confirmLabel="Remove" onClose={() => setRemoving(null)}
        onConfirm={() => api.del(`/api/materials/${removing.id}`).then(() => { toast('Removed.'); list.reload(); })}>
        “{removing.title}” will no longer be shown to families.
      </Confirm>}
    </>
  );
}
