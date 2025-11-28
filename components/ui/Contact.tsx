'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope, faClock, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import ContactForm from './ContactForm';
import { validatePhone, validateEmail } from '../../lib/utils';

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [showQrcode, setShowQrcode] = useState(false);

  // 滚动动画监听
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // 元素可见后停止观察，优化性能
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      const elements = contactRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (contactRef.current) {
        const elements = contactRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  // 微信二维码显示/隐藏
  const toggleQrcode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQrcode(!showQrcode);
  };

  // 点击页面其他地方关闭二维码
  useEffect(() => {
    const handleClickOutside = () => {
      if (showQrcode) {
        setShowQrcode(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showQrcode]);

  return (
    <section id="contact" className="py-20 bg-secondary" ref={contactRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6">
            携手<span className="text-primary">合作</span>，共创未来
          </h2>
          <p className="text-gray-300 leading-relaxed">
            无论您是需要产品咨询、方案定制还是技术支持，我们的团队都将为您提供专业、高效的服务
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 联系方式 */}
          <div className="animate-on-scroll">
            <div className="bg-dark/50 rounded-xl p-8 shadow-lg transition-all duration-500 hover:shadow-primary/20">
              <h3 className="text-2xl font-bold mb-8">联系方式</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                    <FontAwesomeIcon icon={faMapMarker} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">公司地址</h4>
                    <p className="text-gray-300">辽宁省大连高新技术产业园区黄浦路533号海创国际产业大厦3002</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                    <FontAwesomeIcon icon={faPhone} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">联系电话</h4>
                    <a href="tel:13795159537" className="contact-link">13795159537</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">电子邮箱</h4>
                    <a href="mailto:noname@snzljcloud.cn" className="contact-link">noname@snzljcloud.cn</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                    <FontAwesomeIcon icon={faClock} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">工作时间</h4>
                    <p className="text-gray-300">周一至周五: 9:00-17:00</p>
                  </div>
                </li>
              </ul>
                      <div className="mt-10">
  <h4 className="text-white font-semibold mb-4">关注我们</h4>
  <div className="flex gap-4">
    {/* 微信图标容器（相对定位，作为弹窗参考点） */}
    <div className="wechat-icon-wrapper relative" id="wechatContact">
      {/* 微信图标按钮 */}
      <button 
        className="w-14 h-14 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center text-white transition-colors wechat-icon-hover"
        onClick={toggleQrcode}
        aria-label="微信咨询"
      >
        <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
      </button>

      {/* 右上角弹出的二维码容器（核心定位修正） */}
      <div 
        className={`qrcode-container ${showQrcode ? 'show' : ''}`}
        style={{ 
          position: 'absolute',
          // 关键定位：在图标右上角外部（上移5px，右移5px，避免紧贴）
          top: '-300px', 
          left: 'calc(100% + 5px)', // 从图标右侧外扩5px
          transform: 'translateY(0)', // 取消垂直偏移
          width: '280px',
          maxWidth: '90vw',
          zIndex: 50
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 二维码内容（保持不变） */}
        <div className="qrcode-border relative p-4">
          <div className="qrcode-corner top-left"></div>
          <div className="qrcode-corner top-right"></div>
          <div className="qrcode-corner bottom-left"></div>
          <div className="qrcode-corner bottom-right"></div>
          <div className="w-56 h-56 mx-auto">
            <Image 
              src="/images/weixin.png" 
              alt="微信二维码" 
              width={224}
              height={224}
              className="object-contain"
            />
          </div>
        </div>
        <div className="qrcode-title mt-3 text-center">
          扫码关注微信公众号
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</div>
                 
          
          {/* 联系表单 */}
          <div className="animate-on-scroll">
            <div className="bg-dark/50 rounded-xl p-8 shadow-lg transition-all duration-500 hover:shadow-primary/20">
              <h3 className="text-2xl font-bold mb-8">发送咨询</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}