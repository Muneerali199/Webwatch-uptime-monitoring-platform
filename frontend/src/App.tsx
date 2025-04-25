"use client";

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Dashboard } from './components/Dashboard';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Statistics } from './components/Statistics';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import {ShootingStars} from './components/ui/ShootingStars';

function App() {
  return (
    <NextUIProvider>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Shooting stars background */}
        <ShootingStars 
          className="pointer-events-none"
          minSpeed={10}
          maxSpeed={30}
          minDelay={1200}
          maxDelay={4200}
          starColor="#9E00FF"  // Purple star
          trailColor="#2EB9DF" // Blue trail
        />
        
        {/* Main content with slight backdrop blur */}
        <div className="relative z-10">
          <Header />
          <main className="backdrop-blur-[2px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Hero />
              <Features />
              <Dashboard />
              <Statistics />
              <Testimonials />
              <Pricing />
              <CTA />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;