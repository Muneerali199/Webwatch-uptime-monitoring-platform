import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Section, SectionTitle } from './ui/Section';
import { Card3D } from './ui/Card3D';
import { Button } from './ui/Button';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small websites and personal projects",
      features: [
        "10 monitors",
        "30 second check interval",
        "Email notifications",
        "7 day data retention",
        "Basic reporting",
      ],
      notIncluded: [
        "API access",
        "Team members",
        "Custom check locations",
        "Uptime SLA",
      ],
      buttonText: "Start Free Trial",
      popular: false,
      delay: 0,
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Ideal for businesses with multiple services",
      features: [
        "50 monitors",
        "15 second check interval",
        "Email & SMS notifications",
        "30 day data retention", 
        "Advanced reporting",
        "API access",
        "5 team members",
        "3 custom check locations",
      ],
      notIncluded: [
        "Uptime SLA",
      ],
      buttonText: "Start Free Trial",
      popular: true,
      delay: 1,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For mission-critical applications and services",
      features: [
        "Unlimited monitors",
        "5 second check interval",
        "Email, SMS & phone notifications",
        "1 year data retention",
        "Custom reporting",
        "Advanced API access",
        "Unlimited team members",
        "10 custom check locations",
        "99.99% uptime SLA",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      popular: false,
      delay: 2,
    },
  ];

  return (
    <Section id="pricing" className="py-24">
      <SectionTitle
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that's right for your monitoring needs. All plans include a 14-day free trial."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: plan.delay * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex"
          >
            <Card3D
              className={`h-full flex flex-col ${
                plan.popular
                  ? 'border-primary/30 bg-gradient-to-b from-primary/10 to-background/80'
                  : 'border-white/10 bg-card/50'
              } backdrop-blur-sm rounded-xl overflow-hidden`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground py-1 px-3 text-sm text-center font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                
                <div className="mb-6 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-500">
                        <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  variant={plan.popular ? "gradient" : "default"}
                  size="lg"
                  className="w-full mt-auto"
                  glowing={plan.popular}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </Card3D>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg text-gray-300 mb-2">
          Need a custom plan for your specific requirements?
        </p>
        <a href="#" className="text-primary font-medium hover:underline">
          Contact our sales team
        </a>
      </div>
    </Section>
  );
};