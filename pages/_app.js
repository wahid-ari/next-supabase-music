import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider } from '@utils/GlobalContext';
// import { AxiosConfigProvider } from "@utils/useAxiosConfig";
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Show progress on All Pages
// import Router from 'next/router';

// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  function handleStart(url) {
    let splitUrl = url.split('/');
    // Show progress only in Detail Pages
    if (splitUrl.includes('detail')) {
      NProgress.start();
    }
  }
  const handleStop = () => NProgress.done();

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return router.pathname == '/login' || router.pathname == '/register' ? (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  ) : (
    <ThemeProvider attribute='class' storageKey='theme'>
      <GlobalProvider>
        {/* <AxiosConfigProvider> */}
        <main className={inter.className}>
          <Toaster />
          <Component {...pageProps} />
        </main>
        {/* </AxiosConfigProvider> */}
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
