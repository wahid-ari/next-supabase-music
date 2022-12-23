export default function Badge({ className, isLarge, children, ...rest }) {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-blue-100 dark:bg-sky-600 dark:bg-opacity-10 text-sky-600 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
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
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-gray-100 dark:bg-gray-600 dark:bg-opacity-10 text-gray-600 dark:text-gray-400 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
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
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-red-100 dark:bg-red-600 dark:bg-opacity-10 text-red-600 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
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
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-green-100 dark:bg-green-600 dark:bg-opacity-10 text-green-600 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
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
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-yellow-100 dark:bg-yellow-600 dark:bg-opacity-10 text-yellow-600 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
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
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-indigo-100 dark:bg-indigo-600 dark:bg-opacity-10 text-indigo-600 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
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
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-purple-100 dark:bg-purple-600 dark:bg-opacity-10 text-purple-600 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
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
        className ? className + " " : ""
      }font-semibold whitespace-nowrap bg-pink-100 dark:bg-pink-600 dark:bg-opacity-10 text-pink-600 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] pt-[0.1rem] pb-[0.125rem] rounded-full`}
    >
      {children}
    </span>
  );
};
