/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Single copy of TypeORM + entities in Node (avoids "No metadata for X" when the bundler duplicates entity classes).
  serverExternalPackages: ["typeorm", "reflect-metadata", "better-sqlite3"],
}

export default nextConfig
