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

const particleOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
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
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rssFeedItems, setRssFeedItems] = useState<FeedSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
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

      const data = await response.json();
      const sortedRepos = data
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);
      setRepositories(sortedRepos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setError("Failed to fetch GitHub repositories. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRssFeeds();
    fetchRepositories();
  }, []);

  // Handle Search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
      // Implement search logic here by filtering rssFeedItems based on searchQuery
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-purple-900 to-black text-white">
      <Particles id="tsparticles" init={particlesInit} options={particleOptions} />
      <Container>
        <nav className="flex justify-between items-center w-full mb-16">
          <div className="flex items-center">
            <Image src="/logo.png" alt="RO-NOC Logo" width={50} height={50} />
            <h1 className="text-4xl font-bold ml-4 glow-text">RO-NOC</h1>
          </div>
          <div className="flex space-x-4">
            {["services", "news", "search", "contact"].map((item) => (
              <Link key={item} href={`#${item}`} className="hover-text">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
        </nav>
        <section className="text-center mb-16" id="intro">
          <h2 className="text-5xl font-bold mb-4 animate-glow">24/7 Network Management</h2>
          <p className="text-xl mb-8">Ensuring stability and security for your IT infrastructure.</p>
          <a href="mailto:ronoc2020@gmail.com?subject=Report an Issue&body=Description of the issue...">
            <Button className="report-issue-btn">Report Issue</Button>
          </a>
        </section>
        <section className="text-center mb-16" id="profile">
          <h2 className="text-4xl font-bold mb-4">Roman Orlowski</h2>
          <p className="text-xl mb-4">Well-organized professional with over 15 years of IT experience, particularly in security and cloud management.</p>
          <p className="text-lg mb-4">Strengths include:</p>
          <ul className="list-disc list-inside mb-8">
            <li>Infrastructure Management</li>
            <li>Cybersecurity</li>
            <li>Project Leadership</li>
          </ul>
          <p className="text-lg mb-4">Key Highlights:</p>
          <ul className="list-disc list-inside mb-8">
            <li>Senior Engineer at LTI MindTree Ltd, enhancing security measures.</li>
            <li>Support Engineer at Intellias, managing cloud infrastructures.</li>
          </ul>
          <p className="text-lg mb-4">Educational Background & Technical Skills:</p>
          <ul className="list-disc list-inside mb-8">
            <li>Expertise in Azure and AWS.</li>
            <li>Degree in Computer Science.</li>
            <li>Proficient in various security frameworks.</li>
          </ul>
        </section>
        <section className="text-center mb-16" id="services">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="service-card">
              <h3 className="text-xl font-bold">Cloud Management</h3>
              <p>Comprehensive cloud solutions for your business.</p>
            </div>
            <div className="service-card">
              <h3 className="text-xl font-bold">Security Audits</h3>
              <p>Thorough audits to ensure compliance and security.</p>
            </div>
            <div className="service-card">
              <h3 className="text-xl font-bold">Network Monitoring</h3>
              <p>Continuous monitoring to prevent downtime.</p>
            </div>
          </div>
        </section>
        <section className="text-center mb-16" id="news">
          <h2 className="text-4xl font-bold mb-4">Latest News</h2>
          <form onSubmit={handleSearch} className="mb-4">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="mb-2"
            />
            <Button type="submit" className="ml-2">
              <Search />
            </Button>
          </form>
          {loading ? (
            <p>Loading news...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            rssFeedItems.map(({ source, items }) => (
              <div key={source}>
                <h3 className="text-2xl font-bold mt-4">{source}</h3>
                <ul className="list-disc list-inside mb-4">
                  {items.map((item) => (
                    <li key={item.link}>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
        <section className="text-center mb-16" id="github">
          <h2 className="text-4xl font-bold mb-4">GitHub Repositories</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {repositories.map((repo) => (
                <div key={repo.id} className="repo-card">
                  <h3 className="text-xl font-bold">{repo.name}</h3>
                  <p>⭐ {repo.stargazers_count} Stars</p>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    View Repository
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
        <footer className="text-center mt-16">
          <p>Connect with us on social media:</p>
          <div className="flex justify-center space-x-4">
            <Link href="https://github.com/ronoc2020">
              <Github className="hover:scale-110 transition-transform" />
            </Link>
            <Link href="https://www.linkedin.com/in/ron-orlowski/">
              <Linkedin className="hover:scale-110 transition-transform" />
            </Link>
            <Link href="https://twitter.com/ronoc2020">
              <Twitter className="hover:scale-110 transition-transform" />
            </Link>
            <Link href="https://www.twitch.tv/ronoc2020">
              <Twitch className="hover:scale-110 transition-transform" />
            </Link>
            <Link href="https://www.youtube.com/c/RonOrlowski">
              <Youtube className="hover:scale-110 transition-transform" />
            </Link>
          </div>
        </footer>
      </Container>
    </main>
  );
}
