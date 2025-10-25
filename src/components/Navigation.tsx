"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "demos", label: "Demos" },
    { id: "testimonials", label: "Testimonials" },
    { id: "clients", label: "Clients" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToElement("home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/DeWatermark.ai_1760889750487-removebg-preview-1760889866292.png"
              alt="Swych Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Swych
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => handleNavClick(link.id)}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Button>
            ))}
            <Button 
              onClick={() => handleNavClick("contact")}
              className="ml-4 bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="ghost"
                  onClick={() => handleNavClick(link.id)}
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                >
                  {link.label}
                </Button>
              ))}
              <Button 
                onClick={() => handleNavClick("contact")}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}