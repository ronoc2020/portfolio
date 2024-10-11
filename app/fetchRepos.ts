// pages/api/fetchRepos.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the repository type
type Repository = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiToken = process.env.GITHUB_API_TOKEN; // This will be stored in .env
  const username = 'ronoc2020'; // Set your GitHub username or obtain through the request if needed

  if (!apiToken) {
    return res.status(500).json({ error: 'API token is not set' });
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

    const data: Repository[] = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
