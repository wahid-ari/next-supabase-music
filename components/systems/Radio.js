import { CheckIcon } from "@heroicons/react/outline";

export default function Radio({
  label,
  name,
  value,
  onChange,
  checked,
  ...rest
}) {
  return (
    <div className="mb-3 text-sm">
      <label className="relative cursor-pointer pl-6 select-none group pb-0.5 text-gray-800 dark:text-neutral-300">
        {label}
        <input
          {...rest}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          type="radio"
          className="absolute opacity-0 cursor-pointer w-0 h-0 peer"
        />
        <span className="mt-0.5 transition-all absolute -top-0.5 left-0 h-4 w-4 peer-checked:bg-emerald-600 dark:peer-checked:bg-emerald-500 border border-neutral-300 dark:border-neutral-800 peer-checked:border-emerald-600 dark:peer-checked:border-emerald-500 group-hover:peer-checked:border-neutral-300 dark:group-hover:peer-checked:border-neutral-800 rounded-full group-hover:border-emerald-600 dark:group-hover:border-emerald-500"></span>
        <CheckIcon className="mt-[0.05rem] h-3.5 w-3.5 text-white absolute top-[0.05rem] left-[0.05rem] hidden peer-checked:block" />
      </label>
    </div>
  );
}

Radio.disabled = ({ name, checked, ...rest }) => {
  return (
    <div className="mb-3 text-sm cursor-not-allowed">
      <label className="pointer-events-none relative pl-6 select-none pb-0.5 text-gray-800 dark:text-neutral-300">
        {name}
        <input
          {...rest}
          checked={checked}
          type="radio"
          className="absolute opacity-0 w-0 h-0 peer"
        />
        <span className="mt-0.5 transition-all absolute -top-0.5 left-0 h-4 w-4 peer-checked:bg-emerald-600 dark:peer-checked:bg-emerald-500 border border-neutral-300 dark:border-neutral-800 peer-checked:border-emerald-600 dark:peer-checked:border-emerald-500 rounded-full"></span>
        <CheckIcon className="mt-[0.05rem] h-3.5 w-3.5 text-white absolute top-[0.05rem] left-[0.05rem] hidden peer-checked:block" />
      </label>
    </div>
  );
};
