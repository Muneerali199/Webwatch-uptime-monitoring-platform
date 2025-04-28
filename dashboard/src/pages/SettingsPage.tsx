import React from 'react';
import { Shield, Trash2, Download, Bell } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Enable
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Download size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Download your monitoring data</p>
                </div>
              </div>
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trash2 size={20} className="text-red-500 mr-3" />
                <div>
                  <h3 className="font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account</p>
                </div>
              </div>
              <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;