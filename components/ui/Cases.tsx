'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// 案例数据类型定义
interface CaseItem {
  id: number;
  name: string;
  category: string;
  categoryName: string;
  image: string;
  description: string;
  delay: string;
}

// 筛选选项类型
interface FilterOption {
  value: string;
  label: string;
}

// 案例数据
const cases: CaseItem[] = [
  {
    id: 1,
    name: '汽车零部件自动化装配',
    category: 'automotive',
    categoryName: '汽车制造',
    image: 'https://picsum.photos/id/111/600/350',
    description: '为某知名汽车制造商提供12台协作机器人，实现发动机零部件自动化装配，生产效率提升35%，不良率降低60%',
    delay: '0s'
  },
  {
    id: 2,
    name: '电子设备视觉检测',
    category: 'electronics',
    categoryName: '电子电器',
    image: 'https://picsum.photos/id/160/600/350',
    description: '为某消费电子企业提供机器视觉检测系统，结合6台SCARA机器人，实现手机屏幕缺陷检测，检测效率提升4倍',
    delay: '0.1s'
  },
  {
    id: 3,
    name: '智能仓储AGV系统',
    category: 'logistics',
    categoryName: '物流仓储',
    image: 'https://picsum.photos/id/180/600/350',
    description: '为某电商物流中心部署30台AGV机器人，实现货物出入库自动化搬运，仓库空间利用率提升25%，人力成本降低40%',
    delay: '0.2s'
  }
];

// 筛选选项
const filters: FilterOption[] = [
  { value: 'all', label: '全部案例' },
  { value: 'automotive', label: '汽车制造' },
  { value: 'electronics', label: '电子电器' },
  { value: 'logistics', label: '物流仓储' },
  { value: 'medical', label: '医疗健康' }
];

export default function Cases() {
  const casesRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCases, setFilteredCases] = useState<CaseItem[]>(cases);

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

    if (casesRef.current) {
      const elements = casesRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (casesRef.current) {
        const elements = casesRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  // 筛选案例
  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue);
    
    if (filterValue === 'all') {
      setFilteredCases(cases);
    } else {
      setFilteredCases(cases.filter(caseItem => caseItem.category === filterValue));
    }
    
    // 重新触发动画
    setTimeout(() => {
      const caseElements = document.querySelectorAll('.case-item .animate-on-scroll');
      caseElements.forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 100);
      });
    }, 10);
  };

  return (
    <section id="cases" className="py-20 bg-dark" ref={casesRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6">
            赋能<span className="text-primary">各行业</span>客户价值提升
          </h2>
          <p className="text-gray-300 leading-relaxed">
            已为汽车、电子、物流、医疗等多个行业的知名企业提供智能机器人解决方案，获得客户高度认可
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`case-filter px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.value
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-gray-300 hover:bg-secondary/80'
              }`}
              data-filter={filter.value}
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((caseItem) => (
            <div 
              key={caseItem.id}
              className="case-item group"
              data-category={caseItem.category}
            >
              <div 
                className="bg-secondary/50 rounded-xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll"
                style={{ transitionDelay: caseItem.delay }}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image 
                      src={caseItem.image} 
                      alt={caseItem.name} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 gradient-overlay"></div>
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-primary/80 text-white text-xs font-medium rounded-full">
                    {caseItem.categoryName}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {caseItem.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {caseItem.description}
                  </p>
                  <a 
                    href="#cases" 
                    className="text-primary font-medium hover:text-primary/80 transition-colors text-sm"
                  >
                    查看案例详情 <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>      
        
        <div className="text-center mt-12 animate-on-scroll">
          <a 
            href="#cases" 
            className="inline-block px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-all duration-300"
          >
            查看全部案例 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}