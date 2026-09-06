import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

export const Experience = ({ experiences = [] }) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">03 / Track Record</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Chronological engineering background spanning enterprise services, high-throughput systems, and full-stack delivery.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-track">
          {experiences.map((exp) => {
            const responsibilitiesList = exp.responsibilities
              ? exp.responsibilities.split('\n').filter((line) => line.trim().length > 0)
              : [];

            const techList = exp.technologies
              ? exp.technologies.split(',').map((t) => t.trim()).filter(Boolean)
              : [];

            return (
              <div key={exp.id} className="timeline-item">
                <div className={`timeline-node ${exp.isCurrent ? 'active-node' : ''}`} />
                <div className="card card-hover exp-card">
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', fontWeight: 600 }}>{exp.role}</h3>
                        {exp.isCurrent && (
                          <span className="badge badge-green" style={{ fontSize: '0.6875rem' }}>
                            Current Role
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 500, marginTop: '0.25rem' }}>
                        {exp.company}
                      </div>
                    </div>

                    <div className="exp-meta-block">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8125rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <Calendar size={14} />
                        <span>
                          {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                        </span>
                      </div>
                      {exp.location && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <MapPin size={13} />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {exp.description && (
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
                      {exp.description}
                    </p>
                  )}

                  {responsibilitiesList.length > 0 && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {responsibilitiesList.map((resp, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              gap: '0.75rem',
                              alignItems: 'baseline',
                              fontSize: '0.84375rem',
                              lineHeight: 1.6,
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <span style={{ color: 'var(--accent-blue)', fontSize: '0.875rem', lineHeight: 1 }}>
                              —
                            </span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {techList.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
                      {techList.map((tech, i) => (
                        <span key={i} className="badge" style={{ fontSize: '0.72rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {experiences.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            No work experience records loaded.
          </div>
        )}
      </div>

      <style>{`
        .exp-card {
          padding: clamp(1.15rem, 2.5vw, 2rem);
          width: 100%;
          box-sizing: border-box;
        }
        .exp-meta-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }
        @media (max-width: 640px) {
          .timeline-track {
            padding-left: 1.25rem !important;
            border-left-width: 2px !important;
          }
          .timeline-node {
            left: -1.25rem !important;
          }
          .exp-card {
            padding: 1rem !important;
          }
          .exp-meta-block {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
