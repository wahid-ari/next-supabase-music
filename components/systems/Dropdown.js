import { useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

export default function Dropdown({ id, name, label, show, value, onClick, onBlur, children, ...rest }) {
  const buttonRef = useRef(null);
  const ref = useRef(null);
  const setBlur = (e) => {
    if (show && ref.current && !ref.current.contains(e.target)) {
      onBlur(buttonRef.current);
    }
  };

  useEffect(() => {
    document.addEventListener('click', setBlur);
    document.addEventListener('keydown', setBlur);
    return () => {
      document.removeEventListener('click', setBlur);
      document.removeEventListener('keydown', setBlur);
    };
  });

  return (
    <div className='relative mb-4' ref={ref}>
      <div className='mb-1'>
        <label className='block text-sm text-gray-800 dark:text-neutral-300'>{label}</label>
        <button
          ref={buttonRef}
          {...rest}
          type='button'
          id={id}
          name={name}
          onClick={onClick}
          onBlur={setBlur}
          className='group mt-2 flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-blue-800 focus:ring-1 focus:ring-blue-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-600 dark:focus:border-sky-300 dark:focus:ring-sky-900'
        >
          <span>{value}</span>
          <ChevronDownIcon
            className={`h-4 w-4 text-gray-400 transition-all dark:text-neutral-600 ${show ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>
      <div
        className={`${
          show ? 'max-h-64 border dark:border-neutral-800' : 'max-h-0 border-transparent'
        } absolute z-50 w-full overflow-y-auto rounded-md bg-white shadow-sm transition-all scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:bg-neutral-900 dark:scrollbar-thumb-neutral-800`}
      >
        {children}
      </div>
    </div>
  );
}

Dropdown.item = ({ children, ...rest }) => {
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
