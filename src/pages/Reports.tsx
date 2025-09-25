import React, { useState } from "react";
import { Download, FileText, BarChart3, FileSpreadsheet, Calendar, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Sample data - same as used in Analysis and Dashboard
const sentimentData = [
  { name: "Positive", value: 642, percentage: 51.2 },
  { name: "Neutral", value: 314, percentage: 25.0 },
  { name: "Negative", value: 298, percentage: 23.8 }
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const monthlyData = [
  { month: 'Jan', positive: 245, negative: 89, neutral: 156 },
  { month: 'Feb', positive: 287, negative: 102, neutral: 178 },
  { month: 'Mar', positive: 321, negative: 156, neutral: 198 },
  { month: 'Apr', positive: 298, negative: 134, neutral: 187 },
  { month: 'May', positive: 356, negative: 178, neutral: 223 },
  { month: 'Jun', positive: 642, negative: 298, neutral: 314 }
];

const topWords = {
  positive: ["excellent", "support", "beneficial", "appreciate", "effective", "helpful", "positive", "good", "great", "recommend"],
  negative: ["concern", "issue", "problem", "difficult", "opposed", "unclear", "confusing", "inadequate", "disappointing", "frustrating"],
  neutral: ["consider", "suggest", "review", "proposal", "section", "clause", "provision", "amendment", "draft", "legislation"]
};

const keyInsights = [
  "Stakeholders express strong support for the digital filing system implementation, citing improved efficiency and accessibility.",
  "Multiple concerns raised regarding data privacy measures and the need for clearer compliance guidelines.",
  "Positive feedback on consultation process transparency, with requests for extended comment periods.",
  "Suggestions for additional stakeholder engagement sessions in rural areas to ensure comprehensive input.",
  "Support for proposed amendments but requests for clarification on implementation timelines and resource allocation."
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string>('comprehensive');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-06-30' });
  const [showPreview, setShowPreview] = useState(true);

  const handleDownload = (reportId: string, format: string) => {
    // Create a blob with report data
    const reportData = generateReportData(reportId);
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `sentiment-analysis-${reportId}-${new Date().toISOString().split('T')[0]}.${format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReportData = (reportId: string) => {
    const totalComments = sentimentData.reduce((sum, item) => sum + item.value, 0);
    
    return `
SENTIMENT ANALYSIS REPORT
Generated on: ${new Date().toLocaleDateString()}
Report Type: ${reportId.charAt(0).toUpperCase() + reportId.slice(1)}
Date Range: ${dateRange.start} to ${dateRange.end}

=== EXECUTIVE SUMMARY ===
Total Comments Analyzed: ${totalComments}
Positive Sentiment: ${sentimentData[0].value} (${sentimentData[0].percentage}%)
Neutral Sentiment: ${sentimentData[1].value} (${sentimentData[1].percentage}%)
Negative Sentiment: ${sentimentData[2].value} (${sentimentData[2].percentage}%)

=== KEY INSIGHTS ===
${keyInsights.map((insight, index) => `${index + 1}. ${insight}`).join('\n')}

=== TOP WORDS BY SENTIMENT ===
Positive: ${topWords.positive.join(', ')}
Negative: ${topWords.negative.join(', ')}
Neutral: ${topWords.neutral.join(', ')}

=== MODEL PERFORMANCE ===
Accuracy: 94.2%
Precision: 91.8%
Recall: 93.5%
F1-Score: 92.6%
    `;
  };

  const reportTypes = [
    {
      id: 'comprehensive',
      title: 'Comprehensive Analysis Report',
      description: 'Complete sentiment analysis with all visualizations and insights',
      format: ['PDF', 'Excel', 'CSV'],
      icon: FileText
    },
    {
      id: 'summary',
      title: 'Executive Summary',
      description: 'High-level overview of key findings and recommendations',
      format: ['PDF', 'Word'],
      icon: BarChart3
    },
    {
      id: 'data',
      title: 'Raw Data Export',
      description: 'Processed data with sentiment scores and classifications',
      format: ['Excel', 'CSV', 'JSON'],
      icon: FileSpreadsheet
    }
  ];

  return (
    <div
  className="min-h-screen px-6 py-16 bg-cover bg-center flex justify-center items-center"
  style={{
    backgroundImage:
      "url('https://www.shutterstock.com/image-photo/analyst-manages-system-database-analysis-260nw-2437018947.jpg')",
  }}
>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Analysis Reports</h1>
          <p className="text-lg text-white">
            Generate and download comprehensive sentiment analysis reports
          </p>
        </div>

        {/* Key Metrics Summary */}
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
              <span className="text-sm text-green-600">+12% from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Positive Sentiment</p>
                <p className="text-3xl font-bold text-green-600">642</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">51.2% of total</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Negative Sentiment</p>
                <p className="text-3xl font-bold text-red-600">298</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">😞</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">23.8% of total</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Neutral Sentiment</p>
                <p className="text-3xl font-bold text-yellow-600">314</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">😐</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">25.0% of total</span>
            </div>
          </div>
        </div>

        {/* Report Preview Section */}
        {showPreview && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Report Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Pie Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({name, percentage}) => `${name}: ${percentage}%`}
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData.slice(-3)}>
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
              </div>

              {/* Key Insights */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                <div className="space-y-3">
                  {keyInsights.slice(0, 3).map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Words */}
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(topWords).map(([sentiment, words], index) => (
                  <div key={sentiment} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 capitalize" style={{ color: COLORS[index] }}>
                      Top {sentiment} Words
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {words.slice(0, 5).map((word) => (
                        <span
                          key={word}
                          className="px-2 py-1 text-xs rounded-full text-white"
                          style={{ backgroundColor: COLORS[index] }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Date Range Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Report Configuration</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Report Types */}
        <div className="space-y-6">
          {reportTypes.map((report) => {
            const IconComponent = report.icon;
            const isSelected = selectedReport === report.id;
            
            return (
              <div 
                key={report.id} 
                className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <IconComponent className={`h-8 w-8 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{report.title}</h3>
                      <input
                        type="radio"
                        name="reportType"
                        value={report.id}
                        checked={isSelected}
                        onChange={(e) => setSelectedReport(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {report.format.map((format) => (
                        <button
                          key={format}
                          onClick={() => handleDownload(report.id, format)}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Model Performance Metrics */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
              <p className="text-gray-600 font-medium">Accuracy</p>
              <p className="text-xs text-gray-500 mt-1">Overall correctness</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">91.8%</div>
              <p className="text-gray-600 font-medium">Precision</p>
              <p className="text-xs text-gray-500 mt-1">True positive rate</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">93.5%</div>
              <p className="text-gray-600 font-medium">Recall</p>
              <p className="text-xs text-gray-500 mt-1">Sensitivity measure</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">92.6%</div>
              <p className="text-gray-600 font-medium">F1-Score</p>
              <p className="text-xs text-gray-500 mt-1">Harmonic mean</p>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Options</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="ml-3">Include individual comment analysis</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="ml-3">Include word frequency analysis</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="ml-3">Include visualizations</span>
              </label>
            </div>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="ml-3">Include model performance metrics</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="ml-3">Include raw text data</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="ml-3">Include timestamp information</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}