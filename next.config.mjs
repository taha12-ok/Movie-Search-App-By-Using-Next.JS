/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_OMDB_API_KEY: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    },
    images: {
      domains: ['m.media-amazon.com'], // Add this line
    },
  };
  
  export default nextConfig;
  