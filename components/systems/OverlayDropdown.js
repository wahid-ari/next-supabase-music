export default function OverlayDropdown({ show, children }) {
  return (
    <div
      className={`${
        show ? 'z-[1] max-h-64 border dark:border-neutral-800' : 'max-h-0 border-transparent'
      } absolute w-full overflow-y-auto rounded-lg bg-white text-sm shadow-sm transition-all scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:bg-neutral-900 dark:scrollbar-thumb-neutral-800`}
    >
      {children}
    </div>
  );
}

OverlayDropdown.item = ({ children, ...rest }) => {
  return (
    <div className='flex'>
      <button
        type='button'
        className='flex flex-grow cursor-pointer items-center gap-2 border-b px-4 py-[0.6rem] text-sm outline-none hover:bg-gray-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800'
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};
