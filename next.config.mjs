/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/admin/users",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
