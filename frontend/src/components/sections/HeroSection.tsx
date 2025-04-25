import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { fadeIn, float, staggerContainer } from "@/lib/animations";
import Lightning from "@/components/background";
import { WorldMap } from "@/components/ui/world-map";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
      {/* WebGL Background */}
      <div className="absolute inset-0 -z-20">
        <Lightning 
          hue={230} 
          speed={0.5} 
          intensity={1.2} 
          size={1.5}
        />
      </div>

      {/* 3D grid for background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Animated orbs */}
      <motion.div
        variants={float}
        initial="hidden"
        animate="show"
        className="absolute top-1/4 right-[15%] w-48 h-48 rounded-full bg-blue-600/10 blur-3xl -z-10"
      />
      <motion.div
        variants={float}
        initial="hidden"
        animate="show"
        className="absolute bottom-1/3 left-[10%] w-72 h-72 rounded-full bg-purple-600/10 blur-3xl -z-10"
      />

      <div className="container px-4 mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            variants={fadeIn("up")}
            className="inline-flex items-center px-3 py-1 mb-6 text-sm rounded-full bg-primary/10 border border-primary/20 text-primary-foreground backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            Monitoring redefined for modern teams
          </motion.div>

          <motion.h1 
            variants={fadeIn("up", 0.1)}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
          >
            Know when your systems are down{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              before your customers do
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeIn("up", 0.2)}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Comprehensive monitoring and alerting that helps you achieve excellent uptime
            and performance. Get started in minutes with no technical expertise required.
          </motion.p>

          <motion.div 
            variants={fadeIn("up", 0.3)}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <span className="relative z-10 flex items-center">
                Start Monitoring Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl group-hover:opacity-75 transition-opacity opacity-0" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group relative overflow-hidden border-blue-500/30 hover:border-blue-500/50"
            >
              <span className="relative z-10">View Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl group-hover:opacity-75 transition-opacity opacity-0" />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.4)}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
          >
            {["5-minute setup", "No credit card", "14-day free trial", "Cancel anytime"].map((feature) => (
              <div key={feature} className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          className="relative mt-16 mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden border border-border/40 shadow-2xl bg-background/30 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-teal-500/10 pointer-events-none" />
            <div className="p-4">
              <WorldMap 
                className="w-full h-[400px] opacity-80"
                dotColor="rgba(59, 130, 246, 0.5)"
                pulseColor="rgba(59, 130, 246, 0.2)"
                backgroundColor="transparent"
              />
            </div>
          </div>
          
          {/* 3D Effect Decorations */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10" />
          
          {/* Status Indicators */}
          <div className="absolute top-8 right-8 bg-card/80 backdrop-blur-sm border border-border/40 rounded-lg p-3 shadow-lg">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm font-medium">All Systems Operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}