import { createClient } from '@supabase/supabase-js';

import { getClientEnv, getServerEnv } from '@/lib/env';

type SupabaseServerClientOptions = {
  useServiceRole?: boolean;
};

export function createSupabaseServerClient(options: SupabaseServerClientOptions = {}) {
  const env = getClientEnv();
  const key = options.useServiceRole
    ? getServerEnv().SUPABASE_SERVICE_ROLE_KEY
    : env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
