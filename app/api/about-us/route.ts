import { getAboutUsData } from '@/lib/feishu';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const aboutUsData = await getAboutUsData();
    return NextResponse.json({ 
      success: true, 
      data: aboutUsData 
    });
  } catch (error) {
    console.error('获取“关于我们”数据失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '获取数据失败', 
        data: null 
      },
      { status: 500 }
    );
  }
}