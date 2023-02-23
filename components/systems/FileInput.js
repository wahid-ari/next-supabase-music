import { PlusIcon } from '@heroicons/react/solid';
import { useRef } from 'react';
import Button from './Button';

export default function FileInput({ id, className, label, type = 'file', name, value, onChange, ...rest }) {
  const ref = useRef();

  const handleClick = () => {
    ref.current.click();
  };

  return (
    <div className='mb-4'>
      <label className='block text-sm text-gray-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <Button.secondary onClick={handleClick} className='mt-2 w-full truncate'>
        {value !== '' ? (
          value
        ) : (
          <span>
            <PlusIcon className='inline h-4 w-4' /> File
          </span>
        )}
      </Button.secondary>
      <input
        ref={ref}
        {...rest}
        id={id}
        type={type}
        name={name}
        value=''
        onChange={onChange}
        className={`${
          className ? className + ' ' : ''
        }hidden mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-blue-800 focus:ring-1 focus:ring-blue-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-600 dark:focus:border-sky-300 dark:focus:ring-sky-900`}
        required
      />
    </div>
  );
}
