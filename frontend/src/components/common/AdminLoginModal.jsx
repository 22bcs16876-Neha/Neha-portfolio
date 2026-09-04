import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { adminService } from '../../services/adminService';
import emailjs from '@emailjs/browser';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login, loginWithOtp, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // Mode: 'password' | 'otp'
  const [authMode, setAuthMode] = useState('password');

  // Password state - ONLY password input
  const [password, setPassword] = useState('');

  // OTP state - ONLY OTP input
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [expiresIn, setExpiresIn] = useState(900); // 15 minutes
  const [emailStatusMsg, setEmailStatusMsg] = useState(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // If already authenticated, redirect
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      onClose();
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isOpen, isAuthenticated, navigate, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAuthMode('password');
      setError('');
      setPassword('');
      setOtpCode('');
      setOtpSent(false);
      setEmailStatusMsg(null);
    }
  }, [isOpen]);

  // Cooldown timer for resend OTP
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Expiration countdown timer (15 minutes)
  useEffect(() => {
    if (!otpSent || expiresIn <= 0) return;
    const timer = setInterval(() => setExpiresIn((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [otpSent, expiresIn]);

  // Submit Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your master password');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await login(undefined, password);
      addToast('Welcome back, Admin! Successfully authenticated.');
      onClose();
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Password login failure:', err);
      const msg = err.response?.data?.message || 'Invalid master password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Send OTP directly to email
  const handleSendOtp = async () => {
    setSendingOtp(true);
    setError('');
    setEmailStatusMsg(null);

    try {
      const data = await adminService.sendOtp();
      setCooldown(60);
      setExpiresIn(900);

      const serviceId = data.serviceId || 'service_u63zkza';
      const templateId = data.templateId || 'template_ftzgvwc';
      const publicKey = data.publicKey || localStorage.getItem('emailjs_public_key') || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (data.dispatched) {
        setOtpSent(true);
        setEmailStatusMsg('A 6-digit one-time passcode has been sent to your registered email address.');
        addToast('OTP passcode dispatched to your email inbox.');
      } else if (publicKey) {
        try {
          const templateParams = {
            to_email: data.email,
            email: data.email,
            to_name: data.name || 'Admin',
            name: data.name || 'Admin',
            role: data.role || 'Administrator',
            passcode: data.passcode,
            otp: data.passcode,
            time: data.time || '15 minutes',
            message: `Your verification OTP passcode is: ${data.passcode} (valid for 15 minutes)`,
          };
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          setOtpSent(true);
          setEmailStatusMsg('A 6-digit one-time passcode has been sent to your registered email address.');
          addToast('OTP passcode dispatched to your email inbox.');
        } catch (emailErr) {
          console.error('EmailJS direct delivery error:', emailErr);
          setOtpSent(false);
          const rawErr = emailErr?.text || emailErr?.message || 'Check EmailJS configuration.';
          setError(`EmailJS dispatch failed (${rawErr}). EmailJS is not linked to this domain/account yet. Please use Password Sign In to log in directly.`);
        }
      } else {
        setOtpSent(false);
        setError('EmailJS is not configured for this account yet. Please use Password Sign In to log in directly.');
      }
    } catch (err) {
      console.error('Send OTP failure:', err);
      setOtpSent(false);
      const msg = err.response?.data?.message || 'Failed to dispatch OTP. Please use Password Sign In.';
      setError(msg);
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP
  const handleOtpVerifySubmit = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setError('Please enter the 6-digit OTP passcode');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await loginWithOtp(otpCode.trim());
      addToast('Identity verified! Welcome to the Admin Portal.');
      onClose();
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('OTP verification failure:', err);
      const msg = err.response?.data?.message || 'Invalid or expired OTP passcode. Please check your email.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      style={{ zIndex: 9999 }}
    >
      <div
        className="modal-content"
        style={{ 
          maxWidth: '430px', 
          width: '90%', 
          padding: '2rem', 
          borderRadius: 'var(--radius-md)' 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
              }}
            >
              {authMode === 'password' ? <Lock size={18} /> : <Mail size={18} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>
                Admin Sign In
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, marginTop: '2px' }}>
                CMS Management Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.375rem',
            padding: '0.25rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setError('');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.8125rem',
              fontWeight: authMode === 'password' ? 600 : 500,
              borderRadius: 'calc(var(--radius-sm) - 2px)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: authMode === 'password' ? 'var(--bg-card)' : 'transparent',
              color: authMode === 'password' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: authMode === 'password' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <KeyRound size={15} />
            <span>Password</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('otp');
              setError('');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.8125rem',
              fontWeight: authMode === 'otp' ? 600 : 500,
              borderRadius: 'calc(var(--radius-sm) - 2px)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: authMode === 'otp' ? 'var(--bg-card)' : 'transparent',
              color: authMode === 'otp' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: authMode === 'otp' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <Mail size={15} />
            <span>Email OTP</span>
          </button>
        </div>

        {/* Error Banner with One-Click Password Fallback */}
        {error && (
          <div
            style={{
              backgroundColor: 'var(--accent-rose-subtle)',
              border: '1px solid var(--accent-rose)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              fontSize: '0.8125rem',
              color: 'var(--accent-rose)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, lineHeight: 1.4 }}>{error}</div>
                {authMode === 'otp' && (
                  <p style={{ margin: '0.375rem 0 0', fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4 }}>
                    EmailJS is unconfigured on this profile. You can sign in directly using the <strong>Password</strong> tab.
                  </p>
                )}
              </div>
            </div>
            {authMode === 'otp' && (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('password');
                  setError('');
                }}
                style={{
                  marginTop: '0.625rem',
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease',
                }}
              >
                <KeyRound size={14} style={{ color: 'var(--accent-primary)' }} />
                <span>Switch to Password Login</span>
              </button>
            )}
          </div>
        )}

        {/* Tab 1: Password Login */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="modal-password" className="form-label">
                Master Password
              </label>
              <input
                id="modal-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Master Password"
                className="form-input"
                autoComplete="current-password"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>
        )}

        {/* Tab 2: Email OTP Login */}
        {authMode === 'otp' && (
          <div>
            {emailStatusMsg && (
              <div
                style={{
                  backgroundColor: 'var(--accent-emerald-subtle, rgba(16, 185, 129, 0.1))',
                  border: '1px solid var(--accent-emerald, #10b981)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.625rem 0.875rem',
                  marginBottom: '1rem',
                  fontSize: '0.8125rem',
                  color: 'var(--accent-emerald, #10b981)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                }}
              >
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ lineHeight: 1.4 }}>{emailStatusMsg}</span>
              </div>
            )}

            {!otpSent ? (
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5, textAlign: 'center' }}>
                  A 6-digit secure one-time passcode will be delivered directly to your registered admin email address.
                </p>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Mail size={16} />
                  <span>{sendingOtp ? 'Sending Passcode to Email...' : 'Send 6-Digit OTP to Email'}</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleOtpVerifySubmit}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                    <label htmlFor="modal-otp" className="form-label" style={{ marginBottom: 0 }}>
                      Enter 6-Digit Passcode
                    </label>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: expiresIn < 120 ? 'var(--accent-rose)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <Clock size={12} />
                      <span>Expires in {formatTime(expiresIn)}</span>
                    </span>
                  </div>

                  <input
                    id="modal-otp"
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="••••••"
                    className="form-input"
                    style={{
                      fontSize: '1.375rem',
                      letterSpacing: '0.4em',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                    }}
                    autoFocus
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length < 6}
                  className="btn btn-primary"
                  style={{ width: '100%', opacity: loading || otpCode.length < 6 ? 0.7 : 1 }}
                >
                  <ShieldCheck size={16} />
                  <span>{loading ? 'Verifying...' : 'Verify OTP & Enter Dashboard'}</span>
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginTop: '1rem',
                    paddingTop: '0.875rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={cooldown > 0 || sendingOtp}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.75rem', color: cooldown > 0 ? 'var(--text-muted)' : 'var(--accent-primary)' }}
                  >
                    <RefreshCw size={12} className={sendingOtp ? 'spin' : ''} />
                    <span>{cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend new OTP to Email'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('password');
                      setError('');
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}
                  >
                    <KeyRound size={12} />
                    <span>Use Password instead</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
