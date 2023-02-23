import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Button from './Button';

export default function Table({
  className,
  head,
  totalPage = 0,
  totalData = 0,
  currentPage = 0,
  next,
  prev,
  rowPerPage,
  noPagination,
  children,
}) {
  return (
    <div
      className={`${
        className ? className + ' ' : ''
      }w-full rounded border shadow-sm dark:border-neutral-800 lg:max-w-[calc(100vw_-_17rem)]`}
    >
      <div className='w-full overflow-auto scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800 lg:max-w-[calc(100vw_-_17rem)]'>
        <table className='w-full table-auto whitespace-nowrap text-neutral-700 dark:text-neutral-400'>
          <thead>
            <tr className='whitespace-nowrap border-b bg-gray-50 text-sm font-bold dark:border-neutral-800 dark:bg-[#202020]'>
              {head}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {noPagination ? (
        ''
      ) : (
        <div className='bg-white text-xs font-medium text-gray-500 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-400'>
          <div className='flex w-full items-center justify-between gap-2 px-4 py-3'>
            {rowPerPage === 5 ? (
              totalData === 0 ? (
                <p className='whitespace-nowrap'>Tidak ada data</p>
              ) : (
                <p className='whitespace-nowrap'>
                  Menampilkan <span className='font-bold'>{(currentPage - 1) * 5 + 1}</span> -{' '}
                  <span className='font-bold'>{currentPage * 5}</span>{' '}
                  {/* dari <span className="font-bold">{totalData}</span> data */}
                </p>
              )
            ) : totalData === 0 ? (
              <p className='whitespace-nowrap'>Tidak ada data</p>
            ) : (
              <p className='whitespace-nowrap'>
                Menampilkan <span className='font-bold'>{(currentPage - 1) * 10 + 1}</span> -{' '}
                <span className='font-bold'>{currentPage !== totalPage ? currentPage * 10 : totalData}</span> dari{' '}
                <span className='font-bold'>{totalData}</span> data
              </p>
            )}
            <div className='flex items-center justify-end gap-2'>
              <Button.secondary
                id='prev'
                aria-label='Prev'
                onClick={prev}
                disabled={currentPage < 2}
                className='flex h-8 w-8 items-center justify-center !p-0'
              >
                <ChevronLeftIcon className='h-4 w-4' />
              </Button.secondary>
              <Button.secondary
                id='next'
                aria-label='Next'
                onClick={next}
                disabled={currentPage === totalPage}
                className='flex h-8 w-8 items-center justify-center !p-0'
              >
                <ChevronRightIcon className='h-4 w-4' />
              </Button.secondary>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Table.tr = ({ className, children, ...rest }) => {
  return (
    <tr
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }text-sm border-b bg-white text-neutral-600 hover:bg-gray-50 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-200`}
    >
      {children}
    </tr>
  );
};

Table.td = ({ className, shrink, children, ...rest }) => {
  return (
    <td {...rest} className={`${className ? className + ' ' : ''}p-4 ${shrink ? 'w-1' : ''}`}>
      {children}
    </td>
  );
};
