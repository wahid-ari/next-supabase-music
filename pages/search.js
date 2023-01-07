import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "@components/layout/Layout";
import LabeledInput from "@components/systems/LabeledInput";
import Title from "@components/systems/Title";
import Text from "@components/systems/Text";
import Button from "@components/systems/Button";
import SongItem from "@components/dashboard/SongItem";
import Heading from "@components/systems/Heading";
import AlbumItem from "@components/dashboard/AlbumItem";
import ArtistItem from "@components/dashboard/ArtistItem";
import PlaylistItem from "@components/dashboard/PlaylistItem";

const fetcher = url => fetch(url).then(result => result.json())

export default function Search() {
  const router = useRouter()
  const search = router.query.q
  const query = useRef(search)
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/search?q=${search}`, fetcher)

  function handleSubmit(e) {
    e.preventDefault()
    if (query !== "") {
      router.push(`?q=${query.current}`)
    } else {
      router.push(`/search`)
    }
  }

  if (error) {
    return (
      <Layout title="Search">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Search">
      <Title>Search</Title>

      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="flex items-end gap-2">
          <LabeledInput
            wrapperClassName="w-full sm:max-w-sm"
            name="search"
            placeholder="Search song, artist, album or playlist"
            type="text"
            onChange={(e) => query.current = e.target.value}
          />
          <Button.success className="mb-4 !py-2.5 px-5">Search</Button.success>
        </div>
      </form>

      {search ?
        <>
          {!data && <Text>Searching...</Text>}

          {data?.songs.length < 1 && data?.albums.length < 1 && data?.artists.length < 1 && data?.playlists.length < 1 ?
            <div className="rounded border border-red-500 p-3">
              <p className="text-red-500">{`No results for "${query.current || search}"`}</p>
            </div>
            :
            null
          }

          {data?.songs.length > 0 ?
            <>
              <Heading h3 className="mt-6">Songs</Heading>
              <div className="mt-2 pb-4 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {data?.songs?.map((item, index) =>
                  <SongItem key={index} href={`song/detail/${item.id}`}
                    imageSrc={item.cover_url}
                    title={item.name}
                    hideArtist
                  />
                )}
              </div>
            </>
            :
            null
          }

          {data?.albums.length > 0 ?
            <>
              <Heading h3 className="mt-6">Albums</Heading>
              <div className="mt-2 pb-4 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {data?.albums?.map((item, index) =>
                  <AlbumItem key={index} href={`dashboard/album/detail/${item.id}`}
                    imageSrc={item.cover}
                    title={item.name}
                    hideArtist
                  />
                )}
              </div>
            </>
            :
            null
          }

          {data?.artists.length > 0 ?
            <>
              <Heading h3 className="mt-6">Artists</Heading>
              <div className="mt-2 pb-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {data?.artists?.map((item, index) =>
                  <ArtistItem
                    key={index}
                    href={`dashboard/artist/detail/${item.id}`}
                    imageSrc={item.cover_url}
                    title={item.name}
                  />
                )}
              </div>
            </>
            :
            null
          }

          {data?.playlists.length > 0 ?
            <>
              <Heading h3 className="mt-6">Playlists</Heading>
              <div className="mt-2 pb-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {data?.playlists?.map((item, index) =>
                  <PlaylistItem
                    key={index}
                    index={index}
                    href={`/?playlist=${item.id}`}
                    title={item.name}
                  />
                )}
              </div>
            </>
            :
            null
          }
        </>
        :
        null
      }

      <Heading h3 className="mt-6">Browse Categories</Heading>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link href="/dashboard/song" className="h-24 p-0.5 rounded-lg group bg-gradient-to-br from-cyan-500 to-purple-500">
          <div className="flex items-center px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:text-white transition-all ease-in duration-300">
              Songs
            </h2>
          </div>
        </Link>
        <Link href="/dashboard/album" className="h-24 p-0.5 rounded-lg group bg-gradient-to-br from-red-500 to-yellow-500">
          <div className="flex items-center px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 group-hover:text-white transition-all ease-in duration-300">
              Albums
            </h2>
          </div>
        </Link>
        <Link href="/dashboard/artist" className="h-24 p-0.5 rounded-lg group bg-gradient-to-br from-emerald-500 to-blue-500">
          <div className="flex items-center px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:text-white transition-all ease-in duration-300">
              Artists
            </h2>
          </div>
        </Link>
        <Link href="#" className="h-24 p-0.5 rounded-lg group bg-gradient-to-br from-violet-500 to-pink-500">
          <div className="flex items-center px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500 group-hover:text-white transition-all ease-in duration-300">
              Playlists
            </h2>
          </div>
        </Link>
      </div>
    </Layout>
  )
}