import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlowingTextProps {
  children: React.ReactNode;
  color?: string;
  glowColor?: string;
  className?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  animateGlow?: boolean;
}

export const GlowingText: React.FC<GlowingTextProps> = ({
  children,
  color = 'text-primary',
  glowColor = 'text-primary',
  className,
  glowIntensity = 'medium',
  animateGlow = false,
}) => {
  const getGlowSize = () => {
    switch (glowIntensity) {
      case 'low':
        return 'blur-[2px]';
      case 'high':
        return 'blur-[8px]';
      case 'medium':
      default:
        return 'blur-[4px]';
    }
  };

  const glowAnimation = animateGlow ? {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }
  } : {};

  return (
    <span className={cn('relative inline-block', className)}>
      <span className={cn('relative z-10', color)}>{children}</span>
      <motion.span
        className={cn('absolute inset-0 z-0 select-none', getGlowSize(), glowColor, 'opacity-50')}
        aria-hidden="true"
        {...glowAnimation}
      >
        {children}
      </motion.span>
    </span>
  );
};