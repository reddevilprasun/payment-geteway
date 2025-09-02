"use client";

import React, {useState} from 'react';
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

    const CodeBlock = ({code, language = "javascript", id}: { code: string; language?: string; id: string }) => (
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-sm text-gray-300">{language}</span>
                <button
                    onClick={() => copyToClipboard(code, id)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                    {copiedCode === id ? (
                        <CheckCircle className="w-4 h-4 text-green-400"/>
                    ) : (
                        <Copy className="w-4 h-4"/>
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
                            <Book className="w-8 h-8 text-purple-600"/>
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
                                <a href="#overview"
                                   className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Overview</a>
                                <a href="#authentication"
                                   className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Authentication</a>
                                <a href="#endpoints"
                                   className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">API
                                    Endpoints</a>
                                <a href="#webhooks"
                                   className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Webhooks</a>
                                <a href="#examples"
                                   className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Code
                                    Examples</a>
                                <a href="#errors"
                                   className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">Error
                                    Handling</a>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Overview Section */}
                        <section id="overview" className="bg-white rounded-lg shadow-sm border p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <Globe className="w-6 h-6 text-purple-600"/>
                                <h2 className="text-2xl font-bold text-gray-900">API Overview</h2>
                            </div>

                            <div className="prose max-w-none">
                                <p className="text-gray-600 mb-6">
                                    Welcome to the UPI Gateway API documentation. Our RESTful API allows you to
                                    integrate
                                    secure payment processing into your applications with ease.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <Shield className="w-8 h-8 text-purple-600 mb-2"/>
                                        <h4 className="font-semibold text-gray-900">Secure</h4>
                                        <p className="text-sm text-gray-600">Bank-grade security with encryption</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <Zap className="w-8 h-8 text-blue-600 mb-2"/>
                                        <h4 className="font-semibold text-gray-900">Fast</h4>
                                        <p className="text-sm text-gray-600">Real-time transaction processing</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <Code className="w-8 h-8 text-green-600 mb-2"/>
                                        <h4 className="font-semibold text-gray-900">Simple</h4>
                                        <p className="text-sm text-gray-600">Easy to integrate REST API</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">Base URL</h4>
                                    <code
                                        className="text-blue-800 bg-blue-100 px-2 py-1 rounded">https://upigeteway.vercel.app/</code>
                                </div>
                            </div>
                        </section>

                        {/* Authentication Section */}
                        <section id="authentication" className="bg-white rounded-lg shadow-sm border p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <Key className="w-6 h-6 text-purple-600"/>
                                <h2 className="text-2xl font-bold text-gray-900">Authentication</h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                All API requests require authentication using API keys. Include your API key in the
                                request headers.
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
                                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5"/>
                                        <div>
                                            <h4 className="font-semibold text-yellow-900">Security Note</h4>
                                            <p className="text-yellow-800 text-sm">Never expose your API keys in
                                                client-side code. Always make API calls from your server.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* API Endpoints Section */}
                        <section id="endpoints" className="bg-white rounded-lg shadow-sm border p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>

                            <div className="space-y-8">

                                {/* Check Payment Status */}
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span
                                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">GET</span>
                                        <code className="text-gray-800">/qr?token=&#123;token&#125;&amount=666</code>
                                    </div>
                                    <p className="text-gray-600 mb-4">Create a payment request</p>
                                </div>

                                {/* Create Payment */}
                                <div className="border-l-4 border-green-500 pl-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">POST</span>
                                        <code className="text-gray-800">/api/paytm/generate</code>
                                    </div>
                                    <p className="text-gray-600 mb-4">Create a new payment request</p>

                                    <h5 className="font-semibold text-gray-900 mb-2">Request Body:</h5>
                                    <CodeBlock
                                        id="create-payment-request"
                                        code={`{
  "amount": 1000,
  "currency": "INR",
  "order_id": "order_123456",
  "token": "your_auth_token",
  "callback_url": "https://yoursite.com/callback",
  "description": "Payment for Order #123456"
}`}
                                        language="json"
                                    />

                                    <h5 className="font-semibold text-gray-900 mb-2 mt-4">Response:</h5>
                                    <CodeBlock
                                        id="create-payment-response"
                                        code={`{
    "status": true,
    "upi": "paytmqr5pp3m9@ptys",
    "orderId": "b0e7dead2ce346aebf2d174ac1d910b6",
    "intent": "upi://pay?pa=paytmqr5pp3m9@ptys&pn=Paytm%20Merchant&mc=5499&mode=02&orgid=000000&paytmqr=2810050501011UWXAK8OBZ5O&tn=b0e7dead2ce346aebf2d174ac1d910b6&tr=b0e7dead2ce346aebf2d174ac1d910b6&am=33&sign=MEUCIA2Jq8ElM16k3QQkEWiFxa4kBSlnyucLCQu6MDD/Qsf2AiEA7AweV2mrMsvrKeFN7/GFaTI2zDt2h6gwq3+3a8jKEHk=",
    "qr": "data:image/png;base64,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",
    "msg": "success"
}`}
                                        language="json"
                                    />
                                </div>


                                {/* Refund Payment */}
                                <div className="border-l-4 border-orange-500 pl-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span
                                            className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">POST</span>
                                        <code className="text-gray-800">/api/paytm/check</code>
                                    </div>
                                    <p className="text-gray-600 mb-4">Initiate a refund for a completed payment</p>

                                    <h5 className="font-semibold text-gray-900 mb-2">Request Body:</h5>
                                    <CodeBlock
                                        id="refund-request"
                                        code={`{
  "token":"your_auth_token",
  "orderId":"b0e7dead2ce346aebf2d174ac1d910b6"
}`}
                                        language="json"
                                    />
                                    <h5 className="font-semibold text-gray-900 mb-2 mt-4">Response:</h5>
                                    <CodeBlock
                                        id="create-payment-response"
                                        code={`{
    "status": true,
    "msg": "success"
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
                                Webhooks allow you to receive real-time notifications about payment events. Configure
                                your webhook URL in the dashboard.
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
                                    <p className="text-blue-800 text-sm">Always verify webhook signatures to ensure the
                                        request is from our servers.</p>
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
    const response = await axios.post('https://upigeteway.vercel.app/api/paytm/generate', {
      "amount": 1000,
      "currency": "INR",
      "order_id": "order_123456",
      "token": "your_auth_token",
      "callback_url": "https://yoursite.com/callback",
      "description": "Payment for Order #123456"
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
  CURLOPT_URL => 'https://upigeteway.vercel.app/api/paytm/generate',
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
    'token' => 'your_auth_token',
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
                                Our API uses conventional HTTP response codes to indicate the success or failure of an
                                API request.
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Request
                                                successful
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">400</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Bad
                                                Request
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Invalid
                                                request parameters
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">401</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Unauthorized</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Invalid or
                                                missing API key
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">404</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Not Found
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Resource
                                                not found
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">500</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Server
                                                Error
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Internal
                                                server error
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h4 className="font-semibold text-gray-900 mt-6 mb-3">Error Response Format</h4>
                                <CodeBlock
                                    id="error-response"
                                    code={`{
  "status": false,
  "msg": "Invalid API key"
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
                                    <ExternalLink className="w-4 h-4 ml-2"/>
                                </a>
                                <a
                                    href="/dashboard"
                                    className="inline-flex items-center px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
                                >
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4 ml-2"/>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}