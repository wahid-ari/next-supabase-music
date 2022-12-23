import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

export default function MultipleSelect({
  label,
  show,
  value,
  onClick,
  onBlur,
  children,
}) {
  const buttonRef = useRef(null);
  const ref = useRef(null);
  const setBlur = (e) => {
    if (show && ref.current && !ref.current.contains(e.target)) {
      onBlur(buttonRef.current);
    }
  };

  useEffect(() => {
    document.addEventListener("click", setBlur);
    document.addEventListener("keydown", setBlur);
    return () => {
      document.removeEventListener("click", setBlur);
      document.removeEventListener("keydown", setBlur);
    };
  });
  return (
    <div className="relative mb-4" ref={ref}>
      <div className="mb-1">
        <label className="block text-gray-800 dark:text-neutral-300">
          {label}
        </label>
        <button
        aria-label="multiple select"
          ref={buttonRef}
          onBlur={setBlur}
          onClick={onClick}
          className="group flex items-center justify-between transition-all font-medium dark:text-neutral-100 bg-white dark:bg-neutral-900 w-full px-4 py-[0.6rem] rounded-md mt-2 border focus:ring-1 ring-gray-300 dark:ring-neutral-600 focus:ring-blue-800 dark:focus:ring-sky-900 border-gray-300 dark:border-neutral-800 focus:border-blue-800 dark:focus:border-sky-300 outline-none"
        >
          <div className="text-sm flex flex-wrap gap-y-2">{value}</div>
          <ChevronDownIcon
            className={`h-4 w-4 transition-all text-gray-400 dark:text-neutral-600 ${
              show ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      <div
        className={`${
          show
            ? "max-h-64 border dark:border-neutral-800"
            : "max-h-0 border-transparent"
        } z-50 transition-all bg-white dark:bg-neutral-900 shadow-sm absolute w-full rounded-md overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800`}
      >
        {children}
      </div>
    </div>
  );
}

MultipleSelect.item = ({ children, ...rest }) => {
  return (
    <div className="flex">
      <button
        className="outline-none flex-grow px-4 py-[0.6rem] border-b dark:border-neutral-800 flex items-center gap-2 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};
