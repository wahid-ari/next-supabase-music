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
import ReactTable from '@components/systems/ReactTable';
import LinkButton from '@components/systems/LinkButton';
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
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Song...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`);
    }
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
              href={`song/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Album',
        accessor: 'album.name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`album/detail/${original.album?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
            >
              {original.album?.name}
            </Link>
          );
        },
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
              <Link
                href={`song/edit/${values.id}`}
                className='mr-2 rounded bg-sky-600 py-[3px] px-[6px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
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

  if (error) {
    return (
      <Layout title='Song - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Song - MyMusic'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Song</Title>
        <LinkButton href='song/add' className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add Song
        </LinkButton>
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
        title='Delete Song'
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
