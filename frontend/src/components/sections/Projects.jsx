import React, { useState, useRef, useEffect } from 'react';
import { Github, ExternalLink, ArrowRight, Layers, CheckCircle2, ShieldCheck, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from '../common/Modal';

export const Projects = ({ projects = [] }) => {
  const [filter, setFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'FEATURED') return p.isFeatured;
    if (filter === 'AGENTS') {
      const t = ((p.technologies || '') + ' ' + (p.title || '')).toLowerCase();
      return t.includes('agent') || t.includes('langgraph') || t.includes('voice') || t.includes('assistant');
    }
    if (filter === 'RAG') {
      const t = ((p.technologies || '') + ' ' + (p.title || '')).toLowerCase();
      return t.includes('rag') || t.includes('retrieval') || t.includes('llamaindex') || t.includes('pinecone');
    }
    if (filter === 'LLMOPS') {
      const t = ((p.technologies || '') + ' ' + (p.title || '')).toLowerCase();
      return t.includes('ragas') || t.includes('trulens') || t.includes('fastapi') || t.includes('guardrail') || t.includes('docker');
    }
    return true;
  });

  const featuredCount = projects.filter((p) => p.isFeatured).length;

  const tabs = [
    { id: 'ALL', label: 'All Systems', count: projects.length },
    { id: 'FEATURED', label: 'Featured', count: featuredCount },
    { id: 'AGENTS', label: 'Conversational Agents' },
    { id: 'RAG', label: 'RAG & Retrieval' },
    { id: 'LLMOPS', label: 'LLMOps & Serving' },
  ];

  const checkScrollState = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [filteredProjects]);

  const handleScroll = (direction) => {
    if (!scrollerRef.current) return;
    const scrollAmount = scrollerRef.current.clientWidth * 0.75;
    scrollerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const getProjectImage = (project) => {
    if (project?.imageUrl && project.imageUrl.trim().length > 0) {
      return project.imageUrl;
    }
    const slug = (project?.slug || '').toLowerCase();
    const title = (project?.title || '').toLowerCase();
    if (slug.includes('employee') || title.includes('employee') || title.includes('workforce')) {
      return '/projects/project-employee.svg';
    }
    if (slug.includes('banking') || title.includes('banking') || title.includes('transaction')) {
      return '/projects/project-banking.svg';
    }
    if (slug.includes('ecommerce') || title.includes('commerce') || title.includes('inventory')) {
      return '/projects/project-ecommerce.svg';
    }
    return '/projects/project-portfolio.svg';
  };

  return (
    <section id="projects" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '1.75rem' }}>
          <span className="section-eyebrow">Engineering Portfolio</span>
          <h2 className="section-title">Production Systems & Case Studies</h2>
          <p className="section-subtitle">
            Curated selection of enterprise microservices, transactional databases, and resilient full-stack systems built for real-world load.
          </p>
        </div>

        {/* Tab Bar & Horizontal Scroller Controls */}
        <div
          className="projects-controls-wrapper"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            borderBottom: '1px solid var(--border-strong)',
            paddingBottom: '0.65rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Category Filter Tabs */}
          <div
            className="mea-tab-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              flex: '1 1 auto',
              minWidth: 0,
            }}
          >
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFilter(tab.id);
                    if (scrollerRef.current) {
                      scrollerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-subtle)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--border-strong)' : 'transparent',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flex: '0 0 auto',
                    flexShrink: 0,
                    minWidth: 'max-content',
                    transition: 'all var(--transition-fast)',
                    minHeight: '36px',
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.08rem 0.35rem',
                        borderRadius: '3px',
                        backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                        fontWeight: 600,
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1.2,
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroller Arrows */}
          <div className="projects-scroller-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }} className="projects-scroll-hint">
              HORIZONTAL SCROLL →
            </span>
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="btn-icon"
              aria-label="Scroll left"
              title="Previous projects"
              style={{
                width: '34px',
                height: '34px',
                padding: 0,
                opacity: canScrollLeft ? 1 : 0.4,
                cursor: canScrollLeft ? 'pointer' : 'default',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="btn-icon"
              aria-label="Scroll right"
              title="Next projects"
              style={{
                width: '34px',
                height: '34px',
                padding: 0,
                opacity: canScrollRight ? 1 : 0.4,
                cursor: canScrollRight ? 'pointer' : 'default',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroller Container */}
        <div
          ref={scrollerRef}
          className="projects-scroller-track"
          style={{
            display: 'flex',
            gap: '1.15rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingBottom: '1rem',
            paddingTop: '0.15rem',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
          }}
        >
          {filteredProjects.map((project) => {
            const techList = project.technologies
              ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={project.id}
                className="card card-hover project-card-item"
                style={{
                  flex: '0 0 clamp(265px, 24vw, 325px)',
                  minWidth: '255px',
                  maxWidth: '335px',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 0,
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-card)',
                  overflow: 'hidden',
                }}
              >
                {/* Top: Compact Project Picture / Preview Mockup */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9.5',
                    maxHeight: '160px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Preview Image */}
                  <img
                    src={getProjectImage(project)}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 260ms ease',
                    }}
                    className="project-preview-img"
                    onError={(e) => {
                      e.target.src = '/projects/project-portfolio.svg';
                    }}
                  />
                </div>

                {/* Middle: Content Body */}
                <div style={{ padding: '0.875rem 1.15rem 0.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                      marginBottom: '0.45rem',
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Short Description (Clamped to 2 lines for uniform card heights) */}
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.75rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1,
                    }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Tech stack badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: 'auto' }}>
                    {techList.slice(0, 4).map((t, index) => (
                      <span key={index} className="badge" style={{ fontSize: '0.6875rem', padding: '0.12rem 0.4rem' }}>
                        {t}
                      </span>
                    ))}
                    {techList.length > 4 && (
                      <span className="badge" style={{ fontSize: '0.6875rem', padding: '0.12rem 0.35rem', color: 'var(--text-muted)' }}>
                        +{techList.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom: Actions Bar with Compact Live Demo & Inspect Buttons */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1.15rem 0.85rem',
                    borderTop: '1px solid var(--border-subtle)',
                    gap: '0.4rem',
                    backgroundColor: 'var(--bg-surface)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'nowrap' }}>
                    {/* Live Demo Button */}
                    <a
                      href={project.liveUrl || project.githubUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        padding: '0.35rem 0.65rem',
                        minHeight: '32px',
                        whiteSpace: 'nowrap',
                      }}
                      title={project.liveUrl ? 'Open Live Demo in new tab' : 'Open Demo Repository on GitHub'}
                    >
                      <ExternalLink size={12} />
                      <span>Live Demo</span>
                    </a>

                    {/* Inspect Architecture Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        padding: '0.35rem 0.6rem',
                        minHeight: '32px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span>Inspect</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {/* GitHub Repo Button */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-icon"
                      aria-label="View GitHub Repository"
                      title="GitHub Repository"
                      style={{ width: '32px', height: '32px', flexShrink: 0, padding: 0 }}
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              marginTop: '1.25rem',
            }}
          >
            <Layers size={26} style={{ margin: '0 auto 0.65rem auto', opacity: 0.5 }} />
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
              No projects in this category yet
            </div>
            <p style={{ fontSize: '0.78125rem', marginTop: '0.2rem' }}>
              Switch to "All Systems" to view the complete catalog.
            </p>
          </div>
        )}

        {/* Project Detail Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title || 'System Overview'}
          maxWidth="750px"
        >
          {selectedProject && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Image Preview in Modal */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  maxHeight: '260px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                }}
              >
                <img
                  src={getProjectImage(selectedProject)}
                  alt={selectedProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    e.target.src = '/projects/project-portfolio.svg';
                  }}
                />
              </div>

              {selectedProject.shortDescription && (
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--text-primary)', fontWeight: 500 }}>
                  {selectedProject.shortDescription}
                </p>
              )}

              {selectedProject.problemSolved && (
                <div>
                  <h4
                    style={{
                      fontSize: '0.78125rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--accent-blue)',
                      marginBottom: '0.45rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Problem Solved & Technical Requirements
                  </h4>
                  <div
                    className="card"
                    style={{
                      padding: '0.95rem 1.15rem',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <p style={{ fontSize: '0.84375rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {selectedProject.problemSolved}
                    </p>
                  </div>
                </div>
              )}

              {selectedProject.fullDescription && (
                <div>
                  <h4
                    style={{
                      fontSize: '0.78125rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.45rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    System Architecture & Design Decisions
                  </h4>
                  <p style={{ fontSize: '0.84375rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                    {selectedProject.fullDescription}
                  </p>
                </div>
              )}

              {selectedProject.features && (
                <div>
                  <h4
                    style={{
                      fontSize: '0.78125rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.45rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Key Engineering Features
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
                    {selectedProject.features.split('\n').filter(Boolean).map((feat, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84375rem' }}>
                        <CheckCircle2 size={14} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                        <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.technologies && (
                <div>
                  <h4
                    style={{
                      fontSize: '0.78125rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.45rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Technologies & Dependencies
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {selectedProject.technologies.split(',').map((t, idx) => (
                      <span key={idx} className="badge" style={{ fontSize: '0.72rem' }}>
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ minHeight: '38px', padding: '0 1.15rem' }}
                  >
                    <ExternalLink size={14} />
                    <span>Open Live Demo</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ minHeight: '38px', padding: '0 1.15rem' }}
                  >
                    <Github size={14} />
                    <span>View Repository on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>

      {/* Horizontal Scroller & Card Responsive Styles */}
      <style>{`
        .mea-tab-bar {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .mea-tab-bar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .mea-tab-bar button {
          flex: 0 0 auto !important;
          flex-shrink: 0 !important;
          min-width: max-content !important;
          white-space: nowrap !important;
        }
        .mea-tab-bar button span {
          flex-shrink: 0 !important;
          white-space: nowrap !important;
        }
        .projects-scroller-track {
          scrollbar-width: thin;
          scrollbar-color: var(--border-strong) transparent;
        }
        .projects-scroller-track::-webkit-scrollbar {
          height: 6px;
        }
        .projects-scroller-track::-webkit-scrollbar-track {
          background: var(--bg-subtle);
          border-radius: 4px;
        }
        .projects-scroller-track::-webkit-scrollbar-thumb {
          background-color: var(--border-strong);
          border-radius: 4px;
        }
        .projects-scroller-track::-webkit-scrollbar-thumb:hover {
          background-color: var(--text-muted);
        }
        .project-card-item:hover .project-preview-img {
          transform: scale(1.025);
        }
        @media (max-width: 640px) {
          .projects-controls-wrapper {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.65rem !important;
          }
          .projects-scroller-actions {
            justify-content: flex-end !important;
            width: 100% !important;
          }
          .project-card-item {
            flex: 0 0 clamp(245px, 76vw, 280px) !important;
            min-width: 240px !important;
            max-width: 285px !important;
          }
          .projects-scroll-hint {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
