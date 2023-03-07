import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
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

export default function Genre({ id }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre?id=${id}`, fetcher);

  if (error) {
    return (
      <Layout title='Genre Detail - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data[0]?.name + ' - MyMusic' : 'Genre Detail - MyMusic'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data[0]?.name}</Title> : <Title>Genre Detail</Title>}
      </div>

      {data ? (
        data[0]?.artists?.length > 0 ? (
          <TableSimple
            head={
              <>
                <TableSimple.td small>No</TableSimple.td>
                <TableSimple.td>Name</TableSimple.td>
              </>
            }
          >
            {data[0]?.artists?.map((item, index) => {
              return (
                <TableSimple.tr key={index}>
                  <TableSimple.td small>{index + 1}</TableSimple.td>
                  <TableSimple.td>
                    <Link
                      href={`/artist/detail/${item.id}`}
                      className='rounded text-sm font-medium transition-all duration-200 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                    >
                      {item.name}
                    </Link>
                  </TableSimple.td>
                </TableSimple.tr>
              );
            })}
          </TableSimple>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Artist in Genre {data[0]?.name} </p>
          </div>
        )
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
