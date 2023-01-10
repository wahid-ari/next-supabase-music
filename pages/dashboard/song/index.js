import { useState } from "react";
import useSWR from "swr";
import { Transition } from '@headlessui/react';
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import SongListItem from "@components/dashboard/SongListItem";
import LabeledInput from "@components/systems/LabeledInput";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const fetcher = url => fetch(url).then(result => result.json())

export default function Songs() {
  const { data: songs, error: errorSongs } = useSWR(`${process.env.API_ROUTE}/api/song`, fetcher)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [showPlayer, setShowPlayer] = useState(false)
  const [query, setQuery] = useState("")
  const filteredSongs =
    query === ''
      ? songs
      : songs?.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query?.toLowerCase().replace(/\s+/g, ''))
      )

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

  if (errorSongs) {
    return (
      <Layout title="Songs - Music">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Songs - Music">
      <Title>Songs</Title>

      <LabeledInput
        label="Search Song"
        wrapperClassName="mt-6 w-full sm:max-w-xs"
        name="search"
        placeholder="Song Name"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mt-6 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredSongs ?
          filteredSongs.map((item, index) =>
            <SongListItem key={index} href={`/dashboard/song/detail/${item.id}`}
              onPlay={() => handlePlay(item.name, item.preview_url)}
              imageSrc={item.cover_url}
              title={item.name}
              artist={item.artists.name}
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
