import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

export const AdminEducation = () => {
  const { addToast } = useToast();
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);

  const initialFormState = {
    degree: '',
    institution: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    gradeOrCgpa: '',
    description: '',
    displayOrder: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const loadEducations = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getEducation();
      setEducations(data || []);
    } catch (err) {
      addToast('Failed to load education records', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleOpenCreate = () => {
    setCurrentEdu(null);
    setFormData({
      ...initialFormState,
      displayOrder: educations.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setCurrentEdu(edu);
    setFormData({
      degree: edu.degree || '',
      institution: edu.institution || '',
      fieldOfStudy: edu.fieldOfStudy || '',
      startYear: edu.startYear || '',
      endYear: edu.endYear || '',
      gradeOrCgpa: edu.gradeOrCgpa || '',
      description: edu.description || '',
      displayOrder: edu.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (edu) => {
    setCurrentEdu(edu);
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
      if (currentEdu) {
        await adminService.updateEducation(currentEdu.id, formData);
        addToast('Education record updated');
      } else {
        await adminService.createEducation(formData);
        addToast('New education record created');
      }
      setModalOpen(false);
      loadEducations();
    } catch (err) {
      addToast('Failed to save education record', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentEdu) return;
    setSaving(true);
    try {
      await adminService.deleteEducation(currentEdu.id);
      addToast('Education record deleted');
      setDeleteModalOpen(false);
      loadEducations();
    } catch (err) {
      addToast('Failed to delete education record', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Education & Degrees
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Manage formal degrees, coursework, universities, and academic metrics.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Education Record</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : educations.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No education entries registered in database yet.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, width: '60px' }}>Order</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Degree & Institution</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Duration</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Grade / CGPA</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu) => (
                <tr key={edu.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {edu.displayOrder}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{edu.degree}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {edu.institution} {edu.fieldOfStudy ? `• ${edu.fieldOfStudy}` : ''}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {edu.startYear} – {edu.endYear}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-green">{edu.gradeOrCgpa || 'N/A'}</span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(edu)}
                        className="btn-icon"
                        aria-label="Edit education"
                        title="Edit Record"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(edu)}
                        className="btn-icon"
                        aria-label="Delete education"
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
        title={currentEdu ? `Edit Degree: ${currentEdu.degree}` : 'Add Education Record'}
        maxWidth="600px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Degree Title *</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="e.g. Bachelor of Technology (B.Tech)"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Institution / University *</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. National Institute of Technology"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              placeholder="e.g. Computer Science & Engineering"
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Start Year</label>
              <input
                type="text"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                placeholder="2018"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Year</label>
              <input
                type="text"
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                placeholder="2022"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Grade / CGPA</label>
              <input
                type="text"
                name="gradeOrCgpa"
                value={formData.gradeOrCgpa}
                onChange={handleChange}
                placeholder="8.6 / 10.0 CGPA"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Coursework & Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '80px' }}
              placeholder="Key subjects, final year project, or academic highlights..."
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
              {saving ? 'Saving...' : currentEdu ? 'Update Record' : 'Save Record'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Education Deletion"
        maxWidth="450px"
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to delete education record for <strong style={{ color: 'var(--text-primary)' }}>{currentEdu?.degree}</strong>?
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
