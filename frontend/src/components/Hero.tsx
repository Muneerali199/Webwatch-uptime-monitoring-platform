import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ArrowRight, Server, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { GlowingText } from './ui/GlowingText';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 3D Background Effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <Section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        style={{ opacity: 0.3 }}
      />
      
      <div ref={containerRef} className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div 
            className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary/20 blur-[120px]"
            style={{ y, opacity }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/20 blur-[120px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Activity size={16} />
              <span>Real-time monitoring that never sleeps</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Advanced{" "}
              <GlowingText 
                glowColor="text-primary" 
                color="text-white"
                glowIntensity="high"
                animateGlow
              >
                uptime monitoring
              </GlowingText>{" "}
              for your applications
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Get instant alerts and detailed insights when your services go down. Monitor your entire stack with DPIN's powerful platform.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button variant="gradient" size="xl" glowing>
                Start Monitoring
                <ArrowRight size={18} />
              </Button>
              <Button variant="default" size="xl">
                View Demo
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex flex-col gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="text-sm text-gray-400">Trusted by developers at:</div>
              <div className="flex gap-8 items-center">
                <motion.img 
                  src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Company Logo" 
                  className="h-8 grayscale opacity-70 hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.img 
                  src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Company Logo" 
                  className="h-8 grayscale opacity-70 hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.img 
                  src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Company Logo" 
                  className="h-8 grayscale opacity-70 hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-card/30 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden transform perspective-1000">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Server size={20} className="text-primary" />
                  <span className="font-semibold">System Status</span>
                </div>
                <motion.div 
                  className="text-xs px-3 py-1.5 rounded-full bg-success/20 text-success-500 flex items-center gap-2"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/70 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  All Systems Operational
                </motion.div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "API Servers", region: "US-East", status: "Operational", uptime: "99.99%" },
                  { name: "Web Dashboard", region: "EU-West", status: "Operational", uptime: "99.98%" },
                  { name: "Database Cluster", region: "US-West", status: "Operational", uptime: "99.95%" },
                  { name: "CDN Network", region: "Global", status: "Operational", uptime: "100%" },
                ].map((service, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{service.name}</span>
                      <span className="text-xs text-gray-400">{service.region}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-success flex items-center gap-1">
                        <CheckCircle size={14} />
                        {service.status}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {service.uptime}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-6 pt-6 border-t border-white/10 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Last updated: 2 minutes ago
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -z-10 bottom-1/4 right-1/4 w-1/2 h-1/2 bg-secondary/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>
      </div>
    </Section>
  );
};