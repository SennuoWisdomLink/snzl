'use client';
import { useEffect, useRef, useState } from 'react'; // 显式导入useState
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// 网站地图数据结构 - 增加更严格的类型定义
interface SitemapItem {
  title: string;
  url: string;
  isExternal?: boolean;
  children?: SitemapItem[];
  // 增加可选的id用于key生成
  id?: string;
}

// 提取网站地图数据到单独函数，便于维护和扩展
const getSitemapData = (): SitemapItem[] => [
  {
    title: '首页',
    url: '/',
    id: 'home'
  },
  {
    title: '关于我们',
    url: '/#about',
    id: 'about'
  },
  {
    title: '产品中心',
    url: '/#products',
    id: 'products',
    children: [
      { title: '工业协作机器人', url: '/#products', id: 'products-1' },
      { title: 'AGV移动机器人', url: '/#products', id: 'products-2' },
      { title: '智能服务机器人', url: '/#products', id: 'products-3' },
      { title: 'SCARA机器人', url: '/#products', id: 'products-4' },
      { title: '机器视觉系统', url: '/#products', id: 'products-5' }
    ]
  },
  {
    title: '案例展示',
    url: '/#cases',
    id: 'cases',
    children: [
      { title: '汽车制造行业', url: '/#cases', id: 'cases-1' },
      { title: '电子电器行业', url: '/#cases', id: 'cases-2' },
      { title: '物流仓储行业', url: '/#cases', id: 'cases-3' },
      { title: '医疗健康行业', url: '/#cases', id: 'cases-4' }
    ]
  },
  {
    title: '联系我们',
    url: '/#contact',
    id: 'contact'
  },
  {
    title: '法律条款',
    url: '#',
    id: 'legal',
    children: [
      { title: '隐私政策', url: '/privacy-policy', id: 'legal-1' },
      { title: '服务条款', url: '/terms-of-service', id: 'legal-2' },
      { title: '网站地图', url: '/sitemap', id: 'legal-3' }
    ]
  },
  {
    title: '外部链接',
    url: '#',
    id: 'external',
    children: [
      { title: '官方微信', url: 'https://weixin.qq.com', isExternal: true, id: 'external-1' }, // 替换无效链接
      { title: '技术文档', url: '/docs', isExternal: true, id: 'external-2' }, // 替换无效链接
      { title: '合作伙伴', url: '/partners', isExternal: true, id: 'external-3' } // 替换无效链接
    ]
  }
];

// 定义组件Props类型，提升类型安全性
interface SitemapNodeProps {
  item: SitemapItem;
}

// 递归渲染网站地图项 - 优化可访问性和交互体验
const SitemapNode = ({ item }: SitemapNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = !!item.children?.length;

  // 处理空链接点击
  const handleEmptyLinkClick = (e: React.MouseEvent) => {
    if (item.url === '#') {
      e.preventDefault();
    }
  };

  if (hasChildren) {
    return (
      <li className="mb-3">
        <div 
          className="flex items-center justify-between group cursor-pointer py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          // 增加可访问性属性
          role="button"
          aria-expanded={isExpanded}
          aria-controls={`sitemap-${item.id}`}
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
        >
          <span className="flex items-center text-white font-medium">
            {item.title}
          </span>
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className={`text-primary transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            aria-hidden="true" // 图标仅装饰作用
          />
        </div>
        
        {isExpanded && (
          <ul 
            id={`sitemap-${item.id}`} // 与aria-controls对应
            className="pl-6 mt-2 border-l-2 border-gray-700 animate-fade-in" // 增加子菜单动画
          >
            {item.children?.map((child) => (
              <SitemapNode key={child.id || `${child.title}-${child.url}`} item={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }
  
  // 没有子项，渲染普通链接
  return (
    <li className="mb-2">
      {item.isExternal ? (
        <a 
          href={item.url}
          className="flex items-center py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-gray-300 hover:text-primary"
          target={item.isExternal ? '_blank' : '_self'}
          rel={item.isExternal ? 'noopener noreferrer' : ''}
          onClick={handleEmptyLinkClick}
          aria-label={`访问${item.title}（外部链接）`}
        >
          <span>{item.title}</span>
          <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 text-xs" aria-hidden="true" />
        </a>
      ) : (
        <Link 
          href={item.url}
          className="flex items-center py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-gray-300 hover:text-primary"
          onClick={handleEmptyLinkClick}
        >
          <span>{item.title}</span>
        </Link>
      )}
    </li>
  );
};

export default function SitemapPage() {
  const sitemapRef = useRef<HTMLDivElement>(null);
  const sitemapData = getSitemapData(); // 使用函数获取数据

  // 滚动动画效果 - 优化观察器配置
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target); // 只执行一次动画
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' } // 调整触发时机
    );

    const currentRef = sitemapRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={sitemapRef}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white">网站地图</h1>
        <p className="text-gray-400 mb-12">
          这里是森诺智联官方网站的所有页面导航，帮助您快速找到所需内容
        </p>
        
        <div className="bg-dark/50 rounded-xl p-8 shadow-lg border border-gray-800 transform transition-all duration-500 hover:shadow-xl">
          <ul className="space-y-4">
            {sitemapData.map((item) => (
              <SitemapNode key={item.id || `${item.title}-${item.url}`} item={item} />
            ))}
          </ul>
        </div>
        
        <div className="mt-12 bg-secondary/30 rounded-lg p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-white">使用说明</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>点击带有子菜单的项目可以展开或折叠下级菜单（也可按Enter键）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>带有 <FontAwesomeIcon icon={faExternalLinkAlt} className="inline text-xs" aria-hidden="true" /> 图标的为外部链接，将在新窗口打开</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>本网站支持平滑滚动，点击锚点链接将平滑跳转到对应位置</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>如果您在使用过程中遇到任何问题，请联系我们的客服团队</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}