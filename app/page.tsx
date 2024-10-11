"use client";

import { useCallback, useEffect, useState } from "react";
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
    <div className="border border-transparent rounded-xl shadow-lg p-6 mb-4 bg-opacity-40 bg-black hover:bg-opacity-60 backdrop-filter backdrop-blur-2xl transition-all duration-300">
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

// Animated Text Component
const AnimatedText = () => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass((prev) => (prev === 'animate' ? '' : 'animate'));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={`text-5xl font-bold mb-4 text-white neon-glow ${animationClass}`}>
      Welcome to My Portfolio
    </h1>
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
            color: { value: "#000000" },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 2,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <Container className="relative z-10">
        <div className="text-center mb-8">
          <AnimatedText />
        </div>
        <ServicesSection />
        <TestimonialsSection />
        <SkillsSection />
        <ResumeCard />
      </Container>
    </div>
  );
};

export default Page;
