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
import React from 'react';

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
const ServiceCard = ({ title }) => {
  return (
    <div className="border rounded-lg shadow-lg p-6 mb-4 bg-white hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Detailed description about {title}.</p>
      <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
        Learn More
      </button>
    </div>
  );
};

// Services Section Component
const ServicesSection = () => {
  const services = [
    'IT Consultancy and Solutions',
    'Infrastructure Management',
    'Cybersecurity',
    'Project Leadership',
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service, index) => (
        <ServiceCard key={index} title={service} />
      ))}
    </div>
  );
};

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
            <Image src="https://imgur.com/XzVeiIb" alt="RO-NOC Logo" width={90} height={90} />
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
              <p className="text-xl mb-4">If you seek a skilled professional capable of seamlessly aligning and integrating diverse projects into your existing infrastructure, please feel free to reach out.</p>
              <p className="text-lg mb-4">Strengths include:</p>
              <ul className="list-disc list-inside mb-4">
                <li>IT Infrastructure Management</li>
                <li>Cybersecurity Solutions</li>
                <li>Cloud Services</li>
                <li>Project Leadership</li>
              </ul>
            </section>

            {/* Services Section */}
            <section id="services" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <ServicesSection />
            </section>

            {/* About Me Section */}
            <section id="about" className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4">About Me</h3>
              <p className="text-xl mb-4">
                I am well-organized and showcase over 15 years of IT experience, particularly in support, security, and cloud management.
                My strengths lie in infrastructure, cybersecurity, and project leadership. Key highlights include my roles at
                LTI MindTree Ltd as a Senior Engineer and Intellias as a Support Engineer, where I enhanced project efficiency
                and reliability.
              </p>
            </section>

            {/* News Section */}
            <section id="news" className="mb-16">
              <h3 className="text-4xl font-bold mb-4">Cybersecurity News</h3>
              {rssFeedItems.map((feed) => (
                <div key={feed.source} className="mb-4">
                  <h4 className="text-2xl font-semibold mb-2">{feed.source}</h4>
                  {feed.items.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {feed.items.map((item) => (
                        <li key={item.link} className="mb-2">
                          <a href={item.link} className="text-blue-500 hover:underline">{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No news available.</p>
                  )}
                </div>
              ))}
            </section>

            {/* Search Section */}
            <section id="search" className="mb-16">
              <h3 className="text-4xl font-bold mb-4">Search Repositories</h3>
              <form onSubmit={handleSearch} className="flex items-center mb-4">
                <Input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2"
                />
                <Button type="submit" className="bg-blue-500 text-white">
                  <Search size={20} />
                </Button>
              </form>
              <ul className="list-disc list-inside">
                {filteredRepositories.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} className="text-blue-500 hover:underline">
                      {repo.name} - ⭐{repo.stargazers_count}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Repositories Section */}
            <section id="repositories" className="mb-16">
              <h3 className="text-4xl font-bold mb-4">My GitHub Repositories</h3>
              <ul className="list-disc list-inside">
                {repositories.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} className="text-blue-500 hover:underline">
                      {repo.name} - ⭐{repo.stargazers_count}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact Section */}
            <section id="contact" className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4">Contact Me</h3>
              <p className="text-lg mb-4">Feel free to reach out via social media:</p>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/ronoc2020?tab=repositories" target="_blank" rel="noopener noreferrer">
                  <Github size={40} />
                </a>
                <a href="https://www.linkedin.com/in/ro-noc-182714306/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={40} />
                </a>
                <a href="https://www.youtube.com/@RO-NOC" target="_blank" rel="noopener noreferrer">
                  <Youtube size={40} />
                </a>
                <a href="https://x.com/noc_ro" target="_blank" rel="noopener noreferrer">
                  <Twitter size={40} />
                </a>
                <a href="https://www.twitch.tv/ro_noc2020" target="_blank" rel="noopener noreferrer">
                  <Twitch size={40} />
                </a>
              </div>
            </section>
          </>
        )}
      </Container>
    </main>
  );
};

export default Home;
