import React, { useState } from 'react';
import Crud from '../Crud.jsx';
import { fmtTime, PageHead, Seg, Tag } from '../ui.jsx';

const ST = [['new', 'New', 'gold'], ['contacted', 'Contacted', 'grey'], ['visited', 'Visited', 'brown'], ['admitted', 'Admitted', 'green'], ['closed', 'Closed', 'grey']];

export default function Enquiries() {
  const [status, setStatus] = useState('');
  return (
    <>
      <PageHead kicker="Office" title="Enquiries" actions={<Seg value={status} onChange={setStatus} options={[{ value: '', label: 'All' }, ...ST.slice(0, 4).map(([v, l]) => ({ value: v, label: l }))]} />}>
        Every form on the website — “Request a visit”, the admissions enquiry and the contact page — lands here.
      </PageHead>
      <Crud key={status} url={`/api/enquiries${status ? `?status=${status}` : ''}`} title="From the website" tone="dark" noun="enquiry" canCreate={false}
        searchKeys={['name', 'phone', 'email', 'child_name', 'grade', 'reference']}
        columns={[
          { label: 'Received', render: (r) => <span style={{ whiteSpace: 'nowrap' }}>{fmtTime(r.created_at)}<div className="muted">{r.reference}</div></span> },
          { label: 'From', render: (r) => <><b style={{ fontWeight: 600 }}>{r.name || '—'}</b><div className="muted">{r.phone}{r.email && ` · ${r.email}`}</div></> },
          { label: 'About', render: (r) => <div style={{ maxWidth: 380 }}><Tag tone="brown">{r.kind}</Tag> {r.child_name && <>{r.child_name} · </>}{r.grade}<div className="muted">{r.message}</div></div> },
          { label: 'Status', render: (r) => { const s = ST.find((x) => x[0] === r.status) || ST[0]; return <><Tag tone={s[2]}>{s[1]}</Tag>{r.notes && <div className="muted" style={{ maxWidth: 220 }}>{r.notes}</div>}</>; } },
        ]}
        fields={(row) => [
          { name: 'status', label: 'Status', type: 'select', blank: false, options: ST.map(([v, l]) => ({ value: v, label: l })) },
          { name: 'notes', label: 'Office notes', type: 'textarea', full: true, placeholder: 'e.g. Called on 18 Oct, visit fixed for Tuesday 9:30' },
          { name: 'all', render: () => (
            <div className="pt-field full"><span>Everything they wrote</span>
              <table className="pt-table"><tbody>{Object.entries(row.data || {}).map(([k, v]) => <tr key={k}><td className="muted">{k}</td><td>{v}</td></tr>)}</tbody></table></div>) },
        ]}
        fromForm={(v) => ({ status: v.status, notes: v.notes || '' })}
        emptyText="When families fill in a form on the website, it appears here."
      />
    </>
  );
}
