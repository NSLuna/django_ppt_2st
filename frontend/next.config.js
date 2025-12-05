/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  // ⭐ Turbopack이 상위 폴더(package-lock) 보고 프로젝트 루트 착각하는 문제 해결
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
