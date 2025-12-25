// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["minio.nutech-integrasi.com"],
    plugins: ["unused-imports"],
    rules: {
      "unused-imports/no-unused-imports": "warn",
    },
  },
};

export default nextConfig;
