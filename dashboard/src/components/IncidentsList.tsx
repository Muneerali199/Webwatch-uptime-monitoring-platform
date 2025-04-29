
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
    className="rounded-xl border border-blue-900/50 bg-black p-6 mb-6"
    style={{ background: '#000000' }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-white">Recent Incidents</h3>
      <motion.button 
        className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View all 
        <ChevronRight size={16} className="ml-1" />
      </motion.button>
    </div>

    {/* Incident List */}
    <div className="space-y-3">
      {incidents.map((incident, index) => (
        <motion.div 
          key={index} 
          className="flex items-center justify-between p-3 rounded-md bg-black border border-red-900/50 hover:border-red-900/70 glow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-red-900/20">
              <AlertTriangle size={16} className="text-red-400 glow" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{incident.website}</p>
              <p className="text-xs text-gray-300">
                {incident.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="text-xs font-medium text-red-400 glow">
            {incident.duration}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Custom CSS for Minimal Glow */}
    <style>{`
      .glow {
        filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.5));
      }
    `}</style>
  </motion.div>
);
