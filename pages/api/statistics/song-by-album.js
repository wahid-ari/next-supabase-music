import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      const { data: songs } = await supabase.from('songs')
        .select(`*`)
        .order('id');
      const { data: albums } = await supabase.from('album')
        .select(`*`)
        .order('id');
      // Make an array of object structure
      let items = []
      for (const album of albums) {
        items.push({
          id: album.id,
          label: album.name,
          total: 0
        })
      }
      // Count total song that have same album
      let result = []
      for (const item of items) {
        for (const song of songs) {
          if (song.album_id == item.id) {
            let filtered = items.filter(i => i.id == song.album_id)[0]
            filtered.total += 1
            result.push(filtered)
          }
        }
      }
      // Remove duplicate values from an array of objects in javascript
      // https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
      let data = result.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
      let sortedData = data.sort((a, b) => b.total - a.total).slice(0, 10)
      res.status(200).json(sortedData);
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
