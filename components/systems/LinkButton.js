import Link from 'next/link';

export default function LinkButton({ className, href, children, ...rest }) {
  return (
    <Link
      href={href}
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded bg-emerald-600 px-3 py-1.5 font-medium text-white transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400`}
    >
      {children}
    </Link>
  );
}

LinkButton.secondary = ({ className, href, children, ...rest }) => {
  return (
    <Link
      href={href}
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded border border-neutral-300 bg-gray-50 px-3 py-1.5 font-medium text-neutral-800 outline-none transition-all hover:bg-gray-100 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900`}
    >
      {children}
    </Link>
  );
};

LinkButton.tertary = ({ className, href, children, ...rest }) => {
  return (
    <Link
      href={href}
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded px-3 py-1.5 font-medium text-neutral-600 outline-none transition-all hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
    >
      {children}
    </Link>
  );
};
