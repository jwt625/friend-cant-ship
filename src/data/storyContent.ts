export interface StorySection {
  id: string;
  phase: 'opening' | 'mockery' | 'chaos' | 'philosophy' | 'inspiration' | 'closing';
  content: string | ((name: string) => string);
  type: 'text' | 'stat' | 'chat' | 'quote';
  emphasis?: 'large' | 'medium' | 'small';
}

export const storySections: StorySection[] = [
  // OPENING - Stark, simple
  { id: 'open-1', phase: 'opening', content: 'This is a story about a website.', type: 'text', emphasis: 'large' },
  { id: 'open-2', phase: 'opening', content: (name) => `About ${name}.`, type: 'text', emphasis: 'large' },
  { id: 'open-3', phase: 'opening', content: 'And the website that was never made.', type: 'text', emphasis: 'medium' },

  // MOCKERY - The excuses begin
  { id: 'mock-1', phase: 'mockery', content: (name) => `"I'll have it done by Tuesday" — ${name}`, type: 'chat' },
  { id: 'mock-stat-1', phase: 'mockery', content: 'Tuesdays passed: 47', type: 'stat' },
  { id: 'mock-2', phase: 'mockery', content: (name) => `"Actually, maybe Friday is more realistic" — ${name}`, type: 'chat' },
  { id: 'mock-3', phase: 'mockery', content: (name) => `"I'm still learning the basics" — ${name}`, type: 'chat' },
  { id: 'mock-stat-2', phase: 'mockery', content: 'YouTube tutorials watched: 34', type: 'stat' },
  { id: 'mock-stat-3', phase: 'mockery', content: 'Lines of code written: 0', type: 'stat' },
  { id: 'mock-4', phase: 'mockery', content: (name) => `"I want to think a bit more about what I want to say" — ${name}`, type: 'chat' },
  { id: 'mock-5', phase: 'mockery', content: (name) => `"My cognitive battery is really low today" — ${name}`, type: 'chat' },
  { id: 'mock-6', phase: 'mockery', content: (name) => `"I can definitely finish this soon" — ${name}`, type: 'chat' },
  { id: 'mock-stat-4', phase: 'mockery', content: 'Times "soon" was promised: 23', type: 'stat' },

  // CHAOS - The spiral deepens, time passes
  { id: 'chaos-1', phase: 'chaos', content: 'Days turned into weeks.', type: 'text', emphasis: 'medium' },
  { id: 'chaos-stat-1', phase: 'chaos', content: 'Excuses made: 156', type: 'stat' },
  { id: 'chaos-2', phase: 'chaos', content: (name) => `"I impulsively bought a 3D printer" — ${name}`, type: 'chat' },
  { id: 'chaos-3', phase: 'chaos', content: 'Weeks turned into months.', type: 'text', emphasis: 'medium' },
  { id: 'chaos-stat-2', phase: 'chaos', content: 'New hobbies started: 7', type: 'stat' },
  { id: 'chaos-stat-3', phase: 'chaos', content: 'New hobbies finished: 0', type: 'stat' },
  { id: 'chaos-4', phase: 'chaos', content: (name) => `"I'm nervous to put something half-assed out there" — ${name}`, type: 'chat' },
  { id: 'chaos-5', phase: 'chaos', content: (name) => `"Very glad I didn't ship it LOL" — ${name}`, type: 'chat' },
  { id: 'chaos-6', phase: 'chaos', content: 'Months turned into seasons.', type: 'text', emphasis: 'medium' },
  { id: 'chaos-stat-4', phase: 'chaos', content: 'Domain names purchased: 3', type: 'stat' },
  { id: 'chaos-stat-5', phase: 'chaos', content: 'Websites deployed: 0', type: 'stat' },
  { id: 'chaos-7', phase: 'chaos', content: (name) => `"Please forgive me" — ${name}`, type: 'chat' },
  { id: 'chaos-8', phase: 'chaos', content: (name) => `"One day I will finish this" — ${name}`, type: 'chat' },
  { id: 'chaos-9', phase: 'chaos', content: (name) => `"In my defense... Ok nvm" — ${name}`, type: 'chat' },
  { id: 'chaos-10', phase: 'chaos', content: (name) => `"Yeah you're right I'm just giving you content" — ${name}`, type: 'chat' },
  { id: 'chaos-11', phase: 'chaos', content: 'Seasons turned into years.', type: 'text', emphasis: 'large' },

  // PHILOSOPHY - The turn
  { id: 'phil-1', phase: 'philosophy', content: 'But here\'s what they never realized:', type: 'text', emphasis: 'medium' },
  { id: 'phil-2', phase: 'philosophy', content: 'Nobody was watching.', type: 'text', emphasis: 'large' },
  { id: 'phil-3', phase: 'philosophy', content: 'Nobody was waiting to judge.', type: 'text', emphasis: 'medium' },
  { id: 'phil-4', phase: 'philosophy', content: 'The audience they feared...', type: 'text', emphasis: 'small' },
  { id: 'phil-5', phase: 'philosophy', content: '...was empty chairs.', type: 'text', emphasis: 'large' },
  { id: 'phil-stat-1a', phase: 'philosophy', content: 'People who would have seen it: ~12', type: 'stat' },
  { id: 'phil-stat-1b', phase: 'philosophy', content: 'People who actually saw it: 0', type: 'stat' },
  { id: 'phil-stat-2a', phase: 'philosophy', content: 'People who would have cared: ~3', type: 'stat' },
  { id: 'phil-stat-2b', phase: 'philosophy', content: 'People who actually cared: 0', type: 'stat' },
  { id: 'phil-stat-3a', phase: 'philosophy', content: 'People who would have remembered it a week later: ~0', type: 'stat' },
  { id: 'phil-stat-3b', phase: 'philosophy', content: 'People who actually remembered it: 0', type: 'stat' },
  { id: 'phil-6', phase: 'philosophy', content: 'The fear of judgment is a prison with no guards.', type: 'quote' },
  { id: 'phil-7', phase: 'philosophy', content: 'The door was always open.', type: 'text', emphasis: 'medium' },

  // INSPIRATION - The message
  { id: 'insp-1', phase: 'inspiration', content: 'You can just do things.', type: 'text', emphasis: 'large' },
  { id: 'insp-2', phase: 'inspiration', content: 'You don\'t need permission.', type: 'text', emphasis: 'medium' },
  { id: 'insp-3', phase: 'inspiration', content: 'You don\'t need the perfect setup.', type: 'text', emphasis: 'medium' },
  { id: 'insp-4', phase: 'inspiration', content: 'You don\'t need to be ready.', type: 'text', emphasis: 'medium' },
  { id: 'insp-5', phase: 'inspiration', content: 'Done beats perfect.', type: 'quote' },
  { id: 'insp-6', phase: 'inspiration', content: 'Shipped beats polished.', type: 'quote' },
  { id: 'insp-7', phase: 'inspiration', content: 'Something beats nothing.', type: 'quote' },
  { id: 'insp-stat-1', phase: 'inspiration', content: 'Time to make this website: 14 minutes', type: 'stat' },
  { id: 'insp-8', phase: 'inspiration', content: 'The best time to start was years ago.', type: 'text', emphasis: 'medium' },
  { id: 'insp-9', phase: 'inspiration', content: 'The second best time is now.', type: 'text', emphasis: 'large' },

  // CLOSING - Return to simplicity
  { id: 'close-1', phase: 'closing', content: 'So:', type: 'text', emphasis: 'small' },
  { id: 'close-2', phase: 'closing', content: 'What have you been putting off?', type: 'text', emphasis: 'large' },
  { id: 'close-3', phase: 'closing', content: 'Go do it.', type: 'text', emphasis: 'large' },
  { id: 'close-4', phase: 'closing', content: 'Right now.', type: 'text', emphasis: 'medium' },
];

