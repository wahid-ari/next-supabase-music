import { ReactNode } from 'react';

export default function Title({ children }: { children: ReactNode }) {
  return <h1 className='text-2xl font-semibold tracking-wide text-neutral-800 dark:text-neutral-100'>{children}</h1>;
}
