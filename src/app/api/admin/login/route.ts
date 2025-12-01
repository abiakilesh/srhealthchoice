import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const isValid = await verifyAdmin(username, password);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create a simple session token
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    return NextResponse.json({ token, username });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
