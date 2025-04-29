import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  icon: Icon,
  iconColor,
  children,
  className
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-xl border border-gray-800 bg-gray-900/20 backdrop-blur-lg overflow-hidden hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all",
        className
      )}
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5 bg-gray-900/50 flex items-center space-x-3 border-b border-gray-800">
        <Icon className={cn(iconColor)} size={20} />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="p-5">
        {children}
      </div>
    </motion.div>
  );
};

export default SettingsCard;