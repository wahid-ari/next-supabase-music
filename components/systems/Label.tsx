import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

export default function Label({ className, children, ...props }: Props) {
  return (
    <label {...props} className={clsx(className, 'block text-gray-800 dark:text-neutral-300')}>
      {children}
    </label>
  );
}
