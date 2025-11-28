'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);

  // 优化滚动动画：兼顾PC+移动端触发稳定性
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // 触发一次后停止监听，提升性能
          }
        });
      },
      {
        threshold: 0.05, // PC端5%可见触发，移动端0%可见也能触发（兼容视口差异）
        rootMargin: '30px 0px', // 扩展触发区域，避免漏触发
      }
    );

    if (aboutRef.current) {
      const elements = aboutRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (aboutRef.current) {
        const elements = aboutRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="about" className="py-12 sm:py-20 " ref={aboutRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 用Flex容器实现「图左文右」布局，大屏幕分栏/移动端堆叠 */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 图片区域：占全屏宽度，大屏幕下占1/2 */}
          <div className="relative w-full  aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9]">
            <Image
              src="/images/company_bg.png"
              alt="公司环境"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized={true} // 禁用图片优化，避免加载中断
            />
          </div>

          {/* 文本区域：占全屏宽度，大屏幕下占1/2 */}
          <div className="w-full lg:w-1/2 animate-on-scroll">
            <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold mb-4 sm:mb-6">
              以<span className="text-primary">技术创新</span>驱动，<br />
              打造机器人领域领军品牌
            </h2>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-lg">
              专注于智能机器人研发与应用的高新技术企业，深耕于工业与农业智能化领域，以“技术创新驱动产业升级”为核心使命，致力于通过机器人技术与人工智能的深度融合，为各行业提供高效、安全、精准的智能化解决方案。
            </p>
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-lg">
              作为高新技术产业的重要参与者，森诺智联嘉始终以技术创新为引擎，以产业需求为导向，深度与高校、科研院所、产业伙伴合作，加速技术成果转化，致力于成为智能机器人领域协同创新的典范，为推动产业智能化升级贡献核心技术力量。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}