"use client";

import { useCallback, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
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
const ServiceCard = ({ title, url, description }: { title: string; url: string; description: string }) => (
  <div className="border border-transparent rounded-xl shadow-lg p-6 mb-4 bg-opacity-40 bg-black hover:bg-opacity-60 backdrop-filter backdrop-blur-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
    <Link href={url} className="block">
      <h3 className="text-lg font-semibold text-white neon-glow">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </Link>
  </div>
);

// Resume Card Component
const ResumeCard = () => (
  <div className="border border-transparent rounded-xl shadow-lg p-6 mb-4 bg-opacity-40 bg-black hover:bg-opacity-60 backdrop-filter backdrop-blur-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
    <Link href="https://sites.google.com/view/ro-noc/curriculum-vitae" className="block mb-4">
      <h3 className="text-lg font-semibold text-white neon-glow">Curriculum Vitae</h3>
    </Link>
    <h4 className="text-md font-semibold text-cyan-400 mb-4">About Me</h4>
    <p className="text-gray-300">
      Father of two, confident and self-taught IT professional with over 15 years of experience in infrastructure, customer management, support, networking, cloud solutions, and cybersecurity.
    </p>
    <h4 className="text-md font-semibold text-cyan-400 mt-2 mb-4">Work Experience</h4>
    <ul className="list-disc list-inside text-gray-300">
      <li>LTI MindTree Ltd - Senior Engineer for Cloud and Infra (June 2023 – February 2024)</li>
      <li>Intellias - Support Engineer (January 2022 – April 2023)</li>
      <li>Sperasoft - NOC Engineer (July 2020 – October 2020)</li>
      <li>Grand Parade, William Hill - Production Operations Analyst (August 2019 – March 2020)</li>
    </ul>
    <h4 className="text-md font-semibold text-cyan-400 mt-2 mb-4">Certifications & Trainings</h4>
    <p className="text-gray-300">SEP Authorization, MDF Accreditation, Crane Operations, Driving License (cat. D), ISO 9001:2015.</p>
    <p className="text-gray-300">CCNA, HCNA-HNTD, AZ-900, AZ-104, AZ-500, L100, L200.</p>
  </div>
);

// Services Section Component
const ServicesSection = () => {
  const services = [
    { 
      title: "IT Solutions and Services", 
      url: "https://sites.google.com/view/ro-noc/doradztwo-it",
      description: "Comprehensive consulting in planning and implementing IT strategies to help your business achieve its goals."
    },
    { 
      title: "Implementation of Cloud Solutions", 
      url: "https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych", 
      description: "Specializing in migrating and implementing cloud solutions, adapting them to your company's needs."
    },
    { 
      title: "Network/Infrastructure Monitoring and Management", 
      url: "https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85", 
      description: "Monitoring IT infrastructure to ensure its continuity and quick response to problems."
    },
    { 
      title: "Cybersecurity", 
      url: "https://sites.google.com/view/ro-noc/cyberbezpiecze%C5%84stwo", 
      description: "Services in IT infrastructure protection, including EDR tools, threat management, and security policy implementation."
    },
  ];

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">My Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

// Settings Component
const Settings = () => {
  const [bgVideo, setBgVideo] = useState(false);
  const [transparency, setTransparency] = useState(0.5);

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-white">
        Enable Background Video
        <input type="checkbox" checked={bgVideo} onChange={() => setBgVideo(!bgVideo)} className="ml-2" />
      </label>
      <label className="text-white">
        Background Transparency
        <input type="range" min="0" max="1" step="0.1" value={transparency} onChange={(e) => setTransparency(e.target.value)} />
      </label>
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

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 bg-gradient-to-br from-purple-800 to-black relative overflow-hidden">
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
            color: { value: "#00ff00" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.6,
              width: 2,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              speed: 5,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 100 },
            opacity: { value: 0.5 },
            shape: { type: ["circle", "star"] },
            size: { value: { min: 1, max: 8 } },
          },
          detectRetina: true,
        }}
      />

      <Container>
        {/* Navigation */}
        <nav className="flex justify-between items-center w-full mb-16 z-10 p-6 bg-opacity-70 backdrop-filter backdrop-blur-xl shadow-lg rounded-lg">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full border-4 border-cyan-500 overflow-hidden">
              <Image
                src="https://imgur.com/XzVeiIb.gif" 
                alt="RO-NOC Logo"
                width={90}
                height={90}
                className="object-cover" 
              />
            </div>
            <h1 className="text-5xl font-bold ml-4 text-white neon-glow">Roman Orzechowski</h1>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <Link href="https://github.com/ronoc2020" className="text-gray-400 hover:text-white">
              <Github className="w-8 h-8" />
            </Link>
            <Link href="https://www.linkedin.com/in/roman-orzechowski" className="text-gray-400 hover:text-white">
              <Linkedin className="w-8 h-8" />
            </Link>
            <Link href="https://twitter.com/RomanOrzechowsk" className="text-gray-400 hover:text-white">
              <Twitter className="w-8 h-8" />
            </Link>
            <Link href="https://www.twitch.tv/ronoc2020" className="text-gray-400 hover:text-white">
              <Twitch className="w-8 h-8" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCcAY1mjtdhRjxzYO9HTlhFg" className="text-gray-400 hover:text-white">
              <Youtube className="w-8 h-8" />
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white neon-glow mb-6">Welcome to my world!</h2>
          <p className="text-xl text-gray-200 mb-8">
            As an experienced IT professional with diverse skills, I'm here to help your business grow and secure your IT infrastructure.
          </p>
        </div>

        {/* Services */}
        <ServicesSection />

        {/* Settings */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white neon-glow mb-6">Personalize your Experience</h2>
          <Settings />
        </section>
      </Container>

      {/* GitHub Repositories Section */}
      <section className="p-8 mt-16 bg-gradient-to-tr from-black to-purple-900 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-white neon-glow mb-6">My GitHub Repositories</h2>

        {loading ? (
          <p className="text-gray-400">Loading repositories...</p>
        ) : error ? (
          <p className="text-red-500">Error fetching repositories: {error}</p>
        ) : repositories.length > 0 ? (
          <ul className="space-y-4">
            {repositories.map((repo) => (
              <li key={repo.id}>
                <Link href={repo.html_url} className="text-cyan-400 hover:underline">
                  {repo.name} ({repo.stargazers_count} stars)
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No repositories found.</p>
        )}
      </section>
    </main>
  );
};

export default Home;
