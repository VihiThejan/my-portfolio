import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    // Parse JSON fields
    const formattedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      image: project.image,
      images: JSON.parse(project.images || '[]'),
      tags: JSON.parse(project.tags || '[]'),
      techStack: JSON.parse(project.techStack || '[]'),
      languages: JSON.parse(project.languages || '[]'),
      status: project.status,
      difficulty: project.difficulty,
      category: project.category,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured,
      year: project.year,
      duration: project.duration,
      teamSize: project.teamSize,
      role: project.role,
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
