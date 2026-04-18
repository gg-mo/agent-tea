import { z } from 'zod';

type EnvSource = Record<string, string | undefined>;

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

function normalizeSupabaseEnvAliases(source: EnvSource): EnvSource {
  const publishableKey = source.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  const anonKey = source.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const secretKey = source.SUPABASE_SECRET_KEY?.trim();
  const serviceRoleKey = source.SUPABASE_SERVICE_ROLE_KEY?.trim();

  return {
    ...source,
    // Prefer new key names when both are provided to ease migration.
    NEXT_PUBLIC_SUPABASE_ANON_KEY: publishableKey || anonKey,
    SUPABASE_SERVICE_ROLE_KEY: secretKey || serviceRoleKey,
  };
}

export function parseClientEnv(source: EnvSource = process.env) {
  const normalizedSource = normalizeSupabaseEnvAliases(source);
  const parsed = clientEnvSchema.safeParse(normalizedSource);

  if (!parsed.success) {
    throw new Error(formatZodError(parsed.error));
  }

  return parsed.data;
}

export function parseServerEnv(source: EnvSource = process.env) {
  const normalizedSource = normalizeSupabaseEnvAliases(source);
  const parsed = serverEnvSchema.safeParse(normalizedSource);

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
