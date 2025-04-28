import { Website } from '../types';

// Generate 10 random status records for the last 30 minutes
const generateHistory = (baseUptime: number) => {
  const history = [];
  const now = new Date();
  
  for (let i = 9; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3 * 60000).toISOString(); // 3 min intervals
    const random = Math.random() * 100;
    const status = random < baseUptime ? 'up' : 'down';
    const responseTime = status === 'up' ? Math.floor(Math.random() * 900) + 100 : 0;
    
    history.push({
      timestamp,
      status,
      responseTime
    });
  }
  
  return history;
};

export const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'Company Website',
    url: 'https://company.com',
    status: 'up',
    uptime: 99.98,
    responseTime: 187,
    lastChecked: new Date().toISOString(),
    history: generateHistory(99)
  },
  {
    id: '2',
    name: 'API Service',
    url: 'https://api.company.com',
    status: 'up',
    uptime: 99.75,
    responseTime: 210,
    lastChecked: new Date().toISOString(),
    history: generateHistory(95)
  },
  {
    id: '3',
    name: 'Customer Portal',
    url: 'https://portal.company.com',
    status: 'down',
    uptime: 97.32,
    responseTime: 0,
    lastChecked: new Date().toISOString(),
    history: generateHistory(85)
  },
  {
    id: '4',
    name: 'Marketing Blog',
    url: 'https://blog.company.com',
    status: 'up',
    uptime: 99.95,
    responseTime: 152,
    lastChecked: new Date().toISOString(),
    history: generateHistory(98)
  },
  {
    id: '5',
    name: 'E-commerce Store',
    url: 'https://store.company.com',
    status: 'up',
    uptime: 99.99,
    responseTime: 142,
    lastChecked: new Date().toISOString(),
    history: generateHistory(99.5)
  }
];