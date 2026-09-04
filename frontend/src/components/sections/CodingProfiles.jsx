import React from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
import { IconRenderer } from '../common/IconRenderer';

export const CodingProfiles = ({ profiles = [] }) => {
  // Only show profiles that have a valid URL configured
  const validProfiles = profiles.filter((p) => p.profileUrl && p.profileUrl.trim().length > 0);

  if (validProfiles.length === 0) return null;

  return (
    <section id="profiles" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">08 / Presence</span>
          <h2 className="section-title">Coding & Professional Profiles</h2>
          <p className="section-subtitle">
            External engineering platforms showcasing code repositories, algorithmic problem rankings, and technical activity.
          </p>
        </div>

        <div className="coding-profiles-grid">
          {validProfiles.map((p) => (
            <a
              key={p.id}
              href={p.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                  }}
                >
                  <IconRenderer name={p.iconName || 'Terminal'} size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {p.platform}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    @{p.username}
                  </div>
                </div>
              </div>

              <ExternalLink size={16} color="var(--text-muted)" />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .coding-profiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
          gap: 1rem;
          width: 100%;
        }
        @media (max-width: 640px) {
          .coding-profiles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
