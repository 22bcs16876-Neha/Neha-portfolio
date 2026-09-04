import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit2, Trash2, Loader2, Trophy } from 'lucide-react';

export const AdminAchievements = () => {
  const { addToast } = useToast();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentAch, setCurrentAch] = useState(null);

  const initialFormState = {
    title: '',
    category: 'HACKATHON',
    eventOrOrg: '',
    achievementDate: '',
    description: '',
    displayOrder: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const categories = ['HACKATHON', 'COMPETITION', 'ACADEMIC', 'OPEN_SOURCE', 'AWARD', 'OTHER'];

  const loadAchievements = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getAchievements();
      setAchievements(data || []);
    } catch (err) {
      addToast('Failed to load achievements', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const handleOpenCreate = () => {
    setCurrentAch(null);
    setFormData({
      ...initialFormState,
      displayOrder: achievements.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ach) => {
    setCurrentAch(ach);
    setFormData({
      title: ach.title || '',
      category: ach.category || 'HACKATHON',
      eventOrOrg: ach.eventOrOrg || '',
      achievementDate: ach.achievementDate || '',
      description: ach.description || '',
      displayOrder: ach.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (ach) => {
    setCurrentAch(ach);
    setDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentAch) {
        await adminService.updateAchievement(currentAch.id, formData);
        addToast('Achievement updated');
      } else {
        await adminService.createAchievement(formData);
        addToast('New achievement recorded');
      }
      setModalOpen(false);
      loadAchievements();
    } catch (err) {
      addToast('Failed to save achievement', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentAch) return;
    setSaving(true);
    try {
      await adminService.deleteAchievement(currentAch.id);
      addToast('Achievement deleted');
      setDeleteModalOpen(false);
      loadAchievements();
    } catch (err) {
      addToast('Failed to delete achievement', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Achievements & Awards
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Record hackathon rankings, algorithmic coding milestones, and open-source contributions.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Achievement</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : achievements.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No achievements registered in database yet.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, width: '60px' }}>Order</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Title</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Event / Organization</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((ach) => (
                <tr key={ach.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {ach.displayOrder}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {ach.title}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge">{ach.category}</span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                    {ach.eventOrOrg || '—'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {ach.achievementDate || '—'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(ach)}
                        className="btn-icon"
                        aria-label="Edit achievement"
                        title="Edit Record"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(ach)}
                        className="btn-icon"
                        aria-label="Delete achievement"
                        title="Delete Record"
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

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentAch ? `Edit Achievement: ${currentAch.title}` : 'Add Achievement'}
        maxWidth="550px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Achievement Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. National Hackathon Runner Up"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Event / Host Organization</label>
              <input
                type="text"
                name="eventOrOrg"
                value={formData.eventOrOrg}
                onChange={handleChange}
                placeholder="e.g. LeetCode / Smart India Hackathon"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date or Year</label>
              <input
                type="text"
                name="achievementDate"
                value={formData.achievementDate}
                onChange={handleChange}
                placeholder="e.g. 2024"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description / Summary</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '80px' }}
              placeholder="Detail what was built, problem solved, or ranking achieved..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Display Order</label>
            <input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
            >
              {saving ? 'Saving...' : currentAch ? 'Update Record' : 'Save Achievement'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        maxWidth="450px"
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to delete achievement <strong style={{ color: 'var(--text-primary)' }}>{currentAch?.title}</strong>?
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
            disabled={saving}
            className="btn btn-danger"
          >
            {saving ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </Modal>
    </div>
  );
};
