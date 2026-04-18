import { inMemorySessionStore } from '@/lib/server/session-store/in-memory';
import { supabaseSessionStore } from '@/lib/server/session-store/supabase';

export function getSessionStore() {
  if (process.env.USE_IN_MEMORY_DB === '1' || process.env.NODE_ENV === 'test') {
    return inMemorySessionStore;
  }

  return supabaseSessionStore;
}
