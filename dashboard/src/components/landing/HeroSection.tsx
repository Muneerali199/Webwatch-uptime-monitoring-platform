"use client";

import { motion } from 'framer-motion';
import {  ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { GradientButton, GlassButton } from './Buttons';
import { SystemStatus } from './SystemStatus';
import { SkeletonLoader } from './SkeletonLoader';

export const HeroSection = ({ loading }: { loading: boolean }) => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <SkeletonLoader className="w-64 h-8" />
              <SkeletonLoader className="w-full h-16" />
              <SkeletonLoader className="w-3/4 h-6" />
              <div className="flex gap-4 mt-8">
                <SkeletonLoader className="w-32 h-12" />
                <SkeletonLoader className="w-32 h-12" />
              </div>
              <div className="flex flex-col gap-4 mt-12">
                <SkeletonLoader className="w-48 h-4" />
                <div className="flex gap-8">
                  {[1, 2, 3].map(i => <SkeletonLoader key={i} className="w-24 h-8" />)}
                </div>
              </div>
            </div>
            <SkeletonLoader className="w-full h-[500px] rounded-2xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8 text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Zap size={16} className="text-cyan-300" />
                <span>Real-time monitoring that never sleeps</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Know when your websites go down,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                  before your users do
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Real-time monitoring with instant notifications. Keep your online services reliable and your users happy.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <GradientButton 
                  icon={ArrowRight}
                  className="flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Monitoring
                </GradientButton>
                
                <GlassButton 
                  icon={ChevronRight}
                  className="flex-1"
                >
                  View Demo
                </GlassButton>
              </motion.div>
              
              <motion.div 
                className="flex flex-col gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="text-sm text-gray-400">Trusted by developers at:</div>
                <div className="flex gap-8 items-center">
                  {["TechCorp", "WebSolutions", "DigitalLabs"].map((company, i) => (
                    <motion.div 
                      key={i}
                      className="h-8 grayscale opacity-70 hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-white font-medium">{company}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <SystemStatus />
          </div>
        )}
      </div>
    </section>
  );
};