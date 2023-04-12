import clsx from 'clsx';

type Props = {
  id?: string;
  wrapperClassName?: string;
  className?: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [props: string]: any;
};

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
  ...props
}: Props) {
  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <label className='block text-sm text-gray-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          className,
          'mt-2 w-full rounded-md px-4 py-[0.6rem] text-sm font-medium transition-all dark:text-neutral-100',
          'border-gray-300 bg-white outline-none dark:border-neutral-700 dark:bg-neutral-900',
          'border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500'
        )}
        autoComplete='off'
        required
      />
    </div>
  );
}

type DisabledProps = {
  className?: string;
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  [props: string]: any;
};

LabeledInput.disabled = ({ className, label, type, name, placeholder, defaultValue, ...props }: DisabledProps) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm text-gray-500 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx(
          className,
          'mt-2 w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-[0.6rem] text-sm',
          'font-medium outline-none transition-all dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-500'
        )}
        disabled
      />
    </div>
  );
};
