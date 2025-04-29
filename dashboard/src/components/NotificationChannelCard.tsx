import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Mail, MessageSquare, Phone, Slack } from 'lucide-react';

interface NotificationChannel {
  id: string;
  type: 'email' | 'sms' | 'call' | 'slack';
  label: string;
  config: { value: string };
  enabled: boolean;
}

interface NotificationChannelCardProps {
  channel: NotificationChannel;
  onToggle: (id: string) => void;
  onEdit: (channel: NotificationChannel) => void;
  onDelete: (channel: NotificationChannel) => void;
}

const iconMap = {
  email: Mail,
  sms: MessageSquare,
  call: Phone,
  slack: Slack
};

const NotificationChannelCard: React.FC<NotificationChannelCardProps> = ({
  channel,
  onToggle,
  onEdit,
  onDelete
}) => {
  const Icon = iconMap[channel.type];

  return (
    <motion.div
      className="rounded-lg border border-gray-800 bg-gray-900/20 backdrop-blur-lg overflow-hidden hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon size={20} className="text-gray-400 mr-3" />
            <div>
              <h3 className="font-medium text-white text-lg">{channel.label}</h3>
              <p className="text-sm text-gray-400">
                {channel.type === 'email' ? 'Email: ' : 
                 channel.type === 'slack' ? 'Slack Webhook: ' : 
                 'Phone: '}
                {channel.config.value}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => onEdit(channel)}
              className="text-blue-400 hover:text-blue-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Edit ${channel.label}`}
            >
              <Edit2 className="h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(channel)}
              className="text-red-400 hover:text-red-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Delete ${channel.label}`}
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Status: <span className={cn(
              "font-medium",
              channel.enabled ? 'text-green-400' : 'text-red-400'
            )}>
              {channel.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={channel.enabled}
              onChange={() => onToggle(channel.id)}
              aria-label={`Toggle ${channel.label}`}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationChannelCard;