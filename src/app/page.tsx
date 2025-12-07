"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DemoSection from '@/components/DemoSection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const cardData = [
  {
    id: 1,
    title: "Innovative Solutions",
    description: "We craft cutting-edge digital experiences that transform your business and engage your audience.",
    gradient: "from-blue-50 to-indigo-50"
  },
  {
    id: 2,
    title: "Seamless Integration",
    description: "Our solutions integrate seamlessly with your existing systems, ensuring smooth operations.",
    gradient: "from-emerald-50 to-teal-50"
  },
  {
    id: 3,
    title: "Scalable Growth",
    description: "Built to grow with your business, our platforms adapt and scale as your needs evolve.",
    gradient: "from-purple-50 to-pink-50"
  },
  {
    id: 4,
    title: "Expert Support",
    description: "Our dedicated team provides ongoing support and maintenance to keep everything running perfectly.",
    gradient: "from-orange-50 to-red-50"
  }
];

export default function Home() {
  const { scrollToElement } = useSmoothScroll();

  // Handle navigation from other pages
  useEffect(() => {
    const scrollToSection = sessionStorage.getItem('scrollToSection');
    if (scrollToSection) {
      // Wait for page to fully render
      setTimeout(() => {
        scrollToElement(scrollToSection);
        sessionStorage.removeItem('scrollToSection');
      }, 300);
    }
  }, [scrollToElement]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <HeroSection />
        <div id="demos">
          <DemoSection />
        </div>
        
        {/* Scroll-triggered Cards Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
                Why Choose Us
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Discover the features that make us the perfect partner for your digital transformation
              </p>
            </motion.div>

            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative"
                style={{
                  zIndex: cardData.length - index,
                  transform: `translateY(${index * -8}px)`,
                }}
              >
                <div className={`
                  bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500
                  border border-gray-100 overflow-hidden
                  ${card.gradient}
                `}>
                  <div className="p-6 sm:p-8 md:p-12">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-base sm:text-lg">
                            {card.id}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div id="services">
          <ServicesSection />
        </div>
        <div id="clients">
          <ClientsSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
