"use client";

import { motion } from "framer-motion";
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DemoSection from '@/components/DemoSection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

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
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <HeroSection />
        <div id="demos">
          <DemoSection />
        </div>
        
        {/* Scroll-triggered Cards Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the features that make us the perfect partner for your digital transformation
              </p>
            </motion.div>

            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ margin: "-100px" }}
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
                  bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500
                  border border-gray-100 overflow-hidden
                  ${card.gradient}
                `}>
                  <div className="p-8 md:p-12">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {card.id}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
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
