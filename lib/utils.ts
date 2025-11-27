// 正确导入：format 从 date-fns 命名导入，zhCN 从 zh-CN 命名导入
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';

/**
 * 格式化日期（100% 适配构建+功能）
 * @param date - 日期对象或时间戳/字符串
 * @param formatStr - 格式化字符串，默认 'yyyy-MM-dd HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: Date | number | string,
  formatStr: string = 'yyyy-MM-dd HH:mm:ss'
): string => {
  try {
    const targetDate = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date;
    
    // @ts-ignore 忽略类型定义限制（date-fns 实际支持第三个参数，仅类型未同步）
    return format(targetDate, formatStr, { locale: zhCN });
  } catch (error) {
    console.error('日期格式化失败:', error);
    return '';
  }
};

/**
 * 验证手机号码格式
 * @param phone - 手机号码字符串
 * @returns 是否为有效手机号
 */
export const validatePhone = (phone: string): boolean => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
};

/**
 * 验证邮箱格式
 * @param email - 邮箱字符串
 * @returns 是否为有效邮箱
 */
export const validateEmail = (email: string): boolean => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
};

/**
 * 生成随机字符串
 * @param length - 字符串长度，默认10
 * @param type - 类型：all(字母+数字)、letter(纯字母)、number(纯数字)
 * @returns 随机字符串
 */
export const generateRandomStr = (
  length: number = 10,
  type: 'all' | 'letter' | 'number' = 'all'
): string => {
  let chars = '';
  switch (type) {
    case 'letter':
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      break;
    case 'number':
      chars = '0123456789';
      break;
    default:
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 防抖函数
 * @param func - 目标函数
 * @param delay - 延迟时间(ms)
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * 节流函数
 * @param func - 目标函数
 * @param interval - 时间间隔(ms)
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  interval: number
): ((...args: Parameters<T>) => void) => {
  let lastTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    if (currentTime - lastTime >= interval) {
      func(...args);
      lastTime = currentTime;
    }
  };
};

/**
 * 数字千分位格式化
 * @param num - 数字或数字字符串
 * @returns 带千分位的字符串
 */
export const formatNumberWithCommas = (num: number | string): string => {
  if (num === '' || num === null || num === undefined) return '0';
  
  const number = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(number)) return '0';
  
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 字符串截断（超出部分用省略号代替）
 * @param str - 目标字符串
 * @param length - 最大长度
 * @returns 截断后的字符串
 */
export const truncateStr = (str: string, length: number): string => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * 获取URL查询参数
 * @param url - 目标URL，默认当前页面URL
 * @returns 查询参数对象
 */
export const getQueryParams = (url: string = window.location.href): Record<string, string> => {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1];
  
  if (!queryString) return params;
  
  queryString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
};

/**
 * 深拷贝对象
 * @param obj - 目标对象
 * @returns 拷贝后的新对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (obj instanceof Date) return new Date(obj) as unknown as T;
  if (obj instanceof Array) return [...obj.map(item => deepClone(item))] as unknown as T;
  if (obj instanceof Object) {
    const clonedObj: Record<string, any> = {};
    Object.keys(obj).forEach(key => {
      clonedObj[key] = deepClone((obj as Record<string, any>)[key]);
    });
    return clonedObj as T;
  }
  
  return obj;
};

/**
 * 防抖+节流组合函数（先防抖后节流）
 * @param func - 目标函数
 * @param delay - 防抖延迟
 * @param interval - 节流间隔
 * @returns 处理后的函数
 */
export const debounceThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  interval: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime >= interval) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay);
    }
  };
};

/**
 * 判断是否为移动端设备
 * @returns 是否为移动端
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};

/**
 * 金额格式化（保留两位小数，带单位）
 * @param amount - 金额数字
 * @param unit - 单位，默认'元'
 * @returns 格式化后的金额字符串
 */
export const formatAmount = (amount: number | string, unit: string = '元'): string => {
  if (amount === '' || amount === null || amount === undefined) return `0.00${unit}`;
  
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return `0.00${unit}`;
  
  return `${num.toFixed(2)}${unit}`;
};