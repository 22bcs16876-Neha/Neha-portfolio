import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit2, Trash2, Loader2, Calendar } from 'lucide-react';

export const AdminExperience = () => {
  const { addToast } = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);

  const initialFormState = {
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    responsibilities: '',
    technologies: '',
    displayOrder: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const loadExperiences = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getExperience();
      setExperiences(data || []);
    } catch (err) {
      addToast('Failed to load experience entries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleOpenCreate = () => {
    setCurrentExp(null);
    setFormData({
      ...initialFormState,
      displayOrder: experiences.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setCurrentExp(exp);
    setFormData({
      company: exp.company || '',
      role: exp.role || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      isCurrent: Boolean(exp.isCurrent),
      description: exp.description || '',
      responsibilities: exp.responsibilities || '',
      technologies: exp.technologies || '',
      displayOrder: exp.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (exp) => {
    setCurrentExp(exp);
    setDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentExp) {
        await adminService.updateExperience(currentExp.id, formData);
        addToast('Experience updated successfully');
      } else {
        await adminService.createExperience(formData);
        addToast('New experience entry created');
      }
      setModalOpen(false);
      loadExperiences();
    } catch (err) {
      addToast('Failed to save experience entry', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentExp) return;
    setSaving(true);
    try {
      await adminService.deleteExperience(currentExp.id);
      addToast('Experience entry deleted');
      setDeleteModalOpen(false);
      loadExperiences();
    } catch (err) {
      addToast('Failed to delete experience', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Work Experience Timeline
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Manage career engagements, roles, responsibilities, and technical stacks.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Work Experience</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : experiences.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No work experiences registered in database yet.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, width: '60px' }}>Order</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Role & Company</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Duration</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Technologies</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {exp.displayOrder}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{exp.role}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{exp.company} • {exp.location}</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '250px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {exp.technologies}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(exp)}
                        className="btn-icon"
                        aria-label="Edit experience"
                        title="Edit Experience"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(exp)}
                        className="btn-icon"
                        aria-label="Delete experience"
                        title="Delete Experience"
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
        title={currentExp ? `Edit Experience: ${currentExp.role}` : 'Add Work Experience'}
        maxWidth="650px"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Job Role *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Senior Java Backend Engineer"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. TechCorp Solutions"
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bengaluru, India"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="e.g. Jan 2024"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="e.g. Present"
                disabled={formData.isCurrent}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ margin: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="isCurrent"
              name="isCurrent"
              checked={formData.isCurrent}
              onChange={handleChange}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="isCurrent" style={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
              Currently Working Here
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">High-Level Role Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '70px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Key Responsibilities & Deliverables (One per line)</label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '100px' }}
              placeholder="Architected REST APIs using Java 21&#10;Optimized MySQL database queries&#10;Containerized services with Docker"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies (Comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="Java, Spring Boot, MySQL, Docker, Redis"
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
              {saving ? 'Saving...' : currentExp ? 'Update Experience' : 'Save Experience'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Experience Deletion"
        maxWidth="450px"
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to delete experience entry for <strong style={{ color: 'var(--text-primary)' }}>{currentExp?.role} at {currentExp?.company}</strong>?
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
