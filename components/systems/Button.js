export default function Button({ className, type, value, onClick, disabled, children, ...rest }) {
  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      value={value}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded bg-sky-600 px-3 py-1.5 font-medium outline-none transition-all duration-300 focus:ring-2 focus:ring-sky-400 ${
        disabled ? 'cursor-not-allowed' : 'hover:bg-sky-700'
      } text-white`}
    >
      {children}
    </button>
  );
}

Button.secondary = ({ className, type, value, onClick, disabled, children, ...rest }) => {
  return (
    <button
      {...rest}
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded bg-gray-50 px-3 py-1.5 font-medium text-neutral-800 outline-none transition-all duration-300 dark:bg-neutral-800 dark:text-neutral-300 ${
        disabled ? 'cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-neutral-900'
      } border border-neutral-300 dark:border-neutral-800`}
    >
      {children}
    </button>
  );
};

Button.tertary = ({ className, type, value, onClick, disabled, children, ...rest }) => {
  return (
    <button
      {...rest}
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded px-3 py-1.5 font-medium text-neutral-600 outline-none transition-all duration-300 ${
        disabled ? 'cursor-not-allowed' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
      } dark:text-neutral-300`}
    >
      {children}
    </button>
  );
};

Button.success = ({ className, type, value, onClick, disabled, children, ...rest }) => {
  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      value={value}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded bg-emerald-600 px-3 py-1.5 font-medium outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400 ${
        disabled ? 'cursor-not-allowed' : 'hover:bg-emerald-700'
      } text-white`}
    >
      {children}
    </button>
  );
};

Button.danger = ({ className, type, value, onClick, disabled, children, ...rest }) => {
  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      value={value}
      className={`${
        className ? className + ' ' : ''
      }text-sm rounded bg-red-500 px-3 py-1.5 font-medium outline-none transition-all duration-300 focus:ring-2 focus:ring-red-400 ${
        disabled ? 'cursor-not-allowed' : 'hover:bg-red-600'
      } text-white`}
    >
      {children}
    </button>
  );
};
