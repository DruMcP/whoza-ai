/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  trailingSlash: false,
  allowedDevOrigins: [
    'vm-6ndpnuoz41hduvbfu6ks15wb.vusercontent.net',
    '*.vusercontent.net',
  ],
}

export default nextConfig
