import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthRedirect } from '../components/common/AuthRedirect';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthRedirect />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
