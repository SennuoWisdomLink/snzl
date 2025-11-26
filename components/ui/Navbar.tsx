'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      // 导航栏滚动样式变化
      setNavbarScrolled(window.scrollY > 50);
      
      // 高亮当前section对应的导航链接
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id') || 'home';
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭移动菜单
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // 导航链接数据
  const navLinks = [
    { id: 'home', label: '首页' },
    { id: 'about', label: '关于我们' },
    { id: 'products', label: '产品中心' },
    { id: 'cases', label: '案例展示' },
  ];

  return (
    <header 
      id="navbar" 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        navbarScrolled 
          ? 'bg-dark/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <Image 
                src="/images/logo.png" 
                alt="森诺智联Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              森诺智联+
            </span>
          </a>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-target={link.id}
                className={`font-medium transition-colors nav-link ${
                  activeSection === link.id 
                    ? 'nav-active text-white' 
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              data-target="contact"
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all transform hover:scale-105 nav-link no-highlight"
            >
              联系我们
            </a>
          </nav>
          
          {/* 移动端汉堡菜单 */}
          <button
            id="menuBtn"
            className="md:hidden text-white text-2xl focus:outline-none cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单切换"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
      
      {/* 移动端导航菜单 */}
      <div 
        id="mobileMenu" 
        className={`md:hidden absolute top-full left-0 right-0 z-40 w-full bg-secondary shadow-lg transition-all duration-300 ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-5">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-target={link.id}
              className={`font-medium py-3 border-b border-gray-700 nav-link transition-colors ${
                activeSection === link.id 
                  ? 'nav-active text-white' 
                  : 'text-gray-300 hover:text-primary'
              }`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-target="contact"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-center transition-all nav-link no-highlight"
            onClick={closeMobileMenu}
          >
            联系我们
          </a>
        </div>
      </div>
    </header>
  );
}