"use client";

import React, { useState } from 'react';
import { Website } from '../types';
import { ChevronDown, ChevronUp, Clock, ExternalLink, BarChart2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { SecondaryButton } from './Button'; // Assuming you extract SecondaryButton to a separate file

interface WebsiteCardProps {
  website: Website;
  compact?: boolean;
  onDelete?: (id: string) => void; // Add onDelete prop
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, compact = false, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const lastCheckedTime = new Date(website.lastChecked).toLocaleTimeString([], {
    hour: '2-digit', 
    minute: '2-digit'
  });

  return (
    <motion.div 
      className={cn(
        "rounded-lg border border-gray-800 overflow-hidden transition-all duration-300",
        "bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm",
        !compact && "hover:shadow-lg hover:shadow-blue-500/10",
        compact ? "p-3" : "p-4"
      )}
      whileHover={!compact ? { y: -2 } : {}}
    >
      <div 
        className="cursor-pointer transition"
        onClick={toggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${website.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div className={`absolute inset-0 rounded-full opacity-75 animate-ping ${website.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <h3 className="font-medium text-white">{website.name}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            {!compact && (
              <div className="text-xs text-gray-400 hidden md:block">
                <Clock size={12} className="inline mr-1" />
                {lastCheckedTime}
              </div>
            )}
            {onDelete && (
              <SecondaryButton 
                icon={X}
                className="p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(website.id);
                }}
                title="Delete website"
              />
            )}
            <button 
              className="p-1 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center text-xs text-gray-400">
            <ExternalLink size={12} className="mr-1" />
            <a 
              href={website.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 truncate transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {website.url.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <motion.div 
          className="pt-4 space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={cn(
            "grid gap-3",
            compact ? "grid-cols-2" : "grid-cols-1 md:grid-cols-3"
          )}>
            <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-700">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</div>
              <div className={`font-medium ${website.status === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {website.status === 'up' ? 'Operational' : 'Down'}
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-700">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Uptime</div>
              <div className="font-medium text-white">{website.uptime}%</div>
            </div>
            
            <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-700">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Response Time</div>
              <div className="font-medium text-white">
                {website.responseTime > 0 ? `${website.responseTime}ms` : 'N/A'}
              </div>
            </div>
          </div>
          
          {!compact && (
            <>
              <div>
                <div className="flex items-center mb-2">
                  <Clock size={14} className="text-gray-400 mr-2" />
                  <h4 className="font-medium text-white text-sm">Recent Status</h4>
                </div>
                
                <div className="flex items-end space-x-1 h-20">
                  {website.history.map((record, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <motion.div 
                        className={cn(
                          "w-3 rounded-t-sm",
                          record.status === 'up' ? 'bg-green-500' : 'bg-red-500',
                          "hover:bg-opacity-80 transition-colors"
                        )}
                        style={{ height: `${Math.random() * 40 + 20}px` }}
                        title={`${record.status === 'up' ? 'Online' : 'Offline'} at ${new Date(record.timestamp).toLocaleTimeString()}`}
                        whileHover={{ scaleY: 1.1 }}
                      />
                      <div className="text-[10px] text-gray-500 mt-1">
                        {new Date(record.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-800">
                <a 
                  href="#"
                  className="flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BarChart2 size={14} className="mr-1.5" />
                  View detailed monitoring report
                </a>
              </div>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default WebsiteCard;