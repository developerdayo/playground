import type { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export const middleware = async (request: NextRequest) => {
  console.log('\x1b[36m%s\x1b[0m', '🟢 middleware running');
  
  const supabaseResponse = await updateSession(request)
  const pathname = request.nextUrl.pathname

  supabaseResponse.headers.set('x-current-pathname', pathname)

  supabaseResponse.headers.forEach((value, key) => {
    console.log('\x1b[36m%s\x1b[0m', `🔵 ${key}: ${value}`)
  })

  return supabaseResponse
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/dashboard/:path*',
    '/profile',
    '/profile/:path*',
    '/goals',
    '/goals/:path*',
    '/logout'
  ]
}