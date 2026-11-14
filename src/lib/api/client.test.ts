import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { apiHealth } from './client';

// The fake API: MSW answers requests to http://api.test (vitest.config.mts)
const server = setupServer();
const healthUrl = 'http://api.test/actuator/health';

beforeAll(() => server.listen({ onUnhandledFrame: 'error' })); // any unexpected request fails the test
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('apiHealth', () => {
  it('returns "up" when the API answers 200', async () => {
    server.use(http.get(healthUrl, () => HttpResponse.json({ status: 'UP' })));

    await expect(apiHealth()).resolves.toBe('up');
  });

  it('returns "waking" when the API answers 503', async () => {
    server.use(http.get(healthUrl, () => HttpResponse.json({ status: 'DOWN' }, { status: 503 })));

    await expect(apiHealth()).resolves.toBe('waking');
  });

  it('returns "waking" when the API is unreachable', async () => {
    server.use(http.get(healthUrl, () => HttpResponse.error()));

    await expect(apiHealth()).resolves.toBe('waking');
  });

  it('returns "waking" after 5 s when the API never answers', async () => {
    server.use(
      http.get(healthUrl, async () => {
        await delay('infinite'); // a sleeping API: the connection stays open and silent
        return HttpResponse.json({ status: 'UP' });
      }),
    );
    const start = Date.now();

    await expect(apiHealth()).resolves.toBe('waking');
    expect(Date.now() - start).toBeGreaterThanOrEqual(4900); // the timeout is 5 s, not earlier
  }, 10_000); // the real 5 s wait needs more room than the default 5 s test timeout
});
