import { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import SongListItem from '@components/dashboard/SongListItem';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  // context.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetcher(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/album/detail?id=${id}`);
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/album/detail?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Album({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/album/detail?id=${id}`, fetcher);
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
      <Layout title='Album Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.data[0]?.name + ' - ' + data?.artist[0]?.name + ' - MyMusic' : 'Album Detail - MyMusic'}`}
      description={`${
        data
          ? 'Listen to ' + data?.data[0]?.name + ' by ' + data?.artist[0]?.name + ' - MyMusic'
          : 'Album Detail - MyMusic'
      }`}
    >
      <div className='mb-6'>
        {data ? (
          <>
            <Title>{data?.data[0]?.name}</Title>
            <Heading className='mt-2'>{data?.artist[0]?.name}</Heading>
          </>
        ) : (
          <Title>Album Detail</Title>
        )}
      </div>

      <div className='mt-6 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
        {data ? (
          data?.data[0]?.songs?.map((item, index) => (
            <SongListItem
              key={index}
              href={`/dashboard/song/detail/${item.id}`}
              onPlay={() => handlePlay(item.name, item.preview_url)}
              imageSrc={item.cover_url}
              title={item.name}
              artist={data?.artist[0]?.name}
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
