"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
  SignedIn, 
  SignedOut, 
  UserButton, 
  SignInButton, 
  SignUpButton 
} from '@clerk/clerk-react';
import { ComponentType } from 'react';

// Wrapper component to normalize LucideIcon props
const NormalizedIcon: ComponentType<{ size?: number; className?: string; icon: LucideIcon }> = ({
  size = 24,
  className,
  icon: Icon,
}) => <Icon size={size} className={className} />;

// Enhanced 3D Logo Component
const WebwatchLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn('glow-ultra transform-gpu', className)}
      whileHover={{ scale: 1.15, rotateX: 15, rotateY: 15 }}
      whileTap={{ scale: 0.95 }}
      style={{ transform: 'perspective(1000px)' }}
    >
      <defs>
        <linearGradient id="ultraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="innerGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          <feComposite in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>
      <g transform="rotate(45 32 32)">
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="url(#ultraGradient)"
          strokeWidth="3"
          className="animate-pulse-slow"
        />
        <circle
          cx="32"
          cy="32"
          r="18"
          fill="url(#ultraGradient)"
          fillOpacity="0.2"
          filter="url(#innerGlow)"
        />
        <path
          d="M32 14 L50 32 L32 50 L14 32 Z"
          fill="none"
          stroke="url(#ultraGradient)"
          strokeWidth="1.5"
          strokeDasharray="5,5"
        />
        <circle
          cx="32"
          cy="32"
          r="8"
          fill="url(#ultraGradient)"
          filter="url(#innerGlow)"
          className="animate-pulse"
        />
        <circle cx="50" cy="32" r="3" fill="url(#ultraGradient)" className="animate-orbit" />
        <circle cx="14" cy="32" r="3" fill="url(#ultraGradient)" className="animate-orbit-reverse" />
      </g>
    </motion.svg>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      // Only apply hide/show behavior on landing page
      if (isLandingPage) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsNavbarVisible(false);
        } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
          setIsNavbarVisible(true);
        }
      } else {
        // Always show navbar on other pages
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    let timeout: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => handleScroll(), 50);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [lastScrollY, isLandingPage]);

  const navLinks = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Features', to: '#features' },
    { name: 'Pricing', to: '#pricing' },
  ];

  return (
    <>
      {/* Spacer div to prevent content hiding */}
      <div
        className={cn(
          'h-16 transition-all duration-300',
          isScrolled ? 'md:h-16' : 'md:h-20'
        )}
      />
      
      <motion.nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 text-white',
          isScrolled
            ? 'bg-black/90 backdrop-blur-2xl shadow-xl py-3'
            : 'bg-black/60 backdrop-blur-lg py-4'
        )}
        animate={{ y: isNavbarVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <WebwatchLogo size={32} />
              <span className="text-xl font-bold text-white glow">Webwatch</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={cn(
                    'text-sm md:text-base font-medium transition-colors relative group text-gray-300 hover:text-white',
                    'transform-gpu'
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10"
                  >
                    {link.name}
                  </motion.span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              
              {/* Auth Buttons */}
              <div className="flex items-center gap-4 ml-4">
                <SignedIn>
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: 'w-8 h-8 glow',
                        userButtonPopoverCard: 'bg-black/90 backdrop-blur-2xl border border-gray-900 text-white',
                        userButtonPopoverActionButtonText: 'text-white',
                        userButtonPopoverActionButton: 'hover:bg-gray-800/90 glow-button',
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </SignedIn>
                
                <SignedOut>
                  <SignInButton mode="modal">
                    <motion.button
                      className="px-4 py-2 rounded-md text-sm font-medium text-white bg-black/80 border border-gray-900 hover:bg-gray-800/90 glow-button transform-gpu"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign In
                    </motion.button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <motion.button
                      className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 glow-button transform-gpu"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <motion.button
                className="p-3 rounded-full bg-black/80 border border-gray-900 shadow-xl glow-button transform-gpu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <NormalizedIcon
                  icon={isMobileMenuOpen ? X : Menu}
                  size={24}
                  className="text-white glow"
                />
              </motion.button>
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
                className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-900"
              >
                <div className="container mx-auto px-4 py-4">
                  {/* Navigation Links */}
                  <ul className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.to}
                          className="block py-2 text-gray-300 hover:text-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Auth Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-900 flex flex-col gap-3">
                    <SignedIn>
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonTrigger: 'w-full justify-start py-2 px-4 hover:bg-gray-800/90 glow-button text-white',
                            userButtonAvatarBox: 'w-6 h-6 glow',
                            userButtonPopoverCard: 'bg-black/90 backdrop-blur-2xl border border-gray-900 text-white',
                            userButtonPopoverActionButtonText: 'text-white',
                            userButtonPopoverActionButton: 'hover:bg-gray-800/90 glow-button',
                          }
                        }}
                      />
                    </SignedIn>
                    
                    <SignedOut>
                      <SignInButton mode="modal">
                        <motion.button 
                          className="w-full text-left py-2 px-4 rounded-md text-white bg-black/80 border border-gray-900 hover:bg-gray-800/90 glow-button transform-gpu"
                          onClick={() => setIsMobileMenuOpen(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Sign In
                        </motion.button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <motion.button 
                          className="w-full text-left py-2 px-4 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 glow-button transform-gpu"
                          onClick={() => setIsMobileMenuOpen(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Sign Up
                        </motion.button>
                      </SignUpButton>
                    </SignedOut>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom CSS for 3D effects and animations */}
        <style>{`
          .glow {
            filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
          }
          .glow-ultra {
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 12px rgba(139, 92, 246, 0.5));
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
          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }
          @keyframes orbit {
            0% { transform: translateX(0) rotate(0deg); }
            100% { transform: translateX(0) rotate(360deg); }
          }
          .animate-orbit {
            animation: orbit 6s linear infinite;
            transform-origin: 32px 32px;
          }
          .animate-orbit-reverse {
            animation: orbit 6s linear infinite reverse;
            transform-origin: 32px 32px;
          }
        `}</style>
      </motion.nav>
    </>
  );
};

export default Navbar;