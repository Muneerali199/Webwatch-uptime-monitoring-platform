import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Globe, Lock, BarChart, Zap, Shield, Smartphone } from 'lucide-react';
import { Section, SectionTitle } from './ui/Section';
import { FeatureCard } from './ui/FeatureCard';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Bell className="h-6 w-6 text-primary" />,
      title: "Real-time Alerts",
      description: "Get instant notifications through multiple channels when any of your services experience downtime.",
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      icon: <Clock className="h-6 w-6 text-secondary" />,
      title: "24/7 Monitoring",
      description: "Continuous monitoring of your services with checks running every 30 seconds from multiple global locations.",
      iconClassName: "bg-secondary/10 text-secondary",
    },
    {
      icon: <Globe className="h-6 w-6 text-accent" />,
      title: "Global Coverage",
      description: "Monitor from 10+ regions worldwide to ensure your application is accessible from everywhere.",
      iconClassName: "bg-accent/10 text-accent",
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Detailed Analytics",
      description: "Comprehensive performance insights and uptime statistics to optimize your infrastructure.",
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      icon: <Zap className="h-6 w-6 text-secondary" />,
      title: "Fast Response",
      description: "Quick detection with low latency to ensure minimum downtime and maximum performance.",
      iconClassName: "bg-secondary/10 text-secondary",
    },
    {
      icon: <Lock className="h-6 w-6 text-accent" />,
      title: "Secure Monitoring",
      description: "End-to-end encryption for all your monitoring data with strict access controls.",
      iconClassName: "bg-accent/10 text-accent",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Incident Protection",
      description: "Automated recovery procedures and fallback mechanisms to minimize impact.",
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-secondary" />,
      title: "Mobile Accessible",
      description: "Access your dashboard and receive alerts from any device with our responsive design.",
      iconClassName: "bg-secondary/10 text-secondary",
    },
  ];

  return (
    <Section id="features" className="py-24">
      <SectionTitle
        title="Comprehensive Monitoring Features"
        subtitle="Everything you need to ensure your services are always online and performing at their best."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            iconClassName={feature.iconClassName}
            delay={index}
          />
        ))}
      </div>

      <motion.div 
        className="mt-24 p-6 md:p-10 rounded-2xl bg-gradient-to-r from-background via-card to-background border border-white/5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Check your status from multiple locations simultaneously
            </h3>
            <p className="text-gray-300 mb-6">
              DPIN checks your services from various global locations to ensure they're accessible from everywhere. Get a comprehensive view of your global performance.
            </p>
            <ul className="space-y-3">
              {['North America', 'Europe', 'Asia Pacific', 'South America', 'Australia'].map((region, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success"></span>
                  <span>{region}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* World map visualization */}
              <div className="h-full w-full flex items-center justify-center">
                <div className="relative w-full h-full p-4">
                  <div className="absolute top-1/3 left-1/4 h-3 w-3 rounded-full bg-primary animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-secondary animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/3 right-1/4 h-3 w-3 rounded-full bg-accent animate-ping" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/4 right-1/3 h-3 w-3 rounded-full bg-primary animate-ping" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute bottom-1/4 left-1/3 h-3 w-3 rounded-full bg-secondary animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};