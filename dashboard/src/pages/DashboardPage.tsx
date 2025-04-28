import React, { useState } from 'react';
import { mockWebsites } from '../data/mockData';
import WebsiteCard from '../components/WebsiteCard';
import Chatbot from '../components/Chatbot';
import { 
  Plus, Search, Filter, RefreshCw, LayoutDashboard, 
  Activity, AlertTriangle, LineChart 
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

type Tab = 'overview' | 'performance' | 'incidents';

const DashboardPage: React.FC = () => {
  const [websites] = useState(mockWebsites);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const filteredWebsites = websites.filter(website => 
    website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalWebsites = websites.length;
  const operationalWebsites = websites.filter(w => w.status === 'up').length;
  const averageUptime = websites.reduce((acc, site) => acc + site.uptime, 0) / totalWebsites;
  const totalIncidents = websites.reduce((acc, site) => 
    acc + site.history.filter(record => record.status === 'down').length, 0
  );

  const performanceData = websites.map(website => ({
    name: website.name,
    responseTime: website.responseTime,
    uptime: website.uptime
  }));

  const recentIncidents = websites
    .flatMap(website => 
      website.history
        .filter(record => record.status === 'down')
        .map(record => ({
          website: website.name,
          timestamp: new Date(record.timestamp),
          duration: '5 minutes' // Mock duration
        }))
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Websites</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalWebsites}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Operational</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{operationalWebsites}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Uptime</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{averageUptime.toFixed(2)}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Incidents</h3>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{totalIncidents}</p>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Response Time Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#2563eb" 
                    name="Response Time (ms)" 
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'incidents':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Recent Incidents</h3>
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{incident.website}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Duration: {incident.duration}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {incident.timestamp.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor your website performance and incidents
          </p>
        </div>
        <button 
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add Website
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <LayoutDashboard size={18} className="mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'performance'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <LineChart size={18} className="mr-2" />
          Performance
        </button>
        <button
          onClick={() => setActiveTab('incidents')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'incidents'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <AlertTriangle size={18} className="mr-2" />
          Incidents
        </button>
      </div>

      {renderTabContent()}

      <div className="mt-8 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search websites..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button 
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={handleRefresh}
          >
            <RefreshCw size={18} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="space-y-4 mt-6">
        {filteredWebsites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center text-gray-500 dark:text-gray-400">
            No websites found matching your search.
          </div>
        ) : (
          filteredWebsites.map(website => (
            <WebsiteCard key={website.id} website={website} />
          ))
        )}
      </div>

      <Chatbot />
    </div>
  );
};

export default DashboardPage;