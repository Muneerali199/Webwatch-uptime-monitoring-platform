import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const cubeVariants = {
    animate: {
      rotateX: [0, 360],
      rotateY: [0, 360],
      rotateZ: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: 'easeInOut',
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.5, 0.2],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  const particleVariants = {
    animate: {
      y: [0, Math.random() * 200 - 100],
      x: [0, Math.random() * 200 - 100],
      opacity: [0, 0.7, 0],
      scale: [0.5, 1.5, 0.5],
      transition: {
        duration: Math.random() * 4 + 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 1.5,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 overflow-hidden">
      <div className="relative flex flex-col items-center justify-center perspective-1000">
        {/* 3D Cube Cluster */}
        <div className="relative w-48 h-48">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-lg bg-gradient-to-br from-blue-500/50 to-purple-500/50 border border-blue-400/30 shadow-2xl"
              style={{
                width: `${60 - i * 10}px`,
                height: `${60 - i * 10}px`,
                left: `calc(50% - ${30 - i * 5}px)`,
                top: `calc(50% - ${30 - i * 5}px)`,
                transformStyle: 'preserve-3d',
              }}
              variants={cubeVariants}
              animate="animate"
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              transition={{
                delay: i * 0.3,
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Inner Glow */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-blue-600/20 blur-md"
                variants={glowVariants}
                animate="animate"
              />
              {/* Sparkle Effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="h-4 w-4 text-white/80" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="mt-12 flex items-center space-x-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Sparkles className="h-6 w-6 text-purple-300 animate-pulse" />
          <span className="text-2xl font-bold text-white tracking-wider drop-shadow-lg">
            Powering Up...
          </span>
          <Sparkles className="h-6 w-6 text-purple-300 animate-pulse" />
        </motion.div>

        {/* Dynamic Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
          />
        ))}

        {/* Ambient Glow Effects */}
        <motion.div
          className="absolute -inset-20 bg-blue-500/10 rounded-full blur-3xl"
          style={{ width: '400px', height: '400px' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -inset-20 bg-purple-500/10 rounded-full blur-3xl"
          style={{ width: '400px', height: '400px' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Background Light Rays */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '-100%',
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;