import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";

export default function AlbumItem({ href = "#", imageSrc = "/genre/pop.webp", className, title = "Song Title", artist = "Artist Name", hideArtist, ...props }) {
  const [isLoading, setLoading] = useState(true)
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link {...props} href={href} className={`p-0 group border dark:border-neutral-800 rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 ${className}`}>
      <div className="relative h-52 sm:h-44 overflow-hidden">
        <Image
          alt={title}
          src={imageSrc}
          className={`duration-500 ease-in-out transform rounded-t brightness-90 transition will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
          fill
          sizes={sizes}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="p-4">
        <Text.medium className="mb-1 group-hover:text-emerald-500 transition-all duration-500">{title}</Text.medium>
        {!hideArtist && <Text.light className="text-[13px]">{artist}</Text.light>}
      </div>
    </Link>
  )
}