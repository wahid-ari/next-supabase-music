export default function Card({ className, children }) {
  return <div className={`${className} rounded-lg border p-3 dark:border-neutral-800 lg:p-6`}>{children}</div>;
}
