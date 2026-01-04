"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToElement } = useSmoothScroll();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, navigate there first
    if (pathname !== '/') {
      // Store the section ID in sessionStorage
      sessionStorage.setItem('scrollToSection', sectionId);
      router.push('/');
    } else {
      // We're already on home page, just scroll
      scrollToElement(sectionId);
    }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-3 cursor-pointer"
            >
              <Image
              src="/logo.png"
              alt="Swych.ai Logo"
              width={56}
              height={48}
              className="w-12 h-10 sm:w-14 sm:h-12"
              />
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Swych.ai
              </span>
            </motion.div>

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