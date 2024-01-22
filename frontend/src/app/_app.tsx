import '@/src/app/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthRedirect } from '../components/common/AuthRedirect';

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
