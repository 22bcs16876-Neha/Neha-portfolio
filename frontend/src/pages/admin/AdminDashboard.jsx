import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Link } from 'react-router-dom';
import {
  Layers,
  Terminal,
  Briefcase,
  Award,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Plus,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <Loader2 className="animate-spin" size={28} color="var(--accent-blue)" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Projects', value: stats?.totalProjects ?? 0, icon: Layers, to: '/admin/projects', color: 'var(--accent-blue)' },
    { label: 'Technical Skills', value: stats?.totalSkills ?? 0, icon: Terminal, to: '/admin/skills', color: 'var(--accent-emerald)' },
    { label: 'Experience Milestones', value: stats?.totalExperiences ?? 0, icon: Briefcase, to: '/admin/experience', color: 'var(--accent-amber)' },
    { label: 'Certifications', value: stats?.totalCertifications ?? 0, icon: Award, to: '/admin/certifications', color: 'var(--accent-blue)' },
    { label: 'Unread Inquiries', value: stats?.unreadMessagesCount ?? 0, icon: Mail, to: '/admin/messages', color: 'var(--accent-rose)' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 className="dashboard-title" style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Portfolio CMS Overview
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Real-time summary of portfolio contents, statistics, and pending communication.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div
        className="dashboard-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              to={card.to}
              className="card card-hover stat-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                  {card.label}
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                    flexShrink: 0,
                    marginLeft: '0.5rem',
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>
              <div className="stat-card-value" style={{ fontSize: '1.875rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: '0.75rem', color: 'var(--text-primary)' }}>
                {card.value}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick shortcuts & Recent Messages */}
      <div
        className="dashboard-sections-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Recent Messages */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Recent Contact Inquiries</h2>
            <Link to="/admin/messages" className="btn btn-ghost btn-sm" style={{ paddingRight: 0 }}>
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {stats.recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: '0.75rem 0.875rem',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {msg.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {msg.subject || 'No subject'}
                    </div>
                  </div>
                  <span
                    className={`badge ${msg.status === 'UNREAD' ? 'badge-blue' : ''}`}
                    style={{ fontSize: '0.6875rem', flexShrink: 0 }}
                  >
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: '2rem 0', textAlign: 'center' }}>
              No messages received yet.
            </div>
          )}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Content Management Shortcuts
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link
              to="/admin/profile"
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', height: 'auto', textAlign: 'left', lineHeight: 1.4 }}
            >
              <span>Edit Bio, Experience Stats & Profile Photo</span>
            </Link>

            <Link
              to="/admin/projects"
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', height: 'auto', textAlign: 'left', lineHeight: 1.4 }}
            >
              <span>Manage Projects & Add New Case Study</span>
            </Link>

            <Link
              to="/admin/skills"
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', height: 'auto', textAlign: 'left', lineHeight: 1.4 }}
            >
              <span>Update Technical Skills & Proficiencies</span>
            </Link>

            <Link
              to="/admin/settings"
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', height: 'auto', textAlign: 'left', lineHeight: 1.4 }}
            >
              <span>Update Admin Password & Email Config</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .dashboard-title {
            font-size: 1.35rem !important;
          }
          .dashboard-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
            margin-bottom: 1.5rem !important;
          }
          .stat-card {
            padding: 1rem !important;
          }
          .stat-card-value {
            font-size: 1.5rem !important;
            margin-top: 0.5rem !important;
          }
        }
        @media (max-width: 380px) {
          .dashboard-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
