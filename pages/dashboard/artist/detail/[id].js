import { useState } from 'react';
import Image from 'next/image';
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import AlbumItem from '@components/dashboard/AlbumItem';
import SongListItem from '@components/dashboard/SongListItem';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  // context.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetcher(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist?id=${id}`);
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Artist({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist?id=${id}`, fetcher);
  const [isLoading, setLoading] = useState(true);
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

  if (error) {
    return (
      <Layout title='Artist Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data[0]?.name + ' - MyMusic' : 'Artist Detail - MyMusic'}`}
      description={`${data ? 'Browse song and album by ' + data[0]?.name + ' - MyMusic' : 'Artist Detail - MyMusic'}`}
    >
      <div className='mb-10'>
        {data ? (
          <>
            <Title>{data[0]?.name}</Title>
            <p className='mb-4 text-lg'>{data[0]?.genre?.name}</p>
            {data[0]?.cover_url && (
              <div className='relative m-auto h-72 w-72 overflow-hidden sm:m-0'>
                <Image
                  alt={data[0]?.name}
                  src={data[0]?.cover_url}
                  fill
                  priority
                  sizes={`(max-width: 480px) 100vw, (max-width: 360px) 50vw, 33vw`}
                  className={`rounded-full ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <Title>Artist Detail</Title>
            <div className='flex items-center justify-center sm:block'>
              <Shimer className='mt-8 !h-72 !w-72 !rounded-full' />
            </div>
          </>
        )}
      </div>

      <Heading className='mt-2'>{data && data[0]?.name} Albums</Heading>
      <div className='mt-2 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
        {data ? (
          data[0]?.album?.map((item, index) => (
            <AlbumItem
              key={index}
              href={`/dashboard/album/detail/${item.id}`}
              imageSrc={item.cover}
              title={item.name}
              artist={data[0]?.name}
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

      <Heading className='mt-10'>{data && data[0]?.name} Songs</Heading>
      <div className='mt-2 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
        {data ? (
          data[0]?.songs?.map((item, index) => (
            <SongListItem
              key={index}
              href={`/dashboard/song/detail/${item.id}`}
              onPlay={() => handlePlay(item.name, item.preview_url)}
              imageSrc={item.cover_url}
              title={item.name}
              artist={data[0]?.name}
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

      <Transition show={showPlayer} enter='transition-opacity duration-700' enterFrom='opacity-0' enterTo='opacity-100'>
        {url ? (
          <div className='fixed bottom-4 left-4 right-6 lg:left-64'>
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
