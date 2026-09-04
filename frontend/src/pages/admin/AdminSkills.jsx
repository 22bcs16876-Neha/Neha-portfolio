import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { IconRenderer } from '../../components/common/IconRenderer';

export const AdminSkills = () => {
  const { addToast } = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

  const initialFormState = {
    name: '',
    category: 'BACKEND',
    proficiency: 'ADVANCED',
    iconName: 'Code',
    displayOrder: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const categories = ['BACKEND', 'FRONTEND', 'DATABASE', 'DEVOPS', 'PROGRAMMING', 'TOOLS'];
  const proficiencies = ['ADVANCED', 'PROFICIENT', 'FAMILIAR'];

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getSkills();
      setSkills(data || []);
    } catch (err) {
      addToast('Failed to load skills', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleOpenCreate = () => {
    setCurrentSkill(null);
    setFormData({
      ...initialFormState,
      displayOrder: skills.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setCurrentSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'BACKEND',
      proficiency: skill.proficiency || 'PROFICIENT',
      iconName: skill.iconName || 'Code',
      displayOrder: skill.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (skill) => {
    setCurrentSkill(skill);
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
      if (currentSkill) {
        await adminService.updateSkill(currentSkill.id, formData);
        addToast('Skill updated successfully');
      } else {
        await adminService.createSkill(formData);
        addToast('New skill added successfully');
      }
      setModalOpen(false);
      loadSkills();
    } catch (err) {
      addToast('Failed to save skill', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentSkill) return;
    setSaving(true);
    try {
      await adminService.deleteSkill(currentSkill.id);
      addToast('Skill deleted successfully');
      setDeleteModalOpen(false);
      loadSkills();
    } catch (err) {
      addToast('Failed to delete skill', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Technical Skills Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Curate technical competencies by category, proficiency tier, and ordering.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} />
          <span>Add New Skill</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : skills.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No skills registered in database yet.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, width: '60px' }}>Order</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Skill Name</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Proficiency Tier</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Icon Name</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {skill.displayOrder}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <IconRenderer name={skill.iconName} size={15} />
                      <span>{skill.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge">{skill.category}</span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className={`badge ${skill.proficiency === 'ADVANCED' ? 'badge-blue' : skill.proficiency === 'PROFICIENT' ? 'badge-green' : 'badge-amber'}`}>
                      {skill.proficiency}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {skill.iconName || 'Code'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="btn-icon"
                        aria-label="Edit skill"
                        title="Edit Skill"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(skill)}
                        className="btn-icon"
                        aria-label="Delete skill"
                        title="Delete Skill"
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
        title={currentSkill ? `Edit Skill: ${currentSkill.name}` : 'Add New Skill'}
        maxWidth="500px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Skill Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Spring Security"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <input
              type="text"
              list="category-options"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. BACKEND, MOBILE, CLOUD, DATA SCIENCE"
              className="form-input"
              required
            />
            <datalist id="category-options">
              {Array.from(new Set([...categories, ...skills.map((s) => s.category?.toUpperCase()).filter(Boolean)])).map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div className="form-group">
            <label className="form-label">Proficiency Tier</label>
            <select
              name="proficiency"
              value={formData.proficiency}
              onChange={handleChange}
              className="form-select"
            >
              {proficiencies.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Lucide Icon Identifier</label>
            <input
              type="text"
              name="iconName"
              value={formData.iconName}
              onChange={handleChange}
              placeholder="e.g. Server, Database, Code, Cloud, Package"
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
              {saving ? 'Saving...' : currentSkill ? 'Update Skill' : 'Create Skill'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Skill Deletion"
        maxWidth="450px"
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to delete skill <strong style={{ color: 'var(--text-primary)' }}>{currentSkill?.name}</strong>?
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
