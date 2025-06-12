"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Github, Linkedin, Mail, Phone, Shield, Terminal } from "lucide-react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";
import Modal from "react-modal";
import classNames from "classnames";
import React from 'react';

Modal.setAppElement('#__next');

const useTerminalMode = () => {
  const [isTerminalMode, setIsTerminalMode] = useState(true);

  const toggleTerminalMode = () => {
    setIsTerminalMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle("terminal-mode", isTerminalMode);
  }, [isTerminalMode]);

  return { isTerminalMode, toggleTerminalMode };
};

const CommandLine = ({ children, prompt = "$" }) => (
  <div className="flex items-start mb-4">
    <span className="text-green-400 mr-2 mt-1">{prompt}</span>
    <div className="flex-1">{children}</div>
  </div>
);

const TerminalBadge = ({ children, icon: Icon }) => (
  <span className="inline-flex items-center bg-gray-800 border border-green-400 rounded-md px-3 py-1 text-sm font-mono mr-2 mb-2">
    {Icon && <Icon className="w-4 h-4 mr-2 text-green-400" />}
    {children}
  </span>
);

const ExperienceItem = ({ title, period, children }) => (
  <div className="mb-6 border-l-2 border-green-400 pl-4">
    <h3 className="text-xl font-bold text-green-400">{title}</h3>
    <p className="text-purple-400 text-sm mb-2">{period}</p>
    <ul className="list-disc list-inside space-y-1 text-gray-300">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  </div>
);

const BinaryText = ({ children }) => {
  const [displayText, setDisplayText] = useState(children);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText(children.split('').map(c => 
        Math.random() > 0.1 ? c : (Math.random() > 0.5 ? "0" : "1")
      ).join(''));
    }, 100);
    
    return () => clearInterval(interval);
  }, [children]);

  return (
    <p className="text-purple-400 font-mono text-sm bg-black bg-opacity-50 p-2 rounded">
      {displayText}
    </p>
  );
};

const Typewriter = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayText}
      {showCursor && <span className="text-green-400">|</span>}
    </span>
  );
};

const MainPage = () => {
  const { isTerminalMode, toggleTerminalMode } = useTerminalMode();
  const [activeTab, setActiveTab] = useState("about");

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Container className="font-mono">
      <div className="relative min-h-screen bg-black text-gray-300">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 30, density: { enable: true, value_area: 800 } },
              color: { value: "#39ff14" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#39ff14",
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
            },
          }}
        />

        <div className="max-w-4xl mx-auto p-4 relative z-10">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-4 p-2 bg-gray-900 rounded-t-lg border-b border-green-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-green-400">roman_orlowski.sh</div>
            <button 
              onClick={toggleTerminalMode}
              className="text-green-400 hover:text-white"
            >
              <Terminal className="w-5 h-5" />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="bg-gray-900 bg-opacity-90 rounded-b-lg border border-green-400 p-6 shadow-lg">
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              {["about", "skills", "experience", "contact"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm ${activeTab === tab ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* About Tab */}
            {activeTab === "about" && (
              <>
                <CommandLine>
                  <h1 className="text-2xl font-bold text-green-400">
                    <Typewriter text="Roman Orlowski" />
                  </h1>
                </CommandLine>
                
                <CommandLine>
                  <p className="text-xl">
                    <TerminalBadge icon={Shield}>
                      Cybersecurity Engineer | Cloud & Infra Specialist | SOC/NOC Analyst
                    </TerminalBadge>
                  </p>
                </CommandLine>
                
                <CommandLine>
                  <div className="flex items-center space-x-4">
                    <TerminalBadge icon={Mail}>
                      <a href="mailto:ro-noc2020@protonmail.com">ro-noc2020@protonmail.com</a>
                    </TerminalBadge>
                    <TerminalBadge icon={Phone}>+48 695 295 641</TerminalBadge>
                  </div>
                </CommandLine>
                
                <CommandLine>
                  <BinaryText>
                    01101111 01101110 01101100 01111001 00100000 01100001 00100000 01100110 01110010 01100101 01100101 00100000 01101101 01100001 01101110 00100000 01110010 01100101 01100010 01100101 01101100 01110011
                  </BinaryText>
                </CommandLine>
                
                <CommandLine>
                  <h2 className="text-xl text-green-400 border-b border-gray-700 pb-2 mb-4"># Professional Summary</h2>
                </CommandLine>
                
                <CommandLine>
                  <p>
                    Self-driven, technically skilled cybersecurity consultant with hands-on experience in cloud security, SOC/NOC operations, incident response, and infrastructure hardening. Known for solving complex problems independently, ensuring client satisfaction, and applying cutting-edge tools across hybrid environments.
                  </p>
                </CommandLine>
              </>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <>
                <CommandLine>
                  <h2 className="text-xl text-green-400 border-b border-gray-700 pb-2 mb-4"># Key Skills & Tools</h2>
                </CommandLine>
                
                <CommandLine>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-green-400 mb-2">> Cloud</h3>
                      <div className="space-y-2">
                        <TerminalBadge>Azure (AD, Defender, Sentinel, Intune)</TerminalBadge>
                        <TerminalBadge>MS365</TerminalBadge>
                        <TerminalBadge>Terraform</TerminalBadge>
                        <TerminalBadge>Kubernetes</TerminalBadge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-green-400 mb-2">> Security</h3>
                      <div className="space-y-2">
                        <TerminalBadge>MITRE ATT&CK</TerminalBadge>
                        <TerminalBadge>NIST 800-30</TerminalBadge>
                        <TerminalBadge>OWASP</TerminalBadge>
                        <TerminalBadge>Burp Suite</TerminalBadge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-green-400 mb-2">> Monitoring</h3>
                      <div className="space-y-2">
                        <TerminalBadge>Splunk</TerminalBadge>
                        <TerminalBadge>PagerDuty</TerminalBadge>
                        <TerminalBadge>SolarWinds</TerminalBadge>
                        <TerminalBadge>Wireshark</TerminalBadge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-green-400 mb-2">> Pentesting & Forensics</h3>
                      <div className="space-y-2">
                        <TerminalBadge>Metasploit</TerminalBadge>
                        <TerminalBadge>Hashcat</TerminalBadge>
                        <TerminalBadge>Aircrack-ng</TerminalBadge>
                        <TerminalBadge>OSINT</TerminalBadge>
                      </div>
                    </div>
                  </div>
                </CommandLine>
                
                <CommandLine>
                  <h2 className="text-xl text-green-400 border-b border-gray-700 pb-2 mb-4"># Certifications</h2>
                </CommandLine>
                
                <CommandLine>
                  <div className="space-y-2">
                    <TerminalBadge>AZ-900</TerminalBadge>
                    <TerminalBadge>AZ-104</TerminalBadge>
                    <TerminalBadge>AZ-500</TerminalBadge>
                    <TerminalBadge>CCNA</TerminalBadge>
                    <TerminalBadge>ISO27001</TerminalBadge>
                  </div>
                </CommandLine>
              </>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <>
                <CommandLine>
                  <h2 className="text-xl text-green-400 border-b border-gray-700 pb-2 mb-4"># Professional Experience</h2>
                </CommandLine>
                
                <CommandLine>
                  <ExperienceItem 
                    title="LTIMindtree – Senior Cloud/Infra Security Engineer" 
                    period="2023–2024"
                  >
                    Implemented Defender for Endpoint, EDR, DLP, PAM in hybrid Microsoft environments
                    Led cloud posture hardening, threat protection deployment, and technical onboarding
                  </ExperienceItem>
                  
                  <ExperienceItem 
                    title="Intellias – Support Engineer (Cloud Migrations)" 
                    period="2022–2023"
                  >
                    Migrated Azure infra across 5 countries, managed IAM, SLAs, and security policy rollouts
                  </ExperienceItem>
                  
                  <ExperienceItem 
                    title="Discovery – Platform Engineer" 
                    period="2020–2021"
                  >
                    SIEM operations using Splunk/SolarWinds; managed DR and incident response across critical systems
                  </ExperienceItem>
                  
                  <ExperienceItem 
                    title="Sperasoft – NOC Engineer" 
                    period="2020"
                  >
                    Monitored global infra, escalated incidents, co-developed response SOPs and service books
                  </ExperienceItem>
                  
                  <ExperienceItem 
                    title="William Hill – SOC Analyst" 
                    period="2019–2020"
                  >
                    Vulnerability scanning, patching, phishing awareness, incident triage
                  </ExperienceItem>
                  
                  <ExperienceItem 
                    title="Emitel SA – Junior Network Specialist" 
                    period="2018–2019"
                  >
                    SDH/MPLS link troubleshooting, VPN config, SLA ticket handling (Jira)
                  </ExperienceItem>
                </CommandLine>
              </>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <>
                <CommandLine>
                  <h2 className="text-xl text-green-400 border-b border-gray-700 pb-2 mb-4"># Contact Information</h2>
                </CommandLine>
                
                <CommandLine>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-green-400 mr-2" />
                      <a href="mailto:ro-noc2020@protonmail.com" className="hover:text-green-400">
                        ro-noc2020@protonmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-green-400 mr-2" />
                      <span>+48 695 295 641</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Terminal className="w-5 h-5 text-green-400 mr-2" />
                      <a href="https://rocybersolutions.com" className="hover:text-green-400">
                        ROCyberSolutions
                      </a>
                    </div>
                  </div>
                </CommandLine>
                
                <CommandLine>
                  <h2 className="text-xl text-green-400 border-b border-gray-700 pb-2 mb-4"># Social Links</h2>
                </CommandLine>
                
                <CommandLine>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-green-400">
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-green-400">
                      <Github className="w-6 h-6" />
                    </a>
                  </div>
                </CommandLine>
                
                <CommandLine>
                  <h2 className="text-xl text-green-400 border-b border-gray-700 pb-2 mb-4"># Download Resume</h2>
                </CommandLine>
                
                <CommandLine>
                  <a 
                    href="#" 
                    className="inline-block bg-green-400 text-black px-4 py-2 rounded hover:bg-green-300 transition-colors"
                  >
                    Download PDF
                  </a>
                </CommandLine>
              </>
            )}

            {/* Terminal Input Line */}
            <CommandLine prompt=">">
              <span className="text-green-400 animate-pulse">_</span>
            </CommandLine>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MainPage;
