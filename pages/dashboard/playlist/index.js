import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import PlaylistItem from "@components/dashboard/PlaylistItem";

const fetcher = url => fetch(url).then(result => result.json())

export default function Playlist() {
  const { data: playlist, error: errorPlaylist } = useSWR(`${process.env.API_ROUTE}/api/playlist`, fetcher)

  if (errorPlaylist) {
    return (
      <Layout title="Playlist">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Playlist">
      <Title>Playlist</Title>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {playlist ?
          playlist.map((item, index) =>
            <PlaylistItem
              key={index}
              index={index}
              href={`/dashboard/playlist/detail/${item.id}`}
              title={item.name}
            />
          )
          :
          <>
            <Shimer className="w-full !h-36" />
            <Shimer className="w-full !h-36" />
            <Shimer className="w-full !h-36" />
            <Shimer className="w-full !h-36" />
          </>
        }
      </div>
    </Layout>
  );
}
