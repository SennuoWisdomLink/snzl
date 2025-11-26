'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faEye, faMapMarker, faShield, faMicrophone, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// 产品数据类型定义
interface ProductFeature {
  icon: React.ReactNode;
  label: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  features: ProductFeature[];
  delay: string;
}

// 产品数据
const products: Product[] = [
  {
    id: 1,
    name: '工业协作机器人',
    category: '服务系列',
    image: 'https://picsum.photos/id/96/600/400',
    description: '负载3-20kg，重复定位精度±0.02mm，支持拖拽示教、视觉引导，适用于装配、搬运、焊接等工业场景',
    features: [
      { icon: <FontAwesomeIcon icon={faCogs} />, label: '多轴联动' },
      { icon: <FontAwesomeIcon icon={faEye} />, label: '视觉定位' }
    ],
    delay: '0s'
  },
  {
    id: 2,
    name: 'AGV移动机器人',
    category: '表演系列',
    image: 'https://picsum.photos/id/42/600/400',
    description: '激光SLAM导航，最大负载500kg，支持自主避障、路径规划，适用于仓库货物搬运、生产线物料配送',
    features: [
      { icon: <FontAwesomeIcon icon={faMapMarker} />, label: 'SLAM导航' },
      { icon: <FontAwesomeIcon icon={faShield} />, label: '自主避障' }
    ],
    delay: '0.1s'
  },
  {
    id: 3,
    name: '智能服务机器人',
    category: '教育系列',
    image: 'https://picsum.photos/id/60/600/400',
    description: '集成AI语音交互、人脸识别、环境感知，适用于政务大厅、银行、医院、商场等场景的导览、咨询、接待服务',
    features: [
      { icon: <FontAwesomeIcon icon={faMicrophone} />, label: '语音交互' },
      { icon: <FontAwesomeIcon icon={faUser} />, label: '人脸识别' }
    ],
    delay: '0.2s'
  }
];

export default function Products() {
  const productsRef = useRef<HTMLDivElement>(null);

  // 滚动动画监听
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (productsRef.current) {
      const elements = productsRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (productsRef.current) {
        const elements = productsRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="products" className="py-20 bg-dark" ref={productsRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6">
            多元化<span className="text-primary">机器人产品矩阵</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">
            针对不同行业场景需求，研发覆盖便民服务、商业表演、科学教育的全系列智能机器人产品，提供灵活可靠的自动化解决方案。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group bg-secondary/50 rounded-xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll"
              style={{ transitionDelay: product.delay }}
            >
              <div className="relative h-60 overflow-hidden">
                <div className="relative w-full h-full">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    {product.features.map((feature, idx) => (
                      <span key={idx} className="flex items-center">
                        <span className="mr-1">{feature.icon}</span>
                        {feature.label}
                      </span>
                    ))}
                  </div>
                  <a href="#products" className="text-primary font-medium hover:text-primary/80 transition-colors">
                    查看详情 <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-on-scroll">
          <a 
            href="#products" 
            className="inline-block px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-all duration-300"
          >
            查看全部产品 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}