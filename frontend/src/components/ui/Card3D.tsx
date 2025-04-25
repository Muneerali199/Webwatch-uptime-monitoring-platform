import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
  glareColor?: string;
  glarePosition?: 'all' | 'top' | 'left' | 'right' | 'bottom';
}

export const Card3D: React.FC<Card3DProps> = ({ 
  children, 
  className = "", 
  tiltStrength = 20, 
  glareEnabled = true,
  glareColor = "rgba(255, 255, 255, 0.15)",
  glarePosition = 'all'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Calculate the glare gradient position based on mouse position
  const gradientX = useTransform(x, [-0.5, 0.5], ['100%', '0%']);
  const gradientY = useTransform(y, [-0.5, 0.5], ['100%', '0%']);
  
  let glareStyle = {};
  
  if (glareEnabled) {
    let gradientDirection = '';
    
    switch (glarePosition) {
      case 'top':
        gradientDirection = 'to bottom';
        break;
      case 'bottom':
        gradientDirection = 'to top';
        break;
      case 'left':
        gradientDirection = 'to right';
        break;
      case 'right':
        gradientDirection = 'to left';
        break;
      default:
        gradientDirection = 'to bottom right';
    }
    
    glareStyle = {
      background: `linear-gradient(${gradientDirection}, ${glareColor}, transparent 70%)`,
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      opacity: 0.5,
      mixBlendMode: 'overlay',
    };
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {glareEnabled && <div style={glareStyle} />}
      <div style={{ 
        position: 'relative',
        zIndex: 2,
        transform: 'translateZ(20px)', 
        transformStyle: 'preserve-3d',
      }}>
        {children}
      </div>
    </motion.div>
  );
};