"use client";

import { useRef, useState, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { PricingSection } from '../components/landing/PricingSection';
import { CtaSection } from '../components/landing/CtaSection';
import { UptimeWorldMap } from '../components/WorldMap';

const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Example data for the UptimeWorldMap component
  const regions = [
    {
      location: { lat: 37.7749, lng: -122.4194 },
      label: "San Francisco",
      status: "up" as const,
      lastChecked: new Date(),
    },
    {
      location: { lat: 40.7128, lng: -74.0060 },
      label: "New York",
      status: "up" as const,
      lastChecked: new Date(),
    },
    {
      location: { lat: 51.5074, lng: -0.1278 },
      label: "London",
      status: "degraded" as const,
      lastChecked: new Date(),
    },
    {
      location: { lat: 35.6762, lng: 139.6503 },
      label: "Tokyo",
      status: "up" as const,
      lastChecked: new Date(),
    },
    {
      location: { lat: 48.8566, lng: 2.3522 },
      label: "Paris",
      status: "down" as const,
      lastChecked: new Date(),
    },
    {
      location: { lat: -33.8688, lng: 151.2093 },
      label: "Sydney",
      status: "up" as const,
      lastChecked: new Date(),
    },
  ];

  // Example user location (optional)
  const userLocation = {
    lat: 0,
    lng: 0,
    label: "Your Location",
  };

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NextUIProvider>
      <div className="relative min-h-[100vh] bg-black text-white overflow-hidden" ref={containerRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/70 to-black/90"></div>

        {/* Background animated elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[200px]"
            style={{ y, opacity }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[200px]"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[150px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <HeroSection />
          
          {/* UptimeWorldMap Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 mb-4">
                  Global Reach
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Connecting people and businesses across the world with our seamless technology.
                </p>
              </div>
              <UptimeWorldMap 
                regions={regions}
                userLocation={userLocation}
                lineColor="#6366f1"
                pulseIntensity={1}
              />
            </div>
          </section>

          <FeaturesSection loading={loading} />
          <PricingSection loading={loading} />
          <CtaSection loading={loading} />
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: black;
        }
        html, body, #__next {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
    </NextUIProvider>
  );
};

export default LandingPage;