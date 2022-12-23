export default function Section({ className, children }) {
  return (
    <section
      className={`${className} py-4 lg:py-8 p-8 mb-2 rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]`}
    >
      {children}
    </section>
  );
}

Section.small = ({ className, children }) => {
  return (
    <section
      className={`${className} py-2 my-2 p-8 mb-2 rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]`}
    >
      {children}
    </section>
  );
};
