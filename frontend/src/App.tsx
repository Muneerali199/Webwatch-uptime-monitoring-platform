import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/hooks/use-theme';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { theme } = useTheme();
  
  useEffect(() => {
    document.title = 'BetterUptime - Modern Monitoring Platform';
  }, []);
  
  return (
    <AnimatePresence>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        {/* Main content container with proper z-index */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <PricingSection />
            <TestimonialsSection />
            <CtaSection />
          </main>
          <Footer />
        </div>

        {/* Background color overlay */}
        <div className="fixed inset-0 bg-background/80 backdrop-blur-[2px] z-0" />
      </div>
    </AnimatePresence>
  );
}

export default App;