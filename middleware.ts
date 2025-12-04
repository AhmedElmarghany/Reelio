import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Check if the user is trying to access the root page
  if (request.nextUrl.pathname === '/') {
    // If no token, redirect to sign-in
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};