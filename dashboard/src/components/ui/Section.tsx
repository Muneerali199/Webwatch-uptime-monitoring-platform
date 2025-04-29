import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  fullWidth = false,
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-20 relative',
        className
      )}
    >
      <div className={fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-6'}>
        {children}
      </div>
    </section>
  );
};

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div 
      className={cn('max-w-3xl mb-16', alignClasses[align], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <h2 className={cn('text-3xl md:text-5xl font-bold mb-4 tracking-tight', titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-xl text-gray-300', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};