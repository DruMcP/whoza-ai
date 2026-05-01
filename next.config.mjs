/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'vm-6ndpnuoz41hduvbfu6ks15wb.vusercontent.net',
    '*.vusercontent.net',
  ],
}

export default nextConfig
