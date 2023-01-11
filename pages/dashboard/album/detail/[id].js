import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Transition } from '@headlessui/react';
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Heading from "@components/systems/Heading";
import SongListItem from "@components/dashboard/SongListItem";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [showPlayer, setShowPlayer] = useState(false)

  function handlePlay(song, url) {
    if (url !== "") {
      setName(song)
      setUrl(url)
    } else {
      setName(name)
      setUrl(null)
    }
    setShowPlayer(true)
  }

  if (error) {
    return (
      <Layout title="Album Detail - MyMusic">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }
  
  return (
    <Layout title={`${data ? data?.data[0]?.name + " - MyMusic" : 'Album Detail - MyMusic'}`}>

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

      <div className="mt-6 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {data ?
          data?.data[0]?.songs?.map((item, index) =>
            <SongListItem key={index} href={`/dashboard/song/detail/${item.id}`}
              onPlay={() => handlePlay(item.name, item.preview_url)}
              imageSrc={item.cover_url}
              title={item.name}
              artist={data?.artist[0]?.name}
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

      <Transition
        show={showPlayer}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        {url ?
          <div className="fixed bottom-4 left-4 right-6 lg:left-64">
            <AudioPlayer
              autoPlay={true}
              src={url}
              header={name}
              layout="horizontal"
              customAdditionalControls={[]}
              className="rounded dark:bg-neutral-800 text-emerald-500 dark:text-emerald-500 font-medium"
            />
          </div>
          :
          <div className="fixed bottom-4 left-4 right-6 lg:left-64 dark:bg-neutral-800 p-4 rounded bg-neutral-100 shadow-lg text-red-500 font-medium">
            Audio Not Available
          </div>
        }
      </Transition>

    </Layout>
  );
}

