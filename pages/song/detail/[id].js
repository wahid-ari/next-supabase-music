import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import useToast from "@utils/useToast";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";

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
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/song?id=${id}`, fetcher)
  const { updateToast, pushToast, dismissToast } = useToast();
  const [isLoading, setLoading] = useState(true)

  if (error) {
    return (
      <Layout title="Song Detail">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data[0]?.name : 'Song Detail'}`}>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        {data ?
          <Title>{data[0]?.name}</Title>
          :
          <Title>Song Detail</Title>
        }
      </div>

      {data ?
        <div>
          <p className="text-lg">{data[0].artists.name}</p>
          <p className="text-lg">{data[0].album.name}</p>
          {data[0]?.cover_url &&
            <div className="overflow-hidden">
              <Image
                alt={data[0]?.name}
                src={data[0]?.cover_url}
                width={300}
                height={300}
                className={`rounded my-4 ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          }
          {data[0].youtube_url &&
            <iframe className="rounded my-2"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${data[0].youtube_url}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          }
        </div>
        :
        <Shimer className="!h-60" />
      }

    </Layout>
  );
}

