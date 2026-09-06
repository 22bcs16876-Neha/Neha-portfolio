import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Mail, 
  Send, 
  Smartphone, 
  Globe, 
  CheckCircle2, 
  Download,
  MapPin
} from 'lucide-react';
import { resolveAssetUrl } from '../../utils/assets';
import { useToast } from '../../context/ToastContext';

export const ShareProfileModal = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const { addToast } = useToast();

  const name = profile?.fullName || '';
  const title = profile?.title || '';
  const location = profile?.location || '';
  const roleBadge = profile?.roleBadge || '';
  const avatarUrl = resolveAssetUrl(profile?.avatarUrl) || '/default-avatar.svg';

  // Compute canonical share URL
  const shareUrl = typeof window !== 'undefined'
    ? (window.location.origin + window.location.pathname).replace(/\/+$/, '')
    : 'https://amitdevloper.netlify.app';

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !!navigator.share) {
      setHasNativeShare(true);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (addToast) {
        addToast('Profile link copied to clipboard!');
      }
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const shareData = {
          title: name ? `${name} | Portfolio` : 'Portfolio',
          text: name && title ? `Explore ${name}'s Portfolio — ${title}` : (name ? `Explore ${name}'s Portfolio` : 'Explore Portfolio'),
          url: shareUrl,
        };

        await navigator.share(shareData);
        if (addToast) {
          addToast('Profile shared successfully!');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error with native share:', err);
        }
      }
    }
  };

  // Social share destination URLs
  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.761.82 2.79.82h.002c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.769-5.766zm3.376 8.207c-.145.407-.847.776-1.183.824-.316.046-.723.076-2.316-.549-1.898-.745-3.119-2.678-3.214-2.802-.094-.125-.765-1.018-.765-1.942 0-.924.484-1.379.656-1.567.172-.188.375-.235.5-.235.125 0 .25.002.359.007.116.005.27-.044.422.321.156.375.531 1.297.578 1.391.047.094.078.203.016.328-.063.125-.094.203-.188.312-.094.109-.198.245-.282.328-.094.094-.192.196-.083.383.109.187.485.8 1.039 1.293.714.636 1.315.833 1.503.927.188.094.297.078.406-.047.109-.125.469-.547.594-.734.125-.187.25-.156.422-.094.172.062 1.094.516 1.281.609.188.094.313.141.359.219.047.078.047.453-.098.86z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.499 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.511-4.588-1.385l-.329-.219-2.946.83.844-2.87-.238-.344C3.774 14.805 3.25 13.447 3.25 12c0-4.825 3.925-8.75 8.75-8.75s8.75 3.925 8.75 8.75-3.925 8.75-8.75 8.75z"/>
        </svg>
      ),
      color: '#25D366',
      bg: 'rgba(37, 211, 102, 0.1)',
      border: 'rgba(37, 211, 102, 0.25)',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${name ? `${name}'s Portfolio` : 'Portfolio'}:\n${shareUrl}`)}`,
      action: 'Share on WhatsApp',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
        </svg>
      ),
      color: '#0A66C2',
      bg: 'rgba(10, 102, 194, 0.1)',
      border: 'rgba(10, 102, 194, 0.25)',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      action: 'Share on LinkedIn',
    },
    {
      name: 'X (Twitter)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'var(--text-primary)',
      bg: 'var(--bg-subtle)',
      border: 'var(--border-subtle)',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${name ? `${name}'s Portfolio` : 'Portfolio'}${title ? ` — ${title}` : ''}`)}&url=${encodeURIComponent(shareUrl)}`,
      action: 'Share on X',
    },
    {
      name: 'Telegram',
      icon: <Send size={18} />,
      color: '#229ED9',
      bg: 'rgba(34, 158, 217, 0.1)',
      border: 'rgba(34, 158, 217, 0.25)',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${name ? `${name} - Portfolio` : 'Portfolio'}`)}`,
      action: 'Share on Telegram',
    },
    {
      name: 'Email',
      icon: <Mail size={18} />,
      color: 'var(--accent-blue)',
      bg: 'var(--accent-blue-subtle)',
      border: 'var(--border-subtle)',
      url: `mailto:?subject=${encodeURIComponent(`${name ? `${name} - Portfolio` : 'Portfolio'}`)}&body=${encodeURIComponent(`Hi,\n\nI wanted to share ${name ? `${name}'s` : 'this'} portfolio with you:\n\n${shareUrl}\n\n${title ? `Title: ${title}\n` : ''}`)}`,
      action: 'Share via Email',
    },
  ];

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(shareUrl)}&margin=8`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Portfolio Profile"
      maxWidth="520px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Profile Identity Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.875rem 1rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <img
            src={avatarUrl}
            alt={name}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--border-strong)',
              flexShrink: 0,
            }}
            onError={(e) => {
              e.target.src = '/default-avatar.svg';
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                {name}
              </span>
              {roleBadge && (
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--accent-blue)',
                    backgroundColor: 'var(--accent-blue-subtle)',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {roleBadge}
                </span>
              )}
            </div>
            {title && (
              <div
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.15rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={title}
              >
                {title}
              </div>
            )}
            {location && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  marginTop: '0.2rem',
                }}
              >
                <MapPin size={12} />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Primary Action 1: Native System Share (Mobile / Modern Desktop) */}
        {hasNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="btn btn-primary"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            <Smartphone size={16} />
            <span>Open Device Share Sheet</span>
          </button>
        )}

        {/* Primary Action 2: 1-Click Copy Link Box */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
              marginBottom: '0.35rem',
            }}
          >
            Portfolio Direct Link
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}
          >
            <input
              type="text"
              readOnly
              value={shareUrl}
              onClick={(e) => e.target.select()}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                padding: '0.65rem 0.85rem',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                width: '100%',
              }}
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: 0,
                borderLeft: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                flexShrink: 0,
                height: '100%',
                padding: '0 1rem',
                backgroundColor: copied ? 'var(--accent-emerald-subtle)' : 'var(--bg-subtle)',
                color: copied ? 'var(--accent-emerald)' : 'var(--text-primary)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {copied ? (
                <>
                  <Check size={15} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Grid */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
            }}
          >
            Share Directly via Social & Apps
          </label>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = link.bg;
                  e.currentTarget.style.borderColor = link.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
                title={link.action}
              >
                <span style={{ color: link.color, display: 'flex', alignItems: 'center' }}>
                  {link.icon}
                </span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {link.name}
                </span>
                <ExternalLink size={12} color="var(--text-muted)" />
              </a>
            ))}
          </div>
        </div>

        {/* QR Code Section Toggle */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.55rem 0.75rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <QrCode size={16} color="var(--accent-blue)" />
              <span>{showQr ? 'Hide Profile QR Code' : 'Show Profile QR Code (Scan with Mobile)'}</span>
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {showQr ? '▲' : '▼'}
            </span>
          </button>

          {showQr && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-strong)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.85rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  padding: '0.65rem',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <img
                  src={qrImageUrl}
                  alt={`QR Code for ${name}'s portfolio`}
                  style={{ width: '180px', height: '180px', display: 'block' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, maxWidth: '280px' }}>
                Open your phone's camera app to scan this QR code and view this portfolio immediately.
              </p>
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};
