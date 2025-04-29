"use client";

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export const StatusIndicator = ({ status }: { status: 'operational' | 'degraded' | 'down' }) => {
  const statusConfig = {
    operational: {
      color: 'bg-green-500',
      pulseColor: 'bg-green-400',
      icon: <CheckCircle size={16} className="text-green-400" />,
      label: 'Operational'
    },
    degraded: {
      color: 'bg-yellow-500',
      pulseColor: 'bg-yellow-400',
      icon: <AlertTriangle size={16} className="text-yellow-400" />,
      label: 'Degraded'
    },
    down: {
      color: 'bg-red-500',
      pulseColor: 'bg-red-400',
      icon: <AlertTriangle size={16} className="text-red-400" />,
      label: 'Down'
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative flex items-center justify-center">
        <span className={`absolute h-3 w-3 rounded-full ${config.pulseColor} opacity-75 animate-ping`}></span>
        <span className={`relative h-2.5 w-2.5 rounded-full ${config.color}`}></span>
      </div>
      <span className="text-sm font-medium text-gray-300">{config.label}</span>
    </motion.div>
  );
};