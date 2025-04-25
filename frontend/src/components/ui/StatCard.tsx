import React from 'react';
import { motion } from 'framer-motion';
import { Card3D } from './Card3D';
import { GlowingText } from './GlowingText';
import { cn } from '../../lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  valueColor?: string;
  className?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  valueColor = 'text-primary',
  className,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Card3D 
        className={cn(
          "bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-white/5",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">
            {label}
          </span>
          {icon && (
            <span className="text-gray-400">
              {icon}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <GlowingText color={valueColor} className="text-3xl md:text-4xl font-bold">
            {value}
          </GlowingText>
        </div>
      </Card3D>
    </motion.div>
  );
};