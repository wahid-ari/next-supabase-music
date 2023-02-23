import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useRef, useState, useEffect } from 'react';

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
        className={`flex w-full items-center justify-start gap-2 rounded-lg px-4 py-3 font-bold text-gray-500 outline-none transition-all hover:text-blue-800 dark:text-neutral-500 dark:hover:text-neutral-400`}
      >
        <span className='flex-grow text-left text-sm font-bold'>{title}</span>
        <ChevronRightIcon className={`${expand ? 'rotate-90' : 'rotate-0'} h-5 w-5 transition-all`} />
      </button>
      <div
        ref={boxRef}
        style={{
          maxHeight: expand ? `${boxRef.current.scrollHeight ?? 0}px` : 0,
        }}
        className={`relative overflow-hidden pl-4 transition-all`}
      >
        {children}
      </div>
      <hr className='dark:border-neutral-800' />
    </div>
  );
}
