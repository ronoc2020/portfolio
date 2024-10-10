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
import Parser from 'rss-parser'; // Importing the RSS parser

type FeedItem = {
  title: string;
  link: string;
};

// Grouped by source name
type FeedSource = {
  source: string;
  items: FeedItem[];
};

const rssSources: FeedSource[] = [
  { source: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews?format=xml' },
  { source: 'Dark Reading', url: 'https://www.darkreading.com/rss/all.xml' },
  { source: 'InfoSecurity Magazine', url: 'https://www.infosecurity-magazine.com/rss/news/' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rssFeedItems, setRssFeedItems] = useState<FeedSource[]>([]);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const fetchRssFeeds = async () => {
    const parser = new Parser();
    const feeds: FeedSource[] = rssSources.map(source => ({ source: source.source, items: [] }));

    try {
      for (const { url, source } of rssSources) {
        const feed = await parser.parseURL(url);
        const items = feed.items.slice(0, 3).map(item => ({
          title: item.title,
          link: item.link,
        }));
        const feedIndex = feeds.findIndex(feed => feed.source === source);
        if (feedIndex > -1) {
          feeds[feedIndex].items = items;
        }
      }
      setRssFeedItems(feeds);
    } catch (error) {
      console.error("Error fetching RSS feeds:", error);
    }
  };

  useEffect(() => {
    fetchRssFeeds();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

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
            <Link href="#services" className="hover-text">Services</Link>
            <Link href="#news" className="hover-text">Cybersecurity News</Link>
            <Link href="#search" className="hover-text">Search</Link>
            <Link href="#contact" className="hover-text">Contact</Link>
          </div>
        </nav>

        <section className="text-center mb-16" id="intro">
          <h2 className="text-5xl font-bold mb-4 animate-glow">24/7 Network Management</h2>
          <p className="text-xl mb-8">Ensuring stability and security for your IT infrastructure.</p>
          <p className="text-2xl font-semibold">Tel: +48 695295641</p>
        </section>

        <section id="services" className="mb-16">
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

        <section id="news" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Latest Cybersecurity News</h3>
          {rssFeedItems.length ? (
            rssFeedItems.map((feed, feedIndex) => (
              <div key={feedIndex} className="mb-8">
                <h4 className="text-2xl font-bold mb-2">{feed.source}</h4>
                <ul className="space-y-4">
                  {feed.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="hover-card">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-gray-400">Loading news...</div>
          )}
        </section>

        <section id="search" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Search Our Repos</h3>
          <form onSubmit={handleSearch} className="flex space-x-4">
            <Input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </section>

        <footer id="contact" className="text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="https://github.com/ronoc2020?tab=repositories" target="_blank" aria-label="GitHub">
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
          <p>© 2040 RO-NOC. All rights reserved.</p>
        </footer>
      </Container>

      <div className="lightsaber lightsaber-1"></div>
      <div className="lightsaber lightsaber-2"></div>
    </main>
  );
}
