import clsx from 'clsx';

type Props = {
  className?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [props: string]: any;
};

export default function Input({ className, type, name, placeholder, value, onChange, ...props }: Props) {
  return (
    <div className='mb-4'>
      <input
        {...props}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          className,
          'mt-2 w-full rounded-md border bg-white px-4 py-[0.6rem] text-sm font-medium outline-none dark:bg-neutral-900',
          'border-gray-300 transition-all dark:border-neutral-700 dark:text-neutral-100',
          'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500'
        )}
        autoComplete='off'
        required
      />
    </div>
  );
}

type DisabledProps = {
  className?: string;
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  [props: string]: any;
};

Input.disabled = ({ className, type, name, placeholder, defaultValue, ...props }: DisabledProps) => {
  return (
    <div className='mb-4'>
      <input
        {...props}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx(
          className,
          'mt-2 w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-[0.6rem] text-sm font-medium',
          'outline-none transition-all dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500'
        )}
        disabled
      />
    </div>
  );
};
