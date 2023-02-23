import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      if (!query.id) {
        res.status(200).json({ message: 'Id Album Required' });
      }
      const { data } = await supabase.from('album').select(`*, songs (*)`).eq('id', query.id).order('id');

      const artistId = data[0]?.artists_id;
      const { data: artist } = await supabase.from('artists').select(`*`).eq('id', artistId).order('id');
      // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      // res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json({ data, artist });
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
