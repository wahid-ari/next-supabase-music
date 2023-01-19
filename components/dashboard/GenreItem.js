import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";

export default function GenreItem({ href = "#", title = "Genre", index, ...props }) {
  const colors = ["#36b9cc", "#1cc88a", "#6f42c1", "#e74a3b", "#fd7e14", "#f6c23e", "#84cc16", "#22c55e", "#2563eb", "#f43f5e", "#8b5cf6", "#ea580c", "#facc15"];
  const className = "duration-500 ease-in-out transform rounded brightness-90 transition will-change-auto group-hover:brightness-110";
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className="group focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded" {...props}>
      <div className="relative h-52 mb-2">
        {title.toLowerCase() == "pop" ?
          <Image alt={title} src="/genre/pop.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "rock" ?
            <Image alt={title} src="/genre/rock.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "alternative" ?
            <Image alt={title} src="/genre/alternative.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "electronic" ?
            <Image alt={title} src="/genre/electronic.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "classical" ?
            <Image alt={title} src="/genre/classical.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "country" ?
            <Image alt={title} src="/genre/country.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "hiphop" ?
            <Image alt={title} src="/genre/hiphop.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "jazz" ?
            <Image alt={title} src="/genre/jazz.webp" className={className} fill sizes={sizes} />
          : title.toLowerCase() == "rnb" ?
            <Image alt={title} src="/genre/rnb.webp" className={className} fill sizes={sizes} />
          : 
          <div 
            style={{ background: `linear-gradient(${colors[index]}, ${colors[index+2]})` }} 
            className="flex items-center justify-center w-full h-full duration-500 ease-in-out transform rounded brightness-90 transition will-change-auto group-hover:brightness-110"
          >
            <p className="text-4xl font-semibold text-white">{title}</p>
          </div>
        }
      </div>
      <Text.medium className="group-hover:text-emerald-500 transition-all duration-500">{title}</Text.medium>
    </Link>
  )
}