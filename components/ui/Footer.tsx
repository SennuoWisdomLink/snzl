'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarker, 
  faPhone, 
  faEnvelope, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-dark py-12 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#home" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 relative">
                <Image 
  src="/images/logo.png" 
  alt="品牌Logo" 
  fill 
  // 关键：根据屏幕尺寸定义显示宽度
  sizes="(max-width: 768px) 120px, 150px"  // 移动端120px，桌面端150px
  className="object-contain"  // 保持Logo比例，不拉伸
/>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                森诺智联+
              </span>
            </a>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              专注智能机器人研发与应用，为全球客户提供高品质的自动化解决方案，推动产业智能化升级。
              聚焦人工智能行业需求，高效对接行业机器人及 AI 技术服务商，推动技术协同，整合多方优势，打造适配场景的解决方案，助力产业智能化升级。
              精准适配客户需求，以服务客户为核心，推动新技术扎实落地，输出能稳定支撑生产的可用 AI 产品与服务。
            </p>                 
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">快速链接</h4>
            <ul className="space-y-4">
              {[
                { id: 'home', label: '首页' },
                { id: 'about', label: '关于我们' },
                { id: 'products', label: '产品中心' },
                { id: 'cases', label: '案例展示' },
                { id: 'contact', label: '联系我们' },
              ].map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">产品系列</h4>
            <ul className="space-y-4">
              {[
                '工业协作机器人',
                'AGV移动机器人',
                '智能服务机器人',
                'SCARA机器人',
                '机器视觉系统',
              ].map((product) => (
                <li key={product}>
                  <a 
                    href="#products" 
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">联系我们</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarker} className="text-primary mt-1" />
                <span className="text-gray-300 text-sm">辽宁省大连高新技术产业园区黄浦路533号海创国际产业大厦3002</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-primary mt-1" />
                <a href="tel:13795159537" className="text-gray-300 text-sm hover:text-primary transition-colors">13795159537</a>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary mt-1" />
                <a href="mailto:noname@snzljcloud.cn" className="text-gray-300 text-sm hover:text-primary transition-colors">noname@snzljcloud.cn</a>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faClock} className="text-primary mt-1" />
                <span className="text-gray-300 text-sm">周一至周五: 9:00-17:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} 森诺智联机器人技术有限公司. 保留所有权利.
          </p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">隐私政策</a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors text-sm">服务条款</a>
            <a href="/sitemap" className="text-gray-400 hover:text-primary transition-colors text-sm">网站地图</a>
          </div>
        </div>
      </div>
    </footer>
  );
}