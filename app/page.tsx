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
const ServiceCard = ({ title, url }: { title: string; url: string }) => (
  <div className="border rounded-lg shadow-lg p-6 mb-4 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-shadow transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
    <Link href={url} className="block">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Get more information about how I can help you with</p>
    </Link>
  </div>
);

// Resume Card Component
const ResumeCard = () => (
  <div className="border rounded-lg shadow-lg p-6 mb-4 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-shadow transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
    <Link href="https://sites.google.com/view/ro-noc/curriculum-vitae" className="block">
      <h3 className="text-lg font-semibold mb-4 animate-fadeIn">Curriculum Vitae</h3>
    
    </Link>
    <div className="mt-4 text-gray-700">
      <h4 className="text-md font-semibold mb-4 animate-fadeIn">About Me</h4>
      <p>
        Father of two, confident and conscious. Self-taught IT professional with over 15 years of experience in infrastructure, customer management across diverse project domains including support, networking, cloud solutions, and cybersecurity.
      </p>
      <h4 className="text-md font-semibold mt-2 mb-4 animate-fadeIn">Work Experience</h4>
      <ul className="list-disc list-inside">
        <li>LTI MindTree Ltd - Senior Engineer for Cloud and Infra (June 2023 – February 2024)</li>
        <li>Intellias - Support Engineer (January 2022 – April 2023)</li>
        <li>Sperasoft - NOC Engineer (July 2020 – October 2020)</li>
        <li>Grand Parade, William Hill - Production Operations Analyst (August 2019 – March 2020)</li>
      </ul>
      
      <h4 className="text-md font-semibold mt-2">Certifications & Trainings</h4>
      <p>SEP Authorization, MDF Accreditation, Crane Operations, Driving License (cat. D), ISO 9001:2015.</p>
      <p>CCNA, HCNA-HNTD, AZ-900, AZ-104, AZ-500, L100, L200.</p>
      
      <h4 className="text-md font-semibold mt-2">Technical Skills</h4>
      <ul className="list-disc list-inside">
        <li>Cloud Services: Azure Active Directory, Azure App Service, Azure Policy, Azure Resource Manager, Azure Monitor, Azure Security Center.</li>
        <li>Security Tools: Azure Defender for Endpoint, Endpoint Protection, Attack Surface Reduction, EDR, Sentinel, Intune, DarkTrace, CyOps, Splunk.</li>
        <li>Frameworks & Standards: NIST SP 800-30, ISO 27001.</li>
        <li>Threat Frameworks: MITRE ATT&CK.</li>
        <li>Data Security: DLP (Data Loss Prevention), PAM (Privileged Access Management), IAM (Identity and Access Management).</li>
        <li>Networking: Azure Cloud, AWS Networking Services, Amazon CloudWatch, Cloudflare, Crowdstrike.</li>
        <li>Monitoring Tools: DataMiner, PRTG, SolarWinds, Grafana, CloudWatch, Pi-Hole.</li>
        <li>Databases: MySQL, MariaDB, Oracle Discoverer, Azure SQL Database.</li>
        <li>Operating Systems: Windows Family, Linux, macOS, Android, iOS.</li>
        <li>Methodologies: Agile, Scrum.</li>
        <li>Collaboration Tools: Confluence, Jira, PagerDuty, Slack, MS Teams, OneNote, SharePoint.</li>
        <li>DevOps: Docker, Kubernetes, Terraform, GitLab CI/CD, Ansible, Azure DevOps.</li>
        <li>Virtualization: VMware vSphere, Microsoft Hyper-V, VirtualBox.</li>
        <li>Scripting: Bash, PowerShell, Python, JavaScript, HTML.</li>
      </ul>

      <h4 className="text-md font-semibold mt-2 mb-4 animate-fadeIn">Soft Skills</h4>
      <ul className="list-disc list-inside">
        <li>Team Collaboration, Continuous Learning, Optimism, Persistence, Stress Management, Empathy, Reliability, Communication, Interpersonal Skills, Adaptability.</li>
      </ul>

      <h4 className="text-md font-semibold mt-2 mb-4 animate-fadeIn">Languages</h4>
      <ul className="list-disc list-inside">
        <li>Polish (Native).</li>
        <li>English (C1).</li>
        <li>German (B1).</li>
      </ul>

      <h4 className="text-md font-semibold mt-2 mb-4 animate-fadeIn">Hobbies</h4>
      <ul className="list-disc list-inside">
        <li>Mixed Martial Arts, Basketball.</li>
        <li>Music and Video Editing.</li>
        <li>Reading Books.</li>
        <li>DIY Projects.</li>
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
      description: "Comprehensive IT consulting and solutions tailored to your business needs. We provide services in infrastructure setup, systems integration, and support."
    },
    { 
      title: "Cloud Solutions Implementation", 
      url: "https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych", 
      description: "Expert assistance in designing and deploying cloud solutions on platforms like Azure, AWS, and GCP, ensuring optimal performance and security."
    },
    { 
      title: "Network / Infrastructure Monitoring and Management", 
      url: "https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85", 
      description: "Proactive monitoring and management of network infrastructure to ensure high availability and performance. Includes incident management and reporting."
    },
    { 
      title: "Cybersecurity", 
      url: "https://sites.google.com/view/ro-noc/cyberbezpiecze%C5%84stwo", 
      description: "End-to-end cybersecurity solutions safeguarding your business from threats through risk assessment, security audits, and compliance management."
    },
    {
      title: "Data Management Solutions",
      url: "https://sites.google.com/view/ro-noc/rozwi%C4%85zania-zarz%C4%85dzania-danymi",
      description: "Robust data management strategies including data storage, backup solutions, and data recovery processes tailored to business requirements."
    },
    {
      title: "IT Training and Workshops",
      url: "https://sites.google.com/view/ro-noc/szkolenia-it",
      description: "Hands-on training and workshops for teams to enhance their skills in IT fundamentals, cybersecurity, and cloud technologies."
    },
    {
      title: "Disaster Recovery and Business Continuity Planning",
      url: "https://sites.google.com/view/ro-noc/plany-ci%C4%99%C5%BCko%C5%9Bci-i-odzyskiwania-danych",
      description: "Development of disaster recovery strategies and business continuity plans to ensure operations can continue in the face of unexpected incidents."
    },
  ];

  return (
    <section className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 mb-4 animate-fadeIn">My Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div key={index} className="border rounded-lg shadow p-4 bg-white hover:bg-gray-50 transition">
            <h3 className="text-lg font-bold">
              <a href={service.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {service.title}
              </a>
            </h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

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
          <div className="flex justify-center items-center">
  <div className="w-24 h-24 rounded-full border-4 border-blue-600 overflow-hidden flex justify-center items-center">
    <Image
      src="https://imgur.com/XzVeiIb.gif" 
      alt="RO-NOC Logo"
      width={90}
      height={90}
      className="object-cover" 
    />
  </div>
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
        src="https://imgur.com/XzVeiIb.gif" // Zastąp rzeczywistym linkiem GIFa
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
              <h2 className="text-4xl font-bold mb-4 animate-fadeIn">If you seek a skilled professional capable of seamlessly aligning diverse projects, please reach out</h2>
              <p className="text-xl mb-4 animate-fadeIn"></p>
            </section>

            {/* Services Section */}
            <section id="services" className="mb-16">
              <h2 className="text-4xl font-bold mb-4 animate-fadeIn">My Services</h2>
              <ServicesSection />
            </section>

            {/* About Me Section */}
            <section id="about" className="text-center mb-16 animate-fadeIn">
              <h3 className="text-4xl font-bold mb-4">About Me</h3>
              <p className="text-xl mb-4">Father of two, confident and conscious IT professional with over 15 years of experience in infrastructure, customer management, and diverse project domains.</p>
              <Link href="https://sites.google.com/view/ro-noc/about-me" target="_blank" className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors">Read more about me</Link>
              <div className="mt-6">
                <h4 className="text-lg font-semibold">Work Experience:</h4>
                <ul className="list-disc list-inside">
                  <li>LTI MindTree Ltd - Senior Engineer for Cloud and Infra</li>
                  <li>Intellias - Support Engineer</li>
                  <li>Sperasoft - NOC Engineer</li>
                  <li>Grand Parade, William Hill - Production Operations Analyst</li>
                </ul>
              </div>
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
              <div className="flex justify-center mb-4">
                <Link href="https://sites.google.com/view/ro-noc/zgłóś-problem" target="_blank" className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition-colors">Report</Link>
              </div>

              <div className="flex justify-center space-x-4 mb-6 mt-4">
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
