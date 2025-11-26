'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  return (
    <section id="home" className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image 
  src="/images/index_bg.png" 
  alt="背景图" 
  fill 
  sizes="100vw"  // 关键：占满整个视口宽度
unoptimized={true}
  className="object-cover opacity-80"
/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/0 to-dark"></div>
      </div>      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div >
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight text-shadow-lg mb-6">
            引领<span className="text-primary">智能机器人</span>创新<br />
            赋能<span className="text-accent">未来产业</span>变革
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            专注于工业级智能机器人研发与应用，提供从核心技术到整体解决方案的全链条服务，助力企业实现自动化升级与数字化转型。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#products" 
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
            >
              探索产品             </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-transparent border-2 border-white/30 hover:border-white/50 text-white rounded-lg font-semibold transition-all"
            >
              咨询方案
            </a>
          </div>
        </div>
        <div >
          <a href="#about" className="text-white/60 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faChevronDown} className="text-2xl" />
          </a>
        </div>
      </div>
      {/* 装饰元素 */}
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}