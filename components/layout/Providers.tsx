'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/ThemeProvider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import QueryWrapper from './QueryWrapper';

const Providers = ({
    session,
    children
}: {
    session: SessionProviderProps['session'];
    children: React.ReactNode;
}) => {
    return (
        <>
            <QueryWrapper>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <SessionProvider session={session}>
                        {children}
                    </SessionProvider>
                </ThemeProvider>
            </QueryWrapper>
        </>
    );
};

export default Providers;
