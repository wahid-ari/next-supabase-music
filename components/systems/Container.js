export default function Container({ className, small, children, ...rest }) {
  return (
    <div
      {...rest}
      className={`${className ? className + ' ' : ''}relative ${
        small ? 'p-2' : 'p-8'
      } mb-2 rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]`}
    >
      {children}
    </div>
  );
}
