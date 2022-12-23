export default function TableSimple({ className, head, bordered, children }) {
  return (
    <div className={`${className ? className + " " : ""}w-full rounded 
    ${bordered ? "border-t dark:border-t-neutral-800" : "border dark:border-neutral-800"}
    `}>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700">
        <table className="w-full whitespace-nowrap text-neutral-800 dark:text-neutral-300">
          <thead>
            <tr className="border-b text-sm dark:border-neutral-800 font-medium bg-gray-50 dark:bg-[#202020]">
              {head}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

TableSimple.tr = ({ className, children }) => {
  return (
    <tr
      className={`${className ? className + " " : ""}
      text-sm bg-white text-neutral-600 dark:text-neutral-200 dark:bg-neutral-900 border-b dark:border-neutral-800`}
    >
      {children}
    </tr>
  );
};

TableSimple.td = ({ className, small, bordered, children }) => {
  return (
    <td
      className={`${className ? className + " " : ""}p-3 ${bordered ? "border-x dark:border-x-neutral-800" : ""} ${small ? "w-1" : ""}`}
    >
      {children}
    </td>
  );
};
