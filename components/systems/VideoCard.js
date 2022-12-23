import Text from "@components/systems/Text";
import Link from "next/link";

export default function VideoCard({ id, link, title, onDelete }) {
  // remove "https://www.youtube.com/watch?v="
  const linkVideo = link.substr(32)

  return (
    <div className="w-full md:w-1/2 px-2 py-4">
      <div className="border-gray-100 border dark:border-neutral-800 p-4 rounded-lg shadow">
        <div className="rounded-lg h-72 overflow-hidden">
          <iframe className="object-cover object-center h-full w-full"
            src={`https://www.youtube.com/embed/${linkVideo}`} title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
        <div className="flex justify-center gap-2">
          <Link href={`/webdesa/video/edit/${id}`} className="text-sm mt-4 text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded">
            Edit
          </Link>
          <button onClick={onDelete}
            className="text-sm mt-4 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded">Hapus</button>
        </div>
      </div>
    </div>
  )
}