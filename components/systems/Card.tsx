import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function Card({ className, children }: Props) {
  return <div className={`${className} rounded-lg border p-3 dark:border-neutral-800 lg:p-6`}>{children}</div>;
}
