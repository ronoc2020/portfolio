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
  const [repositories, setRepositories] = useState<any[]>([]); // Define a more specific type if available

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Fetch RSS Feeds
  const fetchRssFeeds = async () => {
    const parser = new Parser();

    try {
      const feeds = await Promise.all(rssSources.map(async ({ source, url }) => {
        const feed = await parser.parseURL(url);
        const items = feed.items.slice(0, 3)
          .map(({ title, link }) => (title && link ? { title, link } : null))
          .filter((item): item is FeedItem => item !== null);
        
        return { source, url, items };
      }));

      setRssFeedItems(feeds);
    } catch (error) {
      console.error("Error fetching RSS feeds:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch GitHub Repositories
  const fetchRepositories = async () => {
    try {
      const response = await fetch("https://api.github.com/users/ronoc2020/repos");
      if (!response.ok) throw new Error("Failed to fetch repositories");

      const data = await response.json();
      const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
      setRepositories(sortedRepos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
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
      // Implement search logic here
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-purple-900 to-black text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
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
        }}
      />
      <Container>
        <nav className="flex justify-between items-center w-full mb-16">
          <div className="flex items-center">
            <Image src="/logo.png" alt="RO-NOC Logo" width={50} height={50} />
            <h1 className="text-4xl font-bold ml-4 glow-text">RO-NOC</h1>
          </div>
          <div className="flex space-x-4">
            {["services", "news", "search", "contact"].map((item) => (
              <Link key={item} href={`#${item}`} className="hover-text">{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
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
            <li>Various certifications in IT and cybersecurity.</li>
          </ul>
          <p className="text-lg mb-4">Soft Skills:</p>
          <ul className="list-disc list-inside mb-8">
            <li>Teamwork</li>
            <li>Adaptability</li>
            <li>Multilingual: Polish, English, and German</li>
          </ul>
          <p className="text-lg mb-4">Personal Interests: Committed to professional development and community support.</p>
          <p className="text-sm text-gray-500">GDPR Statement: Your personal data will be processed for recruitment purposes in compliance with GDPR regulations.</p>
        </section>
      </Container>
    </main>
  );
}
