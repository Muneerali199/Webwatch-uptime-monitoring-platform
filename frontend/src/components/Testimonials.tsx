import React from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from './ui/Section';
import { Card3D } from './ui/Card3D';
import { User } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Morgan",
      role: "CTO at TechFront",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "DPIN has been a game-changer for our infrastructure monitoring. The alerts are lightning fast, and the dashboard gives us all the insights we need at a glance.",
    },
    {
      name: "Samantha Lee",
      role: "DevOps Lead at CloudNine",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "After switching to DPIN, our response time to incidents improved by 70%. The global monitoring network ensures we catch issues before our users do.",
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "As a solo developer managing multiple applications, DPIN gives me peace of mind. I can sleep knowing that I'll get alerted if anything goes wrong.",
    },
    {
      name: "Rachel Thompson",
      role: "Engineering Manager at ScaleUp",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "The detailed analytics and historical data have helped us identify patterns and optimize our infrastructure. DPIN pays for itself many times over.",
    },
  ];

  return (
    <Section id="testimonials" className="py-24">
      <SectionTitle
        title="What Our Users Say"
        subtitle="Trusted by developers and teams across the globe to keep their applications running smoothly."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Card3D className="h-full bg-card/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-300 flex-grow">
                  {testimonial.quote}
                </p>
                <div className="flex items-center mt-6 pt-6 border-t border-white/10">
                  <div className="flex-shrink-0 mr-4">
                    {testimonial.avatar ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-20 p-8 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-white/10 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
            <img src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company Logo" className="h-8 grayscale hover:grayscale-0 transition" />
            <img src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company Logo" className="h-8 grayscale hover:grayscale-0 transition" />
            <img src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company Logo" className="h-8 grayscale hover:grayscale-0 transition" />
            <img src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company Logo" className="h-8 grayscale hover:grayscale-0 transition" />
          </div>
          <p className="text-xl text-center md:text-right">
            Trusted by <span className="font-bold text-primary">2,500+</span> companies worldwide
          </p>
        </div>
      </motion.div>
    </Section>
  );
};