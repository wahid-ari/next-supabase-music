import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";

export default function SongListItem({ href = "#", imageSrc = "/genre/pop.webp", className, title = "Song Title", artist = "Artist Name", hideArtist, ...props }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <Link {...props} href={href} className={`p-2 flex items-center gap-2 group border dark:border-neutral-800 rounded ${className}`}>
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
      <div className="">
        <Text.medium className="mb-1 group-hover:text-emerald-500 transition-all duration-500">{title}</Text.medium>
        {!hideArtist && <Text.light className="text-[13px]">{artist}</Text.light>}
      </div>
    </Link>
  )
}