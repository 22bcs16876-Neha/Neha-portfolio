import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit2, Trash2, Loader2, ExternalLink } from 'lucide-react';

export const AdminCertifications = () => {
  const { addToast } = useToast();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);

  const initialFormState = {
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: '',
    imageUrl: '',
    displayOrder: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const loadCertifications = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getCertifications();
      setCertifications(data || []);
    } catch (err) {
      addToast('Failed to load certifications', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertifications();
  }, []);

  const handleOpenCreate = () => {
    setCurrentCert(null);
    setFormData({
      ...initialFormState,
      displayOrder: certifications.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setCurrentCert(cert);
    setFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      issueDate: cert.issueDate || '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
      imageUrl: cert.imageUrl || '',
      displayOrder: cert.displayOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (cert) => {
    setCurrentCert(cert);
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
      if (currentCert) {
        await adminService.updateCertification(currentCert.id, formData);
        addToast('Certification updated successfully');
      } else {
        await adminService.createCertification(formData);
        addToast('New certification added');
      }
      setModalOpen(false);
      loadCertifications();
    } catch (err) {
      addToast('Failed to save certification', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentCert) return;
    setSaving(true);
    try {
      await adminService.deleteCertification(currentCert.id);
      addToast('Certification deleted');
      setDeleteModalOpen(false);
      loadCertifications();
    } catch (err) {
      addToast('Failed to delete certification', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Certifications & Industry Credentials
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Manage professional certificates, credential IDs, verification URLs, and issuer metadata.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Certification</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
        </div>
      ) : certifications.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No certifications registered in database yet.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, width: '60px' }}>Order</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Certificate Title</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Issuer</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Issue Date</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>Credential ID</th>
                <th style={{ padding: '0.875rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {cert.displayOrder}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {cert.title}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                    {cert.issuer}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {cert.issueDate}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {cert.credentialId || '—'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(cert)}
                        className="btn-icon"
                        aria-label="Edit certification"
                        title="Edit Certification"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(cert)}
                        className="btn-icon"
                        aria-label="Delete certification"
                        title="Delete Certification"
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
        title={currentCert ? `Edit Certification: ${currentCert.title}` : 'Add New Certification'}
        maxWidth="550px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Certificate Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Oracle Certified Professional: Java SE 17"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Issuing Organization *</label>
            <input
              type="text"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              placeholder="e.g. Oracle / VMware Spring"
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Issue Date</label>
              <input
                type="text"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                placeholder="e.g. 2023"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Credential ID</label>
              <input
                type="text"
                name="credentialId"
                value={formData.credentialId}
                onChange={handleChange}
                placeholder="e.g. OCP-883921"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Credential Verification URL</label>
            <input
              type="url"
              name="credentialUrl"
              value={formData.credentialUrl}
              onChange={handleChange}
              placeholder="https://..."
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
              {saving ? 'Saving...' : currentCert ? 'Update Credential' : 'Save Credential'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Certification Deletion"
        maxWidth="450px"
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to delete certification <strong style={{ color: 'var(--text-primary)' }}>{currentCert?.title}</strong>?
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
