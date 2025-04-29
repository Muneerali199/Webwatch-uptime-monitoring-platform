"use client";

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './Buttons';

export const PricingSection = ({ loading }: { loading: boolean }) => {
  return (
    <section className="py-16 md:py-24 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-3/4 h-12 mx-auto mb-6 bg-gray-800 rounded animate-pulse" />
            <div className="w-1/2 h-6 mx-auto bg-gray-800 rounded animate-pulse" />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Simple,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  transparent
                </span>{" "}
                pricing
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Start for free, upgrade as you grow. No long-term contracts.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Free",
                  description: "Get started with basic monitoring",
                  price: "$0",
                  features: [
                    "Up to 3 websites",
                    "5 minute check interval",
                    "Email notifications",
                    "1 day data retention"
                  ],
                  highlight: false
                },
                {
                  name: "Pro",
                  description: "Perfect for growing businesses",
                  price: "$29",
                  features: [
                    "Up to 25 websites",
                    "1 minute check interval",
                    "Email, SMS, Slack alerts",
                    "30 days data retention",
                    "API access"
                  ],
                  highlight: true
                },
                {
                  name: "Enterprise",
                  description: "For large organizations",
                  price: "$99",
                  features: [
                    "Unlimited websites",
                    "30 second check interval",
                    "All notification channels",
                    "90 days data retention",
                    "Advanced integrations",
                    "Dedicated support"
                  ],
                  highlight: false
                }
              ].map((plan, i) => (
                <motion.div 
                  key={i}
                  className={`relative p-8 rounded-xl border ${
                    plan.highlight 
                      ? "border-indigo-500 bg-gradient-to-b from-gray-900/50 to-black shadow-xl shadow-indigo-500/20" 
                      : "border-gray-800 bg-gray-900/50"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-gray-400 mt-2">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.highlight ? (
                    <PrimaryButton 
                      icon={ArrowRight}
                      className="w-full"
                    >
                      Get Started
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton 
                      icon={plan.name === "Enterprise" ? null : ArrowRight}
                      className="w-full"
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </SecondaryButton>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};