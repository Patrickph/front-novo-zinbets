import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ref = request.nextUrl.searchParams.get('ref')
  const authToken = request.nextUrl.searchParams.get('auth-token')

  if (
    pathname.startsWith('/user') ||
    pathname.startsWith('/affiliate')
  ) {
    const token = request.cookies.get('bet.token')

    if (!token || token == undefined) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const response = NextResponse.next();

  if (ref) {
    response.cookies.set('ref', ref, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }


  return response;
}