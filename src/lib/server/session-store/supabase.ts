import { createSupabaseServerClient } from '@/lib/supabase/server';
import type {
  PersistedAnswer,
  PersistedResult,
  QuestionRow,
  QuestionSetRow,
  SessionIntakeMode,
  SessionRow,
  SessionStatus,
  SessionStore,
} from '@/lib/server/session-store/types';

function mapSession(row: Record<string, unknown>): SessionRow {
  return {
    id: String(row.id),
    questionSetId: String(row.question_set_id),
    questionSetVersion: String(row.question_set_version),
    intakeMode: row.intake_mode as SessionIntakeMode,
    status: row.status as SessionStatus,
    randomSeed: String(row.random_seed),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export const supabaseSessionStore: SessionStore = {
  async getActiveQuestionSet(version) {
    const client = createSupabaseServerClient({ useServiceRole: true });

    const query = client.from('question_sets').select('id, version').eq('is_active', true);

    const filtered = version ? query.eq('version', version) : query;
    const { data, error } = await filtered.order('created_at', { ascending: false }).limit(1).maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      version: data.version,
    } as QuestionSetRow;
  },

  async getQuestions(questionSetId) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { data, error } = await client
      .from('questions')
      .select(
        'code, source_id, text, dimension, keyed_side, letter, reverse_coded, question_kind, display_order',
      )
      .eq('question_set_id', questionSetId)
      .order('display_order', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map((row) => ({
      code: row.code,
      sourceId: row.source_id,
      text: row.text,
      dimension: row.dimension,
      keyedSide: row.keyed_side,
      letter: row.letter,
      reverseCoded: row.reverse_coded,
      questionKind: row.question_kind,
      displayOrder: row.display_order,
    })) as QuestionRow[];
  },

  async createSession(input) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { data, error } = await client
      .from('test_sessions')
      .insert({
        question_set_id: input.questionSetId,
        question_set_version: input.questionSetVersion,
        intake_mode: input.intakeMode,
        random_seed: input.randomSeed,
        status: 'pending',
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return mapSession(data as Record<string, unknown>);
  },

  async getSession(sessionId) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { data, error } = await client.from('test_sessions').select('*').eq('id', sessionId).maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return mapSession(data as Record<string, unknown>);
  },

  async upsertAnswers(sessionId, answers) {
    if (answers.length === 0) {
      return;
    }

    const client = createSupabaseServerClient({ useServiceRole: true });
    const payload = answers.map((answer) => ({
      session_id: sessionId,
      question_code: answer.questionCode,
      raw_value: answer.rawValue,
      normalized_value: answer.normalizedValue,
      reasoning: answer.reasoning ?? null,
      source: answer.source,
    }));

    const { error } = await client.from('session_answers').upsert(payload, {
      onConflict: 'session_id,question_code',
      ignoreDuplicates: false,
    });

    if (error) {
      throw error;
    }
  },

  async getAnswers(sessionId) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { data, error } = await client
      .from('session_answers')
      .select('question_code, raw_value, normalized_value, reasoning, source')
      .eq('session_id', sessionId);

    if (error) {
      throw error;
    }

    return (data ?? []).map((row) => ({
      questionCode: row.question_code,
      rawValue: row.raw_value,
      normalizedValue: row.normalized_value,
      reasoning: row.reasoning ?? undefined,
      source: row.source,
    })) as PersistedAnswer[];
  },

  async setSessionStatus(sessionId, status) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { error } = await client.from('test_sessions').update({ status }).eq('id', sessionId);

    if (error) {
      throw error;
    }
  },

  async recordInstructionRun(input) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { error } = await client.from('instruction_runs').insert({
      session_id: input.sessionId,
      intake_mode: input.intakeMode,
      raw_payload: input.rawPayload,
      normalized_payload: input.normalizedPayload ?? null,
      parse_status: input.parseStatus,
      warnings: input.warnings,
      errors: input.errors,
    });

    if (error) {
      throw error;
    }
  },

  async upsertResult(sessionId, result) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { error } = await client.from('session_results').upsert(
      {
        session_id: sessionId,
        type_code: result.typeCode,
        dimension_breakdown: result.dimensionBreakdown,
        strongest_signals: result.strongestSignals,
        tie_flags: result.tieFlags,
        score_summary: result.scoreSummary ?? {},
      },
      { onConflict: 'session_id', ignoreDuplicates: false },
    );

    if (error) {
      throw error;
    }
  },

  async getResult(sessionId) {
    const client = createSupabaseServerClient({ useServiceRole: true });
    const { data, error } = await client
      .from('session_results')
      .select('type_code, dimension_breakdown, strongest_signals, tie_flags, score_summary')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      typeCode: data.type_code,
      dimensionBreakdown: data.dimension_breakdown,
      strongestSignals: data.strongest_signals,
      tieFlags: data.tie_flags,
      scoreSummary: data.score_summary,
    } as PersistedResult;
  },
};
