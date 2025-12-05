'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  return (
    <section id="home" className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-dark bg-secondary">
      {/* 背景图与渐变覆盖 */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image 
            src="/images/index_bg.png" 
            alt="智能科技背景" 
            fill 
            sizes="100vw"
            unoptimized={true}
            className="object-cover opacity-70"
            style={{ filter: 'contrast(110%) hue-rotate(-2deg)' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
      </div>      
      
      {/* 主体内容 - 使用flex布局控制垂直间距 */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl relative z-10 text-center">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* 文本与按钮区域 */}
          <div className="max-w-4xl w-full mb-16"> {/* 增加底部间距避免重叠 */}
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight mb-6">
              引领
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 ml-2">智能机器人</span>
              创新<br />
              赋能
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 ml-2">未来产业</span>
              变革
            </h1>
            
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              专注于工业级智能机器人研发与应用，提供从核心技术到整体解决方案的全链条服务，助力企业实现自动化升级与数字化转型。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="#products" 
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
              >
                探索产品
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 bg-transparent border-2 border-cyan-500/30 hover:border-cyan-500/50 text-white rounded-lg font-semibold transition-all duration-300"
              >
                咨询方案
              </a>
            </div>
          </div>
          
          {/* 向下滚动指示器 - 固定在内容下方，避免与按钮重叠 */}
         <div className="mt-auto">
  <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex flex-col items-center gap-2 p-2 transform hover:scale-110">
    <FontAwesomeIcon icon={faChevronDown} className="text-4xl drop-shadow-lg hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
  </a>
</div>
        </div>
      </div>
      
      {/* 装饰元素 */}
      <div className="absolute top-1/4 right-1/6 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/6 w-80 h-80 rounded-full bg-blue-500/8 blur-3xl"></div>
    </section>
  );
}