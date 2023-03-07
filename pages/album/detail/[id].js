import { useState } from 'react';
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
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album/detail?id=${id}`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ name: '', cover_url: '', artist_id: null });

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Song From Album...',
      isLoading: true,
    });
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/album/detail?id=${id}&song_id=${deleteItem.id}`
      );
      if (res.status == 201) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album/detail?id=${id}`);
    }
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  if (error) {
    return (
      <Layout title='Album Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data[0]?.name + ' - MyMusic' : 'Album Detail - MyMusic'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data[0]?.name}</Title> : <Title>Album Detail</Title>}
      </div>

      {data ? (
        data[0]?.songs?.length > 0 ? (
          <TableSimple
            head={
              <>
                <TableSimple.td small>No</TableSimple.td>
                <TableSimple.td>Name</TableSimple.td>
                <TableSimple.td small>Action</TableSimple.td>
              </>
            }
          >
            {data[0]?.songs?.map((item, index) => {
              return (
                <TableSimple.tr key={index}>
                  <TableSimple.td small>{index + 1}</TableSimple.td>
                  <TableSimple.td>
                    <Link
                      href={`/song/detail/${item.id}`}
                      className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                    >
                      {item.name}
                    </Link>
                  </TableSimple.td>
                  <TableSimple.td>
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
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Song in Album {data[0]?.name} </p>
          </div>
        )
      ) : (
        <Shimer className='!h-60' />
      )}

      <Dialog
        title={`Delete Song From Album ${data && data[0]?.name}`}
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
