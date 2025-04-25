import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import Lightning from "@/components/background";

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* WebGL Background */}
      <div className="absolute inset-0 -z-20">
        <Lightning 
          hue={260}
          speed={0.3}
          intensity={0.8}
          size={2}
          xOffset={0.5}
        />
      </div>
      
      {/* 3D background */}
      <div className="absolute inset-0 bg-blue-950/30 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_110%)]" />
      </div>
      
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl -z-10" />
      </motion.div>

      <div className="container px-4 mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {STATS.map((stat, index) => (
            <motion.div 
              key={stat.label}
              variants={fadeIn("up", index * 0.1)}
              className={cn(
                "relative p-6 rounded-xl group",
                "bg-gradient-to-br from-background/80 via-background/40 to-background/80",
                "backdrop-blur-md border border-border/30",
                "hover:border-blue-500/30 transition-all duration-300"
              )}
            >
              <div className="text-center relative z-10">
                <p className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {stat.value}
                  <span className="text-white/90">{stat.suffix}</span>
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
              
              {/* 3D decorative elements */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}