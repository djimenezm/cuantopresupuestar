import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function createNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  return btoa(String.fromCharCode(...bytes));
}

function createContentSecurityPolicy(nonce: string) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ''}`,
    // Next inlines critical CSS when inlineCss is enabled, so styles need this fallback.
    `style-src 'self' 'nonce-${nonce}' 'unsafe-inline'`,
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "form-action 'self' https://formsubmit.co",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    ...(isDevelopment ? [] : ["require-trusted-types-for 'script'"]),
    ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
  ];

  return directives.join('; ');
}

const strictTransportSecurity = 'max-age=63072000; includeSubDomains; preload';
const crossOriginOpenerPolicy = 'same-origin';
const xFrameOptions = 'DENY';

export function proxy(request: NextRequest) {
  const nonce = createNonce();
  const contentSecurityPolicy = createContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('Strict-Transport-Security', strictTransportSecurity);
  response.headers.set('Cross-Origin-Opener-Policy', crossOriginOpenerPolicy);
  response.headers.set('X-Frame-Options', xFrameOptions);

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|manifest.webmanifest|robots.txt|sitemap.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
