"use client";

import React, { useState } from 'react';
import {
  Code,
  Copy,
  CheckCircle,
  Book,
  Key,
  Globe,
  Shield,
  Zap,
  ArrowRight,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

export default function ApiDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language = "javascript", id }: { code: string; language?: string; id: string }) => (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-300">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
        >
          {copiedCode === id ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="text-xs">{copiedCode === id ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Book className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                <a href="#overview" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Overview</a>
                <a href="#authentication" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Authentication</a>
                <a href="#endpoints" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">API Endpoints</a>
                <a href="#webhooks" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Webhooks</a>
                <a href="#examples" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Code Examples</a>
                <a href="#errors" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Error Handling</a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Section */}
            <section id="overview" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">API Overview</h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">
                  Welcome to the UPI Gateway API documentation. Our RESTful API allows you to integrate
                  secure payment processing into your applications with ease.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <Shield className="w-8 h-8 text-purple-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Secure</h4>
                    <p className="text-sm text-gray-600">Bank-grade security with encryption</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Zap className="w-8 h-8 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Fast</h4>
                    <p className="text-sm text-gray-600">Real-time transaction processing</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <Code className="w-8 h-8 text-green-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Simple</h4>
                    <p className="text-sm text-gray-600">Easy to integrate REST API</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Base URL</h4>
                  <code className="text-blue-800 bg-blue-100 px-2 py-1 rounded">https://api.upigateway.com/v1</code>
                </div>
              </div>
            </section>

            {/* Authentication Section */}
            <section id="authentication" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Key className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Authentication</h2>
              </div>

              <p className="text-gray-600 mb-6">
                All API requests require authentication using API keys. Include your API key in the request headers.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">API Key Authentication</h4>
                  <CodeBlock
                    id="auth-header"
                    code={`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
                    language="http"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900">Security Note</h4>
                      <p className="text-yellow-800 text-sm">Never expose your API keys in client-side code. Always make API calls from your server.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* API Endpoints Section */}
            <section id="endpoints" className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>

              <div className="space-y-8">
                {/* Create Payment */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">POST</span>
                    <code className="text-gray-800">/payments/create</code>
                  </div>
                  <p className="text-gray-600 mb-4">Create a new payment request</p>

                  <h5 className="font-semibold text-gray-900 mb-2">Request Body:</h5>
                  <CodeBlock
                    id="create-payment-request"
                    code={`{
  "amount": 1000,
  "currency": "INR",
  "order_id": "order_123456",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "callback_url": "https://yoursite.com/callback",
  "description": "Payment for Order #123456"
}`}
                    language="json"
                  />

                  <h5 className="font-semibold text-gray-900 mb-2 mt-4">Response:</h5>
                  <CodeBlock
                    id="create-payment-response"
                    code={`{
  "status": 1,
  "message": "Payment created successfully",
  "data": {
    "payment_id": "pay_abc123def456",
    "payment_url": "https://checkout.upigateway.com/pay/abc123def456",
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "expires_at": "2025-01-21T15:30:00Z"
  }
}`}
                    language="json"
                  />
                </div>

                {/* Check Payment Status */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                    <code className="text-gray-800">/payments/&#123;payment_id&#125;/status</code>
                  </div>
                  <p className="text-gray-600 mb-4">Check the status of a payment</p>

                  <h5 className="font-semibold text-gray-900 mb-2">Response:</h5>
                  <CodeBlock
                    id="payment-status-response"
                    code={`{
  "status": 1,
  "data": {
    "payment_id": "pay_abc123def456",
    "order_id": "order_123456",
    "amount": 1000,
    "currency": "INR",
    "status": "completed",
    "transaction_id": "txn_xyz789",
    "created_at": "2025-01-21T14:30:00Z",
    "completed_at": "2025-01-21T14:32:15Z"
  }
}`}
                    language="json"
                  />
                </div>

                {/* Refund Payment */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">POST</span>
                    <code className="text-gray-800">/payments/&#123;payment_id&#125;/refund</code>
                  </div>
                  <p className="text-gray-600 mb-4">Initiate a refund for a completed payment</p>

                  <h5 className="font-semibold text-gray-900 mb-2">Request Body:</h5>
                  <CodeBlock
                    id="refund-request"
                    code={`{
  "amount": 500,
  "reason": "Customer requested refund",
  "refund_id": "ref_123456"
}`}
                    language="json"
                  />
                </div>
              </div>
            </section>

            {/* Webhooks Section */}
            <section id="webhooks" className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Webhooks</h2>

              <p className="text-gray-600 mb-6">
                Webhooks allow you to receive real-time notifications about payment events. Configure your webhook URL in the dashboard.
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Payment Completed Webhook</h4>
                <CodeBlock
                  id="webhook-payload"
                  code={`{
  "event": "payment.completed",
  "timestamp": "2025-01-21T14:32:15Z",
  "data": {
    "payment_id": "pay_abc123def456",
    "order_id": "order_123456",
    "amount": 1000,
    "currency": "INR",
    "status": "completed",
    "transaction_id": "txn_xyz789",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    }
  },
  "signature": "sha256=abc123def456..."
}`}
                  language="json"
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Webhook Verification</h4>
                  <p className="text-blue-800 text-sm">Always verify webhook signatures to ensure the request is from our servers.</p>
                </div>
              </div>
            </section>

            {/* Code Examples Section */}
            <section id="examples" className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Examples</h2>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Node.js Example</h4>
                  <CodeBlock
                    id="nodejs-example"
                    code={`const axios = require('axios');

const createPayment = async () => {
  try {
    const response = await axios.post('https://api.upigateway.com/v1/payments/create', {
      amount: 1000,
      currency: 'INR',
      order_id: 'order_123456',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210'
      },
      callback_url: 'https://yoursite.com/callback',
      description: 'Payment for Order #123456'
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });

    console.log('Payment created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error.response.data);
  }
};

createPayment();`}
                    language="javascript"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">PHP Example</h4>
                  <CodeBlock
                    id="php-example"
                    code={`<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.upigateway.com/v1/payments/create',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => json_encode(array(
    'amount' => 1000,
    'currency' => 'INR',
    'order_id' => 'order_123456',
    'customer' => array(
      'name' => 'John Doe',
      'email' => 'john@example.com',
      'phone' => '9876543210'
    ),
    'callback_url' => 'https://yoursite.com/callback',
    'description' => 'Payment for Order #123456'
  )),
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
echo json_encode($data, JSON_PRETTY_PRINT);
?>`}
                    language="php"
                  />
                </div>
              </div>
            </section>

            {/* Error Handling Section */}
            <section id="errors" className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Handling</h2>

              <p className="text-gray-600 mb-6">
                Our API uses conventional HTTP response codes to indicate the success or failure of an API request.
              </p>

              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">200</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Success</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Request successful</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">400</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Bad Request</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Invalid request parameters</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">401</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Unauthorized</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Invalid or missing API key</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">404</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Not Found</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Resource not found</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">500</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Server Error</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Internal server error</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold text-gray-900 mt-6 mb-3">Error Response Format</h4>
                <CodeBlock
                  id="error-response"
                  code={`{
  "status": 0,
  "message": "Invalid API key",
  "error_code": "INVALID_API_KEY",
  "details": {
    "field": "authorization",
    "issue": "API key is missing or invalid"
  }
}`}
                  language="json"
                />
              </div>
            </section>

            {/* Support Section */}
            <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="mb-6">
                Our developer support team is here to help you integrate our API successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:support@upigateway.com"
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}