import { XIcon } from '@heroicons/react/solid';

export default function Tag({ className, noX, isLarge, children, ...rest }) {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-blue-100 font-semibold text-sky-800 outline-none dark:bg-sky-600 dark:text-sky-50 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
}

Tag.dark = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-gray-100 font-semibold text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
};

Tag.red = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-red-100 font-semibold text-red-800 outline-none dark:bg-red-900 dark:text-red-200 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
};

Tag.green = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-green-100 font-semibold text-green-800 outline-none dark:bg-green-900 dark:text-green-200 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
};

Tag.yellow = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-yellow-100 font-semibold text-yellow-800 outline-none dark:bg-yellow-900 dark:text-yellow-200 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
};

Tag.indigo = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-indigo-100 font-semibold text-indigo-800 outline-none dark:bg-indigo-900 dark:text-indigo-200 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
};

Tag.purple = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-purple-100 font-semibold text-purple-800 outline-none dark:bg-purple-900 dark:text-purple-200 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
};

Tag.pink = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }flex items-center justify-between gap-2 whitespace-nowrap bg-pink-100 font-semibold text-pink-800 outline-none dark:bg-pink-900 dark:text-pink-200 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] py-[0.1rem]`}
    >
      <span>{children}</span>
      {!noX && <XIcon className='h-3 w-3' />}
    </span>
  );
};
