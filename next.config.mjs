/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  allowedDevOrigins: [
    'vm-6ndpnuoz41hduvbfu6ks15wb.vusercontent.net',
    '*.vusercontent.net',
  ],
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
      preventFullImport: true,
      skipDefaultConversion: true,
    },
  },
}

export default nextConfig
