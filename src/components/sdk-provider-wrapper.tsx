"use client"

import { ContextProvider } from '@/controllers/context';
import { SDKProvider } from '@tma.js/sdk-react';
import React from 'react';

export default function ProvidersWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SDKProvider>
            <ContextProvider>
                {children}
            </ContextProvider>
        </SDKProvider>
    );
}