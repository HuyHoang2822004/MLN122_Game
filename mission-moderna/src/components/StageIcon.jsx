import { motion } from 'framer-motion';

// Stage icons as clean SVG paths
const StageIcon = ({ type, size = 24, color = 'currentColor' }) => {
  const s = size;
  switch (type) {
    case 'flask':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6M9 3v6l-4 9a1 1 0 0 0 .9 1.45h10.2A1 1 0 0 0 23 18l-4-9V3" />
          <path d="M8 15h8" />
        </svg>
      );
    case 'dollar':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-2.5 2s-2.5.5-2.5 2a2.5 2.5 0 0 0 5 0" />
        </svg>
      );
    case 'shield':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 4v5c0 4.5-3.5 8.7-8 10C7.5 20.7 4 16.5 4 12V7z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'file':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
      );
    case 'factory':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20V8l5-3v3l5-3v3l5-3v15H2z" />
          <path d="M22 20V4l-5 4" />
          <rect x="5" y="15" width="3" height="5" rx="0.5" />
          <rect x="10" y="15" width="3" height="5" rx="0.5" />
          <line x1="5" y1="12" x2="5" y2="13" />
          <line x1="10" y1="12" x2="10" y2="13" />
        </svg>
      );
    case 'people':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="7" r="3" />
          <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="7" r="3" />
          <path d="M14.5 20c0-2.5 1.1-4.7 2.5-6" />
        </svg>
      );
    case 'lock':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'check':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case 'star':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return null;
  }
};

export default StageIcon;
