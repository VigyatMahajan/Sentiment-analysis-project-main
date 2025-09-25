import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MessageSquare, Clock } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', positive: 245, negative: 89, neutral: 156 },
  { month: 'Feb', positive: 287, negative: 102, neutral: 178 },
  { month: 'Mar', positive: 321, negative: 156, neutral: 198 },
  { month: 'Apr', positive: 298, negative: 134, neutral: 187 },
  { month: 'May', positive: 356, negative: 178, neutral: 223 },
  { month: 'Jun', positive: 642, negative: 298, neutral: 314 }
];

const trendData = [
  { day: 'Mon', sentiment: 0.65 },
  { day: 'Tue', sentiment: 0.72 },
  { day: 'Wed', sentiment: 0.58 },
  { day: 'Thu', sentiment: 0.81 },
  { day: 'Fri', sentiment: 0.69 },
  { day: 'Sat', sentiment: 0.74 },
  { day: 'Sun', sentiment: 0.77 }
];

export default function Dashboard() {
  return (
     <div
  className="min-h-screen px-6 py-16 bg-cover bg-center flex justify-center items-center"
  style={{
    backgroundImage:
      "url('https://img.freepik.com/premium-vector/abstract-wireframe-technology-background-presentation-banner-cover_654662-5665.jpghttps://img.freepik.com/premium-vector/abstract-wireframe-technology-background-presentation-banner-cover_654662-5665.jpg')",
  }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-gray-600">Real-time sentiment analysis insights and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-3xl font-bold text-gray-900">1,254</p>
              </div>
              <MessageSquare className="h-12 w-12 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Positive Sentiment</p>
                <p className="text-3xl font-bold text-green-600">642</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">51.2% of total comments</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-purple-600">847</p>
              </div>
              <Users className="h-12 w-12 text-purple-500" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Unique contributors</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-orange-600">2.4h</p>
              </div>
              <Clock className="h-12 w-12 text-orange-500" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Processing time</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Sentiment Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Sentiment Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="positive" stackId="a" fill="#22c55e" />
                  <Bar dataKey="neutral" stackId="a" fill="#facc15" />
                  <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sentiment Score Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Sentiment Score</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Sentiment Score']} />
                  <Line 
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Concerns */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Concerns</h2>
            <div className="space-y-4">
              {[
                { concern: "Data Privacy Measures", count: 127, severity: "high" },
                { concern: "Implementation Timeline", count: 98, severity: "medium" },
                { concern: "Resource Allocation", count: 76, severity: "medium" },
                { concern: "Stakeholder Consultation", count: 54, severity: "low" },
                { concern: "Compliance Requirements", count: 43, severity: "low" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.concern}</p>
                    <p className="text-sm text-gray-500">{item.count} mentions</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.severity === 'high' ? 'bg-red-100 text-red-800' :
                    item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.severity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Analysis</h2>
            <div className="space-y-4">
              {[
                { text: "The proposed digital system shows great promise...", sentiment: "positive", time: "2 min ago" },
                { text: "Concerns about data security need to be addressed...", sentiment: "negative", time: "5 min ago" },
                { text: "The consultation process has been comprehensive...", sentiment: "positive", time: "8 min ago" },
                { text: "Implementation timeline seems realistic...", sentiment: "neutral", time: "12 min ago" },
                { text: "Additional stakeholder engagement would be beneficial...", sentiment: "neutral", time: "15 min ago" }
              ].map((comment, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                    comment.sentiment === 'positive' ? 'bg-green-500' :
                    comment.sentiment === 'negative' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{comment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}