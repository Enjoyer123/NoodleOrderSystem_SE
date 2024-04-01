/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["res.cloudinary.com"]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };
<<<<<<< HEAD

    return config;
  },
}
=======
>>>>>>> 60e662a2bbd75084c299b7d2e5f27a46f7b2b828

    return config;
  },
}
export default nextConfig;
