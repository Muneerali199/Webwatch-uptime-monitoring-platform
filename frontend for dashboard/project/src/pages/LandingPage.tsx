import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Bell, Zap, Shield, ArrowRight, CheckCircle, Server } from 'lucide-react';
import * as THREE from 'three';

const LandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 3D Background Effect for Hero
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
    <div className="flex flex-col" ref={containerRef}>
      {/* Hero Section with Particles */}
      <section className="relative min-h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full -z-10"
          style={{ opacity: 0.3 }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-indigo-900/80"></div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div 
            className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px]"
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
            className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-500/20 blur-[120px]"
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

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8 text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Activity size={16} />
                <span>Real-time monitoring that never sleeps</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Know when your websites go down,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
                  before your users do
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Real-time monitoring with instant notifications. Keep your online services reliable and your users happy.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <button className="bg-white text-blue-700 hover:bg-blue-50 transition-colors px-6 py-3 rounded-lg font-medium text-center flex items-center gap-2">
                  Start Monitoring <ArrowRight size={18} />
                </button>
                <button className="border border-white text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-lg font-medium text-center">
                  View Demo
                </button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="text-sm text-blue-300">Trusted by developers at:</div>
                <div className="flex gap-8 items-center">
                  {["Company A", "Company B", "Company C"].map((company, i) => (
                    <motion.div 
                      key={i}
                      className="h-8 grayscale opacity-70 hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-white font-medium">{company}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Server size={20} className="text-blue-400" />
                    <span className="font-semibold text-white">System Status</span>
                  </div>
                  <motion.div 
                    className="text-xs px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 flex items-center gap-2"
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
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/70 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    All Systems Operational
                  </motion.div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "API Servers", status: "Operational", uptime: "99.99%" },
                    { name: "Web Dashboard", status: "Operational", uptime: "100%" },
                    { name: "Store Frontend", status: "Degraded", uptime: "99.2%" },
                  ].map((service, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          service.status === "Operational" ? "bg-green-500" : 
                          service.status === "Degraded" ? "bg-yellow-500" : "bg-red-500"
                        }`}></div>
                        <span className="font-medium text-white">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${
                          service.status === "Operational" ? "text-green-400" : 
                          service.status === "Degraded" ? "text-yellow-400" : "text-red-400"
                        } flex items-center gap-1`}>
                          <CheckCircle size={14} />
                          {service.status}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                          {service.uptime}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-6 pt-6 border-t border-white/10 text-sm text-blue-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Last updated: Just now
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute -z-10 bottom-1/4 right-1/4 w-1/2 h-1/2 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Everything you need to ensure{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                reliability
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our comprehensive monitoring solution keeps you informed about your services' health.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity size={24} />,
                title: "Real-time Monitoring",
                description: "Check your websites' status every 30 seconds. Detect issues before they impact your users.",
                color: "blue"
              },
              {
                icon: <Bell size={24} />,
                title: "Instant Alerts",
                description: "Get notified immediately via email, SMS, Slack, or webhook when your services go down.",
                color: "green"
              },
              {
                icon: <Shield size={24} />,
                title: "Detailed Insights",
                description: "View uptime history, response times, and detailed status reports for all your services.",
                color: "indigo"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`p-3 bg-${feature.color}-500/10 text-${feature.color}-400 rounded-full w-fit mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Simple,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                transparent
              </span>{" "}
              pricing
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Start for free, upgrade as you grow. No long-term contracts.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                description: "Get started with basic monitoring",
                price: "$0",
                features: [
                  "Up to 3 websites",
                  "5 minute check interval",
                  "Email notifications",
                  "1 day data retention"
                ],
                highlight: false
              },
              {
                name: "Pro",
                description: "Perfect for growing businesses",
                price: "$29",
                features: [
                  "Up to 25 websites",
                  "1 minute check interval",
                  "Email, SMS, Slack alerts",
                  "30 days data retention",
                  "API access"
                ],
                highlight: true
              },
              {
                name: "Enterprise",
                description: "For large organizations",
                price: "$99",
                features: [
                  "Unlimited websites",
                  "30 second check interval",
                  "All notification channels",
                  "90 days data retention",
                  "Advanced integrations",
                  "Dedicated support"
                ],
                highlight: false
              }
            ].map((plan, i) => (
              <motion.div 
                key={i}
                className={`relative p-8 rounded-xl border ${
                  plan.highlight 
                    ? "border-indigo-500 bg-gradient-to-b from-gray-900 to-gray-900 shadow-xl shadow-indigo-500/20" 
                    : "border-gray-800 bg-gray-900"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full text-center ${
                  plan.highlight 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                } transition-colors px-6 py-3 rounded-lg font-medium`}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Start monitoring your websites{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              today
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of companies that trust our platform to keep their services reliable.
          </motion.p>
          <motion.button
            className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 transition-colors px-6 py-3 rounded-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;