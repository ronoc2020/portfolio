// components/ServicesSection.tsx

import { ServiceCard } from './ServiceCard'; // Assuming ServiceCard is in the same directory
import Link from "next/link";

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
