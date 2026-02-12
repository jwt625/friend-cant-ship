import React from 'react';
import { SunriseIcon, SunIcon, SunsetIcon, MoonIcon, StarsIcon, SpringIcon, SummerIcon, FallIcon, WinterIcon } from './icons/TimeIcons';
import { CalendarIcon, TheaterIcon, TimeVortexIcon } from './icons/AnimatedIcons';
import './Background.css';

type Phase = 'opening' | 'mockery' | 'chaos' | 'philosophy' | 'inspiration' | 'closing';

interface Props {
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  backgroundGradient: string;
  accent: string;
  isSimple: boolean;
  progress: number;
  phase?: Phase;
}

export const Background: React.FC<Props> = ({
  timeOfDay,
  season,
  backgroundGradient,
  accent,
  isSimple,
  progress,
  phase = 'opening'
}) => {
  const getTimeIcon = () => {
    const iconProps = { size: 64, color: accent, className: 'time-icon' };
    switch (timeOfDay) {
      case 'dawn': return <SunriseIcon {...iconProps} />;
      case 'morning': return <SunIcon {...iconProps} />;
      case 'afternoon': return <SunIcon {...iconProps} />;
      case 'evening': return <SunsetIcon {...iconProps} />;
      case 'night': return <><MoonIcon {...iconProps} /><StarsIcon {...iconProps} /></>;
    }
  };

  const getSeasonIcon = () => {
    const iconProps = { size: 48, color: accent, className: 'season-icon' };
    switch (season) {
      case 'spring': return <SpringIcon {...iconProps} />;
      case 'summer': return <SummerIcon {...iconProps} />;
      case 'fall': return <FallIcon {...iconProps} />;
      case 'winter': return <WinterIcon {...iconProps} />;
    }
  };

  // Calculate phase-specific progress (0-1 within each phase)
  const getPhaseProgress = (): number => {
    if (progress < 0.05) return progress / 0.05; // opening
    if (progress < 0.25) return (progress - 0.05) / 0.20; // mockery
    if (progress < 0.50) return (progress - 0.25) / 0.25; // chaos
    if (progress < 0.75) return (progress - 0.50) / 0.25; // philosophy
    if (progress < 0.95) return (progress - 0.75) / 0.20; // inspiration
    return (progress - 0.95) / 0.05; // closing
  };

  // Calculate intensity - ramps up through chaos, then down
  const getIntensity = (): number => {
    if (phase === 'opening' || phase === 'closing') return 0;
    if (phase === 'mockery') return 0.3 + getPhaseProgress() * 0.3; // 0.3 -> 0.6
    if (phase === 'chaos') return 0.6 + getPhaseProgress() * 0.4; // 0.6 -> 1.0 (peak)
    if (phase === 'philosophy') return 0.5 - getPhaseProgress() * 0.3; // 0.5 -> 0.2
    if (phase === 'inspiration') return 0.2 - getPhaseProgress() * 0.15; // 0.2 -> 0.05
    return 0;
  };

  const phaseProgress = getPhaseProgress();
  const intensity = getIntensity();

  // Calculate calendar animation - flies in from left, exits right
  const getCalendarTransform = (): string => {
    if (phase !== 'mockery') return 'translateX(-150%)';
    // Enter from left (0-30%), stay (30-70%), exit right (70-100%)
    if (phaseProgress < 0.3) {
      const enterProgress = phaseProgress / 0.3;
      return `translateX(${-150 + enterProgress * 150}%)`;
    }
    if (phaseProgress < 0.7) {
      return 'translateX(0%)';
    }
    const exitProgress = (phaseProgress - 0.7) / 0.3;
    return `translateX(${exitProgress * 150}%)`;
  };

  // Calculate theater animation - fades in during philosophy
  const getTheaterOpacity = (): number => {
    if (phase !== 'philosophy') return 0;
    // Fade in during first 30%, stay visible
    if (phaseProgress < 0.3) return phaseProgress / 0.3;
    return 1;
  };

  // Calculate vortex animation - scales up during chaos
  const getVortexTransform = (): string => {
    if (phase !== 'chaos') return 'scale(0)';
    // Scale from 0 to 1.2 with some wobble
    const scale = Math.min(1.2, phaseProgress * 1.5);
    const wobble = Math.sin(phaseProgress * Math.PI * 4) * 0.05;
    return `scale(${scale + wobble})`;
  };

  if (isSimple) {
    return (
      <div
        className="background background--simple"
        style={{ background: backgroundGradient }}
      />
    );
  }

  return (
    <div
      className="background"
      style={{ background: backgroundGradient }}
    >
      <div className="background__icons">
        <div className="background__time-icon" style={{
          top: `${20 + Math.sin(progress * Math.PI) * 30}%`,
          opacity: 0.3 + progress * 0.2
        }}>
          {getTimeIcon()}
        </div>
        <div className="background__season-icon">
          {getSeasonIcon()}
        </div>
      </div>

      {/* Phase-specific animated icons */}

      {/* Calendar - Mockery phase */}
      <div
        className="background__calendar"
        style={{
          transform: getCalendarTransform(),
          opacity: phase === 'mockery' ? 0.8 : 0,
        }}
      >
        <CalendarIcon
          size={180}
          color={accent}
          progress={phaseProgress}
          intensity={intensity}
        />
      </div>

      {/* Time Vortex - Chaos phase */}
      <div
        className="background__vortex"
        style={{
          transform: getVortexTransform(),
          opacity: phase === 'chaos' ? 0.6 + intensity * 0.3 : 0,
        }}
      >
        <TimeVortexIcon
          size={350}
          color={accent}
          progress={phaseProgress}
          intensity={intensity}
        />
      </div>

      {/* Empty Theater - Philosophy phase */}
      <div
        className="background__theater"
        style={{
          opacity: getTheaterOpacity() * 0.7,
        }}
      >
        <TheaterIcon
          size={400}
          color={accent}
          progress={phaseProgress}
          intensity={intensity}
        />
      </div>

      {/* Floating particles - intensity varies by phase */}
      <div className="background__particles" style={{ opacity: intensity }}>
        {Array.from({ length: Math.floor(20 + intensity * 30) }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${4 + (i % 4)}s`,
              backgroundColor: accent,
              opacity: 0.1 + (i % 5) * 0.05 * intensity,
              width: `${6 + intensity * 6}px`,
              height: `${6 + intensity * 6}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

