import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit2, Trash2, Loader2, ExternalLink } from 'lucide-react';
import { IconRenderer } from '../../components/common/IconRenderer';

export const AdminCodingProfiles = () => {
  const { addToast } = useToast();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentProf, setCurrentProf] = useState(null);

  const initialFormState = {
    platform: 'GitHub',
    username: '',
    profileUrl: '',
    iconName: 'Github',
    displayOrder: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const platforms = ['GitHub', 'LinkedIn', 'LeetCode', 'CodeChef', 'HackerRank', 'GeeksforGeeks', 'Twitter / X', 'Other'];

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getCodingProfiles();
      setProfiles(data || []);
    } catch (err) {
      addToast('Failed to load coding profiles', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const handleOpenCreate = () => {
    setCurrentProf(null);
    setFormData({
      ...initialFormState,
      displayOrder: profiles.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prof) => {
    setCurrentProf(prof);
    setFormData({
      platform: prof.platform || 'GitHub',
      username: prof.username || '',
      profileUrl: prof.profileUrl || '',
      iconName: prof.iconName || 'Code',
      displayOrder: prof.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (prof) => {
    setCurrentProf(prof);
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
      if (currentProf) {
        await adminService.updateCodingProfile(currentProf.id, formData);
        addToast('Profile updated');
      } else {
        await adminService.createCodingProfile(formData);
        addToast('New profile registered');
      }
      setModalOpen(false);
      loadProfiles();
    } catch (err) {
      addToast('Failed to save profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentProf) return;
    setSaving(true);
    try {
      await adminService.deleteCodingProfile(currentProf.id);
      addToast('Profile deleted');
      setDeleteModalOpen(false);
      loadProfiles();
    } catch (err) {
      addToast('Failed to delete profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Coding & Professional Profiles
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Manage external developer profiles (GitHub, LeetCode, CodeChef, HackerRank, LinkedIn).
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Profile Link</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : profiles.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No coding profiles registered in database yet.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, width: '60px' }}>Order</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Platform</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Handle / Username</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Profile URL</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {p.displayOrder}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <IconRenderer name={p.iconName || 'Terminal'} size={16} />
                      <span>{p.platform}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                    @{p.username}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <a
                      href={p.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
                    >
                      <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.profileUrl}
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="btn-icon"
                        aria-label="Edit profile link"
                        title="Edit Link"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(p)}
                        className="btn-icon"
                        aria-label="Delete profile link"
                        title="Delete Link"
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
        title={currentProf ? `Edit Profile: ${currentProf.platform}` : 'Add Coding Profile Link'}
        maxWidth="500px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Platform *</label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g. GitHub, LeetCode, CodeChef"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Handle / Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. username"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Complete Profile URL *</label>
            <input
              type="url"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
              placeholder="https://leetcode.com/u/..."
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lucide Icon Identifier</label>
            <input
              type="text"
              name="iconName"
              value={formData.iconName}
              onChange={handleChange}
              placeholder="e.g. Github, Linkedin, Code, Award, BookOpen"
              className="form-input"
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
              {saving ? 'Saving...' : currentProf ? 'Update Link' : 'Save Link'}
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
          Are you sure you want to delete coding profile link for <strong style={{ color: 'var(--text-primary)' }}>{currentProf?.platform}</strong>?
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
