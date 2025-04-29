"use client";

import { Search, Filter, RefreshCw } from 'lucide-react'; // Added Filter and RefreshCw imports
import { SecondaryButton } from './Button';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onRefresh,
  isRefreshing,
}) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Search websites..."
        className="block w-full pl-9 pr-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border border-gray-700 text-sm text-white placeholder-gray-500 transition-all"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
    
    <div className="flex space-x-2">
      <SecondaryButton icon={Filter} className="text-sm px-4 py-2">
        Filter
      </SecondaryButton>
      <SecondaryButton 
        onClick={onRefresh}
        className="text-sm px-4 py-2"
      >
        <RefreshCw size={14} className={`mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh
      </SecondaryButton>
    </div>
  </div>
);