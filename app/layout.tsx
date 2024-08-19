import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/layout/Providers';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Docu Manage',
    description: 'App for Managing and Creating Documents'
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                {' '}
                <NextTopLoader showSpinner={false} />
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
}
