import { useImperativeHandle, forwardRef, useMemo } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/outline';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from 'react-table';

export const ReactTable = forwardRef(({ columns, data, page_size = 5, className, bordered }, ref) => {
  // Use the state and functions returned from useTable to build your UI
  const defaultColumn = useMemo(
    () => ({
      minWidth: 200,
      width: 500,
    }),
    []
  );
  const instance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageSize: page_size,
        pageIndex: 0,
        sortBy: [
          {
            id: 'id',
            desc: false,
          },
          {
            id: 'songs.id',
            desc: false,
          },
          {
            id: 'album.id',
            desc: false,
          },
        ],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = instance;
  useImperativeHandle(ref, () => instance);

  return (
    <div className={`w-full rounded border dark:border-neutral-800 ${className ? className + " " : ""}`}>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700">
        <table {...getTableProps()} className="w-full whitespace-nowrap text-neutral-800 dark:text-neutral-300">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i + 1} {...headerGroup.getHeaderGroupProps()} className="text-left border-b text-sm dark:border-neutral-800 font-medium bg-gray-50 dark:bg-[#202020]">
                {headerGroup.headers.map((column, i) => (
                  <th key={i + 1} {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`font-semibold p-3 first:w-1 ${column.Header == "Action" && "w-1"}
                    ${bordered && "first:border-l-0 last:border-r-0 border-x dark:border-x-neutral-800"}`}>
                    <span className="flex items-center gap-1.5">
                      {column.render('Header')}
                      {!column.disableSortBy ?
                        column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDownIcon className="h-4 w-4 text-neutral-400" />
                          ) : (
                            <ChevronUpIcon className="h-4 w-4 text-neutral-400" />
                          )
                        )
                          :
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={1.5} stroke="currentColor" className="w-5 h-[20px] text-neutral-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                          </svg>
                        :
                        null
                      }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i + 1} {...row.getRowProps()} className="text-sm bg-white text-neutral-600 dark:text-neutral-200 dark:bg-neutral-900 border-b dark:border-neutral-800">
                  {row.cells.map((cell, i) => {
                    return (
                      <td key={i + 1} {...cell.getCellProps()} className={`p-3 ${bordered && "first:border-l-0 last:border-r-0 border-x dark:border-x-neutral-800"}`}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-3 pb-5 sm:p-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <button onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            aria-label="First"
            className={`p-1 rounded border border-transparent transition-all duration-200 ${!canPreviousPage && "cursor-not-allowed"} 
            ${canPreviousPage && "hover:border hover:border-neutral-300 dark:hover:border-neutral-700"}`}>
            <ChevronDoubleLeftIcon className="w-5 h-5 text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white transition-all" />
          </button>{' '}
          <button onClick={() => previousPage()}
            disabled={!canPreviousPage}
            aria-label="Prev"
            className={`p-1 rounded border border-transparent transition-all duration-200 ${!canPreviousPage && "cursor-not-allowed"} 
            ${canPreviousPage && "hover:border hover:border-neutral-300 dark:hover:border-neutral-700"}`}>
            <ChevronLeftIcon className="w-5 h-5 text-neutral-600 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100 transition-all" />
          </button>{' '}
          <span className="mx-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white transition-all">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button onClick={() => nextPage()}
            disabled={!canNextPage}
            aria-label="Next"
            className={`p-1 rounded border border-transparent transition-all duration-200 ${!canNextPage && "cursor-not-allowed"} 
            ${canNextPage && "hover:border hover:border-neutral-300 dark:hover:border-neutral-700"}`}>
            <ChevronRightIcon className="w-5 h-5 text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white transition-all" />
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            aria-label="Last"
            className={`p-1 rounded border border-transparent transition-all duration-200 ${!canNextPage && "cursor-not-allowed"} 
            ${canNextPage && "hover:border hover:border-neutral-300 dark:hover:border-neutral-700"}`}>
            <ChevronDoubleRightIcon className="w-5 h-5 text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white transition-all" />
          </button>{' '}
        </div>

        <div className="flex items-center gap-2 justify-center sm:justify-end">
          <span className="text-sm text-neutral-800 dark:text-gray-200">
            Go to page
          </span>
          <input
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="text-sm transition-all w-[72px] px-3 py-[0.4rem] rounded-md
              dark:text-white bg-white dark:bg-neutral-900  
              border border-gray-300 dark:border-neutral-700 
              focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="1"
          />
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="cursor-pointer block w-[100px] px-3 py-[0.4rem] text-sm rounded-md transition-all
            dark:text-white bg-white dark:bg-neutral-900  
            border border-gray-300 dark:border-neutral-700 
            focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
);

ReactTable.displayName = 'ReactTable';

export default ReactTable