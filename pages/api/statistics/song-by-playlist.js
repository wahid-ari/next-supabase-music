import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      const { data: playlists } = await supabase.from('playlist')
        .select(`*, playlist_song (*)`)
        .order('id');
      // Make an array of object structure
      let items = []
      for (const playlist of playlists) {
        items.push({
          id: playlist.id,
          label: playlist.name,
          total: playlist.playlist_song.length
        })
      }
      res.status(200).json(items);
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
