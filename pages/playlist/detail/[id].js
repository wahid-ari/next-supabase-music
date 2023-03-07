import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import TableSimple from '@components/systems/TableSimple';
import { PlusSmIcon } from '@heroicons/react/outline';
import SearchBox from '@components/systems/SearchBox';
import nookies from 'nookies';

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
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist/detail?id=${id}`, fetcher);
  const { data: song, error: errorSong } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [createItem, setCreateItem] = useState({ id_song: null, id_playlist: id });
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [selectedSong, setSelectedSong] = useState();
  const [querySong, setQuerySong] = useState('');

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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist/detail`, createItem);
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
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist/detail?id=${id}`);
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Song From Playlist...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist/detail?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist/detail?id=${id}`);
    }
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
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
          <TableSimple
            head={
              <>
                <TableSimple.td small>No</TableSimple.td>
                <TableSimple.td>Name</TableSimple.td>
                <TableSimple.td small>Action</TableSimple.td>
              </>
            }
          >
            {data?.playlist_song?.map((item, index) => {
              return (
                <TableSimple.tr key={index}>
                  <TableSimple.td small>{index + 1}</TableSimple.td>
                  <TableSimple.td>
                    <Link
                      href={`/song/detail/${item.songs.id}`}
                      className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                    >
                      {item.songs.name}
                    </Link>
                  </TableSimple.td>
                  <TableSimple.td>
                    <Button.danger
                      className='!py-[2px] !px-[6px]'
                      onClick={() => handleShowDeleteModal(item.id, item.songs.name)}
                    >
                      Delete
                    </Button.danger>
                  </TableSimple.td>
                </TableSimple.tr>
              );
            })}
          </TableSimple>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Song in Playlist {data[0]?.name} </p>
          </div>
        )
      ) : (
        <Shimer className='!h-60' />
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
    </Layout>
  );
}
