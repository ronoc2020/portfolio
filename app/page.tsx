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

// Typy
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

// Źródła RSS
const rssSources: FeedSource[] = [
  { source: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews?format=xml", items: [] },
  { source: "Dark Reading", url: "https://www.darkreading.com/rss/all.xml", items: [] },
  { source: "InfoSecurity Magazine", url: "https://www.infosecurity-magazine.com/rss/news/", items: [] },
];

// Komponent karty usług
const ServiceCard = ({ title }) => {
  return (
    <div className="border rounded-lg shadow-lg p-6 mb-4 bg-white hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Detailed description about {title}.</p>
      <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2">Learn More</button>
    </div>
  );
};

// Sekcja usług
const ServicesSection = () => {
  const services = [
    { title: 'IT Consultancy and Solutions', link: 'https://sites.google.com/view/ro-noc/doradztwo-it' },
    { title: 'Infrastructure Management', link: 'https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85' },
    { title: 'Cloud Solutions Implementation', link: 'https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych' },
    { title: 'Cybersecurity', link: 'https://sites.google.com/view/ro-noc/cyberbezpiecze%C5%84stwo' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service, index) => (
        <Link key={index} href={service.link} passHref>
          <ServiceCard title={service.title} />
        </Link>
      ))}
    </div>
  );
};

// Główny komponent
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

  // Pobieranie danych z API
  const fetchData = async () => {
    const parser = new Parser();
    setError(null);
    setLoading(true);

    try {
      // Pobieranie źródeł RSS
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

      // Pobieranie repozytoriów GitHub
      const response = await fetch("https://api.github.com/users/ronoc2020/repos");
      if (!response.ok) throw new Error("Failed to fetch repositories");

      const data: Repository[] = await response.json();
      setRepositories(data);
      setFilteredRepositories(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Obsługa wyszukiwania
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = repositories.filter(repo =>
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
              type: ["circle", "square", "triangle"] 
            },
            size: { value: { min: 1, max: 10 } },
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
            <Link href="https://sites.google.com/view/ro-noc/kontakt" className="hover:text-gray-300">Contact</Link>
            <Link href="#repositories" className="hover:text-gray-300">Repositories</Link>
            <Link href="https://sites.google.com/view/ro-noc/faq" className="hover:text-gray-300">FAQ</Link>
          </div>
        </nav>

        {/* Obsługa błędów */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Wskaźnik ładowania */}
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <>
            {/* Sekcja profilu */}
            <section className="text-center mb-16" id="profile">
              <h2 className="text-4xl font-bold mb-4">Roman Orlowski</h2>
              <p className="text-xl mb-4">If you seek a skilled professional capable of seamlessly aligning and integrating diverse projects into your existing infrastructure, please feel free to reach out.</p>
              <p className="text-lg mb-4">Strengths include:</p>
            </section>

            {/* Sekcja usług */}
            <section id="services" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <ServicesSection />
            </section>

            {/* Sekcja o mnie */}
            <section id="about" className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4">About Me</h3>
              <p className="text-xl mb-4">I am well-organized and showcase over 15 years of IT experience, particularly in support, security, and cloud management.</p>
              <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2">Read more about me</button>
            </section>

            {/* Sekcja wiadomości o cyberbezpieczeństwie */}
            <section id="news" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Cybersecurity News</h2>
              {rssFeedItems.map(({ source, items }) => (
                <div key={source} className="mb-4">
                  <h3 className="text-2xl font-semibold">{source}</h3>
                  {items.map((item, index) => (
                    <div key={index} className="mb-2">
                      <a href={item.link} className="text-blue-500 hover:underline">{item.title}</a>
                    </div>
                  ))}
                </div>
              ))}
            </section>

            {/* Sekcja wyszukiwania repozytoriów */}
            <section id="search" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Search Repositories</h2>
              <form onSubmit={handleSearch} className="flex mb-4">
                <Input
                  type="text"
                  placeholder="Search by repository name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2"
                />
                <Button type="submit">Search</Button>
              </form>

              {/* Lista repozytoriów */}
              {filteredRepositories.length === 0 && searchQuery && (
                <div>No repositories found for "{searchQuery}".</div>
              )}
              <ul>
                {filteredRepositories.map((repo) => (
                  <li key={repo.id} className="mb-2">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {repo.name} - ⭐ {repo.stargazers_count}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Sekcja kontaktu */}
            <section id="contact" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
              <p className="text-lg mb-4">Feel free to reach out for any queries or collaborations.</p>
              <div className="flex justify-center space-x-4 mb-6">
                <Link href="https://github.com/ronoc2020" target="_blank"><Github className="w-6 h-6 text-gray-600 hover:text-gray-800" /></Link>
                <Link href="https://www.linkedin.com/in/ro-noc-182714306/" target="_blank"><Linkedin className="w-6 h-6 text-gray-600 hover:text-gray-800" /></Link>
                <Link href="https://www.youtube.com/@RO-NOC" target="_blank"><Youtube className="w-6 h-6 text-gray-600 hover:text-gray-800" /></Link>
                <Link href="https://x.com/noc_ro" target="_blank"><Twitter className="w-6 h-6 text-gray-600 hover:text-gray-800" /></Link>
                <Link href="https://www.twitch.tv/ro_noc2020" target="_blank"><Twitch className="w-6 h-6 text-gray-600 hover:text-gray-800" /></Link>
              </div>
              <h3 className="text-2xl font-bold mb-2">My Websites</h3>
              <ul className="list-disc list-inside mb-4 text-lg">
                <li><Link href="https://sites.google.com/view/ro-noc/strona-główna" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">Home</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/o-mnie" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">About Me</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/doradztwo-it" target="_blank" className="text-gray-600 hover:text-gray-800">IT Consulting</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">Cloud Solutions Implementation</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">Network Infrastructure Monitoring and Management</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/cyberbezpieczeństwo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">Cybersecurity</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/faq" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">FAQ</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/kontakt" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">Contact</Link></li>
                <li><Link href="https://sites.google.com/view/ro-noc/kontakt/polityka-prywatności" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link></li>
              </ul>
            </section>
          </>
        )}
      </Container>
    </main>
  );
};

export default Home;
