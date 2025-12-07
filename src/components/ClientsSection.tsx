"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

// Demo client logos - text-based for simplicity
const demoClients = [
  "TechCorp",
  "InnovateLabs",
  "FutureAI",
  "CloudSync",
];

export default function ClientsSection() {
  return (
    <section id="clients" className="relative py-8 sm:py-10 bg-white overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Section header - compact */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 mb-3"
          >
            <Building2 className="w-3 h-3 text-gray-700" />
            <span className="text-xs text-gray-700 font-medium">Trusted By</span>
          </motion.div>
        </div>

        {/* Auto-rotating marquee */}
        <div className="relative">
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee container */}
          <div className="flex overflow-hidden">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 animate-marquee">
              {/* Render multiple sets for seamless infinite loop */}
              {[...demoClients, ...demoClients, ...demoClients].map((client, index) => (
                <div
                  key={`logo-${index}`}
                  className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 min-w-[140px] sm:min-w-[160px] hover:bg-gray-100 hover:shadow-md transition-all duration-300 shrink-0"
                >
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}