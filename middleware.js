import { NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

const protectedRoutes = [
  '/add-idea',
  '/my-ideas',
  '/my-interactions',
  '/profile',
]

const protectedPatterns = [/^\/ideas\/[^/]+$/]

function isProtectedPath(pathname) {
  if (protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return true
  }
  return protectedPatterns.some((pattern) => pattern.test(pathname))
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (!isProtectedPath(pathname)) {
    return NextResponse.next()
  }

  const sessionCookie = getSessionCookie(request)

  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/add-idea',
    '/my-ideas',
    '/my-interactions',
    '/profile',
    '/ideas/:id',
  ],
}
