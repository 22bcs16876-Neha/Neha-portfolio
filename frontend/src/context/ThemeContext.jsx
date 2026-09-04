import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [portalDefault, setPortalDefault] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('portfolio_theme_user_override', 'true');
      return next;
    });
  };

  const applyPortalDefault = (defaultTheme) => {
    if (!defaultTheme) return;
    const sanitized = defaultTheme.toLowerCase() === 'dark' || defaultTheme.toLowerCase() === 'black' ? 'dark' : 'light';
    setPortalDefault(sanitized);
    const hasUserOverride = localStorage.getItem('portfolio_theme_user_override') === 'true';
    if (!hasUserOverride) {
      setTheme(sanitized);
    }
  };

  const setExplicitTheme = (newTheme) => {
    const sanitized = newTheme.toLowerCase() === 'dark' || newTheme.toLowerCase() === 'black' ? 'dark' : 'light';
    setTheme(sanitized);
    setPortalDefault(sanitized);
    localStorage.removeItem('portfolio_theme_user_override'); // Clear override so portal default is adopted
    localStorage.setItem('portfolio_theme', sanitized);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, portalDefault, applyPortalDefault, setExplicitTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
