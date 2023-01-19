import { useEffect, useState } from "react";
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

export default function ThemeChanger() {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    theme == 'dark' ?
      <button onClick={() => setTheme('light')} aria-label="Light" className="focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
        <SunIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-200 transition-all" />
      </button>
      :
      <button onClick={() => setTheme('dark')} aria-label="Dark" className="focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
        <MoonIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-all" />
      </button>
  )
}