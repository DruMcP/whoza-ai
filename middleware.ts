import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // P0.1: Return 410 Gone for US location pages
  if (pathname === '/locations/us' || pathname.startsWith('/locations/us/')) {
    return new NextResponse('Gone', { status: 410 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/locations/us', '/locations/us/:path*'],
}
