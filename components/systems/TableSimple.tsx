import { ReactNode } from 'react';

type Props = {
  className?: string;
  head: ReactNode;
  bordered?: boolean;
  children: ReactNode;
};

export default function TableSimple({ className, head, bordered, children }: Props) {
  return (
    <div
      className={`${className ? className + ' ' : ''}w-full rounded 
    ${bordered ? 'border-t dark:border-t-neutral-800' : 'border dark:border-neutral-800'}
    `}
    >
      <div className='overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700'>
        <table className='w-full whitespace-nowrap text-neutral-800 dark:text-neutral-300'>
          <thead>
            <tr className='border-b bg-gray-50 text-sm font-medium dark:border-neutral-800 dark:bg-[#202020]'>
              {head}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

type TrProps = {
  className?: string;
  children: ReactNode;
};

TableSimple.tr = ({ className, children }: TrProps) => {
  return (
    <tr
      className={`${className ? className + ' ' : ''}
      border-b bg-white text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200`}
    >
      {children}
    </tr>
  );
};

type TdProps = {
  className?: string;
  small?: boolean;
  bordered?: boolean;
  children: ReactNode;
};

TableSimple.td = ({ className, small, bordered, children }: TdProps) => {
  return (
    <td
      className={`${className ? className + ' ' : ''}p-3 ${bordered ? 'border-x dark:border-x-neutral-800' : ''} ${
        small ? 'w-1' : ''
      }`}
    >
      {children}
    </td>
  );
};
