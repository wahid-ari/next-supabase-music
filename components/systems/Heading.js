export default function Heading({ className, h1, h2, h3, children, ...rest }) {
  if (h1) {
    return (
      <h1
        className={`${
          className ? className + " " : ""
        }text-neutral-800 font-medium dark:text-neutral-100 text-3xl mb-4`}
        {...rest}
      >
        {children}
      </h1>
    );
  } else if (h2) {
    return (
      <h2
        className={`${
          className ? className + " " : ""
        }text-neutral-800 font-medium dark:text-neutral-100 text-2xl mb-4`}
        {...rest}
      >
        {children}
      </h2>
    );
  } else if (h3) {
    return (
      <h3
        className={`${
          className ? className + " " : ""
        }text-neutral-800 font-medium dark:text-neutral-100 text-xl mb-4`}
        {...rest}
      >
        {children}
      </h3>
    );
  }
  return (
    <h4
      className={`${
        className ? className + " " : ""
      }text-neutral-800 font-medium dark:text-neutral-100 text-lg mb-4`}
      {...rest}
    >
      {children}
    </h4>
  );
}
