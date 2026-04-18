import { z } from 'zod';

export const answerSchema = z.object({
  questionCode: z.string().regex(/^Q\d{2}$/),
  value: z.number().int().min(1).max(5),
  reasoning: z.string().max(280).optional(),
});

export const createSessionBodySchema = z
  .object({
    intakeMode: z.enum(['coding_agent', 'chatbot', 'manual']).optional(),
    questionSetVersion: z.string().optional(),
    referralCode: z.string().max(120).optional(),
    referrerSessionId: z.string().uuid().optional(),
  })
  .optional();

export const directAnswersBodySchema = z.object({
  answers: z.array(answerSchema).min(1),
});

export const codingAgentIngestBodySchema = z.object({
  answers: z.array(answerSchema).min(1),
  agentName: z.string().max(80).optional(),
});

export const encodedIngestBodySchema = z.object({
  payload: z.string().min(1),
});
