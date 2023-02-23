import Image from 'next/image';
import Link from 'next/link';
import Heading from './Heading';

export default function FotoCard({ id, image, title, onDelete }) {
  return (
    <div className='w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4'>
      <div className='relative w-full rounded-lg bg-black py-16 px-10'>
        <Image
          alt='gallery'
          src={image}
          layout='fill'
          className='absolute inset-0 block h-full w-full rounded-lg object-cover object-center opacity-50'
        />
        <div className='relative z-10 w-full text-center'>
          <Heading h2 className='text-white'>
            {title}
          </Heading>
          <div className='flex justify-center gap-2'>
            <Link
              href={`/webdesa/foto/edit/${id}`}
              className='rounded border-0 bg-blue-500 py-1 px-4 text-sm text-white hover:bg-blue-600 focus:outline-none'
            >
              Edit
            </Link>
            <button
              onClick={onDelete}
              className='rounded border-0 bg-red-500 py-1 px-4 text-sm text-white hover:bg-red-600 focus:outline-none'
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
