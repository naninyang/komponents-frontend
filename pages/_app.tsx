import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { Gowun_Batang, Lato } from 'next/font/google';
import Script from 'next/script';
import styled from '@emotion/styled';
import { GA_TRACKING_ID, pageview } from '@/utils/gtag';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { rem } from '@/styles/designSystem';
import '@/styles/globals.sass';

const batang = Gowun_Batang({
  weight: ['400', '700'],
  subsets: ['vietnamese'],
});

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

const Container = styled.main({
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  padding: `0 ${rem(25)}`,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      sessionStorage.setItem('scrollPosition_' + router.asPath, window.scrollY.toString());
    };

    const handleRouteChangeComplete = (url: string) => {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition_' + url);
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition));
      } else {
        window.scrollTo(0, 0);
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        registration.waiting?.postMessage('SKIP_WAITING');
      };
      registInit();
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <style jsx global>
        {`
          .ss {
            font-family:
              ${lato.style.fontFamily},
              -apple-system,
              BlinkMacSystemFont,
              system-ui,
              sans-serif;
          }
          body,
          pre,
          input,
          button,
          textarea,
          select,
          legend {
            font-family:
              ${batang.style.fontFamily},
              -apple-system,
              BlinkMacSystemFont,
              system-ui,
              serif;
          }
        `}
      </style>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
