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
  <div className="border rounded-lg shadow-lg p-6 mb-4 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-shadow transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
    <Link href={url} className="block">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  </div>
);

// Resume Card Component
const ResumeCard = () => (
  <div className="border rounded-lg shadow-lg p-6 mb-4 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-shadow transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
    <Link href="https://sites.google.com/view/ro-noc/curriculum-vitae" className="block mb-4">
      <h3 className="text-lg font-semibold">Curriculum Vitae</h3>
    </Link>
    <div className="mt-4 text-gray-700">
      <h4 className="text-md font-semibold mb-4">About Me</h4>
      <p>
        Father of two, confident and self-taught IT professional with over 15 years of experience in infrastructure, customer management, support, networking, cloud solutions, and cybersecurity.
      </p>
      {/* Education and Experience */}
      <h4 className="text-md font-semibold mt-2 mb-4">Work Experience</h4>
      <ul className="list-disc list-inside">
        <li>LTI MindTree Ltd - Senior Engineer for Cloud and Infra (June 2023 – February 2024)</li>
        <li>Intellias - Support Engineer (January 2022 – April 2023)</li>
        <li>Sperasoft - NOC Engineer (July 2020 – October 2020)</li>
        <li>Grand Parade, William Hill - Production Operations Analyst (August 2019 – March 2020)</li>
      </ul>
      {/* Skills and Other Info */}
      <h4 className="text-md font-semibold mt-2 mb-4">Certifications & Trainings</h4>
      <p>SEP Authorization, MDF Accreditation, Crane Operations, Driving License (cat. D), ISO 9001:2015.</p>
      <p>CCNA, HCNA-HNTD, AZ-900, AZ-104, AZ-500, L100, L200.</p>

      {/* Technical Skills */}
      <h4 className="text-md font-semibold mt-2 mb-4">Technical Skills</h4>
      <ul className="list-disc list-inside">
        <li>Cloud Services: Azure, AWS, GCP.</li>
        <li>Security Tools: Azure Defender, Endpoint Protection, DarkTrace.</li>
        <li>Networking: AWS Networking, Azure Cloud.</li>
        <li>DevOps: Docker, Kubernetes, Terraform.</li>
        <li>Scripting: Bash, PowerShell, Python, JavaScript.</li>
      </ul>
    </div>
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
    <section className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 animate-fadeIn">My Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
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
    <main className="flex min-h-screen flex-col items-center justify-between p-0 bg-gradient-to-br from-purple-900 to-black relative overflow-hidden">
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
        {/* Navigation */}
        <nav className="flex justify-between items-center w-full mb-16 z-10 p-4 bg-black bg-opacity-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full border-4 border-blue-600 overflow-hidden flex justify-center items-center">
              <Image
                src="https://imgur.com/XzVeiIb.gif" 
                alt="RO-NOC Logo"
                width={90}
                height={90}
                className="object-cover" 
              />
            </div>
            <h1 className="text-4xl font-bold ml-4 glow-text animate-fadeIn">Roman Orlowski - Network Operation Center</h1>
          </div>
          
          <div className="flex space-x-4 relative">
            {["Home", "About Me", "Services", "Contact", "Repositories", "FAQ"].map((item) => (
              <Link key={item} href={`#${item.replace(/\s+/g, "").toLowerCase()}`} className="hover:text-gray-300 no-underline">{item}</Link>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden mr-4">
              <Image
                src="https://imgur.com/XzVeiIb.gif"
                alt="RO-NOC Logo"
                width={90}
                height={90}
                className="object-cover"
              />
            </div>
            <h1 className="text-5xl font-bold text-white mb-0 glow-text animate-fadeIn">Welcome to Roman Orlowski - Network Operation Center</h1>
          </div>
          <p className="text-lg text-white mb-6 animate-fadeIn">Your trusted partner in IT solutions and consulting.</p>
          <p className="text-md text-gray-300 mb-8 animate-fadeIn">24 / 7 / 365 Support to ensure the stability and security of your IT infrastructure. Tel: +48 695295641.</p>
          <p className="text-md text-gray-200 mb-12 animate-fadeIn">We specialize in a variety of services including cloud solutions, cybersecurity, and IT training, tailored to fit your specific needs.</p>
          
          {/* Call to Action Button */}
          <a href="#services" className="bg-white text-blue-600 hover:bg-gray-200 font-semibold py-2 px-6 rounded transition duration-300 animate-fadeIn">
            Explore Our Services
          </a>

          {/* Additional Information */}
          <div className="mt-12 space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-100">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-200">
              <li>✔️ Tailored solutions to meet your business objectives.</li>
              <li>✔️ Proven track record of successful implementations.</li>
              <li>✔️ Dedicated support and consultation at every step.</li>
              <li>✔️ Innovative technologies and methodologies to stay ahead.</li>
            </ul>
          </div>
        </section>

        {/* Error Handling */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <>
            {/* Profile Section */}
            <section className="text-center mb-16" id="profile">
              <ResumeCard />
            </section>

            {/* Services Section */}
            <section id="services" className="mb-16">
              <h2 className="text-4xl font-bold mb-4 animate-fadeIn">My Services</h2>
              <ServicesSection />
            </section>
            
            {/* Repositories List Section */}
            <section id="repositories" className="mb-16">
              <h2 className="text-4xl font-bold mb-4 glow-text animate-fadeIn">My GitHub Repositories</h2>
              {repositories.length === 0 ? (
                <div>No repositories available.</div>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repositories.map(repo => (
                    <li key={repo.id} className="mb-2">
                      <div className="border rounded-lg shadow-lg p-6 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-shadow hover:shadow-xl transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold">{repo.name}</h3>
                        <p className="text-gray-600">⭐ {repo.stargazers_count} star{repo.stargazers_count !== 1 ? 's' : ''}</p>
                        <Link
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors block text-center mt-4"
                        >
                          View Repository
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-16">
              <h2 className="text-4xl font-bold mb-4 glow-text animate-fadeIn">Report an Incident</h2>
              <div className="border rounded-lg shadow-lg p-6 mb-4 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-shadow transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <Link href="https://sites.google.com/view/ro-noc/zgłóś-problem" className="block mb-4">
                  <h3 className="text-lg font-semibold">Report</h3>
                </Link>
              </div>
              <div className="flex justify-center space-x-4 mb-6 mt-4">
                {[
                  { href: "https://github.com/ronoc2020", icon: <Github className="w-8 h-8 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://www.linkedin.com/in/ro-noc-182714306/", icon: <Linkedin className="w-8 h-8 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://www.youtube.com/@RO-NOC", icon: <Youtube className="w-8 h-8 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://x.com/noc_ro", icon: <Twitter className="w-8 h-8 text-gray-600 hover:text-gray-800" /> },
                  { href: "https://www.twitch.tv/ro_noc2020", icon: <Twitch className="w-8 h-8 text-gray-600 hover:text-gray-800" /> },
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
      <footer className="w-full bg-gray-800 p-4">
        <div className="text-center">
          <h3 className="text-xl mb-2 glow-text animate-fadeIn">Stay Updated</h3>
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
