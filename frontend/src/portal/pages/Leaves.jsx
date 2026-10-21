import React, { useState } from 'react';
import { api, useLoad } from '../api.js';
import { Btn, Card, Empty, fmtDate, fmtTime, Loading, Modal, PageHead, Seg, Tag, toast } from '../ui.jsx';

export default function Leaves() {
  const [status, setStatus] = useState('pending');
  const list = useLoad(`/api/leaves${status ? `?status=${status}` : ''}`);
  const [deciding, setDeciding] = useState(null);
  const [resp, setResp] = useState('');
  const decide = (st) => api.put(`/api/leaves/${deciding.id}`, { status: st, response: resp })
    .then(() => { toast(st === 'approved' ? 'Leave approved.' : 'Leave declined.'); setDeciding(null); list.reload(); })
    .catch((e) => toast(e.message, true));
  return (
    <>
      <PageHead kicker="Families" title="Leave requests" actions={<Seg value={status} onChange={setStatus} options={[{ value: 'pending', label: 'Waiting' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Declined' }, { value: '', label: 'All' }]} />}>
        Families apply for leave from their portal. The class teacher or HOD approves it.
      </PageHead>
      <Card title="Requests" tone="dark">
        {list.loading && !list.data ? <Loading /> : !(list.data || []).length ? <Empty title="No requests here" /> : (
          <div className="pt-tablewrap"><table className="pt-table">
            <thead><tr><th>Student</th><th>Dates</th><th>Reason</th><th>Status</th><th /></tr></thead>
            <tbody>{list.data.map((l) => (
              <tr key={l.id}>
                <td><b style={{ fontWeight: 600 }}>{l.student}</b><div className="muted">{l.class_label} · asked {fmtTime(l.created_at)}</div></td>
                <td style={{ whiteSpace: 'nowrap' }}>{fmtDate(l.from_day)}{l.to_day !== l.from_day && <> – {fmtDate(l.to_day)}</>}</td>
                <td style={{ maxWidth: 380 }}>{l.reason}{l.response && <div className="muted">Reply: {l.response}</div>}</td>
                <td>{l.status === 'pending' ? <Tag tone="gold">Waiting</Tag> : l.status === 'approved' ? <Tag tone="green">Approved</Tag> : <Tag tone="red">Declined</Tag>}{l.decided_by && <div className="muted">{l.decided_by}</div>}</td>
                <td><div className="pt-rowacts">{l.can_decide && <Btn kind={l.status === 'pending' ? 'primary' : 'line'} sm onClick={() => { setResp(l.response || ''); setDeciding(l); }}>{l.status === 'pending' ? 'Decide' : 'Change'}</Btn>}</div></td>
              </tr>))}</tbody>
          </table></div>
        )}
      </Card>
      {deciding && (
        <Modal title={`Leave for ${deciding.student}`} kicker={`${fmtDate(deciding.from_day)} – ${fmtDate(deciding.to_day)}`} onClose={() => setDeciding(null)}
          footer={<><Btn kind="danger" onClick={() => decide('rejected')}>Decline</Btn><Btn kind="primary" onClick={() => decide('approved')}>Approve</Btn></>}>
          <div className="pt-note info">{deciding.reason}</div>
          <label className="pt-field"><span>Reply to the family (optional)</span><textarea className="pt-textarea" rows="3" value={resp} onChange={(e) => setResp(e.target.value)} placeholder="e.g. Approved. Please send the homework done on return." /></label>
        </Modal>
      )}
    </>
  );
}
