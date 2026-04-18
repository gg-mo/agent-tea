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

  it('throws actionable errors for missing client env values', () => {
    expect(() => parseClientEnv({})).toThrowError(/missing or invalid environment variables/i);
    expect(() => parseClientEnv({})).toThrowError(/NEXT_PUBLIC_SITE_URL/);
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
});
