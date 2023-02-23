export default function LabeledInput({
  id,
  wrapperClassName,
  className,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  ...rest
}) {
  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <label className='block text-sm text-gray-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${
          className ? className + ' ' : ''
        }text-sm mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] font-medium outline-none ring-gray-300 transition-all focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-600 dark:focus:border-emerald-300 dark:focus:ring-emerald-900`}
        autoComplete='off'
        required
      />
    </div>
  );
}

LabeledInput.disabled = ({ className, label, type, name, placeholder, defaultValue, ...rest }) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm text-gray-500 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`${
          className ? className + ' ' : ''
        }text-sm mt-2 w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-[0.6rem] font-medium outline-none transition-all dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-500`}
        disabled
      />
    </div>
  );
};
