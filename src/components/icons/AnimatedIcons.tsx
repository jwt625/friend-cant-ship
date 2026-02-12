import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  progress?: number; // 0-1 scroll progress within the phase
  intensity?: number; // 0-1 how intense the animation should be
}

// Calendar with flipping pages - for Mockery phase
export const CalendarIcon: React.FC<IconProps> = ({ 
  size = 200, 
  color = 'currentColor', 
  className,
  progress = 0,
  intensity = 0.5
}) => {
  // Pages flip based on progress
  const pageFlip = (progress * 360 * 3) % 360; // 3 full rotations through the phase
  const tearOffset = Math.sin(progress * Math.PI * 4) * 10;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 120" 
      fill="none" 
      className={className}
      style={{ filter: `drop-shadow(0 0 ${10 * intensity}px ${color})` }}
    >
      {/* Calendar base */}
      <rect x="10" y="25" width="80" height="85" rx="4" fill={color} opacity="0.15" stroke={color} strokeWidth="2"/>
      
      {/* Calendar rings */}
      <circle cx="25" cy="25" r="4" fill={color} opacity="0.6"/>
      <circle cx="50" cy="25" r="4" fill={color} opacity="0.6"/>
      <circle cx="75" cy="25" r="4" fill={color} opacity="0.6"/>
      <rect x="23" y="15" width="4" height="15" rx="2" fill={color} opacity="0.8"/>
      <rect x="48" y="15" width="4" height="15" rx="2" fill={color} opacity="0.8"/>
      <rect x="73" y="15" width="4" height="15" rx="2" fill={color} opacity="0.8"/>
      
      {/* Month header */}
      <rect x="15" y="35" width="70" height="15" rx="2" fill={color} opacity="0.3"/>
      
      {/* Date grid */}
      {[0, 1, 2, 3, 4, 5, 6].map((col) =>
        [0, 1, 2, 3].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={18 + col * 10}
            y={55 + row * 12}
            width="8"
            height="10"
            rx="1"
            fill={color}
            opacity={0.1 + (Math.random() * 0.2)}
          />
        ))
      )}
      
      {/* X marks on passed dates */}
      {Array.from({ length: Math.floor(progress * 15) }).map((_, i) => (
        <g key={`x-${i}`} opacity={0.7}>
          <line
            x1={20 + (i % 7) * 10}
            y1={57 + Math.floor(i / 7) * 12}
            x2={24 + (i % 7) * 10}
            y2={63 + Math.floor(i / 7) * 12}
            stroke="#ff4444"
            strokeWidth="1.5"
          />
          <line
            x1={24 + (i % 7) * 10}
            y1={57 + Math.floor(i / 7) * 12}
            x2={20 + (i % 7) * 10}
            y2={63 + Math.floor(i / 7) * 12}
            stroke="#ff4444"
            strokeWidth="1.5"
          />
        </g>
      ))}
      
      {/* Flipping page effect */}
      <g style={{ 
        transformOrigin: '50px 30px', 
        transform: `perspective(200px) rotateX(${pageFlip}deg)`,
        opacity: Math.abs(Math.cos(pageFlip * Math.PI / 180)) * 0.5
      }}>
        <rect x="12" y="27" width="76" height="40" rx="2" fill={color} opacity="0.2"/>
      </g>
      
      {/* Torn page pieces flying off */}
      <g style={{ 
        transform: `translate(${tearOffset}px, ${-Math.abs(tearOffset)}px) rotate(${tearOffset * 2}deg)`,
        opacity: intensity * 0.4
      }}>
        <path d="M70 30 L85 25 L80 45 Z" fill={color} opacity="0.3"/>
      </g>
    </svg>
  );
};

// Empty Theater - for Philosophy phase  
export const TheaterIcon: React.FC<IconProps> = ({ 
  size = 300, 
  color = 'currentColor', 
  className,
  progress = 0,
  intensity = 0.3
}) => {
  // Chairs fade in/out based on progress
  const visibleChairs = Math.floor((1 - progress) * 25); // Chairs disappear as you scroll
  
  return (
    <svg 
      width={size} 
      height={size * 0.6} 
      viewBox="0 0 200 120" 
      fill="none" 
      className={className}
      style={{ filter: `drop-shadow(0 0 ${5 * intensity}px ${color})` }}
    >
      {/* Stage */}
      <ellipse cx="100" cy="100" rx="90" ry="15" fill={color} opacity="0.1"/>
      <rect x="20" y="85" width="160" height="20" fill={color} opacity="0.15"/>
      
      {/* Spotlight */}
      <ellipse 
        cx="100" 
        cy="90" 
        rx={20 + progress * 10} 
        ry={8 + progress * 4} 
        fill={color} 
        opacity={0.2 + progress * 0.2}
      />
      
      {/* Curtains */}
      <path d="M5 0 Q15 40 10 80 L0 80 L0 0 Z" fill={color} opacity="0.2"/>
      <path d="M195 0 Q185 40 190 80 L200 80 L200 0 Z" fill={color} opacity="0.2"/>
      
      {/* Rows of chairs - 5 rows, 5 chairs each */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4].map((col) => {
          const chairIndex = row * 5 + col;
          const isVisible = chairIndex < visibleChairs;
          const xPos = 40 + col * 30 - row * 5;
          const yPos = 20 + row * 12;
          const chairOpacity = isVisible ? 0.3 - row * 0.04 : 0;
          
          return (
            <g 
              key={`chair-${row}-${col}`} 
              style={{ 
                opacity: chairOpacity,
                transition: 'opacity 0.5s ease'
              }}
            >
              {/* Chair back */}
              <rect x={xPos} y={yPos} width="12" height="8" rx="1" fill={color}/>
              {/* Chair seat */}
              <rect x={xPos - 1} y={yPos + 7} width="14" height="4" rx="1" fill={color} opacity="0.7"/>
            </g>
          );
        })
      )}
      

    </svg>
  );
};

// Time Vortex / Spinning Clock - for Chaos phase (most intense)
export const TimeVortexIcon: React.FC<IconProps> = ({
  size = 300,
  color = 'currentColor',
  className,
  progress = 0,
  intensity = 1
}) => {
  // Clock hands spin faster as intensity increases
  const hourRotation = progress * 360 * 5; // 5 full rotations
  const minuteRotation = progress * 360 * 20; // 20 full rotations
  const secondRotation = progress * 360 * 60; // 60 full rotations

  // Vortex spiral effect
  const spiralCount = 5;
  const spirals = Array.from({ length: spiralCount }).map((_, i) => {
    const baseAngle = (i / spiralCount) * 360 + progress * 720;
    const radius = 30 + i * 15;
    return { angle: baseAngle, radius };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      style={{
        filter: `drop-shadow(0 0 ${20 * intensity}px ${color}) blur(${intensity * 0.5}px)`,
      }}
    >
      {/* Outer vortex rings */}
      {spirals.map((spiral, i) => (
        <circle
          key={`ring-${i}`}
          cx="100"
          cy="100"
          r={spiral.radius}
          stroke={color}
          strokeWidth={1 + i * 0.5}
          fill="none"
          opacity={0.1 + (i * 0.05)}
          style={{
            transformOrigin: '100px 100px',
            transform: `rotate(${spiral.angle}deg)`,
          }}
          strokeDasharray={`${10 + i * 5} ${20 + i * 10}`}
        />
      ))}

      {/* Clock face */}
      <circle cx="100" cy="100" r="60" stroke={color} strokeWidth="3" fill="none" opacity="0.3"/>
      <circle cx="100" cy="100" r="55" stroke={color} strokeWidth="1" fill="none" opacity="0.15"/>

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 100 + Math.cos(angle) * 50;
        const y1 = 100 + Math.sin(angle) * 50;
        const x2 = 100 + Math.cos(angle) * 55;
        const y2 = 100 + Math.sin(angle) * 55;
        return (
          <line
            key={`marker-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={i % 3 === 0 ? 3 : 1}
            opacity={0.5}
          />
        );
      })}

      {/* Hour hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="60"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
        style={{
          transformOrigin: '100px 100px',
          transform: `rotate(${hourRotation}deg)`,
        }}
      />

      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="50"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
        style={{
          transformOrigin: '100px 100px',
          transform: `rotate(${minuteRotation}deg)`,
        }}
      />

      {/* Second hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="45"
        stroke="#ff6b6b"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6 + intensity * 0.4}
        style={{
          transformOrigin: '100px 100px',
          transform: `rotate(${secondRotation}deg)`,
        }}
      />

      {/* Center dot */}
      <circle cx="100" cy="100" r="5" fill={color} opacity="0.8"/>

      {/* Chaos particles orbiting */}
      {Array.from({ length: 8 }).map((_, i) => {
        const orbitAngle = ((i / 8) * 360 + progress * 540) * (Math.PI / 180);
        const orbitRadius = 70 + Math.sin(progress * Math.PI * 4 + i) * 10;
        const x = 100 + Math.cos(orbitAngle) * orbitRadius;
        const y = 100 + Math.sin(orbitAngle) * orbitRadius;
        return (
          <circle
            key={`particle-${i}`}
            cx={x}
            cy={y}
            r={2 + (i % 3)}
            fill={color}
            opacity={0.3 + (i % 4) * 0.1}
          />
        );
      })}

      {/* Flying calendar pages (debris) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const flyAngle = ((i / 4) * 360 + progress * 300) * (Math.PI / 180);
        const flyRadius = 80 + progress * 20;
        const x = 100 + Math.cos(flyAngle) * flyRadius;
        const y = 100 + Math.sin(flyAngle) * flyRadius;
        const rotation = progress * 720 + i * 90;
        return (
          <rect
            key={`page-${i}`}
            x={x - 5}
            y={y - 7}
            width="10"
            height="14"
            rx="1"
            fill={color}
            opacity={0.2 + intensity * 0.2}
            style={{
              transformOrigin: `${x}px ${y}px`,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        );
      })}
    </svg>
  );
};

