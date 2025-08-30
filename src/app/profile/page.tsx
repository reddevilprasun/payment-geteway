"use client";

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Key, 
  Shield, 
  Bell, 
  CreditCard,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  Edit3,
  Save,
  X,
  RefreshCw,
  AlertTriangle,
  Settings,
  Lock
} from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const [userInfo, setUserInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    joinedDate: "January 15, 2024",
    lastLogin: "Today at 2:30 PM"
  });

  const [editForm, setEditForm] = useState({ ...userInfo });

  // Mock API keys
  const [apiKeys] = useState([
    {
      id: 1,
      name: "Production Key",
      key: "pk_live_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Test Key",
      key: "pk_test_xyz789abc123def456ghi789jkl012mno345pqr678stu901",
      created: "2024-01-10",
      lastUsed: "1 day ago",
      status: "active"
    }
  ]);

  // Mock notification settings
  const [notifications, setNotifications] = useState({
    emailTransactions: true,
    emailSecurity: true,
    smsTransactions: false,
    smsSecurity: true,
    webhookFailures: true,
    monthlyReports: true
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({ ...userInfo });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUserInfo({ ...editForm });
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Settings className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{userInfo.fullName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <p className="text-gray-900">{userInfo.joinedDate}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                    <p className="text-gray-900">{userInfo.lastLogin}</p>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">Password</h4>
                          <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        Change Password
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Security Recommendation</h4>
                          <p className="text-yellow-800 text-sm mt-1">
                            Enable two-factor authentication to secure your account and protect your API keys.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === 'api' && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Generate New Key
                  </button>
                </div>

                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                          <p className="text-sm text-gray-600">Created on {apiKey.created}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {apiKey.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex-1 bg-gray-50 rounded-lg p-3 font-mono text-sm">
                          {showApiKey ? apiKey.key : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                        </div>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => copyApiKey(apiKey.key)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {copiedKey ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Last used: {apiKey.lastUsed}</span>
                        <button className="text-red-600 hover:text-red-700 transition-colors">
                          Revoke Key
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">API Key Security</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Never share your API keys in client-side code</li>
                    <li>• Rotate your keys regularly for better security</li>
                    <li>• Use different keys for production and testing</li>
                    <li>• Monitor key usage in your dashboard</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Transaction Updates</h4>
                          <p className="text-sm text-gray-600">Get notified about payment confirmations and failures</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailTransactions}
                            onChange={() => handleNotificationChange('emailTransactions')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Security Alerts</h4>
                          <p className="text-sm text-gray-600">Important security notifications and login alerts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailSecurity}
                            onChange={() => handleNotificationChange('emailSecurity')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Transaction Updates</h4>
                          <p className="text-sm text-gray-600">SMS alerts for high-value transactions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.smsTransactions}
                            onChange={() => handleNotificationChange('smsTransactions')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Security Alerts</h4>
                          <p className="text-sm text-gray-600">Critical security notifications via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.smsSecurity}
                            onChange={() => handleNotificationChange('smsSecurity')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Information</h2>

                <div className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-900">Current Plan: Pro</h3>
                        <p className="text-purple-700">₹2,499/month • Renews on March 15, 2025</p>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Upgrade Plan
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/26</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices</h3>
                    <div className="space-y-3">
                      {[
                        { date: "Jan 15, 2025", amount: "₹2,499", status: "Paid" },
                        { date: "Dec 15, 2024", amount: "₹2,499", status: "Paid" },
                        { date: "Nov 15, 2024", amount: "₹2,499", status: "Paid" }
                      ].map((invoice, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{invoice.date}</p>
                            <p className="text-sm text-gray-600">Pro Plan Subscription</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{invoice.amount}</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}