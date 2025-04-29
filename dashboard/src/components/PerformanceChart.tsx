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
    className="rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm p-4 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-lg font-semibold text-white mb-4">Response Times</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              borderColor: '#374151',
              borderRadius: '0.5rem',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#E5E7EB', fontSize: '12px' }}
            labelStyle={{ color: '#9CA3AF', fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="responseTime" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Response Time (ms)"
            dot={{ fill: '#1E40AF', strokeWidth: 2, r: 3 }}
            activeDot={{ fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2, r: 5 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);