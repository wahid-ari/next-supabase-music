import { supabase } from '@libs/supabase';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method, body } = req;

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
    case 'POST':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
      } else if (!body.username) {
        res.status(422).json({ error: 'Username required' });
      } else if (!body.password) {
        res.status(422).json({ error: 'Password required' });
      } else {
        const { data: userNameExist } = await supabase
          .from('admin')
          .select(`*`)
          .eq('username', body.username)
          .limit(1)
          .single();
        if (userNameExist === null) {
          // if username not exist, hash password and inset to db
          const passwordHashed = await hash(body.password, 8);
          const { data: insertUser } = await supabase.from('admin').insert([
            {
              username: body.username,
              name: body.name,
              type: 'user',
              password: passwordHashed,
            },
          ]);
          // if no error after inserting user
          if (insertUser == null) {
            const { data: user } = await supabase
              .from('admin')
              .select(`*`)
              .eq('username', body.username)
              .limit(1)
              .single();
            const token = jwt.sign(
              {
                username: body.username,
                password: body.name,
              },
              process.env.JWT_SECRET
            );
            const { id, type } = user;
            const { username, name } = body;
            res.status(200).json({ id, type, username, name, token });
          }
        } else {
          res.status(422).json({ error: 'Username already exist' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
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
