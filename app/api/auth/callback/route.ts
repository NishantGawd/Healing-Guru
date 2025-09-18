import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

// This is the key function that handles the redirect from Supabase
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // If the request has a `code` parameter, it's a confirmation link
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // After confirmation, always redirect the user to the login page
  const redirectUrl = new URL("/login", request.url);
  return NextResponse.redirect(redirectUrl);
}