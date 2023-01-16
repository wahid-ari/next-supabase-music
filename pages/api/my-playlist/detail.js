import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        res.status(200).json({ message: "Id Playlist Required" });
      }
      const { data: playlist_song } = await supabase.from('playlist_user_song')
        .select(`*, songs (*)`)
        .eq('playlist_user_id', query.id)
        .order('id');
      const { data: playlist } = await supabase.from('playlist_user')
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
              playlist_user_song_id: song.id
            })
          }
        }
      }
      const data = { playlist, playlist_song: song_artist}
      res.status(200).json(data);
      break;

    case "POST":
      if (!body.id_song) {
        res.status(422).json({ error: "Song required" })
      } else {
        const { error } = await supabase.from('playlist_user_song')
          .insert([
            {
              song_id: body.id_song,
              playlist_user_id: body.id_playlist,
            }
          ])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add song to playlist" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        const { error } = await supabase.from('playlist_user_song')
          .delete()
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete song from playlist" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
