import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import { Transition } from '@headlessui/react';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import GenreItem from '@components/dashboard/GenreItem';
import ArtistItem from '@components/dashboard/ArtistItem';
import AlbumItem from '@components/dashboard/AlbumItem';
import PlaylistItem from '@components/dashboard/PlaylistItem';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline';
import SongListItem from '@components/dashboard/SongListItem';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Home() {
  const router = useRouter();
  const { query } = router;
  const { data: genre, error: errorGenre } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, fetcher);
  const { data: songs, error: errorSongs } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`, fetcher);
  const { data: albums, error: errorAlbums } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`, fetcher);
  const { data: artists, error: errorArtists } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`, fetcher);
  const { data: playlists, error: errorPlaylists } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist`,
    fetcher
  );
  const { data: artistByGenre, error: errorArtistByGenre } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre?id=${query.genre}`,
    fetcher
  );
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  function handlePlay(song, url) {
    if (url !== '') {
      setName(song);
      setUrl(url);
    } else {
      setName(name);
      setUrl(null);
    }
    setShowPlayer(true);
  }

  function handleClosePlayer() {
    setName('');
    setUrl('');
    setShowPlayer(false);
  }

  if (errorGenre || errorSongs || errorAlbums || errorArtists || errorPlaylists || errorArtistByGenre) {
    return (
      <Layout title='Dashboard - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  if (query.genre) {
    return (
      <Layout title={artistByGenre ? artistByGenre[0]?.name + ' - MyMusic' : 'Genre - MyMusic'}>
        <Title>{artistByGenre ? artistByGenre[0]?.name : 'Genre - MyMusic'}</Title>
        <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {artistByGenre ? (
            artistByGenre[0]?.artists?.map((item, index) => (
              <ArtistItem
                key={index}
                href={`/dashboard/artist/detail/${item.id}`}
                imageSrc={item.cover_url}
                title={item.name}
              />
            ))
          ) : (
            <>
              <div className='flex items-center justify-center'>
                <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
              </div>
              <div className='flex items-center justify-center'>
                <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
              </div>
              <div className='flex items-center justify-center'>
                <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
              </div>
              <div className='flex items-center justify-center'>
                <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
              </div>
            </>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title='Dashboard - MyMusic'>
      <Title>Dashboard</Title>

      <Heading className='mt-8'>Genre</Heading>
      <div className='mt-2 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-4'>
        {genre ? (
          genre.slice(0, 4).map((item, index) => <GenreItem key={index} href={`?genre=${item.id}`} title={item.name} />)
        ) : (
          <>
            <Shimer className='!h-60 w-full' />
            <Shimer className='!h-60 w-full' />
            <Shimer className='!h-60 w-full' />
            <Shimer className='!h-60 w-full' />
          </>
        )}
      </div>

      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Songs</Heading>
        <Link
          href={`dashboard/song`}
          className='rounded text-[15px] font-medium text-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
        >
          View All
        </Link>
      </div>
      {songs ? (
        songs.length >= 10 ? (
          <Splide
            aria-label='Songs'
            className='hidden xl:block'
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500,
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className='grid grid-cols-1 gap-4 p-1 min-[500px]:grid-cols-2 md:grid-cols-3'>
                    {songs?.slice(0, 9).map((item, index) => (
                      <SongListItem
                        key={index}
                        href={`/dashboard/song/detail/${item.id}`}
                        imageSrc={item.cover_url}
                        title={item.name}
                        artist={item.artists.name}
                        onPlay={() => handlePlay(item.name, item.preview_url)}
                      />
                    ))}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className='grid grid-cols-1 gap-4 p-1 min-[500px]:grid-cols-2 md:grid-cols-3'>
                    {songs?.slice(9, 18).map((item, index) => (
                      <SongListItem
                        key={index}
                        href={`/dashboard/song/detail/${item.id}`}
                        imageSrc={item.cover_url}
                        title={item.name}
                        artist={item.artists.name}
                        onPlay={() => handlePlay(item.name, item.preview_url)}
                      />
                    ))}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className='splide__arrows'>
                <button
                  title='Prev'
                  className='splide__arrow splide__arrow--prev focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
                >
                  <ArrowRightIcon />
                </button>
                <button
                  title='Next'
                  className='splide__arrow splide__arrow--next focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
        ) : null
      ) : (
        <div className='grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
          <Shimer className='!h-16 w-full' />
          <Shimer className='!h-16 w-full' />
          <Shimer className='!h-16 w-full' />
          <Shimer className='!h-16 w-full' />
          <Shimer className='!h-16 w-full' />
          <Shimer className='!h-16 w-full' />
        </div>
      )}

      <div className='mt-2 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 xl:hidden'>
        {songs ? (
          songs
            .slice(0, 12)
            .map((item, index) => (
              <SongListItem
                key={index}
                href={`/dashboard/song/detail/${item.id}`}
                imageSrc={item.cover_url}
                title={item.name}
                artist={item.artists.name}
                onPlay={() => handlePlay(item.name, item.preview_url)}
              />
            ))
        ) : (
          <>
            <Shimer className='!h-16 w-full' />
            <Shimer className='!h-16 w-full' />
            <Shimer className='!h-16 w-full' />
          </>
        )}
      </div>

      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Albums</Heading>
        <Link
          href={`dashboard/album`}
          className='rounded text-[15px] font-medium text-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
        >
          View All
        </Link>
      </div>
      {albums ? (
        albums.length >= 10 ? (
          <Splide
            aria-label='Albums'
            className='hidden xl:block'
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500,
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className='grid grid-cols-1 gap-4 p-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
                    {albums?.slice(0, 5).map((item, index) => (
                      <AlbumItem
                        key={index}
                        href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.cover}
                        title={item.name}
                        artist={item.artists.name}
                      />
                    ))}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className='grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
                    {albums?.slice(5, 10).map((item, index) => (
                      <AlbumItem
                        key={index}
                        href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.cover}
                        title={item.name}
                        artist={item.artists.name}
                      />
                    ))}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className='splide__arrows'>
                <button
                  title='Prev'
                  className='splide__arrow splide__arrow--prev !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
                >
                  <ArrowRightIcon />
                </button>
                <button
                  title='Next'
                  className='splide__arrow splide__arrow--next !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
        ) : null
      ) : (
        <div className='grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
          <Shimer className='!h-60 w-full' />
          <Shimer className='!h-60 w-full' />
          <Shimer className='!h-60 w-full' />
          <Shimer className='!h-60 w-full' />
          <Shimer className='!h-60 w-full' />
        </div>
      )}
      <div className='mt-2 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 xl:hidden xl:grid-cols-5'>
        {albums ? (
          albums
            .slice(0, 6)
            .map((item, index) => (
              <AlbumItem
                key={index}
                href={`dashboard/album/detail/${item.id}`}
                imageSrc={item.cover}
                title={item.name}
                artist={item.artists.name}
              />
            ))
        ) : (
          <>
            <Shimer className='!h-60 w-full' />
            <Shimer className='!h-60 w-full' />
            <Shimer className='!h-60 w-full' />
            <Shimer className='!h-60 w-full' />
            <Shimer className='!h-60 w-full' />
          </>
        )}
      </div>

      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Artists</Heading>
        <Link
          href={`dashboard/artist`}
          className='rounded text-[15px] font-medium text-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
        >
          View All
        </Link>
      </div>
      <div className='mt-2 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {artists ? (
          artists
            .slice(0, 4)
            .map((item, index) => (
              <ArtistItem
                key={index}
                href={`dashboard/artist/detail/${item.id}`}
                imageSrc={item.cover_url}
                title={item.name}
              />
            ))
        ) : (
          <>
            <div className='flex items-center justify-center'>
              <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
            </div>
            <div className='flex items-center justify-center'>
              <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
            </div>
            <div className='flex items-center justify-center'>
              <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
            </div>
            <div className='flex items-center justify-center'>
              <Shimer className='!mx-8 !h-44 !w-44 !rounded-full' />
            </div>
          </>
        )}
      </div>

      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Playlists</Heading>
        <Link
          href={`dashboard/playlist`}
          className='rounded text-[15px] font-medium text-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
        >
          View All
        </Link>
      </div>
      <div className='mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {playlists ? (
          playlists
            .slice(0, 4)
            .map((item, index) => (
              <PlaylistItem
                key={index}
                index={index}
                href={`/dashboard/playlist/detail/${item.id}`}
                title={item.name}
              />
            ))
        ) : (
          <>
            <Shimer className='!h-36 w-full' />
            <Shimer className='!h-36 w-full' />
            <Shimer className='!h-36 w-full' />
            <Shimer className='!h-36 w-full' />
          </>
        )}
      </div>

      <Transition
        show={showPlayer}
        enter='transition-opacity duration-700'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        {url ? (
          <div className='fixed bottom-4 left-4 right-6 z-50 lg:left-64'>
            <button
              onClick={handleClosePlayer}
              className='absolute right-2 top-2'
              id='close'
              aria-label='Close Player'
              title='Close Player'
            >
              <XIcon className='h-5 w-5 text-gray-500 transition-all hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200' />
            </button>
            <AudioPlayer
              autoPlay={true}
              src={url}
              header={name}
              layout='horizontal'
              customAdditionalControls={[]}
              className='rounded font-medium text-emerald-500 dark:bg-neutral-800 dark:text-emerald-500'
            />
          </div>
        ) : (
          <div className='fixed bottom-4 left-4 right-6 rounded bg-neutral-100 p-4 font-medium text-red-500 shadow-lg dark:bg-neutral-800 lg:left-64'>
            Audio Not Available
          </div>
        )}
      </Transition>
    </Layout>
  );
}
