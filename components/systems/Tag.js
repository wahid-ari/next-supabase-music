import { XIcon } from "@heroicons/react/solid";

export default function Tag({ className, noX, isLarge, children, ...rest }) {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-blue-100 dark:bg-sky-600 text-sky-800 dark:text-sky-50 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
}

Tag.dark = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
};

Tag.red = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
};

Tag.green = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
};

Tag.yellow = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
};

Tag.indigo = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
};

Tag.purple = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
};

Tag.pink = ({ className, noX, isLarge, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={`${
        className ? className + " " : ""
      }flex items-center justify-between gap-2 font-semibold outline-none whitespace-nowrap bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 ${
        isLarge ? "text-sm" : "text-xs"
      } mr-2 px-[0.625rem] py-[0.1rem] rounded-full`}
    >
      <span>{children}</span>
      {!noX && <XIcon className="w-3 h-3" />}
    </span>
  );
};
