import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        res.status(200).json({ message: "Id Album Required" });
      }
      const { data } = await supabase.from('album')
        .select(`*, songs (*)`)
        .eq('id', query.id)
        .order('id');
      res.status(200).json(data);
      break;

    case "PUT":
      if (!query.id) {
        res.status(422).json({ error: "Id Album required" })
      } else if (!query.song_id) {
        res.status(422).json({ error: "Id Song required" })
      } else {
        const { error } = await supabase.from('songs')
          .update({
            album_id: null
          })
          .eq('id', query.song_id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success delete song from album" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
