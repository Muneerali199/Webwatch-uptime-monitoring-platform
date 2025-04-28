import { useUser } from '@clerk/clerk-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status Card */}
          <div className="bg-card p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-4">
              {['API', 'Database', 'Frontend'].map((service) => (
                <div key={service} className="flex items-center justify-between">
                  <span>{service}</span>
                  <span className="text-green-500">Operational</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring Card */}
          <div className="bg-card p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Active Monitors</h2>
            <div className="h-40 flex items-center justify-center">
              <p className="text-gray-400">Your monitoring dashboard will appear here</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="default" fullWidth>
                Add New Monitor
              </Button>
              <Button variant="outline" fullWidth>
                View Reports
              </Button>
              <Button variant="gradient" fullWidth>
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};