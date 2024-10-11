"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Github, Linkedin, Youtube, Twitter, Twitch } from "lucide-react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal"; // Make sure to install react-modal
import classNames from "classnames"; // Make sure to install classnames

// Custom hook for managing dark/light mode
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};

// Service Card Component
const ServiceCard = ({ title, url, description, details, onClick }: { title: string; url: string; description: string; details: string; onClick: () => void }) => (
  <div 
    className="border border-transparent rounded-xl shadow-lg p-6 mb-4 bg-opacity-30 bg-black hover:bg-opacity-50 backdrop-filter backdrop-blur-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-lg font-semibold text-white neon-glow">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

// Resume Card Component
const ResumeCard = () => {
  return (
    <div className="border border-transparent rounded-xl shadow-lg p-6 mb-4 bg-opacity-30 bg-black hover:bg-opacity-50 backdrop-filter backdrop-blur-2xl transition-all duration-300">
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const services = [
    { 
      title: "IT Solutions and Services", 
      url: "https://sites.google.com/view/ro-noc/doradztwo-it",
      description: "Comprehensive consulting in planning and implementing IT strategies to help your business achieve its goals.",
      details: "Detailed information about IT Solutions and Services."
    },
    { 
      title: "Implementation of Cloud Solutions", 
      url: "https://sites.google.com/view/ro-noc/implementacja-rozwi%C4%85za%C5%84-chmurowych", 
      description: "Specializing in migrating and implementing cloud solutions, adapting them to your company's needs.",
      details: "Detailed information about Implementation of Cloud Solutions."
    },
    { 
      title: "Network/Infrastructure Monitoring and Management", 
      url: "https://sites.google.com/view/ro-noc/monitorowanie-i-zarz%C4%85dzanie-sieci%C4%85-infrastruktur%C4%85", 
      description: "Monitoring IT infrastructure to ensure its continuity and quick response to problems.",
      details: "Detailed information about Network/Infrastructure Monitoring and Management."
    },
    { 
      title: "Cybersecurity", 
      url: "https://sites.google.com/view/ro-noc/cyberbezpiecze%C5%84stwo", 
      description: "Services in IT infrastructure protection, including EDR tools, threat management, and security policy implementation.",
      details: "Detailed information about Cybersecurity."
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedService(null);
  };

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">My Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} onClick={() => openModal(service)} />
        ))}
      </div>

      {/* Modal for service details */}
      {selectedService && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
          <h2 className="text-3xl font-bold mb-4">{selectedService.title}</h2>
          <p className="text-gray-300">{selectedService.details}</p>
          <button className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded" onClick={closeModal}>Close</button>
        </Modal>
      )}
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "An exceptional professional with a profound understanding of IT infrastructure and customer management.",
      rating: 5,
      company: "Tech Innovators"
    },
    {
      name: "Jane Smith",
      feedback: "Highly recommend! Their approach to cloud solutions is both innovative and effective.",
      rating: 4,
      company: "Cloud Solutions Inc."
    },
    {
      name: "Mark Johnson",
      feedback: "Great support and expertise in cybersecurity. Helped us secure our network effectively.",
      rating: 5,
      company: "SecureNet"
    },
  ];

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl mb-8">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">Testimonials</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="border border-transparent rounded-lg shadow-lg p-4 bg-opacity-40 bg-black hover:bg-opacity-60 backdrop-filter backdrop-blur-2xl transition-all duration-300 transform hover:scale-105"
          >
            <p className="text-gray-300 italic">"{testimonial.feedback}"</p>
            <p className="text-md font-semibold text-cyan-400 mt-2">- {testimonial.name}</p>
            <p className="text-sm text-gray-400">{testimonial.company}</p>
            <div className="flex space-x-1 mt-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 animate-pulse">★</span>
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <span key={i} className="text-gray-400">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skills = [
    { name: "Cloud Solutions", level: 80 },
    { name: "Cybersecurity", level: 90 },
    { name: "Networking", level: 75 },
    { name: "Customer Management", level: 85 },
    { name: "Technical Support", level: 88 },
  ];

  return (
    <section className="p-8 bg-gradient-to-bl from-black to-gray-900 rounded-xl shadow-xl mb-8">
      <h2 className="text-4xl font-bold mb-8 text-white neon-glow">Skills</h2>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-300">{skill.name}</span>
            <div className="w-1/2 bg-gray-300 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${skill.level >= 80 ? 'bg-green-500' : skill.level >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <span className="text-gray-300">{skill.level}%</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// Main Component
const MainPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 100 },
            size: { value: 3 },
            line_linked: { enable: true },
            move: { speed: 2 },
          },
        }}
      />
      <Container>
        <header className="flex justify-between items-center w-full p-4">
          <h1 className="text-5xl font-bold neon-glow">Roman Orłowski - Netwrok Operation Center</h1>
          <button onClick={toggleDarkMode} className="p-2 rounded bg-gray-600 text-white hover:bg-gray-500 transition">
            Toggle Dark/Light Mode
          </button>
        </header>
        <ResumeCard />
        <ServicesSection />
        <TestimonialsSection />
        <SkillsSection />
        <footer className="p-4 text-center">
          <Link href="https://github.com/ronoc2020?tab=repositories" className="text-gray-400 hover:text-gray-300"><Github /></Link>
          <Link href="https://www.linkedin.com/in/ro-noc-182714306/ className="text-gray-400 hover:text-gray-300"><Linkedin /></Link>
          <Link href="https://www.youtube.com/@RO-NOC" className="text-gray-400 hover:text-gray-300"><Youtube /></Link>
          <Link href="https://x.com/noc_ro" className="text-gray-400 hover:text-gray-300"><Twitter /></Link>
          <Link href="https://www.twitch.tv/ro_noc2020" className="text-gray-400 hover:text-gray-300"><Twitch /></Link>
        </footer>
      </Container>
    </main>
  );
};

export default MainPage;
