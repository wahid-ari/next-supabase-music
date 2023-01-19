import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/solid";

export default function Breadcrumb() {
  const router = useRouter();
  const paths = router.pathname
    .split("/")
    .slice(1)
    .filter((r) => {
      if (r.includes("_id") || r === "[id]") {
        return false;
      }
      return true;
    });
  // const paths = router.asPath
  //   .split("/")
  //   .slice(1)
  //   .filter((r) => {
  //     if (r.includes("_id") || r === "[id]") {
  //       return false;
  //     }
  //     return true;
  //   });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav
      className="flex w-full text-sm"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex whitespace-nowrap flex-nowrap items-center space-x-1 md:space-x-1">
        <li className="inline-flex items-center">
          <Link href="/" passHref className="transition-all inline-flex items-center text-gray-600 dark:text-neutral-300 hover:text-gray-800 dark:hover:text-neutral-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
            <ChevronRightIcon className="w-5 h-5 mr-1 text-gray-500 dark:text-neutral-400" />
            Home
          </Link>
        </li>
        {paths[0] !== "" &&
          paths.map((path, index) => {
            if (index === paths.length - 1) {
              return (
                <li aria-current="page" key={index} className="flex items-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-500 dark:text-neutral-400" />
                  <span className="ml-1 text-emerald-600 dark:text-emerald-500 mr-4">
                    {capitalizeFirstLetter(path)}
                  </span>
                </li>
              );
            }
            return (
              <li key={index}>
                <div className="flex items-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  <Link
                    href={
                      (index !== 0 ? "/" : "") +
                      paths.slice(0, index).join("/") +
                      "/" +
                      path
                    }
                    className="transition-all ml-1 text-gray-600 dark:text-neutral-300 hover:text-gray-800 dark:hover:text-neutral-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded"
                  >
                    {capitalizeFirstLetter(path)}
                  </Link>
                </div>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
