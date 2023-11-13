/** @type {import('next').NextConfig} */

const supabaseDomain = process.env.NEXT_PUBLIC_SUPABASE_DOMAIN ?? '';

const nextConfig = {
  images: {
    domains: [supabaseDomain]
  }
}

module.exports = nextConfig
