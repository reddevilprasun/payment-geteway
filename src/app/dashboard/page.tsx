"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  TrendingUp,
  IndianRupee,
  Calendar,
  Settings,
  Bell,
  User,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Smartphone,
  Shield,
  Zap,
  Crown,
  Download,
  Filter,
  Search,
  MoreVertical,
  Eye,
  RefreshCw,
  Activity,
  Users,
  Globe,
  Clock,
  ArrowDownRight,
  TrendingDown,
  BarChart3,
  PieChart,
  DollarSign,
  Wallet,
  Target,
  AlertTriangle,
  ExternalLink,
  LogOut,
  Power
} from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isPaytmConnected, setIsPaytmConnected] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [gatewayProfile, setGatewayProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("/api/paytm/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (data.status && data.data) {
          setIsPaytmConnected(true)
          setGatewayProfile(data.data);
        }
      } catch (err) {
        setGatewayProfile(null);
      }
    };
    fetchProfile();
  }, []);

  // Enhanced mock data
  const currentPlan = {
    name: "Pro Plan",
    status: "Active",
    expiresOn: "March 15, 2025",
    transactionLimit: "₹50,000/day",
    usedToday: "₹12,450",
    remainingToday: "₹37,550"
  };

  const todayStats = {
    totalAmount: "₹12,450",
    transactionCount: 28,
    successRate: "98.5%",
    avgTransactionValue: "₹445",
    peakHour: "2:00 PM",
    failedTransactions: 1
  };

  const weeklyStats = {
    totalRevenue: "₹87,340",
    totalTransactions: 196,
    avgDailyRevenue: "₹12,477",
    growthRate: "+15.2%"
  };

  // Recent transactions
  const recentTransactions = [
    {
      id: "TXN001",
      customer: "Rahul Sharma",
      amount: "₹1,250",
      status: "completed",
      time: "2 mins ago",
      method: "UPI",
      orderId: "ORD-2025-001"
    },
    {
      id: "TXN002",
      customer: "Priya Patel",
      amount: "₹850",
      status: "completed",
      time: "5 mins ago",
      method: "UPI",
      orderId: "ORD-2025-002"
    },
    {
      id: "TXN003",
      customer: "Amit Kumar",
      amount: "₹2,100",
      status: "pending",
      time: "8 mins ago",
      method: "UPI",
      orderId: "ORD-2025-003"
    },
    {
      id: "TXN004",
      customer: "Sneha Gupta",
      amount: "₹675",
      status: "failed",
      time: "12 mins ago",
      method: "UPI",
      orderId: "ORD-2025-004"
    },
    {
      id: "TXN005",
      customer: "Vikash Singh",
      amount: "₹3,200",
      status: "completed",
      time: "15 mins ago",
      method: "UPI",
      orderId: "ORD-2025-005"
    }
  ];

  // Analytics data
  const analyticsData = {
    hourlyData: [
      { hour: '9 AM', amount: 1200 },
      { hour: '10 AM', amount: 1800 },
      { hour: '11 AM', amount: 2400 },
      { hour: '12 PM', amount: 3200 },
      { hour: '1 PM', amount: 2800 },
      { hour: '2 PM', amount: 4100 },
      { hour: '3 PM', amount: 3600 },
      { hour: '4 PM', amount: 2900 }
    ],
    paymentMethods: [
      { method: 'UPI', percentage: 85, amount: '₹10,582' },
      { method: 'Net Banking', percentage: 10, amount: '₹1,245' },
      { method: 'Wallet', percentage: 5, amount: '₹623' }
    ]
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pricingPlans = [
    {
      name: "Basic",
      price: "₹999",
      period: "/month",
      features: [
        "Up to ₹25,000/day",
        "Basic analytics",
        "Email support",
        "Standard security"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "₹2,499",
      period: "/month",
      features: [
        "Up to ₹50,000/day",
        "Advanced analytics",
        "Priority support",
        "Enhanced security",
        "Custom webhooks"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹4,999",
      period: "/month",
      features: [
        "Unlimited transactions",
        "Real-time analytics",
        "24/7 phone support",
        "Enterprise security",
        "Custom integrations",
        "Dedicated manager"
      ],
      popular: false
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">UPI Gateway</span>
              </Link>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-purple-600 font-medium">Dashboard</Link>
                <Link href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">Profile</Link>
                <Link href="/docs" className="text-gray-600 hover:text-purple-600 transition-colors">API Docs</Link>
              </nav>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className={`p-2 text-gray-400 hover:text-gray-500 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
          
              <Link href="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </Link>
              {/* Logout Icon Button */}
              <button
                onClick={handleLogout}
                className="p-2 text-red-500 hover:text-red-700 transition"
                title="Logout"
              >
                <Power className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>API Docs</span>
            </button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +12.5%
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.totalAmount}</p>
              <p className="text-xs text-gray-500 mt-1">Weekly: {weeklyStats.totalRevenue}</p>
            </div>
          </div>

          {/* Transaction Count */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.transactionCount}</p>
              <p className="text-xs text-gray-500 mt-1">Avg: ₹{todayStats.avgTransactionValue}</p>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Excellent
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.successRate}</p>
              <p className="text-xs text-gray-500 mt-1">Failed: {todayStats.failedTransactions}</p>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-600 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Peak: {todayStats.peakHour}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-xs text-gray-500 mt-1">Online now: 23</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Enhanced Transaction Analytics Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Transaction Analytics</h3>
                <p className="text-sm text-gray-500">Hourly transaction volume for today</p>
              </div>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last 7 days</option>
                </select>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <PieChart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Enhanced Chart with Grid and Animations */}
            <div className="relative">
              {/* Chart Grid Background */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-t border-gray-200"></div>
                ))}
              </div>

              {/* Y-axis Labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
                <span>₹4K</span>
                <span>₹3K</span>
                <span>₹2K</span>
                <span>₹1K</span>
                <span>₹0</span>
              </div>

              {/* Chart Bars */}
              <div className="flex items-end justify-between h-64 px-4 pt-4">
                {analyticsData.hourlyData.map((data, index) => {
                  const height = (data.amount / 4100) * 100;
                  const isHighest = data.amount === Math.max(...analyticsData.hourlyData.map(d => d.amount));

                  return (
                    <div key={index} className="flex flex-col items-center group cursor-pointer">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                        <div className="font-semibold">₹{data.amount.toLocaleString()}</div>
                        <div className="text-gray-300">{data.hour}</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>

                      {/* Bar */}
                      <div className="relative w-8 bg-gray-100 rounded-t-lg overflow-hidden group-hover:shadow-lg transition-all duration-300">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${isHighest
                              ? 'bg-gradient-to-t from-purple-600 via-purple-500 to-pink-400'
                              : 'bg-gradient-to-t from-purple-500 to-purple-400'
                            } group-hover:from-purple-600 group-hover:to-pink-500`}
                          style={{
                            height: `${height}%`,
                            minHeight: '8px',
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-500"></div>
                        </div>

                        {/* Peak Indicator */}
                        {isHighest && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>

                      {/* Hour Label */}
                      <div className="mt-3 text-xs text-gray-600 font-medium group-hover:text-purple-600 transition-colors">
                        {data.hour}
                      </div>

                      {/* Amount Label */}
                      <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{data.amount}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart Summary Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Peak Hour</span>
                  </div>
                  <div className="text-lg font-bold text-purple-600">2:00 PM</div>
                  <div className="text-xs text-gray-500">₹4,100 revenue</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">Avg/Hour</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">₹2,650</div>
                  <div className="text-xs text-gray-500">+12% vs yesterday</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900">Growth</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">+15.2%</div>
                  <div className="text-xs text-gray-500">vs last week</div>
                </div>
              </div>
            </div>

            {/* Interactive Legend */}
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded"></div>
                <span className="text-gray-600">Regular Hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-400 rounded"></div>
                <span className="text-gray-600">Peak Hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-600">Highest Volume</span>
              </div>
            </div>
          </div>

          {/* Gateway Status & Plan Info */}
          <div className="space-y-6">
            {/* Gateway Connection */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Gateway Status</h3>
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xs">Paytm</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Paytm Gateway</p>
                      <div className="flex items-center space-x-2">
                        {isPaytmConnected ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">Connected</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-orange-600">Disconnected</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/paytm')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${isPaytmConnected
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    {isPaytmConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                {/* Payment Methods Distribution */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Gateway Profile</h4>
                  {gatewayProfile ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Name</span>
                        <span className="font-medium text-gray-900">{gatewayProfile.username || gatewayProfile.firstName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Mobile</span>
                        <span className="font-medium text-gray-900">{gatewayProfile.mobile}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Email</span>
                        <span className="font-medium text-gray-900">{gatewayProfile.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">MID</span>
                        <span className="font-medium text-gray-900">{gatewayProfile.merchants?.[0]?.mid}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">Loading gateway profile...</div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Plan Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <Crown className="w-6 h-6 text-purple-600" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-purple-600">{currentPlan.name}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Daily Usage</span>
                    <span className="text-sm text-gray-900">{currentPlan.usedToday} / {currentPlan.transactionLimit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Remaining: {currentPlan.remainingToday}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {currentPlan.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expires</span>
                  <span className="text-gray-900">{currentPlan.expiresOn}</span>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                        <div className="text-sm text-gray-500">{transaction.orderId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
                          <div className="text-sm text-gray-500">{transaction.method}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-700">Showing 5 of 28 transactions</p>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View all transactions →
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade Your Plan</h2>
            <p className="text-gray-600">Scale your business with our flexible pricing options</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-lg ${plan.popular ? 'ring-2 ring-purple-500 border-purple-500 transform scale-105' : ''
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                >
                  {plan.name === currentPlan.name ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}