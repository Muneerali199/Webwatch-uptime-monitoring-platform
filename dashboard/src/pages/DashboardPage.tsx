"use client";

import React, { useState, useEffect, useRef } from 'react';
import { mockWebsites } from '../data/mockData';
import WebsiteCard from '../components/WebsiteCard';
import { 
  Plus, LayoutDashboard, 
  Activity, AlertTriangle, LineChart,
  CheckCircle
} from 'lucide-react';
import { PrimaryButton } from '../components/Button';
import { AddWebsiteModal } from '../components/AddWebsiteModal';
import { DeleteModal } from '../components/DeleteModal';
import { MetricCards } from '../components/MetricCard';
import { PerformanceChart } from '../components/PerformanceChart';
import { IncidentsList } from '../components/IncidentsList';
import { Tabs } from '../components/Tabs';
import { SearchBar } from '../components/SearchBar';
import Chatbot from '../components/Chatbot';
import { Website } from '../types';

// Define types for better type safety
type Tab = 'overview' | 'performance' | 'incidents';

interface Incident {
  website: string;
  timestamp: Date;
  duration: string;
}

const DashboardPage: React.FC = () => {
  // State management for websites data
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI states
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // Add website modal states
  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    url: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    url: ''
  });
  
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null);
  
  // Ref for handling clicks outside modals
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter websites based on search query (name or URL)
  const filteredWebsites = websites.filter(website => 
    website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate dashboard metrics
  const totalWebsites = websites.length;
  const operationalWebsites = websites.filter(w => w.status === 'up').length;
  const averageUptime = websites.reduce((acc, site) => acc + site.uptime, 0) / totalWebsites;
  const totalIncidents = websites.reduce((acc, site) => 
    acc + site.history.filter(record => record.status === 'down').length, 0
  );

  // Prepare performance data for the chart
  const performanceData = websites.map(website => ({
    name: website.name,
    responseTime: website.responseTime,
    uptime: website.uptime
  }));

  // Get recent incidents from all websites
  const recentIncidents: Incident[] = websites
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
    .slice(0, 5); // Show only 5 most recent incidents

  // Handle refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh with timeout
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Handle delete website action
  const handleDeleteWebsite = (id: string) => {
    const website = websites.find(w => w.id === id);
    if (website) {
      setWebsiteToDelete(website);
      setIsDeleteModalOpen(true);
    }
  };

  // Confirm and execute website deletion
  const confirmDeleteWebsite = () => {
    if (websiteToDelete) {
      setWebsites(prev => prev.filter(website => website.id !== websiteToDelete.id));
      setIsDeleteModalOpen(false);
      setWebsiteToDelete(null);
    }
  };

  // Validate the add website form
  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      url: ''
    };

    // Check name field
    if (!newWebsite.name.trim()) {
      errors.name = 'Website name is required';
      isValid = false;
    }

    // Check URL field
    if (!newWebsite.url.trim()) {
      errors.url = 'Website URL is required';
      isValid = false;
    } else if (!isValidUrl(newWebsite.url)) {
      errors.url = 'Please enter a valid URL (include http:// or https://)';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Simple URL validation
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  // Add a new website to the list
  const handleAddWebsite = () => {
    if (!validateForm()) return;

    // Create new website object with mock data
    const newSite: Website = {
      id: `site-${Date.now()}`, // Generate unique ID
      name: newWebsite.name,
      url: newWebsite.url,
      status: 'up', // Default status
      uptime: 99.9, // Mock uptime
      responseTime: Math.floor(Math.random() * 200) + 100, // Random response time
      lastChecked: new Date().toISOString(),
      history: [{
        timestamp: new Date().toISOString(),
        status: 'up',
        responseTime: Math.floor(Math.random() * 200) + 100
      }]
    };

    // Add new website to the list
    setWebsites(prev => [...prev, newSite]);
    // Reset form
    setNewWebsite({ name: '', url: '' });
    // Close modal
    setIsAddWebsiteOpen(false);
  };

  // Handle input changes in the add website form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWebsite(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error if field is now valid
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle clicks outside modals to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <MetricCards
            metrics={[
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
            ]}
          />
        );

      case 'performance':
        return <PerformanceChart data={performanceData} />;

      case 'incidents':
        return <IncidentsList incidents={recentIncidents} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)] overflow-y-auto">
      {/* Header section with title and add button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
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

      {/* Modals for adding and deleting websites */}
      <AddWebsiteModal
        isOpen={isAddWebsiteOpen}
        onClose={() => setIsAddWebsiteOpen(false)}
        newWebsite={newWebsite}
        formErrors={formErrors}
        onInputChange={handleInputChange}
        onSubmit={handleAddWebsite}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setWebsiteToDelete(null);
        }}
        website={websiteToDelete}
        onConfirm={confirmDeleteWebsite}
      />

      {/* Tabs navigation */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'performance', label: 'Performance', icon: LineChart },
          { id: 'incidents', label: 'Incidents', icon: AlertTriangle }
        ]}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as Tab)}
      />

      {/* Tab content area */}
      {renderTabContent()}

      {/* Search and refresh controls */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      
      {/* List of website cards */}
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

      {/* Chatbot component */}
      <Chatbot />
    </div>
  );
};

export default DashboardPage;