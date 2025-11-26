'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      id="backToTop"
      className={`fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 z-50 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={scrollToTop}
      aria-label="返回顶部"
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  );
}