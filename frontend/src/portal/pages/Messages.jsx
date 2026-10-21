import React, { useEffect, useRef, useState } from 'react';
import { api, useLoad, useMe } from '../api.js';
import { ClassSelect, useClasses } from '../shared.jsx';
import { Btn, Card, Empty, fmtTime, Icon, Loading, Modal, PageHead, toast } from '../ui.jsx';

/** One thread (parent ↔ school) for a student. Used by staff and families. */
export function Conversation({ studentId, mineIsParent, onSent }) {
  const url = mineIsParent ? '/api/messages' : `/api/messages?student_id=${studentId}`;
  const t = useLoad(url);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const end = useRef();
  useEffect(() => { end.current && end.current.scrollIntoView({ block: 'end' }); }, [t.data]);
  useEffect(() => { const x = setInterval(() => t.reload(), 30000); return () => clearInterval(x); }, [url]);
  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    api.post('/api/messages', { student_id: studentId, body: text })
      .then((m) => { setText(''); t.setData((d) => ({ ...d, messages: [...d.messages, m] })); onSent && onSent(); })
      .catch((err) => toast(err.message, true)).finally(() => setBusy(false));
  };
  if (t.loading && !t.data) return <Loading />;
  if (!t.data) return null;
  const s = t.data.student;
  return (
    <div className="pt-convo">
      <div className="pt-toolbar" style={{ gap: 6 }}>
        <div><b style={{ fontWeight: 600 }}>{mineIsParent ? (s.class_teacher ? `${s.class_teacher}, class teacher` : 'Class teacher') : `${s.parent_name || 'Parent'} · ${s.name}`}</b>
          <div className="muted" style={{ fontSize: 13, color: 'var(--color-neutral-600)' }}>{s.class_label}</div></div>
      </div>
      <div className="pt-bubbles">
        {t.data.messages.length === 0 && <Empty title="No messages yet">{mineIsParent ? 'Write a short note to the class teacher.' : 'Start the conversation.'}</Empty>}
        {t.data.messages.map((m) => {
          const mine = m.from_parent === !!mineIsParent;
          return <div key={m.id} className={`pt-bubble ${mine ? 'mine' : 'theirs'}`}>{m.body}<small>{mine ? 'You' : m.sender} · {fmtTime(m.created_at)}</small></div>;
        })}
        <div ref={end} />
      </div>
      <form className="pt-compose" onSubmit={send}>
        <input className="pt-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a short note" />
        <Btn kind="primary" icon="send" disabled={busy} onClick={send}>Send</Btn>
      </form>
    </div>
  );
}

function NewThread({ onPick, onClose }) {
  const classes = useClasses();
  const [cid, setCid] = useState('');
  const st = useLoad(cid ? `/api/students?class_id=${cid}` : null);
  return (
    <Modal title="Message a family" kicker="New conversation" onClose={onClose}>
      <ClassSelect classes={classes.data} value={cid} onChange={setCid} />
      <div className="pt-card" style={{ maxHeight: 360, overflowY: 'auto' }}>
        {(st.data || []).map((s) => (
          <button key={s.id} className="pt-thread" onClick={() => onPick(s.id)}><b>{s.name}</b><small>{s.parent_name} · {s.phone}</small></button>
        ))}
      </div>
    </Modal>
  );
}

export default function Messages() {
  const threads = useLoad('/api/messages/threads');
  const [sel, setSel] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  return (
    <>
      <PageHead kicker="Families" title="Messages" actions={<Btn icon="plus" onClick={() => setNewOpen(true)}>New message</Btn>}>
        Notes from families to the class teacher. Replies appear in the family portal.
      </PageHead>
      <Card>
        <div className="pt-chat">
          <div className="pt-threads">
            {threads.loading && !threads.data ? <Loading /> : !(threads.data || []).length ? <Empty title="No messages yet" /> :
              threads.data.map((t) => (
                <button key={t.student_id} className={`pt-thread ${sel === t.student_id ? 'on' : ''}`} onClick={() => setSel(t.student_id)}>
                  <b><span>{t.student} <span style={{ fontWeight: 400, color: 'var(--color-neutral-600)', fontSize: 12.5 }}>{t.class_label}</span></span>{t.unread > 0 && <span className="pt-badge">{t.unread}</span>}</b>
                  <small>{t.last.from_parent ? '' : 'You: '}{t.last.body}</small>
                  <small>{fmtTime(t.last.created_at)}</small>
                </button>
              ))}
          </div>
          {sel ? <Conversation key={sel} studentId={sel} onSent={threads.reload} /> : (
            <div style={{ display: 'grid', placeItems: 'center', padding: 40, color: 'var(--color-neutral-600)', textAlign: 'center' }}>
              <div><Icon name="chat" size={40} stroke={1.4} /><p style={{ marginTop: 10 }}>Choose a conversation on the left.</p></div>
            </div>
          )}
        </div>
      </Card>
      {newOpen && <NewThread onClose={() => setNewOpen(false)} onPick={(id) => { setNewOpen(false); setSel(id); }} />}
    </>
  );
}
