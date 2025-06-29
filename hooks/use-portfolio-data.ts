'use client';

import { useState, useEffect } from 'react';
import { Project, Skill } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, isLoading, error };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/skills');
        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, isLoading, error };
}
