"use client";

import { motion } from "framer-motion";
import { MessageSquare, Phone, PhoneOutgoing, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    description:
      "Intelligent conversational AI that understands context, learns from interactions, and provides instant 24/7 customer support.",
    features: [
      "Natural language processing",
      "Multi-language support",
      "Seamless CRM integration",
      "Real-time analytics",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Phone,
    title: "AI Voice Callers",
    description:
      "Human-like voice AI that handles inbound calls with natural conversation flow, perfect for customer service and support.",
    features: [
      "Natural voice synthesis",
      "Emotion detection",
      "Call routing automation",
      "Conversation insights",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: PhoneOutgoing,
    title: "AI Outbound Callers",
    description:
      "Automated outreach that scales your sales and marketing efforts with personalized, context-aware calling campaigns.",
    features: [
      "Smart lead qualification",
      "Appointment scheduling",
      "Follow-up automation",
      "Performance tracking",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 bg-white">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 mb-4"
          >
            <Zap className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700 font-medium">Our Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900"
          >
            Cutting-Edge AI Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Empower your business with our suite of AI-powered communication
            tools designed to elevate customer experience and operational
            efficiency.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative h-full bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Hover gradient effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${service.gradient} mb-4 shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}