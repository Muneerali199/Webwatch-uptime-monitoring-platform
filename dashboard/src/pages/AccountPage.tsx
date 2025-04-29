import React from 'react';
import { User, Mail, Phone, MapPin, Building } from 'lucide-react';

const AccountPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

      <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="pl-12 py-2 w-full rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue="John Doe"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    className="pl-12 py-2 w-full rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue="john@example.com"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="tel"
                    className="pl-12 py-2 w-full rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="pl-12 py-2 w-full rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue="San Francisco, CA"
                  />
                </div>
              </div>

              {/* Enterprise */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Enterprise
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="pl-12 py-2 w-full rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Your Company Name"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-xl text-white font-semibold">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
