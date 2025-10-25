"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, PhoneOutgoing, Send, Mic, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DemosSection() {
  const [chatMessages, setChatMessages] = useState<Array<{ type: "user" | "ai"; text: string }>>([
    { type: "ai", text: "Hi! I'm your AI assistant. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your inquiry. Let me help you with that right away!",
        "Great question! Our AI solutions can definitely assist with that.",
        "I'm processing your request. Our system can handle this efficiently.",
        "Thank you for reaching out. I'll connect you with the right solution.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages((prev) => [...prev, { type: "ai", text: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="demos" className="relative py-20 bg-white">
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
            <Play className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700 font-medium">Live Demos</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold mb-4 text-gray-900"
          >
            Experience AI In Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Interact with our AI solutions and see how they can transform your business operations
          </motion.p>
        </div>

        {/* Interactive Demos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="chatbot" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 border border-gray-200 p-1 mb-6">
              <TabsTrigger
                value="chatbot"
                className="data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm text-gray-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">AI Chatbot</span>
                <span className="sm:hidden">Chat</span>
              </TabsTrigger>
              <TabsTrigger
                value="voice"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Voice Caller</span>
                <span className="sm:hidden">Voice</span>
              </TabsTrigger>
              <TabsTrigger
                value="outbound"
                className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm text-gray-700"
              >
                <PhoneOutgoing className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Outbound</span>
                <span className="sm:hidden">Out</span>
              </TabsTrigger>
            </TabsList>

            {/* Chatbot Demo */}
            <TabsContent value="chatbot" className="mt-4">
              <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">AI Chatbot Demo</h3>
                      <p className="text-sm text-gray-600">Try our intelligent conversation AI</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 h-80 overflow-y-auto space-y-3 border border-gray-200">
                    <AnimatePresence>
                      {chatMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                              message.type === "user"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                                : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                            }`}
                          >
                            {message.text}
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Chat input */}
                  <div className="flex space-x-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                      placeholder="Type your message..."
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                    <Button
                      onClick={handleChatSend}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Voice Caller Demo */}
            <TabsContent value="voice" className="mt-4">
              <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">AI Voice Caller Demo</h3>
                      <p className="text-sm text-gray-600">Experience natural voice interactions</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                    <div className="max-w-md mx-auto">
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                        >
                          <Mic className="w-16 h-16 text-white" />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-32 h-32 rounded-full bg-blue-500/30"
                          />
                        </div>
                      </div>

                      <h4 className="text-2xl font-bold text-gray-900 mb-3">Voice AI Ready</h4>
                      <p className="text-gray-600 mb-4">
                        Our AI voice system uses advanced speech synthesis and natural language
                        understanding to handle customer calls with human-like conversation.
                      </p>

                      <div className="space-y-2 text-left">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-gray-900 mt-2" />
                          <p className="text-gray-700 text-sm">
                            Natural voice with emotion detection
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-gray-900 mt-2" />
                          <p className="text-gray-700 text-sm">
                            Intelligent call routing and handling
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-gray-900 mt-2" />
                          <p className="text-gray-700 text-sm">
                            Real-time conversation analytics
                          </p>
                        </div>
                      </div>

                      <Button className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-md">
                        Request Voice Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Outbound Caller Demo */}
            <TabsContent value="outbound" className="mt-4">
              <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-md">
                      <PhoneOutgoing className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">AI Outbound Caller Demo</h3>
                      <p className="text-sm text-gray-600">Scale your outreach automatically</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="max-w-2xl mx-auto">
                      <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        Campaign Performance Dashboard
                      </h4>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {[
                          { label: "Calls Made", value: "1,247", color: "from-green-500 to-emerald-500" },
                          { label: "Successful", value: "892", color: "from-blue-500 to-cyan-500" },
                          { label: "Conversion", value: "31.5%", color: "from-purple-500 to-pink-500" },
                          { label: "Avg Duration", value: "2:34", color: "from-yellow-500 to-orange-500" },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg p-3 text-center border border-gray-200 shadow-sm"
                          >
                            <div
                              className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-600">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-lg font-semibold text-gray-900 mb-2">Key Features:</h5>
                        {[
                          "Smart lead qualification with AI scoring",
                          "Automated appointment scheduling & follow-ups",
                          "Personalized conversation scripts",
                          "Real-time performance analytics",
                          "CRM integration & data synchronization",
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 bg-white rounded-lg p-2 border border-gray-200"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                            <p className="text-gray-700 text-sm">{feature}</p>
                          </motion.div>
                        ))}
                      </div>

                      <Button className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-md">
                        Start Outbound Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}