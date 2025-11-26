'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// 网站地图数据结构
interface SitemapItem {
  title: string;
  url: string;
  isExternal?: boolean;
  children?: SitemapItem[];
}

// 网站地图数据
const sitemapData: SitemapItem[] = [
  {
    title: '首页',
    url: '/'
  },
  {
    title: '关于我们',
    url: '/#about'
  },
  {
    title: '产品中心',
    url: '/#products',
    children: [
      { title: '工业协作机器人', url: '/#products' },
      { title: 'AGV移动机器人', url: '/#products' },
      { title: '智能服务机器人', url: '/#products' },
      { title: 'SCARA机器人', url: '/#products' },
      { title: '机器视觉系统', url: '/#products' }
    ]
  },
  {
    title: '案例展示',
    url: '/#cases',
    children: [
      { title: '汽车制造行业', url: '/#cases' },
      { title: '电子电器行业', url: '/#cases' },
      { title: '物流仓储行业', url: '/#cases' },
      { title: '医疗健康行业', url: '/#cases' }
    ]
  },
  {
    title: '联系我们',
    url: '/#contact'
  },
  {
    title: '法律条款',
    url: '#',
    children: [
      { title: '隐私政策', url: '/privacy-policy' },
      { title: '服务条款', url: '/terms-of-service' },
      { title: '网站地图', url: '/sitemap' }
    ]
  },
  {
    title: '外部链接',
    url: '#',
    children: [
      { title: '官方微信', url: 'javascript:;', isExternal: true },
      { title: '技术文档', url: 'javascript:;', isExternal: true },
      { title: '合作伙伴', url: 'javascript:;', isExternal: true }
    ]
  }
];

// 递归渲染网站地图项
const SitemapNode = ({ item }: { item: SitemapItem }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // 如果有子项，渲染可展开的节点
  if (item.children && item.children.length > 0) {
    return (
      <li className="mb-3">
        <div 
          className="flex items-center justify-between group cursor-pointer py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="flex items-center text-white font-medium">
            {item.title}
          </span>
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className={`text-primary transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </div>
        
        {isExpanded && (
          <ul className="pl-6 mt-2 border-l-2 border-gray-700">
            {item.children.map((child, index) => (
              <SitemapNode key={index} item={child} />
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
        >
          <span>{item.title}</span>
          <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 text-xs" />
        </a>
      ) : (
        <Link 
          href={item.url}
          className="flex items-center py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors text-gray-300 hover:text-primary"
        >
          <span>{item.title}</span>
        </Link>
      )}
    </li>
  );
};

export default function SitemapPage() {
  const sitemapRef = useRef<HTMLDivElement>(null);

  // 滚动动画效果
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sitemapRef.current) {
      observer.observe(sitemapRef.current);
    }

    return () => {
      if (sitemapRef.current) {
        observer.unobserve(sitemapRef.current);
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
        
        <div className="bg-dark/50 rounded-xl p-8 shadow-lg border border-gray-800">
          <ul className="space-y-4">
            {sitemapData.map((item, index) => (
              <SitemapNode key={index} item={item} />
            ))}
          </ul>
        </div>
        
        <div className="mt-12 bg-secondary/30 rounded-lg p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-white">使用说明</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>点击带有子菜单的项目可以展开或折叠下级菜单</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>带有 <FontAwesomeIcon icon={faExternalLinkAlt} className="inline text-xs" /> 图标的为外部链接，将在新窗口打开</span>
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