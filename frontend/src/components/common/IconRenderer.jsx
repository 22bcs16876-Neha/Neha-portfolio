import React from 'react';
import * as Icons from 'lucide-react';

export const IconRenderer = ({ name, size = 18, color, className = '' }) => {
  if (!name) {
    const Fallback = Icons.Code;
    return <Fallback size={size} color={color} className={className} />;
  }

  // Look up icon from Lucide
  const Component = Icons[name] || Icons[name.charAt(0).toUpperCase() + name.slice(1)];

  if (Component) {
    return <Component size={size} color={color} className={className} />;
  }

  const Fallback = Icons.Sparkles;
  return <Fallback size={size} color={color} className={className} />;
};
