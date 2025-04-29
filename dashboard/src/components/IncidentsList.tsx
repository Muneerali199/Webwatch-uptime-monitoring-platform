"use client";

import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface Incident {
  website: string;
  timestamp: Date;
  duration: string;
}

interface IncidentsListProps {
  incidents: Incident[];
}

export const IncidentsList: React.FC<IncidentsListProps> = ({ incidents }) => (
  <motion.div 
    className="rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm p-4 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-white">Recent Incidents</h3>
      <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
        View all <ChevronRight size={14} className="ml-1" />
      </button>
    </div>
    <div className="space-y-2">
      {incidents.map((incident, index) => (
        <motion.div 
          key={index} 
          className="flex items-center justify-between p-3 rounded-md bg-gradient-to-r from-red-900/30 to-red-900/10 border border-red-900/30 hover:border-red-900/50 transition-all"
          whileHover={{ x: 3 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-red-500/10">
              <AlertTriangle size={16} className="text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{incident.website}</p>
              <p className="text-xs text-gray-400">
                {incident.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <span className="text-red-400">{incident.duration}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);