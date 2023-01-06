import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import SongItem from "@components/dashboard/SongItem";
import Heading from "@components/systems/Heading";

const fetcher = url => axios.get(url).then(res => res.data)

export async function getServerSideProps(context) {
  const { id } = context.params
  return {
    props: {
      id: id
    }, // will be passed to the page component as props
  }
}

export default function Album({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/dashboard/album/detail?id=${id}`, fetcher)

  if (error) {
    return (
      <Layout title="Album Detail">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }
  
  return (
    <Layout title={`${data ? data?.data[0]?.name : 'Album Detail'}`}>
      <div className="mb-6">
        {data ?
          <>
            <Title>{data?.data[0]?.name}</Title>
            <Heading className="mt-2">{data?.artist[0]?.name}</Heading>
          </>
          :
          <Title>Album Detail</Title>
        }
      </div>

      <div className="mt-6 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {data ?
          data?.data[0]?.songs?.map((item, index) =>
            <SongItem key={index} href={`/song/detail/${item.id}`}
              imageSrc={item.cover_url}
              title={item.name}
              artist={data?.artist[0]?.name}
            />
          )
          :
          <>
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
          </>
        }
      </div>

    </Layout>
  );
}

