"use client";

import { motion } from "framer-motion";

import { cn } from "../../lib/utils";
import { ButtonProps } from "../../types";

export const PrimaryButton = ({ 
  children, 
  className = '', 
  icon: Icon,
  iconPosition = 'right',
  size = 'default',
  ...props 
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2",
        sizeClasses[size],
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute -inset-8 bg-gradient-to-r from-white/20 via-white/50 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
      </span>
      
      <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <span className="absolute inset-0 rounded-xl border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300" />
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );
};

export const SecondaryButton = ({ 
  children, 
  className = '', 
  icon: Icon,
  iconPosition = 'right',
  size = 'default',
  ...props 
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 hover:border-gray-600",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2",
        sizeClasses[size],
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute -inset-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
      </span>
      
      <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <span className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300" />
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );
};

export const OutlineButton = ({ 
  children, 
  className = '', 
  icon: Icon,
  iconPosition = 'right',
  size = 'default',
  ...props 
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-transparent border-2 border-blue-400/30 hover:border-blue-400/60",
        "text-blue-400 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2",
        sizeClasses[size],
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <span className="absolute inset-0 rounded-xl border-2 border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-300" />
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );
};

export const GradientButton = ({ 
  children, 
  className = '', 
  icon: Icon,
  iconPosition = 'right',
  size = 'default',
  ...props 
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2",
        sizeClasses[size],
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <span className="absolute -inset-8 bg-gradient-to-r from-white/20 via-white/50 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
      
      <span className="absolute inset-0 rounded-xl border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300" />
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );
};

export const GlassButton = ({ 
  children, 
  className = '', 
  icon: Icon,
  iconPosition = 'right',
  size = 'default',
  ...props 
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2",
        sizeClasses[size],
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <span className="absolute -inset-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );
};