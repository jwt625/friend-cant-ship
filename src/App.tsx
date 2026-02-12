import { useEffect, useState } from 'react';
import { useScrollProgress, getPhase, getTimeOfDay, getSeason } from './hooks/useScrollProgress';
import { getThemeForProgress } from './theme/colorThemes';
import { storySections } from './data/storyContent';
import { StorySection } from './components/StorySection';
import { Background } from './components/Background';
import './App.css';

function App() {
  const progress = useScrollProgress();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['open-1']));

  const phase = getPhase(progress);
  const { period: timeOfDay } = getTimeOfDay(progress);
  const season = getSeason(progress);
  const theme = getThemeForProgress(progress, phase, timeOfDay, season);

  // Intersection observer for section visibility
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute('data-section-id');
            if (id && entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(id));
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
      );

      document.querySelectorAll('[data-section-id]').forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app" style={{ '--text-color': theme.text } as React.CSSProperties}>
      <Background
        timeOfDay={timeOfDay}
        season={season}
        backgroundGradient={theme.backgroundGradient}
        accent={theme.accent}
        isSimple={theme.isSimple}
        progress={progress}
        phase={phase}
      />

      <main className="story">
        {storySections.map((section) => (
          <div key={section.id} data-section-id={section.id}>
            <StorySection
              section={section}
              isVisible={visibleSections.has(section.id)}
              theme={theme}
            />
          </div>
        ))}
      </main>

      {/* Progress indicator */}
      <div
        className="progress-bar"
        style={{
          transform: `scaleX(${progress})`,
          backgroundColor: theme.accent
        }}
      />
    </div>
  );
}

export default App;
