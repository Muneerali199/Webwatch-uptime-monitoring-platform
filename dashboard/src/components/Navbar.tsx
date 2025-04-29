import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { 
  SignedIn, 
  SignedOut, 
  UserButton, 
  SignInButton, 
  SignUpButton 
} from '@clerk/clerk-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isLandingPage = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic background classes based on page and scroll state
  const bgClass = isLandingPage 
    ? `fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5 shadow-lg py-3' 
          : 'py-4 bg-transparent'
      } text-white`
    : 'bg-white dark:bg-gray-800 shadow-sm text-gray-800 dark:text-white py-4';

  // Navigation links
  const navLinks = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Features', to: '#features' },
    { name: 'Pricing', to: '#pricing' },
  ];

  // Text and button colors based on page
  const textColorClass = isLandingPage 
    ? 'text-gray-300 hover:text-white' 
    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400';
    
  const underlineColorClass = isLandingPage 
    ? 'bg-blue-400' 
    : 'bg-blue-600 dark:bg-blue-400';

  const signInButtonClass = isLandingPage
    ? 'text-white hover:bg-white/10'
    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';

  const signUpButtonClass = isLandingPage
    ? 'bg-blue-500 text-white hover:bg-blue-600'
    : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600';

  return (
    <nav className={bgClass}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Activity size={28} className={isLandingPage ? 'text-blue-400' : 'text-blue-600 dark:text-blue-400'} />
            <span className="text-xl font-bold">Webwatch</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-sm md:text-base font-medium transition-colors relative group ${textColorClass}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColorClass} transition-all duration-300 group-hover:w-full`} />
              </Link>
            ))}
            
            {/* Auth and Theme Toggle */}
            <div className="flex items-center gap-4 ml-4">
              <ThemeToggle />
              
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-white dark:bg-gray-800 border dark:border-gray-700",
                      userButtonPopoverActionButtonText: "text-gray-800 dark:text-white",
                      userButtonPopoverActionButton: "hover:bg-gray-100 dark:hover:bg-gray-700",
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>
              
              <SignedOut>
                <SignInButton mode="modal">
                  <button className={`px-4 py-2 rounded-md text-sm font-medium ${signInButtonClass}`}>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className={`px-4 py-2 rounded-md text-sm font-medium ${signUpButtonClass}`}>
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle mobile />
            <button
              className="focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className={isLandingPage ? 'text-white' : 'text-gray-800 dark:text-white'} />
              ) : (
                <Menu size={24} className={isLandingPage ? 'text-white' : 'text-gray-800 dark:text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden ${
                isLandingPage 
                  ? 'bg-black/95 backdrop-blur-lg border-t border-white/5' 
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <div className="container mx-auto px-4 py-4">
                {/* Navigation Links */}
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className={`block py-2 transition-colors ${textColorClass}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Auth Buttons */}
                <div className="mt-4 pt-4 border-t border-white/5 dark:border-gray-700 flex flex-col gap-3">
                  <SignedIn>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonTrigger: "w-full justify-start py-2 px-4 hover:bg-white/10 dark:hover:bg-gray-700",
                          userButtonAvatarBox: "w-6 h-6",
                          userButtonPopoverCard: "bg-white dark:bg-gray-800",
                        }
                      }}
                    />
                  </SignedIn>
                  
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button 
                        className={`w-full text-left py-2 px-4 rounded-md ${signInButtonClass}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button 
                        className={`w-full text-left py-2 px-4 rounded-md ${signUpButtonClass}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;