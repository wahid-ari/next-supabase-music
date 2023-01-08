import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import SongItem from "@components/dashboard/SongItem";
import Heading from "@components/systems/Heading";
import AlbumItem from "@components/dashboard/AlbumItem";
import SongListItem from "@components/dashboard/SongListItem";

const fetcher = url => axios.get(url).then(res => res.data)

export async function getServerSideProps(context) {
  const { id } = context.params
  return {
    props: {
      id: id
    }, // will be passed to the page component as props
  }
}

export default function Artist({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/artist?id=${id}`, fetcher)
  const [isLoading, setLoading] = useState(true)

  if (error) {
    return (
      <Layout title="Artist Detail">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data[0]?.name : 'Artist Detail'}`}>
      <div className="mb-10">
        {data ?
          <>
            <Title>{data[0]?.name}</Title>
            <p className="text-lg mb-4">{data[0]?.genre?.name}</p>
            {data[0]?.cover_url &&
              <div className="m-auto sm:m-0 overflow-hidden h-72 w-72 relative">
                <Image
                  alt={data[0]?.name}
                  src={data[0]?.cover_url}
                  fill
                  className={`rounded-full ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            }
          </>
          :
          <>
            <Title>Artist Detail</Title>
            <Shimer className="!rounded-full mt-8 !h-72 !w-72" />
          </>
        }
      </div>

      <Heading className="mt-2">{data && data[0]?.name} Albums</Heading>
      <div className="mt-2 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {data ?
          data[0]?.album?.map((item, index) =>
            <AlbumItem key={index} href={`/dashboard/album/detail/${item.id}`}
              imageSrc={item.cover}
              title={item.name}
              artist={data[0]?.name}
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

      <Heading className="mt-10">{data && data[0]?.name} Songs</Heading>
      <div className="mt-2 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {data ?
          data[0]?.songs?.map((item, index) =>
            <SongListItem key={index} href={`/dashboard/song/detail/${item.id}`}
              imageSrc={item.cover_url}
              title={item.name}
              artist={data[0]?.name}
            />
          )
          :
          <>
            <Shimer className="w-full !h-16" />
            <Shimer className="w-full !h-16" />
            <Shimer className="w-full !h-16" />
          </>
        }
      </div>

    </Layout>
  );
}

