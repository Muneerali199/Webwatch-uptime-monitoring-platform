"use client";

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './Button';

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  newWebsite: {
    name: string;
    url: string;
  };
  formErrors: {
    name: string;
    url: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const AddWebsiteModal: React.FC<AddWebsiteModalProps> = ({
  isOpen,
  onClose,
  newWebsite,
  formErrors,
  onInputChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Add New Website</h2>
          <button 
            onClick={onClose}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
            onClick={onClose}
            className="px-4 py-2 text-sm"
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton 
            onClick={onSubmit}
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
  );
};