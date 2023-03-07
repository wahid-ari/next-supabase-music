import { useState } from 'react';
import useSWR from 'swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ArtistItem from '@components/dashboard/ArtistItem';
import LabeledInput from '@components/systems/LabeledInput';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Artist() {
  const { data: artists, error: errorArtists } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`, fetcher);
  const [query, setQuery] = useState('');
  const filteredArtists =
    query === ''
      ? artists
      : artists?.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query?.toLowerCase().replace(/\s+/g, ''))
        );

  if (errorArtists) {
    return (
      <Layout title='Artists - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Artists - MyMusic' description='Browse artists - MyMusic'>
      <Title>Artists</Title>

      <LabeledInput
        label='Search Artist'
        wrapperClassName='mt-6 w-full sm:max-w-xs'
        name='search'
        placeholder='Artist Name'
        type='text'
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='mt-6 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredArtists ? (
          filteredArtists.map((item, index) => (
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
