export default async function handler(req, res) {
  if (req.method === 'PUT') {
    res.status(201).json({});
  }

  if (req.method === 'GET') {
    res.status(200).json({});
  }

  if (req.method === 'POST') {
    res.status(200).json({});
  }

  if (req.method === 'DELETE') {
    res.status(204).json({});
  }
}
