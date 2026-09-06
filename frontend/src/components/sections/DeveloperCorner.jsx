import React from 'react';
import { ArrowUpRight, ArrowRight, Layers, ShieldCheck, Cpu, Database, Server, Terminal, CheckCircle } from 'lucide-react';

export const DeveloperCorner = ({ profile }) => {
  let capabilities = [];
  if (profile?.devCornerCapabilities) {
    try {
      const parsed = JSON.parse(profile.devCornerCapabilities);
      if (Array.isArray(parsed) && parsed.length > 0) {
        capabilities = parsed;
      }
    } catch {
      // If newline-separated: Title | Spec | TargetId
      const lines = profile.devCornerCapabilities.split('\n').filter(Boolean);
      if (lines.length > 0) {
        capabilities = lines
          .map((line, idx) => {
            const parts = line.split('|').map((s) => s.trim());
            return {
              id: String(idx + 1).padStart(2, '0'),
              title: parts[0] || '',
              spec: parts[1] || '',
              targetId: parts[2] || 'skills',
            };
          })
          .filter((c) => c.title);
      }
    }
  }

  if (capabilities.length === 0 && !profile?.inFocusTitle) return null;

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="developer-corner" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Two-column layout: Developer's Corner (Left) and In Focus (Right) */}
        <div className="corner-focus-grid">
          {/* Column 1: Developer's Corner (MEA Citizen's Corner style) */}
          {capabilities.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-blue)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                    }}
                  >
                    Direct Access Index
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                    Developer's Corner
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {capabilities.length} Core Competenc{capabilities.length === 1 ? 'y' : 'ies'}
                </span>
              </div>

              {/* List items */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {capabilities.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => handleScrollTo(item.targetId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.5rem',
                      borderBottom: idx === capabilities.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'background-color var(--transition-fast)',
                      minHeight: '48px',
                    }}
                    className="corner-item-row"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleScrollTo(item.targetId);
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8125rem',
                          color: 'var(--text-muted)',
                          fontWeight: 600,
                          marginTop: '0.15rem',
                          flexShrink: 0,
                        }}
                      >
                        {item.id}
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: '0.9375rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.35,
                          }}
                        >
                          {item.title}
                        </div>
                        {item.spec && (
                          <div
                            style={{
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--text-secondary)',
                              marginTop: '0.25rem',
                            }}
                          >
                            {item.spec}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        flexShrink: 0,
                        marginLeft: '0.75rem',
                      }}
                      className="corner-arrow-box"
                    >
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Column 2: In Focus (MEA Flagship Editorial Card) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border-strong)',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-emerald)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  Featured Architectural Spotlight
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                  In Focus
                </h3>
              </div>
            </div>

            {/* Editorial Body */}
            <div
              style={{
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                gap: '1.5rem',
              }}
            >
              <div>
                {/* Visual Label Banner */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                  }}
                >
                  <span>PUBLISHED SYSTEM ARCHITECTURE</span>
                  <span>•</span>
                  <span>PRODUCTION GRADE</span>
                </div>

                {profile?.inFocusTitle && (
                  <h4
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {profile.inFocusTitle}
                  </h4>
                )}

                {profile?.inFocusDescription && (
                  <p
                    style={{
                      fontSize: '0.90625rem',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {profile.inFocusDescription}
                  </p>
                )}

                {/* Key Technical Metric Badges */}
                {(profile?.inFocusMetric1Value || profile?.inFocusMetric2Value || profile?.inFocusMetric3Value) && (
                  <div className="in-focus-metrics-grid">
                    {profile?.inFocusMetric1Value && (
                      <div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                          {profile.inFocusMetric1Value}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {profile?.inFocusMetric1Label || ''}
                        </div>
                      </div>
                    )}
                    {profile?.inFocusMetric2Value && (
                      <div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                          {profile.inFocusMetric2Value}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {profile?.inFocusMetric2Label || ''}
                        </div>
                      </div>
                    )}
                    {profile?.inFocusMetric3Value && (
                      <div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                          {profile.inFocusMetric3Value}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {profile?.inFocusMetric3Label || ''}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.875rem',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  width: '100%',
                }}
              >
                <button
                  onClick={() => handleScrollTo('projects')}
                  className="btn btn-primary"
                  style={{ minHeight: '44px', padding: '0 1.25rem' }}
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => handleScrollTo('skills')}
                  className="btn btn-secondary"
                  style={{ minHeight: '44px', padding: '0 1.25rem' }}
                >
                  <span>Review Tech Stack</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row hover and responsive layout styling */}
      <style>{`
        .corner-focus-grid {
          display: grid;
          grid-template-columns: ${capabilities.length > 0 && profile?.inFocusTitle ? '1fr 1fr' : '1fr'};
          gap: 2.5rem;
          align-items: stretch;
          width: 100%;
        }
        .in-focus-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          padding: 1rem;
          background-color: var(--bg-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          margin-bottom: 1rem;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .corner-focus-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
        @media (max-width: 480px) {
          .in-focus-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
        .corner-item-row:hover {
          background-color: var(--bg-subtle);
        }
        .corner-item-row:hover .corner-arrow-box {
          background-color: var(--text-primary);
          color: var(--bg-main);
          border-color: var(--text-primary);
        }
      `}</style>
    </section>
  );
};
