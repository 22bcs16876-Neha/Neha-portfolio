import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { adminService } from '../../services/adminService';
import emailjs from '@emailjs/browser';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowLeft, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { ThemeToggle } from '../../components/common/ThemeToggle';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const [error, setError] = useState(
    new URLSearchParams(location.search).get('session_expired')
      ? 'Your session has expired. Please sign in again.'
      : ''
  );
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

  // Submit Password (Only Password required)
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your master password');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Backend automatically checks password against the admin user
      await login(undefined, password);
      addToast('Welcome back, Admin! Successfully authenticated.');
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
      // Calls backend to generate OTP and get EmailJS parameters
      const data = await adminService.sendOtp();
      setOtpSent(true);
      setCooldown(60); // 60s cooldown for resend
      setExpiresIn(900); // 15 mins

      const serviceId = data.serviceId || 'service_u63zkza';
      const templateId = data.templateId || 'template_ftzgvwc';
      const publicKey = data.publicKey || localStorage.getItem('emailjs_public_key') || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (data.dispatched) {
        setEmailStatusMsg('A 6-digit one-time passcode has been sent to your registered email address.');
        addToast('OTP passcode dispatched to your email inbox.');
      } else if (publicKey) {
        try {
          const templateParams = {
            name: data.name || 'Admin',
            role: data.role || 'Administrator',
            email: data.email,
            passcode: data.passcode,
            time: data.time || '15 minutes',
          };

          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          setEmailStatusMsg('A 6-digit one-time passcode has been sent to your registered email address.');
          addToast('OTP passcode dispatched to your email inbox.');
        } catch (emailErr) {
          console.error('EmailJS direct delivery error:', emailErr);
          setError('EmailJS dispatch failed: ' + (emailErr?.text || emailErr?.message || 'Check EmailJS configuration.'));
        }
      } else {
        setError('EmailJS Public Key is not configured yet. Please log in using Master Password to set your EmailJS Public Key in Admin Settings.');
      }
    } catch (err) {
      console.error('Send OTP failure:', err);
      const msg = err.response?.data?.message || 'Failed to dispatch OTP. Please try again.';
      setError(msg);
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP (Only OTP required)
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

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-main)',
      }}
    >
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <ThemeToggle />
      </div>

      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
        <Link to="/" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '430px',
          padding: '2.25rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              marginBottom: '0.875rem',
            }}
          >
            {authMode === 'password' ? <Lock size={22} /> : <Mail size={22} />}
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Choose your preferred sign-in method
          </p>
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
            marginBottom: '1.5rem',
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

        {/* Global Error Banner */}
        {error && (
          <div
            style={{
              backgroundColor: 'var(--accent-rose-subtle)',
              border: '1px solid var(--accent-rose)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.8125rem',
              color: 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* MODE 1: PASSWORD LOGIN (ONLY PASSWORD INPUT) */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="password" className="form-label">
                Master Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In with Password'}</span>
            </button>
          </form>
        )}

        {/* MODE 2: EMAIL OTP LOGIN (ONLY OTP INPUT) */}
        {authMode === 'otp' && (
          <div>
            {emailStatusMsg && (
              <div
                style={{
                  backgroundColor: 'var(--accent-emerald-subtle, rgba(16, 185, 129, 0.1))',
                  border: '1px solid var(--accent-emerald, #10b981)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem 0.875rem',
                  marginBottom: '1.25rem',
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
                    <label htmlFor="otp" className="form-label" style={{ marginBottom: 0 }}>
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
                    id="otp"
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
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
