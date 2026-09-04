import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Code, ArrowRight, MapPin, Clock, FileText, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/assets';

export const Footer = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const name = profile?.fullName || '';
  const role = profile?.title || 'Software Engineer';
  const location = profile?.location || '';
  const roleBadge = profile?.roleBadge || 'Software Engineer';
  const avatarImage = resolveAssetUrl(profile?.avatarUrl) || '/default-avatar.svg';

  const navLinks = [
    { label: 'About & Foundations', href: 'about' },
    { label: 'Focus & In-Depth', href: 'developer-corner' },
    { label: 'Stack & Technologies', href: 'skills' },
    { label: 'Experience & Roles', href: 'experience' },
    { label: 'Production Systems', href: 'projects' },
    { label: 'Academics & Degrees', href: 'education' },
    { label: 'Direct Communication', href: 'contact' },
  ];

  const focusDomains = [
    'Conversational Agents & Multi-Turn State',
    'Enterprise RAG & Hybrid Vector Retrieval',
    'Sub-500ms Streaming WebSocket Serving',
    'NeMo Guardrails & Prompt Injection Defense',
    'Intent Classification & Slot Filling (NLU)',
    'LLMOps, Ragas Evaluation & Observability',
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-strong)',
        backgroundColor: 'var(--bg-surface)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
        marginTop: '5rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="container">
        {/* Top Engagement Banner */}
        <div
          style={{
            padding: '2rem 2.25rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '3.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="footer-banner"
        >
          <div style={{ maxWidth: '620px' }}>
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
              Engineering Collaboration
            </span>
            <h3
              className="font-serif"
              style={{
                fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginTop: '0.25rem',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              {profile?.footerHeading || 'Building resilient systems, one transaction at a time.'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {profile?.footerSubheading || 'Open to backend software engineering positions, microservices architecture challenges, and full-stack integration projects.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}>
            <button
              onClick={() => handleScrollTo('contact')}
              className="btn btn-primary"
              style={{ minHeight: '44px', padding: '0 1.35rem' }}
            >
              <span>Initiate Contact</span>
              <ArrowRight size={15} />
            </button>

            {profile?.resumeUrl && (
              <a
                href={resolveAssetUrl(profile.resumeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ minHeight: '44px', padding: '0 1.25rem' }}
              >
                <FileText size={15} />
                <span>Download CV</span>
              </a>
            )}
          </div>
        </div>

        {/* 4-Column Structured Directory Grid */}
        <div className="footer-grid">
          {/* Column 1: Identity & Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <img
                src={avatarImage}
                alt={name}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-strong)',
                  flexShrink: 0,
                }}
                onError={(e) => {
                  e.target.src = '/default-avatar.svg';
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
                    {name}
                  </span>
                  <span
                    className="badge badge-blue"
                    style={{ fontSize: '0.6875rem', padding: '0.1rem 0.45rem' }}
                  >
                    {roleBadge}
                  </span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {role}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.84375rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              {profile?.bio ||
                'Backend-focused software developer based in Bengaluru. Designing robust APIs with Java 21 and Spring Boot, optimizing SQL workloads, and shipping reliable web applications.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={13} color="var(--text-muted)" />
                {location}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} color="var(--text-muted)" />
                UTC+5:30 (IST)
              </span>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.5rem' }}>
              {profile?.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Github size={17} />
                </a>
              )}
              {profile?.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Linkedin size={17} />
                </a>
              )}
              {profile?.leetcodeUrl && (
                <a
                  href={profile.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="LeetCode Profile"
                  title="LeetCode Problem Solver"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Code size={17} />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-icon"
                  aria-label="Email Developer"
                  title="Send Direct Email"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Mail size={17} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Index */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              Index Directory
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: 0, margin: 0 }}>
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleScrollTo(item.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: '0.84375rem',
                      color: 'var(--text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'color var(--transition-fast), transform var(--transition-fast)',
                    }}
                    className="footer-nav-link"
                  >
                    <span style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
                      0{idx + 1}.
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Focus Domains */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              Architecture Domains
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: 0, margin: 0 }}>
              {focusDomains.map((dom, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.45,
                  }}
                >
                  <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8125rem', lineHeight: 1 }}>
                    ✓
                  </span>
                  <span>{dom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: System Specifications */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              System Colophon
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <div
                style={{
                  padding: '0.75rem 0.875rem',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  OPERATIONAL STATUS
                </div>
                <div style={{ color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
                  <span>{profile?.statusText || 'Open to Opportunities'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', lineHeight: 1.6 }}>
                <div><strong>Stack:</strong> {profile?.heroTechStack || 'Python 3.11, LangChain, LlamaIndex, OpenAI, Pinecone, FastAPI, Docker'}</div>
                <div><strong>Standard:</strong> Strict Zero Gradients Editorial</div>
                <div><strong>Availability:</strong> 99.9% Production SLA Target</div>
                <div><strong>Typography:</strong> Inter & JetBrains Mono</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '1.75rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.25rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {currentYear} <strong>{name}</strong>. Certified technical records & architecture specifications.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              PROD_RELEASE: v2.6.4
            </span>
            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minHeight: '36px' }}
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Responsive Layout CSS */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr 1.2fr;
          gap: 2.5rem;
          align-items: start;
          width: 100%;
        }
        .footer-nav-link:hover {
          color: var(--text-primary) !important;
          transform: translateX(3px);
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.25rem;
          }
          .footer-banner {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
