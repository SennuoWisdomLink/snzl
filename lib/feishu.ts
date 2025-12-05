import axios from 'axios';

// 飞书API基础配置
const FEISHU_BASE_URL = 'https://open.feishu.cn/open-apis';
const config = {
  appId: process.env.FEISHU_APP_ID!,
  appSecret: process.env.FEISHU_APP_SECRET!,
  aboutusToken: process.env.FEISHU_ABOUTUS_TOKEN,
  aboutTableId: process.env.FEISHU_ABOUTUS_TABLE_ID!,
  productToken: process.env.FEISHU_PRODUCT_TOKEN,
  productTableId: process.env.FEISHU_PRODUCT_TABLE_ID!,
};

// Token缓存（有效期2小时）
let tokenCache: { token: string; expires: number } | null = null;

/**
 * 获取飞书应用访问令牌
 */
async function getTenantAccessToken() {
  if (tokenCache && tokenCache.expires > Date.now()) {
    return tokenCache.token;
  }

  const response = await axios.post(
    `${FEISHU_BASE_URL}/auth/v3/tenant_access_token/internal`,
    { app_id: config.appId, app_secret: config.appSecret }
  );

  if (response.data.code !== 0) {
    throw new Error(`获取Token失败: ${response.data.msg}`);
  }

  tokenCache = {
    token: response.data.tenant_access_token,
    expires: Date.now() + (response.data.expire - 300) * 1000, // 提前5分钟过期
  };
  return tokenCache.token;
}

/**
 * 新增：通过file_token获取飞书图片的Base64（后端代理，携带授权）
 */
async function getImageBase64(fileToken: string) {
  const token = await getTenantAccessToken();
  try {
    const response = await axios.get(
      `${FEISHU_BASE_URL}/drive/v1/medias/${fileToken}/download`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'arraybuffer', // 接收二进制图片数据
      }
    );
    // 二进制数据转为Base64（前端可直接渲染）
    return `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
  } catch (err) {
    console.error(`图片Base64转换失败:`, err);
    return '';
  }
}

/**
 * 获取“关于我们”sheet页的所有数据（核心介绍、企业使命、背景图）
 */
export async function getAboutUsData() {
  const token = await getTenantAccessToken();
  
  const response = await axios.get(
    `${FEISHU_BASE_URL}/bitable/v1/apps/${config.aboutusToken}/tables/${config.aboutTableId}/records`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (response.data.code !== 0) {
    throw new Error(`获取“关于我们”数据失败: ${response.data.msg}`);
  }

  const firstRecord = response.data.data.items[0]?.fields || {};
  let bgImageUrl = '';
  const bgImage = firstRecord['背景图']?.[0];
  
  if (bgImage?.file_token) {
    bgImageUrl = await getImageBase64(bgImage.file_token); // 背景图也用Base64
  }

  return {
    coreIntro: firstRecord['核心介绍'] || '',
    companyMission: firstRecord['企业使命'] || '',
    backgroundImage: bgImageUrl,
  };
}

/**
 * 获取“产品中心”sheet页的所有产品数据（图片转为Base64）
 */
export async function getProductCenterData() {
  const token = await getTenantAccessToken();
  
  if (!config.productToken || !config.productTableId) {
    throw new Error('产品中心配置缺失：productToken或productTableId未设置');
  }

  const response = await axios.get(
    `${FEISHU_BASE_URL}/bitable/v1/apps/${config.productToken}/tables/${config.productTableId}/records`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (response.data.code !== 0) {
    throw new Error(`获取产品中心数据失败: ${response.data.msg}`);
  }

  const productItems = response.data.data.items || [];
  const products = [];

  for (const item of productItems) {
    const fields = item.fields || {};
    let productImageBase64 = '';

    // 处理产品图片：转为Base64（无需前端授权）
    const productImage = fields['产品图片']?.[0];
    if (productImage?.file_token) {
      productImageBase64 = await getImageBase64(productImage.file_token);
    }

    products.push({
      id: item.record_id || item.id,
      name: fields['产品名称'],
      description: fields['产品介绍'],
      link: fields['详情链接'],
      image: productImageBase64, // 返回Base64字符串
      delay: `${products.length * 0.1}s`,
    });
  }

  return products;
}