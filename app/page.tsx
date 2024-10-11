"use client";
import { useCallback, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Youtube, Twitter, Twitch, Search } from "lucide-react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Parser from "rss-parser";

// Type Definitions
type FeedItem = {
  title: string;
  link: string;
};

type FeedSource = {
  source: string;
  url: string;
  items: FeedItem[];
};

type Repository = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
};

// RSS Feed Sources
const rssSources: FeedSource[] = [
  { source: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews?format=xml", items: [] },
  { source: "Dark Reading", url: "https://www.darkreading.com/rss/all.xml", items: [] },
  { source: "InfoSecurity Magazine", url: "https://www.infosecurity-magazine.com/rss/news/", items: [] },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rssFeedItems, setRssFeedItems] = useState<FeedSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Fetch RSS Feeds
  const fetchRssFeeds = async () => {
    const parser = new Parser();
    setError(null); // Reset error state

    try {
      const feeds = await Promise.all(
        rssSources.map(async ({ source, url }) => {
          const feed = await parser.parseURL(url);
          const items = feed.items
            .slice(0, 3)
            .map(({ title, link }) => (title && link ? { title, link } : null))
            .filter((item): item is FeedItem => item !== null);

          return { source, url, items };
        })
      );

      setRssFeedItems(feeds);
    } catch (error) {
      console.error("Error fetching RSS feeds:", error);
      setError("Failed to fetch RSS feeds. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch GitHub Repositories
  const fetchRepositories = async () => {
    setError(null); // Reset error state

    try {
      const response = await fetch("https://api.github.com/users/ronoc2020/repos");
      if (!response.ok) throw new Error("Failed to fetch repositories");

      const data: Repository[] = await response.json();
      setRepositories(data);
      setFilteredRepositories(data); // Set filtered repositories initially to all repositories
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setError("Failed to fetch repositories. Please try again later.");
    }
  };

  // Handle Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRepositories(filtered);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchRssFeeds();
    fetchRepositories();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-purple-900 to-black">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              speed: 6,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />

      <Container>
        <nav className="flex justify-between items-center w-full mb-16">
          <div className="flex items-center">
            <Image src="/logo.png" alt="RO-NOC Logo" width={50} height={50} />
            <h1 className="text-4xl font-bold ml-4 glow-text">RO-NOC</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover-text">Home</Link>
            <Link href="#" className="hover-text">About</Link>
            <Link href="#" className="hover-text">Services</Link>
            <Link href="#" className="hover-text">Contact</Link>
          </div>
        </nav>

        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 animate-glow">24/7 Network Management</h2>
          <p className="text-xl mb-8">Ensuring stability and security for your IT infrastructure.</p>
          <p className="text-2xl font-semibold">Tel: +48 695295641</p>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hover-card">
              <h4 className="text-xl font-semibold mb-2">IT Consulting</h4>
              <p>Expert advice for your IT strategy and implementation.</p>
            </div>
            <div className="hover-card">
              <h4 className="text-xl font-semibold mb-2">Cloud Solutions</h4>
              <p>Seamless migration and management of cloud infrastructure.</p>
            </div>
            <div className="hover-card">
              <h4 className="text-xl font-semibold mb-2">Network Management</h4>
              <p>24/7 monitoring and maintenance of your network.</p>
            </div>
            <div className="hover-card">
              <h4 className="text-xl font-semibold mb-2">Cybersecurity</h4>
              <p>Advanced protection against cyber threats.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Latest Cybersecurity News</h3>
          {loading ? (
            <p>Loading news...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="space-y-4">
              {rssFeedItems.map((feed) => (
                <div key={feed.source}>
                  <h4 className="font-bold text-xl">{feed.source}</h4>
                  {feed.items.map((item, index) => (
                    <li key={index} className="hover-card">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Search Our Repos</h3>
          <form onSubmit={handleSearch} className="flex space-x-4">
            <Input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center">
              <Search className="mr-2" /> Search
            </Button>
          </form>
          <ul className="space-y-4 mt-4">
            {filteredRepositories.map((repo) => (
              <li key={repo.id} className="hover-card">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  {repo.name} ({repo.stargazers_count} stars)
                </a>
              </li>
            ))}
            {filteredRepositories.length === 0 && searchQuery && (
              <p>No repositories found for "{searchQuery}"</p>
            )}
          </ul>
        </section>

        <footer className="mt-16">
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="#" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Youtube className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitch">
              <Twitch className="h-6 w-6" />
            </Link>
          </div>
          <p>&copy; 2024 RO-NOC Solutions. All rights reserved.</p>
        </footer>
      </Container>
    </main>
  );
}
