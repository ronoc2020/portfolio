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
import React from "react";

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

// Service Card Component
const ServiceCard = ({ title, link }: { title: string; link: string }) => {
  return (
    <div className="border rounded-lg shadow-lg p-6 mb-4 bg-white hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Detailed description about {title}.</p>
      <Link href={link}>
        <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2">Learn More</button>
      </Link>
    </div>
  );
};

// Services Section Component
const ServicesSection = () => {
  const services = [
    { title: "IT Consultancy and Solutions", link: "https://sites.google.com/view/ro-noc/doradztwo-it" },
    { title: "Infrastructure and Cloud Management", link: "https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych" },
    { title: "Cybersecurity", link: "https://sites.google.com/view/ro-noc/cyberbezpiecze%C5%84stwo" },
    { title: "Project Leadership", link: "https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service, index) => (
        <ServiceCard key={index} title={service.title} link={service.link} />
      ))}
    </div>
  );
};

// Main Component
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rssFeedItems, setRssFeedItems] = useState<FeedSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Fetch Data from APIs
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
            shape: { type: ["circle", "square", "triangle"] },
            size: { value: { min: 1, max: 10 } },
          },
          detectRetina: true,
        }}
      />
      <Container>
        {/* Navbar */}
        <nav className="flex justify-between items-center w-full mb-16 z-10">
          <div className="flex items-center">
            <Image src="https://imgur.com/XzVeiIb" alt="RO-NOC Logo" width={90} height={90} />
            <h1 className="text-4xl font-bold ml-4 glow-text">RO-NOC</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-300">Home</Link>
            <Link href="#about" className="hover:text-gray-300">About</Link>
            <Link href="#services" className="hover:text-gray-300">Services</Link>
            <Link href="#news" className="hover:text-gray-300">Cybersecurity News</Link>
            <Link href="#search" className="hover:text-gray-300">Search</Link>
            <Link href="https://sites.google.com/view/ro-noc/kontakt" className="hover:text-gray-300">Contact</Link>
            <Link href="#repositories" className="hover:text-gray-300">Repositories</Link>
            <Link href="https://sites.google.com/view/ro-noc/faq" className="hover:text-gray-300">FAQ</Link>
          </div>
        </nav>

        {/* Error Handling */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <>
            {/* Profile Section */}
            <section className="text-center mb-16" id="profile">
              <h2 className="text-4xl font-bold mb-4">Roman Orlowski</h2>
              <p className="text-xl mb-4">
                If you seek a skilled professional capable of seamlessly aligning and integrating diverse projects into your existing infrastructure, please feel free to reach out.
              </p>
              <p className="text-lg mb-4">Strengths include:</p>
              <ServicesSection />
            </section>

            {/* About Me Section */}
            <section id="about" className="text-center mb-16">
              <h3 className="text-4xl font-semibold mb-4">About Me</h3>
              <p className="text-lg mb-4">I specialize in cloud technology and cyber security. Based in London, UK, with 15+ years of experience, I bring substantial expertise across various technical domains.</p>
            </section>

            {/* GitHub Repositories Section */}
            <section id="repositories" className="text-center mb-16">
              <h3 className="text-3xl font-bold mb-4">GitHub Repositories</h3>
              <form onSubmit={handleSearch} className="mb-6">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search repositories..."
                  className="w-full p-2 text-black"
                />
                <Button className="mt-2">Search</Button>
              </form>

              {filteredRepositories.length === 0 ? (
                <p>No repositories found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRepositories.map((repo) => (
                    <div key={repo.id} className="border rounded-lg p-4">
                      <h4 className="text-xl font-bold">{repo.name}</h4>
                      <p className="text-gray-600">Stars: {repo.stargazers_count}</p>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Repository</a>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* RSS Feeds Section */}
            <section id="news" className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4">Cybersecurity News</h3>
              {rssFeedItems.map((feed, index) => (
                <div key={index} className="mb-8">
                  <h4 className="text-2xl font-semibold mb-4">{feed.source}</h4>
                  <ul>
                    {feed.items.map((item, idx) => (
                      <li key={idx} className="mb-2">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Footer */}
            <footer className="flex justify-center space-x-6 text-white mt-12">
              <a href="https://github.com/ronoc2020" target="_blank" rel="noopener noreferrer">
                <Github />
              </a>
              <a href="https://www.linkedin.com/in/ro-noc-182714306/" target="_blank" rel="noopener noreferrer">
                <Linkedin />
              </a>
              <a href="https://www.youtube.com/@RO-NOC" target="_blank" rel="noopener noreferrer">
                <Youtube />
              </a>
              <a href="https://x.com/noc_ro" target="_blank" rel="noopener noreferrer">
                <Twitter />
              </a>
              <a href="https://www.twitch.tv/ro_noc2020" target="_blank" rel="noopener noreferrer">
                <Twitch />
              </a>
            </footer>
          </>
        )}
      </Container>
    </main>
  );
};

export default Home;
