
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { mockWebsites } from '../data/mockData';
import WebsiteCard from '../components/WebsiteCard';
import { 
  Plus, Search, Filter, RefreshCw, LayoutDashboard, 
  Activity, AlertTriangle, LineChart, ChevronRight,
  CheckCircle, X
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
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

type Tab = 'overview' | 'performance' | 'incidents';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  MotionProps & {
    className?: string;
    icon?: React.ComponentType<{ size?: string | number; className?: string }>;
    iconPosition?: 'left' | 'right';
  };

type Website = {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down';
  uptime: number;
  responseTime: number;
  lastChecked: string;
  history: Array<{
    timestamp: number;
    status: 'up' | 'down';
  }>;
};

const DashboardPage: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    url: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    url: ''
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const botResponses = [
    "I'm analyzing your website data now...",
    "Your performance metrics look good overall!",
    "I've detected 3 incidents that need attention.",
    "Would you like me to generate a detailed report?",
    "Your average uptime is 99.8% - excellent!",
    "Response times could be improved for 2 of your sites.",
    "I recommend checking the server configuration for example.com",
    "All monitored websites are currently operational.",
    "The last incident was resolved 2 hours ago.",
    "Would you like me to set up alerts for downtime?"
  ];

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
          duration: '5 minutes'
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

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {text: inputMessage, sender: 'user' as const};
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsBotTyping(true);
    
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, {text: randomResponse, sender: 'bot'}]);
      setIsBotTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDeleteWebsite = (id: string) => {
    const website = websites.find(w => w.id === id);
    if (website) {
      setWebsiteToDelete(website);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteWebsite = () => {
    if (websiteToDelete) {
      setWebsites(prev => prev.filter(website => website.id !== websiteToDelete.id));
      setIsDeleteModalOpen(false);
      setWebsiteToDelete(null);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (isAddWebsiteOpen) {
          setIsAddWebsiteOpen(false);
        } else if (isDeleteModalOpen) {
          setIsDeleteModalOpen(false);
          setWebsiteToDelete(null);
        }
      }
    };

    if (isAddWebsiteOpen || isDeleteModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddWebsiteOpen, isDeleteModalOpen]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      url: ''
    };

    if (!newWebsite.name.trim()) {
      newErrors.name = 'Website name is required';
      valid = false;
    }

    if (!newWebsite.url.trim()) {
      newErrors.url = 'Website URL is required';
      valid = false;
    } else if (!isValidUrl(newWebsite.url)) {
      newErrors.url = 'Please enter a valid URL (include http:// or https://)';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleAddWebsite = () => {
    if (!validateForm()) return;

    const newSite: Website = {
      id: `site-${Date.now()}`,
      name: newWebsite.name,
      url: newWebsite.url,
      status: 'up',
      uptime: 99.9,
      responseTime: Math.floor(Math.random() * 200) + 100,
      lastChecked: new Date().toISOString(),
      history: [
        {
          timestamp: Date.now(),
          status: 'up'
        }
      ]
    };

    setWebsites(prev => [...prev, newSite]);
    setNewWebsite({ name: '', url: '' });
    setIsAddWebsiteOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWebsite(prev => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const PrimaryButton: React.FC<ButtonProps> = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    ...props 
  }) => (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2 px-6 py-3",
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute -inset-8 bg-gradient-to-r from-white/20 via-white/50 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
      </span>
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );

  const SecondaryButton: React.FC<ButtonProps> = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    ...props 
  }) => (
    <motion.button
      className={cn(
        "relative group overflow-hidden rounded-xl font-medium",
        "bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 hover:border-gray-600",
        "text-white shadow-lg hover:shadow-xl transition-all duration-300",
        "flex items-center justify-center gap-2 px-6 py-3",
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.button>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { 
                title: "Total Websites", 
                value: totalWebsites, 
                icon: <LayoutDashboard className="text-blue-400" size={18} />,
                color: "bg-blue-500/10",
                textColor: "text-blue-400"
              },
              { 
                title: "Operational", 
                value: operationalWebsites, 
                icon: <CheckCircle className="text-green-400" size={18} />,
                color: "bg-green-500/10",
                textColor: "text-green-400"
              },
              { 
                title: "Avg Uptime", 
                value: `${averageUptime.toFixed(2)}%`, 
                icon: <Activity className="text-indigo-400" size={18} />,
                color: "bg-indigo-500/10",
                textColor: "text-indigo-400"
              },
              { 
                title: "Incidents", 
                value: totalIncidents, 
                icon: <AlertTriangle className="text-red-400" size={18} />,
                color: "bg-red-500/10",
                textColor: "text-red-400"
              }
            ].map((metric, index) => (
              <motion.div 
                key={index}
                className={cn(
                  "rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300",
                  "bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm",
                  "hover:shadow-lg hover:shadow-blue-500/10 p-4"
                )}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-1">{metric.title}</h3>
                    <p className={cn("text-2xl font-bold", metric.textColor)}>{metric.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${metric.color}`}>
                    {metric.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'performance':
        return (
          <motion.div 
            className="rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Response Times</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      borderColor: '#374151',
                      borderRadius: '0.5rem',
                      fontSize: '12px'
                    }}
                    itemStyle={{ color: '#E5E7EB', fontSize: '12px' }}
                    labelStyle={{ color: '#9CA3AF', fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Response Time (ms)"
                    dot={{ fill: '#1E40AF', strokeWidth: 2, r: 3 }}
                    activeDot={{ fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2, r: 5 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        );

      case 'incidents':
        return (
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
              {recentIncidents.map((incident, index) => (
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
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">
            Monitor your website performance and incidents
          </p>
        </div>
        <PrimaryButton 
          icon={Plus} 
          className="text-sm"
          onClick={() => setIsAddWebsiteOpen(true)}
        >
          Add Website
        </PrimaryButton>
      </div>

      {/* Add Website Modal */}
      <AnimatePresence>
        {isAddWebsiteOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="DEEDEDrelative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Add New Website</h2>
                <button 
                  onClick={() => setIsAddWebsiteOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Website Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newWebsite.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${formErrors.name ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white outline-none transition-all`}
                      placeholder="My Awesome Site"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
                      Website URL
                    </label>
                    <input
                      type="text"
                      id="url"
                      name="url"
                      value={newWebsite.url}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${formErrors.url ? 'border-red-500' : 'border-gray-700'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white outline-none transition-all`}
                      placeholder="https://example.com"
                    />
                    {formErrors.url && (
                      <p className="mt-1 text-xs text-red-400">{formErrors.url}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                <SecondaryButton 
                  onClick={() => setIsAddWebsiteOpen(false)}
                  className="px-4 py-2 text-sm"
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton 
                  onClick={handleAddWebsite}
                  className="px-4 py-2 text-sm"
                >
                  Add Website
                </PrimaryButton>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && websiteToDelete && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Delete Website</h2>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setWebsiteToDelete(null);
                  }}
                  className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-300">
                  Are you sure you want to delete <span className="font-semibold text-white">{websiteToDelete.name}</span>? This action cannot be undone.
                </p>
              </div>
              <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                <SecondaryButton
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setWebsiteToDelete(null);
                  }}
                  className="px-4 py-2 text-sm"
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={confirmDeleteWebsite}
                  className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500"
                >
                  Delete
                </PrimaryButton>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-red-500/10 blur-3xl"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'performance', label: 'Performance', icon: LineChart },
          { id: 'incidents', label: 'Incidents', icon: AlertTriangle }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
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

      {renderTabContent()}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search websites..."
            className="block w-full pl-9 pr-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-/AVI900 border border-gray-700 text-sm text-white placeholder-gray-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <SecondaryButton icon={Filter} className="text-sm px-4 py-2">
            Filter
          </SecondaryButton>
          <SecondaryButton 
            icon={RefreshCw}
            onClick={handleRefresh}
            className="text-sm px-4 py-2"
          >
            <RefreshCw size={14} className={`mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </SecondaryButton>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredWebsites.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm p-6 text-center text-sm text-gray-500">
            No websites found matching your search.
          </div>
        ) : (
          filteredWebsites.map(website => (
            <WebsiteCard 
              key={website.id} 
              website={website} 
              compact 
              onDelete={handleDeleteWebsite}
            />
          ))
        )}
      </div>

      {/* Enhanced 3D Interactive Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <motion.div
            className="relative w-80 h-96 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="flex-1 rounded-t-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl overflow-hidden flex flex-col">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <div className="w-4 h-4 flex">
                        <div className="w-1 h-1 bg-white rounded-full mr-1 animate-blink"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-blink" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium">Monitoring Assistant</span>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-8">
                    Ask me about your website monitoring data
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`max-w-xs rounded-2xl px-4 py-2 ${message.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-700 text-white rounded-bl-none'}`}>
                        {message.text}
                      </div>
                    </motion.div>
                  ))
                )}
                {isBotTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gray-700 text-white rounded-2xl rounded-bl-none px-4 py-2 flex space-x-1 items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-3 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 rounded-full bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 px-4 py-2 text-sm text-white outline-none transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ''}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all ${
                      inputMessage.trim() === '' 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute -inset-1 rounded-2xl border border-blue-400/30 transform rotate-1 -z-10"></div>
            <div className="absolute -inset-2 rounded-2xl border border-blue-400/20 transform rotate-3 -z-20"></div>
            <div className="absolute -inset-3 rounded-2xl border border-blue-400/10 transform rotate-6 -z-30"></div>
          </motion.div>
        ) : (
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10 pointer-events-none"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  top: `${Math.random() * 60 - 30}px`,
                  left: `${Math.random() * 60 - 30}px`,
                }}
                animate={{
                  y: [0, Math.random() * 40 - 20],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            ))}
            
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
            
            <motion.div
              className="relative w-20 h-20 cursor-pointer"
              onClick={() => setIsChatOpen(true)}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <div className="relative w-8 h-8">
                    <div className="absolute top-1 left-0 w-2 h-2 bg-white rounded-full flex justify-between">
                      <div className="w-1 h-1 bg-blue-800 rounded-full animate-blink"></div>
                      <div className="w-1 h-1 bg-blue-800 rounded-full animate-blink" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <motion.div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-blue-800 rounded-b-full"
                      animate={{
                        height: [1.5, 0.5, 1.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    ></motion.div>
                  </div>
                  
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/30"
                      style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, Math.random() * 10 - 5],
                        x: [0, Math.random() * 10 - 5],
                      }}
                      transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
                
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white/10 rounded-tl-full pointer-events-none"></div>
                
                <div className="absolute top-2 right-2 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
              </div>
              
              <motion.div
                className="absolute -inset-4 rounded-full border border-white/20 pointer-events-none"
                animate={{
                  rotateZ: 360,
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
