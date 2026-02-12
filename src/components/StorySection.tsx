import React, { useMemo } from 'react';
import type { StorySection as StorySectionType, Messenger } from '../data/storyContent';
import './StorySection.css';

interface Props {
  section: StorySectionType;
  isVisible: boolean;
  theme: {
    text: string;
    accent: string;
    muted: string;
    isSimple: boolean;
  };
}

// Messenger-specific styling info
const messengerStyles: Record<Messenger, { className: string }> = {
  imessage: { className: 'chat-bubble--imessage' },
  whatsapp: { className: 'chat-bubble--whatsapp' },
  signal: { className: 'chat-bubble--signal' },
  telegram: { className: 'chat-bubble--telegram' },
  sms: { className: 'chat-bubble--sms' },
};

// Procrastination-friendly time ranges (hours when people make excuses)
// - Late morning just woke up: 9-11 AM
// - After lunch slump: 1-3 PM
// - Evening avoidance: 7-9 PM
// - Late night too late to start: 11 PM - 2 AM
const PROCRASTINATION_HOURS = [
  9, 10, 11,           // Late morning - just woke up
  13, 14, 15,          // After lunch slump
  19, 20, 21,          // Evening avoidance
  23, 0, 1, 2          // Late night - too late to start
];

// Generate a random timestamp based on section id (deterministic per session)
const getRandomTimestamp = (sectionId: string, sessionSeed: number): string => {
  // Create a hash from section id and session seed
  const hash = sectionId.split('').reduce((acc, char, i) => {
    return acc + char.charCodeAt(0) * (i + 1) * sessionSeed;
  }, 0);

  // Generate random but plausible values
  const month = (hash % 12) + 1;
  const day = (hash % 28) + 1;
  const year = 2023 + (hash % 2); // 2023 or 2024

  // Pick from procrastination-friendly hours
  const hourIndex = hash % PROCRASTINATION_HOURS.length;
  const hour = PROCRASTINATION_HOURS[hourIndex];
  const minute = (hash * 7) % 60;

  // Format time (12-hour with AM/PM)
  const hour12 = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  const timeStr = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;

  // Format date (short)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${monthNames[month - 1]} ${day}, ${year}`;

  return `${dateStr} · ${timeStr}`;
};

// Get session seed (changes on hard refresh)
const getSessionSeed = (): number => {
  if (typeof window === 'undefined') return 1;
  let seed = sessionStorage.getItem('chat-timestamp-seed');
  if (!seed) {
    seed = Math.floor(Math.random() * 10000).toString();
    sessionStorage.setItem('chat-timestamp-seed', seed);
  }
  return parseInt(seed, 10);
};

export const StorySection: React.FC<Props> = ({ section, isVisible, theme }) => {
  const content = section.content;

  // Generate timestamp for chat messages
  const timestamp = useMemo(() => {
    if (section.type !== 'chat') return '';
    return getRandomTimestamp(section.id, getSessionSeed());
  }, [section.id, section.type]);

  const getClassName = () => {
    const classes = ['story-section'];
    classes.push(`story-section--${section.type}`);
    classes.push(`story-section--${section.phase}`);
    if (section.emphasis) classes.push(`story-section--${section.emphasis}`);
    if (isVisible) classes.push('story-section--visible');
    if (theme.isSimple) classes.push('story-section--simple');
    return classes.join(' ');
  };

  const style: React.CSSProperties = {
    color: section.type === 'stat' ? theme.accent : theme.text,
    '--accent-color': theme.accent,
    '--muted-color': theme.muted,
  } as React.CSSProperties;

  if (section.type === 'chat') {
    const messenger = section.messenger || 'imessage';
    const messengerStyle = messengerStyles[messenger];

    return (
      <div className={getClassName()} style={style}>
        <div className={`chat-bubble ${messengerStyle.className}`}>
          <span className="chat-tail"></span>
          <span className="chat-text">{content}</span>
          <span className="chat-timestamp">{timestamp}</span>
        </div>
      </div>
    );
  }

  if (section.type === 'stat') {
    const [label, value] = content.split(': ');
    return (
      <div className={getClassName()} style={style}>
        <div className="stat-container">
          <span className="stat-label">{label}:</span>
          <span className="stat-value">{value}</span>
        </div>
      </div>
    );
  }

  if (section.type === 'quote') {
    return (
      <div className={getClassName()} style={style}>
        <blockquote className="quote-text">{content}</blockquote>
      </div>
    );
  }

  return (
    <div className={getClassName()} style={style}>
      <p className="story-text">{content}</p>
    </div>
  );
};

