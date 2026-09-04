import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Lock, ExternalLink, QrCode, Globe, Copy, Check } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Modal } from './Modal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLoginModal } from './AdminLoginModal';
import { resolveAssetUrl } from '../../utils/assets';

export const Navbar = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const localWifiUrl = 'http://192.168.0.103:5173';

  // Check URL query ?admin_login=true to auto-open modal
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('admin_login') === 'true') {
      if (isAuthenticated) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setAdminModalOpen(true);
      }
    }
  }, [location.search, isAuthenticated, navigate]);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    } else {
      setAdminModalOpen(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(localWifiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          const sections = ['about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'];
          const scrollPosition = window.scrollY + 140;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Focus & In-Depth', href: '#developer-corner' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nameDisplay = profile?.fullName || '';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-subtle)',
          width: '100%',
        }}
      >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            fontSize: '1.125rem',
            letterSpacing: '-0.02em',
          }}
        >
          <img
            src={resolveAssetUrl(profile?.avatarUrl) || '/default-avatar.svg'}
            alt={nameDisplay}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid var(--border-subtle)',
              flexShrink: 0,
            }}
            onError={(e) => {
              e.target.src = '/default-avatar.svg';
            }}
          />
          {nameDisplay ? <span>{nameDisplay}</span> : <span>Portfolio</span>}
          <span className="badge badge-blue nav-role-badge" style={{ fontSize: '0.6875rem', padding: '0.1rem 0.4rem', marginLeft: '0.25rem' }}>
            {profile?.roleBadge || 'Developer'}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  paddingBottom: '0.25rem',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {profile?.resumeUrl && (
            <a
              href={resolveAssetUrl(profile.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm resume-btn"
              style={{ display: 'none' }}
            >
              <FileText size={15} />
              <span>Resume</span>
            </a>
          )}

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="btn-icon"
            aria-label="Scan QR to view on mobile"
            title="Scan QR Code to open on Mobile"
          >
            <QrCode size={16} />
          </button>

          <button
            type="button"
            onClick={handleAdminClick}
            className="btn-icon"
            aria-label="Admin login"
            title={isAuthenticated ? 'Go to Admin Dashboard' : 'Admin Login'}
          >
            <Lock size={16} />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="btn-icon mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-strong)',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-modal)',
            maxHeight: 'calc(100vh - 4rem)',
            overflowY: 'auto',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                padding: '0.75rem 0.5rem',
                borderBottom: '1px solid var(--border-subtle)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{link.label}</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>→</span>
            </a>
          ))}
          {profile?.resumeUrl && (
            <a
              href={resolveAssetUrl(profile.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '0.875rem', minHeight: '44px' }}
            >
              <FileText size={16} />
              <span>View Resume (PDF)</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              handleAdminClick();
            }}
            style={{
              width: '100%',
              marginTop: '0.625rem',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Lock size={15} />
            <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}</span>
          </button>
        </div>
      )}

      {/* Responsive media query styles */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .resume-btn {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 440px) {
          .nav-role-badge {
            display: none !important;
          }
        }
      `}</style>
    </header>
    {/* Spacer to prevent page content from being obscured by fixed navbar */}
    <div style={{ height: '4rem', width: '100%' }} aria-hidden="true" />

    {/* Mobile QR Code Modal (Same Wi-Fi) */}
    <Modal
      isOpen={qrModalOpen}
      onClose={() => setQrModalOpen(false)}
      title="View on Mobile (Same Wi-Fi)"
      maxWidth="460px"
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.15rem' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Make sure your phone is connected to the <strong>same Wi-Fi network</strong> as this laptop, then scan this QR code with your camera.
        </p>

        <div
          style={{
            padding: '0.875rem',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-strong)',
            display: 'inline-block',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <img
            src="/mobile-qr.png"
            alt="Scan QR Code for Same Wi-Fi Mobile View"
            style={{ width: '210px', height: '210px', display: 'block' }}
          />
        </div>

        {/* Local Wi-Fi Network URL */}
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Globe size={13} /> LOCAL WI-FI NETWORK URL:
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--accent-blue)', backgroundColor: 'var(--accent-blue-subtle)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
              SAME WI-FI
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}
          >
            <input
              type="text"
              readOnly
              value={localWifiUrl}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                padding: '0.6rem 0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--accent-blue)',
                fontWeight: 600,
                width: '100%',
              }}
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: 0,
                borderLeft: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                flexShrink: 0,
                height: '100%',
                padding: '0 0.85rem',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} color="var(--accent-emerald)" />
                  <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info callout */}
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            backgroundColor: 'var(--bg-subtle)',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            width: '100%',
            textAlign: 'left',
          }}
        >
          📶 <strong>Wi-Fi Requirement:</strong> Both your computer and phone must be on the same Wi-Fi router (192.168.0.x).
        </div>
      </div>
    </Modal>

    {/* Admin Login Popup Modal */}
    <AdminLoginModal
      isOpen={adminModalOpen}
      onClose={() => {
        setAdminModalOpen(false);
        if (location.search.includes('admin_login')) {
          navigate(location.pathname, { replace: true });
        }
      }}
    />
  </>
  );
};
