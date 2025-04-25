import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-3xl -z-10"
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
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.h2 
            variants={fadeIn("up")} 
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Trusted by thousands of teams
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", 0.1)} 
            className="text-lg text-muted-foreground"
          >
            See what our customers have to say about BetterUptime
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={fadeIn("up", index * 0.1)}
              className="relative group"
            >
              <div className={cn(
                "relative h-full p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden",
                "transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
              )}>
                <div className="mb-6 relative">
                  {/* Quote mark decoration */}
                  <div className="absolute -top-4 -left-2 text-6xl opacity-10 font-serif">"</div>
                  <p className="text-muted-foreground relative z-10">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* 3D hover effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Background glow on hover */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-600/0 opacity-0 blur group-hover:from-blue-500/10 group-hover:to-purple-600/10 group-hover:opacity-100 transition-all duration-500 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}