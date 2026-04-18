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
  userId?: string;
  referralCode?: string;
  referrerSessionId?: string;
  completedAt?: string;
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

export type CompareSetRow = {
  id: string;
  ownerUserId?: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    sessionId: string;
    label?: string;
  }>;
};

export type EventLogInput = {
  sessionId?: string;
  userId?: string;
  eventName: string;
  eventSource?: 'client' | 'server';
  eventPayload?: Record<string, unknown>;
};

export type TypeDistributionRow = {
  typeCode: string;
  count: number;
};

export type FunnelStatsRow = {
  stage: string;
  count: number;
  conversionFromPrevious?: number | null;
  conversionFromStart?: number | null;
};

export type SessionStore = {
  getActiveQuestionSet(version?: string): Promise<QuestionSetRow | null>;
  getQuestions(questionSetId: string): Promise<QuestionRow[]>;
  createSession(input: {
    questionSetId: string;
    questionSetVersion: string;
    intakeMode: SessionIntakeMode;
    randomSeed: string;
    referralCode?: string;
    referrerSessionId?: string;
  }): Promise<SessionRow>;
  getSession(sessionId: string): Promise<SessionRow | null>;
  listSessionsByUser(userId: string): Promise<SessionRow[]>;
  attachSessionToUser(sessionId: string, userId: string): Promise<void>;
  upsertAnswers(sessionId: string, answers: PersistedAnswer[]): Promise<void>;
  getAnswers(sessionId: string): Promise<PersistedAnswer[]>;
  setSessionStatus(sessionId: string, status: SessionStatus): Promise<void>;
  recordInstructionRun(input: InstructionRun): Promise<void>;
  recordEvent(input: EventLogInput): Promise<void>;
  upsertResult(sessionId: string, result: PersistedResult): Promise<void>;
  getResult(sessionId: string): Promise<PersistedResult | null>;
  getTypeDistribution(days: number): Promise<TypeDistributionRow[]>;
  getFunnelStats(days: number): Promise<FunnelStatsRow[]>;
  createCompareSet(input: {
    sessionIds: string[];
    labels?: string[];
    ownerUserId?: string;
  }): Promise<CompareSetRow>;
  getCompareSet(compareSetId: string): Promise<CompareSetRow | null>;
};
