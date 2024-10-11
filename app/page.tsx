"use client";

import { useCallback, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Youtube, Twitter, Twitch } from "lucide-react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";
import Image from "next/image";

// Type Definitions
type Repository = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
};

// Service Card Component
const ServiceCard = ({ title }: { title: string }) => (
  <div className="border rounded-lg shadow-lg p-6 mb-4 bg-white hover:shadow-xl transition-shadow transform hover:-translate-y-1">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-600">Detailed description about {title}.</p>
    <Link href="#" className="mt-4 bg-blue-500 text-white rounded px-4 py-2">Learn More</Link>
  </div>
);

// Services Section Component
const ServicesSection = () => {
  const services = [
    "IT Solutions and Services",
    "Cloud Solutions Implementation",
    "Network / Infrastructure Monitoring and Management",
    "Cybersecurity",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard key={service} title={service} />
      ))}
    </div>
  );
};

// Main Component
const Home = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiToken = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN || ""; 

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Fetch GitHub Repositories
  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.github.com/users/ronoc2020/repos", {
        headers: {
          Authorization: `token ${apiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
      }

      const data: Repository[] = await response.json();
      setRepositories(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setError(message);
      console.error("Error fetching repositories:", message);
    } finally {
      setLoading(false);
    }
  };

  // Effect for fetching repositories on mount
  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-purple-900 to-black relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" }},
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
        {/* Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-4 glow-text">Welcome to RO-NOC</h1>
          <p className="text-lg mb-6">Your trusted partner in IT solutions and consulting.</p>
          <Link href="#services" className="bg-blue-500 text-white rounded px-4 py-2">Explore Services</Link>
        </section>

        {/* Navigation */}
        <nav className="flex justify-between items-center w-full mb-16 z-10">
          <div className="flex items-center">
            <Image src="https://imgur.com/XzVeiIb" alt="RO-NOC Logo" width={90} height={90} />
            <h1 className="text-4xl font-bold ml-4 glow-text">RO-NOC</h1>
          </div>
          <div className="flex space-x-4 relative">
            <Link href="#" className="hover:text-gray-300">Home</Link>
            <Link href="#about" className="hover:text-gray-300">About Me</Link>
            <div className="relative group">
              <Link href="#services" className="hover:text-gray-300">Services</Link>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <ul className="py-2">
                  {[ // Dynamic Dropdown
                    { name: "IT Solutions and Services", url: "https://sites.google.com/view/ro-noc/doradztwo-it" },
                    { name: "Cloud Solutions Implementation", url: "https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych" },
                    { name: "Network / Infrastructure Monitoring and Management", url: "https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85" },
                    { name: "Cybersecurity", url: "https://sites.google.com/view/ro-noc/cyberbezpiecze%C5%84stwo" }
                  ].map(({ name, url }) => (
                    <li key={name}>
                      <Link href={url} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">{name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
              <h2 className="text-4xl font-bold mb-4">Roman Orlowski - Network Operation Center</h2>
              <p className="text-xl mb-4">If you seek a skilled professional capable of seamlessly aligning diverse projects, please reach out.</p>
            </section>

            {/* Services Section */}
            <section id="services" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <ServicesSection />
            </section>

            {/* About Me Section */}
            <section id="about" className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4">About Me</h3>
              <p className="text-xl mb-4">I am an experienced IT engineer with many years of experience in the field of network management and cybersecurity. I specialize in creating and implementing modern cloud solutions and securing IT infrastructure. Thanks to my knowledge and experience, I support companies in optimizing IT processes while ensuring the highest level of data security.</p>
              <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                <Link href="https://sites.google.com/view/ro-noc/o-mnie" target="_blank">Read more about me</Link>
              </button>
            </section>

            {/* Repositories List Section */}
            <section id="repositories" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">My GitHub Repositories</h2>

              {repositories.length === 0 ? (
                <div>No repositories available.</div>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repositories.map(repo => (
                    <li key={repo.id} className="mb-2">
                      <div className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold">{repo.name}</h3>
                        <p className="text-gray-600">⭐ {repo.stargazers_count}</p>
                        <div className="tooltip mt-4">
                          <Link
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors block text-center"
                          >
                            View Repository
                          </Link>
                          <span className="tooltip-text">Go to repository on GitHub</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Report an Incident</h2>
              <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                <Link href="https://sites.google.com/view/ro-noc/zg%C5%82o%C5%9B-problem?authuser=0" target="_blank">Report</Link>
              </button>

              {/* Button to Report Issue */}
              <Link href="https://sites.google.com/view/ro-noc/zg%C5%82o%C5%9B-problem" className="mt-4 bg-red-500 text-white rounded px-4 py-2">Report Issue</Link>

              <div className="flex justify-center space-x-4 mb-6">
                {[
                  { href: "https://github.com/ronoc2020", icon: <Github className="w-6 h-6 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://www.linkedin.com/in/ro-noc-182714306/", icon: <Linkedin className="w-6 h-6 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://www.youtube.com/@RO-NOC", icon: <Youtube className="w-6 h-6 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://x.com/noc_ro", icon: <Twitter className="w-6 h-6 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://www.twitch.tv/ro_noc2020", icon: <Twitch className="w-6 h-6 text-gray-600 hover:text-gray-800" /> },
                ].map(({ href, icon }) => (
                  <Link key={href} href={href} target="_blank" rel="noopener noreferrer">
                    {icon}
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </Container>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-white p-4">
        <div className="text-center">
          <h3 className="text-xl mb-2">Stay Updated</h3>
          <div className="flex justify-center space-x-4">
            {[
              { name: "The Hacker News RSS", url: "https://feeds.feedburner.com/TheHackersNews?format=xml" },
              { name: "Dark Reading RSS", url: "https://www.darkreading.com/rss/all.xml" },
              { name: "Infosecurity Magazine RSS", url: "https://www.infosecurity-magazine.com/rss/news/" },
              { name: "GitHub Repositories", url: "https://github.com/ronoc2020?tab=repositories" },
            ].map(({ name, url }) => (
              <Link key={name} href={url} target="_blank" className="hover:text-gray-400">{name}</Link>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
};

export default Home;
