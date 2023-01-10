import { useState } from "react";
import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import AlbumItem from "@components/dashboard/AlbumItem";
import LabeledInput from "@components/systems/LabeledInput";

const fetcher = url => fetch(url).then(result => result.json())

export default function Albums() {
  const { data: albums, error: errorAlbums } = useSWR(`${process.env.API_ROUTE}/api/album`, fetcher)
  const [query, setQuery] = useState("")
  const filteredAlbums =
    query === ''
      ? albums
      : albums?.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query?.toLowerCase().replace(/\s+/g, ''))
      )

  if (errorAlbums) {
    return (
      <Layout title="Albums - Music">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Albums - Music">
      <Title>Albums</Title>

      <LabeledInput
        label="Search Album"
        wrapperClassName="mt-6 w-full sm:max-w-xs"
        name="search"
        placeholder="Album Name"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mt-6 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredAlbums ?
          filteredAlbums.map((item, index) =>
            <AlbumItem key={index} href={`/dashboard/album/detail/${item.id}`}
              imageSrc={item.cover}
              title={item.name}
              artist={item.artists.name}
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
