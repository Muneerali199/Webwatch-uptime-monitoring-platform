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

type Tab = 'overview' | 'performance' | 'incidents';

interface Incident {
  website: string;
  timestamp: Date;
  duration: string;
}

const DashboardPage: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
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
  const modalRef = useRef<HTMLDivElement>(null);

  // Filtered websites
  const filteredWebsites = websites.filter(website => 
    website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Metrics calculations
  const totalWebsites = websites.length;
  const operationalWebsites = websites.filter(w => w.status === 'up').length;
  const averageUptime = websites.reduce((acc, site) => acc + site.uptime, 0) / totalWebsites;
  const totalIncidents = websites.reduce((acc, site) => 
    acc + site.history.filter(record => record.status === 'down').length, 0
  );

  // Performance data
  const performanceData = websites.map(website => ({
    name: website.name,
    responseTime: website.responseTime,
    uptime: website.uptime
  }));

  // Recent incidents
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
    .slice(0, 5);

  // Handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
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

  // Form validation and submission
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
          timestamp: new Date().toISOString(),
          status: 'up',
          responseTime: Math.floor(Math.random() * 200) + 100
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

  // Click outside handler
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

  // Tabs content
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
      {/* Header */}
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

      {/* Modals */}
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

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'performance', label: 'Performance', icon: LineChart },
          { id: 'incidents', label: 'Incidents', icon: AlertTriangle }
        ]}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as Tab)}
      />

      {/* Tab Content */}
      {renderTabContent()}

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      
      {/* Website Cards */}
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

      <Chatbot />
    </div>
  );
};

export default DashboardPage;