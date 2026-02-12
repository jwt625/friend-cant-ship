# DevLog 000: Project Vision and Background

## Origin Story

This website exists because of a recurring pattern: a friend (<redacted>) repeatedly promised to make a personal website but never shipped it. Over weeks of conversation, excuses accumulated:

- "I'll have it by Tuesday" (Tuesday passed)
- "Maybe Friday is more realistic" (Friday passed)
- "I want to think more about what I want to say"
- "I'm nervous to put something half-assed out there"
- "My cognitive battery is low"
- "In my defense... Ok nvm"
- "Yeah you're right I'm just giving you content"

The creator (Wentao) finally said: "If I don't see one in 15 min I'm going to spend 10 bucks and get a website called <redacted>-cant-make-a-website.com up."

This is that website.

## Core Theme: "You Can Just Do Things"

The website is not just a roast. It is a meditation on:

1. **The paralysis of perfectionism** - waiting for the "right time" or "right setup"
2. **The fear of judgment** - worrying about what others will think
3. **The irony of inaction** - the audience you fear is mostly empty chairs
4. **Agency and execution** - the gap between intention and action
5. **The liberating truth** - nobody is watching, nobody cares as much as you fear, just ship it

This is also a reminder to the creator himself, who admits: "I am also vulnerable to these common weaknesses, I am also subject to this degradation of agency."

## Target Audience

- The friend being roasted (affectionately)
- Anyone who stumbles upon it and recognizes themselves
- The creator, as an eternal reminder

## Design Philosophy

### Narrative Arc (Scroll-Based)

The website tells a story through scrolling, progressing through emotional phases:

1. **Opening** - Stark, minimal, black/white. Elegant serif typography. Sets the tone.
2. **Mockery** - Chat bubbles with excuses, stats counting failures. Light roasting.
3. **Chaos** - Time passes (days to weeks to months to years). Colors shift, particles float, animations intensify. The spiral of procrastination visualized.
4. **Philosophy** - The turn. Muted tones. The realization that nobody was watching.
5. **Inspiration** - The message crystallizes. "You can just do things."
6. **Closing** - Return to stark simplicity. Direct call to action.

### Visual Progression

- **Time of day**: Colors shift from dawn to morning to afternoon to evening to night as you scroll
- **Seasons**: Spring to summer to fall to winter, with matching accent colors
- **Bookends**: Opening and closing are intentionally stark (black background, white text, serif font) to contrast with the colorful chaos in the middle

### Typography

- **Simple sections** (opening/closing): Playfair Display serif - elegant, literary, timeless
- **Everything else**: Inter sans-serif - clean, modern, readable

### Name Anonymization

The protagonist's name is randomized on each visit from a pool of Western, Chinese, and Japanese names. This:
- Protects the actual friend's identity (configurable)
- Makes the story universal - anyone can see themselves
- Creates a small easter egg for repeat visitors

## Technical Decisions

- **React + Vite + TypeScript**: Modern, fast, type-safe
- **Scroll-based storytelling**: IntersectionObserver for section visibility
- **CSS transitions**: Smooth fade-ins as sections enter viewport
- **No external dependencies for animations**: Pure CSS for performance
- **Inline SVG icons**: No icon library bloat, custom time/season visuals

## Content Guidelines

- No emoji anywhere (explicit requirement)
- Stats should be absurd but believable (e.g., "Tuesdays passed: 47")
- Chat excerpts are inspired by real conversations but fictionalized
- The "People who would have... / People who actually..." pattern drives home the punchline
- Self-aware humor ("I'm just giving you content") is encouraged

## Future Considerations

- Domain: <redacted>-cant-make-a-website.com (to be configured)
- Could add: sound/music, more parallax effects, visitor pledge wall
- Final CTA could link somewhere meaningful
- Mobile experience is supported but desktop is primary

## Key Files

- `src/data/storyContent.ts` - All narrative content, easily editable
- `src/hooks/useName.ts` - Name randomization logic
- `src/hooks/useScrollProgress.ts` - Scroll tracking and phase detection
- `src/theme/colorThemes.ts` - Time/season color palettes
- `src/components/StorySection.tsx` - Individual section rendering
- `src/components/Background.tsx` - Dynamic background with icons/particles

## The Meta-Irony

This website was built in approximately 15-20 minutes of actual coding time, proving the entire point: you can just do things. The friend spent more time explaining why they couldn't make a website than it takes to make one.

