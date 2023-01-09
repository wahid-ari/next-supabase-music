import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, query } = req

  switch (method) {
    case "GET":
      if (query.id == 'undefined') {
        const { data } = await supabase.from('playlist_song')
          .select(`*, songs (*)`)
          .order('id');
        res.status(200).json(data);
      } else {
        const { data: playlist_song } = await supabase.from('playlist_song')
          .select(`*, songs (*)`)
          .eq('playlist_id', query.id)
          .order('id');
        const { data: playlist } = await supabase.from('playlist')
          .select(`*`)
          .eq('id', query.id)
          .order('id');
        const { data: artists } = await supabase.from('artists')
          .select(`*`)
          .order('id');

        let song_artist = []
        for (const song of playlist_song) {
          for (const artist of artists) {
            if (song.songs.artist_id == artist.id) {
              song_artist.push({
                song_id: song.songs.id,
                song_name: song.songs.name,
                song_cover_url: song.songs.cover_url,
                song_preview_url: song.songs.preview_url,
                artist_id: artist.id,
                artist_name: artist.name,
              })
            }
          }
        }
        const data = { playlist, song_artist }
        res.status(200).json(data);
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
