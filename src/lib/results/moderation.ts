export type ModerationSeverity = 1 | 2 | 3;

export type ModerationRewrite = {
  term: string;
  severity: ModerationSeverity;
  replacement: string;
};

type ModerationRule = {
  term: string;
  severity: ModerationSeverity;
  replacement: string;
};

const RULES: ModerationRule[] = [
  { term: 'idiot', severity: 3, replacement: 'chaos engine' },
  { term: 'stupid', severity: 3, replacement: 'rough' },
  { term: 'worthless', severity: 3, replacement: 'low-signal' },
  { term: 'hate', severity: 2, replacement: 'strongly dislike' },
  { term: 'moron', severity: 3, replacement: 'wild card' },
  { term: 'tyrant', severity: 2, replacement: 'intense manager' },
  { term: 'abusive', severity: 3, replacement: 'overheated' },
  { term: 'emotional damage', severity: 2, replacement: 'stress spike' },
];

export function moderateCopyLine(line: string): {
  text: string;
  rewrites: ModerationRewrite[];
} {
  let next = line;
  const rewrites: ModerationRewrite[] = [];

  for (const rule of RULES) {
    const matcher = new RegExp(`\\b${rule.term}\\b`, 'gi');
    const hit = matcher.test(next);

    if (!hit) {
      continue;
    }

    rewrites.push({
      term: rule.term,
      severity: rule.severity,
      replacement: rule.replacement,
    });

    next = next.replace(new RegExp(`\\b${rule.term}\\b`, 'gi'), rule.replacement);
  }

  return {
    text: next,
    rewrites,
  };
}

export function moderateCopyLines(lines: string[]) {
  const rewrites: ModerationRewrite[] = [];
  const text = lines.map((line) => {
    const moderated = moderateCopyLine(line);
    rewrites.push(...moderated.rewrites);
    return moderated.text;
  });

  return { text, rewrites };
}
