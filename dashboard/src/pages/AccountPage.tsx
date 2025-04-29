"use client";

import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Building, Save, X, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import { ComponentType } from 'react';

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  enterprise: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  phone: string;
}

// Wrapper component to normalize LucideIcon props
const NormalizedIcon: ComponentType<{ size?: number; className?: string; icon: LucideIcon }> = ({
  size = 24,
  className,
  icon: Icon,
}) => <Icon size={size} className={className} />;

const AccountPage: React.FC = () => {
  // Initial user data
  const initialData: UserData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    enterprise: 'Tech Corp Inc',
  };

  // State management
  const [userData, setUserData] = useState<UserData>(initialData);
  const [originalData, setOriginalData] = useState<UserData>(initialData);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Validate form inputs in real-time
  useEffect(() => {
    const errors: FormErrors = {
      fullName: '',
      email: '',
      phone: '',
    };

    if (userData.fullName && !userData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = 'Invalid email address';
    }
    if (userData.phone && !/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/.test(userData.phone)) {
      errors.phone = 'Invalid phone number';
    }

    setFormErrors(errors);
  }, [userData]);

  // Check for changes
  useEffect(() => {
    const changesExist = Object.keys(userData).some(
      (key) => userData[key as keyof UserData] !== originalData[key as keyof UserData]
    );
    setHasChanges(changesExist);
  }, [userData, originalData]);

  // Handle clicks outside the save prompt modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowSavePrompt(false);
      }
    };

    if (showSavePrompt) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSavePrompt]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserData) => {
    const { value } = e.target;
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Save changes
  const handleSave = () => {
    if (formErrors.fullName || formErrors.email || formErrors.phone || !userData.fullName || !userData.email) {
      setToast({ message: 'Please fix form errors', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setShowSavePrompt(true);
  };

  // Confirm save
  const confirmSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setOriginalData(userData);
      setHasChanges(false);
      setIsSaving(false);
      setShowSavePrompt(false);
      setToast({ message: 'Account details updated successfully!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }, 1000);
  };

  // Discard changes
  const handleDiscard = () => {
    setUserData(originalData);
    setHasChanges(false);
    setShowSavePrompt(false);
    setFormErrors({ fullName: '', email: '', phone: '' });
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)] overflow-y-auto bg-black relative">
      {/* Starry background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/90 bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,60,0.1)_0%,transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <User className="text-blue-500 mr-3 glow" size={28} />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Account Details</h1>
              <p className="text-sm text-gray-300 mt-1">Manage your personal and enterprise information</p>
            </div>
          </div>
          <div className="text-sm text-gray-300">v2.4.1</div>
        </div>

        {/* Account Card */}
        <motion.div
          className="bg-black/90 rounded-xl border border-gray-800/50 shadow-2xl backdrop-blur-xl p-6 md:p-8 transform-gpu"
          style={{ transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)' }}
          whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <User className="mr-2 text-blue-400 glow" size={20} />
            Personal Information
          </h2>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="group relative">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  className={cn(
                    'pl-12 pr-4 py-3 w-full rounded-lg bg-black/80 border text-white outline-none transition-all transform-gpu hover:scale-[1.01] focus:scale-[1.01]',
                    formErrors.fullName
                      ? 'border-red-500'
                      : 'border-gray-800/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/50 glow-input'
                  )}
                  value={userData.fullName}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                  aria-invalid={!!formErrors.fullName}
                  aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                />
                {formErrors.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-red-400">{formErrors.fullName}</p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="group relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={cn(
                    'pl-12 pr-4 py-3 w-full rounded-lg bg-black/80 border text-white outline-none transition-all transform-gpu hover:scale-[1.01] focus:scale-[1.01]',
                    formErrors.email
                      ? 'border-red-500'
                      : 'border-gray-800/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/50 glow-input'
                  )}
                  value={userData.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400">{formErrors.email}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="group relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  className={cn(
                    'pl-12 pr-4 py-3 w-full rounded-lg bg-black/80 border text-white outline-none transition-all transform-gpu hover:scale-[1.01] focus:scale-[1.01]',
                    formErrors.phone
                      ? 'border-red-500'
                      : 'border-gray-800/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/50 glow-input'
                  )}
                  value={userData.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                />
                {formErrors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-400">{formErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="group relative">
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="location"
                  type="text"
                  className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/80 border border-gray-800/50 text-white outline-none focus:ring-4 focus:ring-blue-500/50 glow-input transition-all transform-gpu hover:scale-[1.01] focus:scale-[1.01]"
                  value={userData.location}
                  onChange={(e) => handleInputChange(e, 'location')}
                />
              </div>
            </div>

            {/* Enterprise */}
            <div className="group relative">
              <label htmlFor="enterprise" className="block text-sm font-medium text-gray-300 mb-2">
                Enterprise
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="enterprise"
                  type="text"
                  className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/80 border border-gray-800/50 text-white outline-none focus:ring-4 focus:ring-blue-500/50 glow-input transition-all transform-gpu hover:scale-[1.01] focus:scale-[1.01]"
                  value={userData.enterprise}
                  onChange={(e) => handleInputChange(e, 'enterprise')}
                />
              </div>
            </div>
          </div>

          {/* Save/Discard Buttons */}
          {hasChanges && (
            <motion.div
              className="mt-8 flex justify-end gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <SecondaryButton
                onClick={handleDiscard}
                className="px-4 py-2 text-sm bg-black/80 border border-gray-800/50 text-gray-300 hover:bg-gray-800/90 glow-button transform-gpu"
                icon={() => <NormalizedIcon icon={X} size={16} className="glow" />}
                iconPosition="left"
              >
                Discard
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-button transform-gpu"
                icon={() => <NormalizedIcon icon={Save} size={16} className="glow" />}
                iconPosition="left"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </PrimaryButton>
            </motion.div>
          )}
        </motion.div>

        {/* Save Confirmation Modal */}
        <AnimatePresence>
          {showSavePrompt && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={modalRef}
                className="relative bg-black/80 rounded-xl border border-gray-800/50 shadow-2xl backdrop-blur-xl overflow-hidden w-full max-w-md transform-gpu"
                style={{ transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)' }}
                whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Confirm Changes</h2>
                  <motion.button
                    onClick={() => setShowSavePrompt(false)}
                    className="p-1 rounded-full hover:bg-gray-800/90 transition-colors text-gray-300 hover:text-white glow-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} className="glow" />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-300">
                    Are you sure you want to save these changes to your account details?
                  </p>
                </div>
                <div className="p-4 border-t border-gray-800/50 flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => setShowSavePrompt(false)}
                    className="px-4 py-2 text-sm bg-black/80 border border-gray-800/50 text-gray-300 hover:bg-gray-800/90 glow-button"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={confirmSave}
                    disabled={isSaving}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-button"
                  >
                    {isSaving ? 'Saving...' : 'Confirm'}
                  </PrimaryButton>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className={cn(
                'fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-2xl text-white flex items-center gap-2 border border-gray-800/50 glow-button',
                toast.type === 'success' ? 'bg-green-600/90' : 'bg-red-600/90'
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

        {/* Custom CSS for 3D effects and animations */}
        <style>{`
          .glow {
            filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
          }
          .glow-input {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), inset 0 0 5px rgba(59, 130, 246, 0.2);
          }
          .glow-button {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 5px rgba(59, 130, 246, 0.2);
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .glow-button:hover {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 10px rgba(59, 130, 246, 0.4);
            transform: scale(1.05);
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 4s ease infinite;
          }
          @keyframes sparkle {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
          }
          .sparkle::before {
            content: '';
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            top: 10%;
            left: 10%;
            animation: sparkle 2s infinite;
          }
          .sparkle::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.8);
            border-radius: 50%;
            bottom: 15%;
            right: 15%;
            animation: sparkle 3s infinite 1s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AccountPage;