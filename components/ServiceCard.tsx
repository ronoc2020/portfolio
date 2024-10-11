// components/ServiceCard.tsx

import Link from "next/link";

export const ServiceCard = ({ title, url }: { title: string; url: string }) => (
  <div className="border rounded-lg shadow-lg p-6 mb-4 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-shadow transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
    <Link href={url} className="block">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Get more information on how I can help you with.</p>
    </Link>
  </div>
);
