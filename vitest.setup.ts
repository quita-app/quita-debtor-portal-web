import { vi } from 'vitest';

// "server-only" throws outside the React server runtime; in unit tests it is an empty module.
vi.mock('server-only', () => ({}));
