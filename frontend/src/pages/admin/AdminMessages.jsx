import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Mail, Trash2, Eye, CheckCircle2, Archive, Loader2 } from 'lucide-react';

export const AdminMessages = () => {
  const { addToast } = useToast();
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await adminService.getMessages(filter === 'ALL' ? '' : filter);
      setMessages(data || []);
    } catch (err) {
      addToast('Failed to load contact messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [filter]);

  const handleOpenView = async (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'UNREAD') {
      try {
        await adminService.updateMessageStatus(msg.id, 'READ');
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, status: 'READ' } : m))
        );
      } catch (err) {
        console.error('Failed to update message status', err);
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await adminService.updateMessageStatus(id, newStatus);
      addToast(`Message marked as ${newStatus.toLowerCase()}`);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      addToast('Failed to update message status', 'error');
    }
  };

  const handleOpenDelete = (msg) => {
    setMessageToDelete(msg);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    try {
      await adminService.deleteMessage(messageToDelete.id);
      addToast('Message deleted successfully');
      setDeleteModalOpen(false);
      if (selectedMessage && selectedMessage.id === messageToDelete.id) {
        setSelectedMessage(null);
      }
      loadMessages();
    } catch (err) {
      addToast('Failed to delete message', 'error');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    const d = new Date(isoString);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Contact Inquiries & Messages
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Review inquiries submitted via the public contact form, mark statuses, or archive messages.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['ALL', 'UNREAD', 'READ', 'ARCHIVED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`btn btn-sm ${filter === st ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : messages.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No messages found in this category.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Sender</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Subject</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Received At</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: msg.status === 'UNREAD' ? 'var(--bg-subtle)' : 'transparent' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      className={`badge ${msg.status === 'UNREAD' ? 'badge-blue' : msg.status === 'ARCHIVED' ? '' : 'badge-green'}`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: msg.status === 'UNREAD' ? 700 : 500, color: 'var(--text-primary)' }}>
                      {msg.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {msg.email}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '300px' }}>
                    <div style={{ fontWeight: msg.status === 'UNREAD' ? 600 : 400, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.subject}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {formatDate(msg.createdAt)}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenView(msg)}
                        className="btn-icon"
                        aria-label="View message"
                        title="View Full Message"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(msg)}
                        className="btn-icon"
                        aria-label="Delete message"
                        title="Delete Message"
                        style={{ color: 'var(--accent-rose)' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Inspection Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage?.subject || 'Message Details'}
        maxWidth="600px"
      >
        {selectedMessage && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>{selectedMessage.name}</div>
                <a href={`mailto:${selectedMessage.email}`} style={{ fontSize: '0.875rem', color: 'var(--accent-blue)' }}>
                  {selectedMessage.email}
                </a>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${selectedMessage.status === 'UNREAD' ? 'badge-blue' : ''}`}>
                  {selectedMessage.status}
                </span>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {formatDate(selectedMessage.createdAt)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Message Content:
              </div>
              <div
                className="card"
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-subtle)',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                }}
              >
                {selectedMessage.message}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {selectedMessage.status !== 'ARCHIVED' ? (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'ARCHIVED')}
                    className="btn btn-secondary btn-sm"
                  >
                    <Archive size={14} />
                    <span>Archive Message</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'READ')}
                    className="btn btn-secondary btn-sm"
                  >
                    <CheckCircle2 size={14} />
                    <span>Move to Read</span>
                  </button>
                )}
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="btn btn-primary btn-sm"
                >
                  <Mail size={14} />
                  <span>Reply via Email</span>
                </a>
              </div>

              <button
                onClick={() => handleOpenDelete(selectedMessage)}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--accent-rose)' }}
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Message Deletion"
        maxWidth="450px"
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to permanently delete message from <strong style={{ color: 'var(--text-primary)' }}>{messageToDelete?.name}</strong>?
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setDeleteModalOpen(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Confirm Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};
