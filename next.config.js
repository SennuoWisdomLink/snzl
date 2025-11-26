/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        'node_modules/**/*',
        '**/DumpStack.log.tmp',
        '**/hiberfil.sys',
        '**/pagefile.sys',
        '**/swapfile.sys',
      ],
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**', // 关键修改：/** 匹配所有层级路径（如 /id/96/600/400）
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**', // 本地图片也支持多级路径
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;