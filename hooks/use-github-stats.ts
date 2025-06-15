'use client';

import { useState, useEffect } from 'react';

interface GitHubStats {
  contributions: number;
  repositories: number;
  followers: number;
  isLoading: boolean;
  error: string | null;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubEvent {
  type: string;
  created_at: string;
}

export function useGitHubStats(username: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    contributions: 0,
    repositories: 0,
    followers: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!userResponse.ok) {
          throw new Error(`GitHub API error: ${userResponse.status}`);
        }

        const userData: GitHubUser = await userResponse.json();

        // Fetch events (for contributions calculation)
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!eventsResponse.ok) {
          throw new Error(`GitHub Events API error: ${eventsResponse.status}`);
        }

        const events: GitHubEvent[] = await eventsResponse.json();

        // Calculate contributions from the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentContributions = events.filter(event => {
          const eventDate = new Date(event.created_at);
          return eventDate >= thirtyDaysAgo && (
            event.type === 'PushEvent' ||
            event.type === 'CreateEvent' ||
            event.type === 'IssuesEvent' ||
            event.type === 'PullRequestEvent' ||
            event.type === 'CommitCommentEvent'
          );
        }).length;

        setStats({
          contributions: recentContributions,
          repositories: userData.public_repos,
          followers: userData.followers,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch GitHub stats',
        }));
      }
    };

    if (username) {
      fetchGitHubStats();
      
      // Refresh stats every 5 minutes
      const interval = setInterval(fetchGitHubStats, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [username]);

  return stats;
}
