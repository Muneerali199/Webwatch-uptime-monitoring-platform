import React from 'react';
  import { motion, MotionProps } from 'framer-motion';
  import { cn } from '../lib/utils';

  type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
    MotionProps & {
      className?: string;
      icon?: React.ComponentType<{ size?: number; className?: string }>;
      iconPosition?: 'left' | 'right';
    };

  export const PrimaryButton: React.FC<ButtonProps> = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    ...props 
  }) => (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2 px-6 py-3",
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute -inset-8 bg-gradient-to-r from-white/20 via-white/50 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
      </span>
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );

  export const SecondaryButton: React.FC<ButtonProps> = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    ...props 
  }) => (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 hover:border-gray-600",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2 px-6 py-3",
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );