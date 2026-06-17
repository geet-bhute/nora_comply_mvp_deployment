import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/sign-in', '/demo']

export function middleware(request: NextRequest) {
  const session = request.cookies.get('nora_session')?.value
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some(p => pathname === p)

  // No session + protected route → send to sign-in
  if (!session && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url)
  }

  // Has session + visiting landing or sign-in → send to dashboard
  if (session && isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico)$).*)'],
}
