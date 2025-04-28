import React, { useState } from 'react';
import { Website } from '../types';
import { ChevronDown, ChevronUp, Clock, ExternalLink, BarChart2 } from 'lucide-react';

interface WebsiteCardProps {
  website: Website;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Format the last checked time
  const lastCheckedTime = new Date(website.lastChecked).toLocaleTimeString([], {
    hour: '2-digit', 
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      <div 
        className="p-4 cursor-pointer transition hover:bg-gray-50"
        onClick={toggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${website.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <h3 className="font-medium text-gray-900">{website.name}</h3>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 text-sm text-gray-500 hidden md:block">
              {lastCheckedTime}
            </div>
            <button 
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={toggleExpand}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center text-sm text-gray-500">
            <ExternalLink size={14} className="mr-1" />
            <a 
              href={website.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {website.url}
            </a>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-100 p-4 space-y-4 animate-expandDown">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</div>
              <div className={`font-medium ${website.status === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {website.status === 'up' ? 'Operational' : 'Down'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Uptime</div>
              <div className="font-medium text-gray-900">{website.uptime}%</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Response Time</div>
              <div className="font-medium text-gray-900">{website.responseTime > 0 ? `${website.responseTime}ms` : 'N/A'}</div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <Clock size={16} className="text-gray-500 mr-2" />
              <h4 className="font-medium text-gray-900">Last 30 minutes</h4>
            </div>
            
            <div className="flex items-center space-x-1">
              {website.history.map((record, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`h-16 w-4 rounded-sm ${record.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                    title={`${record.status === 'up' ? 'Online' : 'Offline'} at ${new Date(record.timestamp).toLocaleTimeString()}`}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(record.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-100">
            <a 
              href="#"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <BarChart2 size={16} className="mr-1" />
              View detailed monitoring report
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteCard;