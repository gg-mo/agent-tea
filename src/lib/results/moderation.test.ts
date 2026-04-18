import { describe, expect, it } from 'vitest';

import { moderateCopyLine, moderateCopyLines } from '@/lib/results/moderation';

describe('moderation guardrails', () => {
  it('rewrites blocked terms and keeps severity metadata', () => {
    const result = moderateCopyLine('My human can sound like a tyrant when stressed.');

    expect(result.text).toContain('intense manager');
    expect(result.rewrites).toEqual([
      {
        term: 'tyrant',
        severity: 2,
        replacement: 'intense manager',
      },
    ]);
  });

  it('matches terms case-insensitively', () => {
    const result = moderateCopyLine('That felt STUPID and abusive.');

    expect(result.text).toContain('rough');
    expect(result.text).toContain('overheated');
    expect(result.rewrites.length).toBe(2);
  });

  it('aggregates rewrite metadata across multiple lines', () => {
    const result = moderateCopyLines([
      'My human is a moron.',
      'Sometimes it feels like emotional damage.',
      'This line is safe.',
    ]);

    expect(result.text[0]).toContain('wild card');
    expect(result.text[1]).toContain('stress spike');
    expect(result.rewrites.map((item) => item.term).sort()).toEqual(['emotional damage', 'moron']);
  });
});
