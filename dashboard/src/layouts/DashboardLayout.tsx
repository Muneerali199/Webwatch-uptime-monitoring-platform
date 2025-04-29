"use client";

import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Globe, User, Bell, Settings,
  ChevronRight, ChevronLeft, Menu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/websites', icon: Globe, label: 'Websites' },
    { path: '/dashboard/account', icon: User, label: 'Account' },
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <motion.aside 
        className={cn(
          "bg-black border-r border-gray-900",
          "transition-all duration-300 flex flex-col z-10",
          isSidebarCollapsed ? "w-16" : "w-64"
        )}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
      >
        <div className="p-4 flex justify-end items-center border-b border-gray-900">
          <motion.button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={cn(
              "p-2 rounded-lg hover:bg-gray-900 text-gray-400 hover:text-white",
              "transition-colors duration-200"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/dashboard'}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-3 rounded-lg",
                "transition-all duration-200",
                isActive 
                  ? "bg-gray-900 text-blue-400 border-l-4 border-blue-500" 
                  : "text-gray-400 hover:bg-gray-900 hover:text-white",
                isSidebarCollapsed ? "justify-center" : "pl-4"
              )}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <Icon size={20} className="flex-shrink-0" />
              </motion.div>
              {!isSidebarCollapsed && (
                <motion.span 
                  className="ml-3"
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
        <div className="p-4 border-t border-gray-900">
          <motion.button
            className="w-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            whileHover={{ scale: 1.02 }}
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <>
                <ChevronLeft size={20} className="mr-2" />
                <span>Collapse</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed bottom-4 left-4 z-20 p-3 bg-gray-900 rounded-full shadow-lg"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      >
        <Menu size={20} className="text-white" />
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-black">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;