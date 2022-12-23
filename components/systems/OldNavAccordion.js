import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRef, useState, useEffect } from "react";

export default function OldNavAccordion({ routeName, title, children }) {
  const router = useRouter();
  const [expand, setExpand] = useState(false);
  const boxRef = useRef();

  const handleToggle = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    if (router.pathname.includes(routeName)) {
      setExpand(true);
    } else {
      setExpand(false);
    }
  }, [router.pathname]);

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`transition-all outline-none w-full px-4 py-3 flex justify-start items-center gap-2 rounded-lg font-bold text-gray-500 dark:text-neutral-500 hover:text-blue-800 dark:hover:text-neutral-400`}
      >
        <span className="flex-grow text-left font-bold text-sm">{title}</span>
        <ChevronRightIcon
          className={`${
            expand ? "rotate-90" : "rotate-0"
          } transition-all w-5 h-5`}
        />
      </button>
      <div
        ref={boxRef}
        style={{
          maxHeight: expand ? `${boxRef.current.scrollHeight ?? 0}px` : 0,
        }}
        className={`relative pl-4 transition-all overflow-hidden`}
      >
        {children}
      </div>
      <hr className="dark:border-neutral-800" />
    </div>
  );
}
