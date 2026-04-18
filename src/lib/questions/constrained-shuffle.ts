import type { QuestionRow } from '@/lib/server/session-store/types';

function hashSeed(seed: string): number {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  return hash >>> 0;
}

function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isOppositePair(a: QuestionRow, b: QuestionRow): boolean {
  return a.dimension === b.dimension && a.keyedSide !== b.keyedSide;
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const next = [...items];

  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

function hasInvalidAdjacency(questions: QuestionRow[]): boolean {
  for (let i = 0; i < questions.length - 1; i += 1) {
    if (isOppositePair(questions[i], questions[i + 1])) {
      return true;
    }
  }

  return false;
}

export function constrainedShuffleQuestions(
  questions: QuestionRow[],
  seed: string,
  maxAttempts = 200,
): QuestionRow[] {
  const numericSeed = hashSeed(seed);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const random = mulberry32(numericSeed + attempt);
    const candidate = shuffle(questions, random);

    if (!hasInvalidAdjacency(candidate)) {
      return candidate;
    }
  }

  const sorted = [...questions].sort((a, b) => a.displayOrder - b.displayOrder);
  const arranged: QuestionRow[] = [];

  for (const question of sorted) {
    const prev = arranged[arranged.length - 1];

    if (!prev || !isOppositePair(prev, question)) {
      arranged.push(question);
      continue;
    }

    const swapIndex = arranged.findIndex((item, index) => {
      if (index === arranged.length - 1) {
        return false;
      }

      const before = arranged[index];
      const after = arranged[index + 1];
      return !isOppositePair(before, question) && !isOppositePair(question, after);
    });

    if (swapIndex >= 0) {
      arranged.splice(swapIndex + 1, 0, question);
    } else {
      arranged.push(question);
    }
  }

  return arranged;
}
