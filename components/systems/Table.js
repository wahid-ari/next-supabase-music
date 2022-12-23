import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Button from "./Button";

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
      className={`${className ? className + " " : ""
        }w-full lg:max-w-[calc(100vw_-_17rem)] rounded border dark:border-neutral-800 shadow-sm`}
    >
      <div className="w-full lg:max-w-[calc(100vw_-_17rem)] overflow-auto scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800">
        <table className="w-full whitespace-nowrap table-auto text-neutral-700 dark:text-neutral-400">
          <thead>
            <tr className="border-b text-sm dark:border-neutral-800 font-bold bg-gray-50 dark:bg-[#202020] whitespace-nowrap">
              {head}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {noPagination ? "" : (
        <div className="text-xs text-gray-500 dark:text-neutral-400 bg-white font-medium dark:bg-transparent dark:border-neutral-800">
          <div className="px-4 py-3 flex gap-2 justify-between items-center w-full">
            {rowPerPage === 5 ?
              totalData === 0 ? (
                <p className="whitespace-nowrap">Tidak ada data</p>
              ) : (
                <p className="whitespace-nowrap">
                  Menampilkan{" "}
                  <span className="font-bold">{(currentPage - 1) * 5 + 1}</span> -{" "}
                  <span className="font-bold">
                    {currentPage * 5}
                  </span>{" "}
                  {/* dari <span className="font-bold">{totalData}</span> data */}
                </p>
              )
              :
              totalData === 0 ? (
                <p className="whitespace-nowrap">Tidak ada data</p>
              ) : (
                <p className="whitespace-nowrap">
                  Menampilkan{" "}
                  <span className="font-bold">{(currentPage - 1) * 10 + 1}</span> -{" "}
                  <span className="font-bold">
                    {currentPage !== totalPage ? currentPage * 10 : totalData}
                  </span>{" "}
                  dari <span className="font-bold">{totalData}</span> data
                </p>
              )
            }
            <div className="flex items-center justify-end gap-2">
              <Button.secondary
                id="prev" aria-label="Prev"
                onClick={prev}
                disabled={currentPage < 2}
                className="w-8 h-8 !p-0 flex items-center justify-center"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button.secondary>
              <Button.secondary
                id="next" aria-label="Next"
                onClick={next}
                disabled={currentPage === totalPage}
                className="w-8 h-8 !p-0 flex items-center justify-center"
              >
                <ChevronRightIcon className="w-4 h-4" />
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
      className={`${className ? className + " " : ""
        }text-sm bg-white text-neutral-600 dark:text-neutral-200 dark:bg-transparent hover:bg-gray-50 border-b dark:border-neutral-800`}
    >
      {children}
    </tr>
  );
};

Table.td = ({ className, shrink, children, ...rest }) => {
  return (
    <td
      {...rest}
      className={`${className ? className + " " : ""}p-4 ${shrink ? "w-1" : ""
        }`}
    >
      {children}
    </td>
  );
};
