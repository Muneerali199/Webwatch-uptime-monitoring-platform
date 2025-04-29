"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CheckCircle, AlertTriangle, Server, Zap, Activity, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

const StatusIndicator: React.FC<{ status: 'operational' | 'degraded' | 'down' }> = ({ status }) => {
  const statusConfig = {
    operational: {
      color: 'bg-cyan-400',
      pulseColor: 'bg-cyan-300',
      icon: <CheckCircle size={18} className="text-cyan-300" />,
      label: 'Operational'
    },
    degraded: {
      color: 'bg-amber-400',
      pulseColor: 'bg-amber-300',
      icon: <AlertTriangle size={18} className="text-amber-300" />,
      label: 'Degraded'
    },
    down: {
      color: 'bg-rose-400',
      pulseColor: 'bg-rose-300',
      icon: <AlertTriangle size={18} className="text-rose-300" />,
      label: 'Down'
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="relative flex items-center justify-center">
        <span className={`absolute h-4 w-4 rounded-full ${config.pulseColor} opacity-50 animate-ping-slow`}></span>
        <span className={`relative h-3 w-3 rounded-full ${config.color} glow-${config.color.replace('bg-', '')}`}></span>
      </div>
      <span className="text-sm font-medium text-gray-50">{config.label}</span>
    </motion.div>
  );
};

const ServiceStatusCard: React.FC<{ 
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  responseTime?: string;
}> = ({ 
  name, 
  status, 
  uptime,
  responseTime
}) => {
  const statusColor = {
    operational: 'text-cyan-300',
    degraded: 'text-amber-300',
    down: 'text-rose-300'
  };

  const statusBg = {
    operational: 'bg-cyan-500/10',
    degraded: 'bg-amber-500/10',
    down: 'bg-rose-500/10'
  };

  const statusBorder = {
    operational: 'border-cyan-500/30',
    degraded: 'border-amber-500/30',
    down: 'border-rose-500/30'
  };

  return (
    <motion.div 
      className={cn(
        "p-4 rounded-xl border backdrop-blur-xl bg-gradient-to-br from-gray-900/20 to-black/20",
        "transform transition-all duration-600 hover:-translate-y-2",
        "relative overflow-hidden perspective-1000",
        statusBorder[status]
      )}
      initial={{ rotateX: 5, rotateY: 5 }}
      whileHover={{ 
        rotateX: 10, 
        rotateY: 10, 
        scale: 1.02,
        boxShadow: `0 20px 40px -10px ${status === 'operational' ? 'rgba(34, 211, 238, 0.3)' : status === 'degraded' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${statusBg[status]} flex items-center justify-center border ${statusBorder[status]}`}>
            {status === 'operational' ? (
              <CheckCircle size={22} className={statusColor[status]} />
            ) : (
              <AlertTriangle size={22} className={statusColor[status]} />
            )}
          </div>
          <div>
            <h4 className="font-medium text-white">{name}</h4>
            {responseTime && (
              <p className="text-xs text-gray-300">Avg. response: {responseTime}ms</p>
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

export const SystemStatus: React.FC = () => {
  const services = [
    { 
      name: "API Servers", 
      status: "operational" as const, 
      uptime: "99.99%",
      responseTime: "42",
      icon: <Server size={18} />
    },
    { 
      name: "Web Dashboard", 
      status: "operational" as const, 
      uptime: "100%",
      responseTime: "28",
      icon: <Activity size={18} />
    },
    { 
      name: "Store Frontend", 
      status: "degraded" as const, 
      uptime: "99.2%",
      responseTime: "112",
      icon: <Zap size={18} />
    },
    { 
      name: "Payment Gateway", 
      status: "operational" as const, 
      uptime: "99.95%",
      responseTime: "76",
      icon: <Shield size={18} />
    }
  ];

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      controls.start({
        rotateX: -y * 10,
        rotateY: x * 10,
        transition: { type: 'spring', stiffness: 150, damping: 20 }
      });
    };

    const handleMouseLeave = () => {
      controls.start({
        rotateX: 0,
        rotateY: 0,
        transition: { type: 'spring', stiffness: 150, damping: 20 }
      });
    };

    ref.current?.addEventListener('mousemove', handleMouseMove);
    ref.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
      className="relative perspective-1000"
    >
      {/* Floating background elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          x: [0, -15, 0],
          y: [0, -20, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        animate={controls}
        className="relative bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/20 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-cyan-500/40 via-purple-500/40 to-pink-500/40 pointer-events-none z-0" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent opacity-30 pointer-events-none" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.4
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, (Math.random() - 0.5) * 20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Server size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                System Status
              </span>
            </h3>
          </div>
          <motion.div 
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/30"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [1, 0.9, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300"></span>
            </span>
            All Systems Operational
          </motion.div>
        </div>
        
        <div className="p-6 space-y-4 relative z-10">
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
        
        <div className="p-4 border-t border-cyan-500/20 text-sm text-gray-300 flex justify-between items-center bg-gradient-to-t from-black/30 to-transparent">
          <div>Last updated: Just now</div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 animate-pulse"></span>
            <span>Live updates</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

