export default function Label({ className, children, ...rest }) {
  return (
    <label {...rest} className={`${className ? className + ' ' : ''}block text-gray-800 dark:text-neutral-300`}>
      {children}
    </label>
  );
}
