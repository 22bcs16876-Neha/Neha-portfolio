import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Layers,
  GraduationCap,
  Award,
  Trophy,
  Terminal,
  Mail,
  KeyRound,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
  Sliders,
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { portalDefault } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    addToast('Logged out of admin session');
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Profile & Bio', to: '/admin/profile', icon: User },
    { label: 'Projects', to: '/admin/projects', icon: Layers },
    { label: 'Skills', to: '/admin/skills', icon: Terminal },
    { label: 'Experience', to: '/admin/experience', icon: Briefcase },
    { label: 'Education', to: '/admin/education', icon: GraduationCap },
    { label: 'Certifications', to: '/admin/certifications', icon: Award },
    { label: 'Achievements', to: '/admin/achievements', icon: Trophy },
    { label: 'Coding Profiles', to: '/admin/coding-profiles', icon: Terminal },
    { label: 'Messages Inbox', to: '/admin/messages', icon: Mail },
    { label: 'Portal Settings & Theme', to: '/admin/settings', icon: Sliders },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Sidebar Overlay on mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 90,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transform: sidebarOpen ? 'translateX(0)' : 'none',
          transition: 'transform var(--transition-fast)',
        }}
        className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
      >
        {/* Top brand */}
        <div
          style={{
            height: '4rem',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
            <Shield size={18} color="var(--accent-blue)" />
            <span>PORTFOLIO CMS</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="btn-icon mobile-close-btn"
            style={{ display: 'none' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* User preview */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            AUTHENTICATED USER
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {user?.username || 'Admin'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {user?.email || 'admin@example.com'}
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin/dashboard'}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--accent-text)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                })}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.5rem' }}
          >
            <ExternalLink size={15} />
            <span>View Public Site</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-ghost btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--accent-rose)' }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }} className="admin-main">
        {/* Header */}
        <header
          className="admin-header"
          style={{
            height: '4rem',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 80,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="btn-icon mobile-open-btn"
              style={{ display: 'none' }}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <span className="admin-env-badge" style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Environment: Production Ready
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              to="/admin/settings"
              className="badge portal-default-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                textDecoration: 'none',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
              }}
              title="Configure Portal Default Theme"
            >
              <Sliders size={13} color="var(--accent-blue)" />
              <span>Portal: <strong>{portalDefault === 'dark' ? 'Dark' : 'Light'}</strong></span>
            </Link>

            <ThemeToggle />
          </div>
        </header>

        {/* Routed Sub-pages */}
        <main className="admin-main-content" style={{ padding: '2rem', flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            transform: translateX(-100%) !important;
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          .admin-sidebar.sidebar-open {
            transform: translateX(0) !important;
          }
          .admin-main {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          .admin-header {
            padding: 0 1rem !important;
          }
          .admin-main-content {
            padding: 1.25rem 1rem !important;
            overflow-x: hidden !important;
          }
          .mobile-close-btn {
            display: inline-flex !important;
          }
          .mobile-open-btn {
            display: inline-flex !important;
          }
          .admin-env-badge {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .admin-header {
            padding: 0 0.75rem !important;
          }
          .admin-main-content {
            padding: 1rem 0.75rem !important;
          }
          .portal-default-badge {
            font-size: 0.6875rem !important;
            padding: 0.25rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
