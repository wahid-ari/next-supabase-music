import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@components/layout/Layout';
import LabeledInput from '@components/systems/LabeledInput';
import Title from '@components/systems/Title';
import Text from '@components/systems/Text';
import Button from '@components/systems/Button';
import Heading from '@components/systems/Heading';
import AlbumItem from '@components/dashboard/AlbumItem';
import SongListItem from '@components/dashboard/SongListItem';
import ArtistItem from '@components/dashboard/ArtistItem';
import PlaylistItem from '@components/dashboard/PlaylistItem';
import { BookmarkIcon, CollectionIcon, MusicNoteIcon, UserGroupIcon } from '@heroicons/react/outline';
import { useSearchHistoryStore } from '@store/useStore';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Search() {
  const router = useRouter();
  const search = router.query.q;
  const query = useRef(search);
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/search?q=${search}`, fetcher);

  const songsHistory = useSearchHistoryStore((state) => state.songsHistory);
  const setSongsHistory = useSearchHistoryStore((state) => state.setSongsHistory);
  const resetSongsHistory = useSearchHistoryStore((state) => state.resetSongsHistory);

  const albumsHistory = useSearchHistoryStore((state) => state.albumsHistory);
  const setAlbumsHistory = useSearchHistoryStore((state) => state.setAlbumsHistory);
  const resetAlbumsHistory = useSearchHistoryStore((state) => state.resetAlbumsHistory);

  const artistsHistory = useSearchHistoryStore((state) => state.artistsHistory);
  const setArtistsHistory = useSearchHistoryStore((state) => state.setArtistsHistory);
  const resetArtistsHistory = useSearchHistoryStore((state) => state.resetArtistsHistory);

  const playlistsHistory = useSearchHistoryStore((state) => state.playlistsHistory);
  const setPlaylistsHistory = useSearchHistoryStore((state) => state.setPlaylistsHistory);
  const resetPlaylistsHistory = useSearchHistoryStore((state) => state.resetPlaylistsHistory);

  const resetAllSearchHistory = useSearchHistoryStore((state) => state.resetAllSearchHistory);

  function compareSearchResult(history, newResults) {
    let newHistory = history;
    // iterate each search result
    for (const b of newResults) {
      // check if new result already in the history
      const exists = history.findIndex((item) => item.id == b.id) > -1;
      if (!exists) {
        newHistory.push(b);
      }
    }
    return newHistory;
  }

  useEffect(() => {
    if (data?.songs?.length > 0) {
      // if already searching
      if (songsHistory.length > 0) {
        // compare history with new search result
        let newSongs = compareSearchResult(songsHistory, data?.songs);
        if (newSongs != songsHistory) {
          setSongsHistory(newSongs);
        }
      } else {
        // first time searching, set search result to search history directly
        setSongsHistory(data?.songs);
      }
    }
    // Album
    if (data?.albums?.length > 0) {
      if (albumsHistory.length > 0) {
        let newAlbums = compareSearchResult(albumsHistory, data?.albums);
        if (newAlbums != albumsHistory) {
          setAlbumsHistory(newAlbums);
        }
      } else {
        setAlbumsHistory(data?.albums);
      }
    }
    // Artist
    if (data?.artists?.length > 0) {
      if (artistsHistory.length > 0) {
        let newArtists = compareSearchResult(artistsHistory, data?.artists);
        if (newArtists != artistsHistory) {
          setArtistsHistory(newArtists);
        }
      } else {
        setArtistsHistory(data?.artists);
      }
    }
    // Playlist
    if (data?.playlists?.length > 0) {
      if (playlistsHistory.length > 0) {
        let newPlaylists = compareSearchResult(playlistsHistory, data?.playlists);
        if (newPlaylists != playlistsHistory) {
          setPlaylistsHistory(newPlaylists);
        }
      } else {
        setPlaylistsHistory(data?.playlists);
      }
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    if (query !== '') {
      router.push(`?q=${query.current}`);
    } else {
      router.push(`/search`);
    }
  }

  if (error) {
    return (
      <Layout title='Search - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Search - MyMusic'>
      <Title>Search</Title>

      <form className='mt-2' onSubmit={handleSubmit}>
        <div className='flex items-end gap-2'>
          <LabeledInput
            wrapperClassName='w-full sm:max-w-sm'
            name='search'
            placeholder='Search song, artist, album or playlist'
            type='text'
            onChange={(e) => (query.current = e.target.value)}
          />
          <Button.success type='submit' value='Submit' className='mb-4 !py-2.5 px-5'>
            Search
          </Button.success>
        </div>
      </form>

      {search ? (
        <>
          {!data && <Text>Searching...</Text>}

          {data?.songs.length < 1 &&
          data?.albums.length < 1 &&
          data?.artists.length < 1 &&
          data?.playlists.length < 1 ? (
            <div className='rounded border border-red-500 p-3'>
              <p className='text-red-500'>{`No results for "${query.current || search}"`}</p>
            </div>
          ) : null}

          {data?.songs.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Songs
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                {data?.songs?.map((item, index) => (
                  <SongListItem
                    key={index}
                    href={`dashboard/song/detail/${item.id}`}
                    imageSrc={item.cover_url}
                    title={item.name}
                    artist={item.artist_name}
                    noPlayer
                  />
                ))}
              </div>
            </>
          ) : null}

          {data?.albums.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Albums
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
                {data?.albums?.map((item, index) => (
                  <AlbumItem
                    key={index}
                    href={`dashboard/album/detail/${item.id}`}
                    imageSrc={item.cover}
                    title={item.name}
                    artist={item.artist_name}
                  />
                ))}
              </div>
            </>
          ) : null}

          {data?.artists.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Artists
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {data?.artists?.map((item, index) => (
                  <ArtistItem
                    key={index}
                    href={`dashboard/artist/detail/${item.id}`}
                    imageSrc={item.cover_url}
                    title={item.name}
                  />
                ))}
              </div>
            </>
          ) : null}

          {data?.playlists.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Playlists
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 xl:grid-cols-4'>
                {data?.playlists?.map((item, index) => (
                  <PlaylistItem
                    key={index}
                    index={index}
                    href={`/dashboard/playlist/detail/${item.id}`}
                    title={item.name}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          {songsHistory?.length > 0 ||
          albumsHistory?.length > 0 ||
          artistsHistory?.length > 0 ||
          playlistsHistory?.length > 0 ? (
            <>
              <div className='mt-6 flex items-center justify-between'>
                <Heading h3>Recent Search</Heading>
                <button
                  onClick={resetAllSearchHistory}
                  className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                >
                  Clear All
                </button>
              </div>

              {songsHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading>Songs</Heading>
                    <button
                      onClick={resetSongsHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                    {songsHistory?.map((item, index) => (
                      <SongListItem
                        key={index}
                        href={`dashboard/song/detail/${item.id}`}
                        imageSrc={item.cover_url}
                        title={item.name}
                        artist={item.artist_name}
                        noPlayer
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {albumsHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading>Albums</Heading>
                    <button
                      onClick={resetAlbumsHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
                    {albumsHistory?.map((item, index) => (
                      <AlbumItem
                        key={index}
                        href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.cover}
                        title={item.name}
                        artist={item.artist_name}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {artistsHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading>Artists</Heading>
                    <button
                      onClick={resetArtistsHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {artistsHistory?.map((item, index) => (
                      <ArtistItem
                        key={index}
                        href={`dashboard/artist/detail/${item.id}`}
                        imageSrc={item.cover_url}
                        title={item.name}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {playlistsHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading>Playlists</Heading>
                    <button
                      onClick={resetPlaylistsHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {playlistsHistory?.map((item, index) => (
                      <PlaylistItem
                        key={index}
                        index={index}
                        href={`/dashboard/playlist/detail/${item.id}`}
                        title={item.name}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </>
      )}

      <Heading className='mt-6'>Browse Categories</Heading>
      <div className='mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <Link
          href='/dashboard/song'
          className='group h-20 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500'
        >
          <div className='flex h-full w-full items-center gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <MusicNoteIcon className='h-8 w-8 text-cyan-500 transition-all duration-300 ease-in group-hover:text-white' />
            <h2 className='bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Songs
            </h2>
          </div>
        </Link>
        <Link
          href='/dashboard/album'
          className='group h-20 rounded-lg bg-gradient-to-br from-red-500 to-yellow-500 p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
        >
          <div className='flex h-full w-full items-center gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <CollectionIcon className='h-8 w-8 text-red-500 transition-all duration-300 ease-in group-hover:text-white' />
            <h2 className='bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Albums
            </h2>
          </div>
        </Link>
        <Link
          href='/dashboard/artist'
          className='group h-20 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
        >
          <div className='flex h-full w-full items-center gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <UserGroupIcon className='h-8 w-8 text-emerald-500 transition-all duration-300 ease-in group-hover:text-white' />
            <h2 className='bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Artists
            </h2>
          </div>
        </Link>
        <Link
          href='/dashboard/playlist'
          className='group h-20 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500'
        >
          <div className='flex h-full w-full items-center gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <BookmarkIcon className='h-8 w-8 text-violet-500 transition-all duration-300 ease-in group-hover:text-white' />
            <h2 className='bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Playlists
            </h2>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
