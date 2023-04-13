import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  isLarge?: boolean;
  children: ReactNode;
  [props: string]: any;
};

export default function Badge({ className, isLarge, children, ...props }: Props) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-blue-100 font-semibold text-sky-600 dark:bg-sky-600 dark:bg-opacity-10',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
}

Badge.dark = ({ className, isLarge, children, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-gray-100 font-semibold text-gray-600 dark:bg-gray-600 dark:bg-opacity-10 dark:text-gray-400',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
};

Badge.red = ({ className, isLarge, children, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-red-100 font-semibold text-red-600 dark:bg-red-600 dark:bg-opacity-10',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
};

Badge.green = ({ className, isLarge, children, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-green-100 font-semibold text-green-600 dark:bg-green-600 dark:bg-opacity-10',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
};

Badge.yellow = ({ className, isLarge, children, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-yellow-100 font-semibold text-yellow-600 dark:bg-yellow-600 dark:bg-opacity-10',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
};

Badge.indigo = ({ className, isLarge, children, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-600 dark:bg-opacity-10',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
};

Badge.purple = ({ className, isLarge, children, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-purple-100 font-semibold text-purple-600 dark:bg-purple-600 dark:bg-opacity-10',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
};

Badge.pink = ({ className, isLarge, children, ...props }: Props) => {
  return (
    <span
      {...props}
      className={clsx(
        className,
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-pink-100 font-semibold text-pink-600 dark:bg-pink-600 dark:bg-opacity-10',
        'mr-2 rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]'
      )}
    >
      {children}
    </span>
  );
};
