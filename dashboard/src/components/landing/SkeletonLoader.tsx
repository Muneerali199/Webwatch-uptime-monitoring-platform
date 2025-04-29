"use client";


import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const SkeletonLoader = ({ className = '' }: { className?: string }) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900/20 via-black/20 to-gray-900/20",
        "backdrop-blur-2xl border border-cyan-500/30",
        "animate-pulse perspective-1500 transform-style-preserve-3d",
        className
      )}
      initial={{ scale: 0.95, opacity: 0.7 }}
      animate={{
        scale: [0.95, 1, 0.95],
        opacity: [0.7, 1, 0.7],
        rotateX: [0, 5, 0],
        rotateY: [0, 5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Glowing Border */}
      <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-cyan-500/50 via-purple-500/50 to-magenta-500/50 pointer-events-none animate-shimmer-border" />
      
      {/* Starry Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-twinkle" style={{ top: '20%', left: '25%' }} />
        <div className="absolute w-1 h-1 bg-cyan-200 rounded-full opacity-40 animate-twinkle-delayed" style={{ top: '60%', left: '70%' }} />
        <div className="absolute w-2 h-2 bg-magenta-200 rounded-full opacity-35 animate-twinkle" style={{ top: '35%', left: '85%' }} />
      </div>
      
      {/* Comet Streak */}
      <div className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-25 animate-comet" style={{ top: '50%', left: '-10%' }} />
      
      {/* Nebula Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 to-transparent opacity-50 pointer-events-none animate-pulse-slow" />
      
      {/* Shimmering Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      {/* Glowing Shadow */}
      <div className="absolute inset-0 shadow-3xl shadow-cyan-500/40 rounded-xl" />
    </motion.div>
  );
};

<style jsx global>{`
  .perspective-1500 {
    transform-style: preserve-3d;
    perspective: 1500px;
  }
  .shadow-3xl {
    box-shadow: 0 25px 50px -12px rgba(0, 255, 255, 0.3);
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes shimmer-border {
    0% { background-position: 0% 50%; }
    100% { background-position: 400% 50%; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.5); }
  }
  @keyframes twinkle-delayed {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.4); }
  }
  @keyframes comet {
    0% { transform: translateX(-100%) rotate(45deg); opacity: 0; }
    50% { opacity: 0.25; }
    100% { transform: translateX(200%) rotate(45deg); opacity: 0; }
  }
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.3; }
  }
  .animate-shimmer {
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite linear;
  }
  .animate-shimmer-border {
    background-size: 400% 100%;
    animation: shimmer-border 6s linear infinite;
  }
  .animate-twinkle {
    animation: twinkle 2.5s infinite ease-in-out;
  }
  .animate-twinkle-delayed {
    animation: twinkle-delayed 3.5s infinite ease-in-out;
  }
  .animate-comet {
    animation: comet 5s infinite linear;
  }
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
`}</style>