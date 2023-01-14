module.exports = {
  // https://vercel.com/guides/how-to-enable-cors#enabling-cors-in-a-next.js-app
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  env: {
    API_ROUTE: "http://localhost:3000/",
    SUPABASE_URL: "https://lycnmgrucuhwifljiwsw.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Y25tZ3J1Y3Vod2lmbGppd3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTcxOTQzNzgsImV4cCI6MTk3Mjc3MDM3OH0.9fjEpk8IIOk5cPQirKXz1bIjYRITLAgEJxpu0T78PfY",
    JWT_SECRET: "hIeC2nLWT1VurroJ",
  },
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com", "i.scdn.co"
    ],
  },
};
