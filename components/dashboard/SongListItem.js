import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PlayIcon } from '@heroicons/react/solid';

export default function SongListItem({
  noPlayer,
  onPlay,
  href = '#',
  imageSrc = '/genre/pop.webp',
  className,
  title = 'Song Title',
  artist = 'Artist Name',
  hideArtist,
  ...props
}) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 120px) 100vw, (max-width: 120px) 50vw, (max-width: 120px) 33vw`;

  if (noPlayer) {
    return (
      <Link
        {...props}
        href={href}
        className={`group rounded border p-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 dark:border-neutral-800 ${className}`}
      >
        <div className='flex items-center gap-2'>
          <div className='relative h-12 w-12 overflow-hidden rounded'>
            <Image
              alt={title}
              src={imageSrc}
              className={`transform rounded-t brightness-90 transition duration-500 ease-in-out will-change-auto group-hover:brightness-110
              ${isLoading ? 'blur-2xl' : 'blur-0'}`}
              fill
              sizes={sizes}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <div>
            <Text.medium className='mb-1 transition-all duration-500 group-hover:text-emerald-500'>{title}</Text.medium>
            {!hideArtist && <Text.light className='text-[13px]'>{artist}</Text.light>}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={`flex items-center justify-between gap-2 rounded border p-2 dark:border-neutral-800 ${className}`}>
      <Link
        {...props}
        href={href}
        className='group rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
      >
        <div className='flex items-center gap-2'>
          <div className='relative h-12 w-12 overflow-hidden rounded'>
            <Image
              alt={title}
              src={imageSrc}
              className={`transform rounded-t brightness-90 transition duration-500 ease-in-out will-change-auto group-hover:brightness-110
              ${isLoading ? 'blur-2xl' : 'blur-0'}`}
              fill
              sizes={sizes}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <div>
            <Text.medium className='mb-1 transition-all duration-500 group-hover:text-emerald-500'>{title}</Text.medium>
            {!hideArtist && <Text.light className='text-[13px]'>{artist}</Text.light>}
          </div>
        </div>
      </Link>
      <button
        title='Play Preview'
        onClick={onPlay}
        className='rounded text-neutral-600 transition-all duration-300 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 dark:text-neutral-200 dark:hover:text-emerald-500'
      >
        <PlayIcon className='h-7 w-7 ' />
      </button>
    </div>
  );
}
