import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans', // a variável que o tokens.css lê
	subsets: ['latin'], // baixa só os caracteres do português (e do inglês)
});

export const metadata: Metadata = {
	title: 'Quita',
	description:
		'Portal do devedor do Quita: veja suas dívidas, simule e feche um acordo.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
