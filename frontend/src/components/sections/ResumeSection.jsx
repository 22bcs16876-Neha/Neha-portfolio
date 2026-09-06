import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/assets';

export const ResumeSection = ({ profile }) => {
  const resumeUrl = resolveAssetUrl(profile?.resumeUrl);

  if (!resumeUrl) return null;


  return (
    <section id="resume" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">09 / Curriculum Vitae</span>
          <h2 className="section-title">Resume & Qualifications</h2>
          <p className="section-subtitle">
            Comprehensive breakdown of industry experience, engineering competencies, and academic background.
          </p>
        </div>

        <div className="card resume-card">
          <div style={{ maxWidth: '550px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-blue)',
                }}
              >
                <FileText size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {profile?.fullName ? `${profile.fullName} — Resume` : 'Curriculum Vitae'}
              </h3>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Detailed overview of professional engagements, distributed architecture deployments, technical proficiencies, and formal education.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={16} />
              <span>View Resume</span>
            </a>
            <a
              href={resumeUrl}
              download={profile?.fullName ? `${profile.fullName.replace(/\s+/g, '_')}_Resume.pdf` : 'Resume.pdf'}
              className="btn btn-secondary"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .resume-card {
          padding: 2.5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 640px) {
          .resume-card {
            padding: 1.5rem !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
