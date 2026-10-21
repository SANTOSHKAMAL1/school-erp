import React, { useState } from 'react';
import Crud from '../Crud.jsx';
import { useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Empty, fmtDate, Loading, PageHead, Tag, today, UploadButton } from '../ui.jsx';

export default function Homework() {
  const me = useMe();
  const classes = useClasses();
  const [cid, setCid] = useState('');
  const subjects = useLoad(cid ? `/api/subjects?class_id=${cid}` : null);
  const cls = (classes.data || []).find((c) => String(c.id) === String(cid));
  const mine = (subjects.data || []).filter((s) => me.role !== 'teacher' || s.teacher_id === me.id || (cls && cls.class_teacher_id === me.id));
  return (
    <>
      <PageHead kicker="Academics" title="Homework" actions={<ClassSelect classes={classes.data} value={cid} onChange={setCid} />}>
        Homework appears on the family portal as soon as it is posted.
      </PageHead>
      {classes.loading && !classes.data ? <Loading /> : !cid ? <Empty title="No classes yet" /> : (
        <Crud key={cid} url={`/api/homework?class_id=${cid}`} createUrl="/api/homework" itemUrl={(r) => `/api/homework/${r.id}`}
          title={cls ? cls.label : 'Homework'} tone="dark" noun="homework" createLabel="Set homework" canCreate={mine.length > 0}
          canEdit={(r) => r.can_edit} canDelete={(r) => r.can_edit} searchKeys={['title', 'subject', 'details']}
          defaults={{ subject_id: mine[0] ? String(mine[0].id) : '' }}
          columns={[
            { label: 'Homework', render: (r) => <div style={{ maxWidth: 520 }}><b style={{ fontWeight: 600 }}>{r.title}</b><div className="muted" style={{ whiteSpace: 'pre-wrap' }}>{r.details}</div>{r.attachment && <a href={r.attachment} target="_blank" rel="noreferrer">Attachment</a>}</div> },
            { label: 'Subject', render: (r) => r.subject },
            { label: 'Due', render: (r) => r.due_on ? (r.due_on < today() ? <Tag>{fmtDate(r.due_on)}</Tag> : <Tag tone="gold">{fmtDate(r.due_on)}</Tag>) : '—' },
            { label: 'Set by', render: (r) => <span className="muted">{r.teacher}</span> },
          ]}
          fields={[
            { name: 'title', label: 'Title', required: true, full: true, placeholder: 'e.g. Learn the first five shlokas' },
            { name: 'subject_id', label: 'Subject', type: 'select', blank: false, options: mine.map((s) => ({ value: String(s.id), label: s.name })) },
            { name: 'due_on', label: 'Due on', type: 'date' },
            { name: 'details', label: 'Details', type: 'textarea', full: true },
            { name: 'attachment', label: 'Attachment', full: true, render: (v, set) => (
              <div className="pt-field full"><span>Attachment</span>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <UploadButton onUploaded={(r) => set('attachment', r.url)} />
                  {v.attachment ? <><a href={v.attachment} target="_blank" rel="noreferrer">{v.attachment.split('/').pop()}</a><button type="button" className="pt-btn ghost sm" onClick={() => set('attachment', '')}>Remove</button></> : <small>Optional — PDF, image or Word file.</small>}
                </div></div>) },
          ]}
          toForm={(r) => ({ ...r, subject_id: r.subject_id ? String(r.subject_id) : '', due_on: r.due_on || '' })}
          fromForm={(v) => ({ class_id: Number(cid), subject_id: v.subject_id ? Number(v.subject_id) : null, title: v.title, details: v.details || '', due_on: v.due_on || null, attachment: v.attachment || '' })}
          emptyText="Nothing set for this class yet."
        />
      )}
    </>
  );
}
