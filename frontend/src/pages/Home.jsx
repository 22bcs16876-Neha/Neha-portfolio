import React, { useState, useEffect, useCallback } from 'react';
import { portfolioService } from '../services/portfolioService';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { DeveloperCorner } from '../components/sections/DeveloperCorner';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { Education } from '../components/sections/Education';
import { Certifications } from '../components/sections/Certifications';
import { Achievements } from '../components/sections/Achievements';
import { CodingProfiles } from '../components/sections/CodingProfiles';
import { ResumeSection } from '../components/sections/ResumeSection';
import { Contact } from '../components/sections/Contact';
import { Loader2, RefreshCw, WifiOff, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { updateTabBranding } from '../utils/favicon';

export const Home = () => {
  const { applyPortalDefault } = useTheme();

  const getInitialData = () => {
    try {
      const cached = localStorage.getItem('portfolio_cached_data');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch {}
    return {
      profile: null,
      skills: [],
      experience: [],
      projects: [],
      education: [],
      certifications: [],
      achievements: [],
      codingProfiles: [],
    };
  };

  const [data, setData] = useState(getInitialData);
  const [loading, setLoading] = useState(!data?.profile?.fullName);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  // Monitor network connectivity
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setError(null);
      fetchPortfolioData();
    };
    const handleOffline = () => {
      setIsOffline(true);
      setError('No internet connection detected. Please check your network.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Immediately synchronize browser tab branding when profile is loaded
  useEffect(() => {
    if (data?.profile?.fullName) {
      updateTabBranding(data.profile);
    }
  }, [data?.profile]);

  // Timer while initial loading is active
  useEffect(() => {
    let timer = null;
    if (loading && !isOffline && !error) {
      timer = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [loading, isOffline, error]);

  const loadOfflineSnapshot = useCallback(() => {
    const initial = getInitialData();
    setData(initial);
    if (initial.profile) {
      updateTabBranding(initial.profile);
      if (initial.profile.defaultTheme) {
        applyPortalDefault(initial.profile.defaultTheme);
      }
    }
    setLoading(false);
    setError(null);
  }, [applyPortalDefault]);

  const fetchPortfolioData = async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
      setError('You are currently offline. Please reconnect your internet.');
      return;
    }

    if (!data.profile) {
      setLoading(true);
    } else {
      setIsSyncing(true);
    }
    setError(null);

    try {
      const [
        profile,
        skills,
        experience,
        projects,
        education,
        certifications,
        achievements,
        codingProfiles,
      ] = await Promise.all([
        portfolioService.getProfile().catch(() => null),
        portfolioService.getSkills().catch(() => []),
        portfolioService.getExperience().catch(() => []),
        portfolioService.getProjects().catch(() => []),
        portfolioService.getEducation().catch(() => []),
        portfolioService.getCertifications().catch(() => []),
        portfolioService.getAchievements().catch(() => []),
        portfolioService.getCodingProfiles().catch(() => []),
      ]);

      if (profile) {
        updateTabBranding(profile);
        if (profile?.defaultTheme) {
          applyPortalDefault(profile.defaultTheme);
        }
      }

      const freshData = {
        profile: profile || data.profile || null,
        skills: Array.isArray(skills) ? skills : [],
        experience: Array.isArray(experience) ? experience : [],
        projects: Array.isArray(projects) ? projects : [],
        education: Array.isArray(education) ? education : [],
        certifications: Array.isArray(certifications) ? certifications : [],
        achievements: Array.isArray(achievements) ? achievements : [],
        codingProfiles: Array.isArray(codingProfiles) ? codingProfiles : [],
      };

      setData(freshData);
      if (profile) {
        try {
          localStorage.setItem('portfolio_cached_data', JSON.stringify(freshData));
        } catch {}
      }
    } catch (err) {
      console.error('Error loading portfolio data:', err);
      if (!data.profile) {
        if (!navigator.onLine) {
          setIsOffline(true);
          setError('Internet disconnected. Please check your connection.');
        } else {
          setError('Server connection error. The cloud backend may still be starting up.');
        }
      }
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          backgroundColor: 'var(--bg-main)',
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.18); opacity: 0.45; }
          }
        `}</style>

        {isOffline || error ? (
          /* Network problem: Spinner stops, clear error displayed with retry and offline options */
          <div
            className="card"
            style={{
              maxWidth: '440px',
              width: '100%',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              border: '1px solid var(--border-strong)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-rose-subtle)',
                color: 'var(--accent-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isOffline ? <WifiOff size={26} /> : <AlertCircle size={26} />}
            </div>

            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {isOffline ? 'No Internet Connection' : 'Server Connection Issue'}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.375rem', lineHeight: 1.5 }}>
                {isOffline
                  ? 'Please check your Wi-Fi or mobile data connection to access live portfolio services.'
                  : (error || 'The backend cloud service is taking longer to respond.')}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={fetchPortfolioData}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: '130px', justifyContent: 'center' }}
              >
                <RefreshCw size={15} />
                <span>Retry Connection</span>
              </button>
              <button
                type="button"
                onClick={loadOfflineSnapshot}
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: '130px', justifyContent: 'center' }}
              >
                <Sparkles size={15} color="var(--accent-blue)" />
                <span>Load Offline Snapshot</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal fetching state: Continuous, hardware-accelerated smooth spinning circle */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Outer pulsing ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid var(--accent-blue)',
                  opacity: 0.25,
                  animation: 'pulse-ring 2s ease-in-out infinite',
                }}
              />
              {/* Non-stopping continuously spinning SVG circle */}
              <Loader2
                size={40}
                color="var(--accent-blue)"
                style={{
                  animation: 'spin 0.85s linear infinite',
                  transformOrigin: 'center center',
                  willChange: 'transform',
                  display: 'inline-block',
                }}
              />
            </div>

            <div style={{ maxWidth: '380px' }}>
              <div
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {elapsed < 4
                  ? 'Connecting to Portfolio...'
                  : elapsed < 12
                  ? 'Fetching live engineering projects & profile data...'
                  : 'Waking up cloud server (free-tier spin-up in progress)...'}
              </div>

              <div
                style={{
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginTop: '0.375rem',
                }}
              >
                {elapsed > 0 && `Elapsed: ${elapsed}s`}
                {elapsed >= 12 && ' • Render free instances sleep when inactive'}
              </div>
            </div>

            {/* If backend takes > 8 seconds, provide instant snapshot button */}
            {elapsed >= 8 && (
              <button
                type="button"
                onClick={loadOfflineSnapshot}
                className="btn btn-secondary btn-sm"
                style={{
                  marginTop: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                }}
              >
                <span>Continue with Instant Snapshot</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar profile={data.profile} />

      {/* Background sync chip indicator if updating while content is already displayed */}
      {isSyncing && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            right: '1.25rem',
            zIndex: 99,
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem 0.875rem',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
          }}
        >
          <Loader2 size={14} className="animate-spin" color="var(--accent-blue)" />
          <span>Syncing latest updates...</span>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: 'var(--accent-amber-subtle)',
            borderBottom: '1px solid var(--border-strong)',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color: 'var(--accent-amber)',
          }}
        >
          <span>{error}</span>
          <button
            onClick={fetchPortfolioData}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      <main style={{ flex: 1 }}>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <DeveloperCorner profile={data.profile} />
        <Skills skills={data.skills} />
        <Experience experiences={data.experience} />
        <Projects projects={data.projects} />
        <Education educations={data.education} />
        <Certifications certifications={data.certifications} />
        <Achievements achievements={data.achievements} />
        <CodingProfiles profiles={data.codingProfiles} />
        <ResumeSection profile={data.profile} />
        <Contact profile={data.profile} />
      </main>

      <Footer profile={data.profile} />
    </div>
  );
};
