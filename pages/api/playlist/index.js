import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      const { data } = await supabase.from('playlist')
        .select(`*, playlist_song (*)`)
        .order('id');
      res.status(200).json(data);
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('playlist')
          .insert([{ name: body.name }])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add playlist" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('playlist')
          .update({ name: body.name })
          .eq('id', body.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success update playlist" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        const { error } = await supabase.from('playlist')
          .delete()
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete playlist" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
