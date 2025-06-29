import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save to database
    await db.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || '',
        message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    
    const messages = await db.contactMessage.findMany({
      where: read !== null ? { read: read === 'true' } : {},
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
