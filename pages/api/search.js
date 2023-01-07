import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, query } = req

  switch (method) {
    case "GET":
      if (!query.q) {
        res.status(200).json({ message: "Query Required" });
      }
      const { data: songs, error: errorSongs } = await supabase.from('songs')
        .select(`*`)
        .textSearch('name', `'${query.q}'`)
      const { data: albums, error: errorAlbums } = await supabase.from('album')
        .select(`*`)
        .textSearch('name', `'${query.q}'`)
      const { data: artists, error: errorArtists } = await supabase.from('artists')
        .select(`*`)
        .textSearch('name', `'${query.q}'`)
      const { data: playlists, error: errorPlaylists } = await supabase.from('playlist')
        .select(`*, playlist_song (*)`)
        .textSearch('name', `'${query.q}'`)
      // const {playlist_song} = playlists[0]
      // console.log(playlists)
      // console.log(playlist_song)
      // res.status(200).json({ songs, albums, artists, playlists });
      res.status(200).json({ songs, albums, artists, playlists });
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
