import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// US city slugs that should return 410 Gone (UK-only site)
const US_CITY_SLUGS = new Set([
  'houston', 'miami', 'los-angeles', 'chicago', 'dallas', 'atlanta',
  'phoenix', 'san-jose', 'charlotte', 'new-york', 'philadelphia',
  'san-antonio', 'san-diego', 'austin', 'jacksonville', 'fort-worth',
  'columbus', 'indianapolis', 'seattle', 'denver', 'washington',
  'boston', 'el-paso', 'detroit', 'nashville', 'portland', 'oklahoma-city',
  'las-vegas', 'louisville', 'baltimore', 'milwaukee', 'albuquerque',
  'tucson', 'fresno', 'sacramento', 'mesa', 'kansas-city',
  'long-beach', 'colorado-springs', 'raleigh', 'omaha',
  'oakland', 'minneapolis', 'tulsa', 'wichita', 'new-orleans',
])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // P0.1: Return 410 Gone for all US routes
  if (pathname.startsWith('/locations/us')) {
    return new NextResponse('Gone', { status: 410 })
  }

  if (pathname.startsWith('/us/')) {
    return new NextResponse('Gone', { status: 410 })
  }

  // Return 410 for known US city slugs at root level
  const slug = pathname.slice(1) // remove leading slash
  if (US_CITY_SLUGS.has(slug)) {
    return new NextResponse('Gone', { status: 410 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/locations/us/:path*',
    '/us/:path*',
    '/houston', '/miami', '/los-angeles', '/chicago', '/dallas', '/atlanta',
    '/phoenix', '/san-jose', '/charlotte', '/new-york', '/philadelphia',
    '/san-antonio', '/san-diego', '/austin', '/jacksonville', '/fort-worth',
    '/columbus', '/indianapolis', '/seattle', '/denver', '/washington',
    '/boston', '/el-paso', '/detroit', '/nashville', '/portland', '/oklahoma-city',
    '/las-vegas', '/louisville', '/baltimore', '/milwaukee', '/albuquerque',
    '/tucson', '/fresno', '/sacramento', '/mesa', '/kansas-city',
    '/long-beach', '/colorado-springs', '/raleigh', '/omaha',
    '/oakland', '/minneapolis', '/tulsa', '/wichita', '/new-orleans',
  ],
}
