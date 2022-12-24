import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case "GET":
      const { data } = await supabase.from('artists')
        .select(`*, genre (*)`)
        .order('id');
      res.status(200).json(data);
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else if (!body.genre_id) {
        res.status(422).json({ error: "Genre required" })
      } else {
        const { error } = await supabase.from('artists')
          .insert([
            {
              name: body.name,
              cover_url: body.cover_url,
              genre_id: body.genre_id
            }
          ])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add artist" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('artists')
          .update({ 
            name: body.name, 
            cover_url: body.cover_url,
            genre_id: body.genre_id, 
          })
          .eq('id', body.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success update artist" });
      }
      break;

    case "DELETE":
      const { error } = await supabase.from('artists')
        .delete()
        .eq('id', body)
      if (error) {
        res.status(422).json({ error: error.message })
      }
      res.status(200).json({ message: "Success delete artist" });
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
