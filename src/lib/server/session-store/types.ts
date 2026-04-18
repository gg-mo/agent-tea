import type { DimensionId, QuestionSide } from '@/lib/scoring/types';

export type SessionIntakeMode = 'coding_agent' | 'chatbot' | 'manual';

export type SessionStatus = 'pending' | 'ingested' | 'scored';

export type QuestionRow = {
  code: string;
  sourceId: string;
  text: string;
  dimension: DimensionId;
  keyedSide: QuestionSide;
  letter: string;
  reverseCoded: boolean;
  questionKind: 'core' | 'spicy';
  displayOrder: number;
};

export type QuestionSetRow = {
  id: string;
  version: string;
};

export type SessionRow = {
  id: string;
  questionSetId: string;
  questionSetVersion: string;
  intakeMode: SessionIntakeMode;
  status: SessionStatus;
  randomSeed: string;
  createdAt: string;
  updatedAt: string;
};

export type PersistedAnswer = {
  questionCode: string;
  rawValue: number;
  normalizedValue: number;
  reasoning?: string;
  source: SessionIntakeMode;
};

export type PersistedResult = {
  typeCode: string;
  dimensionBreakdown: Record<string, unknown>;
  strongestSignals: unknown[];
  tieFlags: Record<string, boolean>;
  scoreSummary?: Record<string, unknown>;
};

export type InstructionRun = {
  sessionId: string;
  intakeMode: SessionIntakeMode;
  rawPayload: string;
  normalizedPayload?: string;
  parseStatus: 'success' | 'partial' | 'error';
  warnings: unknown[];
  errors: unknown[];
};

export type SessionStore = {
  getActiveQuestionSet(version?: string): Promise<QuestionSetRow | null>;
  getQuestions(questionSetId: string): Promise<QuestionRow[]>;
  createSession(input: {
    questionSetId: string;
    questionSetVersion: string;
    intakeMode: SessionIntakeMode;
    randomSeed: string;
  }): Promise<SessionRow>;
  getSession(sessionId: string): Promise<SessionRow | null>;
  upsertAnswers(sessionId: string, answers: PersistedAnswer[]): Promise<void>;
  getAnswers(sessionId: string): Promise<PersistedAnswer[]>;
  setSessionStatus(sessionId: string, status: SessionStatus): Promise<void>;
  recordInstructionRun(input: InstructionRun): Promise<void>;
  upsertResult(sessionId: string, result: PersistedResult): Promise<void>;
  getResult(sessionId: string): Promise<PersistedResult | null>;
};
