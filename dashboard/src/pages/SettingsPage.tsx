"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Trash2, Download, Bell, Lock, User, Mail, Key, Database, X, Image, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import SettingsCard from '../components/SettingsCard';
import { ComponentType } from 'react';

interface Settings {
  twoFactorAuth: boolean;
  notifications: boolean;
  emailAlerts: boolean;
  darkMode: boolean;
  dataExportFormat: 'json' | 'csv' | 'xml';
  deleteConfirmation: boolean;
  username: string;
  email: string;
  avatar: string | null;
}

// Wrapper component to normalize LucideIcon props
const NormalizedIcon: ComponentType<{ size?: number; className?: string; icon: LucideIcon }> = ({
  size = 24,
  className,
  icon: Icon,
}) => <Icon size={size} className={className} />;

const SettingsPage: React.FC = () => {
  // State management
  const [settings, setSettings] = useState<Settings>({
    twoFactorAuth: false,
    notifications: true,
    emailAlerts: true,
    darkMode: true,
    dataExportFormat: 'json',
    deleteConfirmation: false,
    username: 'John Doe',
    email: 'john@example.com',
    avatar: null
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileForm, setProfileForm] = useState({
    username: settings.username,
    email: settings.email
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileErrors, setProfileErrors] = useState({
    username: '',
    email: ''
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Real-time password form validation
  useEffect(() => {
    const errors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    if (passwordForm.currentPassword && passwordForm.currentPassword.length < 8) {
      errors.currentPassword = 'Current password must be at least 8 characters';
    }
    if (passwordForm.newPassword && passwordForm.newPassword.length < 8) {
      errors.newPassword = 'New password must be at least 8 characters';
    }
    if (passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setPasswordErrors(errors);
  }, [passwordForm]);

  // Real-time profile form validation
  useEffect(() => {
    const errors = {
      username: '',
      email: ''
    };
    if (profileForm.username && !profileForm.username.trim()) {
      errors.username = 'Username is required';
    }
    if (profileForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      errors.email = 'Invalid email address';
    }
    setProfileErrors(errors);
  }, [profileForm]);

  // Handle settings toggle
  const handleToggle = (key: keyof Settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setToast({ message: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle password change
  const handlePasswordSubmit = () => {
    if (passwordErrors.currentPassword || passwordErrors.newPassword || passwordErrors.confirmPassword ||
        !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setToast({ message: 'Please fix form errors', type: 'error' });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setToast({ message: 'Password changed successfully!', type: 'success' });
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setToast(null), 3000);
    }, 1000);
  };

  // Handle profile update
  const handleProfileSubmit = () => {
    if (profileErrors.username || profileErrors.email || !profileForm.username || !profileForm.email) {
      setToast({ message: 'Please fix form errors', type: 'error' });
      return;
    }

    setSettings(prev => ({ ...prev, username: profileForm.username, email: profileForm.email }));
    setToast({ message: 'Profile updated successfully!', type: 'success' });
    setShowProfileModal(false);
    setTimeout(() => setToast(null), 3000);
  };

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setToast({ message: 'Please select a valid image file', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleAvatarSubmit = () => {
    if (!avatarFile) {
      setToast({ message: 'Please select an image', type: 'error' });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSettings(prev => ({ ...prev, avatar: avatarPreview }));
      setToast({ message: 'Avatar updated successfully!', type: 'success' });
      setShowAvatarModal(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      setTimeout(() => setToast(null), 3000);
    }, 1000);
  };

  // Handle data export
  const handleExport = () => {
    setIsExporting(true);
    // Simulate API call
    setTimeout(() => {
      setToast({ message: `Data exported as ${settings.dataExportFormat.toUpperCase()}`, type: 'success' });
      setIsExporting(false);
      setTimeout(() => setToast(null), 3000);
    }, 2000);
  };

  // Handle account deletion
  const handleDelete = () => {
    if (!deletePassword) {
      setToast({ message: 'Please enter your password', type: 'error' });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setToast({ message: 'Account deletion initiated. Check your email for confirmation.', type: 'success' });
      setShowDeleteModal(false);
      setDeletePassword('');
      setSettings(prev => ({ ...prev, deleteConfirmation: false }));
      setTimeout(() => setToast(null), 3000);
    }, 1000);
  };

  // Handle clicks outside modals
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowPasswordModal(false);
        setShowDeleteModal(false);
        setShowProfileModal(false);
        setShowAvatarModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordErrors({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setProfileForm({ username: settings.username, email: settings.email });
        setProfileErrors({ username: '', email: '' });
        setAvatarFile(null);
        setAvatarPreview(null);
        setDeletePassword('');
      }
    };

    if (showPasswordModal || showDeleteModal || showProfileModal || showAvatarModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPasswordModal, showDeleteModal, showProfileModal, showAvatarModal, settings]);

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)] overflow-y-auto bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <Shield className="text-blue-500 mr-3" size={28} />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
              <p className="text-sm text-gray-400 mt-1">Customize your account preferences and security settings</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">v2.4.1</div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Card */}
          <SettingsCard
            title="Security"
            icon={Lock}
            iconColor="text-blue-400"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="text-purple-400" size={18} />
                  <div>
                    <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400">Extra security layer for your account</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.twoFactorAuth}
                    onChange={() => handleToggle('twoFactorAuth', !settings.twoFactorAuth)}
                    aria-label="Toggle two-factor authentication"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div>
                <h3 className="font-medium flex items-center space-x-2 mb-3">
                  <Key className="text-yellow-400" size={18} />
                  <span>Change Password</span>
                </h3>
                <PrimaryButton
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full px-4 py-2 text-sm"
                >
                  Update Password
                </PrimaryButton>
              </div>
            </div>
          </SettingsCard>

          {/* Account Card */}
          <SettingsCard
            title="Account"
            icon={User}
            iconColor="text-green-400"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-blue-500 overflow-hidden">
                  {settings.avatar ? (
                    <img src={settings.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{settings.username}</h3>
                  <p className="text-sm text-gray-400">{settings.email}</p>
                  <button
                    onClick={() => setShowAvatarModal(true)}
                    className="text-sm text-blue-400 hover:text-blue-300 mt-1"
                  >
                    Change Avatar
                  </button>
                </div>
                <PrimaryButton
                  onClick={() => setShowProfileModal(true)}
                  className="ml-auto px-4 py-2 text-sm"
                >
                  Edit Profile
                </PrimaryButton>
              </div>
              <div>
                <h3 className="font-medium flex items-center space-x-2 mb-3">
                  <Mail className="text-red-400" size={18} />
                  <span>Email Preferences</span>
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={() => handleToggle('notifications', !settings.notifications)}
                      className="h-4 w-4 text-blue-600 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
                      aria-label="Toggle notifications"
                    />
                    <span className="text-sm text-gray-300">Receive notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={() => handleToggle('emailAlerts', !settings.emailAlerts)}
                      className="h-4 w-4 text-blue-600 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
                      aria-label="Toggle email alerts"
                    />
                    <span className="text-sm text-gray-300">Email alerts for downtime</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-white">Appearance</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggle('darkMode', false)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm",
                      !settings.darkMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    )}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => handleToggle('darkMode', true)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm",
                      settings.darkMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    )}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </SettingsCard>

          {/* Data Management Card */}
          <SettingsCard
            title="Data Management"
            icon={Database}
            iconColor="text-orange-400"
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center space-x-2">
                  <Download className="text-green-400" size={18} />
                  <span>Export Data</span>
                </h3>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Format</label>
                  <select
                    value={settings.dataExportFormat}
                    onChange={(e) => setSettings(prev => ({ ...prev, dataExportFormat: e.target.value as 'json' | 'csv' | 'xml' }))}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="xml">XML</option>
                  </select>
                </div>
                <PrimaryButton
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full px-4 py-2 text-sm"
                  icon={() => <NormalizedIcon icon={Download} size={18} />}
                  iconPosition="left"
                >
                  {isExporting ? 'Exporting...' : 'Export All Data'}
                </PrimaryButton>
              </div>
              <div className="space-y-4 border-l border-gray-800 pl-6 md:pl-8">
                <h3 className="font-medium flex items-center space-x-2 text-red-400">
                  <Trash2 size={18} />
                  <span>Delete Account</span>
                </h3>
                <p className="text-sm text-gray-400">
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.deleteConfirmation}
                    onChange={() => handleToggle('deleteConfirmation', !settings.deleteConfirmation)}
                    className="h-4 w-4 text-red-600 rounded bg-gray-700 border-gray-600 focus:ring-red-500"
                    aria-label="Confirm account deletion"
                  />
                  <span className="text-sm text-gray-300">I understand this action is irreversible</span>
                </label>
                <PrimaryButton
                  onClick={() => setShowDeleteModal(true)}
                  disabled={!settings.deleteConfirmation}
                  className={cn(
                    "w-full px-4 py-2 text-sm flex items-center justify-center space-x-2",
                    !settings.deleteConfirmation ? 'opacity-50 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'
                  )}
                  icon={() => <NormalizedIcon icon={Trash2} size={18} />}
                  iconPosition="left"
                >
                  Delete Account Permanently
                </PrimaryButton>
              </div>
            </div>
          </SettingsCard>
        </div>

        {/* Password Change Modal */}
        <AnimatePresence>
          {showPasswordModal && (
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
                  <h2 className="text-xl font-bold text-white">Change Password</h2>
                  <motion.button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setPasswordErrors({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                        passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      )}
                      aria-invalid={!!passwordErrors.currentPassword}
                      aria-describedby={passwordErrors.currentPassword ? "current-password-error" : undefined}
                    />
                    {passwordErrors.currentPassword && (
                      <p id="current-password-error" className="mt-1 text-xs text-red-400">{passwordErrors.currentPassword}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                        passwordErrors.newPassword ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      )}
                      aria-invalid={!!passwordErrors.newPassword}
                      aria-describedby={passwordErrors.newPassword ? "new-password-error" : undefined}
                    />
                    {passwordErrors.newPassword && (
                      <p id="new-password-error" className="mt-1 text-xs text-red-400">{passwordErrors.newPassword}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                        passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      )}
                      aria-invalid={!!passwordErrors.confirmPassword}
                      aria-describedby={passwordErrors.confirmPassword ? "confirm-password-error" : undefined}
                    />
                    {passwordErrors.confirmPassword && (
                      <p id="confirm-password-error" className="mt-1 text-xs text-red-400">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setPasswordErrors({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handlePasswordSubmit}
                    disabled={!!passwordErrors.currentPassword || !!passwordErrors.newPassword || !!passwordErrors.confirmPassword ||
                             !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                    className="px-4 py-2 text-sm"
                  >
                    Update Password
                  </PrimaryButton>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 animate-gradient"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Edit Modal */}
        <AnimatePresence>
          {showProfileModal && (
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
                  <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                  <motion.button
                    onClick={() => {
                      setShowProfileModal(false);
                      setProfileForm({ username: settings.username, email: settings.email });
                      setProfileErrors({ username: '', email: '' });
                    }}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={profileForm.username}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                        profileErrors.username ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      )}
                      aria-invalid={!!profileErrors.username}
                      aria-describedby={profileErrors.username ? "username-error" : undefined}
                    />
                    {profileErrors.username && (
                      <p id="username-error" className="mt-1 text-xs text-red-400">{profileErrors.username}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-2 rounded-lg bg-gray-900/50 border text-white outline-none transition-all",
                        profileErrors.email ? 'border-red-500' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      )}
                      aria-invalid={!!profileErrors.email}
                      aria-describedby={profileErrors.email ? "email-error" : undefined}
                    />
                    {profileErrors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-400">{profileErrors.email}</p>
                    )}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setShowProfileModal(false);
                      setProfileForm({ username: settings.username, email: settings.email });
                      setProfileErrors({ username: '', email: '' });
                    }}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleProfileSubmit}
                    disabled={!!profileErrors.username || !!profileErrors.email || !profileForm.username || !profileForm.email}
                    className="px-4 py-2 text-sm"
                  >
                    Update Profile
                  </PrimaryButton>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 animate-gradient"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar Upload Modal */}
        <AnimatePresence>
          {showAvatarModal && (
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
                  <h2 className="text-xl font-bold text-white">Change Avatar</h2>
                  <motion.button
                    onClick={() => {
                      setShowAvatarModal(false);
                      setAvatarFile(null);
                      setAvatarPreview(null);
                    }}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  {avatarPreview && (
                    <div className="flex justify-center">
                      <img src={avatarPreview} alt="Avatar preview" className="w-32 h-32 rounded-full object-cover border-2 border-blue-500" />
                    </div>
                  )}
                  <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-300 mb-1">
                      Select Image
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setShowAvatarModal(false);
                      setAvatarFile(null);
                      setAvatarPreview(null);
                    }}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleAvatarSubmit}
                    disabled={!avatarFile}
                    className="px-4 py-2 text-sm"
                  >
                    Update Avatar
                  </PrimaryButton>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 animate-gradient"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Account Modal */}
        <AnimatePresence>
          {showDeleteModal && (
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
                  <h2 className="text-xl font-bold text-white">Delete Account</h2>
                  <motion.button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletePassword('');
                    }}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-300">
                    This will permanently delete your account and all associated data. Please enter your password to confirm.
                  </p>
                  <div>
                    <label htmlFor="delete-password" className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      id="delete-password"
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletePassword('');
                    }}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500"
                  >
                    Delete Account
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

export default SettingsPage;