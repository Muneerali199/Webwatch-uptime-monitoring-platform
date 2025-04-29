"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Grid, List, Search, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import WebsiteCard from '../components/WebsiteCard'; // New component

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  uptime: number;
  responseTime: number;
  lastChecked: string;
  history: {
    timestamp: string;
    status: 'up' | 'down';
    responseTime: number;
  }[];
}

const WebsitesPage: React.FC = () => {
  // Initial mock data
  const initialWebsites: Website[] = [
    {
      id: '1',
      name: 'Google',
      url: 'https://google.com',
      status: 'up',
      uptime: 99.9,
      responseTime: 45,
      lastChecked: new Date().toISOString(),
      history: Array(30).fill(null).map((_, i) => ({
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        status: Math.random() > 0.1 ? 'up' : 'down',
        responseTime: Math.floor(Math.random() * 100) + 30
      }))
    },
    {
      id: '2',
      name: 'GitHub',
      url: 'https://github.com',
      status: 'up',
      uptime: 99.8,
      responseTime: 120,
      lastChecked: new Date().toISOString(),
      history: Array(30).fill(null).map((_, i) => ({
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        status: Math.random() > 0.05 ? 'up' : 'down',
        responseTime: Math.floor(Math.random() * 150) + 80
      }))
    },
    {
      id: '3',
      name: 'Twitter',
      url: 'https://twitter.com',
      status: 'down',
      uptime: 98.5,
      responseTime: 0,
      lastChecked: new Date().toISOString(),
      history: Array(30).fill(null).map((_, i) => ({
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        status: Math.random() > 0.15 ? 'up' : 'down',
        responseTime: Math.floor(Math.random() * 200) + 100
      }))
    }
  ];

  // State management
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null);
  const [newWebsite, setNewWebsite] = useState({ name: '', url: '' });
  const [formErrors, setFormErrors] = useState({ name: '', url: '' });
  const [isChecking, setIsChecking] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter websites based on search query
  const filteredWebsites = websites.filter(website => 
    website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Validate form inputs (real-time)
  useEffect(() => {
    const newErrors = { name: '', url: '' };
    if (newWebsite.name && !newWebsite.name.trim()) {
      newErrors.name = 'Website name is required';
    }
    if (newWebsite.url && !newWebsite.url.trim()) {
      newErrors.url = 'Website URL is required';
    } else if (newWebsite.url && !/^(?:https?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(newWebsite.url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    setFormErrors(newErrors);
  }, [newWebsite]);

  // Add a new website
  const handleAddWebsite = () => {
    if (formErrors.name || formErrors.url || !newWebsite.name || !newWebsite.url) return;

    const websiteUrl = newWebsite.url.startsWith('http') ? newWebsite.url : `https://${newWebsite.url}`;
    
    const newSite: Website = {
      id: Date.now().toString(),
      name: newWebsite.name,
      url: websiteUrl,
      status: 'checking',
      uptime: 0,
      responseTime: 0,
      lastChecked: new Date().toISOString(),
      history: []
    };
    
    setWebsites([...websites, newSite]);
    setNewWebsite({ name: '', url: '' });
    setFormErrors({ name: '', url: '' });
    setShowAddModal(false);
    setToast({ message: `${newWebsite.name} added successfully!`, type: 'success' });
    
    // Simulate checking the new website
    setTimeout(() => {
      setWebsites(prev => prev.map(w => 
        w.id === newSite.id ? { 
          ...w, 
          status: Math.random() > 0.2 ? 'up' : 'down',
          uptime: Math.random() > 0.2 ? 100 : 0,
          responseTime: Math.floor(Math.random() * 300) + 50,
          history: [{
            timestamp: new Date().toISOString(),
            status: Math.random() > 0.2 ? 'up' : 'down',
            responseTime: Math.floor(Math.random() * 300) + 50
          }]
        } : w
      ));
    }, 2000);

    // Clear toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  // Handle delete initiation
  const handleDelete = (website: Website) => {
    setWebsiteToDelete(website);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (websiteToDelete) {
      setWebsites(websites.filter(w => w.id !== websiteToDelete.id));
      setToast({ message: `${websiteToDelete.name} deleted successfully!`, type: 'success' });
      setShowDeleteModal(false);
      setWebsiteToDelete(null);
      
      // Clear toast after 3 seconds
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Check all websites status
  const checkAllWebsites = () => {
    setIsChecking(true);
    setWebsites(prev => prev.map(w => ({ ...w, status: 'checking' })));
    
    // Simulate API call to check websites
    setTimeout(() => {
      setWebsites(prev => prev.map(w => ({
        ...w,
        status: Math.random() > 0.1 ? 'up' : 'down',
        responseTime: Math.floor(Math.random() * 300) + 50,
        lastChecked: new Date().toISOString(),
        history: [
          {
            timestamp: new Date().toISOString(),
            status: Math.random() > 0.1 ? 'up' : 'down',
            responseTime: Math.floor(Math.random() * 300) + 50
          },
          ...w.history.slice(0, 29)
        ]
      })));
      setIsChecking(false);
      setToast({ message: 'All websites checked!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }, 2000);
  };

  // Handle clicks outside modals
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (showAddModal) {
          setShowAddModal(false);
          setNewWebsite({ name: '', url: '' });
          setFormErrors({ name: '', url: '' });
        } else if (showDeleteModal) {
          setShowDeleteModal(false);
          setWebsiteToDelete(null);
        }
      }
    };

    if (showAddModal || showDeleteModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddModal, showDeleteModal]);

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)] overflow-y-auto bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Website Monitoring</h1>
            <p className="text-sm text-gray-400 mt-1">
              Monitoring {websites.length} websites
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <SecondaryButton
              onClick={checkAllWebsites}
              disabled={isChecking}
              className="px-4 py-2 text-sm"
              icon={Loader2}
              iconPosition="left"
            >
              {isChecking ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isChecking ? 'Checking...' : 'Check All Status'}
            </SecondaryButton>
            
            <PrimaryButton
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-sm"
              icon={Plus}
              iconPosition="left"
            >
              Add Website
            </PrimaryButton>
          </div>
        </div>

        {/* Search and view controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search websites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-900/50 border border-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
              aria-label="Search websites"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-900/50 border border-gray-800 rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-md",
                  viewMode === 'grid' ? 'bg-gray-800/50 border border-gray-700' : 'hover:bg-gray-800/50'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5 text-gray-300" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-md",
                  viewMode === 'list' ? 'bg-gray-800/50 border border-gray-700' : 'hover:bg-gray-800/50'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="List view"
              >
                <List className="h-5 w-5 text-gray-300" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Websites list */}
        {viewMode === 'list' ? (
          <motion.div
            className="rounded-xl border border-gray-800 bg-gray-900/20 backdrop-blur-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900/50 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'url', label: 'URL' },
                    { key: 'status', label: 'Status' },
                    { key: 'uptime', label: 'Uptime' },
                    { key: 'responseTime', label: 'Response' }
                  ].map(({ key, label }) => (
                    <th 
                      key={key}
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 transition-colors"
                      onClick={() => {
                        let direction: 'asc' | 'desc' = 'asc';
                        if (sortConfig?.key === key && sortConfig.direction === 'asc') {
                          direction = 'desc';
                        }
                        setSortConfig({ key: key as keyof Website, direction });
                      }}
                    >
                      <div className="flex items-center">
                        {label}
                        {sortConfig?.key === key && (
                          sortConfig.direction === 'asc' ? 
                          <ChevronUp className="ml-1 h-4 w-4" /> : 
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredWebsites.map((website) => (
                  <WebsiteCard
                    key={website.id}
                    website={website}
                    onDelete={handleDelete}
                    viewMode="list"
                  />
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredWebsites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                onDelete={handleDelete}
                viewMode="grid"
              />
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {filteredWebsites.length === 0 && (
          <motion.div
            className="rounded-xl border border-gray-800 bg-gray-900/20 backdrop-blur-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-white">No websites found</h3>
            <p className="mt-1 text-sm text-gray-400">
              {searchQuery ? 'Try adjusting your search query' : 'Get started by adding a new website'}
            </p>
            <div className="mt-6">
              <PrimaryButton
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 text-sm"
                icon={Plus}
                iconPosition="left"
              >
                Add Website
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Add Website Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={modalRef}
                className="relative bg-gray-900/80 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-lg overflow-hidden w-full max-w-md"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Add New Website</h2>
                  <motion.button 
                    onClick={() => {
                      setShowAddModal(false);
                      setNewWebsite({ name: '', url: '' });
                      setFormErrors({ name: '', url: '' });
                    }}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="website-name" className="block text-sm font-medium text-gray-300 mb-1">
                        Website Name
                      </label>
                      <input
                        id="website-name"
                        type="text"
                        value={newWebsite.name}
                        onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                          formErrors.name ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                        )}
                        placeholder="My Website"
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? "website-name-error" : undefined}
                      />
                      {formErrors.name && (
                        <p id="website-name-error" className="mt-1 text-xs text-red-400">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="website-url" className="block text-sm font-medium text-gray-300 mb-1">
                        Website URL
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">https://</span>
                        <input
                          id="website-url"
                          type="text"
                          value={newWebsite.url.replace(/^https?:\/\//, '')}
                          onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                          className={cn(
                            "w-full px-4 py-2 pl-16 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                            formErrors.url ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                          )}
                          placeholder="example.com"
                          aria-invalid={!!formErrors.url}
                          aria-describedby={formErrors.url ? "website-url-error" : undefined}
                        />
                      </div>
                      {formErrors.url && (
                        <p id="website-url-error" className="mt-1 text-xs text-red-400">{formErrors.url}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton 
                    onClick={() => {
                      setShowAddModal(false);
                      setNewWebsite({ name: '', url: '' });
                      setFormErrors({ name: '', url: '' });
                    }}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton 
                    onClick={handleAddWebsite}
                    disabled={!!formErrors.name || !!formErrors.url || !newWebsite.name || !newWebsite.url}
                    className="px-4 py-2 text-sm"
                  >
                    Add Website
                  </PrimaryButton>
                </div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 animate-gradient"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && websiteToDelete && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={modalRef}
                className="relative bg-gray-900/80 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-lg overflow-hidden w-full max-w-md"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Delete Website</h2>
                  <motion.button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setWebsiteToDelete(null);
                    }}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-300">
                    Are you sure you want to delete <span className="font-semibold text-white">{websiteToDelete.name}</span>? This action cannot be undone.
                  </p>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setShowDeleteModal(false);
                      setWebsiteToDelete(null);
                    }}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={confirmDelete}
                    className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500"
                  >
                    Delete
                  </PrimaryButton>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500 animate-gradient"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-red-500/10 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className={cn(
                "fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white flex items-center gap-2",
                toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default WebsitesPage;