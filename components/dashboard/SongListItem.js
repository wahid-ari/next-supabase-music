import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";
import { PlayIcon } from "@heroicons/react/solid";

export default function SongListItem({ onPlay, href = "#", imageSrc = "/genre/pop.webp", className, title = "Song Title", artist = "Artist Name", hideArtist, ...props }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className={`p-2 flex items-center justify-between gap-2 border dark:border-neutral-800 rounded ${className}`}>
      <Link {...props} href={href} className="group">
        <div className="flex items-center gap-2">
          <div className="relative h-12 w-12 overflow-hidden rounded">
            <Image
              alt={title}
              src={imageSrc}
              className={`duration-500 ease-in-out transform rounded-t brightness-90 transition will-change-auto group-hover:brightness-110
              ${isLoading ? 'blur-2xl' : 'blur-0'}`}
              fill
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <div>
            <Text.medium className="mb-1 group-hover:text-emerald-500 transition-all duration-500">{title}</Text.medium>
            {!hideArtist && <Text.light className="text-[13px]">{artist}</Text.light>}
          </div>
        </div>
      </Link>
      <button title="Play Preview" onClick={onPlay} className="text-neutral-600 hover:text-emerald-500 dark:text-neutral-200 dark:hover:text-emerald-500 transition-all duration-300">
        <PlayIcon className="h-7 w-7 " />
      </button>
    </div>
  )
}