import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('security headers', () => {
  it('enforces a nonce-based CSP for application routes', () => {
    const proxy = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8');
    const layout = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf8');

    expect(proxy).toContain('Content-Security-Policy');
    expect(proxy).toContain("script-src 'self' 'nonce-${nonce}' 'strict-dynamic'");
    expect(proxy).not.toContain("script-src 'self' 'unsafe-inline'");
    expect(proxy).toContain("style-src 'self' 'nonce-${nonce}' 'unsafe-inline'");
    expect(proxy).toContain("object-src 'none'");
    expect(proxy).toContain("base-uri 'self'");
    expect(proxy).toContain("frame-ancestors 'none'");
    expect(proxy).toContain("form-action 'self' https://formsubmit.co");
    expect(proxy).toContain('x-nonce');
    expect(layout).toContain("headers()).get('x-nonce')");
    expect(layout).toContain('nonce={nonce}');
  });

  it('serves a preload-ready HSTS policy', () => {
    const proxy = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8');

    expect(proxy).toContain('Strict-Transport-Security');
    expect(proxy).toContain('max-age=63072000; includeSubDomains; preload');
  });
});
