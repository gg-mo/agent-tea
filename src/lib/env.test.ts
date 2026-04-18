import { describe, expect, it } from 'vitest';

import { parseClientEnv, parseServerEnv } from '@/lib/env';

describe('environment parsing', () => {
  it('parses valid client env values', () => {
    const parsed = parseClientEnv({
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon',
    });

    expect(parsed.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');
  });

  it('parses valid client env values with publishable key naming', () => {
    const parsed = parseClientEnv({
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_abc',
    });

    expect(parsed.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');
    expect(parsed.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('sb_publishable_abc');
  });

  it('throws actionable errors for missing client env values', () => {
    expect(() => parseClientEnv({})).toThrowError(/missing or invalid environment variables/i);
    expect(() => parseClientEnv({})).toThrowError(/NEXT_PUBLIC_SITE_URL/);
  });

  it('prefers publishable key when both legacy and publishable keys are set', () => {
    const parsed = parseClientEnv({
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon-legacy',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_preferred',
    });

    expect(parsed.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('sb_publishable_preferred');
  });

  it('requires service role key for server env parsing', () => {
    expect(() =>
      parseServerEnv({
        NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
        NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon',
      }),
    ).toThrowError(/SUPABASE_SERVICE_ROLE_KEY/);
  });

  it('parses valid server env values with secret key naming', () => {
    const parsed = parseServerEnv({
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_abc',
      SUPABASE_SECRET_KEY: 'sb_secret_abc',
    });

    expect(parsed.SUPABASE_SERVICE_ROLE_KEY).toBe('sb_secret_abc');
  });
});
