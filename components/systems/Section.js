export default function Section({ className, children }) {
  return (
    <section
      className={`${className} mb-2 rounded-md border bg-white p-8 py-4 dark:border-neutral-800 dark:bg-[#1F1F1F] lg:py-8`}
    >
      {children}
    </section>
  );
}

Section.small = ({ className, children }) => {
  return (
    <section
      className={`${className} my-2 mb-2 rounded-md border bg-white p-8 py-2 dark:border-neutral-800 dark:bg-[#1F1F1F]`}
    >
      {children}
    </section>
  );
};
