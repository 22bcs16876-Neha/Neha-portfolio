import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconRenderer } from '../common/IconRenderer';

export const Skills = ({ skills = [] }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const skillsScrollRef = useRef(null);

  const uniqueCategories = Array.from(
    new Set(skills.map((s) => s.category?.toUpperCase()).filter(Boolean))
  );
  const categories = ['ALL', ...uniqueCategories];

  const filteredSkills = activeCategory === 'ALL'
    ? skills
    : skills.filter((s) => s.category?.toUpperCase() === activeCategory);

  const getProficiencyClass = (level) => {
    switch (level?.toUpperCase()) {
      case 'ADVANCED':
        return 'badge-blue';
      case 'PROFICIENT':
        return 'badge-green';
      case 'FAMILIAR':
        return 'badge-amber';
      default:
        return '';
    }
  };

  const scrollSkills = (direction) => {
    if (skillsScrollRef.current) {
      const scrollAmount = Math.max(240, skillsScrollRef.current.clientWidth * 0.75);
      skillsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    if (skillsScrollRef.current) {
      skillsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="section-padding" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Stack & Tools</span>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle">
            The languages, frameworks, databases, and developer tools I use to build reliable software every day.
          </p>
        </div>

        {/* Category Filter Pills & Mobile Scroller Controls */}
        <div className="skills-filter-container">
          <div className="skills-category-tabs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {cat === 'ALL' ? 'All Skills' : cat}
                </button>
              );
            })}
          </div>

          {/* Mobile Scroller Arrow Navigation */}
          <div className="skills-scroller-controls">
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              SWIPE &bull;
            </span>
            <button
              type="button"
              onClick={() => scrollSkills('left')}
              className="btn-icon"
              style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
              aria-label="Previous skill"
              title="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollSkills('right')}
              className="btn-icon"
              style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
              aria-label="Next skill"
              title="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Skills Grid on Desktop / Two-Row Horizontal Scroller on Mobile */}
        <div ref={skillsScrollRef} className="skills-items-grid">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="card card-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                gap: '0.75rem',
                minHeight: '66px',
              }}
            >
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
                    color: 'var(--text-primary)',
                    flexShrink: 0,
                  }}
                >
                  <IconRenderer name={skill.iconName} size={16} />
                </div>
                <div style={{ minWidth: 0, flex: 1, paddingRight: '0.25rem' }}>
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-word',
                    }}
                    title={skill.name}
                  >
                    {skill.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      marginTop: '0.15rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {skill.category}
                  </div>
                </div>
              </div>

              {skill.proficiency && (
                <span
                  className={`badge ${getProficiencyClass(skill.proficiency)}`}
                  style={{
                    fontSize: '0.625rem',
                    padding: '0.15rem 0.45rem',
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {skill.proficiency}
                </span>
              )}
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            No skills found in this category.
          </div>
        )}
      </div>

      <style>{`
        .skills-filter-container {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .skills-category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          min-width: 0;
        }
        .skills-scroller-controls {
          display: none;
          align-items: center;
          gap: 0.375rem;
        }
        .skills-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
          width: 100%;
        }

        @media (max-width: 640px) {
          .skills-filter-container {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
            margin-bottom: 1.25rem !important;
          }
          .skills-category-tabs {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x proximity !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            padding-bottom: 0.35rem !important;
            width: 100% !important;
          }
          .skills-category-tabs::-webkit-scrollbar {
            display: none !important;
          }
          .skills-category-tabs button {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            scroll-snap-align: start !important;
          }

          .skills-scroller-controls {
            display: flex !important;
            justify-content: flex-end !important;
            width: 100% !important;
          }

          /* Two-Row Horizontal Scroller on Mobile */
          .skills-items-grid {
            display: grid !important;
            grid-template-rows: repeat(2, minmax(64px, auto)) !important;
            grid-auto-flow: column !important;
            grid-auto-columns: clamp(230px, 72vw, 280px) !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 0.75rem !important;
            padding-bottom: 0.75rem !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .skills-items-grid::-webkit-scrollbar {
            display: none !important;
          }
          .skills-items-grid > .card {
            scroll-snap-align: start !important;
            height: 100% !important;
            min-width: clamp(230px, 72vw, 280px) !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
};
