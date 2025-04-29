"use client";

import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { LayoutDashboard, CheckCircle, Activity, AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, textColor }) => (
  <motion.div 
    className={cn(
      "rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300",
      "bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm",
      "hover:shadow-lg hover:shadow-blue-500/10 p-4"
    )}
    whileHover={{ y: -3 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-1">{title}</h3>
        <p className={cn("text-2xl font-bold", textColor)}>{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

interface MetricCardsProps {
  metrics: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    textColor: string;
  }[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics }) => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {metrics.map((metric, index) => (
      <MetricCard key={index} {...metric} />
    ))}
  </motion.div>
);