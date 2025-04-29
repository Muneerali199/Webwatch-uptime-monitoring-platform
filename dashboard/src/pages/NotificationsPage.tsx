"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import NotificationChannelCard from '../components/NotificationChannelCard';

interface NotificationChannel {
  id: string;
  type: 'email' | 'sms' | 'call' | 'slack';
  label: string;
  config: { value: string }; // e.g., email address, phone number, Slack webhook
  enabled: boolean;
}

const NotificationsPage: React.FC = () => {
  // Initial mock data
  const initialChannels: NotificationChannel[] = [
    {
      id: '1',
      type: 'email',
      label: 'Email Notifications',
      config: { value: 'user@example.com' },
      enabled: true
    },
    {
      id: '2',
      type: 'sms',
      label: 'SMS Notifications',
      config: { value: '+1234567890' },
      enabled: false
    },
    {
      id: '3',
      type: 'call',
      label: 'Phone Calls',
      config: { value: '+1234567890' },
      enabled: false
    },
    {
      id: '4',
      type: 'slack',
      label: 'Slack Notifications',
      config: { value: 'https://hooks.slack.com/services/xxx' },
      enabled: true
    }
  ];

  // State management
  const [channels, setChannels] = useState<NotificationChannel[]>(initialChannels);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingChannel, setEditingChannel] = useState<NotificationChannel | null>(null);
  const [formData, setFormData] = useState({
    type: 'email' as 'email' | 'sms' | 'call' | 'slack',
    label: '',
    configValue: ''
  });
  const [formErrors, setFormErrors] = useState({ label: '', configValue: '' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [channelToDelete, setChannelToDelete] = useState<NotificationChannel | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Real-time form validation
  useEffect(() => {
    const newErrors = { label: '', configValue: '' };
    if (formData.label && !formData.label.trim()) {
      newErrors.label = 'Label is required';
    }
    if (formData.configValue) {
      if (!formData.configValue.trim()) {
        newErrors.configValue = 'Configuration value is required';
      } else {
        if (formData.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.configValue)) {
          newErrors.configValue = 'Invalid email address';
        } else if (['sms', 'call'].includes(formData.type) && !/^\+?[1-9]\d{1,14}$/.test(formData.configValue)) {
          newErrors.configValue = 'Invalid phone number';
        } else if (formData.type === 'slack' && !/^https:\/\/hooks\.slack\.com\/services\/.+$/.test(formData.configValue)) {
          newErrors.configValue = 'Invalid Slack webhook URL';
        }
      }
    }
    setFormErrors(newErrors);
  }, [formData]);

  // Toggle channel enabled state
  const toggleChannel = (id: string) => {
    setChannels(channels.map(channel =>
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
    const channel = channels.find(c => c.id === id);
    if (channel) {
      setToast({
        message: `${channel.label} ${channel.enabled ? 'disabled' : 'enabled'}`,
        type: 'success'
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Open add/edit modal
  const openAddEditModal = (channel?: NotificationChannel) => {
    if (channel) {
      setEditingChannel(channel);
      setFormData({
        type: channel.type,
        label: channel.label,
        configValue: channel.config.value
      });
    } else {
      setEditingChannel(null);
      setFormData({ type: 'email', label: '', configValue: '' });
    }
    setShowAddEditModal(true);
  };

  // Handle form submission (add/edit)
  const handleSubmit = () => {
    if (formErrors.label || formErrors.configValue || !formData.label || !formData.configValue) return;

    const newChannel: NotificationChannel = {
      id: editingChannel ? editingChannel.id : Date.now().toString(),
      type: formData.type,
      label: formData.label,
      config: { value: formData.configValue },
      enabled: editingChannel ? editingChannel.enabled : false
    };

    if (editingChannel) {
      setChannels(channels.map(c => c.id === editingChannel.id ? newChannel : c));
      setToast({ message: `${formData.label} updated successfully!`, type: 'success' });
    } else {
      setChannels([...channels, newChannel]);
      setToast({ message: `${formData.label} added successfully!`, type: 'success' });
    }

    setShowAddEditModal(false);
    setFormData({ type: 'email', label: '', configValue: '' });
    setFormErrors({ label: '', configValue: '' });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle delete initiation
  const handleDelete = (channel: NotificationChannel) => {
    setChannelToDelete(channel);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (channelToDelete) {
      setChannels(channels.filter(c => c.id !== channelToDelete.id));
      setToast({ message: `${channelToDelete.label} deleted successfully!`, type: 'success' });
      setShowDeleteModal(false);
      setChannelToDelete(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Handle clicks outside modals
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (showAddEditModal) {
          setShowAddEditModal(false);
          setFormData({ type: 'email', label: '', configValue: '' });
          setFormErrors({ label: '', configValue: '' });
          setEditingChannel(null);
        } else if (showDeleteModal) {
          setShowDeleteModal(false);
          setChannelToDelete(null);
        }
      }
    };

    if (showAddEditModal || showDeleteModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddEditModal, showDeleteModal]);

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)] overflow-y-auto bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <Bell className="text-blue-500 mr-3" size={28} />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Notification Preferences</h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage how you receive alerts for your monitored websites
              </p>
            </div>
          </div>
          <PrimaryButton
            onClick={() => openAddEditModal()}
            className="px-4 py-2 text-sm"
            icon={Plus}
            iconPosition="left"
          >
            Add Channel
          </PrimaryButton>
        </div>

        {/* Channels List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {channels.map(channel => (
            <NotificationChannelCard
              key={channel.id}
              channel={channel}
              onToggle={toggleChannel}
              onEdit={openAddEditModal}
              onDelete={handleDelete}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {channels.length === 0 && (
          <motion.div
            className="rounded-xl border border-gray-800 bg-gray-900/20 backdrop-blur-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-white">No notification channels</h3>
            <p className="mt-1 text-sm text-gray-400">
              Get started by adding a new notification channel
            </p>
            <div className="mt-6">
              <PrimaryButton
                onClick={() => openAddEditModal()}
                className="px-4 py-2 text-sm"
                icon={Plus}
                iconPosition="left"
              >
                Add Channel
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showAddEditModal && (
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
                  <h2 className="text-xl font-bold text-white">
                    {editingChannel ? 'Edit Notification Channel' : 'Add Notification Channel'}
                  </h2>
                  <motion.button
                    onClick={() => {
                      setShowAddEditModal(false);
                      setFormData({ type: 'email', label: '', configValue: '' });
                      setFormErrors({ label: '', configValue: '' });
                      setEditingChannel(null);
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
                      <label htmlFor="channel-type" className="block text-sm font-medium text-gray-300 mb-1">
                        Channel Type
                      </label>
                      <select
                        id="channel-type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500/30"
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="call">Phone Call</option>
                        <option value="slack">Slack</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="channel-label" className="block text-sm font-medium text-gray-300 mb-1">
                        Label
                      </label>
                      <input
                        id="channel-label"
                        type="text"
                        value={formData.label}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                          formErrors.label ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                        )}
                        placeholder="e.g., Team Email Alerts"
                        aria-invalid={!!formErrors.label}
                        aria-describedby={formErrors.label ? "channel-label-error" : undefined}
                      />
                      {formErrors.label && (
                        <p id="channel-label-error" className="mt-1 text-xs text-red-400">{formErrors.label}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="channel-config" className="block text-sm font-medium text-gray-300 mb-1">
                        {formData.type === 'email' ? 'Email Address' : 
                         formData.type === 'slack' ? 'Slack Webhook URL' : 
                         'Phone Number'}
                      </label>
                      <input
                        id="channel-config"
                        type={formData.type === 'email' ? 'email' : 'text'}
                        value={formData.configValue}
                        onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
                        className={cn(
                          "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                          formErrors.configValue ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                        )}
                        placeholder={formData.type === 'email' ? 'user@example.com' : 
                                     formData.type === 'slack' ? 'https://hooks.slack.com/services/...' : 
                                     '+1234567890'}
                        aria-invalid={!!formErrors.configValue}
                        aria-describedby={formErrors.configValue ? "channel-config-error" : undefined}
                      />
                      {formErrors.configValue && (
                        <p id="channel-config-error" className="mt-1 text-xs text-red-400">{formErrors.configValue}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setShowAddEditModal(false);
                      setFormData({ type: 'email', label: '', configValue: '' });
                      setFormErrors({ label: '', configValue: '' });
                      setEditingChannel(null);
                    }}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleSubmit}
                    disabled={!!formErrors.label || !!formErrors.configValue || !formData.label || !formData.configValue}
                    className="px-4 py-2 text-sm"
                  >
                    {editingChannel ? 'Update Channel' : 'Add Channel'}
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
          {showDeleteModal && channelToDelete && (
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
                  <h2 className="text-xl font-bold text-white">Delete Notification Channel</h2>
                  <motion.button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setChannelToDelete(null);
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
                    Are you sure you want to delete <span className="font-semibold text-white">{channelToDelete.label}</span>? This action cannot be undone.
                  </p>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setShowDeleteModal(false);
                      setChannelToDelete(null);
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
    </div>
  );
};

export default NotificationsPage;