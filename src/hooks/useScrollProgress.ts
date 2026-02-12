import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// Get which "phase" we're in based on scroll progress
export type Phase = 'opening' | 'mockery' | 'chaos' | 'philosophy' | 'inspiration' | 'closing';

export function getPhase(progress: number): Phase {
  if (progress < 0.05) return 'opening';
  if (progress < 0.25) return 'mockery';
  if (progress < 0.50) return 'chaos';
  if (progress < 0.75) return 'philosophy';
  if (progress < 0.95) return 'inspiration';
  return 'closing';
}

// Get time of day based on progress (0-1 maps to 6am-6am next day)
export function getTimeOfDay(progress: number): {
  hour: number;
  period: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
} {
  // Map progress to 24 hours starting at 6am
  const hour = Math.floor((progress * 24 + 6) % 24);
  
  let period: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  if (hour >= 5 && hour < 8) period = 'dawn';
  else if (hour >= 8 && hour < 12) period = 'morning';
  else if (hour >= 12 && hour < 17) period = 'afternoon';
  else if (hour >= 17 && hour < 21) period = 'evening';
  else period = 'night';

  return { hour, period };
}

// Get season based on progress
export function getSeason(progress: number): 'spring' | 'summer' | 'fall' | 'winter' {
  const seasonIndex = Math.floor(progress * 4) % 4;
  return (['spring', 'summer', 'fall', 'winter'] as const)[seasonIndex];
}

