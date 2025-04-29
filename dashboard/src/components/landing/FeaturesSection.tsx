"use client";

import { motion } from 'framer-motion';
import { Activity, Bell, Shield } from 'lucide-react';

export const FeaturesSection = ({ loading }: { loading: boolean }) => {
  return (
    <section className="py-16 md:py-24 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-3/4 h-12 mx-auto mb-6 bg-gray-800 rounded animate-pulse" />
            <div className="w-1/2 h-6 mx-auto bg-gray-800 rounded animate-pulse" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Everything you need to ensure{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                reliability
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our comprehensive monitoring solution keeps you informed about your services' health.
            </motion.p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full h-64 bg-gray-800 rounded-xl animate-pulse" />
            ))
          ) : (
            [
              {
                icon: <Activity size={24} className="text-blue-400" />,
                title: "Real-time Monitoring",
                description: "Check your websites' status every 30 seconds. Detect issues before they impact your users.",
                color: "blue"
              },
              {
                icon: <Bell size={24} className="text-green-400" />,
                title: "Instant Alerts",
                description: "Get notified immediately via email, SMS, Slack, or webhook when your services go down.",
                color: "green"
              },
              {
                icon: <Shield size={24} className="text-indigo-400" />,
                title: "Detailed Insights",
                description: "View uptime history, response times, and detailed status reports for all your services.",
                color: "indigo"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`p-3 bg-${feature.color}-500/10 rounded-full w-fit mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};