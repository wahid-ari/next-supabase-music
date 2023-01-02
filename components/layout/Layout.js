import Sidebar from "./Sidebar";
import Head from "next/head";
import Breadcrumb from "@components/systems/Breadcrumb";
import Navbar from "./Navbar";
import Menu from './Menu';
import clsx from 'clsx';

export default function Layout({ children, title, description }) {
  // Fix Warning: A title element received an array with more than 1 element as children.In browsers title Elements can only have Text Nodes as ldren.If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in
  // the title and hydration will likely fail and fall back to client rendering
  // https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196
  let headTitle = `${title}`
  let headDescription = `${description ? description : title}`

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDescription}></meta>
      </Head>

      <div className="min-h-screen w-screen lg:grid text-sm font-inter bg-white dark:bg-neutral-900"
        style={{ gridTemplateColumns: "auto 1fr" }}>

        <Sidebar />

        <div className="relative">

          <Navbar />

          {/* Show on Mobile */}
          <div className={clsx("lg:hidden flex gap-x-4 items-center justify-between border-b dark:border-neutral-800 pl-1 pr-3 sm:px-2 py-3",
            "bg-white/95 dark:bg-neutral-900/90 overflow-x-auto",
            "scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800")}>
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div className={clsx("hidden lg:flex gap-x-4 items-center justify-between border-b dark:border-neutral-800 pl-1 pr-3 sm:px-2 py-3",
            "z-40 sticky top-0 bg-white/95 dark:bg-neutral-900/90 supports-[backdrop-filter]:backdrop-blur-sm")}>
            <Breadcrumb />
            <Menu />
          </div>

          <div className="pl-2 pr-4 sm:pl-4 sm:pr-6 py-4">
            {children}
          </div>

        </div>
      </div>
    </>
  );
}
