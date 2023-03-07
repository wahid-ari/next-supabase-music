import { useState } from 'react';
import useSWR from 'swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import PlaylistItem from '@components/dashboard/PlaylistItem';
import LabeledInput from '@components/systems/LabeledInput';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Playlist() {
  const { data: playlist, error: errorPlaylist } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist`, fetcher);
  const [query, setQuery] = useState('');
  const filteredPlaylists =
    query === ''
      ? playlist
      : playlist?.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query?.toLowerCase().replace(/\s+/g, ''))
        );

  if (errorPlaylist) {
    return (
      <Layout title='Playlist - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Playlist - MyMusic' description='Browse playlists - MyMusic'>
      <Title>Playlist</Title>

      <LabeledInput
        label='Search Playlist'
        wrapperClassName='mt-6 w-full sm:max-w-xs'
        name='search'
        placeholder='Playlist Name'
        type='text'
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {filteredPlaylists ? (
          filteredPlaylists.map((item, index) => (
            <PlaylistItem key={index} index={index} href={`/dashboard/playlist/detail/${item.id}`} title={item.name} />
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
    </Layout>
  );
}
