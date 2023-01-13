import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        const { data } = await supabase.from('songs')
          .select(`*, artists (*), album (*)`)
          .order('id');
        res.status(200).json(data);
      } else {
        const { data } = await supabase.from('songs')
          .select(`*, artists (*), album (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else if (!body.artist_id) {
        res.status(422).json({ error: "Artist required" })
      } else {
        const { error } = await supabase.from('songs')
          .insert([
            {
              name: body.name,
              album_id: body.album_id,
              youtube_url: body.youtube_url,
              preview_url: body.preview_url,
              cover_url: body.cover_url,
              artist_id: body.artist_id
            }
          ])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add song" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('songs')
          .update({
            name: body.name,
            album_id: body.album_id,
            youtube_url: body.youtube_url,
            preview_url: body.preview_url,
            cover_url: body.cover_url,
            artist_id: body.artist_id
          })
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success update song" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        const { error } = await supabase.from('songs')
          .delete()
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete song" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
