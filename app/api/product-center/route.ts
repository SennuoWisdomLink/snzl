import { getProductCenterData } from '@/lib/feishu';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await getProductCenterData();
    return NextResponse.json({ 
      success: true, 
      data: products 
    });
  } catch (error) {
    console.error('获取产品中心数据失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '获取产品数据失败', 
        data: [] 
      },
      { status: 500 }
    );
  }
}