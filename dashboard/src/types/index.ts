import { ComponentType } from 'react';

// Website and UptimeRecord interfaces (unchanged)
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

// Types for Button component with icon support
export interface ButtonProps {
  className?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  iconPosition?: 'left' | 'right';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
  [key: string]: any; // For other HTML button attributes
}