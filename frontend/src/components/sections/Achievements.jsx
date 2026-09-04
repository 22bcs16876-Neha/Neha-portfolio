import React from 'react';
import { Trophy, Calendar, CheckCircle } from 'lucide-react';

export const Achievements = ({ achievements = [] }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">07 / Milestones</span>
          <h2 className="section-title">Honors & Achievements</h2>
          <p className="section-subtitle">
            Competitive programming distinctions, hackathon recognitions, and open-source contributions.
          </p>
        </div>

        <div className="achievements-grid">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="card card-hover"
              style={{
                padding: 'clamp(1.125rem, 2vw, 1.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-amber)',
                        flexShrink: 0,
                      }}
                    >
                      <Trophy size={16} />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, minWidth: 0, lineHeight: 1.35, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                  </div>

                  {item.category && (
                    <span className="badge" style={{ fontSize: '0.6875rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                      {item.category}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {item.eventOrOrg && <span>{item.eventOrOrg}</span>}
                  {item.achievementDate && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} />
                      <span>{item.achievementDate}</span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 1.25rem;
          width: 100%;
        }
        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
