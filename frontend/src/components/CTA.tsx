import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { GlowingText } from './ui/GlowingText';

export const CTA: React.FC = () => {
  return (
    <Section className="py-24">
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Background gradient and effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-secondary/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 p-8 md:p-16 border border-white/10 backdrop-blur-sm rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start monitoring your applications <GlowingText>today</GlowingText>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who trust DPIN to keep their services online. 
              Get started with a 14-day free trial, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" glowing>
                Start Free Trial
                <ArrowRight size={18} />
              </Button>
              <Button variant="default" size="xl">
                View Demo
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-gray-400">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};