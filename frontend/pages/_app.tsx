import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthRedirect } from '../src/components/common/AuthRedirect';
import '@/src/app/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <AuthRedirect />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
