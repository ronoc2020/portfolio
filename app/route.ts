// app/api/fetchRepos/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiToken = process.env.GITHUB_API_TOKEN; // Fetch the GitHub API Token from environment variables
  const username = 'ronoc2020'; // Set your GitHub username

  if (!apiToken) {
    return NextResponse.json({ error: 'API token is not set' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
