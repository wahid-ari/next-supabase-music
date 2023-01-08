import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import SongListItem from "@components/dashboard/SongListItem";

const fetcher = url => fetch(url).then(result => result.json())

export default function Songs() {
  const { data: songs, error: errorSongs } = useSWR(`${process.env.API_ROUTE}/api/song`, fetcher)
  
  if (errorSongs) {
    return (
      <Layout title="Songs">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Songs">
      <Title>Songs</Title>

      <div className="mt-6 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {songs ?
          songs.map((item, index) =>
            <SongListItem key={index} href={`/song/detail/${item.id}`}
              imageSrc={item.cover_url}
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
