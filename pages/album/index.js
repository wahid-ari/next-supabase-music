import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import { PlusSmIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import LabeledInput from '@components/systems/LabeledInput';
import Select from '@components/systems/Select';
import ReactTable from '@components/systems/ReactTable';
import nookies from 'nookies';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {},
  };
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Album() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`, fetcher);
  const { data: artist, error: errorArtist } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [createItem, setCreateItem] = useState({ name: '', cover_url: '', artist_id: null });
  const [editItem, setEditItem] = useState({ name: '', cover_url: '', artist_id: null });
  const [deleteItem, setDeleteItem] = useState({ name: '', artist_id: null });

  async function handleCreate() {
    const toastId = pushToast({
      message: 'Saving Album...',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`, createItem);
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setCreateItem({ name: '', cover_url: '', artist_id: null });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`);
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Saving Genre...',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`, editItem);
      if (res.status == 201) {
        setOpenEditDialog(false);
        setEditItem({ name: '', cover_url: '', artist_id: null });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`);
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Album...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`);
    }
  }

  function handleShowEditModal(id, name, cover_url, artist_id) {
    setEditItem({ id: id, name: name, cover_url: cover_url, artist_id: artist_id });
    setOpenEditDialog(true);
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row) => {
          // console.log(row.cell.row.index)
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
              href={`album/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Songs',
        accessor: 'songs.length',
        width: 300,
        // Cell: (row) => {
        //   const { values, original } = row.cell.row
        //   console.log(original)
        //   return (
        //     original.songs.length
        //   )
        // }
      },
      {
        Header: 'Artist',
        accessor: 'artists.name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`artist/detail/${original?.artists?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {original?.artists?.name}
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
          // console.log(`${values.id} - ${values.name} - ${original.cover} - ${original.artists.id} - ${original.artists.name}`)
          return (
            <div>
              {/* <Link href={`edit/${item.id}`}>
								<a className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</a>
							</Link> */}
              <Button
                className='mr-2 !py-[2px] !px-[6px]'
                onClick={() => handleShowEditModal(values.id, values.name, original.cover, original.artists.id)}
              >
                Edit
              </Button>
              <Button.danger
                className='!py-[2px] !px-[6px]'
                onClick={() => handleShowDeleteModal(values.id, values.name)}
              >
                Delete
              </Button.danger>
              {/* <button onClick={() => alert(`${row.cell.row.values.id} - ${row.cell.row.values.name}`)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
              <button onClick={() => showDeleteModal(row.cell.row.values.id, row.cell.row.values.name)}
                className="text-red-500 hover:text-red-700 text-sm font-medium">
                Delete
              </button> */}
            </div>
          );
        },
        width: 200,
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error || errorArtist) {
    return (
      <Layout title='Album - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Album - MyMusic'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Album</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add Album
        </Button.success>
      </div>

      {data ? (
        <>
          <LabeledInput
            label='Search Data'
            id='caridata'
            name='caridata'
            placeholder='Keyword'
            className='max-w-xs !py-2'
            onChange={(e) => {
              tableInstance.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable columns={column} data={data} ref={tableInstance} page_size={20} />
        </>
      ) : (
        <Shimer className='!h-60' />
      )}

      <Dialog
        title='Create Album'
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText='Save'
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={createItem.name}
            onChange={(e) => setCreateItem({ ...createItem, name: e.target.value })}
            placeholder='Album Name'
          />
          <LabeledInput
            label='Cover URL (Optional)'
            type='text'
            name='cover'
            value={createItem.cover_url}
            onChange={(e) => setCreateItem({ ...createItem, cover_url: e.target.value })}
            placeholder='https://i.scdn.co/image/ab67616d00001e02b151437d4adc97ce6c828d4a'
          />
          <Select
            label='Artist'
            name='genre'
            className='h-10'
            value={createItem.artist_id}
            onChange={(e) => setCreateItem({ ...createItem, artist_id: e.target.value })}
          >
            <Select.option className='hidden' value={null}>
              Select Artist
            </Select.option>
            {artist?.map((item) => (
              <Select.option key={item.id} value={item.id}>
                {item.name}
              </Select.option>
            ))}
          </Select>
        </div>
      </Dialog>

      <Dialog
        title='Edit Artist'
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleEdit}
        confirmText='Update'
        isEdit
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <LabeledInput
            label='Cover URL (Optional)'
            type='text'
            name='cover'
            value={editItem.cover_url}
            onChange={(e) => setEditItem({ ...editItem, cover_url: e.target.value })}
            placeholder='https://i.scdn.co/image/ab67616d00001e02b151437d4adc97ce6c828d4a'
          />
          <Select
            label='Artist'
            name='artist'
            className='h-10'
            value={editItem.artist_id}
            onChange={(e) => setEditItem({ ...editItem, artist_id: e.target.value })}
          >
            <Select.option className='hidden' value={null}>
              Select Artist
            </Select.option>
            {artist?.map((item) => (
              <Select.option key={item.id} value={item.id}>
                {item.name}
              </Select.option>
            ))}
          </Select>
        </div>
      </Dialog>

      <Dialog
        title='Delete Album'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete album <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>
    </Layout>
  );
}
