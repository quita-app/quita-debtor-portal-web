import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiHealth } from '@/lib/api/client';
import App from './page';

vi.mock('next/server', () => ({ connection: vi.fn(async () => {}) })); // a request-time marker: nothing to do in a test
vi.mock('@/lib/api/client', () => ({ apiHealth: vi.fn() }));

describe('home page', () => {
  beforeEach(() => {
    vi.mocked(apiHealth).mockReset();
  });

  it('shows "API: no ar" when the API is up', async () => {
    vi.mocked(apiHealth).mockResolvedValue('up');

    const html = renderToStaticMarkup(await App());

    expect(html).toContain('API: no ar');
  });

  it('shows "API: acordando" when the API is waking', async () => {
    vi.mocked(apiHealth).mockResolvedValue('waking');

    const html = renderToStaticMarkup(await App());

    expect(html).toContain('API: acordando');
  });
});
