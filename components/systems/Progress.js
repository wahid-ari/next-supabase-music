export default function Progress({ className, percent }) {
  return (
    <div
      className={`${className ? className + " " : ""
        }w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-1`}
    >
      <div
        className="bg-emerald-600 dark:bg-emerald-500 h-1 rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

Progress.percentage = ({ className, percent }) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full">
      {percent > 0 ?
        <div className={`bg-emerald-600 text-xs font-medium text-emerald-100 text-center p-0.5 leading-none rounded-full ${className && className}`}
          style={{ width: percent + "%" }}>
          {percent} %
        </div>
        :
        <div className="text-xs font-medium text-gray-800 dark:text-neutral-200 text-center p-0.5 leading-none rounded-full"
          style={{ width: percent + "%" }}>
          0%
        </div>
      }
    </div>
  )
}