// src/components/layout/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/topup", label: "Top Up" },
    { href: "/transaction", label: "Transaction" },
    { href: "/account", label: "Akun" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/img/Logo.png"
                alt="SIMS PPOB Logo"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold">SIMS PPOB</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-[#f42619]" : "text-gray-700 hover:text-[#f42619]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
