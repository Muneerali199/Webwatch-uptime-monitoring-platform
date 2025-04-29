"use client";

import React, { useState, useEffect, useRef } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Bell, Shield, ArrowRight, CheckCircle, Server, AlertTriangle, ChevronRight } from 'lucide-react';
import * as THREE from 'three';
import { cn } from '../lib/utils';
import { ButtonProps } from '../types';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    color: string;
    trailLength: number;
    angle: number;
    twinkleSpeed: number;
  }>>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    const staticStars = Array.from({ length: 500 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: 0,
      opacity: Math.random() * 0.7 + 0.1,
      color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`,
      trailLength: 0,
      angle: 0,
      twinkleSpeed: Math.random() * 0.02 + 0.01
    }));

    const shootingStars = Array.from({ length: 20 }).map((_, i) => {
      const angle = Math.PI / 4 + (Math.random() * Math.PI / 4);
      const speed = Math.random() * 8 + 3;
      const hue = Math.random() * 60 + 200;
      return {
        id: i + 500,
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed,
        opacity: Math.random() * 0.8 + 0.2,
        color: `hsl(${hue}, 100%, ${Math.random() * 30 + 70}%)`,
        trailLength: Math.random() * 150 + 50,
        angle,
        twinkleSpeed: 0
      };
    });

    const specialStars = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 520,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 2,
      speed: 0,
      opacity: Math.random() * 0.9 + 0.1,
      color: `hsl(${Math.random() * 30 + 30}, 100%, ${Math.random() * 20 + 80}%)`,
      trailLength: 0,
      angle: 0,
      twinkleSpeed: Math.random() * 0.03 + 0.01
    }));

    setStars([...staticStars, ...shootingStars, ...specialStars]);

    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          let newOpacity = star.opacity;
          if (star.twinkleSpeed > 0) {
            newOpacity = star.opacity + Math.sin(Date.now() * star.twinkleSpeed) * 0.2;
            newOpacity = Math.max(0.1, Math.min(1, newOpacity));
          }
          
          if (star.speed === 0) return { ...star, opacity: newOpacity };
          
          const velocityX = Math.cos(star.angle) * star.speed;
          const velocityY = Math.sin(star.angle) * star.speed;
          
          let newX = star.x + velocityX;
          let newY = star.y + velocityY;
          
          if (
            newX < -100 || 
            newX > window.innerWidth + 100 || 
            newY > window.innerHeight + 100
          ) {
            const hue = Math.random() * 60 + 200;
            return {
              ...star,
              x: Math.random() * window.innerWidth,
              y: -50 - Math.random() * 100,
              size: Math.random() * 3 + 1,
              opacity: Math.random() * 0.8 + 0.2,
              color: `hsl(${hue}, 100%, ${Math.random() * 30 + 70}%)`,
              angle: Math.PI / 4 + (Math.random() * Math.PI / 4),
              speed: Math.random() * 8 + 3
            };
          }
          
          return { ...star, x: newX, y: newY, opacity: newOpacity };
        })
      );
      requestAnimationFrame(animateStars);
    };
    
    const animationId = requestAnimationFrame(animateStars);
    
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full -z-10 opacity-30';
    document.getElementById('particles-container')?.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i+1] = (Math.random() - 0.5) * 10;
      posArray[i+2] = (Math.random() - 0.5) * 10;
      
      const color = new THREE.Color(
        Math.random() * 0.2 + 0.8,
        Math.random() * 0.2 + 0.8,
        Math.random() * 0.3 + 0.7
      );
      colorArray[i] = color.r;
      colorArray[i+1] = color.g;
      colorArray[i+2] = color.b;
      
      sizeArray[i/3] = Math.random() * 0.1 + 0.05;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(100 * 3 * 2);
    let lineIndex = 0;
    
    for (let i = 0; i < 100; i++) {
      const p1 = Math.floor(Math.random() * particlesCount);
      const p2 = Math.floor(Math.random() * particlesCount);
      
      linePositions[lineIndex++] = posArray[p1 * 3];
      linePositions[lineIndex++] = posArray[p1 * 3 + 1];
      linePositions[lineIndex++] = posArray[p1 * 3 + 2];
      
      linePositions[lineIndex++] = posArray[p2 * 3];
      linePositions[lineIndex++] = posArray[p2 * 3 + 1];
      linePositions[lineIndex++] = posArray[p2 * 3 + 2];
    }
    
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5555aa,
      transparent: true,
      opacity: 0.2,
      linewidth: 1
    });
    
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      particlesMesh.rotation.y = elapsedTime * 0.01;
      particlesMesh.rotation.x = elapsedTime * 0.005;
      
      particlesMaterial.size = 0.1 + Math.sin(elapsedTime * 0.5) * 0.02;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  const SkeletonLoader = ({ className = '' }: { className?: string }) => (
    <div className={cn(
      "animate-pulse bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
      "bg-[length:200%_100%] animate-shimmer",
      className
    )} />
  );

  const PrimaryButton = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    size = 'default',
    ...props 
  }: ButtonProps) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      default: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <motion.button
        className={cn(
          "relative group overflow-hidden rounded-xl font-medium",
          "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
          "text-white shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center gap-2",
          sizeClasses[size],
          className
        )}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute -inset-8 bg-gradient-to-r from-white/20 via-white/50 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
        </span>
        
        <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="absolute inset-0 rounded-xl border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300" />
        
        <span className="relative z-10 flex items-center gap-2">
          {Icon && iconPosition === 'left' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </motion.button>
    );
  };

  const SecondaryButton = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    size = 'default',
    ...props 
  }: ButtonProps) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      default: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <motion.button
        className={cn(
          "relative group overflow-hidden rounded-xl font-medium",
          "bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 hover:border-gray-600",
          "text-white shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center gap-2",
          sizeClasses[size],
          className
        )}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute -inset-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
        </span>
        
        <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300" />
        
        <span className="relative z-10 flex items-center gap-2">
          {Icon && iconPosition === 'left' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </motion.button>
    );
  };

  const OutlineButton = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    size = 'default',
    ...props 
  }: ButtonProps) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      default: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <motion.button
        className={cn(
          "relative group overflow-hidden rounded-xl font-medium",
          "bg-transparent border-2 border-blue-400/30 hover:border-blue-400/60",
          "text-blue-400 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center gap-2",
          sizeClasses[size],
          className
        )}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="absolute inset-0 rounded-xl border-2 border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-300" />
        
        <span className="relative z-10 flex items-center gap-2">
          {Icon && iconPosition === 'left' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </motion.button>
    );
  };

  const GradientButton = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    size = 'default',
    ...props 
  }: ButtonProps) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      default: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <motion.button
        className={cn(
          "relative group overflow-hidden rounded-xl font-medium",
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500",
          "text-white shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center gap-2",
          sizeClasses[size],
          className
        )}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="absolute -inset-8 bg-gradient-to-r from-white/20 via-white/50 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
        
        <span className="absolute inset-0 rounded-xl border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300" />
        
        <span className="relative z-10 flex items-center gap-2">
          {Icon && iconPosition === 'left' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </motion.button>
    );
  };

  const GlassButton = ({ 
    children, 
    className = '', 
    icon: Icon,
    iconPosition = 'right',
    size = 'default',
    ...props 
  }: ButtonProps) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      default: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <motion.button
        className={cn(
          "relative group overflow-hidden rounded-xl font-medium",
          "bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20",
          "text-white shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center gap-2",
          sizeClasses[size],
          className
        )}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="absolute -inset-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
        
        <span className="relative z-10 flex items-center gap-2">
          {Icon && iconPosition === 'left' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon size={size === 'lg' ? 20 : 16} className="transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </motion.button>
    );
  };

  const StatusIndicator = ({ status }: { status: 'operational' | 'degraded' | 'down' }) => {
    const statusConfig = {
      operational: {
        color: 'bg-green-500',
        pulseColor: 'bg-green-400',
        icon: <CheckCircle size={16} className="text-green-400" />,
        label: 'Operational'
      },
      degraded: {
        color: 'bg-yellow-500',
        pulseColor: 'bg-yellow-400',
        icon: <AlertTriangle size={16} className="text-yellow-400" />,
        label: 'Degraded'
      },
      down: {
        color: 'bg-red-500',
        pulseColor: 'bg-red-400',
        icon: <AlertTriangle size={16} className="text-red-400" />,
        label: 'Down'
      }
    };

    const config = statusConfig[status];

    return (
      <motion.div 
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative flex items-center justify-center">
          <span className={`absolute h-3 w-3 rounded-full ${config.pulseColor} opacity-75 animate-ping`}></span>
          <span className={`relative h-2.5 w-2.5 rounded-full ${config.color}`}></span>
        </div>
        <span className="text-sm font-medium text-gray-300">{config.label}</span>
      </motion.div>
    );
  };

  const ServiceStatusCard = ({ 
    name, 
    status, 
    uptime,
    responseTime
  }: {
    name: string;
    status: 'operational' | 'degraded' | 'down';
    uptime: string;
    responseTime?: string;
  }) => {
    const statusColor = {
      operational: 'text-green-400',
      degraded: 'text-yellow-400',
      down: 'text-red-400'
    };

    const statusBg = {
      operational: 'bg-green-500/10',
      degraded: 'bg-yellow-500/10',
      down: 'bg-red-500/10'
    };

    return (
      <motion.div 
        className={cn(
          "p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300",
          "bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm",
          "hover:shadow-lg hover:shadow-blue-500/10"
        )}
        whileHover={{ y: -3, scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${statusBg[status]} flex items-center justify-center`}>
              {status === 'operational' ? (
                <CheckCircle size={20} className={statusColor[status]} />
              ) : (
                <AlertTriangle size={20} className={statusColor[status]} />
              )}
            </div>
            <div>
              <h4 className="font-medium text-white">{name}</h4>
              {responseTime && (
                <p className="text-xs text-gray-500">Avg. response: {responseTime}ms</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusBg[status]} ${statusColor[status]}`}>
              {uptime} uptime
            </div>
            <StatusIndicator status={status} />
          </div>
        </div>
      </motion.div>
    );
  };

  const SystemStatus = () => {
    const services = [
      { 
        name: "API Servers", 
        status: "operational" as const, 
        uptime: "99.99%",
        responseTime: "42"
      },
      { 
        name: "Web Dashboard", 
        status: "operational" as const, 
        uptime: "100%",
        responseTime: "28"
      },
      { 
        name: "Store Frontend", 
        status: "degraded" as const, 
        uptime: "99.2%",
        responseTime: "112"
      },
      { 
        name: "Payment Gateway", 
        status: "operational" as const, 
        uptime: "99.95%",
        responseTime: "76"
      }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 pointer-events-none" />
          
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">System Status</h3>
            </div>
            <motion.div 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm"
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              All Systems Operational
            </motion.div>
          </div>
          
          <div className="p-6 space-y-4">
            {services.map((service, index) => (
              <ServiceStatusCard
                key={index}
                name={service.name}
                status={service.status}
                uptime={service.uptime}
                responseTime={service.responseTime}
              />
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-800 text-sm text-gray-500 flex justify-between items-center">
            <div>Last updated: Just now</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Live updates</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <NextUIProvider>
      <div className="relative min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>
        {stars.map(star => {
          if (star.speed === 0) {
            return (
              <div
                key={star.id}
                className="absolute rounded-full pointer-events-none transition-opacity duration-1000"
                style={{
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  background: star.color,
                  opacity: star.opacity,
                  boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${star.color}`,
                  zIndex: 1,
                }}
              />
            );
          } else {
            const velocityX = Math.cos(star.angle) * star.speed;
            const velocityY = Math.sin(star.angle) * star.speed;
            const trailAngle = Math.atan2(velocityY, velocityX);
            
            return (
              <React.Fragment key={star.id}>
                <div
                  className="absolute rounded-full pointer-events-none transition-transform duration-100"
                  style={{
                    left: `${star.x}px`,
                    top: `${star.y}px`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    background: star.color,
                    opacity: star.opacity,
                    boxShadow: `0 0 ${star.size * 8}px ${star.size * 3}px ${star.color}`,
                    filter: 'blur(0.5px)',
                    zIndex: 10,
                    transform: `rotate(${star.angle}rad)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                />
                
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${star.x}px`,
                    top: `${star.y}px`,
                    width: `${star.trailLength}px`,
                    height: `${star.size * 0.7}px`,
                    background: `linear-gradient(90deg, transparent 0%, ${star.color} 30%, ${star.color} 70%, transparent 100%)`,
                    transform: `rotate(${trailAngle}rad)`,
                    transformOrigin: '0 0',
                    opacity: star.opacity * 0.8,
                    zIndex: 9,
                    filter: 'blur(1px)',
                  }}
                />
              </React.Fragment>
            );
          }
        })}

        <div id="particles-container" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>

        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[200px]"
            style={{ y, opacity }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[200px]"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[150px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        <div className="relative z-10">
          <section className="relative min-h-screen overflow-hidden flex items-center">
            <div className="container mx-auto px-4 py-32 relative z-10">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <SkeletonLoader className="w-64 h-8" />
                    <SkeletonLoader className="w-full h-16" />
                    <SkeletonLoader className="w-3/4 h-6" />
                    <div className="flex gap-4 mt-8">
                      <SkeletonLoader className="w-32 h-12" />
                      <SkeletonLoader className="w-32 h-12" />
                    </div>
                    <div className="flex flex-col gap-4 mt-12">
                      <SkeletonLoader className="w-48 h-4" />
                      <div className="flex gap-8">
                        {[1, 2, 3].map(i => <SkeletonLoader key={i} className="w-24 h-8" />)}
                      </div>
                    </div>
                  </div>
                  <SkeletonLoader className="w-full h-[500px] rounded-2xl" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <motion.div 
                    className="space-y-8 text-white"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm backdrop-blur-sm"
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
                      className="text-xl text-gray-400"
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
                      <GradientButton 
                        icon={ArrowRight}
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Monitoring
                      </GradientButton>
                      
                      <GlassButton 
                        icon={ChevronRight}
                        className="flex-1"
                      >
                        View Demo
                      </GlassButton>
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col gap-4 mt-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <div className="text-sm text-gray-500">Trusted by developers at:</div>
                      <div className="flex gap-8 items-center">
                        {["TechCorp", "WebSolutions", "DigitalLabs"].map((company, i) => (
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
                  
                  <SystemStatus />
                </div>
              )}
            </div>
          </section>

          <section className="py-16 md:py-24 bg-black/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <SkeletonLoader className="w-3/4 h-12 mx-auto mb-6" />
                  <SkeletonLoader className="w-1/2 h-6 mx-auto" />
                </div>
              ) : (
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
                    className="text-xl text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Our comprehensive monitoring solution keeps you informed about your services' health.
                  </motion.p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonLoader key={i} className="w-full h-64" />
                  ))
                ) : (
                  [
                    {
                      icon: <Activity size={24} className="text-blue-400" />,
                      title: "Real-time Monitoring",
                      description: "Check your websites' status every 30 seconds. Detect issues before they impact your users.",
                      color: "blue"
                    },
                    {
                      icon: <Bell size={24} className="text-green-400" />,
                      title: "Instant Alerts",
                      description: "Get notified immediately via email, SMS, Slack, or webhook when your services go down.",
                      color: "green"
                    },
                    {
                      icon: <Shield size={24} className="text-indigo-400" />,
                      title: "Detailed Insights",
                      description: "View uptime history, response times, and detailed status reports for all your services.",
                      color: "indigo"
                    }
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <div className={`p-3 bg-${feature.color}-500/10 rounded-full w-fit mb-6`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-black/90 backdrop-blur-md">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <SkeletonLoader className="w-3/4 h-12 mx-auto mb-6" />
                  <SkeletonLoader className="w-1/2 h-6 mx-auto" />
                </div>
              ) : (
                <div className="max-w-5xl mx-auto">
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
                      className="text-xl text-gray-500"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      Start for free, upgrade as you grow. No long-term contracts.
                    </motion.p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                            ? "border-indigo-500 bg-gradient-to-b from-gray-900/50 to-black shadow-xl shadow-indigo-500/20" 
                            : "border-gray-800 bg-gray-900/50"
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
                        {plan.highlight ? (
                          <PrimaryButton 
                            icon={ArrowRight}
                            className="w-full"
                          >
                            Get Started
                          </PrimaryButton>
                        ) : (
                          <SecondaryButton 
                            icon={plan.name === "Enterprise" ? null : ArrowRight}
                            className="w-full"
                          >
                            {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                          </SecondaryButton>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900/70 to-indigo-900/70 relative overflow-hidden">
            <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
                filter: 'blur(100px)'
              }}
            />
            <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] opacity-15 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.6) 0%, transparent 70%)',
                filter: 'blur(120px)'
              }}
            />
            <div className="container mx-auto px-4 text-center relative z-10">
              {loading ? (
                <>
                  <SkeletonLoader className="w-3/4 h-12 mx-auto mb-6" />
                  <SkeletonLoader className="w-1/2 h-6 mx-auto mb-8" />
                  <SkeletonLoader className="w-48 h-12 mx-auto" />
                </>
              ) : (
                <>
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
                    className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Join thousands of companies that trust our platform to keep their services reliable.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-4"
                  >
                    <PrimaryButton 
                      icon={ArrowRight}
                      size="lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started Free
                    </PrimaryButton>
                    
                    <OutlineButton 
                      icon={ChevronRight}
                      size="lg"
                    >
                      Schedule Demo
                    </OutlineButton>
                  </motion.div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </NextUIProvider>
  );
};

export default LandingPage;