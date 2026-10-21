import React, { useState } from 'react';
import Crud from '../Crud.jsx';
import { api, useLoad } from '../api.js';
import { ClassSelect, classOptions, useClasses } from '../shared.jsx';
import { Btn, fmtDate, LOGO_LIGHT_BG, Modal, money, PageHead, Seg, Stat, Tag, toast, today } from '../ui.jsx';

export function Receipt({ f, onClose }) {
  return (
    <Modal title={`Receipt ${f.receipt_no}`} kicker="Fee receipt" onClose={onClose} footer={<><Btn kind="line" icon="print" onClick={() => window.print()}>Print</Btn><Btn kind="dark" onClick={onClose}>Close</Btn></>}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', borderBottom: '1px solid var(--color-divider)', paddingBottom: 14 }}>
        <img src={LOGO_LIGHT_BG} alt="" style={{ height: 56 }} />
        <div><b style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 20 }}>Arundhati Gurukulam</b><div className="muted" style={{ fontSize: 13 }}>Raghavasadanam, Shankarapuram, Basavanagudi, Bengaluru 560004</div></div>
      </div>
      <table className="pt-table"><tbody>
        {[['Receipt no.', f.receipt_no], ['Student', `${f.student} (${f.admission_no})`], ['Class', f.class_label], ['For', f.title], ['Amount', money(f.amount)], ['Paid on', fmtDate(f.paid_on, true)], ['Mode', f.mode]].map(([k, v]) => (
          <tr key={k}><td className="muted" style={{ width: 160 }}>{k}</td><td><b style={{ fontWeight: 600 }}>{v}</b></td></tr>))}
      </tbody></table>
      <small className="muted">Computer-generated receipt.</small>
    </Modal>
  );
}

function PayModal({ f, onClose }) {
  const [mode, setMode] = useState('Cash');
  const [paid, setPaid] = useState(today());
  const [ref, setRef] = useState('');
  return (
    <Modal title={`Record payment · ${money(f.amount)}`} kicker={`${f.student} · ${f.title}`} onClose={() => onClose(false)}
      footer={<><Btn kind="line" onClick={() => onClose(false)}>Cancel</Btn><Btn kind="primary" onClick={() => api.put(`/api/fees/${f.id}`, { ...f, status: 'paid', paid_on: paid, mode, receipt_no: ref })
        .then(() => { toast('Payment recorded.'); onClose(true); }).catch((e) => toast(e.message, true))}>Mark as paid</Btn></>}>
      <div className="pt-form">
        <label className="pt-field"><span>Paid on</span><input className="pt-input" type="date" value={paid} onChange={(e) => setPaid(e.target.value)} /></label>
        <label className="pt-field"><span>Mode</span><select className="pt-select" value={mode} onChange={(e) => setMode(e.target.value)}>{['Cash', 'UPI', 'Bank transfer', 'Cheque', 'Card', 'DD'].map((m) => <option key={m}>{m}</option>)}</select></label>
        <label className="pt-field full"><span>Receipt number</span><input className="pt-input" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Leave blank to number automatically" /></label>
      </div>
    </Modal>
  );
}

export default function Fees() {
  const classes = useClasses();
  const [cid, setCid] = useState('');
  const [status, setStatus] = useState('due');
  const [paying, setPaying] = useState(null);
  const [rec, setRec] = useState(null);
  const [n, setN] = useState(0);
  const students = useLoad(cid ? `/api/students?class_id=${cid}` : null);
  const all = useLoad(`/api/fees${cid ? `?class_id=${cid}` : ''}`, [n]);
  const due = (all.data || []).filter((f) => f.status === 'due');
  const overdue = due.filter((f) => f.due_on && f.due_on < today());
  const paid = (all.data || []).filter((f) => f.status === 'paid');
  return (
    <>
      <PageHead kicker="Office" title="Fees" actions={<ClassSelect classes={classes.data} value={cid} onChange={setCid} auto={false} allLabel="All classes" />}>
        Add a fee for one student or a whole class, and record payments as they come in. Families see what is due and their receipts.
      </PageHead>
      <div className="pt-grid" style={{ '--min': '200px' }}>
        <Stat label="Due" value={money(due.reduce((a, f) => a + f.amount, 0))} note={`${due.length} instalments`} tone="feature" />
        <Stat label="Overdue" value={overdue.length} note={money(overdue.reduce((a, f) => a + f.amount, 0))} tone="marigold" />
        <Stat label="Collected" value={money(paid.reduce((a, f) => a + f.amount, 0))} note={`${paid.length} receipts`} />
      </div>
      <Crud key={`${cid}:${status}:${n}`} url={`/api/fees?status=${status}${cid ? `&class_id=${cid}` : ''}`} createUrl="/api/fees" itemUrl={(r) => `/api/fees/${r.id}`}
        title={status === 'due' ? 'Due' : status === 'paid' ? 'Paid' : 'Waived'} tone="dark" noun="fee" createLabel="Add fee"
        headerRight={<Seg value={status} onChange={setStatus} options={[{ value: 'due', label: 'Due' }, { value: 'paid', label: 'Paid' }, { value: 'waived', label: 'Waived' }]} />}
        searchKeys={['student', 'admission_no', 'title', 'receipt_no', 'class_label']}
        defaults={{ target: cid ? 'class' : 'student', class_id: cid, amount: 18400, title: 'Term II instalment' }}
        columns={[
          { label: 'Student', render: (r) => <><b style={{ fontWeight: 600 }}>{r.student}</b><div className="muted">{r.admission_no} · {r.class_label}</div></> },
          { label: 'For', render: (r) => r.title },
          { label: 'Amount', className: 'num', render: (r) => money(r.amount) },
          { label: status === 'paid' ? 'Paid on' : 'Due on', render: (r) => status === 'paid' ? <>{fmtDate(r.paid_on)}<div className="muted">{r.mode} · {r.receipt_no}</div></> : r.due_on ? (r.due_on < today() ? <Tag tone="red">{fmtDate(r.due_on)}</Tag> : fmtDate(r.due_on)) : '—' },
        ]}
        fields={(row, v) => row ? [
          { name: 'title', label: 'For', required: true },
          { name: 'amount', label: 'Amount (₹)', type: 'number', required: true },
          { name: 'due_on', label: 'Due on', type: 'date' },
          { name: 'status', label: 'Status', type: 'select', blank: false, options: [{ value: 'due', label: 'Due' }, { value: 'paid', label: 'Paid' }, { value: 'waived', label: 'Waived' }] },
          { name: 'note', label: 'Note', full: true },
        ] : [
          { name: 'target', label: 'Add for', type: 'select', blank: false, options: [{ value: 'class', label: 'Every student in a class' }, { value: 'student', label: 'One student' }] },
          { name: 'class_id', label: 'Class', type: 'select', options: classOptions(classes.data) },
          ...(v.target === 'student' ? [{ name: 'student_id', label: 'Student', type: 'select', full: true, options: (students.data || []).map((s) => ({ value: String(s.id), label: `${s.name} (${s.admission_no})` })), help: cid ? '' : 'Choose a class at the top of the page to list its students.' }] : []),
          { name: 'title', label: 'For', required: true, placeholder: 'e.g. Term II instalment' },
          { name: 'amount', label: 'Amount (₹)', type: 'number', required: true },
          { name: 'due_on', label: 'Due on', type: 'date' },
          { name: 'note', label: 'Note', full: true },
        ]}
        toForm={(r) => ({ ...r, due_on: r.due_on || '' })}
        fromForm={(v, row) => row ? { ...v, amount: Number(v.amount), due_on: v.due_on || null }
          : { title: v.title, amount: Number(v.amount), due_on: v.due_on || null, note: v.note || '', class_id: v.target === 'class' && v.class_id ? Number(v.class_id) : null, student_id: v.target === 'student' && v.student_id ? Number(v.student_id) : null }}
        onCreated={(r) => { toast(`${r.created} fee${r.created === 1 ? '' : 's'} added.`); setN((x) => x + 1); }}
        rowActions={(r) => r.status === 'due' ? <Btn kind="primary" sm onClick={() => setPaying(r)}>Record payment</Btn> : r.status === 'paid' ? <Btn kind="ghost" sm icon="file" onClick={() => setRec(r)}>Receipt</Btn> : null}
        deleteText={(r) => `Delete the “${r.title}” fee for ${r.student}?`}
        emptyText="Nothing in this list."
      />
      {paying && <PayModal f={paying} onClose={(ch) => { setPaying(null); if (ch) setN((x) => x + 1); }} />}
      {rec && <Receipt f={rec} onClose={() => setRec(null)} />}
    </>
  );
}
