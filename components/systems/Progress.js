export default function Progress({ className, percent }) {
  return (
    <div className={`${className ? className + ' ' : ''}w-full h-1 rounded-full bg-gray-200 dark:bg-neutral-800`}>
      <div className='h-1 rounded-full bg-emerald-600 dark:bg-emerald-500' style={{ width: `${percent}%` }}></div>
    </div>
  );
}

Progress.percentage = ({ className, percent }) => {
  return (
    <div className='w-full rounded-full bg-gray-200 dark:bg-neutral-800'>
      {percent > 0 ? (
        <div
          className={`rounded-full bg-emerald-600 p-0.5 text-center text-xs font-medium leading-none text-emerald-100 ${
            className && className
          }`}
          style={{ width: percent + '%' }}
        >
          {percent} %
        </div>
      ) : (
        <div
          className='rounded-full p-0.5 text-center text-xs font-medium leading-none text-gray-800 dark:text-neutral-200'
          style={{ width: percent + '%' }}
        >
          0%
        </div>
      )}
    </div>
  );
};
