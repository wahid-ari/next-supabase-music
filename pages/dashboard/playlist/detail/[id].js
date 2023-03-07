import { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import SongListItem from '@components/dashboard/SongListItem';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  // context.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetcher(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/playlist/detail?id=${id}`);
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/playlist/detail?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Playlist({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data: detailPlaylist, error: errorDetailPlaylist } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/playlist/detail?id=${id}`,
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

  if (errorDetailPlaylist) {
    return (
      <Layout title='Playlist Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={detailPlaylist ? detailPlaylist?.playlist[0]?.name + ' - MyMusic' : 'Playlist - MyMusic'}
      description={
        detailPlaylist ? 'Listen to ' + detailPlaylist?.playlist[0]?.name + ' - MyMusic' : 'Playlist - MyMusic'
      }
    >
      <Title>{detailPlaylist ? detailPlaylist?.playlist[0]?.name : 'Playlist'}</Title>
      <div className='mt-8 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
        {detailPlaylist ? (
          detailPlaylist?.song_artist?.map((item, index) => (
            <SongListItem
              key={index}
              href={`/dashboard/song/detail/${item.song_id}`}
              onPlay={() => handlePlay(item.song_name, item.song_preview_url)}
              imageSrc={item.song_cover_url}
              title={item.song_name}
              artist={item.artist_name}
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
