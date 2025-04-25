import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import Lightning from "@/components/background";

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* WebGL Background */}
      <div className="absolute inset-0 -z-20">
        <Lightning 
          hue={280}
          speed={0.4}
          intensity={0.6}
          size={1.8}
          xOffset={-0.3}
        />
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-purple-950/80 to-slate-950/80 -z-10">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="container px-4 mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto py-16 px-6 md:px-12 rounded-3xl relative"
        >
          {/* Gradient border using pseudo-element */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-sm -z-10" />
          
          {/* Inner background with glassmorphism */}
          <div className="absolute inset-0.5 rounded-3xl bg-gradient-to-br from-slate-950/80 to-slate-950/90 backdrop-blur-md -z-10" />
          
          <motion.div 
            variants={fadeIn("up")}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Start monitoring your services today
            </h2>
            <p className="text-lg text-muted-foreground mb-0 max-w-2xl mx-auto">
              Join thousands of teams that use BetterUptime to prevent downtime and improve customer satisfaction.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeIn("up", 0.1)}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
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

          {/* 3D decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-20" />
        </motion.div>
      </div>
    </section>
  );
}