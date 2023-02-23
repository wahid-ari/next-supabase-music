export default function Badge({ className, isLarge, children, ...rest }) {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-blue-100 text-sky-600 dark:bg-sky-600 dark:bg-opacity-10 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
}

Badge.dark = ({ className, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-gray-100 text-gray-600 dark:bg-gray-600 dark:bg-opacity-10 dark:text-gray-400 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
};

Badge.red = ({ className, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-red-100 text-red-600 dark:bg-red-600 dark:bg-opacity-10 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
};

Badge.green = ({ className, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-green-100 text-green-600 dark:bg-green-600 dark:bg-opacity-10 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
};

Badge.yellow = ({ className, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-yellow-100 text-yellow-600 dark:bg-yellow-600 dark:bg-opacity-10 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
};

Badge.indigo = ({ className, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-indigo-100 text-indigo-600 dark:bg-indigo-600 dark:bg-opacity-10 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
};

Badge.purple = ({ className, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-purple-100 text-purple-600 dark:bg-purple-600 dark:bg-opacity-10 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
};

Badge.pink = ({ className, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + ' ' : ''
      }font-semibold whitespace-nowrap bg-pink-100 text-pink-600 dark:bg-pink-600 dark:bg-opacity-10 ${
        isLarge ? 'text-sm' : 'text-xs'
      } mr-2 rounded-full px-[0.625rem] pt-[0.1rem] pb-[0.125rem]`}
    >
      {children}
    </span>
  );
};
