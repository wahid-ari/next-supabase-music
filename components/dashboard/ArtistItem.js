import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";

export default function ArtistItem({ href = "#", imageSrc = "/genre/pop.webp", title = "Genre", ...props }) {
  const [isLoading, setLoading] = useState(true)
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className="group text-center p-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded" {...props}>
      <div className="relative h-44 w-44 mb-2 overflow-hidden mx-auto">
        <Image
          alt={title}
          src={imageSrc}
          className={`duration-500 ease-in-out transform rounded-full brightness-90 transition will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
          fill
          sizes={sizes}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <Text.medium className="group-hover:text-emerald-500 transition-all duration-500">{title}</Text.medium>
    </Link>
  )
}