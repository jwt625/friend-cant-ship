import React from 'react';
import { SunriseIcon, SunIcon, SunsetIcon, MoonIcon, StarsIcon, SpringIcon, SummerIcon, FallIcon, WinterIcon } from './icons/TimeIcons';
import './Background.css';

interface Props {
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  backgroundGradient: string;
  accent: string;
  isSimple: boolean;
  progress: number;
}

export const Background: React.FC<Props> = ({ 
  timeOfDay, 
  season, 
  backgroundGradient, 
  accent, 
  isSimple,
  progress 
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
      
      {/* Floating particles for chaos phase */}
      <div className="background__particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              backgroundColor: accent,
              opacity: 0.1 + (i % 5) * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  );
};

