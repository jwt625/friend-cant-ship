import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const SunriseIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="17" r="4" fill={color} opacity="0.8" />
    <path d="M12 2v3M12 2l-1 1.5M12 2l1 1.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M4.22 10.22l2.12 2.12M19.78 10.22l-2.12 2.12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M1 17h3M20 17h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M2 21h20" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="5" fill={color} />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
          stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SunsetIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="17" r="4" fill={color} opacity="0.6" />
    <path d="M2 21h20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 8v3M12 8l-1 1.5M12 8l1 1.5" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <path d="M5 13l1.5 1.5M19 13l-1.5 1.5" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={color} />
  </svg>
);

export const StarsIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="6" cy="6" r="1.5" fill={color} />
    <circle cx="18" cy="8" r="1" fill={color} opacity="0.7" />
    <circle cx="14" cy="4" r="0.8" fill={color} opacity="0.5" />
    <circle cx="10" cy="10" r="1.2" fill={color} opacity="0.8" />
    <circle cx="20" cy="16" r="0.6" fill={color} opacity="0.4" />
    <path d="M12 15l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill={color} />
  </svg>
);

// Season icons
export const SpringIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22V8M12 8c-3-3-7-2-7 2s4 5 7 2M12 8c3-3 7-2 7 2s-4 5-7 2" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="12" cy="5" r="2" fill={color} />
  </svg>
);

export const SummerIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="6" fill={color} />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" 
          stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FallIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z" fill={color} opacity="0.8" />
    <path d="M12 6v10M9 9l3 3 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WinterIcon: React.FC<IconProps> = ({ size = 48, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2v20M2 12h20M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill={color} opacity="0.3" />
  </svg>
);

