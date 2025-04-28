import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Slack, Bell } from 'lucide-react';

interface NotificationChannel {
  id: string;
  type: 'email' | 'sms' | 'call' | 'slack';
  label: string;
  icon: typeof Mail;
  enabled: boolean;
}

const NotificationsPage: React.FC = () => {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    { id: '1', type: 'email', label: 'Email Notifications', icon: Mail, enabled: true },
    { id: '2', type: 'sms', label: 'SMS Notifications', icon: MessageSquare, enabled: false },
    { id: '3', type: 'call', label: 'Phone Calls', icon: Phone, enabled: false },
    { id: '4', type: 'slack', label: 'Slack Notifications', icon: Slack, enabled: true },
  ]);

  const toggleChannel = (id: string) => {
    setChannels(channels.map(channel =>
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Bell className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Preferences</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {channels.map(channel => {
            const Icon = channel.icon;
            return (
              <div key={channel.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{channel.label}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications via {channel.type}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={channel.enabled}
                    onChange={() => toggleChannel(channel.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;