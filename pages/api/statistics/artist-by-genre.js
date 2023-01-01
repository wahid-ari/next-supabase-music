import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      const { data: artist } = await supabase.from('artists')
        .select(`*`)
        .order('id');
      const { data: genres } = await supabase.from('genre')
        .select(`*`)
        .order('id');
      // Make an array of object structure
      let items = []
      for (const genre of genres) {
        items.push({
          id: genre.id,
          label: genre.name,
          total: 0
        })
      }
      // Count total artist that have same genre
      let result = []
      for (const item of items) {
        for (const artis of artist) {
          if (artis.genre_id == item.id) {
            let filtered = items.filter(i => i.id == artis.genre_id)[0]
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
      res.status(200).json(data);
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
