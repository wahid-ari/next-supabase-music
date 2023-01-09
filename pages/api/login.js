import { supabase } from '@libs/supabase';
import { compare } from "bcryptjs";

export default async function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case "POST":
      if (!body.username) {
        res.status(422).json({ error: "Username required" })
      } else if (!body.password) {
        res.status(422).json({ error: "Password required" })
      } else {
        const { data, error } = await supabase.from('admin')
          .select(`*`)
          .eq('username', body.username)
          .limit(1)
          .single();
        if (error) {
          res.status(422).json({ error: "User not found" })
        }
        const isMatch = await compare(body.password, data?.password);
        if (!isMatch) {
          return res.status(422).json({ error: "Password mismatch" });
        }
        delete data.password
        delete data.created_at
        res.status(200).json(data);
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
