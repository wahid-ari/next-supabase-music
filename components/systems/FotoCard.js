import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";

export default function FotoCard({ id, image, title, onDelete }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="w-full bg-black py-16 px-10 relative rounded-lg">
        <Image alt="gallery" src={image} layout="fill" className="w-full rounded-lg object-cover h-full object-center block opacity-50 absolute inset-0" />
        <div className="text-center relative z-10 w-full">
          <Heading h2 className="text-white">
            {title}
          </Heading>
          <div className="flex justify-center gap-2">
            <Link href={`/webdesa/foto/edit/${id}`} className="text-white text-sm bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded">
              Edit
            </Link>
            <button onClick={onDelete}
              className="text-white text-sm bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  )
}