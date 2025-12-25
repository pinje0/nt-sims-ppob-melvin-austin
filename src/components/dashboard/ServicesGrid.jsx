"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

export default function ServicesGrid() {
  const { services } = useSelector((state) => state.transaction);

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
        {services.map((service) => (
          <Link
            key={service.service_code}
            href={`/payment/${service.service_code}`}
            className="flex flex-col items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 group-hover:border-[#f42619] transition-colors">
              {service.service_icon && (
                <Image
                  src={service.service_icon}
                  alt={service.service_name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            <p className="text-xs text-center text-gray-700 font-medium line-clamp-2">
              {service.service_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
