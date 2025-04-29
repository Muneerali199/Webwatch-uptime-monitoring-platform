"use client";

import { motion } from 'framer-motion';
import { PrimaryButton, OutlineButton } from './Buttons';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const CtaSection = ({ loading }: { loading: boolean }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900/70 to-indigo-900/70 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />
      <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.6) 0%, transparent 70%)',
          filter: 'blur(120px)'
        }}
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        {loading ? (
          <>
            <div className="w-3/4 h-12 mx-auto mb-6 bg-gray-800 rounded animate-pulse" />
            <div className="w-1/2 h-6 mx-auto mb-8 bg-gray-800 rounded animate-pulse" />
            <div className="w-48 h-12 mx-auto bg-gray-800 rounded animate-pulse" />
          </>
        ) : (
          <>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Start monitoring your websites{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                today
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Join thousands of companies that trust our platform to keep their services reliable.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center gap-4"
            >
              <PrimaryButton 
                icon={ArrowRight}
                size="lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </PrimaryButton>
              
              <OutlineButton 
                icon={ChevronRight}
                size="lg"
              >
                Schedule Demo
              </OutlineButton>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};