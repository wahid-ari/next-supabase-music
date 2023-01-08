import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import ArtistItem from "@components/dashboard/ArtistItem";

const fetcher = url => fetch(url).then(result => result.json())

export default function Artist() {
  const { data: artists, error: errorArtists } = useSWR(`${process.env.API_ROUTE}/api/artist`, fetcher)

  if (errorArtists) {
    return (
      <Layout title="Artists">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Artists">
      <Title>Artists</Title>

      <div className="mt-6 grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artists ?
          artists.map((item, index) =>
            <ArtistItem
              key={index}
              href={`/dashboard/artist/detail/${item.id}`}
              imageSrc={item.cover_url}
              title={item.name}
            />
          )
          :
          <>
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
