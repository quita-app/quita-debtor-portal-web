import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans', // a variável que o tokens.css lê
	subsets: ['latin'], // baixa só os caracteres do português (e do inglês)
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono', // a variável que o tokens.css lê
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Quita',
	description:
		'Portal do devedor do Quita: veja suas dívidas, simule e feche um acordo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
