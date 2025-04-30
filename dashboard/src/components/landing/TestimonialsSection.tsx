"use client";

import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

const testimonials = [
  {
    name: "Jane Doe",
    role: "Web Developer",
    quote: "This platform transformed how I monitor my websites. It's intuitive and powerful!",
    avatar: "https://i.pravatar.cc/150?u=jane",
  },
  {
    name: "John Smith",
    role: "Startup Founder",
    quote: "The uptime alerts saved us from major downtime. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    name: "Emily Chen",
    role: "Designer",
    quote: "Beautiful interface and seamless experience. It's a game-changer!",
    avatar: "https://i.pravatar.cc/150?u=emily",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/50 to-indigo-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            What Our Users Say
          </h2>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] max-w-[300px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-indigo-900/30 backdrop-blur-lg border border-indigo-500/20">
                  <CardHeader className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-indigo-300">{testimonial.role}</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-white text-sm">"{testimonial.quote}"</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};