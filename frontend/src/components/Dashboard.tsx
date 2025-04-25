import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Zap, Bell, Users, Settings, BarChart, Clock } from 'lucide-react';
import { Section, SectionTitle } from './ui/Section';
import { Card3D } from './ui/Card3D';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabItems = [
    { id: 'overview', icon: <BarChart className="h-5 w-5" />, label: 'Overview' },
    { id: 'servers', icon: <Server className="h-5 w-5" />, label: 'Servers' },
    { id: 'alerts', icon: <Bell className="h-5 w-5" />, label: 'Alerts' },
    { id: 'performance', icon: <Zap className="h-5 w-5" />, label: 'Performance' },
    { id: 'team', icon: <Users className="h-5 w-5" />, label: 'Team' },
    { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  ];

  const servers = [
    { name: 'API Server', status: 'online', uptime: '99.98%', region: 'US-East' },
    { name: 'Web Server', status: 'online', uptime: '99.95%', region: 'US-West' },
    { name: 'Database Cluster', status: 'online', uptime: '99.99%', region: 'EU-West' },
    { name: 'CDN Edge', status: 'online', uptime: '100%', region: 'Global' },
  ];

  return (
    <Section id="dashboard" className="py-24">
      <SectionTitle
        title="Intuitive Monitoring Dashboard"
        subtitle="Track all your services in real-time with our powerful and easy-to-use dashboard."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative"
      >
        <Card3D className="relative bg-card/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {/* Dashboard Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="font-semibold">DPIN Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-sm text-gray-300">All Systems Operational</span>
            </div>
          </div>

          {/* Dashboard Navigation */}
          <div className="grid grid-cols-12 gap-0">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-2 border-r border-white/10">
              <div className="p-4">
                <ul className="space-y-2">
                  {tabItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        {item.icon}
                        <span className="hidden md:inline">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-12 md:col-span-10">
              <div className="p-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">Total Uptime</p>
                        <h3 className="text-2xl font-bold text-white mt-1">99.98%</h3>
                      </div>
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '99.98%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">Active Monitors</p>
                        <h3 className="text-2xl font-bold text-white mt-1">24</h3>
                      </div>
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Activity className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="text-success">+2</span>
                      <span className="mx-1">from last week</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">Alerts (24h)</p>
                        <h3 className="text-2xl font-bold text-white mt-1">0</h3>
                      </div>
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Bell className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="text-success">-3</span>
                      <span className="mx-1">from yesterday</span>
                    </div>
                  </div>
                </div>

                {/* Server Status List */}
                <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="font-medium">Server Status</h3>
                  </div>
                  <div className="divide-y divide-white/10">
                    {servers.map((server, index) => (
                      <div key={index} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="h-3 w-3 rounded-full bg-success"></div>
                            <div className="absolute inset-0 h-3 w-3 rounded-full bg-success animate-ping opacity-50"></div>
                          </div>
                          <div>
                            <p className="font-medium">{server.name}</p>
                            <p className="text-sm text-gray-400">{server.region}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-success capitalize">{server.status}</p>
                          <p className="text-sm text-gray-400">{server.uptime} uptime</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Graph */}
                <div className="mt-6 bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Response Time (ms)</h3>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">24h</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">7d</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">30d</span>
                    </div>
                  </div>
                  <div className="h-40 flex items-end space-x-2">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const height = 20 + Math.random() * 60;
                      return (
                        <div key={i} className="flex-1 group relative">
                          <div 
                            className="bg-gradient-to-t from-primary/40 to-primary rounded-t-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                          <div className="invisible group-hover:visible absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded text-xs">
                            {Math.round(height * 2)}ms
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-400">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>23:59</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card3D>

        {/* Decorative elements */}
        <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 rounded-full bg-primary/20 blur-[100px]"></div>
        <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 rounded-full bg-secondary/20 blur-[100px]"></div>
      </motion.div>
    </Section>
  );
};