"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { label: "AI Chatbots", href: "#services" },
      { label: "AI Voice Callers", href: "#services" },
      { label: "AI Outbound Callers", href: "#services" },
      { label: "Custom Solutions", href: "#contact" },
    ],
    Company: [
      { label: "About Us", href: "#home" },
      { label: "Our Clients", href: "#clients" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/swych.ai?igsh=a3A1anczdzJ4NW9v&utm_source=qr", label: "Instagram", gradient: "from-pink-500 to-purple-500" },
    { icon: Linkedin, href: "#", label: "LinkedIn", gradient: "from-blue-500 to-blue-600" },
    { icon: Twitter, href: "#", label: "X.com", gradient: "from-gray-700 to-gray-900" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/20">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <Image
                  src="/logo.png"
                  alt="Swych.ai Logo"
                  width={56}
                  height={48}
                  className="w-12 h-10 sm:w-14 sm:h-12"
                />
                <span className="text-3xl font-bold text-white">Swych.ai</span>
              </motion.div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Transforming businesses with cutting-edge AI solutions. Empowering growth through
              intelligent automation.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.gradient} flex items-center justify-center hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-white/60 text-sm text-center">
            © {currentYear} Swych.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}