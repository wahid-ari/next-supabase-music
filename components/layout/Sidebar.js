import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "@utils/GlobalContext";
import {
  XIcon,
  LogoutIcon,
  ViewGridIcon,
  CogIcon,
  TemplateIcon,
  CollectionIcon,
  UserGroupIcon,
  MusicNoteIcon,
  ColorSwatchIcon,
  BookmarkIcon,
  ChartPieIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import NavLink from "@components/systems/NavLink";
import NavAccordion from "@components/systems/NavAccordion";
import clsx from "clsx";
import ThemeChanger from "./ThemeChanger";
import nookies from "nookies";

export default function Sidebar() {
  const router = useRouter();
  const { showNav, setShowNav } = useContext(GlobalContext);

  const hideMenu = () => {
    setShowNav(false);
  };

  useEffect(() => {
    setShowNav(false);
  }, [router.pathname, setShowNav]);

  async function handleLogout() {
    // sometimes, this not work,
    // the token has been deleted in backend, 
    // but the cookies in browser still exist
    nookies.destroy(null, "username");
    nookies.destroy(null, "name");
    // so try this, seems work
    document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

    router.push("/login");
  }

  return (
    <div
      className={`${showNav ? "fixed lg:relative" : "hidden lg:flex lg:sticky top-0"
        } z-50 w-screen lg:w-60 flex flex-nowrap flex-col bg-white dark:bg-neutral-900 border-r dark:border-neutral-800 max-h-screen h-screen`}
    >

      <div className="flex justify-between items-center gap-2 px-4">
        <button className="lg:hidden" onClick={hideMenu} id="closemenu" aria-label="Close Menu">
          <XIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-all" />
        </button>
        <p className="tracking-wide text-base text-left font-semibold py-2.5 text-neutral-800 dark:text-neutral-100">
          Music
        </p>
        <div className="cursor-pointer pt-1">
          <ThemeChanger />
        </div>
      </div>

      <div className={clsx("pt-4 px-4 border-t dark:border-neutral-800 flex flex-nowrap flex-col flex-grow overflow-auto",
        "scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800"
      )}>

        <NavLink isHome href="/" icon={<ViewGridIcon className="w-4 h-4" />}>
          Dashboard
        </NavLink>

        <NavLink href="/search" icon={<SearchIcon className="w-4 h-4" />} className="mt-1">
          Search
        </NavLink>

        <NavLink href="/statistics" icon={<ChartPieIcon className="w-4 h-4" />} className="mt-1">
          Statistics
        </NavLink>

        <NavLink href="/song" icon={<MusicNoteIcon className="w-4 h-4" />} className="mt-1">
          Song
        </NavLink>

        <NavLink href="/album" icon={<CollectionIcon className="w-4 h-4" />} className="mt-1">
          Album
        </NavLink>

        <NavLink href="/artist" icon={<UserGroupIcon className="w-4 h-4" />} className="mt-1">
          Artist
        </NavLink>

        <NavLink href="/genre" icon={<ColorSwatchIcon className="w-4 h-4" />} className="mt-1">
          Genre
        </NavLink>

        <NavLink href="/playlist" icon={<BookmarkIcon className="w-4 h-4" />} className="mt-1">
          Playlist
        </NavLink>

        <NavLink href="/settings" icon={<CogIcon className="w-4 h-4" />} className="mt-1">
          Settings
        </NavLink>

        <NavAccordion title="Design" routeName="design" icon={<TemplateIcon className="w-4 h-4" />}>
          <NavLink
            href="/design"
            icon={<TemplateIcon className="w-4 h-4" />}
          >
            Example
          </NavLink>
        </NavAccordion>
      </div>

      <hr className="dark:border-neutral-800" />
      <div className="px-4 py-2">
        <button
          onClick={handleLogout}
          className={clsx("transition-all w-full px-4 py-2 flex justify-start items-center gap-2 text-sm font-semibold",
            "rounded hover:bg-red-100 dark:hover:bg-neutral-800 text-red-600")}
        >
          <LogoutIcon className="w-4 h-4" />
          Log out
        </button>
      </div>

    </div>
  );
}
