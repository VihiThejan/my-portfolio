import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    
    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const formattedProject = {
      ...project,
      images: JSON.parse(project.images || '[]'),
      tags: JSON.parse(project.tags || '[]'),
      techStack: JSON.parse(project.techStack || '[]'),
      languages: JSON.parse(project.languages || '[]'),
      challenges: JSON.parse(project.challenges || '[]'),
      solutions: JSON.parse(project.solutions || '[]'),
      results: JSON.parse(project.results || '[]'),
      metrics: JSON.parse(project.metrics || '[]'),
    };

    return NextResponse.json(formattedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
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

    const project = await db.project.update({
      where: { id },
      data: projectData,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth.isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
