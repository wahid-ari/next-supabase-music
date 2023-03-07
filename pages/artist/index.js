import { useState } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import { PlusSmIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import TableSimple from '@components/systems/TableSimple';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import LabeledInput from '@components/systems/LabeledInput';
import Select from '@components/systems/Select';
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

export default function Artist() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`, fetcher);
  const { data: genre, error: errorGenre } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [createItem, setCreateItem] = useState({ name: '', cover_url: '', genre_id: null });
  const [editItem, setEditItem] = useState({ name: '', genre_id: null });
  const [deleteItem, setDeleteItem] = useState({ name: '', genre_id: null });

  async function handleCreate() {
    const toastId = pushToast({
      message: 'Saving Artist...',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`, createItem);
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setCreateItem({ name: '', cover_url: '', genre_id: null });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`);
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Saving Genre...',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`, editItem);
      if (res.status == 201) {
        setOpenEditDialog(false);
        setEditItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`);
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Artist...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`);
    }
  }

  function handleShowEditModal(id, name, cover_url, genre_id) {
    setEditItem({ id: id, name: name, cover_url: cover_url, genre_id: genre_id });
    setOpenEditDialog(true);
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  if (error || errorGenre) {
    return (
      <Layout title='Artist - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Artist - MyMusic'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Artist</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add Artist
        </Button.success>
      </div>

      <Dialog
        title='Create Artist'
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
            placeholder='Artist Name'
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
            label='Genre'
            name='genre'
            className='h-10'
            value={createItem.genre_id}
            onChange={(e) => setCreateItem({ ...createItem, genre_id: e.target.value })}
          >
            <Select.option className='hidden' value={null}>
              Select Genre
            </Select.option>
            {genre?.map((item) => (
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
            label='Genre'
            name='genre'
            className='h-10'
            value={editItem.genre_id}
            onChange={(e) => setEditItem({ ...editItem, genre_id: e.target.value })}
          >
            <Select.option className='hidden' value={null}>
              Select Genre
            </Select.option>
            {genre?.map((item) => (
              <Select.option key={item.id} value={item.id}>
                {item.name}
              </Select.option>
            ))}
          </Select>
        </div>
      </Dialog>

      <Dialog
        title='Delete Artist'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete artist <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>

      {data ? (
        <TableSimple
          head={
            <>
              <TableSimple.td small>No</TableSimple.td>
              <TableSimple.td>Name</TableSimple.td>
              <TableSimple.td>Genre</TableSimple.td>
              <TableSimple.td>Albums</TableSimple.td>
              <TableSimple.td>Songs</TableSimple.td>
              <TableSimple.td small>Action</TableSimple.td>
            </>
          }
        >
          {data.map((item, index) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td small>{index + 1}</TableSimple.td>
                <TableSimple.td>
                  <Link
                    href={`artist/detail/${item.id}`}
                    className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                  >
                    {item.name}
                  </Link>
                </TableSimple.td>
                <TableSimple.td>
                  <Link
                    href={`genre/detail/${item.genre?.id}`}
                    className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                  >
                    {item.genre?.name}
                  </Link>
                </TableSimple.td>
                <TableSimple.td>{item.album?.length}</TableSimple.td>
                <TableSimple.td>{item.songs?.length}</TableSimple.td>
                <TableSimple.td>
                  <Button
                    className='mr-2 !py-[2px] !px-[6px]'
                    onClick={() => handleShowEditModal(item.id, item.name, item.cover_url, item.genre?.id)}
                  >
                    Edit
                  </Button>
                  <Button.danger
                    className='!py-[2px] !px-[6px]'
                    onClick={() => handleShowDeleteModal(item.id, item.name)}
                  >
                    Delete
                  </Button.danger>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
