import Text from '@components/systems/Text';
import Link from 'next/link';

export default function VideoCard({ id, link, title, onDelete }) {
  // remove "https://www.youtube.com/watch?v="
  const linkVideo = link.substr(32);

  return (
    <div className='w-full px-2 py-4 md:w-1/2'>
      <div className='rounded-lg border border-gray-100 p-4 shadow dark:border-neutral-800'>
        <div className='h-72 overflow-hidden rounded-lg'>
          <iframe
            className='h-full w-full object-cover object-center'
            src={`https://www.youtube.com/embed/${linkVideo}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <div className='flex justify-center gap-2'>
          <Link
            href={`/webdesa/video/edit/${id}`}
            className='mt-4 rounded border-0 bg-blue-500 py-1 px-4 text-sm text-white hover:bg-blue-600 focus:outline-none'
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className='mt-4 rounded border-0 bg-red-500 py-1 px-4 text-sm text-white hover:bg-red-600 focus:outline-none'
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
