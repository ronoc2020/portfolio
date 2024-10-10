"use client";

import { useCallback, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Parser from "rss-parser";

// Feed Item and Source Types
type FeedItem = {
  title: string;
  link: string;
};

type FeedSource = {
  source: string;
  url: string;
  items: FeedItem[];
};

// RSS Feeds
const rssSources: FeedSource[] = [
  { source: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews?format=xml", items: [] },
  { source: "Dark Reading", url: "https://www.darkreading.com/rss/all.xml", items: [] },
  { source: "InfoSecurity Magazine", url: "https://www.infosecurity-magazine.com/rss/news/", items: [] },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rssFeedItems, setRssFeedItems] = useState<FeedSource[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  // State for contact form
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Fetch RSS Feeds
  const fetchRssFeeds = async () => {
    const parser = new Parser();
    const feeds: FeedSource[] = rssSources.map((source) => ({
      source: source.source,
      url: source.url,
      items: [],
    }));

    try {
      for (const { url, source } of rssSources) {
        const feed = await parser.parseURL(url);
        const items = feed.items
          .slice(0, 3)
          .map((item) => (item.title && item.link ? { title: item.title, link: item.link } : null))
          .filter((item): item is FeedItem => item !== null);

        const feedIndex = feeds.findIndex((feed) => feed.source === source);
        if (feedIndex > -1) {
          feeds[feedIndex].items = items;
        }
      }
      setRssFeedItems(feeds);
    } catch (error) {
      console.error("Error fetching RSS feeds:", error);
      setFormError("Failed to load news feeds.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchRssFeeds();
  }, []);

  // Handle Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
    }
  };

  // Handle Contact Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setFormError("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    console.log("Contact Form Data:", formData);
    // Simulate submission
    setFormData({ name: "", email: "", message: "" });
    setFormError("");
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
              enable: true,
              speed: 4,
              direction: "none",
              outModes: { default: "bounce" },
            },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />

      {/* Header Section */}
      <Container>
        <nav className="flex justify-between items-center w-full mb-16">
          <div className="flex items-center">
            <Image src="/logo.png" alt="RO-NOC Logo" width={50} height={50} />
            <h1 className="text-4xl font-bold ml-4 glow-text">RO-NOC</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="#services" className="hover:text-gray-300">Services</Link>
            <Link href="#news" className="hover:text-gray-300">Cybersecurity News</Link>
            <Link href="#search" className="hover:text-gray-300">Search</Link>
            <Link href="#contact" className="hover:text-gray-300">Contact</Link>
          </div>
        </nav>

        {/* Intro Section */}
        <section className="text-center mb-16" id="intro">
          <h2 className="text-5xl font-bold mb-4 animate-glow">24/7 Network Management</h2>
          <p className="text-xl mb-8">Ensuring stability and security for your IT infrastructure.</p>
          <a href="mailto:ronoc2020@gmail.com?subject=Report an Issue&body=Description of the issue...">
            <Button className="bg-red-600 text-white hover:bg-red-800">Report Issue</Button>
          </a>
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
          <ul className="list-disc list-inside mb-4">
            <li>Educational Background</li>
            <li>Technical Skills: Azure, AWS</li>
            <li>Certifications</li>
            <li>Soft Skills: Teamwork, Adaptability</li>
            <li>Multilingual: Polish, English, German</li>
            <li>Personal Interests</li>
          </ul>
          <p className="text-xl">
            I am committed to professional development and community support.
          </p>
        </section>

        {/* RSS News Section */}
        <section id="news" className="mb-16">
          <h3 className="text-4xl font-bold mb-6">Cybersecurity News</h3>
          {loading ? (
            <p>Loading news feeds...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rssFeedItems.map((feed) => (
                <div key={feed.source} className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-2xl mb-4">{feed.source}</h4>
                  <ul>
                    {feed.items.map((item, index) => (
                      <li key={index} className="mb-2">
                        <a href={item.link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
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

        {/* Search Section */}
        <section id="search" className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">Search</h3>
          <form onSubmit={handleSearch} className="flex justify-center mb-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Button type="submit">Search</Button>
          </form>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">Contact Me</h3>
          <form onSubmit={handleContactSubmit} className="flex flex-col items-center">
            {formError && <p className="text-red-500">{formError}</p>}
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="mb-2"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="mb-2 p-2 w-80 h-32"
            />
            <Button type="submit">Send Message</Button>
          </form>
        </section>
      </Container>

      <footer className="py-6 bg-gray-900 w-full">
        <Container>
          <p className="text-center">© 2024 RO-NOC. All rights reserved.</p>
        </Container>
      </footer>
    </main>
  );
}
