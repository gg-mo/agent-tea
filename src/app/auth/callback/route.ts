import { NextResponse } from 'next/server';

import { claimSessionForUser } from '@/lib/server/session-service';
import { createSupabaseAuthServerClient } from '@/lib/supabase/auth-server';

type CallbackParams = {
  searchParams: URLSearchParams;
};

function getClaimSessionId(params: CallbackParams) {
  return params.searchParams.get('claim') ?? undefined;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const claimSessionId = getClaimSessionId({ searchParams: url.searchParams });

  if (!code) {
    return NextResponse.redirect(new URL('/auth', url.origin));
  }

  const supabase = await createSupabaseAuthServerClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(new URL('/auth?error=callback_failed', url.origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && claimSessionId) {
    await claimSessionForUser(claimSessionId, user.id);
  }

  return NextResponse.redirect(new URL('/profile', url.origin));
}
