import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
