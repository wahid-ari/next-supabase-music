const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}`;

function generateSiteMap(songs: any, albums: any, artists: any, playlists: any) {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
      <!-- Manually set the URLs we know already-->
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${BASE_URL}/search</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/statistics</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/dashboard/song</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/dashboard/album</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/dashboard/artist</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/dashboard/playlist</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/login</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${BASE_URL}/register</loc>
        <lastmod>${today.toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>

  <!-- Automatically generate dynamic : any page-->
  ${songs
    .map((song: any) => {
      return `
      <url>
        <loc>${`${BASE_URL}/dashboard/song/detail/${song.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
  <!-- Automatically generate dynamic albums page-->
  ${albums
    .map((album: any) => {
      return `
      <url>
        <loc>${`${BASE_URL}/dashboard/album/detail/${album.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
    
  <!-- Automatically generate dynamic artists page-->
  ${artists
    .map((artist: any) => {
      return `
      <url>
        <loc>${`${BASE_URL}/dashboard/artist/detail/${artist.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}
  
  <!-- Automatically generate dynamic playlists page-->
  ${playlists
    .map((playlist: any) => {
      return `
      <url>
        <loc>${`${BASE_URL}/dashboard/playlist/detail/${playlist.id}`}</loc>
        <lastmod>${today.toISOString()}</lastmod>
      </url>
    `;
    })
    .join('')}

    </urlset>
  `;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const getAllSongs = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`);
  const songs = await getAllSongs.json();
  const getAllAlbums = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`);
  const albums = await getAllAlbums.json();
  const getAllArtists = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`);
  const artists = await getAllArtists.json();
  const getAllPlaylists = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/playlist`);
  const playlists = await getAllPlaylists.json();

  // We generate the XML sitemap with the data
  const sitemap = generateSiteMap(songs, albums, artists, playlists);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
