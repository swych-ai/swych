"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollToElement } = useSmoothScroll();

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
    Resources: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Blog", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram", gradient: "from-pink-500 to-purple-500" },
    { icon: Linkedin, href: "#", label: "LinkedIn", gradient: "from-blue-500 to-blue-600" },
    { icon: Twitter, href: "#", label: "X.com", gradient: "from-gray-700 to-gray-900" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/20">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.button
              onClick={() => scrollToElement("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mb-4 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/DeWatermark.ai_1760889750487-removebg-preview-1760889866292.png"
                  alt="Swych Logo"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Swych
                </span>
              </div>
            </motion.button>
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

        {/* Newsletter Section */}
        <div className="border-t border-white/20 pt-12 mb-12">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for the latest AI insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 whitespace-nowrap hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Subscribe</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} Swych. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}