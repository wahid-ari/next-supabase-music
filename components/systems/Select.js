export default function Select({ label, id, name, className, defaultValue, onChange, children, ...rest }) {
  return (
    <div className="">
      {label &&
        <label htmlFor={name} className="block text-sm text-neutral-800 dark:text-gray-300">
          {label}
        </label>
      }
      <select
        {...rest}
        id={id}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`
          ${className ? className + " " : ""}
          cursor-pointer mt-2 block w-full px-3 py-[0.3rem] text-sm font-medium rounded-md transition-all
          dark:text-white bg-white dark:bg-neutral-900  
          border border-gray-300 dark:border-neutral-700 
          focus:ring-1 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 outline-none
        `}
      >
        {children}
      </select>
    </div>
  )
}

Select.option = ({ value, children, ...rest }) => {
  return (
    <option value={value} {...rest}>
      {children}
    </option>
  )
}