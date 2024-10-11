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

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "An exceptional professional with a profound understanding of IT infrastructure and customer management."
    },
    {
      name: "Jane Smith",
      feedback: "Highly recommend! Their approach to cloud solutions is both innovative and effective."
    },
    {
      name: "Mark Johnson",
      feedback: "Great support and expertise in cybersecurity. Helped us secure our network effectively."
    },
  ];

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl mb-8">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">Testimonials</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border border-transparent rounded-lg shadow-lg p-4 bg-opacity-40 bg-black hover:bg-opacity-60 backdrop-filter backdrop-blur-2xl transition-all duration-300">
            <p className="text-gray-300 italic">"{testimonial.feedback}"</p>
            <p className="text-md font-semibold text-cyan-400 mt-2">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl mb-8">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded-lg"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded-lg"
          rows={4}
          required
        ></textarea>
        <button type="submit" className="w-full p-2 bg-cyan-500 rounded-lg hover:bg-cyan-400 transition duration-200">
          Send Message
        </button>
      </form>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skills = [
    "Cloud Solutions",
    "Cybersecurity",
    "Networking",
    "Infrastructure Management",
    "Customer Support",
    "IT Strategy Planning",
  ];

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl mb-8">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">Skills</h2>
      <ul className="list-disc list-inside text-gray-300">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

// Main Component
const Page = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          particles: {
            number: {
              value: 100,
            },
            size: {
              value: { min: 1, max: 5 },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 2,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
          },
        }}
      />
      <Container>
        <h1 className="text-5xl font-bold mb-8 text-white neon-glow">Welcome to My Portfolio</h1>
        <ResumeCard />
        <ServicesSection />
        <TestimonialsSection />
        <ContactForm />
        <SkillsSection />
      </Container>
    </div>
  );
};
// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-bold">Subscribe to RSS Feeds</h2>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://feeds.feedburner.com/TheHackersNews?format=xml" target="_blank" rel="noopener noreferrer" className="hover:underline">
            The Hackers News
          </a>
          <a href="https://www.darkreading.com/rss/all.xml" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Dark Reading
          </a>
          <a href="https://www.infosecurity-magazine.com/rss/news/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            InfoSecurity Magazine
          </a>
          <a href="https://github.com/ronoc2020?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub Repositories
          </a>
        </div>
        <h2 className="text-lg font-bold">Other Links</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          <a href="https://sites.google.com/view/ro-noc/strona-g%C5%82%C3%B3wna" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Home
          </a>
          <a href="https://sites.google.com/view/ro-noc/o-mnie" target="_blank" rel="noopener noreferrer" className="hover:underline">
            About Me
          </a>
          <a href="https://sites.google.com/view/ro-noc/doradztwo-it" target="_blank" rel="noopener noreferrer" className="hover:underline">
            IT Consulting
          </a>
          <a href="https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Cloud Solutions
          </a>
          <a href="https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Network Monitoring
          </a>
          <a href="https://sites.google.com/view/ro-noc/cyberbezpiecze%C5%84stwo" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Cybersecurity
          </a>
          <a href="https://sites.google.com/view/ro-noc/faq" target="_blank" rel="noopener noreferrer" className="hover:underline">
            FAQ
          </a>
          <a href="https://sites.google.com/view/ro-noc/kontakt" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Contact
          </a>
          <a href="https://sites.google.com/view/ro-noc/kontakt/polityka-prywatno%C5%9Bci" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
import Footer from '../components/Footer'; // Adjust the path as necessary

const Page = () => {
  return (
    <div>
      {/* Other sections/components */}
      <Footer />
    </div>
  );
};


export default Footer;

export default Page;
