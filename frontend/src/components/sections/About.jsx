import React from 'react';
import { Server, Database, Layers, ShieldCheck, Terminal, Cpu, CheckCircle2, Award } from 'lucide-react';

export const About = ({ profile }) => {
  const quickFacts = [];
  if (profile?.stat1Label && profile?.stat1Value) {
    quickFacts.push({ label: profile.stat1Label, value: profile.stat1Value });
  }
  if (profile?.stat2Label && profile?.stat2Value) {
    quickFacts.push({ label: profile.stat2Label, value: profile.stat2Value });
  }
  if (profile?.stat3Label && profile?.stat3Value) {
    quickFacts.push({ label: profile.stat3Label, value: profile.stat3Value });
  }
  if (profile?.stat4Label && profile?.stat4Value) {
    quickFacts.push({ label: profile.stat4Label, value: profile.stat4Value });
  }

  const coreStrengths = [];
  if (profile?.triad1Title) {
    coreStrengths.push({
      icon: Server,
      title: profile.triad1Title,
      spec: profile.triad1Spec,
      desc: profile.triad1Desc,
    });
  }
  if (profile?.triad2Title) {
    coreStrengths.push({
      icon: Database,
      title: profile.triad2Title,
      spec: profile.triad2Spec,
      desc: profile.triad2Desc,
    });
  }
  if (profile?.triad3Title) {
    coreStrengths.push({
      icon: ShieldCheck,
      title: profile.triad3Title,
      spec: profile.triad3Spec,
      desc: profile.triad3Desc,
    });
  }

  let engineeringPrinciples = [];
  if (profile?.engineeringPrinciples) {
    try {
      const parsed = JSON.parse(profile.engineeringPrinciples);
      if (Array.isArray(parsed) && parsed.length > 0) {
        engineeringPrinciples = parsed;
      }
    } catch {
      const lines = profile.engineeringPrinciples.split('\n').filter(Boolean);
      if (lines.length > 0) {
        engineeringPrinciples = lines
          .map((line) => {
            const parts = line.split('|').map((s) => s.trim());
            return {
              title: parts[0] || '',
              detail: parts[1] || '',
            };
          })
          .filter((p) => p.title);
      }
    }
  }

  return (
    <section id="about" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Profile & Foundations</span>
          <h2 className="section-title">Engineering Records & Journey</h2>
          <p className="section-subtitle">
            A software engineer committed to writing dependable, predictable code that solves tangible business challenges.
          </p>
        </div>

        {/* Performance Insights Grid (strictly from database) */}
        {quickFacts.length > 0 && (
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
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
                  Audited Metrics
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                  Performance & Engineering Insights
                </h3>
              </div>
              {profile?.yearsOfExperience ? (
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--bg-subtle)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  EXPERIENCE: {profile.yearsOfExperience} YEAR{profile.yearsOfExperience > 1 ? 'S' : ''}
                </span>
              ) : null}
            </div>

            <div className="stats-grid-mea">
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="card card-hover"
                  style={{
                    padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(2.1rem, 3.2vw, 2.75rem)',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {fact.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginTop: '0.75rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Narrative & Principles Split View */}
        <div className={engineeringPrinciples.length > 0 ? "about-narrative-split" : ""} style={{ marginBottom: '3.5rem' }}>
          {/* Column 1: Journey */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span
                style={{
                  width: '6px',
                  height: '18px',
                  backgroundColor: 'var(--accent-blue)',
                  borderRadius: '1px',
                  display: 'inline-block',
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                The Journey So Far
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              {profile?.shortAbout && <p>{profile.shortAbout}</p>}
              {profile?.fullAbout && <p>{profile.fullAbout}</p>}
              {!profile?.shortAbout && !profile?.fullAbout && profile?.bio && <p>{profile.bio}</p>}
              {profile?.aboutLocationLine ? (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {profile.aboutLocationLine}
                </p>
              ) : profile?.location ? (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Based in {profile.location}.
                </p>
              ) : null}
            </div>
          </div>

          {/* Column 2: Engineering Principles */}
          {engineeringPrinciples.length > 0 && (
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    width: '6px',
                    height: '18px',
                    backgroundColor: 'var(--accent-emerald)',
                    borderRadius: '1px',
                    display: 'inline-block',
                  }}
                />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Engineering Principles
                </h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0 }}>
                {engineeringPrinciples.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '0.875rem',
                      alignItems: 'flex-start',
                      paddingBottom: idx === engineeringPrinciples.length - 1 ? 0 : '1rem',
                      borderBottom: idx === engineeringPrinciples.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent-blue)',
                        fontWeight: 700,
                        backgroundColor: 'var(--bg-subtle)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '3px',
                        border: '1px solid var(--border-subtle)',
                        flexShrink: 0,
                        marginTop: '0.1rem',
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', display: 'block', marginBottom: '0.2rem' }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '0.84375rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {item.detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Technical Competencies Grid (strictly from database) */}
        {coreStrengths.length > 0 && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
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
                Full Architectural Spectrum
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                Core Technical Competencies
              </h3>
            </div>

            <div className="about-strengths-grid">
              {coreStrengths.map((strength, index) => {
                const Icon = strength.icon;
                return (
                  <div
                    key={index}
                    className="card card-hover"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-subtle)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-primary)',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {strength.title}
                        </h4>
                        {strength.spec && (
                          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            {strength.spec}
                          </div>
                        )}
                      </div>
                    </div>
                    {strength.desc && (
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {strength.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Grid styles for mobile 2x2 and desktop 4 cols */}
      <style>{`
        .stats-grid-mea {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          width: 100%;
        }
        .about-narrative-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
          width: 100%;
        }
        .about-strengths-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
        }
        @media (max-width: 960px) {
          .stats-grid-mea {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-narrative-split {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .about-strengths-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .about-strengths-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .stats-grid-mea {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.625rem !important;
          }
        }
      `}</style>
    </section>
  );
};
