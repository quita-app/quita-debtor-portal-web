import 'server-only'; // bundling this file for the browser breaks the build (CA3)

// Server-only variable: it never reaches the browser bundle.
const baseUrl = process.env.API_INTERNAL_URL;
// Fail fast: a missing required setting must stop the app, not break a page later.
if (!baseUrl) throw new Error('API_INTERNAL_URL is not set');

export type ApiHealth = 'up' | 'waking';

/** Asks the API whether it is alive. Never throws: a sleeping or broken API means "waking". */
export async function apiHealth(): Promise<ApiHealth> {
	try {
		const response = await fetch(`${baseUrl}/actuator/health`, {
			signal: AbortSignal.timeout(5000), // a sleeping API must not hold the page for a minute
			cache: 'no-store', // a health check never comes from a cache
		});
		return response.ok ? 'up' : 'waking'; // 503 (database down) also reads as "waking"
	} catch {
		return 'waking'; // timeout, connection refused, DNS: all the same to the debtor
	}
}
