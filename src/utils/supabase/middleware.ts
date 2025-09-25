import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // Protect checkout
    if (request.nextUrl.pathname.startsWith("/checkout") && (!user || error)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("🔍 Middleware running:", request.nextUrl.pathname, { user, error })

    return response;
  } catch (e) {
    console.error("Supabase error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
