import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Transition } from '@headlessui/react';
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
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

export default function Playlist({ id }) {
  const { data: detailPlaylist, error: errorDetailPlaylist } = useSWR(`${process.env.API_ROUTE}/api/dashboard/playlist/detail?id=${id}`, fetcher)
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

  if (errorDetailPlaylist) {
    return (
      <Layout title="Playlist Detail - Music">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={detailPlaylist ? detailPlaylist?.playlist[0]?.name + " - Music" : "Playlist - Music"}>
      <Title>{detailPlaylist ? detailPlaylist?.playlist[0]?.name : "Playlist"}</Title>
      <div className="mt-8 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {detailPlaylist ?
          detailPlaylist?.song_artist?.map((item, index) =>
            <SongListItem key={index} href={`/dashboard/song/detail/${item.song_id}`}
              onPlay={() => handlePlay(item.song_name, item.song_preview_url)}
              imageSrc={item.song_cover_url}
              title={item.song_name}
              artist={item.artist_name}
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

