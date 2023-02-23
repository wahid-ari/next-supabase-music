import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Breadcrumb from '@components/systems/Breadcrumb';
import Navbar from './Navbar';
import Menu from './Menu';
import clsx from 'clsx';
import nookies from 'nookies';
import HeadSeo from './HeadSeo';

export default function Layout({ children, title, description }) {
  const admin = nookies.get(null, 'name');
  const [mounted, setMounted] = useState(false);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <HeadSeo title={title} description={description} />

      <div
        className='font-inter min-h-screen w-full bg-white text-sm dark:bg-neutral-900 lg:grid'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <Sidebar />

        <div className='relative'>
          <Navbar />

          {/* Show on Mobile */}
          <div
            className={clsx(
              'flex items-center justify-between gap-x-4 border-b px-4 py-3 dark:border-neutral-800 lg:hidden',
              'overflow-x-auto bg-white/95 dark:bg-neutral-900/90',
              'scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
            )}
          >
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div
            className={clsx(
              'hidden items-center justify-between gap-x-4 border-b py-3 px-4 dark:border-neutral-800 lg:flex',
              'sticky top-0 z-40',
              'bg-white/50 dark:bg-neutral-900/30',
              'backdrop-blur-md backdrop-filter'
            )}
          >
            <Breadcrumb />

            {mounted && admin.name ? <Menu /> : null}
          </div>

          <div className='px-5 py-5'>{children}</div>
        </div>
      </div>
    </>
  );
}
