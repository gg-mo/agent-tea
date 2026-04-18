import { jsonResponse } from '@/lib/server/http';
import { listSessionsForUser } from '@/lib/server/session-service';
import { createSupabaseAuthServerClient } from '@/lib/supabase/auth-server';

export async function GET() {
  try {
    const supabase = await createSupabaseAuthServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    const sessions = await listSessionsForUser(user.id);

    return jsonResponse({ sessions });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Failed to load user sessions' },
      500,
    );
  }
}
