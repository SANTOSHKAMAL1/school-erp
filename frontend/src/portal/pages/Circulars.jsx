import React, { useState } from 'react';
import Crud from '../Crud.jsx';
import { useLoad, useMe } from '../api.js';
import { classOptions, useClasses } from '../shared.jsx';
import { fmtDate, PageHead, Seg, Tag, today, UploadButton } from '../ui.jsx';

const AUD = { all: 'Everyone', parents: 'All families', staff: 'All staff', department: 'Department', class: 'Class' };

export default function Circulars() {
  const me = useMe();
  const classes = useClasses();
  const depts = useLoad(me.role === 'superadmin' ? '/api/departments' : null);
  const [cat, setCat] = useState('');
  const audOptions = me.role === 'superadmin' ? ['all', 'parents', 'staff', 'department', 'class'] : me.role === 'hod' ? ['department', 'class', 'staff'] : ['class'];
  const myClasses = (classes.data || []);
  return (
    <>
      <PageHead kicker="Families" title={me.role === 'superadmin' ? 'Notices & circulars' : 'Circulars'}
        actions={<Seg value={cat} onChange={setCat} options={[{ value: '', label: 'All' }, { value: 'notice', label: 'Notices' }, { value: 'circular', label: 'Circulars' }, { value: 'event', label: 'Events' }]} />}>
        {me.role === 'superadmin' ? 'Anything ticked “Show on website” appears on the home page boards (Notices, Circulars, Events & results). Everything else goes to the portal only.'
          : 'Send a circular to a class or your department. It appears on each family’s portal.'}
      </PageHead>
      <Crud key={cat} url={`/api/circulars${cat ? `?category=${cat}` : ''}`} createUrl="/api/circulars" itemUrl={(r) => `/api/circulars/${r.id}`}
        title="Posted" tone="dark" noun="circular" createLabel="New circular" modalWide
        canEdit={(r) => r.can_edit} canDelete={(r) => r.can_edit} searchKeys={['title', 'body', 'class_label']}
        defaults={{ category: 'circular', audience: audOptions[0], publish_on: today(), class_id: myClasses[0] ? String(myClasses[0].id) : '', department_id: me.department_id ? String(me.department_id) : '' }}
        columns={[
          { label: 'Date', render: (r) => <span style={{ whiteSpace: 'nowrap' }}>{fmtDate(r.publish_on)}</span> },
          { label: 'Text', render: (r) => <div style={{ maxWidth: 560, lineHeight: 1.5 }}>{r.title && <b style={{ fontWeight: 600 }}>{r.title}: </b>}{r.body}{r.event_on && <div className="muted">Event on {fmtDate(r.event_on, true)}</div>}{r.attachment && <div><a href={r.attachment} target="_blank" rel="noreferrer">Attachment</a></div>}</div> },
          { label: 'Type', render: (r) => <Tag tone={r.category === 'event' ? 'gold' : r.category === 'notice' ? 'grey' : 'brown'}>{r.category}</Tag> },
          { label: 'For', render: (r) => <span className="muted">{r.audience === 'class' ? r.class_label : r.audience === 'department' ? r.department : AUD[r.audience]}</span> },
          ...(me.role === 'superadmin' ? [{ label: 'Website', render: (r) => r.on_website ? <Tag tone="green">On site</Tag> : <span className="muted">—</span> }] : []),
        ]}
        fields={(row, v) => [
          { name: 'category', label: 'Type', type: 'select', blank: false, options: [{ value: 'notice', label: 'Notice' }, { value: 'circular', label: 'Circular' }, { value: 'event', label: 'Event / result' }] },
          { name: 'audience', label: 'Who should see it', type: 'select', blank: false, options: audOptions.map((a) => ({ value: a, label: AUD[a] })) },
          ...(v.audience === 'class' ? [{ name: 'class_id', label: 'Class', type: 'select', blank: false, options: classOptions(myClasses) }] : []),
          ...(v.audience === 'department' && me.role === 'superadmin' ? [{ name: 'department_id', label: 'Department', type: 'select', options: (depts.data || []).map((d) => ({ value: String(d.id), label: d.name })) }] : []),
          { name: 'title', label: 'Heading (optional)', placeholder: 'e.g. Circular 15/2026', full: v.audience !== 'class' && v.audience !== 'department' },
          { name: 'body', label: 'Text', type: 'textarea', required: true, full: true },
          { name: 'publish_on', label: 'Publish on', type: 'date', help: 'Families see it from this date.' },
          ...(v.category === 'event' ? [{ name: 'event_on', label: 'Event date', type: 'date' }] : []),
          { name: 'attachment', render: (vals, set) => (
            <div className="pt-field full"><span>Attachment</span>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <UploadButton onUploaded={(r) => set('attachment', r.url)} />
                {vals.attachment ? <><a href={vals.attachment} target="_blank" rel="noreferrer">{vals.attachment.split('/').pop()}</a><button type="button" className="pt-btn ghost sm" onClick={() => set('attachment', '')}>Remove</button></> : <small>Optional PDF or image.</small>}
              </div></div>) },
          ...(me.role === 'superadmin' ? [{ name: 'on_website', label: 'Show on the website home page', type: 'checkbox', full: true }] : []),
        ]}
        toForm={(r) => ({ ...r, class_id: r.class_id ? String(r.class_id) : '', department_id: r.department_id ? String(r.department_id) : '', event_on: r.event_on || '' })}
        fromForm={(v) => ({ ...v, class_id: v.class_id ? Number(v.class_id) : null, department_id: v.department_id ? Number(v.department_id) : null, event_on: v.event_on || null, publish_on: v.publish_on || null, title: v.title || '', attachment: v.attachment || '', on_website: !!v.on_website })}
        emptyText="Nothing posted yet."
      />
    </>
  );
}
