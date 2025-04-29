import React from 'react';
import { Activity, Mail, Github as GitHub, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-gray-300 border-t border-gray-800/50">
      {/* 3D Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Floating Diamond Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-gray-700 to-gray-900 w-2 h-2 rotate-45 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Activity size={28} className="text-blue-400 glow" />
              <span className="text-2xl font-bold text-white">
                WebWatch
              </span>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mb-6 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Real-time website monitoring made simple. Know when your services are down before your customers do.
            </motion.p>
            
            <motion.div 
              className="flex space-x-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full border border-gray-800 hover:border-blue-400/30 hover:bg-blue-400/10"
                whileHover={{ y: -3 }}
              >
                <Twitter size={18} className="glow-icon" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-full border border-gray-800 hover:border-purple-400/30 hover:bg-purple-400/10"
                whileHover={{ y: -3 }}
              >
                <GitHub size={18} className="glow-icon" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-pink-400 transition-colors p-2 rounded-full border border-gray-800 hover:border-pink-400/30 hover:bg-pink-400/10"
                whileHover={{ y: -3 }}
              >
                <Mail size={18} className="glow-icon" />
              </motion.a>
            </motion.div>
          </div>
          
          {/* Links Sections */}
          <FooterLinksSection 
            title="Product"
            links={[
              { name: "Features", href: "#" },
              { name: "Pricing", href: "#" },
              { name: "API", href: "#" },
              { name: "Integrations", href: "#" },
            ]}
            delay={0.1}
          />
          
          <FooterLinksSection 
            title="Resources"
            links={[
              { name: "Documentation", href: "#" },
              { name: "Blog", href: "#" },
              { name: "Status Page", href: "#" },
              { name: "Support", href: "#" },
            ]}
            delay={0.2}
          />
          
          <FooterLinksSection 
            title="Company"
            links={[
              { name: "About", href: "#" },
              { name: "Careers", href: "#" },
              { name: "Privacy", href: "#" },
              { name: "Terms", href: "#" },
            ]}
            delay={0.3}
          />
        </div>
        
        {/* Bottom Copyright */}
        <motion.div 
          className="border-t border-gray-800/50 mt-16 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} WebWatch. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs hover:underline">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs hover:underline">Cookie Policy</a>
          </div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .glow-icon {
          filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.3));
          transition: all 0.3s ease;
        }
        .glow-icon:hover {
          filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5));
        }
      `}</style>
    </footer>
  );
};

// Reusable Footer Links Section Component
const FooterLinksSection: React.FC<{ 
  title: string; 
  links: { name: string; href: string }[];
  delay?: number;
}> = ({ title, links, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <h3 className="text-white font-medium mb-6 text-lg relative inline-block group">
        {title}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
      </h3>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <motion.li 
            key={link.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + (index * 0.1) }}
            viewport={{ once: true }}
          >
            <a 
              href={link.href} 
              className={cn(
                "text-gray-400 hover:text-white transition-colors flex items-center group",
                "hover:translate-x-1 duration-200"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform group-hover:scale-125"></span>
              {link.name}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Footer;