export default function Select({ label, id, name, className, defaultValue, onChange, children, ...rest }) {
  return (
    <div className=''>
      {label && (
        <label htmlFor={name} className='block text-sm text-neutral-800 dark:text-gray-300'>
          {label}
        </label>
      )}
      <select
        {...rest}
        id={id}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`
          ${className ? className + ' ' : ''}
          mt-2 block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-[0.3rem]
          text-sm font-medium outline-none  
          transition-all focus:border-emerald-500 focus:outline-none 
          focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white
        `}
      >
        {children}
      </select>
    </div>
  );
}

Select.option = ({ value, children, ...rest }) => {
  return (
    <option value={value} {...rest}>
      {children}
    </option>
  );
};
