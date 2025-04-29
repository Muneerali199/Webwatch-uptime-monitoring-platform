"use client";

import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={cn(
          "flex items-center px-3 py-1.5 rounded-md transition-all text-xs font-medium",
          activeTab === tab.id
            ? "bg-blue-600/10 text-blue-400 border border-blue-500/30"
            : "bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300"
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <tab.icon size={14} className="mr-1.5" />
        {tab.label}
      </motion.button>
    ))}
  </div>
);