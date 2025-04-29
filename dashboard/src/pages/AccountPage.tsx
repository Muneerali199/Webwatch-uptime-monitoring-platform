
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Building, Save, X, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { PrimaryButton, SecondaryButton } from '../components/Button';

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

// Interface for Button props (assumed from errors)
interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon | React.ReactNode; // Allow ReactNode to fix type issue
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

// Wrapper component for icons
const NormalizedIcon = ({ size = 24, className, icon: Icon }: { size?: number; className?: string; icon: LucideIcon }) => (
  <Icon size={size} className={className} />
);

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

  // Validate form inputs
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

  // Handle clicks outside modal
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
    setUserData((prev) => ({ ...prev, [field]: e.target.value }));
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
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)] overflow-y-auto bg-black">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <User className="text-blue-400 mr-3 glow" size={28} />
            <div>
              <h1 className="text-2xl font-bold text-white">Account Details</h1>
              <p className="text-sm text-gray-300 mt-1">Manage your personal and enterprise information</p>
            </div>
          </div>
        </div>

        {/* Account Card */}
        <motion.div
          className="bg-black rounded-xl border border-blue-900/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <User className="mr-2 text-blue-400 glow" size={20} />
            Personal Information
          </h2>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="group">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  className={cn(
                    'pl-10 pr-4 py-2 w-full rounded-md bg-black border text-white outline-none',
                    formErrors.fullName ? 'border-red-500' : 'border-blue-900/50 focus:border-blue-400 glow'
                  )}
                  value={userData.fullName}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                  aria-invalid={!!formErrors.fullName}
                  aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                />
                {formErrors.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-red-400 glow">{formErrors.fullName}</p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={cn(
                    'pl-10 pr-4 py-2 w-full rounded-md bg-black border text-white outline-none',
                    formErrors.email ? 'border-red-500' : 'border-blue-900/50 focus:border-blue-400 glow'
                  )}
                  value={userData.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400 glow">{formErrors.email}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="group">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  className={cn(
                    'pl-10 pr-4 py-2 w-full rounded-md bg-black border text-white outline-none',
                    formErrors.phone ? 'border-red-500' : 'border-blue-900/50 focus:border-blue-400 glow'
                  )}
                  value={userData.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                />
                {formErrors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-400 glow">{formErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="group">
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="location"
                  type="text"
                  className="pl-10 pr-4 py-2 w-full rounded-md bg-black border border-blue-900/50 text-white outline-none focus:border-blue-400 glow"
                  value={userData.location}
                  onChange={(e) => handleInputChange(e, 'location')}
                />
              </div>
            </div>

            {/* Enterprise */}
            <div className="group">
              <label htmlFor="enterprise" className="block text-sm font-medium text-gray-300 mb-2">
                Enterprise
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={18} className="text-gray-400 group-focus-within:text-blue-400 glow" />
                </div>
                <input
                  id="enterprise"
                  type="text"
                  className="pl-10 pr-4 py-2 w-full rounded-md bg-black border border-blue-900/50 text-white outline-none focus:border-blue-400 glow"
                  value={userData.enterprise}
                  onChange={(e) => handleInputChange(e, 'enterprise')}
                />
              </div>
            </div>
          </div>

          {/* Save/Discard Buttons */}
          {hasChanges && (
            <motion.div
              className="mt-6 flex justify-end gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <SecondaryButton
                onClick={handleDiscard}
                className="px-4 py-2 text-sm bg-black border border-blue-900/50 text-gray-300 hover:border-blue-400 glow"
                icon={X} // Pass LucideIcon directly
                iconPosition="left"
              >
                Discard
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white border border-blue-900/50 glow"
                icon={Save} // Pass LucideIcon directly
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
              className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={modalRef}
                className="bg-black rounded-xl border border-blue-900/50 p-6 w-full max-w-md"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Confirm Changes</h2>
                  <motion.button
                    onClick={() => setShowSavePrompt(false)}
                    className="p-1 rounded-full text-gray-300 hover:text-white border border-blue-900/50 hover:border-blue-400 glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Are you sure you want to save these changes to your account details?
                </p>
                <div className="flex justify-end gap-3">
                  <SecondaryButton
                    onClick={() => setShowSavePrompt(false)}
                    className="px-4 py-2 text-sm bg-black border border-blue-900/50 text-gray-300 hover:border-blue-400 glow"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={confirmSave}
                    disabled={isSaving}
                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white border border-blue-900/50 glow"
                  >
                    {isSaving ? 'Saving...' : 'Confirm'}
                  </PrimaryButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className={cn(
                'fixed bottom-4 right-4 px-4 py-2 rounded-md text-white border border-blue-900/50 glow',
                toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom CSS */}
        <style>{`
          .glow {
            filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
          }
          .glow:hover {
            filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.7));
          }
        `}</style>
      </div>
    </div>
  );
};

export default AccountPage;
