"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Github, Linkedin, Youtube, Twitter, Twitch } from "lucide-react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";
import Modal from "react-modal"; // Ensure you have react-modal installed
import classNames from "classnames"; // Ensure you have classnames installed

// Custom hook for managing dark/light mode
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};

// Service Card Component
const ServiceCard = ({ title, description, onClick }) => (
  <div 
    className="border border-transparent rounded-xl shadow-lg p-6 mb-4 bg-opacity-30 bg-black hover:bg-opacity-50 backdrop-filter backdrop-blur-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-lg font-semibold text-white neon-glow">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

// Resume Card Component
const ResumeCard = () => (
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

// Services Section Component
const ServicesSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const services = [
    { 
      title: "IT Solutions and Services", 
      description: "Comprehensive consulting in planning and implementing IT strategies to help your business achieve its goals.",
      details: "Detailed information about IT Solutions and Services."
    },
    { 
      title: "Implementation of Cloud Solutions", 
      description: "Specializing in migrating and implementing cloud solutions, adapting them to your company's needs.",
      details: "Detailed information about Implementation of Cloud Solutions."
    },
    { 
      title: "Network/Infrastructure Monitoring and Management", 
      description: "Monitoring IT infrastructure to ensure its continuity and quick response to problems.",
      details: "Detailed information about Network/Infrastructure Monitoring and Management."
    },
    { 
      title: "Cybersecurity", 
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
          <ServiceCard 
            key={index} 
            title={service.title} 
            description={service.description} 
            onClick={() => openModal(service)} 
          />
        ))}
      </div>

      {/* Modal for service details */}
      {selectedService && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
          <h2 className="text-3xl font-bold mb-4">{selectedService.title}</h2>
          <p className="text-gray-300">{selectedService.details}</p>
          <button className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded" onClick={closeModal}>
            Close
          </button>
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
                className={classNames("h-full rounded-full", {
                  "bg-cyan-500": skill.level >= 80,
                  "bg-yellow-500": skill.level < 80 && skill.level >= 50,
                  "bg-red-500": skill.level < 50,
                })}
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

// Social Links Component
const SocialLinks = () => {
  const links = [
    { href: "https://github.com/your-profile", icon: <Github className="h-6 w-6 text-white" /> },
    { href: "https://linkedin.com/in/your-profile", icon: <Linkedin className="h-6 w-6 text-white" /> },
    { href: "https://youtube.com/c/your-channel", icon: <Youtube className="h-6 w-6 text-white" /> },
    { href: "https://twitter.com/your-profile", icon: <Twitter className="h-6 w-6 text-white" /> },
    { href: "https://twitch.tv/your-channel", icon: <Twitch className="h-6 w-6 text-white" /> },
  ];

  return (
    <div className="flex justify-center space-x-4 mt-8">
      {links.map((link, index) => (
        <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.icon}
        </Link>
      ))}
    </div>
  );
};

// Main App Component
const App = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Container>
      <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <h1 className="text-5xl font-bold mb-8 text-white neon-glow">Welcome to My Portfolio</h1>
        <button onClick={toggleDarkMode} className="mb-8 text-white bg-cyan-500 py-2 px-4 rounded">
          Toggle Dark Mode
        </button>
        
        <Particles
          id="tsparticles"
          init={(main: Engine) => loadFull(main)}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 100 },
              size: { value: 3 },
              move: { speed: 1 },
              opacity: { value: 0.5 },
            },
          }}
        />

        <ServicesSection />
        <TestimonialsSection />
        <SkillsSection />
        <SocialLinks />
      </div>
    </Container>
  );
};

export default App;
