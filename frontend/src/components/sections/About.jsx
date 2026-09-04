import React from 'react';
import { Server, Database, Layers, ShieldCheck, Terminal, Cpu, CheckCircle2, Award } from 'lucide-react';

export const About = ({ profile }) => {
  const quickFacts = [
    {
      label: profile?.stat1Label || 'Years Experience',
      value: profile?.stat1Value || `${profile?.yearsOfExperience ?? 4}+`,
      context: 'Production Practice',
      timeline: '2022–2026',
    },
    {
      label: profile?.stat2Label || 'Systems Deployed',
      value: profile?.stat2Value || `${profile?.projectsCount ?? 14}+`,
      context: 'Microservices & Apps',
      timeline: 'Production Ready',
    },
    {
      label: profile?.stat3Label || 'Problems Solved',
      value: profile?.stat3Value || `${profile?.problemsSolvedCount ?? 520}+`,
      context: 'Algorithms & Data Structs',
      timeline: 'LeetCode & Platforms',
    },
    {
      label: profile?.stat4Label || 'SLA Target',
      value: profile?.stat4Value || '99.9%',
      context: 'Availability Standard',
      timeline: 'Zero Downtime Goals',
    },
  ];

  const coreStrengths = [
    {
      icon: Cpu,
      title: 'Conversational Agents & NLU',
      desc: 'Architecting multi-turn dialogue state machines, LangGraph workflows, intent classification, and deterministic tool-calling agents.',
    },
    {
      icon: Database,
      title: 'Enterprise RAG Architectures',
      desc: 'Designing hallucination-resistant retrieval pipelines with semantic chunking, Cohere reranking, and Pinecone hybrid vector search.',
    },
    {
      icon: ShieldCheck,
      title: 'Safety & Guardrails',
      desc: 'Implementing NeMo Guardrails, prompt injection defenses, PII masking, and deterministic fallbacks to eliminate hallucinations.',
    },
    {
      icon: Server,
      title: 'Sub-500ms Model Serving',
      desc: 'Developing asynchronous FastAPI WebSocket microservices optimized for streaming token delivery and sub-450ms TTFT latency.',
    },
    {
      icon: Terminal,
      title: 'LLMOps & Evaluation',
      desc: 'Continuous automated testing with Ragas and TruLens to benchmark faithfulness, answer relevance, and conversational drift.',
    },
    {
      icon: Layers,
      title: 'Cloud & Vector Caching',
      desc: 'Dockerized microservice deployment, Redis semantic caching for repetitive queries, and scalable inference infrastructure.',
    },
  ];

  const defaultPrinciples = [
    {
      title: 'Readable over clever',
      detail: 'Code is read ten times more often than it is written. I write straightforward code that is easy to debug at midnight.',
    },
    {
      title: 'Database-first mindset',
      detail: 'Most system performance bottlenecks start with poor indexing or schema design. I model transactions and constraints early.',
    },
    {
      title: 'Defensive by default',
      detail: 'Assume network calls fail, timeouts happen, and inputs can be messy. Handle errors gracefully before users see them.',
    },
    {
      title: 'End-to-end empathy',
      detail: 'Even when working deep in the backend, I build APIs with full empathy for frontend clients and the end user experience.',
    },
  ];

  let engineeringPrinciples = defaultPrinciples;
  if (profile?.engineeringPrinciples) {
    try {
      const parsed = JSON.parse(profile.engineeringPrinciples);
      if (Array.isArray(parsed) && parsed.length > 0) {
        engineeringPrinciples = parsed;
      }
    } catch {
      const lines = profile.engineeringPrinciples.split('\n').filter(Boolean);
      if (lines.length > 0) {
        engineeringPrinciples = lines.map((line) => {
          const parts = line.split('|').map((s) => s.trim());
          return {
            title: parts[0] || 'Principle',
            detail: parts[1] || 'Details',
          };
        });
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

        {/* Performance Insights Grid (MEA Image 3 Style) */}
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
              RECORD PERIOD: 2022–2026
            </span>
          </div>

          <div className="stats-grid-mea">
            {quickFacts.map((fact, index) => (
              <div
                key={index}
                className="card card-hover"
                style={{
                  padding: 'clamp(0.875rem, 2.5vw, 1.5rem)',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div>
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
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.2rem',
                    }}
                  >
                    {fact.context}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '0.625rem',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{fact.timeline}</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>● ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative & Principles Split View */}
        <div className="about-narrative-split" style={{ marginBottom: '3.5rem' }}>
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
              <p>
                {profile?.shortAbout ||
                  "I've always been drawn to how software works behind the scenes. What started as curiosity about loops, memory, and algorithms has grown into designing production microservices, wrangling SQL performance, and deploying resilient backend architectures."}
              </p>
              <p>
                {profile?.fullAbout ||
                  'Most of my work centers around Java 21, the Spring Boot ecosystem, and relational databases. I genuinely enjoy the craft of software engineering: modeling domain entities, establishing transactional consistency, and building clean APIs that team members love to use.'}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {profile?.aboutLocationLine ||
                  `Based in ${profile?.location || 'Bengaluru, India'}. Passionate about participating in open-source development, competitive programming, and continuous hands-on learning.`}
              </p>
            </div>
          </div>

          {/* Column 2: Engineering Principles */}
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
        </div>

        {/* Technical Competencies Grid */}
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
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {strength.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {strength.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
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
