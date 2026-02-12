export interface ColorTheme {
  background: string;
  backgroundGradient: string;
  text: string;
  accent: string;
  muted: string;
}

// Time of day themes
export const timeThemes = {
  dawn: {
    background: '#1a1a2e',
    backgroundGradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #e94560 100%)',
    text: '#eee2dc',
    accent: '#e94560',
    muted: '#ac3b61',
  },
  morning: {
    background: '#fff8e7',
    backgroundGradient: 'linear-gradient(180deg, #87ceeb 0%, #fff8e7 50%, #fffef0 100%)',
    text: '#2c3e50',
    accent: '#f39c12',
    muted: '#95a5a6',
  },
  afternoon: {
    background: '#fffef0',
    backgroundGradient: 'linear-gradient(180deg, #87ceeb 0%, #fffef0 100%)',
    text: '#2c3e50',
    accent: '#3498db',
    muted: '#7f8c8d',
  },
  evening: {
    background: '#2c3e50',
    backgroundGradient: 'linear-gradient(180deg, #e74c3c 0%, #9b59b6 30%, #2c3e50 100%)',
    text: '#ecf0f1',
    accent: '#e74c3c',
    muted: '#9b59b6',
  },
  night: {
    background: '#0d0d0d',
    backgroundGradient: 'linear-gradient(180deg, #1a1a2e 0%, #0d0d0d 100%)',
    text: '#f5f5f5',
    accent: '#6366f1',
    muted: '#4b5563',
  },
};

// Season color accents
export const seasonAccents = {
  spring: { accent: '#10b981', particles: '#86efac' }, // Green
  summer: { accent: '#f59e0b', particles: '#fcd34d' }, // Golden
  fall: { accent: '#ea580c', particles: '#fb923c' },   // Orange
  winter: { accent: '#6366f1', particles: '#a5b4fc' }, // Cool blue
};

// Phase-specific styles (overrides time-based)
export const phaseStyles = {
  opening: {
    simple: true,
    background: '#0a0a0a',
    text: '#fafafa',
  },
  mockery: {
    simple: false,
    saturation: 0.7,
  },
  chaos: {
    simple: false,
    saturation: 1.0,
    animated: true,
  },
  philosophy: {
    simple: false,
    saturation: 0.5,
    muted: true,
  },
  inspiration: {
    simple: false,
    saturation: 0.8,
  },
  closing: {
    simple: true,
    background: '#0a0a0a',
    text: '#fafafa',
  },
};

export function getThemeForProgress(
  progress: number,
  phase: string,
  timeOfDay: string,
  season: string
): ColorTheme & { isSimple: boolean } {
  const phaseStyle = phaseStyles[phase as keyof typeof phaseStyles];
  const timeTheme = timeThemes[timeOfDay as keyof typeof timeThemes] || timeThemes.morning;
  const seasonAccent = seasonAccents[season as keyof typeof seasonAccents] || seasonAccents.spring;

  if (phaseStyle?.simple) {
    return {
      background: phaseStyle.background || '#0a0a0a',
      backgroundGradient: phaseStyle.background || '#0a0a0a',
      text: phaseStyle.text || '#fafafa',
      accent: '#fafafa',
      muted: '#666666',
      isSimple: true,
    };
  }

  return {
    ...timeTheme,
    accent: seasonAccent.accent,
    isSimple: false,
  };
}

