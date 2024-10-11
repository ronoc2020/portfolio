"use client";

import { useCallback, useState } from "react";
import { Container } from "@/components/ui/container";
import { Github, Linkedin, Youtube, Twitter, Twitch } from "lucide-react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";
import Image from "next/image";

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
const ResumeCard = () => {
  return (
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
};

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

// RSS Feeds Section
const RssSection = () => {
  const rssFeeds = [
    { title: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews?format=xml" },
    { title: "Dark Reading", url: "https://www.darkreading.com/rss/all.xml" },
    { title: "Infosecurity Magazine", url: "https://www.infosecurity-magazine.com/rss/news/" },
    { title: "GitHub Repositories", url: "https://github.com/ronoc2020?tab=repositories" },
  ];

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">RSS Feeds</h2>
      <ul className="list-disc list-inside text-gray-300">
        {rssFeeds.map((feed, index) => (
          <li key={index}>
            <Link href={feed.url} className="text-cyan-400 hover:underline">{feed.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-50 p-4 text-center text-gray-300 rounded-t-lg shadow-lg">
      <p>&copy; {new Date().getFullYear()} Your Name. All Rights Reserved.</p>
      <div className="flex justify-center space-x-4">
        <Link href="https://github.com/ronoc2020" className="text-gray-400 hover:text-white">
          <Github className="w-6 h-6" />
        </Link>
        <Link href="https://www.linkedin.com/in/ro-noc-182714306/" className="text-gray-400 hover:text-white">
          <Linkedin className="w-6 h-6" />
        </Link>
        <Link href="https://www.youtube.com/@RO-NOC" className="text-gray-400 hover:text-white">
          <Youtube className="w-6 h-6" />
        </Link>
        <Link href="https://www.twitch.tv/ro_noc2020" className="text-gray-400 hover:text-white">
          <Twitch className="w-6 h-6" />
        </Link>
        <Link href="https://x.com/noc_ro" className="text-gray-400 hover:text-white">
          <Twitter className="w-6 h-6" />
        </Link>
      </div>
    </footer>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <aside className="w-60 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link href="https://sites.google.com/view/ro-noc/doradztwo-it" className="hover:underline">Services</Link>
        </li>
        <li>
          <Link href="https://sites.google.com/view/ro-noc/curriculum-vitae" className="hover:underline">CV</Link>
        </li>
        <li>
          <Link href="#rss" className="hover:underline">RSS Feeds</Link>
        </li>
      </ul>
    </aside>
  );
};

// Main Component
const Home = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 bg-gradient-to-br from-purple-800 to-black relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" }},
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 }},
            size: { value: 3 },
            move: { direction: "none", speed: 1, random: false, straight: false, out_mode: "out" },
            opacity: { value: 0.5, anim: { enable: false }},
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 }},
              bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
        }}
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center w-full p-4 bg-opacity-50 bg-black rounded-b-lg shadow-lg">
        <div className="flex items-center">
          <div className="w-24 h-24 border-4 border-white rounded-full overflow-hidden">
            <Image src="https://imgur.com/XzVeiIb" alt="Logo" width={96} height={96} className="object-cover" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Link href="https://x.com/noc_ro" className="text-gray-400 hover:text-white">
            <Twitter className="w-8 h-8" />
          </Link>
          <Link href="https://www.linkedin.com/in/ro-noc-182714306/" className="text-gray-400 hover:text-white">
            <Linkedin className="w-8 h-8" />
          </Link>
          <Link href="https://www.youtube.com/@RO-NOC" className="text-gray-400 hover:text-white">
            <Youtube className="w-8 h-8" />
          </Link>
          <Link href="https://www.twitch.tv/ro_noc2020" className="text-gray-400 hover:text-white">
            <Twitch className="w-8 h-8" />
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-6xl font-bold mb-4 text-white neon-glow">Welcome to My Portfolio</h2>
        <p className="text-lg text-gray-300 mb-8">Explore my services and get to know me better!</p>

        <ResumeCard />
        <ServicesSection />
        <RssSection />
      </div>

      {/* Footer Component */}
      <Footer />
    </main>
  );
};

export default Home;
