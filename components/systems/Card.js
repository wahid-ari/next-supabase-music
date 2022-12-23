export default function Card({ className, children }) {
  return (
    <div
      className={`${className} p-3 lg:p-6 rounded-lg border dark:border-neutral-800`}
    >
      {children}
    </div>
  );
}
