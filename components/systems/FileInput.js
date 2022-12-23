import { PlusIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import Button from "./Button";

export default function FileInput({
  id,
  className,
  label,
  type = "file",
  name,
  value,
  onChange,
  ...rest
}) {
  const ref = useRef();

  const handleClick = () => {
    ref.current.click();
  };

  return (
    <div className="mb-4">
      <label
        className="text-sm block text-gray-800 dark:text-neutral-300"
        htmlFor={name}
      >
        {label}
      </label>
      <Button.secondary onClick={handleClick} className="mt-2 w-full truncate">
        {value !== "" ? (
          value
        ) : (
          <span>
            <PlusIcon className="w-4 h-4 inline" /> File
          </span>
        )}
      </Button.secondary>
      <input
        ref={ref}
        {...rest}
        id={id}
        type={type}
        name={name}
        value=""
        onChange={onChange}
        className={`${
          className ? className + " " : ""
        }hidden text-sm transition-all font-medium dark:text-neutral-100 bg-white dark:bg-neutral-900 w-full px-4 py-[0.6rem] rounded-md mt-2 border focus:ring-1 ring-gray-300 dark:ring-neutral-600 focus:ring-blue-800 dark:focus:ring-sky-900 border-gray-300 dark:border-neutral-800 focus:border-blue-800 dark:focus:border-sky-300 outline-none`}
        required
      />
    </div>
  );
}
