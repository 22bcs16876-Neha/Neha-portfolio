import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export const Education = ({ educations = [] }) => {
  return (
    <section id="education" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">05 / Academics</span>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal computer science fundamentals, algorithm foundations, and degree coursework.
          </p>
        </div>

        <div className="education-grid">
          {educations.map((edu) => (
            <div key={edu.id} className="card card-hover" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{edu.degree}</h3>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 500, marginTop: '0.25rem' }}>
                    {edu.institution}
                  </div>
                  {edu.fieldOfStudy && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {edu.fieldOfStudy}
                    </div>
                  )}
                </div>

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
                  <GraduationCap size={18} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <Calendar size={13} />
                  <span>{edu.startYear} – {edu.endYear}</span>
                </div>
                {edu.gradeOrCgpa && (
                  <span className="badge badge-green" style={{ fontSize: '0.6875rem' }}>
                    {edu.gradeOrCgpa}
                  </span>
                )}
              </div>

              {edu.description && (
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {educations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            No education records loaded.
          </div>
        )}
      </div>

      <style>{`
        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 1.5rem;
          width: 100%;
        }
        @media (max-width: 768px) {
          .education-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
