import { readFileSync } from 'node:fs';
import path from 'node:path';

import type { QuestionRow } from '@/lib/server/session-store/types';
import type { DimensionId, QuestionSide } from '@/lib/scoring/types';

type SpecDimension = {
  id: DimensionId;
  letters: {
    positive: string;
    negative: string;
  };
};

type SpecQuestion = {
  id: string;
  text: string;
  dimension: DimensionId;
  keyed_side?: QuestionSide;
  lean?: QuestionSide;
  letter?: string;
  reverse_coded?: boolean;
};

type QuestionSpec = {
  spec_version: string;
  type_system: {
    dimensions: SpecDimension[];
  };
  core_questions: SpecQuestion[];
  spicy_questions: SpecQuestion[];
};

export type BundledQuestionSet = {
  id: string;
  version: string;
  questions: QuestionRow[];
};

let cache: BundledQuestionSet | null = null;

function readSpecFile(): QuestionSpec {
  const specPath = path.resolve(process.cwd(), 'docs/launch-pack/09-question-bank-spec.json');
  const raw = readFileSync(specPath, 'utf8');
  return JSON.parse(raw) as QuestionSpec;
}

export function getBundledQuestionSet(): BundledQuestionSet {
  if (cache) {
    return cache;
  }

  const spec = readSpecFile();
  const dimensionMap = new Map(spec.type_system.dimensions.map((item) => [item.id, item]));

  const coreQuestions: QuestionRow[] = spec.core_questions.map((question, index) => {
    const dimension = dimensionMap.get(question.dimension);
    const keyedSide = question.keyed_side ?? 'positive';
    const letter = question.letter ?? dimension?.letters[keyedSide] ?? '';

    return {
      code: `Q${String(index + 1).padStart(2, '0')}`,
      sourceId: question.id,
      text: question.text,
      dimension: question.dimension,
      keyedSide,
      letter,
      reverseCoded: Boolean(question.reverse_coded),
      questionKind: 'core',
      displayOrder: index + 1,
    };
  });

  const spicyQuestions: QuestionRow[] = spec.spicy_questions.map((question, index) => {
    const dimension = dimensionMap.get(question.dimension);
    const keyedSide = question.lean ?? 'positive';
    const letter = dimension?.letters[keyedSide] ?? '';
    const order = coreQuestions.length + index + 1;

    return {
      code: `Q${String(order).padStart(2, '0')}`,
      sourceId: question.id,
      text: question.text,
      dimension: question.dimension,
      keyedSide,
      letter,
      reverseCoded: false,
      questionKind: 'spicy',
      displayOrder: order,
    };
  });

  cache = {
    id: `bundled-${spec.spec_version}`,
    version: spec.spec_version,
    questions: [...coreQuestions, ...spicyQuestions],
  };

  return cache;
}
