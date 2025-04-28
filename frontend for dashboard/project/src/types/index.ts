export interface Website {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down';
  uptime: number; // percentage
  responseTime: number; // ms
  lastChecked: string;
  history: UptimeRecord[];
}

export interface UptimeRecord {
  timestamp: string;
  status: 'up' | 'down';
  responseTime: number; // ms
}