'use client';

import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  Icon: LucideIcon;
  className?: string;
  size?: number;
}

export function IconWrapper({ Icon, className, size, ...props }: IconWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder div with the same dimensions during SSR
    return <div className={className} style={{ width: size || 24, height: size || 24 }} />;
  }

  return <Icon className={className} size={size} {...props} />;
}
