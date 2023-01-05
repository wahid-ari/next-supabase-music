import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Heading from "@components/systems/Heading";
import GenreItem from "@components/dashboard/GenreItem";
import SongItem from "@components/dashboard/SongItem";
import ArtistItem from "@components/dashboard/ArtistItem";
import AlbumItem from "@components/dashboard/AlbumItem";
import PlaylistItem from "@components/dashboard/PlaylistItem";

const fetcher = url => fetch(url).then(result => result.json())

export default function Home() {
  const { data: songs, error: errorSongs } = useSWR(`${process.env.API_ROUTE}/api/song`, fetcher)
  const { data: albums, error: errorAlbums } = useSWR(`${process.env.API_ROUTE}/api/album`, fetcher)
  const { data: artists, error: errorArtists } = useSWR(`${process.env.API_ROUTE}/api/artist`, fetcher)
  const { data: playlists, error: errorPlaylists } = useSWR(`${process.env.API_ROUTE}/api/playlist`, fetcher)

  if (errorSongs || errorAlbums || errorArtists || errorPlaylists) {
    return (
      <Layout title="Dashboard">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard">
      <Title>Dashboard</Title>

      <Heading className="mt-8">Genre</Heading>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <GenreItem href="#" imageSrc="/genre/pop.webp" title="Pop" />
        <GenreItem href="#" imageSrc="/genre/rock.webp" title="Rock" />
        <GenreItem href="#" imageSrc="/genre/alternative.webp" title="Alternative" />
        <GenreItem href="#" imageSrc="/genre/electronic.webp" title="Electronic" />
      </div>

      <Heading className="mt-10">Songs</Heading>
      <div className="mt-2 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {songs ?
          songs.slice(0, 5).map((item, index) =>
            <SongItem key={index} href={`song/detail/${item.id}`}
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

      <Heading className="mt-10">Albums</Heading>
      <div className="mt-2 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {albums ?
          albums.slice(0, 5).map((item, index) =>
            <AlbumItem key={index} href={`album/detail/${item.id}`}
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

      <Heading className="mt-10">Artists</Heading>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {artists ?
          artists.slice(0, 4).map((item, index) =>
            <ArtistItem
              key={index}
              href={`artist/detail/${item.id}`}
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
      
      <Heading className="mt-10">Playlists</Heading>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {playlists ?
          playlists.slice(0, 4).map((item, index) =>
            <PlaylistItem
              key={index}
              index={index}
              href={`playlist/detail/${item.id}`}
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