import { useRouter } from "next/router";
import Link from "next/link";
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
  const router = useRouter()
  const { query } = router
  const { data: genre, error: errorGenre } = useSWR(`${process.env.API_ROUTE}/api/genre`, fetcher)
  const { data: songs, error: errorSongs } = useSWR(`${process.env.API_ROUTE}/api/song`, fetcher)
  const { data: albums, error: errorAlbums } = useSWR(`${process.env.API_ROUTE}/api/album`, fetcher)
  const { data: artists, error: errorArtists } = useSWR(`${process.env.API_ROUTE}/api/artist`, fetcher)
  const { data: playlists, error: errorPlaylists } = useSWR(`${process.env.API_ROUTE}/api/playlist`, fetcher)
  const { data: artistByGenre, error: errorArtistByGenre } = useSWR(`${process.env.API_ROUTE}/api/genre?id=${query.genre}`, fetcher)
  const { data: detailPlaylist, error: errorDetailPlaylist } = useSWR(`${process.env.API_ROUTE}/api/dashboard/playlist/detail?id=${query.playlist}`, fetcher)

  if (errorGenre || errorSongs || errorAlbums || errorArtists || errorPlaylists || errorArtistByGenre || errorDetailPlaylist) {
    return (
      <Layout title="Dashboard">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  if (query.genre) {
    return (
      <Layout title={artistByGenre ? artistByGenre[0]?.name : "Genre"}>
        <Title>{artistByGenre ? artistByGenre[0]?.name : "Genre"}</Title>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {artistByGenre ?
            artistByGenre[0]?.artists?.map((item, index) =>
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
    )
  }

  if (query.playlist) {
    return (
      <Layout title={detailPlaylist ? detailPlaylist?.playlist[0]?.name : "Playlist"}>
        <Title>{detailPlaylist ? detailPlaylist?.playlist[0]?.name : "Playlist"}</Title>
        <div className="mt-8 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {detailPlaylist ?
            detailPlaylist?.song_artist?.map((item, index) =>
              <SongItem key={index} href={`song/detail/${item.song_id}`}
                imageSrc={item.song_cover_url}
                title={item.song_name}
                artist={item.artist_name}
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
    )
  }

  return (
    <Layout title="Dashboard">
      <Title>Dashboard</Title>

      <Heading className="mt-8">Genre</Heading>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {genre ?
          genre.slice(0, 4).map((item, index) => (
            <GenreItem key={index} href={`?genre=${item.id}`} title={item.name} />
          ))
          :
          <>
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
          </>
        }
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Songs</Heading>
        <Link href={`dashboard/song`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium">
          View All
        </Link>
      </div>
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

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Albums</Heading>
        <Link href={`dashboard/album`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium">
          View All
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {albums ?
          albums.slice(0, 5).map((item, index) =>
            <AlbumItem key={index} href={`dashboard/album/detail/${item.id}`}
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

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Artists</Heading>
        <Link href={`dashboard/artist`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium">
          View All
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {artists ?
          artists.slice(0, 4).map((item, index) =>
            <ArtistItem
              key={index}
              href={`dashboard/artist/detail/${item.id}`}
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

      {/* TODO Add playlist page */}
      <Heading className="mt-10">Playlists</Heading>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {playlists ?
          playlists.slice(0, 4).map((item, index) =>
            <PlaylistItem
              key={index}
              index={index}
              href={`?playlist=${item.id}`}
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