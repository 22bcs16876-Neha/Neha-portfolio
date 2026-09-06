import React, { useState, useEffect, useRef } from 'react';
import { portfolioService } from '../../services/portfolioService';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { updateTabBranding } from '../../utils/favicon';
import { resolveAssetUrl, compressImage, readFileAsDataUrl } from '../../utils/assets';
import { Save, Loader2, Image as ImageIcon, Sparkles, Upload, Check, X, FileText, Sun, Moon } from 'lucide-react';

export const AdminProfile = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    tagline: '',
    roleBadge: '',
    statusText: '',
    heroTechStack: '',
    bio: '',
    shortAbout: '',
    fullAbout: '',
    email: '',
    phone: '',
    location: '',
    avatarUrl: '',
    resumeUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    leetcodeUrl: '',
    yearsOfExperience: 0,
    projectsCount: 0,
    problemsSolvedCount: 0,
    technologiesCount: 0,
    stat1Label: '',
    stat1Value: '',
    stat2Label: '',
    stat2Value: '',
    stat3Label: '',
    stat3Value: '',
    stat4Label: '',
    stat4Value: '',
    defaultTheme: 'dark',

    // Hero Quote & Triad Focus Cards
    heroQuote: '',
    triad1Title: '',
    triad1Spec: '',
    triad1Desc: '',
    triad2Title: '',
    triad2Spec: '',
    triad2Desc: '',
    triad3Title: '',
    triad3Spec: '',
    triad3Desc: '',

    // Developer's Corner In-Focus Spotlight & Metrics
    inFocusTitle: '',
    inFocusDescription: '',
    inFocusMetric1Value: '',
    inFocusMetric1Label: '',
    inFocusMetric2Value: '',
    inFocusMetric2Label: '',
    inFocusMetric3Value: '',
    inFocusMetric3Label: '',
    devCornerCapabilities: '',

    // About Principles & Location
    engineeringPrinciples: '',
    aboutLocationLine: '',

    // Footer Banner
    footerHeading: '',
    footerSubheading: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const avatarInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await portfolioService.getProfile();
        if (data) {
          updateTabBranding(data);
          setFormData({
            fullName: data.fullName || '',
            title: data.title || '',
            tagline: data.tagline || '',
            roleBadge: data.roleBadge || '',
            statusText: data.statusText || '',
            heroTechStack: data.heroTechStack || '',
            bio: data.bio || '',
            shortAbout: data.shortAbout || '',
            fullAbout: data.fullAbout || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            avatarUrl: data.avatarUrl || '',
            resumeUrl: data.resumeUrl || '',
            githubUrl: data.githubUrl || '',
            linkedinUrl: data.linkedinUrl || '',
            leetcodeUrl: data.leetcodeUrl || '',
            yearsOfExperience: data.yearsOfExperience ?? 0,
            projectsCount: data.projectsCount ?? 0,
            problemsSolvedCount: data.problemsSolvedCount ?? 0,
            technologiesCount: data.technologiesCount ?? 0,
            stat1Label: data.stat1Label || '',
            stat1Value: data.stat1Value || '',
            stat2Label: data.stat2Label || '',
            stat2Value: data.stat2Value || '',
            stat3Label: data.stat3Label || '',
            stat3Value: data.stat3Value || '',
            stat4Label: data.stat4Label || '',
            stat4Value: data.stat4Value || '',
            defaultTheme: data.defaultTheme || 'dark',

            heroQuote: data.heroQuote || '',
            triad1Title: data.triad1Title || '',
            triad1Spec: data.triad1Spec || '',
            triad1Desc: data.triad1Desc || '',
            triad2Title: data.triad2Title || '',
            triad2Spec: data.triad2Spec || '',
            triad2Desc: data.triad2Desc || '',
            triad3Title: data.triad3Title || '',
            triad3Spec: data.triad3Spec || '',
            triad3Desc: data.triad3Desc || '',

            inFocusTitle: data.inFocusTitle || '',
            inFocusDescription: data.inFocusDescription || '',
            inFocusMetric1Value: data.inFocusMetric1Value || '',
            inFocusMetric1Label: data.inFocusMetric1Label || '',
            inFocusMetric2Value: data.inFocusMetric2Value || '',
            inFocusMetric2Label: data.inFocusMetric2Label || '',
            inFocusMetric3Value: data.inFocusMetric3Value || '',
            inFocusMetric3Label: data.inFocusMetric3Label || '',
            devCornerCapabilities: data.devCornerCapabilities || '',

            engineeringPrinciples: data.engineeringPrinciples || '',
            aboutLocationLine: data.aboutLocationLine || '',

            footerHeading: data.footerHeading || '',
            footerSubheading: data.footerSubheading || '',
          });
        }
      } catch (err) {
        addToast('Failed to load profile data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [addToast]);

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate client-side
    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (JPG, PNG, WebP, SVG)', 'error');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      addToast('Image size exceeds 20MB limit', 'error');
      return;
    }

    setUploadingAvatar(true);
    try {
      // 1. Process image in-browser to compact high-quality data URL (instant local preview & persistent storage)
      const compressedDataUrl = await compressImage(file, 500, 0.88);
      const updatedData = { ...formData, avatarUrl: compressedDataUrl };
      setFormData(updatedData);

      // 2. Immediately persist to backend database if required fields are present
      if (formData.fullName?.trim() && formData.title?.trim()) {
        try {
          await adminService.updateProfile(updatedData);
          updateTabBranding(updatedData);
          addToast('Profile picture uploaded and saved successfully!', 'success');
        } catch (saveErr) {
          console.warn('Backend direct save fallback:', saveErr);
          addToast('Photo loaded into preview. Click "Save Photo Now" to persist.');
        }
      } else {
        addToast('Photo loaded into preview! Enter your Full Name and Title below, then click Save.');
      }
    } catch (err) {
      console.error('Photo processing error:', err);
      addToast('Failed to process image: ' + (err?.message || 'Unknown error'), 'error');
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    const updatedData = { ...formData, avatarUrl: '' };
    setFormData(updatedData);
    updateTabBranding(updatedData);
    try {
      await adminService.updateProfile(updatedData);
      addToast('Profile picture removed and saved.');
    } catch (err) {
      addToast('Picture removed. Click Save at bottom to persist.');
    }
  };

  const handleSavePhotoOnly = async () => {
    if (!formData.fullName?.trim()) {
      addToast('Please enter your Full Name below before saving.', 'error');
      const nameInput = document.querySelector('input[name="fullName"]');
      if (nameInput) nameInput.focus();
      return;
    }
    if (!formData.title?.trim()) {
      addToast('Please enter your Professional Title below before saving.', 'error');
      const titleInput = document.querySelector('input[name="title"]');
      if (titleInput) titleInput.focus();
      return;
    }
    setSaving(true);
    try {
      await adminService.updateProfile(formData);
      updateTabBranding(formData);
      addToast('Profile photo saved successfully!', 'success');
    } catch (err) {
      const validationList = err?.response?.data?.validationErrors 
        ? Object.values(err.response.data.validationErrors).join(', ')
        : null;
      const errMsg = validationList 
        || err?.response?.data?.message 
        || err?.message 
        || 'Unknown error';
      addToast('Failed to save profile photo: ' + errMsg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      addToast('Please select a valid PDF file', 'error');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      addToast('Resume PDF size exceeds 20MB limit', 'error');
      return;
    }

    setUploadingResume(true);
    try {
      // 1. Convert PDF to Base64 Data URL for direct, permanent MySQL database storage
      const dataUrl = await readFileAsDataUrl(file);
      const updatedData = { ...formData, resumeUrl: dataUrl };
      setFormData(updatedData);

      // 2. Persist directly to backend MySQL database immediately
      try {
        await adminService.updateProfile(updatedData);
        addToast('Resume PDF stored directly in database successfully!', 'success');
      } catch (saveErr) {
        console.warn('Direct database save fallback:', saveErr);
        // Fallback: try multipart upload endpoint if direct DB payload is rejected
        try {
          const uploadRes = await adminService.uploadFile(file);
          if (uploadRes?.url) {
            const fallbackData = { ...formData, resumeUrl: uploadRes.url };
            setFormData(fallbackData);
            await adminService.updateProfile(fallbackData);
            addToast('Resume PDF uploaded and linked successfully!', 'success');
          }
        } catch (uploadErr) {
          addToast('Resume loaded into preview. Click "Save Resume to Database" or Save below.', 'info');
        }
      }
    } catch (err) {
      console.error('Resume processing error:', err);
      addToast('Failed to process resume PDF: ' + (err?.message || 'Unknown error'), 'error');
    } finally {
      setUploadingResume(false);
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    }
  };

  const handleSaveResumeOnly = async () => {
    if (!formData.resumeUrl) {
      addToast('No resume link or document to save', 'error');
      return;
    }
    if (!formData.fullName?.trim()) {
      addToast('Please enter your Full Name below before saving.', 'error');
      const nameInput = document.querySelector('input[name="fullName"]');
      if (nameInput) nameInput.focus();
      return;
    }
    if (!formData.title?.trim()) {
      addToast('Please enter your Professional Title below before saving.', 'error');
      const titleInput = document.querySelector('input[name="title"]');
      if (titleInput) titleInput.focus();
      return;
    }
    setUploadingResume(true);
    try {
      await adminService.updateProfile(formData);
      addToast('Resume saved to database successfully!', 'success');
    } catch (err) {
      const validationList = err?.response?.data?.validationErrors 
        ? Object.values(err.response.data.validationErrors).join(', ')
        : null;
      const errMsg = validationList 
        || err?.response?.data?.message 
        || err?.message 
        || 'Error';
      addToast('Failed to save resume: ' + errMsg, 'error');
    } finally {
      setUploadingResume(false);
    }
  };

  // Keep browser tab title and favicon updated in real-time
  useEffect(() => {
    if (formData.fullName || formData.avatarUrl || formData.title) {
      updateTabBranding(formData);
    }
  }, [formData.fullName, formData.title, formData.avatarUrl]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const nextVal = type === 'number' ? (value === '' ? '' : parseInt(value, 10)) : value;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: nextVal,
      };
      if (name === 'fullName' || name === 'title' || name === 'avatarUrl') {
        updateTabBranding(updated);
      }
      return updated;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName?.trim()) {
      addToast('Full Name is required', 'error');
      const nameInput = document.querySelector('input[name="fullName"]');
      if (nameInput) nameInput.focus();
      return;
    }
    if (!formData.title?.trim()) {
      addToast('Professional Title / Subtitle is required', 'error');
      const titleInput = document.querySelector('input[name="title"]');
      if (titleInput) titleInput.focus();
      return;
    }
    setSaving(true);
    try {
      await adminService.updateProfile(formData);
      updateTabBranding(formData);
      addToast('Profile configuration updated successfully', 'success');
    } catch (err) {
      const validationList = err?.response?.data?.validationErrors 
        ? Object.values(err.response.data.validationErrors).join(', ')
        : null;
      const errMsg = validationList 
        || err?.response?.data?.message 
        || err?.message 
        || 'Error';
      addToast('Failed to save profile changes: ' + errMsg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Profile & Identity Configuration
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Customize your role, name, profile picture, elevator pitch, core stack, and metrics. Fully scalable for any software engineering or tech role.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
        {/* Core Identity & Role Customization */}
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          Role, Name & Profile Picture
        </h3>

        {/* Avatar / Profile Picture with Direct Laptop Upload & Live Preview */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '108px',
              height: '108px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-strong)',
              backgroundColor: 'var(--bg-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {formData.avatarUrl ? (
              <img
                src={resolveAssetUrl(formData.avatarUrl)}
                alt="Profile Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.svg';
                }}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <ImageIcon size={30} color="var(--text-muted)" />
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>No Photo</span>
              </div>
            )}
            {uploadingAvatar && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Loader2 className="animate-spin" size={24} color="#ffffff" />
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: '260px' }}>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Profile Picture (Displayed on Hero, About & Navbar)</span>
              {formData.avatarUrl && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Check size={14} /> Active
                </span>
              )}
            </label>

            {/* Laptop/Mobile File Upload Action */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                onChange={handleAvatarFileChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
              >
                {uploadingAvatar ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Processing & Saving...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Upload Picture from Device</span>
                  </>
                )}
              </button>

              {formData.avatarUrl && (
                <>
                  <button
                    type="button"
                    onClick={handleSavePhotoOnly}
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}
                    title="Explicitly save this photo to the server immediately"
                  >
                    {saving ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                    <span>Save Photo Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="btn btn-ghost"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--accent-rose)' }}
                  >
                    <X size={14} />
                    <span>Remove Picture</span>
                  </button>
                </>
              )}
            </div>

            {/* Direct Image URL or Uploaded path */}
            <input
              type="text"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="Or enter direct URL: /uploads/... or https://..."
              className="form-input"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem', display: 'block' }}>
              Upload directly from your laptop (JPG, PNG, WebP) or paste an external image link.
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Professional Title / Subtitle *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Java Software Developer / Full-Stack Engineer / DevOps Architect"
              className="form-input"
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Role Badge (Pill tag on Navbar & Hero)</label>
            <input
              type="text"
              name="roleBadge"
              value={formData.roleBadge}
              onChange={handleChange}
              placeholder="e.g. Java Developer / Mobile Architect / DevOps"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status Text (Hero availability tag)</label>
            <input
              type="text"
              name="statusText"
              value={formData.statusText}
              onChange={handleChange}
              placeholder="e.g. Open to Opportunities / Available for Hire"
              className="form-input"
            />
          </div>
        </div>

        {/* Portal Default Theme Selection (White & Black Theme) */}
        <div className="form-group" style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-subtle)' }}>
          <label className="form-label" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Portal Default Theme (White & Black Theme)</span>
            <span className="badge badge-blue" style={{ fontSize: '0.6875rem' }}>
              Active Default: {formData.defaultTheme === 'dark' ? 'Black Theme (Dark)' : 'White Theme (Light)'}
            </span>
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, defaultTheme: 'light' }))}
              className={`btn btn-sm ${formData.defaultTheme !== 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
            >
              <Sun size={15} />
              <span>White Theme (Light)</span>
              {formData.defaultTheme !== 'dark' && <Check size={14} />}
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, defaultTheme: 'dark' }))}
              className={`btn btn-sm ${formData.defaultTheme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
            >
              <Moon size={15} />
              <span>Black Theme (Dark)</span>
              {formData.defaultTheme === 'dark' && <Check size={14} />}
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Specifies the default visual theme (White or Black) presented to new visitors when loading the public portal.
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Tagline (One-line descriptor)</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="e.g. Engineering resilient backend systems, scalable microservices, and clean web architectures."
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Core Tech Stack (Comma-separated list displayed in Hero footer)</label>
          <input
            type="text"
            name="heroTechStack"
            value={formData.heroTechStack}
            onChange={handleChange}
            placeholder="e.g. Java 21, Spring Boot 3, MySQL, Docker, React"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hero Introduction (Elevator Pitch)</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-textarea"
            style={{ minHeight: '80px' }}
            placeholder="A concise 2-3 sentence overview communicating who you are and what systems you build."
          />
        </div>

        {/* Hero Editorial Quote */}
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Hero Editorial Statement / Quote</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Displays with large quotation mark</span>
          </label>
          <textarea
            name="heroQuote"
            value={formData.heroQuote}
            onChange={handleChange}
            className="form-textarea"
            style={{ minHeight: '85px', fontFamily: 'var(--font-serif)', fontSize: '0.9375rem' }}
            placeholder="e.g. Dependable software is built on predictability, clean abstractions, and defensive engineering. Today, the most valuable systems are not the most complex — they are the most reliable."
          />
        </div>

        {/* Hero Triad Architecture Focus Cards */}
        <div style={{ marginTop: '1.75rem', marginBottom: '1.5rem', padding: '1.25rem', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
            Hero 3-Triad Architecture Focus Cards
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            The three highlight capability cards displayed directly beneath your Hero statement.
          </p>

          {/* Triad 1 */}
          <div className="card" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: 'var(--bg-surface)' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: 600, textTransform: 'uppercase' }}>Focus Card 1</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Title</label>
                <input
                  type="text"
                  name="triad1Title"
                  value={formData.triad1Title}
                  onChange={handleChange}
                  placeholder="e.g. Backend & Microservices"
                  className="form-input"
                  style={{ fontSize: '0.8125rem' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Tech Specification / Subtitle</label>
                <input
                  type="text"
                  name="triad1Spec"
                  value={formData.triad1Spec}
                  onChange={handleChange}
                  placeholder="e.g. Java 21 • Spring Boot 3"
                  className="form-input"
                  style={{ fontSize: '0.8125rem' }}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Description</label>
              <textarea
                name="triad1Desc"
                value={formData.triad1Desc}
                onChange={handleChange}
                placeholder="Brief summary of your competencies in this area."
                className="form-textarea"
                style={{ minHeight: '60px', fontSize: '0.8125rem' }}
              />
            </div>
          </div>

          {/* Triad 2 */}
          <div className="card" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: 'var(--bg-surface)' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 600, textTransform: 'uppercase' }}>Focus Card 2</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Title</label>
                <input
                  type="text"
                  name="triad2Title"
                  value={formData.triad2Title}
                  onChange={handleChange}
                  placeholder="e.g. Data Systems & Modeling"
                  className="form-input"
                  style={{ fontSize: '0.8125rem' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Tech Specification / Subtitle</label>
                <input
                  type="text"
                  name="triad2Spec"
                  value={formData.triad2Spec}
                  onChange={handleChange}
                  placeholder="e.g. MySQL • PostgreSQL • JPA"
                  className="form-input"
                  style={{ fontSize: '0.8125rem' }}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Description</label>
              <textarea
                name="triad2Desc"
                value={formData.triad2Desc}
                onChange={handleChange}
                placeholder="Brief summary of your competencies in this area."
                className="form-textarea"
                style={{ minHeight: '60px', fontSize: '0.8125rem' }}
              />
            </div>
          </div>

          {/* Triad 3 */}
          <div className="card" style={{ padding: '1rem', marginBottom: 0, backgroundColor: 'var(--bg-surface)' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', fontWeight: 600, textTransform: 'uppercase' }}>Focus Card 3</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Title</label>
                <input
                  type="text"
                  name="triad3Title"
                  value={formData.triad3Title}
                  onChange={handleChange}
                  placeholder="e.g. Production Orchestration"
                  className="form-input"
                  style={{ fontSize: '0.8125rem' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Tech Specification / Subtitle</label>
                <input
                  type="text"
                  name="triad3Spec"
                  value={formData.triad3Spec}
                  onChange={handleChange}
                  placeholder="e.g. Docker • Linux • Compose"
                  className="form-input"
                  style={{ fontSize: '0.8125rem' }}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Description</label>
              <textarea
                name="triad3Desc"
                value={formData.triad3Desc}
                onChange={handleChange}
                placeholder="Brief summary of your competencies in this area."
                className="form-textarea"
                style={{ minHeight: '60px', fontSize: '0.8125rem' }}
              />
            </div>
          </div>
        </div>

        {/* Narrative About */}
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '2rem 0 1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          About Section Narratives
        </h3>

        <div className="form-group">
          <label className="form-label">Short Philosophy (First Paragraph)</label>
          <textarea
            name="shortAbout"
            value={formData.shortAbout}
            onChange={handleChange}
            className="form-textarea"
            style={{ minHeight: '90px' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Detailed Engineering Background (Second Paragraph)</label>
          <textarea
            name="fullAbout"
            value={formData.fullAbout}
            onChange={handleChange}
            className="form-textarea"
            style={{ minHeight: '120px' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location, Ecosystem & Community Focus (Third Paragraph)</label>
          <textarea
            name="aboutLocationLine"
            value={formData.aboutLocationLine}
            onChange={handleChange}
            placeholder="e.g. Based in Delhi NCR, India — actively architecting and scaling production systems across global and domestic engineering ecosystems."
            className="form-textarea"
            style={{ minHeight: '80px' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Engineering Principles (4 Tenets)</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Format: Title | Description (one per line)</span>
          </label>
          <textarea
            name="engineeringPrinciples"
            value={formData.engineeringPrinciples}
            onChange={handleChange}
            placeholder={`Readable over clever | Code is read ten times more often than it is written. I write straightforward code that is easy to debug.\nDatabase-first mindset | Most system performance bottlenecks start with poor indexing or schema design. I model transactions and constraints early.\nDefensive by default | Assume network calls fail, timeouts happen, and inputs can be messy. Handle errors gracefully before users see them.\nEnd-to-end empathy | Even when working deep in the backend, I build APIs with full empathy for frontend clients and the end user experience.`}
            className="form-textarea"
            style={{ minHeight: '140px', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
          />
        </div>

        {/* Scalable Dynamic Metrics (Any Role Can Define Their Own Metric Labels & Values) */}
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '2rem 0 0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          Customizable Quick Facts (4 Metrics)
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Adaptable for any technical role (e.g., Years Experience, Projects, Uptime SLA, Models Deployed, Clients Served).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label">Metric 1 Label</label>
              <input
                type="text"
                name="stat1Label"
                value={formData.stat1Label}
                onChange={handleChange}
                placeholder="e.g. Years Experience"
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Metric 1 Value</label>
              <input
                type="text"
                name="stat1Value"
                value={formData.stat1Value}
                onChange={handleChange}
                placeholder="e.g. 4+"
                className="form-input"
              />
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label">Metric 2 Label</label>
              <input
                type="text"
                name="stat2Label"
                value={formData.stat2Label}
                onChange={handleChange}
                placeholder="e.g. Projects Delivered"
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Metric 2 Value</label>
              <input
                type="text"
                name="stat2Value"
                value={formData.stat2Value}
                onChange={handleChange}
                placeholder="e.g. 14+"
                className="form-input"
              />
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label">Metric 3 Label</label>
              <input
                type="text"
                name="stat3Label"
                value={formData.stat3Label}
                onChange={handleChange}
                placeholder="e.g. Algorithmic Problems"
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Metric 3 Value</label>
              <input
                type="text"
                name="stat3Value"
                value={formData.stat3Value}
                onChange={handleChange}
                placeholder="e.g. 520+"
                className="form-input"
              />
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label">Metric 4 Label</label>
              <input
                type="text"
                name="stat4Label"
                value={formData.stat4Label}
                onChange={handleChange}
                placeholder="e.g. Technologies Mastered"
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Metric 4 Value</label>
              <input
                type="text"
                name="stat4Value"
                value={formData.stat4Value}
                onChange={handleChange}
                placeholder="e.g. 24+"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Developer's Corner & Architecture In-Focus Spotlight */}
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '2.5rem 0 0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          Developer's Corner & In-Focus Architecture Spotlight
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Control the prominent architectural deep-dive showcase, system performance SLAs, and technical competency cards.
        </p>

        <div className="form-group">
          <label className="form-label">Architecture In-Focus Spotlight Title</label>
          <input
            type="text"
            name="inFocusTitle"
            value={formData.inFocusTitle}
            onChange={handleChange}
            placeholder="e.g. In-Focus Architecture: High-Throughput Microservices & Caching Engine"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Architecture In-Focus Description</label>
          <textarea
            name="inFocusDescription"
            value={formData.inFocusDescription}
            onChange={handleChange}
            placeholder="e.g. Comprehensive architectural deep-dive into high-concurrency microservice design, distributed caching layers with Redis, event-driven streaming, and ACID-compliant transactional persistence."
            className="form-textarea"
            style={{ minHeight: '90px' }}
          />
        </div>

        {/* 3 In-Focus Performance / SLA Metrics */}
        <label className="form-label" style={{ marginTop: '1rem', display: 'block' }}>Spotlight Performance & SLA Targets (3 Badges)</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Metric 1 Label</label>
              <input
                type="text"
                name="inFocusMetric1Label"
                value={formData.inFocusMetric1Label}
                onChange={handleChange}
                placeholder="e.g. Peak Latency Target"
                className="form-input"
                style={{ fontSize: '0.8125rem' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Metric 1 Value</label>
              <input
                type="text"
                name="inFocusMetric1Value"
                value={formData.inFocusMetric1Value}
                onChange={handleChange}
                placeholder="e.g. < 12ms"
                className="form-input"
                style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Metric 2 Label</label>
              <input
                type="text"
                name="inFocusMetric2Label"
                value={formData.inFocusMetric2Label}
                onChange={handleChange}
                placeholder="e.g. SLA Availability"
                className="form-input"
                style={{ fontSize: '0.8125rem' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Metric 2 Value</label>
              <input
                type="text"
                name="inFocusMetric2Value"
                value={formData.inFocusMetric2Value}
                onChange={handleChange}
                placeholder="e.g. 99.98%"
                className="form-input"
                style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Metric 3 Label</label>
              <input
                type="text"
                name="inFocusMetric3Label"
                value={formData.inFocusMetric3Label}
                onChange={handleChange}
                placeholder="e.g. Throughput Ceiling"
                className="form-input"
                style={{ fontSize: '0.8125rem' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Metric 3 Value</label>
              <input
                type="text"
                name="inFocusMetric3Value"
                value={formData.inFocusMetric3Value}
                onChange={handleChange}
                placeholder="e.g. 25K+ req/s"
                className="form-input"
                style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Developer's Corner Core Competencies (6 Cards)</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Format: Title | Spec / Tech Stack | Target Section ID</span>
          </label>
          <textarea
            name="devCornerCapabilities"
            value={formData.devCornerCapabilities}
            onChange={handleChange}
            placeholder={`Microservices & Distributed REST API Architecture | Java 21 • Spring Boot 3 • OpenFeign • Resilience4j | projects\nRelational Schema Modeling & SQL Query Optimization | MySQL • PostgreSQL • Hibernate / JPA • Index Strategies | skills\nStateless Authentication, OAuth2 & Security Hardening | Spring Security 6 • JWT Tokens • RBAC Authorization | skills\nContainerized Deployment & Production Orchestration | Docker • Multi-stage Builds • Compose • Linux Env | projects\nDistributed Caching & Transactional Consistency | Redis • @Transactional Boundaries • Optimistic Locking | skills\nFull-Stack Reactive UI & REST API Integration | React 18 • Responsive Design • Clean State Management | projects`}
            className="form-textarea"
            style={{ minHeight: '160px', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
          />
        </div>

        {/* Contact & External Links */}
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '2rem 0 1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          Contact Channels & External Links
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location (City, Country)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Resume PDF (Downloadable on Hero & Navbar)</span>
              {formData.resumeUrl && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Check size={14} /> Linked
                </span>
              )}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <input
                ref={resumeInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleResumeFileChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                disabled={uploadingResume}
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
              >
                {uploadingResume ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Uploading PDF...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Upload Resume PDF from Computer</span>
                  </>
                )}
              </button>
              {formData.resumeUrl && (
                <a
                  href={resolveAssetUrl(formData.resumeUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}
                >
                  <FileText size={14} />
                  <span>Preview Linked Resume</span>
                </a>
              )}
              {formData.resumeUrl && (
                <button
                  type="button"
                  onClick={handleSaveResumeOnly}
                  disabled={uploadingResume}
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}
                >
                  <Save size={14} />
                  <span>Save Resume to Database</span>
                </button>
              )}
            </div>
            <input
              type="text"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="/uploads/... or /assets/resume.pdf or https://..."
              className="form-input"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.375rem', lineHeight: '1.4' }}>
              Files uploaded directly from your computer are encoded and permanently stored in your MySQL database (never lost on server sleep or restart). You can also paste an external URL.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">GitHub Profile URL</label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LeetCode Profile URL</label>
            <input
              type="url"
              name="leetcodeUrl"
              value={formData.leetcodeUrl}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Footer Collaboration & Engagement Banner */}
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '2.5rem 0 0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          Footer Collaboration & Engagement Banner
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Customize the invitation text displayed in the bottom footer card across the entire website.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Footer Engagement Heading</label>
            <input
              type="text"
              name="footerHeading"
              value={formData.footerHeading}
              onChange={handleChange}
              placeholder="e.g. Let's Build Resilient Systems Together"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Footer Engagement Subtitle</label>
            <input
              type="text"
              name="footerSubheading"
              value={formData.footerSubheading}
              onChange={handleChange}
              placeholder="e.g. Open for technical lead roles, high-scale engineering challenges, and enterprise architectural consultations."
              className="form-input"
            />
          </div>
        </div>

        {/* Sticky floating bottom save action bar */}
        <div
          className="admin-floating-save-bar"
          style={{
            position: 'sticky',
            bottom: '1rem',
            zIndex: 60,
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: '2.5rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <Sparkles size={15} color="var(--accent-blue)" />
            <span>Profile & Bio Settings</span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>

      <style>{`
        @media (max-width: 640px) {
          .admin-floating-save-bar {
            bottom: 0.5rem !important;
            padding: 0.625rem 0.875rem !important;
            border-radius: var(--radius-sm) !important;
          }
        }
      `}</style>
    </div>
  );
};

