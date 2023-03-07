import { useState } from 'react';
import Image from 'next/image';
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  // context.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetcher(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song?id=${id}`);
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Song({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song?id=${id}`, fetcher);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Song Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data[0]?.name + ' - ' + data[0]?.artists?.name + ' - MyMusic' : 'Song Detail - MyMusic'}`}
      description={`${
        data ? 'Listen to ' + data[0]?.name + ' by ' + data[0]?.artists?.name + ' - MyMusic' : 'Song Detail - MyMusic'
      }`}
    >
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data[0]?.name}</Title> : <Title>Song Detail</Title>}
      </div>

      {data ? (
        <div>
          <p className='text-xl font-semibold'>{data[0].artists.name}</p>
          <p className='mt-2 text-base font-medium'>{data[0].album?.name}</p>
          {data[0]?.preview_url && (
            <audio controls className='mt-6'>
              <source src={data[0]?.preview_url} type='audio/mpeg' />
              Your browser does not support the audio element.
            </audio>
          )}
          {data[0]?.cover_url && (
            <div className='overflow-hidden'>
              <Image
                alt={data[0]?.name}
                src={data[0]?.cover_url}
                width={300}
                height={300}
                className={`mt-6 rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          )}
          {data[0].youtube_url && (
            <div className='aspect-video w-full sm:w-2/3 md:w-1/2'>
              {/* <iframe className="rounded my-6 object-cover object-center h-full w-full"
                src={`https://www.youtube.com/embed/${data[0].youtube_url}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe> */}
              <LiteYouTubeEmbed id={data[0].youtube_url} title='Youtube Video' wrapperClass='yt-lite rounded my-6' />
            </div>
          )}
        </div>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
