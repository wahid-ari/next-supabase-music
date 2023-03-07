import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ReactTable from '@components/systems/ReactTable';
import Button from '@components/systems/Button';
import LabeledInput from '@components/systems/LabeledInput';
import Heading from '@components/systems/Heading';
import Dialog from '@components/systems/Dialog';
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

export default function Album({ id }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist?id=${id}`, fetcher);
  const [isLoading, setLoading] = useState(true);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openDeleteDialogSong, setOpenDeleteDialogSong] = useState(false);
  const [openDeleteDialogAlbum, setOpenDeleteDialogAlbum] = useState(false);
  const [deleteItemSong, setDeleteItemSong] = useState({ id: null, name: '' });
  const [deleteItemAlbum, setDeleteItemAlbum] = useState({ id: null, name: '' });

  async function handleDeleteSong() {
    const toastId = pushToast({
      message: 'Deleting Song...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`, { data: deleteItemSong.id });
      if (res.status == 200) {
        setOpenDeleteDialogSong(false);
        setDeleteItemSong({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`);
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist?id=${id}`);
    }
  }

  async function handleDeleteAlbum() {
    const toastId = pushToast({
      message: 'Deleting Album...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`, { data: deleteItemAlbum.id });
      if (res.status == 200) {
        setOpenDeleteDialogAlbum(false);
        setDeleteItemAlbum({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`);
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist?id=${id}`);
    }
  }

  function handleShowDeleteModalSong(id, name) {
    setDeleteItemSong({ id: id, name: name });
    setOpenDeleteDialogSong(true);
  }

  function handleShowDeleteModalAlbum(id, name) {
    setDeleteItemAlbum({ id: id, name: name });
    setOpenDeleteDialogAlbum(true);
  }

  const songColumn = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'songs.id',
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/song/detail/${original.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <div>
              {/* <Button className="!py-[2px] !px-[6px] mr-2"
                onClick={() => handleShowEditModal(values.id, values.name, original.cover, original.artists.id)}>
                Edit
              </Button> */}
              <Button.danger
                className='!py-[2px] !px-[6px]'
                onClick={() => handleShowDeleteModalSong(original.id, values.name)}
              >
                Delete
              </Button.danger>
            </div>
          );
        },
        width: 200,
      },
    ],
    []
  );

  const albumColumn = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'album.id',
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/album/detail/${original.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <div>
              {/* <Button className="!py-[2px] !px-[6px] mr-2"
                onClick={() => handleShowEditModal(values.id, values.name, original.cover, original.artists.id)}>
                Edit
              </Button> */}
              <Button.danger
                className='!py-[2px] !px-[6px]'
                onClick={() => handleShowDeleteModalAlbum(original.id, values.name)}
              >
                Delete
              </Button.danger>
            </div>
          );
        },
        width: 200,
      },
    ],
    []
  );

  const songTableInstance = useRef(null);
  const albumTableInstance = useRef(null);

  if (error) {
    return (
      <Layout title='Artist Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data[0]?.name + ' - MyMusic' : 'Artist Detail - MyMusic'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data[0]?.name}</Title> : <Title>Artist Detail</Title>}
      </div>

      {data ? (
        <div>
          <p className='text-lg'>{data[0].genre.name}</p>
          {data[0]?.cover_url && (
            <div className='overflow-hidden'>
              <Image
                alt={data[0]?.name}
                src={data[0]?.cover_url}
                width={300}
                height={300}
                className={`my-4 rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          )}
        </div>
      ) : (
        <Shimer className='!h-72 !w-72' />
      )}

      {data ? (
        <div className='mt-4'>
          <Heading>{data[0]?.name} Songs</Heading>
          <LabeledInput
            label='Search Song'
            id='searchsong'
            name='searchsong'
            placeholder='Song Name'
            className='max-w-xs !py-2'
            onChange={(e) => {
              songTableInstance.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable columns={songColumn} data={data[0].songs} ref={songTableInstance} page_size={10} />
        </div>
      ) : (
        <Shimer className='mt-10 !h-60' />
      )}

      <hr className='mt-10 dark:border-neutral-700' />

      {data ? (
        <div className='mt-8'>
          <Heading>{data[0]?.name} Albums</Heading>
          <LabeledInput
            label='Search Album'
            id='searchalbum'
            name='searchalbum'
            placeholder='Album Name'
            className='max-w-xs !py-2'
            onChange={(e) => {
              albumTableInstance.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable columns={albumColumn} data={data[0].album} ref={albumTableInstance} page_size={10} />
        </div>
      ) : (
        <Shimer className='!h-60' />
      )}

      <Dialog
        title='Delete Song'
        open={openDeleteDialogSong}
        isDanger
        setOpen={setOpenDeleteDialogSong}
        onClose={() => setOpenDeleteDialogSong(false)}
        onConfirm={handleDeleteSong}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete song <span className='font-semibold'>{deleteItemSong.name}</span> ?
        </div>
      </Dialog>

      <Dialog
        title='Delete Album'
        open={openDeleteDialogAlbum}
        isDanger
        setOpen={setOpenDeleteDialogAlbum}
        onClose={() => setOpenDeleteDialogAlbum(false)}
        onConfirm={handleDeleteAlbum}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete album <span className='font-semibold'>{deleteItemAlbum.name}</span> ?
        </div>
      </Dialog>
    </Layout>
  );
}
