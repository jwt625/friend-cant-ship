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

// Helper to parse hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// Helper to convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Interpolate between two colors
function lerpColor(color1: string, color2: string, t: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  return rgbToHex(
    c1.r + (c2.r - c1.r) * t,
    c1.g + (c2.g - c1.g) * t,
    c1.b + (c2.b - c1.b) * t
  );
}

// Interpolate between two gradients (simplified - just lerp the colors)
function lerpGradient(grad1: string, grad2: string, t: number): string {
  // Extract colors from gradient strings
  const extractColors = (grad: string): string[] => {
    const matches = grad.match(/#[a-fA-F0-9]{6}/g);
    return matches || ['#000000'];
  };

  const colors1 = extractColors(grad1);
  const colors2 = extractColors(grad2);

  // Interpolate each color pair
  const maxLen = Math.max(colors1.length, colors2.length);
  const interpolatedColors: string[] = [];

  for (let i = 0; i < maxLen; i++) {
    const c1 = colors1[Math.min(i, colors1.length - 1)];
    const c2 = colors2[Math.min(i, colors2.length - 1)];
    interpolatedColors.push(lerpColor(c1, c2, t));
  }

  // Reconstruct gradient
  if (interpolatedColors.length === 1) {
    return interpolatedColors[0];
  }
  const stops = interpolatedColors.map((c, i) =>
    `${c} ${Math.round((i / (interpolatedColors.length - 1)) * 100)}%`
  ).join(', ');
  return `linear-gradient(180deg, ${stops})`;
}

// Get time period and interpolation factor based on progress
function getTimeInterpolation(progress: number): {
  current: keyof typeof timeThemes;
  next: keyof typeof timeThemes;
  t: number
} {
  // Map progress to time periods with smooth transitions
  // 0-0.05: opening (simple), 0.05-0.25: mockery, 0.25-0.50: chaos, etc.
  const timeOrder: (keyof typeof timeThemes)[] = ['dawn', 'morning', 'afternoon', 'evening', 'night'];

  // Map progress (0.05-0.95) to time cycle
  const effectiveProgress = Math.max(0, Math.min(1, (progress - 0.05) / 0.9));
  const scaledProgress = effectiveProgress * (timeOrder.length - 1);
  const currentIndex = Math.floor(scaledProgress);
  const nextIndex = Math.min(currentIndex + 1, timeOrder.length - 1);
  const t = scaledProgress - currentIndex;

  return {
    current: timeOrder[currentIndex],
    next: timeOrder[nextIndex],
    t: t
  };
}

// Simple/stark theme for opening and closing
const simpleTheme = {
  background: '#0a0a0a',
  backgroundGradient: '#0a0a0a',
  text: '#fafafa',
  accent: '#fafafa',
  muted: '#666666',
};

export function getThemeForProgress(
  progress: number,
  phase: string,
  _timeOfDay: string,
  season: string
): ColorTheme & { isSimple: boolean } {
  const seasonAccent = seasonAccents[season as keyof typeof seasonAccents] || seasonAccents.spring;

  // Get interpolated time theme
  const { current, next, t } = getTimeInterpolation(progress);
  const currentTheme = timeThemes[current];
  const nextTheme = timeThemes[next];

  // Smooth cubic easing for more natural transitions
  const easedT = t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const interpolatedTheme = {
    background: lerpColor(currentTheme.background, nextTheme.background, easedT),
    backgroundGradient: lerpGradient(currentTheme.backgroundGradient, nextTheme.backgroundGradient, easedT),
    text: lerpColor(currentTheme.text, nextTheme.text, easedT),
    accent: seasonAccent.accent,
    muted: lerpColor(currentTheme.muted, nextTheme.muted, easedT),
  };

  // Handle opening phase: fade from black to first theme
  if (phase === 'opening') {
    // progress 0-0.05 maps to opening phase
    // Fade in the color theme as we approach the end of opening
    const openingProgress = progress / 0.05; // 0 to 1 within opening
    const fadeIn = Math.pow(openingProgress, 2); // Quadratic ease-in

    return {
      background: lerpColor(simpleTheme.background, interpolatedTheme.background, fadeIn),
      backgroundGradient: lerpGradient(simpleTheme.backgroundGradient, interpolatedTheme.backgroundGradient, fadeIn),
      text: lerpColor(simpleTheme.text, interpolatedTheme.text, fadeIn),
      accent: lerpColor(simpleTheme.accent, interpolatedTheme.accent, fadeIn),
      muted: lerpColor(simpleTheme.muted, interpolatedTheme.muted, fadeIn),
      isSimple: fadeIn < 0.3, // Only truly simple at the very start
    };
  }

  // Handle closing phase: fade to black
  if (phase === 'closing') {
    // progress 0.95-1.0 maps to closing phase
    const closingProgress = (progress - 0.95) / 0.05; // 0 to 1 within closing
    const fadeOut = Math.pow(closingProgress, 2); // Quadratic ease-in

    return {
      background: lerpColor(interpolatedTheme.background, simpleTheme.background, fadeOut),
      backgroundGradient: lerpGradient(interpolatedTheme.backgroundGradient, simpleTheme.backgroundGradient, fadeOut),
      text: lerpColor(interpolatedTheme.text, simpleTheme.text, fadeOut),
      accent: lerpColor(interpolatedTheme.accent, simpleTheme.accent, fadeOut),
      muted: lerpColor(interpolatedTheme.muted, simpleTheme.muted, fadeOut),
      isSimple: fadeOut > 0.7, // Become simple near the end
    };
  }

  return {
    ...interpolatedTheme,
    isSimple: false,
  };
}

