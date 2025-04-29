"use client";

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './Button';
import { Website } from '../types'; // You'll need to define this type

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  website: Website | null;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  website,
  onConfirm,
}) => {
  if (!isOpen || !website) return null;

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
          <h2 className="text-xl font-bold text-white">Delete Website</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-300">
            Are you sure you want to delete <span className="font-semibold text-white">{website.name}</span>? This action cannot be undone.
          </p>
        </div>
        <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
          <SecondaryButton
            onClick={onClose}
            className="px-4 py-2 text-sm"
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={onConfirm}
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
  );
};