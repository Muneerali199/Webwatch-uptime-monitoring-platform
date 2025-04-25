import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { PRICING_PLANS } from "@/lib/constants";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import Lightning from "@/components/background";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      {/* WebGL Background */}
      <div className="absolute inset-0 -z-20">
        <Lightning 
          hue={250}
          speed={0.45}
          intensity={0.7}
          size={1.6}
          xOffset={-0.2}
        />
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm" />
      </div>

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
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", 0.1)}
            className="text-lg text-muted-foreground"
          >
            No hidden fees or long-term contracts. All plans include a 14-day free trial.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeIn("up", index * 0.1)}
              className={cn(
                "relative group",
                "transition-all duration-500 hover:transform hover:scale-[1.02]"
              )}
            >
              <div className={cn(
                "relative flex flex-col h-full p-8 rounded-2xl backdrop-blur-sm transition-all duration-300",
                plan.popular
                  ? "bg-gradient-to-b from-blue-950/50 to-purple-950/50 border-2 border-blue-500/50"
                  : "bg-card/30 border border-border hover:border-blue-500/30"
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline mb-5">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-auto w-full relative overflow-hidden group",
                    plan.popular 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                      : "hover:border-blue-500/50"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-75 transition-opacity" />
                </Button>

                {/* Enhanced 3D glow effect */}
                {plan.popular ? (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-100 blur-sm -z-10 group-hover:blur-md transition-all" />
                ) : (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-600/0 opacity-0 blur-sm -z-10 group-hover:from-blue-500/10 group-hover:to-purple-600/10 group-hover:opacity-100 transition-all" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-12 text-muted-foreground text-sm"
        >
          Need a custom plan? <a href="#" className="text-blue-400 hover:underline">Contact our sales team</a>
        </motion.div>
      </div>
    </section>
  );
}