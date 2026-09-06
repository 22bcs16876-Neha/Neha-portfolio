import { resolveAssetUrl } from './assets';

/**
 * Generates a dynamic circular monogram favicon (e.g. "AK") on a canvas
 * when no profile picture is uploaded or while loading.
 */
function createMonogramFavicon(name = '') {
  try {
    const trimmed = (name || '').trim();
    if (!trimmed) {
      return '/default-avatar.svg';
    }

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '/default-avatar.svg';

    // Outer background circle
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    // Accent border
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#2563eb';
    ctx.stroke();

    // Get initials (up to 2 chars)
    const parts = trimmed.split(/\s+/).filter(Boolean);
    let initials = '';
    if (parts.length >= 2) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }

    // Monogram text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 32, 34);

    return canvas.toDataURL('image/png');
  } catch (e) {
    return '/default-avatar.svg';
  }
}

/**
 * Sets the browser favicon by replacing the <link rel="icon"> in <head>
 * to force Chrome/Firefox/Edge to immediately re-render the tab icon.
 */
function setFaviconHref(href) {
  if (!href || typeof document === 'undefined') return;

  const head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return;

  // Remove existing favicon links to bust browser tab caching
  const existingLinks = document.querySelectorAll("link[rel*='icon']");
  existingLinks.forEach((el) => el.parentNode?.removeChild(el));

  // Create fresh link tag
  const newLink = document.createElement('link');
  newLink.rel = 'icon';
  newLink.type = href.startsWith('data:image/svg') ? 'image/svg+xml' : 'image/png';
  newLink.href = href;
  head.appendChild(newLink);
}

/**
 * Synchronizes browser tab branding (Title and Favicon) to the current profile.
 * Name and picture update in real-time as the profile changes.
 */
export function updateTabBranding(profile) {
  if (typeof document === 'undefined' || !profile) return;

  // 1. Update Browser Tab Title
  const name = (profile.fullName || '').trim();
  const role = (profile.title || '').trim();

  if (name && role) {
    document.title = `${name} | ${role}`;
  } else if (name) {
    document.title = `${name} | Portfolio`;
  } else if (role) {
    document.title = `Portfolio | ${role}`;
  } else {
    document.title = 'Portfolio';
  }

  // 2. Resolve avatar source URL
  const rawAvatar = profile.avatarUrl;
  const avatarSrc = resolveAssetUrl(rawAvatar);

  // If no avatar is configured, generate clean monogram favicon immediately
  if (!avatarSrc || avatarSrc.trim() === '') {
    if (name) {
      const monogram = createMonogramFavicon(name);
      setFaviconHref(monogram);
    } else {
      setFaviconHref('/default-avatar.svg');
    }
    return;
  }

  // If avatar is already a data URI, clip and render into circular favicon
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = avatarSrc;

  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setFaviconHref(avatarSrc);
        return;
      }

      // Circular clip
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      // Draw avatar image centered to fill
      ctx.drawImage(img, 0, 0, 64, 64);

      // Add a crisp accent ring
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2, true);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#2563eb';
      ctx.stroke();

      const circularFavicon = canvas.toDataURL('image/png');
      setFaviconHref(circularFavicon);
    } catch (err) {
      // If canvas is tainted due to CORS on external domain, fallback to direct image url
      setFaviconHref(avatarSrc);
    }
  };

  img.onerror = () => {
    // If image fails to load, fallback to personalized monogram
    const monogram = createMonogramFavicon(name);
    setFaviconHref(monogram);
  };

  // 3. Synchronize Open Graph & Twitter Social Sharing Metadata
  try {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://amitdevloper.netlify.app';
    const displayTitle = name && role ? `${name} | ${role}` : (name ? `${name} | Portfolio` : 'Portfolio');
    const displayDesc = (profile.shortAbout || profile.bio || profile.tagline || (name ? `${name}'s Portfolio` : 'Portfolio')).substring(0, 200);

    const setMetaTag = (selector, attrName, value) => {
      if (!value || typeof document === 'undefined') return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const match = selector.match(/meta\[([a-zA-Z0-9_\-]+)=['"]([^'"]+)['"]\]/);
        if (match) {
          el.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attrName, value);
    };

    setMetaTag("meta[property='og:title']", 'content', displayTitle);
    setMetaTag("meta[name='twitter:title']", 'content', displayTitle);
    setMetaTag("meta[property='og:description']", 'content', displayDesc);
    setMetaTag("meta[name='twitter:description']", 'content', displayDesc);

    let socialImg = `${siteUrl}/profile-preview.png`;
    if (avatarSrc && avatarSrc.startsWith('http')) {
      socialImg = avatarSrc;
    } else if (avatarSrc && !avatarSrc.startsWith('data:')) {
      socialImg = `${siteUrl}${avatarSrc}`;
    }

    setMetaTag("meta[property='og:image']", 'content', socialImg);
    setMetaTag("meta[property='og:image:secure_url']", 'content', socialImg);
    setMetaTag("meta[name='twitter:image']", 'content', socialImg);
  } catch (e) {}
}
