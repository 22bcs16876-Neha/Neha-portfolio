import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, FileText, Github, Linkedin, Code, Mail, MapPin, Clock, Server, Database, ShieldCheck, Terminal, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveAssetUrl } from '../../utils/assets';

export const Hero = ({ profile }) => {
  const name = profile?.fullName || '';
  const displayTitle = (profile?.title && profile.title !== 'NA' && profile.title.trim().length > 0)
    ? profile.title
    : 'Software Engineer';
  const bio = profile?.bio || '';
  const roleBadge = profile?.roleBadge || 'Software Engineer';
  const statusText = profile?.statusText || 'Open to Opportunities';
  const location = profile?.location || '';
  const avatarImage = resolveAssetUrl(profile?.avatarUrl) || '/default-avatar.svg';
  const techStackList = profile?.heroTechStack
    ? profile.heroTechStack.split(',').map((t) => t.trim()).filter(Boolean)
    : ['Java 21', 'Spring Boot 3', 'MySQL', 'Docker', 'React'];

  // Live Local Time in Bengaluru (IST)
  const [bengaluruTime, setBengaluruTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setBengaluruTime(formatted);
      } catch {
        setBengaluruTime('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const triadScrollRef = useRef(null);
  const scrollTriad = (direction) => {
    if (triadScrollRef.current) {
      const scrollAmount = Math.max(280, triadScrollRef.current.clientWidth * 0.82);
      triadScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const PortraitCard = () => (
    <div
      className="portrait-card-interactive"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '290px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-card)',
        backgroundColor: 'var(--bg-surface)',
        margin: '0 auto',
      }}
    >
      {/* Top Bar */}
      {roleBadge && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0.5rem 0.85rem',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
          }}
        >
          <div
            style={{
              color: 'var(--accent-blue)',
              fontWeight: 600,
              fontSize: '0.72rem',
              padding: '0.1rem 0.45rem',
              borderRadius: '4px',
              backgroundColor: 'var(--accent-blue-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {roleBadge}
          </div>
        </div>
      )}

      {/* Portrait Photo */}
      <div style={{ aspectRatio: '4 / 4.6', overflow: 'hidden', backgroundColor: 'var(--bg-subtle)' }}>
        <img
          src={avatarImage}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(e) => {
            e.target.src = '/default-avatar.svg';
          }}
        />
      </div>

      {/* Footer Tag (Full width, no truncation) */}
      <div
        style={{
          padding: '0.75rem 0.875rem 0.85rem',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}
        >
          {name}
        </div>
        {displayTitle && (
          <div
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginTop: '0.2rem',
              lineHeight: 1.35,
            }}
          >
            {displayTitle}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="section-padding animate-fade-in-up" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.75rem, 3.5vw, 3rem)' }}>
          
          {/* Top Feature: Authoritative Quote (Left) + Dignified Portrait (Right on desktop, centered on mobile) */}
          <div className="hero-leader-layout">
            {/* Left: Authoritative Quotation & Human Statement */}
            <div className="hero-text-col" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.65rem, 1.8vw, 1.25rem)', width: '100%', minWidth: 0 }}>
              {/* Context Badges */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(0.35rem, 1.2vw, 0.75rem)' }}>
                <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.22rem clamp(0.4rem, 1vw, 0.65rem)', fontSize: 'clamp(0.68rem, 1.8vw, 0.78125rem)' }}>
                  <span className="status-dot-pulse" />
                  <span>{statusText}</span>
                </span>

                <span style={{ fontSize: 'clamp(0.68rem, 1.8vw, 0.8125rem)', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={13} color="var(--text-muted)" />
                  <span>{location}</span>
                </span>

                {bengaluruTime && (
                  <span style={{ fontSize: 'clamp(0.68rem, 1.8vw, 0.78125rem)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} />
                    <span>{bengaluruTime} IST</span>
                  </span>
                )}
              </div>

              {/* Mobile Portrait (< 768px): Prominent & Centered */}
              <div className="hero-portrait-mobile">
                <PortraitCard />
              </div>

              {/* Editorial Quotation Mark & Statement */}
              <div style={{ position: 'relative', width: '100%' }}>
                <span className="editorial-quote-mark" aria-hidden="true" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', lineHeight: 0.8 }}>
                  “
                </span>
                <blockquote
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.95rem, 2.2vw, 1.45rem)',
                    lineHeight: 1.52,
                    color: 'var(--text-primary)',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    margin: '0.25rem 0 clamp(0.4rem, 1.2vw, 0.875rem) 0',
                    maxWidth: '100%',
                  }}
                >
                  {profile?.heroQuote || 'Dependable software is built on predictability, clean abstractions, and defensive engineering. Today, the most valuable systems are not the most complex — they are the most reliable.'}
                </blockquote>
              </div>

              {/* Bio & Elevator Pitch */}
              <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)', lineHeight: 1.65, color: 'var(--text-secondary)', width: '100%', maxWidth: '100%' }}>
                {bio}
              </p>

              {/* Action Buttons */}
              <div className="hero-cta-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.4rem, 1.2vw, 0.875rem)', alignItems: 'center', marginTop: 'clamp(0.25rem, 1vw, 0.5rem)', width: '100%' }}>
                <button
                  onClick={() => handleScrollTo('projects')}
                  className="btn btn-primary"
                  style={{ padding: 'clamp(0.55rem, 1.2vw, 0.75rem) clamp(0.85rem, 1.8vw, 1.4rem)', fontSize: 'clamp(0.8125rem, 1.8vw, 0.9375rem)', minHeight: 'clamp(40px, 5vw, 44px)' }}
                >
                  <span>Explore Work</span>
                  <ArrowRight size={15} />
                </button>

                {profile?.resumeUrl && (
                  <a
                    href={resolveAssetUrl(profile.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: 'clamp(0.55rem, 1.2vw, 0.75rem) clamp(0.85rem, 1.8vw, 1.4rem)', fontSize: 'clamp(0.8125rem, 1.8vw, 0.9375rem)', minHeight: 'clamp(40px, 5vw, 44px)' }}
                  >
                    <FileText size={15} />
                    <span>CV (PDF)</span>
                  </a>
                )}

                <button
                  onClick={() => handleScrollTo('contact')}
                  className="btn btn-ghost btn-ghost-contact"
                  style={{ padding: 'clamp(0.55rem, 1.2vw, 0.75rem) clamp(0.75rem, 1.5vw, 1.25rem)', fontSize: 'clamp(0.8125rem, 1.8vw, 0.9375rem)', minHeight: 'clamp(40px, 5vw, 44px)' }}
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </div>

            {/* Right: Dignified Portrait Card (Desktop >= 768px) */}
            <div className="hero-portrait-desktop">
              <PortraitCard />
            </div>
          </div>

          {/* Core Specialization Triad (Matching MEA Image 1 ministerial structure) */}
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Engineering Foundations
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Core Areas of Focus
                </h3>
              </div>

              {/* Mobile Scroller Arrow Navigation */}
              <div className="triad-scroller-controls" style={{ alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  SWIPE &bull;
                </span>
                <button
                  type="button"
                  onClick={() => scrollTriad('left')}
                  className="btn-icon"
                  style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
                  aria-label="Previous focus area"
                  title="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTriad('right')}
                  className="btn-icon"
                  style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
                  aria-label="Next focus area"
                  title="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div ref={triadScrollRef} className="hero-triad-grid">
              {/* Card 1: Backend Architecture */}
              <div
                className="card card-hover"
                style={{
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-blue-subtle)',
                        color: 'var(--accent-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Server size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {profile?.triad1Title || 'Backend & Microservices'}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {profile?.triad1Spec || 'Java 21 • Spring Boot 3'}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.84375rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {profile?.triad1Desc || 'Engineering high-throughput REST APIs, stateless JWT security, distributed service communication, and robust error handling pipelines.'}
                  </p>
                </div>
                <div style={{ marginTop: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('skills')}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--accent-blue)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>View Architecture Stack</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Card 2: Database Systems */}
              <div
                className="card card-hover"
                style={{
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-emerald-subtle)',
                        color: 'var(--accent-emerald)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Database size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {profile?.triad2Title || 'Data Systems & Modeling'}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {profile?.triad2Spec || 'MySQL • PostgreSQL • JPA'}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.84375rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {profile?.triad2Desc || 'Relational schema design, transactional boundary configuration, index optimization, query execution plan analysis, and data consistency.'}
                  </p>
                </div>
                <div style={{ marginTop: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('skills')}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--accent-emerald)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>View Data Technologies</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Card 3: System Delivery & Cloud */}
              <div
                className="card card-hover"
                style={{
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-amber-subtle)',
                        color: 'var(--accent-amber)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {profile?.triad3Title || 'Delivery & Integration'}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {profile?.triad3Spec || 'Docker • React • CI/CD'}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.84375rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {profile?.triad3Desc || 'Containerizing microservices with Docker, configuring secure production environments, and building responsive client applications in React.'}
                  </p>
                </div>
                <div style={{ marginTop: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('projects')}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--accent-amber)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>View Deployed Projects</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Dynamic Core Tech Stack Footer */}
          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                CONNECT:
              </span>
              {profile?.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub Profile" title="GitHub">
                  <Github size={18} />
                </a>
              )}
              {profile?.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn Profile" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
              )}
              {profile?.leetcodeUrl && (
                <a href={profile.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LeetCode Profile" title="LeetCode">
                  <Code size={18} />
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="btn-icon" aria-label="Email Address" title="Email">
                  <Mail size={18} />
                </a>
              )}
            </div>

            {/* Dynamic Tech Stack Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: '0.25rem' }}>
                DAILY STACK:
              </span>
              {techStackList.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        .hero-leader-layout {
          display: grid;
          grid-template-columns: 1fr 290px;
          gap: clamp(1.75rem, 3.5vw, 3.5rem);
          align-items: center;
          padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
          border-bottom: 1px solid var(--border-subtle);
          width: 100%;
        }
        .hero-portrait-mobile {
          display: none;
        }
        .hero-portrait-desktop {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          min-width: 0;
        }
        .triad-scroller-controls {
          display: none;
        }
        .hero-triad-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
        }
        @media (max-width: 860px) {
          .triad-scroller-controls {
            display: flex !important;
          }
          .hero-triad-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 1rem !important;
            padding-bottom: 0.75rem !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .hero-triad-grid::-webkit-scrollbar {
            display: none !important;
          }
          .hero-triad-grid > .card {
            flex: 0 0 clamp(270px, 82vw, 330px) !important;
            min-width: clamp(270px, 82vw, 330px) !important;
            scroll-snap-align: start !important;
          }
        }
        @media (max-width: 767px) {
          .hero-leader-layout {
            display: block !important;
            width: 100% !important;
          }
          .hero-portrait-desktop {
            display: none !important;
          }
          .hero-portrait-mobile {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
            margin: 0.75rem auto 1.25rem auto !important;
          }
        }
        @media (max-width: 520px) {
          .hero-cta-buttons {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.625rem !important;
            width: 100% !important;
          }
          .hero-cta-buttons .btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.6rem 0.5rem !important;
            font-size: 0.8125rem !important;
            min-height: 44px !important;
          }
          .hero-cta-buttons .btn-ghost-contact {
            grid-column: span 2 !important;
          }
        }
      `}</style>
    </section>
  );
};
