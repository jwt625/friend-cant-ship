import React from 'react';
import type { StorySection as StorySectionType } from '../data/storyContent';
import './StorySection.css';

interface Props {
  section: StorySectionType;
  name: string;
  isVisible: boolean;
  theme: {
    text: string;
    accent: string;
    muted: string;
    isSimple: boolean;
  };
}

export const StorySection: React.FC<Props> = ({ section, name, isVisible, theme }) => {
  const content = typeof section.content === 'function' 
    ? section.content(name) 
    : section.content;

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
    return (
      <div className={getClassName()} style={style}>
        <div className="chat-bubble">
          <span className="chat-text">{content}</span>
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

