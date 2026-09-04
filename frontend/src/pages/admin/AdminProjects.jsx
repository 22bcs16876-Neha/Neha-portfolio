import React, { useState, useEffect, useRef } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit2, Trash2, ExternalLink, Github, Loader2, Upload, Image as ImageIcon, X } from 'lucide-react';

export const AdminProjects = () => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const initialFormState = {
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    problemSolved: '',
    features: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    isFeatured: false,
    displayOrder: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const projectImageInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file', 'error');
      return;
    }

    setUploadingImage(true);
    try {
      const data = await adminService.uploadFile(file);
      if (data?.url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        addToast('Project screenshot uploaded successfully!');
      }
    } catch (err) {
      addToast('Failed to upload image', 'error');
    } finally {
      setUploadingImage(false);
      if (projectImageInputRef.current) projectImageInputRef.current.value = '';
    }
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getProjects();
      setProjects(data || []);
    } catch (err) {
      addToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setCurrentProject(null);
    setFormData({
      ...initialFormState,
      displayOrder: projects.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      problemSolved: project.problemSolved || '',
      features: project.features || '',
      technologies: project.technologies || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      isFeatured: Boolean(project.isFeatured),
      displayOrder: project.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (project) => {
    setCurrentProject(project);
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
      if (currentProject) {
        await adminService.updateProject(currentProject.id, formData);
        addToast('Project updated successfully');
      } else {
        await adminService.createProject(formData);
        addToast('New project created successfully');
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save project';
      addToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentProject) return;
    setSaving(true);
    try {
      await adminService.deleteProject(currentProject.id);
      addToast('Project deleted successfully');
      setDeleteModalOpen(false);
      loadProjects();
    } catch (err) {
      addToast('Failed to delete project', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Projects Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Add, update, reorder, or feature technical projects and architectural case studies.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : projects.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No projects registered in database yet.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, width: '60px' }}>Order</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Project Title</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Technologies</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {p.displayOrder}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      slug: {p.slug}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    {p.isFeatured ? (
                      <span className="badge badge-blue">Featured</span>
                    ) : (
                      <span className="badge">Standard</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '280px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {p.technologies}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="btn-icon"
                        aria-label="Edit project"
                        title="Edit Project"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(p)}
                        className="btn-icon"
                        aria-label="Delete project"
                        title="Delete Project"
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

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentProject ? `Edit Project: ${currentProject.title}` : 'Add New Project'}
        maxWidth="750px"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Custom Slug (optional)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="auto-generated-if-blank"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Short Summary (Displayed on Card) *</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '70px' }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Problem Solved</label>
            <textarea
              name="problemSolved"
              value={formData.problemSolved}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '80px' }}
              placeholder="What core architectural or business challenge did this solve?"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Architecture & Technical Highlights</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '100px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Key Features (One feature per line)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '90px' }}
              placeholder="Stateless JWT authentication&#10;Dynamic department hierarchy&#10;ACID-compliant transactions"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies (Comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="Java, Spring Boot, React, MySQL, Docker"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Project Thumbnail / Architecture Diagram</span>
              {formData.imageUrl && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>Image Selected</span>
              )}
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              {formData.imageUrl && (
                <div style={{ width: '56px', height: '38px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                  <img src={formData.imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <input
                ref={projectImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => projectImageInputRef.current?.click()}
                disabled={uploadingImage}
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', padding: '0.45rem 0.8rem' }}
              >
                {uploadingImage ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                <span>{uploadingImage ? 'Uploading...' : 'Upload Image from Laptop'}</span>
              </button>
              {formData.imageUrl && (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, imageUrl: '' }))}
                  className="btn btn-ghost"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', padding: '0.35rem 0.6rem', color: 'var(--accent-red)' }}
                >
                  <X size={13} /> Remove
                </button>
              )}
            </div>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="/uploads/... or https://..."
              className="form-input"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
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
          </div>

          <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="isFeatured" style={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
              Mark as Featured Project
            </label>
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
              {saving ? 'Saving...' : currentProject ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Project Deletion"
        maxWidth="450px"
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to delete project <strong style={{ color: 'var(--text-primary)' }}>{currentProject?.title}</strong>? This action is permanent.
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
