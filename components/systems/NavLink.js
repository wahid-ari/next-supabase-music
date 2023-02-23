import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export default function NavLink({ className, href, icon, isHome, children }) {
  const router = useRouter();

  if (router.pathname.split('/')[1] == 'dashboard') {
    return (
      <Link
        passHref
        href={href}
        className={clsx(
          className,
          'flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500',
          isHome && 'bg-gray-100 font-medium text-emerald-600 dark:bg-neutral-800 dark:text-emerald-500',
          !isHome &&
            'text-gray-700 hover:bg-gray-100 hover:text-emerald-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-emerald-500'
        )}
      >
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <Link
      passHref
      href={href}
      className={`${className} flex w-full items-center justify-start gap-2 rounded px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500
       ${
         router.pathname.includes(href) && !isHome
           ? // current route that not home
             'bg-gray-100 font-medium text-emerald-600 dark:bg-neutral-800 dark:text-emerald-500'
           : router.pathname === href && isHome
           ? // current route that home
             'bg-gray-100 font-medium text-emerald-600 dark:bg-neutral-800 dark:text-emerald-500 dark:hover:text-emerald-500'
           : // not current route
             'text-gray-700 hover:bg-gray-100 hover:text-emerald-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-emerald-500'
       }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

NavLink.logout = ({ href, icon, className, children }) => {
  return (
    <Link
      passHref
      href={href}
      className={clsx(
        className,
        'flex w-full items-center justify-start px-4 py-2 transition-all',
        'gap-3 rounded text-sm hover:bg-red-100 dark:hover:bg-neutral-800',
        'text-red-800 dark:text-red-500 dark:hover:text-red-400'
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};
