import { getBundledQuestionSet } from '@/lib/server/session-store/spec-loader';
import type {
  InstructionRun,
  PersistedAnswer,
  PersistedResult,
  QuestionRow,
  QuestionSetRow,
  SessionRow,
  SessionStatus,
  SessionStore,
} from '@/lib/server/session-store/types';

type StoreState = {
  questionSet: QuestionSetRow;
  questions: QuestionRow[];
  sessions: Map<string, SessionRow>;
  answers: Map<string, Map<string, PersistedAnswer>>;
  results: Map<string, PersistedResult>;
  instructionRuns: InstructionRun[];
};

function createInitialState(): StoreState {
  const bundled = getBundledQuestionSet();

  return {
    questionSet: {
      id: bundled.id,
      version: bundled.version,
    },
    questions: bundled.questions,
    sessions: new Map(),
    answers: new Map(),
    results: new Map(),
    instructionRuns: [],
  };
}

let state = createInitialState();

function nowIso() {
  return new Date().toISOString();
}

export function resetInMemorySessionStore() {
  state = createInitialState();
}

export const inMemorySessionStore: SessionStore = {
  async getActiveQuestionSet(version) {
    if (version && version !== state.questionSet.version) {
      return null;
    }

    return state.questionSet;
  },

  async getQuestions(questionSetId) {
    if (questionSetId !== state.questionSet.id) {
      return [];
    }

    return [...state.questions];
  },

  async createSession(input) {
    const timestamp = nowIso();
    const session: SessionRow = {
      id: crypto.randomUUID(),
      questionSetId: input.questionSetId,
      questionSetVersion: input.questionSetVersion,
      intakeMode: input.intakeMode,
      status: 'pending',
      randomSeed: input.randomSeed,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    state.sessions.set(session.id, session);

    return session;
  },

  async getSession(sessionId) {
    return state.sessions.get(sessionId) ?? null;
  },

  async upsertAnswers(sessionId, answers) {
    const sessionAnswers = state.answers.get(sessionId) ?? new Map<string, PersistedAnswer>();

    for (const answer of answers) {
      sessionAnswers.set(answer.questionCode, answer);
    }

    state.answers.set(sessionId, sessionAnswers);
  },

  async getAnswers(sessionId) {
    const answers = state.answers.get(sessionId);

    if (!answers) {
      return [];
    }

    return [...answers.values()];
  },

  async setSessionStatus(sessionId, status: SessionStatus) {
    const session = state.sessions.get(sessionId);

    if (!session) {
      return;
    }

    state.sessions.set(sessionId, {
      ...session,
      status,
      updatedAt: nowIso(),
    });
  },

  async recordInstructionRun(input) {
    state.instructionRuns.push(input);
  },

  async upsertResult(sessionId, result) {
    state.results.set(sessionId, result);
  },

  async getResult(sessionId) {
    return state.results.get(sessionId) ?? null;
  },
};
