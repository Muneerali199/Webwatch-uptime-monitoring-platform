import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const bgClass = isLandingPage 
    ? 'bg-transparent text-white absolute w-full z-10' 
    : 'bg-white dark:bg-gray-800 shadow-sm text-gray-800 dark:text-white';

  return (
    <nav className={`py-4 transition-all duration-300 ${bgClass}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Activity size={28} className={isLandingPage ? 'text-blue-400' : 'text-blue-600 dark:text-blue-400'} />
            <span className="text-xl font-bold">PulseWatch</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className="text-sm md:text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Dashboard
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;