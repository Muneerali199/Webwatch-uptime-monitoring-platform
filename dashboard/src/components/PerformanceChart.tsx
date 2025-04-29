
"use client";

import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    name: string;
    responseTime: number;
    uptime: number;
  }>;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => (
  <motion.div 
    className="relative rounded-2xl border border-gray-900/70 bg-black backdrop-blur-lg p-6 mb-8 shadow-2xl glow-ultra overflow-hidden"
    initial={{ opacity: 0, scale: 0.95, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    whileHover={{ scale: 1.02 }}
  >
    {/* Background Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-20 animate-pulse-slow" />

    {/* Title */}
    <h3 className="text-2xl font-bold text-white mb-6 tracking-tight glow-neon">
      Response Times
    </h3>

    {/* Chart Container */}
    <div className="h-96 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart 
          data={data}
          margin={{ top: 15, right: 30, left: 10, bottom: 15 }}
        >
          {/* Custom Gradient and Glow */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              <feComposite in2="SourceGraphic" operator="atop" />
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
              <feComposite in2="SourceGraphic" operator="atop" />
            </filter>
          </defs>

          {/* Grid */}
          <CartesianGrid 
            strokeDasharray="5 5" 
            stroke="#1F2937" 
            opacity={0.2}
          />

          {/* X-Axis */}
          <XAxis 
            dataKey="name" 
            stroke="#6B7280"
            tick={{ fill: '#D1D5DB', fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: '#374151', strokeOpacity: 0.5 }}
          />

          {/* Y-Axis */}
          <YAxis 
            stroke="#6B7280"
            tick={{ fill: '#D1D5DB', fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: '#374151', strokeOpacity: 0.5 }}
            tickFormatter={(value) => `${value}ms`}
            width={60}
          />

          {/* Custom Tooltip */}
          <Tooltip 
            contentStyle={{
              background: 'rgba(10, 10, 10, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              borderRadius: '10px',
              padding: '10px 14px',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
            itemStyle={{ 
              color: '#F3F4F6', 
              fontSize: '13px', 
              fontWeight: '600' 
            }}
            labelStyle={{ 
              color: '#60A5FA', 
              fontSize: '13px', 
              fontWeight: '700' 
            }}
            formatter={(value: number) => [`${value} ms`, 'Response Time']}
            cursor={{ stroke: '#3B82F6', strokeOpacity: 0.2, strokeWidth: 2 }}
          />

          {/* Line */}
          <Line 
            type="monotone" 
            dataKey="responseTime" 
            stroke="url(#chartGradient)" 
            strokeWidth={4}
            name="Response Time (ms)"
            dot={{ 
              fill: '#3B82F6', 
              stroke: '#1E40AF', 
              strokeWidth: 2, 
              r: 5, 
              filter: 'url(#glow)' 
            }}
            activeDot={{ 
              fill: '#EC4899', 
              stroke: '#9F1239', 
              strokeWidth: 3, 
              r: 8, 
              filter: 'url(#strongGlow)' 
            }}
            animationDuration={2000}
            animationEasing="ease-in-out"
            isAnimationActive={true}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>

    {/* Custom CSS for Glow and Animations */}
    <style>{`
      .glow-neon {
        filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.7));
      }
      .glow-ultra {
        filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 15px rgba(139, 92, 246, 0.6));
      }
      @keyframes pulse {
        0% { opacity: 0.5; }
        50% { opacity: 0.8; }
        100% { opacity: 0.5; }
      }
      .animate-pulse-slow {
        animation: pulse 4s ease-in-out infinite;
      }
      .recharts-tooltip-wrapper {
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
      .recharts-tooltip-wrapper:hover {
        transform: scale(1.05);
      }
      .recharts-dot {
        transition: transform 0.2s ease;
      }
      .recharts-dot:hover {
        transform: scale(1.2);
      }
    `}</style>
  </motion.div>
);
