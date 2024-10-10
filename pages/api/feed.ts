import type { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

type FeedItem = {
  title: string;
  link: string;
};

type ParsedFeed = {
  items: Array<{
    title?: string;
    link?: string;
  }>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedItem[]>
) {
  const parser = new Parser<ParsedFeed>(); // Specify the type for Parser
  const feeds = [
    'https://www.darkreading.com/rss/all.xml',
    'https://feeds.feedburner.com/eset/blog'
  ];

  try {
    const feedPromises = feeds.map(feed => parser.parseURL(feed));
    const results = await Promise.all(feedPromises);

    const allItems: FeedItem[] = results.flatMap(result => 
      result.items.map(item => ({
        title: item.title || 'No title', // Fallback to 'No title' if undefined
        link: item.link || '#', // Fallback to '#' if undefined
      }))
    );

    const latestItems = allItems.slice(0, 5); // Get the latest 5 items

    res.status(200).json(latestItems);
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    res.status(500).json([]);
  }
}
