import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { portfolioService } from '../../services/portfolioService';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  KeyRound, 
  ShieldCheck, 
  AlertCircle, 
  Sun, 
  Moon, 
  Check, 
  Sliders, 
  Mail, 
  Send, 
  Lock, 
  Settings2 
} from 'lucide-react';

export const AdminSettings = () => {
  const { addToast } = useToast();
  const { theme, setExplicitTheme } = useTheme();

  const [currentDefaultTheme, setCurrentDefaultTheme] = useState('light');
  const [updatingTheme, setUpdatingTheme] = useState(false);

  // Admin Account & Email State
  const [accountData, setAccountData] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [updatingEmail, setUpdatingEmail] = useState(false);

  // EmailJS Settings State
  const [emailjsInput, setEmailjsInput] = useState({
    serviceId: 'service_u63zkza',
    templateId: 'template_ftzgvwc',
    publicKey: '',
  });
  const [updatingEmailJs, setUpdatingEmailJs] = useState(false);

  // Password Change State
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = await portfolioService.getProfile();
        if (profile?.defaultTheme) {
          setCurrentDefaultTheme(profile.defaultTheme.toLowerCase());
        }
      } catch (err) {
        console.error('Failed to load profile default theme:', err);
      }

      try {
        const account = await adminService.getAdminAccount();
        if (account) {
          setAccountData(account);
          setEmailInput(account.email || '');
          setEmailjsInput({
            serviceId: account.emailjsServiceId || 'service_u63zkza',
            templateId: account.emailjsTemplateId || 'template_ftzgvwc',
            publicKey: account.emailjsPublicKey || localStorage.getItem('emailjs_public_key') || '',
          });
        }
      } catch (err) {
        console.error('Failed to load admin account data:', err);
      }
    };
    loadData();
  }, []);

  const handleSetDefaultTheme = async (newTheme) => {
    const targetTheme = newTheme.toLowerCase() === 'dark' || newTheme.toLowerCase() === 'black' ? 'dark' : 'light';
    setUpdatingTheme(true);
    try {
      await adminService.updateDefaultTheme(targetTheme);
      setCurrentDefaultTheme(targetTheme);
      setExplicitTheme(targetTheme);
      addToast(
        targetTheme === 'dark'
          ? 'Portal default theme successfully set to Black Theme (Dark)!'
          : 'Portal default theme successfully set to White Theme (Light)!'
      );
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update portal default theme';
      addToast(msg, 'error');
    } finally {
      setUpdatingTheme(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      addToast('Please provide a valid email address', 'error');
      return;
    }

    setUpdatingEmail(true);
    try {
      const updated = await adminService.updateAdminEmail(emailInput.trim());
      setAccountData(updated);
      addToast(`Admin email successfully updated to ${updated.email}! Future OTPs will be delivered here.`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update admin email';
      addToast(msg, 'error');
    } finally {
      setUpdatingEmail(false);
    }
  };

  const handleUpdateEmailJs = async (e) => {
    e.preventDefault();
    setUpdatingEmailJs(true);
    try {
      const updated = await adminService.updateEmailJsConfig(emailjsInput);
      setAccountData(updated);
      if (emailjsInput.publicKey) {
        localStorage.setItem('emailjs_public_key', emailjsInput.publicKey.trim());
      }
      addToast('EmailJS configuration saved successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save EmailJS settings';
      addToast(msg, 'error');
    } finally {
      setUpdatingEmailJs(false);
    }
  };

  const handlePasswordChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formData.newPassword) {
      setError('Please provide a new master password');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await adminService.changePassword({
        newPassword: formData.newPassword,
      });
      addToast('Master password changed successfully');
      setFormData({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '820px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Portal Settings & Credentials
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Configure portal appearance defaults, OTP delivery email, EmailJS credentials, and master access password.
        </p>
      </div>

      {/* SECTION 1: ADMIN OTP EMAIL CONFIGURATION */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="btn-icon" style={{ cursor: 'default' }}>
            <Mail size={18} color="var(--accent-blue)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Admin OTP Email Address</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Specify the secure destination email where one-time login passcodes will be sent.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateEmail}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Registered Admin Email *</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g. your-email@gmail.com"
                className="form-input"
                style={{ flex: 1 }}
                required
              />
              <button
                type="submit"
                disabled={updatingEmail || (accountData && accountData.email === emailInput.trim())}
                className="btn btn-primary"
                style={{ flexShrink: 0 }}
              >
                <span>{updatingEmail ? 'Saving...' : 'Update Email'}</span>
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.375rem' }}>
              Currently active: <strong style={{ color: 'var(--text-primary)' }}>{accountData?.email || '—'}</strong>
            </span>
          </div>
        </form>
      </div>

      {/* SECTION 2: CHANGE MASTER PASSWORD */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="btn-icon" style={{ cursor: 'default' }}>
            <KeyRound size={18} color="var(--accent-blue)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Change Master Password</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Set your master sign-in password. BCrypt encrypted directly in MySQL.
            </p>
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: 'var(--accent-rose-subtle)',
              border: '1px solid var(--accent-rose)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.8125rem',
              color: 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">New Password (min. 6 chars) *</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handlePasswordChange}
                className="form-input"
                placeholder="••••••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
                className="form-input"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
          >
            <span>{loading ? 'Updating Password...' : 'Save New Password'}</span>
          </button>
        </form>
      </div>

      {/* SECTION 3: EMAILJS CREDENTIALS CONFIGURATION */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="btn-icon" style={{ cursor: 'default' }}>
            <Settings2 size={18} color="var(--accent-blue)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>EmailJS Dispatch Configuration</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Enter your EmailJS Service, Template, and Public Key to send verification passcodes directly to your inbox.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateEmailJs}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label className="form-label">EmailJS Service ID</label>
              <input
                type="text"
                value={emailjsInput.serviceId}
                onChange={(e) => setEmailjsInput((prev) => ({ ...prev, serviceId: e.target.value }))}
                className="form-input"
                placeholder="e.g. service_u63zkza"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">EmailJS Template ID</label>
              <input
                type="text"
                value={emailjsInput.templateId}
                onChange={(e) => setEmailjsInput((prev) => ({ ...prev, templateId: e.target.value }))}
                className="form-input"
                placeholder="e.g. template_ftzgvwc"
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">EmailJS Public Key (Account &gt; Public Key)</label>
            <input
              type="text"
              value={emailjsInput.publicKey}
              onChange={(e) => setEmailjsInput((prev) => ({ ...prev, publicKey: e.target.value }))}
              className="form-input"
              placeholder="e.g. user_xxxx or your-public-key"
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.375rem' }}>
              Stored securely in database & local browser context for seamless OTP delivery.
            </span>
          </div>

          <button
            type="submit"
            disabled={updatingEmailJs}
            className="btn btn-primary"
            style={{ opacity: updatingEmailJs ? 0.7 : 1 }}
          >
            <span>{updatingEmailJs ? 'Saving Configuration...' : 'Save EmailJS Settings'}</span>
          </button>
        </form>
      </div>

      {/* SECTION 4: PORTAL DEFAULT THEME */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="btn-icon" style={{ cursor: 'default' }}>
              <Sliders size={18} color="var(--accent-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Portal Default Theme</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Set the default theme (White or Black) that initial visitors experience upon loading your portfolio.
              </p>
            </div>
          </div>

          <span
            className={`badge ${currentDefaultTheme === 'dark' ? 'badge-blue' : 'badge-green'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
          >
            ● Active Default: {currentDefaultTheme === 'dark' ? 'Black Theme (Dark)' : 'White Theme (Light)'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {/* Card 1: White Theme */}
          <div
            onClick={() => !updatingTheme && handleSetDefaultTheme('light')}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: currentDefaultTheme === 'light' ? '2px solid var(--accent-blue)' : '1px solid var(--border-strong)',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              cursor: updatingTheme ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: currentDefaultTheme === 'light' ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', border: '1px solid #cbd5e1' }}>
                    <Sun size={16} />
                  </div>
                  <strong style={{ fontSize: '0.9375rem', color: '#0f172a' }}>White Theme</strong>
                </div>

                {currentDefaultTheme === 'light' && (
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 600, backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.15rem 0.45rem', borderRadius: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Check size={12} /> Active Default
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: '#475569', marginBottom: '1rem' }}>
                Crisp white canvas with dark typography, dignified serif accents, and subtle borders.
              </p>
            </div>

            <button
              type="button"
              disabled={updatingTheme || currentDefaultTheme === 'light'}
              onClick={(e) => {
                e.stopPropagation();
                handleSetDefaultTheme('light');
              }}
              className="btn btn-secondary btn-sm"
              style={{
                marginTop: '1.25rem',
                width: '100%',
                backgroundColor: currentDefaultTheme === 'light' ? '#f1f5f9' : '#0f172a',
                color: currentDefaultTheme === 'light' ? '#64748b' : '#ffffff',
                borderColor: currentDefaultTheme === 'light' ? '#e2e8f0' : '#0f172a',
                fontWeight: 600,
              }}
            >
              {currentDefaultTheme === 'light' ? 'Currently Active' : 'Set Default to White Theme'}
            </button>
          </div>

          {/* Card 2: Black Theme */}
          <div
            onClick={() => !updatingTheme && handleSetDefaultTheme('dark')}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: currentDefaultTheme === 'dark' ? '2px solid #58a6ff' : '1px solid var(--border-strong)',
              backgroundColor: '#0d1117',
              color: '#f0f6fc',
              cursor: updatingTheme ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: currentDefaultTheme === 'dark' ? '0 4px 14px rgba(88, 166, 255, 0.25)' : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#21262d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#58a6ff', border: '1px solid #30363d' }}>
                    <Moon size={16} />
                  </div>
                  <strong style={{ fontSize: '0.9375rem', color: '#f0f6fc' }}>Black Theme</strong>
                </div>

                {currentDefaultTheme === 'dark' && (
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 600, backgroundColor: '#121d2f', color: '#58a6ff', border: '1px solid #1f3b64', padding: '0.15rem 0.45rem', borderRadius: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Check size={12} /> Active Default
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: '#8b949e', marginBottom: '1rem' }}>
                Dignified obsidian black canvas with high-contrast typography. High developer aesthetic.
              </p>
            </div>

            <button
              type="button"
              disabled={updatingTheme || currentDefaultTheme === 'dark'}
              onClick={(e) => {
                e.stopPropagation();
                handleSetDefaultTheme('dark');
              }}
              className="btn btn-secondary btn-sm"
              style={{
                marginTop: '1.25rem',
                width: '100%',
                backgroundColor: currentDefaultTheme === 'dark' ? '#21262d' : '#f0f6fc',
                color: currentDefaultTheme === 'dark' ? '#6e7681' : '#0d1117',
                borderColor: currentDefaultTheme === 'dark' ? '#30363d' : '#f0f6fc',
                fontWeight: 600,
              }}
            >
              {currentDefaultTheme === 'dark' ? 'Currently Active' : 'Set Default to Black Theme'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
