import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { FEATURES } from "@/lib/constants";
import Lightning from "@/components/background";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      {/* WebGL Background */}
      <div className="absolute inset-0 -z-20">
        <Lightning 
          hue={240}
          speed={0.35}
          intensity={0.9}
          size={1.7}
          xOffset={0.2}
        />
      </div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm" />
      </div>
      
      <motion.div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20 blur-3xl -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      
      <div className="container px-4 mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeIn("up")}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Know about every issue, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">instantly</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-0">
              Our platform provides comprehensive monitoring solutions to keep your systems running smoothly.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeIn("up", index * 0.1)}
              className="relative group"
            >
              <div className="relative z-10 h-full p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-card/50 hover:transform hover:scale-[1.02] hover:shadow-2xl">
                <div className={`mb-5 p-3 rounded-lg w-14 h-14 flex items-center justify-center ${feature.color} backdrop-blur-sm`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>

                {/* Enhanced 3D depth effect for the cards */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 -z-20 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-blue-500/20 transition-all duration-1000 animate-gradient" />
              </div>
              
              {/* Enhanced background glow on hover */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-600/0 opacity-0 blur-xl group-hover:from-blue-500/30 group-hover:to-purple-600/30 group-hover:opacity-100 transition-all duration-500 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}