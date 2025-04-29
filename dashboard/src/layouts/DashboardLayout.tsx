"use client";

import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Menu, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { ComponentType } from 'react';

// Wrapper component to normalize LucideIcon props
const NormalizedIcon: ComponentType<{ size?: number; className?: string; icon: LucideIcon }> = ({
  size = 24,
  className,
  icon: Icon,
}) => <Icon size={size} className={className} />;

// Custom 3D Logo Components
const DashboardLogo: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={cn('glow-ultra transform-gpu', className)}
    whileHover={{ scale: 1.15, rotateX: 15, rotateY: 15 }}
    whileTap={{ scale: 0.95 }}
    style={{ transform: 'perspective(1000px)' }}
  >
    <defs>
      <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="24" height="24" fill="none" stroke="url(#dashboardGradient)" strokeWidth="2" rx="4" />
    <path d="M4 16 H28 M16 4 V28" fill="none" stroke="url(#dashboardGradient)" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="3" fill="url(#dashboardGradient)" className="animate-pulse" />
  </motion.svg>
);

const WebsitesLogo: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={cn('glow-ultra transform-gpu', className)}
    whileHover={{ scale: 1.15, rotateX: 15, rotateY: 15 }}
    whileTap={{ scale: 0.95 }}
    style={{ transform: 'perspective(1000px)' }}
  >
    <defs>
      <linearGradient id="websitesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="12" fill="none" stroke="url(#websitesGradient)" strokeWidth="2" />
    <path d="M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4" fill="url(#websitesGradient)" fillOpacity="0.2" />
    <circle cx="24" cy="16" r="2" fill="url(#websitesGradient)" className="animate-orbit" />
    <circle cx="8" cy="16" r="2" fill="url(#websitesGradient)" className="animate-orbit-reverse" />
  </motion.svg>
);

const AccountLogo: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={cn('glow-ultra transform-gpu', className)}
    whileHover={{ scale: 1.15, rotateX: 15, rotateY: 15 }}
    whileTap={{ scale: 0.95 }}
    style={{ transform: 'perspective(1000px)' }}
  >
    <defs>
      <linearGradient id="accountGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="16" cy="10" r="6" fill="none" stroke="url(#accountGradient)" strokeWidth="2" />
    <path d="M8 22 C10 18 22 18 24 22" fill="none" stroke="url(#accountGradient)" strokeWidth="2" />
    <circle cx="16" cy="10" r="3" fill="url(#accountGradient)" className="animate-pulse" />
  </motion.svg>
);

const NotificationsLogo: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={cn('glow-ultra transform-gpu', className)}
    whileHover={{ scale: 1.15, rotateX: 15, rotateY: 15 }}
    whileTap={{ scale: 0.95 }}
    style={{ transform: 'perspective(1000px)' }}
  >
    <defs>
      <linearGradient id="notificationsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M16 26 C18 26 18 24 18 24 H14 C14 24 14 26 16 26 M12 8 C12 6 14 6 16 6 C18 6 20 6 20 8 C20 12 22 16 22 18 C22 22 20 24 16 24 C12 24 10 22 10 18 C10 16 12 12 12 8 Z"
      fill="none"
      stroke="url(#notificationsGradient)"
      strokeWidth="2"
    />
    <circle cx="22" cy="8" r="2" fill="url(#notificationsGradient)" className="animate-pulse" />
  </motion.svg>
);

const SettingsLogo: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={cn('glow-ultra transform-gpu', className)}
    whileHover={{ scale: 1.15, rotateX: 15, rotateY: 15 }}
    whileTap={{ scale: 0.95 }}
    style={{ transform: 'perspective(1000px)' }}
  >
    <defs>
      <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="10" fill="none" stroke="url(#settingsGradient)" strokeWidth="2" />
    <path
      d="M16 8 L16 12 L12 16 L16 20 L16 24 L20 20 L24 16 L20 12 L20 8 Z"
      fill="url(#settingsGradient)"
      fillOpacity="0.3"
    />
    <circle cx="16" cy="16" r="3" fill="url(#settingsGradient)" className="animate-spin-slow" />
  </motion.svg>
);

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: DashboardLogo, label: 'Dashboard' },
    { path: '/dashboard/websites', icon: WebsitesLogo, label: 'Websites' },
    { path: '/dashboard/account', icon: AccountLogo, label: 'Account' },
    { path: '/dashboard/notifications', icon: NotificationsLogo, label: 'Notifications' },
    { path: '/dashboard/settings', icon: SettingsLogo, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-black text-white relative overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        className={cn(
          'bg-black/80 border-r border-gray-800/50 backdrop-blur-xl',
          'transition-all duration-300 flex flex-col z-20 shadow-2xl transform-gpu',
          isSidebarCollapsed ? 'w-16' : 'w-64'
        )}
        initial={{ x: -64 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{ transform: 'perspective(1000px) rotateY(2deg)' }}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-800/50">
          {!isSidebarCollapsed && (
            <motion.h2
              className="text-xl font-bold text-white glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Dashboard
            </motion.h2>
          )}
          <motion.button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={cn(
              'p-2 rounded-lg bg-black/80 hover:bg-gray-800/90 text-gray-300 hover:text-white glow-button transform-gpu',
              'transition-colors duration-200'
            )}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <NormalizedIcon
              icon={isSidebarCollapsed ? ChevronRight : ChevronLeft}
              size={20}
              className="glow"
            />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-3 rounded-lg relative',
                  'transition-all duration-200 transform-gpu',
                  isActive
                    ? 'bg-black/90 text-blue-400 border-l-4 border-blue-500 glow-active'
                    : 'text-gray-300 hover:bg-black/90 hover:text-white glow-hover',
                  isSidebarCollapsed ? 'justify-center' : 'pl-4'
                )
              }
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                <Icon size={20} className="flex-shrink-0 glow" />
              </motion.div>
              {!isSidebarCollapsed && (
                <motion.span
                  className="ml-3 text-sm font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse Indicator */}
        <div className="p-4 border-t border-gray-800/50">
          <motion.button
            className={cn(
              'w-full flex items-center justify-center text-gray-300 hover:text-white transition-colors bg-black/80 rounded-lg py-2 glow-button transform-gpu',
              isSidebarCollapsed ? 'justify-center' : 'px-4'
            )}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            whileHover={{ scale: 1.02, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? (
              <NormalizedIcon icon={ChevronRight} size={20} className="glow" />
            ) : (
              <>
                <NormalizedIcon icon={ChevronLeft} size={20} className="mr-2 glow" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Toggle */}
      <motion.button
        className="md:hidden fixed bottom-4 left-4 z-30 p-3 bg-black/80 rounded-full shadow-2xl border border-gray-800/50 glow-button transform-gpu"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle sidebar"
      >
        <NormalizedIcon icon={Menu} size={20} className="text-white glow" />
      </motion.button>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-black relative z-10">
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Custom CSS for 3D effects and animations */}
      <style>{`
        .glow {
          filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
        }
        .glow-ultra {
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 12px rgba(139, 92, 246, 0.5));
        }
        .glow-active {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), inset 0 0 5px rgba(59, 130, 246, 0.3);
        }
        .glow-hover:hover {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.4), inset 0 0 3px rgba(59, 130, 246, 0.2);
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
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes orbit {
          0% { transform: translateX(0) rotate(0deg); }
          100% { transform: translateX(0) rotate(360deg); }
        }
        .animate-orbit {
          animation: orbit 6s linear infinite;
          transform-origin: 16px 16px;
        }
        .animate-orbit-reverse {
          animation: orbit 6s linear infinite reverse;
          transform-origin: 16px 16px;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;