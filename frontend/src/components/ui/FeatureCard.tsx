import React from 'react';
import { Card3D } from './Card3D';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
  iconClassName,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Card3D className={cn("bg-card/50 backdrop-blur-sm border border-primary/10 p-6 rounded-xl", className)}>
        <div className="flex flex-col gap-4">
          <div className={cn("rounded-full w-12 h-12 flex items-center justify-center", iconClassName || "bg-primary/10")}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </Card3D>
    </motion.div>
  );
};