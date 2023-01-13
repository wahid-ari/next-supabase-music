import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case "GET":
      const { data } = await supabase.from('album')
        .select(`*, artists (*), songs (*)`)
        .order('id');
      res.status(200).json(data);
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else if (!body.artist_id) {
        res.status(422).json({ error: "Artist required" })
      } else {
        const { error } = await supabase.from('album')
          .insert([
            {
              name: body.name,
              cover: body.cover_url,
              artists_id: body.artist_id
            }
          ])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add album" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('album')
          .update({
            name: body.name,
            cover: body.cover_url,
            artists_id: body.artist_id
          })
          .eq('id', body.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success update album" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        const { error } = await supabase.from('album')
          .delete()
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete album" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
