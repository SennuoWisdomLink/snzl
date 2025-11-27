import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import BackToTop from '../components/ui/BackToTop';

// 配置Inter字体，增加权重范围以支持更多排版需求
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // 增加常用字重
  display: 'swap' // 优化字体加载体验
});

export const metadata: Metadata = {
  title: {
    default: '森诺智联 - 智能机器人解决方案提供商',
    template: '%s | 森诺智联' // 支持页面标题模板
  },
  description: '专注智能机器人研发与应用，为全球客户提供高品质的自动化解决方案，推动产业智能化升级',
  keywords: '智能机器人,协作机器人,AGV移动机器人,服务机器人,自动化解决方案',
  authors: [{ name: '森诺智联机器人技术有限公司' }],
  charset: 'UTF-8',
  // 补充Open Graph元数据，优化社交分享
  openGraph: {
    title: '森诺智联 - 智能机器人解决方案提供商',
    description: '专注智能机器人研发与应用，为全球客户提供高品质自动化解决方案',
    type: 'website',
    url: 'https://your-domain.com', // 替换为实际域名
    images: [{ url: '/og-image.jpg' }], // 补充社交分享图片
  },
  // 增加主题颜色配置，优化移动设备体验
  themeColor: {
    light: '#ffffff',
    dark: '#000000'
  },
  // 增加苹果设备特定配置
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  // 允许用户缩放页面，提升可访问性（特殊场景可保留false）
  userScalable: true,
  // 增加视口适配配置
  viewportFit: 'cover'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        {/* 增加默认隐藏类，避免初始加载显示 */}
        <div id="successToast" className="success-toast hidden">
          <i className="fa fa-check-circle mr-2"></i> 咨询提交成功！我们将尽快与您联系
        </div>
      </body>
    </html>
  );
}