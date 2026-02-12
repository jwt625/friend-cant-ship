import { useState, useEffect } from 'react';

const NAMES = [
  // Western names
  'Alex', 'Jordan', 'Sam', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Quinn',
  'Marcus', 'David', 'Michael', 'James', 'Chris', 'Daniel', 'Andrew', 'Kevin',
  // Chinese names
  'Wei', 'Ming', 'Jian', 'Hao', 'Chen', 'Li', 'Zhang', 'Wang',
  // Japanese names
  'Kenji', 'Yuki', 'Haruto', 'Sota', 'Ren', 'Kai', 'Takeshi', 'Akira',
];

// Detect if this is a page reload (including hard refresh)
function isPageReload(): boolean {
  const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  if (navEntries.length > 0) {
    return navEntries[0].type === 'reload';
  }
  return false;
}

export function useName(): string {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    // On any refresh (including hard refresh), pick a new random name
    if (isPageReload()) {
      sessionStorage.removeItem('protagonist-name');
    }

    // Check if we have a stored name from this session
    const storedName = sessionStorage.getItem('protagonist-name');
    if (storedName) {
      setName(storedName);
    } else {
      // Pick a random name for this visit
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      sessionStorage.setItem('protagonist-name', randomName);
      setName(randomName);
    }
  }, []);

  return name;
}

export function getNameSync(): string {
  if (typeof window === 'undefined') return 'Alex';
  const storedName = sessionStorage.getItem('protagonist-name');
  if (storedName) return storedName;
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  sessionStorage.setItem('protagonist-name', randomName);
  return randomName;
}

