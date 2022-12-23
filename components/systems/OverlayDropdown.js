export default function OverlayDropdown({ show, children }) {
  return (
    <div
      className={`${
        show
          ? "max-h-64 dark:border-neutral-800 border z-[1]"
          : "max-h-0 border-transparent"
      } text-sm transition-all bg-white dark:bg-neutral-900 shadow-sm absolute w-full rounded-lg overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800`}
    >
      {children}
    </div>
  );
}

OverlayDropdown.item = ({ children, ...rest }) => {
  return (
    <div className="flex">
      <button
        type="button"
        className="text-sm outline-none flex-grow px-4 py-[0.6rem] border-b dark:border-neutral-800 flex items-center gap-2 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};
