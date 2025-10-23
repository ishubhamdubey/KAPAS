import { Link } from 'react-router-dom';
import { Settings, ArrowLeft, User, Bell, Lock, CreditCard } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-8">
            <Settings className="w-8 h-8 text-[#ff6b81] mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#ff6b81] transition-colors cursor-pointer">
              <div className="flex items-center">
                <User className="w-6 h-6 text-gray-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">Profile Information</h3>
                  <p className="text-sm text-gray-600">Update your name, email, and phone number</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#ff6b81] transition-colors cursor-pointer">
              <div className="flex items-center">
                <Lock className="w-6 h-6 text-gray-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">Change Password</h3>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#ff6b81] transition-colors cursor-pointer">
              <div className="flex items-center">
                <Bell className="w-6 h-6 text-gray-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <p className="text-sm text-gray-600">Manage email and push notifications</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#ff6b81] transition-colors cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="w-6 h-6 text-gray-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">Payment Methods</h3>
                  <p className="text-sm text-gray-600">Manage saved payment methods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
