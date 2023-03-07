import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import { Transition } from '@headlessui/react';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import SearchBox from '@components/systems/SearchBox';
import nookies from 'nookies';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Text from '@components/systems/Text';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Playlist({ id }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/my-playlist/detail?id=${id}`, fetcher);
  const { data: song, error: errorSong } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [createItem, setCreateItem] = useState({ id_song: null, id_playlist: id });
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [selectedSong, setSelectedSong] = useState();
  const [querySong, setQuerySong] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  const filteredSong =
    querySong === ''
      ? song
      : song.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(querySong.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (selectedSong) setCreateItem({ ...createItem, id_song: selectedSong.id });
  }, [selectedSong]);

  async function handleCreate() {
    const toastId = pushToast({
      message: 'Saving Song...',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/my-playlist/detail`, createItem);
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setSelectedSong();
        setCreateItem({ id_song: null, id_playlist: id });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/my-playlist/detail?id=${id}`);
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Song From Playlist...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/my-playlist/detail?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/my-playlist/detail?id=${id}`);
    }
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

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

  if (error || errorSong) {
    return (
      <Layout title='Playlist Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? `${data?.playlist[0]?.name} Playlist - MyMusic` : 'Playlist Detail - MyMusic'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.playlist[0]?.name} Playlist</Title> : <Title>Playlist Detail</Title>}
        <Button.success onClick={() => setOpenCreateDialog(true)} className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add Song
        </Button.success>
      </div>

      {data ? (
        data?.playlist_song?.length > 0 ? (
          <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {data?.playlist_song?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-2 rounded border p-2 dark:border-neutral-800`}
                >
                  <Link
                    href={`/dashboard/song/detail/${item.song_id}`}
                    className='group rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='relative h-12 w-12 overflow-hidden rounded'>
                        <Image
                          alt={item?.song_name}
                          src={item?.song_cover_url}
                          className={`transform rounded-t brightness-90 transition duration-500 ease-in-out will-change-auto group-hover:brightness-110`}
                          fill
                          sizes={`(max-width: 120px) 100vw, (max-width: 120px) 50vw, (max-width: 120px) 33vw`}
                        />
                      </div>
                      <div>
                        <Text.medium className='mb-1 transition-all duration-500 group-hover:text-emerald-500'>
                          {item?.song_name}
                        </Text.medium>
                        <Text.light className='text-[13px]'>{item?.artist_name}</Text.light>
                      </div>
                    </div>
                  </Link>
                  <div className='flex gap-2'>
                    <button
                      title='Play Preview'
                      onClick={() => handlePlay(item?.song_name, item?.song_preview_url)}
                      className='rounded text-neutral-600 transition-all duration-300 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 dark:text-neutral-200 dark:hover:text-emerald-500'
                    >
                      <PlayIcon className='h-7 w-7 ' />
                    </button>
                    <div className='border-l dark:border-neutral-700'></div>
                    <button
                      title='Delete From Playlist'
                      onClick={() => handleShowDeleteModal(item?.playlist_user_song_id, item?.song_name)}
                      className='rounded text-red-600 transition-all duration-300 hover:text-red-500 focus:outline-none focus:ring-1 focus:ring-red-500'
                    >
                      <TrashIcon className='h-5 w-5 ' />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Song in Playlist {data[0]?.name} </p>
          </div>
        )
      ) : (
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          <Shimer className='!h-16 w-full' />
          <Shimer className='!h-16 w-full' />
          <Shimer className='!h-16 w-full' />
        </div>
      )}

      <Dialog
        title={`Add Song to ${data?.playlist[0]?.name} Playlist`}
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText='Save'
      >
        <div className='mt-5'>
          <SearchBox
            label='Song Name'
            value={selectedSong}
            placeholder='Search or Select'
            onChange={setSelectedSong}
            onChangeQuery={(e) => setQuerySong(e.target.value)}
            afterLeave={() => setQuerySong('')}
            filtered={filteredSong}
            query={querySong}
          />
        </div>
      </Dialog>

      <Dialog
        title={`Delete Song From Playlist ${data && data?.playlist[0]?.name}`}
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete song <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>

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
