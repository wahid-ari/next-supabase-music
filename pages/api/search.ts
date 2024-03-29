import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (!query.q) {
        res.status(200).json({ message: 'Query Required' });
      }
      const { data: songs } = await supabase.from('songs').select(`*`).textSearch('name', `'${query.q}'`);
      const { data: albums } = await supabase.from('album').select(`*`).textSearch('name', `'${query.q}'`);
      const { data: artists } = await supabase.from('artists').select(`*`).textSearch('name', `'${query.q}'`);
      const { data: allArtists } = await supabase.from('artists').select(`*`).order('id');
      const { data: playlists } = await supabase
        .from('playlist')
        .select(`*, playlist_song (*)`)
        .textSearch('name', `'${query.q}'`);

      let songArtist = [];
      for (const song of songs) {
        for (const allArtist of allArtists) {
          if (song.artist_id == allArtist.id) {
            songArtist.push({
              ...song,
              artist_name: allArtist.name,
            });
          }
        }
      }
      let albumArtist = [];
      for (const album of albums) {
        for (const allArtist of allArtists) {
          if (album.artists_id == allArtist.id) {
            albumArtist.push({
              ...album,
              artist_name: allArtist.name,
            });
          }
        }
      }
      res.status(200).json({ songs: songArtist, albums: albumArtist, artists, playlists });
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
