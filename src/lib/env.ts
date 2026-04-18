import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverEnvSchema = clientEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

function formatZodError(error: z.ZodError): string {
  const details = error.issues.map((issue) => {
    const key = issue.path.join('.') || 'UNKNOWN';
    return `- ${key}: ${issue.message}`;
  });

  return ['Missing or invalid environment variables:', ...details].join('\n');
}

export function parseClientEnv(source: Record<string, string | undefined> = process.env) {
  const parsed = clientEnvSchema.safeParse(source);

  if (!parsed.success) {
    throw new Error(formatZodError(parsed.error));
  }

  return parsed.data;
}

export function parseServerEnv(source: Record<string, string | undefined> = process.env) {
  const parsed = serverEnvSchema.safeParse(source);

  if (!parsed.success) {
    throw new Error(formatZodError(parsed.error));
  }

  return parsed.data;
}

export function getClientEnv() {
  return parseClientEnv(process.env);
}

export function getServerEnv() {
  return parseServerEnv(process.env);
}
