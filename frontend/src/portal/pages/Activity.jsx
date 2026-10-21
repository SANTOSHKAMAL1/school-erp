import React from 'react';
import { useLoad } from '../api.js';
import { Card, Empty, fmtTime, Loading, PageHead, Tag } from '../ui.jsx';

export default function Activity() {
  const { data, loading } = useLoad('/api/activity?limit=300');
  return (
    <>
      <PageHead kicker="Website" title="Activity log">Sign-ins and changes across the portal, newest first.</PageHead>
      <Card title="Recent activity" tone="dark">
        {loading && !data ? <Loading /> : !(data || []).length ? <Empty /> : (
          <div className="pt-tablewrap"><table className="pt-table">
            <thead><tr><th>When</th><th>Who</th><th>What</th><th>Detail</th></tr></thead>
            <tbody>{data.map((a) => (
              <tr key={a.id}><td className="muted" style={{ whiteSpace: 'nowrap' }}>{fmtTime(a.at)}</td><td>{a.user || '—'} {a.role && <Tag>{a.role}</Tag>}</td>
                <td>{a.action.replace('.', ' · ')}</td><td className="muted">{a.detail}</td></tr>))}</tbody>
          </table></div>
        )}
      </Card>
    </>
  );
}
