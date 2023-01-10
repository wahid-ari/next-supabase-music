import { useContext, useState, useEffect } from 'react';
import Link from "next/link";
import { MenuIcon } from "@heroicons/react/solid";
import { GlobalContext } from "@utils/GlobalContext";
import Menu from './Menu';
import clsx from "clsx";
import ThemeChanger from './ThemeChanger';
import nookies from "nookies";

export default function Navbar() {
  const { setShowNav } = useContext(GlobalContext);
  const admin = nookies.get(null, "name")
  const [mounted, setMounted] = useState(false)
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const showMenu = () => {
    setShowNav(true);
  };

  return (
    <div className={clsx("lg:hidden sticky top-0 z-40 h-11 bg-white dark:bg-neutral-900 dark:text-neutral-50",
      "w-full flex justify-between items-center gap-4 pl-2 pr-3 sm:pl-3 sm:pr-4 border-b dark:border-neutral-800")
    }>
      <div className="flex gap-x-4">
        <button className="outline-none" id="menu" aria-label="Menu">
          <MenuIcon className="h-5 w-5" onClick={showMenu} />
        </button>
        <Link href="/" className="text-base tracking-wide text-center font-semibold lg:text-2xl text-neutral-800 dark:text-neutral-100 no-underline">
          Music
        </Link>
      </div>

      <div className="flex items-center gap-3">

        <div className="cursor-pointer pt-1">
          <ThemeChanger />
        </div>

        {mounted &&
          admin.name ?
          <Menu className="lg:hidden" />
          :
          null
        }
      </div>
    </div>
  );
}
