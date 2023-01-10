import { supabase } from '@libs/supabase';
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method, body } = req

  // async function pass() {
  //   let hashed = await hash('password', 8);
  //   // save hashed to db
  //   console.log(hashed)
  //   // compare hashed from db and password from a form that submitted 
  //   let isMatch = await compare(form.password, hashed);
  //   console.log(isMatch)
  // }
  // pass()

  // const token = jwt.sign(
  //   {
  //     username: data.username,
  //     password: data.name,
  //   },
  //   process.env.JWT_SECRET
  // );
  // const user = jwt.verify(token, process.env.JWT_SECRET);

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
        const token = jwt.sign(
          {
            username: data.username,
            password: data.name,
          },
          process.env.JWT_SECRET
        );
        // const decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decode)
        res.status(200).json({ ...data, token });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}

// switch (method) {
//   case "GET":
//     try {
//       if (!req.headers.authorization) {
//         return res.json({ error: "Please provide headers" });
//       }
//       const token = req.headers.authorization.split("Bearer ")[1];
//       if (!token) {
//         return res.json({ error: "Token not found" });
//       }
//       const user = jwt.verify(token, process.env.JWT_SECRET);
//       if (!user) {
//         return res.json({ error: "Token not valid" });
//       }
//       const user_data = await User.aggregate([
//         {
//           $match: {
//             username: user.username,
//           },
//         },
//       ]);
//       if (!user_data[0]) {
//         return res.json({ error: "User not found" });
//       }
//       const isMatch = await compare(user.password, user_data[0].password);
//       if (!isMatch) {
//         return res.json({ error: "Token not valid" });
//       }
//       delete user_data[0].password;
//       return res.json(user_data[0]);
//     } catch (err) {
//       return res.json({ error: "Error on calling API" });
//     }
//   default:
//     return res.json({ error: "Only accepting GET method" });
// }