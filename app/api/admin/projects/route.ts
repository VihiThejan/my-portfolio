import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    const projects = await db.project.findMany({
      where: published !== null ? { published: published === 'true' } : {},
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    // Parse JSON fields
    const formattedProjects = projects.map(project => ({
      ...project,
      images: JSON.parse(project.images || '[]'),
      tags: JSON.parse(project.tags || '[]'),
      techStack: JSON.parse(project.techStack || '[]'),
      languages: JSON.parse(project.languages || '[]'),
      challenges: JSON.parse(project.challenges || '[]'),
      solutions: JSON.parse(project.solutions || '[]'),
      results: JSON.parse(project.results || '[]'),
      metrics: JSON.parse(project.metrics || '[]'),
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Convert arrays to JSON strings
    const projectData = {
      ...data,
      images: JSON.stringify(data.images || []),
      tags: JSON.stringify(data.tags || []),
      techStack: JSON.stringify(data.techStack || []),
      languages: JSON.stringify(data.languages || []),
      challenges: JSON.stringify(data.challenges || []),
      solutions: JSON.stringify(data.solutions || []),
      results: JSON.stringify(data.results || []),
      metrics: JSON.stringify(data.metrics || []),
    };

    const project = await db.project.create({
      data: projectData,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
