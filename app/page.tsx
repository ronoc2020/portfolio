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

  // Fetch RSS Feeds and GitHub Repositories
  const fetchData = async () => {
    const parser = new Parser();
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    try {
      // Fetch RSS feeds
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

      // Fetch GitHub repositories
      const response = await fetch("https://api.github.com/users/ronoc2020/repos");
      if (!response.ok) throw new Error("Failed to fetch repositories");

      const data: Repository[] = await response.json();
      setRepositories(data);
      setFilteredRepositories(data); // Set filtered repositories initially to all repositories
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
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
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-purple-900 to-black relative overflow-hidden">
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
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 100 },
            opacity: { value: 0.5 },
            shape: {
              type: ["circle", "square", "triangle"],
            },
            size: { value: { min: 1, max: 10 } },
            rotate: {
              random: true,
              value: 0,
            },
            tilt: {
              random: true,
              value: 0,
            },
          },
          detectRetina: true,
        }}
      />

      <Container>
        <nav className="flex justify-between items-center w-full mb-16 z-10">
          <div className="flex items-center">
           <Image src="https://imgur.com/XzVeiIb" alt="RO-NOC Logo" width={90} height={90} 
/>
            <h1 className="text-4xl font-bold ml-4 glow-text">RO-NOC</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-300">Home</Link>
            <Link href="#about" className="hover:text-gray-300">About</Link>
            <Link href="#services" className="hover:text-gray-300">Services</Link>
            <Link href="#news" className="hover:text-gray-300">Cybersecurity News</Link>
            <Link href="#search" className="hover:text-gray-300">Search</Link>
            <Link href="#contact" className="hover:text-gray-300">Contact</Link>
            <Link href="#repositories" className="hover:text-gray-300">Repositories</Link>
          </div>
        </nav>

        {/* New Profile Section */}
        <section className="text-center mb-16" id="profile">
          <h2 className="text-4xl font-bold mb-4">Roman Orlowski</h2>
          <p className="text-xl mb-4">Well-organized professional with over 15 years of IT experience, particularly in security and cloud management.</p>
          <p className="text-lg mb-4">Strengths include:</p>
          <ul className="list-disc list-inside mb-8">
            <li>Infrastructure Management</li>
            <li>Cybersecurity</li>
            <li>Project Leadership</li>
          </ul>
        </section>

        {/* About Me Section */}
        <section id="about" className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">About Me</h3>
          <p className="text-xl mb-4">
            I am well-organized and showcase over 15 years of IT experience, particularly in security and cloud management.
            My strengths lie in infrastructure, cybersecurity, and project leadership. Key highlights include my roles at
            LTI MindTree Ltd as a Senior Engineer and Intellias as a Support Engineer, where I enhanced security measures
            and managed cloud infrastructures.
          </p>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 animate-glow">24/7 Network Management</h2>
          <p className="text-xl mb-8">Ensuring stability and security for your IT infrastructure.</p>
          <p className="text-2xl font-semibold">Tel: +48 695295641</p>
        </section>

        <section className="mb-16" id="services">
          <h3 className="text-3xl font-bold mb-4">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hover-card transition-transform transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2">IT Consulting</h4>
              <p>Expert advice for your IT strategy and implementation.</p>
            </div>
            <div className="hover-card transition-transform transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2">Cloud Solutions</h4>
              <p>Seamless migration and management of cloud infrastructure.</p>
            </div>
            <div className="hover-card transition-transform transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2">Network Management</h4>
              <p>24/7 monitoring and maintenance of your network.</p>
            </div>
            <div className="hover-card transition-transform transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2">Security Services</h4>
              <p>Robust security measures to protect your data.</p>
            </div>
          </div>
        </section>

        {/* Cybersecurity News Section */}
        <section className="mb-16" id="news">
          <h3 className="text-3xl font-bold mb-4">Cybersecurity News</h3>
          {loading ? (
            <p>Loading news...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="space-y-4">
              {rssFeedItems.map((feed) => (
                <div key={feed.source} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold">{feed.source}</h4>
                  <ul className="list-disc list-inside">
                    {feed.items.map((item, index) => (
                      <li key={index}>
                        <a href={item.link} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Search Repositories Section */}
        <section id="search" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Search GitHub Repositories</h3>
          <form onSubmit={handleSearch} className="flex mb-4">
            <Input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="ml-2"><Search /></Button>
          </form>
          {filteredRepositories.length > 0 ? (
            <ul className="space-y-2">
              {filteredRepositories.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    {repo.name} <span className="text-gray-400">({repo.stargazers_count} stars)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No repositories found.</p>
          )}
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400">© 2024 RO-NOC. All rights reserved.</p>
        </footer>
      </Container>
    </main>
  );
}
