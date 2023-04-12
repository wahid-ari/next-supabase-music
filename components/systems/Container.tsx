import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  small?: boolean;
  children: ReactNode;
  [props: string]: any;
};

export default function Container({ className, small, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        small ? 'p-2' : 'p-8',
        'relative mb-2 rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'
      )}
    >
      {children}
    </div>
  );
}
