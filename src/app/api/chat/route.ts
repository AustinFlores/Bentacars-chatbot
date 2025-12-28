import { NextRequest, NextResponse } from 'next/server';
import { chatWithBot } from '@/lib/chat';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('📩 CHAT:', body.message, body.role); // DEBUG
    
    const role = body.role || 'visitor';
    const reply = await chatWithBot(body.message, role);
    
    console.log('🤖 BOT REPLY:', reply); // DEBUG
    return NextResponse.json({ reply, role });
    
  } catch (error) {
    console.error('❌ CHAT ERROR:', error);
    return NextResponse.json({ 
      reply: 'Try "DP sedan?" 😊', 
      role: 'visitor' 
    });
  }
}
