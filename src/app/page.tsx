import { ApiHealth, apiHealth } from '@/lib/api/client';
import { connection } from 'next/server';

export default async function App() {
	await connection();
	const apiHealthStatus: ApiHealth = await apiHealth();

	return (
		<main>
			<h1>{apiHealthStatus === 'up' ? 'API: no ar' : 'API: acordando...'}</h1>
		</main>
	);
}
