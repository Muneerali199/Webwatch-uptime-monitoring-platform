"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import WebsitesPage from './pages/WebsitesPage';
import AccountPage from './pages/AccountPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Define environment variables type
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CLERK_PUBLISHABLE_KEY: string;
      REACT_APP_API_BASE_URL?: string;
    }
  }
}

function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    throw new Error("Missing Clerk publishable key. Please add VITE_CLERK_PUBLISHABLE_KEY or REACT_APP_CLERK_PUBLISHABLE_KEY to your environment variables");
  }

  return (
    <ThemeProvider>
      <ClerkProvider 
        publishableKey={clerkPubKey}
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
            headerTitle: 'text-gray-800 dark:text-white',
            headerSubtitle: 'text-gray-500 dark:text-gray-400',
            socialButtonsBlockButton: 'border-gray-200 dark:border-gray-600',
            socialButtonsBlockButtonText: 'text-gray-700 dark:text-gray-200',
            dividerLine: 'bg-gray-200 dark:bg-gray-700',
            formFieldLabel: 'text-gray-700 dark:text-gray-300',
            formFieldInput: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600',
            footerActionText: 'text-gray-600 dark:text-gray-400',
            footerActionLink: 'text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300',
          }
        }}
      >
        <Router>
          <ClerkLoading>
            <LoadingScreen />
          </ClerkLoading>
          <ClerkLoaded>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="websites" element={<WebsitesPage />} />
                    <Route path="account" element={<AccountPage />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </ClerkLoaded>
        </Router>
      </ClerkProvider>
    </ThemeProvider>
  );
}

export default App;