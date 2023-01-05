import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";

export default function AlbumItem({ href = "#", imageSrc = "/genre/pop.webp", className, title = "Song Title", artist = "Artist Name", ...props }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <Link {...props} href={href} className={`p-0 group border dark:border-neutral-800 rounded ${className}`}>
      <div className="relative h-44 overflow-hidden">
        <Image
          alt={title}
          src={imageSrc}
          className={`duration-500 ease-in-out transform rounded-t brightness-90 transition will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
          fill
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="p-4">
        <Text.medium className="mb-1 group-hover:text-emerald-500 group-hover:underline transition-all duration-500">{title}</Text.medium>
        <Text.light className="text-[13px]">{artist}</Text.light>
      </div>
    </Link>
  )
}