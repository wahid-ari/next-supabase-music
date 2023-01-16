import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        res.status(200).json({ message: "Id Playlist Required" });
      }
      const { data: playlist_song } = await supabase.from('playlist_song')
        .select(`*, songs (*)`)
        .eq('playlist_id', query.id)
        .order('id');
      const { data: playlist } = await supabase.from('playlist')
        .select(`*`)
        .eq('id', query.id)
        .order('id');
      const data = { playlist, playlist_song }
      res.status(200).json(data);
      break;

    case "POST":
      if (!body.id_song) {
        res.status(422).json({ error: "Song required" })
      } else {
        const { error } = await supabase.from('playlist_song')
          .insert([
            {
              song_id: body.id_song,
              playlist_id: body.id_playlist,
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
        const { error } = await supabase.from('playlist_song')
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
