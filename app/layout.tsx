import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 修正后的正确导入路径！！！
// 从 app/ 目录上一级（根目录）→ components/ → ui/ → 组件文件
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import BackToTop from '../components/ui/BackToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '森诺智联 - 智能机器人解决方案提供商',
  description: '专注智能机器人研发与应用，为全球客户提供高品质的自动化解决方案，推动产业智能化升级',
  keywords: '智能机器人,协作机器人,AGV移动机器人,服务机器人,自动化解决方案',
  authors: [{ name: '森诺智联机器人技术有限公司' }],
  charset: 'UTF-8',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <div id="successToast" className="success-toast">
          <i className="fa fa-check-circle mr-2"></i> 咨询提交成功！我们将尽快与您联系
        </div>
      </body>
    </html>
  );
}