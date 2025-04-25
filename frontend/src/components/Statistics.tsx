import React from 'react';
import { Activity, Clock, Zap, Bell } from 'lucide-react';
import { Section, SectionTitle } from './ui/Section';
import { StatCard } from './ui/StatCard';
import { motion } from 'framer-motion';
import { GlowingText } from './ui/GlowingText';

export const Statistics: React.FC = () => {
  return (
    <Section className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Trusted by thousands of <GlowingText>developers</GlowingText>
          </h2>
          <p className="text-xl text-gray-300">
            Join the growing number of teams who rely on DPIN to keep their applications running smoothly.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          value="99.98%"
          label="Average Uptime"
          icon={<Activity className="h-5 w-5" />}
          valueColor="text-primary"
          delay={0}
        />
        <StatCard
          value="30s"
          label="Check Interval"
          icon={<Clock className="h-5 w-5" />}
          valueColor="text-secondary"
          delay={1}
        />
        <StatCard
          value="< 1s"
          label="Alert Time"
          icon={<Zap className="h-5 w-5" />}
          valueColor="text-accent"
          delay={2}
        />
        <StatCard
          value="10M+"
          label="Checks Per Day"
          icon={<Bell className="h-5 w-5" />}
          valueColor="text-primary"
          delay={3}
        />
      </div>

      <motion.div
        className="mt-20 p-8 rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">We monitor over 50,000 endpoints worldwide</h3>
            <p className="text-gray-300 mb-6">
              From small startups to large enterprises, thousands of companies trust DPIN to monitor their critical infrastructure.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Monitoring</span>
                <span className="text-sm text-primary">38%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '38%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Website Monitoring</span>
                <span className="text-sm text-secondary">42%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '42%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Monitoring</span>
                <span className="text-sm text-accent">12%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: '12%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Monitoring</span>
                <span className="text-sm text-primary">8%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              viewport={{ once: true }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-white/5 to-white/10 rounded-lg p-3 flex flex-col justify-between border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-400">Region {i + 1}</div>
                    <div className="text-sm">100%</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};