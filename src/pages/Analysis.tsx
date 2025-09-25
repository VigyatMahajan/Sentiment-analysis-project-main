import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Minus, FileText } from 'lucide-react';

// Sample analysis data
const sentimentData = [
  { name: "Positive", value: 642, percentage: 51.2 },
  { name: "Neutral", value: 314, percentage: 25.0 },
  { name: "Negative", value: 298, percentage: 23.8 }
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const topWords = {
  positive: ["excellent", "support", "beneficial", "appreciate", "effective", "helpful", "positive", "good", "great", "recommend"],
  negative: ["concern", "issue", "problem", "difficult", "opposed", "unclear", "confusing", "inadequate", "disappointing", "frustrating"],
  neutral: ["consider", "suggest", "review", "proposal", "section", "clause", "provision", "amendment", "draft", "legislation"]
};

const summaries = [
  "Stakeholders express strong support for the digital filing system implementation, citing improved efficiency and accessibility.",
  "Multiple concerns raised regarding data privacy measures and the need for clearer compliance guidelines.",
  "Positive feedback on consultation process transparency, with requests for extended comment periods.",
  "Suggestions for additional stakeholder engagement sessions in rural areas to ensure comprehensive input.",
  "Support for proposed amendments but requests for clarification on implementation timelines and resource allocation."
];

export default function Analysis() {
  return (
      <div
  className="min-h-screen px-6 py-16 bg-cover bg-center flex justify-center items-center"
  style={{
    backgroundImage:
      "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIVFRUXFRUVFxUXFRcVFRcXFRUXFxcVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dHR0rLS0tLS0tKy0tLS0tLS0rLSstLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0uK//AABEIAJ8BPgMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAAAQIDBAf/xAApEAEBAAIABAUDBQEAAAAAAAAAAQIREiExUQNBYXHwkbHhgaHB0fEE/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQACAwT/xAAdEQEBAQEBAQEAAwAAAAAAAAAAARECITESQVFh/9oADAMBAAIRAxEAPwDxiDQPT0uRQyOoHjRsaGigR7LSwDRaUFi1FgVYWlh0juOhYLAiCkpHIcn1KLx8Wy7l180UiQtKLKhJkVaNcjqKRo9DSwENGVoKRDg0CRVWi0EWiOkCADSBDYSBGNIgjCDbIj35B0YKxUOTc/lU8Pv80sSFX6JVa1AWQkBwhIMtBASFIrDl6oloaCpUkaLTSxNFi0juPM5e8E8ocSSsWVBLRyDCdwkCp7IgtFVEzSXItihloqSqkEEYCEhGSQANIEY0kRjQ0U1o0cLTbCoKNLuP2agqYei0ejAVM7D1EBwTv890Xq04SuKsWs6u3t9RcfJFRFggVpIeSbFEqk6M5C0sQ2BkICCq7kmpFolQ7FgRUxaaLGomkqkxhPaaZApMHwgpoMJEYBAhgJAweiFxUPHFUxmv5dIyWM/HoOLkLP2FIKKt2nZ4wiqitFT01GVWbTJzaT1TabBKjLFFxXYMWWtThBw9lW9xKkilIeRZAwAY0VJOhDUsKDosJIQy0aRVNVSyZqibEqhMtELDqayRT2WjoJEYSI4D0URg1gBlo4Q0i5Lrfl86s5VW+TcZVCsLY0Uu+Hy3osV4+NeG4olaZaYnP3Rie2ozVWloYxfD9T9CNHJyvJXBy+53E4tZZYdkxdTlGbGpSpcv7/BwqKUxWiUpFU5FtWk0GC8xYRxIQWLI2DWdTWmkWMVoqStFWcOpGlXErGSk9HokRRoCLANHoaOHFpaPR6EODS0ejOQ4EwwcUQEoBRyqlQrEwVpjFTEeHV7dIxSxi5iR7+jUYrbwfDmrs8/B5b7p8OW9F5+Jy06+Yx7rlzxZZRvmyyxcrHSVEgi9aPhGNayuKrir9BRi1nw+ibF5DTNhlZ6VjArHFSK0tDTTgLhawaysTWtibGbGpWQqtFyYsaLZ9S0eIJaTYvRDFqdGegsWkcCpDANDRmcGp0elaBwayM9ANCgxSCOUpFScvn7pKxaTJngqNxir2uSoi70bjNGOV7nspSrQEGU7HitYmUvdXL58+bVcE3HXNZVqIWjtVfQYdZ8KbGlToWGUcLbXPlO3qylaTseYLV3mi46XsR0sY1hU5Y+zXKdoy05dR0lTlGeUbM8o59RuI0DEjDRUHoaVRAxpIpFQ4qQyM2pPSoemsGpgqoculg1jiBaIy2BoySGzkI4YFyHKWUONRmtcbyOM8FStxk7fQbAkbgVMl49SmOuo3zM8ZVUZRSM2qoXD7/PwWjx9WnieHq/1d/uzh1hQvLFEgs9Onhlrm0whXHSsGpBaqxNb49OiPEjtefHOVlWWUbZRlpx7dIiRnk1kRpw6jpKglaPfNjGkK4+WuXv5/UjmIxFwjStkcR4xeixVI6cxi0tCxehY1eBrMVVhM4WQGg5tnE0wklUg0JFi1R41Ko1BWuE9TqcF2OsnjnRirRS+SuHbcgolNMbY48rdf5/rUmspuuvn2Teq89e11yk6fdEP+ITLnvz79PsOvmfCJjf0ixam4+SNN8el6amvv86oyk+d/QYZU2erTw4Wl4NyM2tZNT3+a92fiXm3uU1zYeJi6dTxifWWWLPOOjKcmOeLj1zjpKzRne000Rm49Tx0jKwRWk8Lk3qpFaExVpuQWstKkPS5iJyNRo8avQbnODThGHRlGV7IaZRFjlY1E1NjXKIYsalQcMDDoOQWG1gKYiRrMuSbO3TZ/K1WHuvHt5bZxpMXTmVir189BnCVHST+GNHDub36ev8Airfp5fPcW8xni6fnPjOoz6/x7HJyKwSsZhVjKrHqmW9WmOXlPy1BTyx/X7Izu/X1kb3wuvef3qs8vD1TeVKzwjs/4cscbvPHimvP57ubLR476nnyjpWeU3dTl2GetbPCzXqTc+MMcqlVhZdPnk42OkY1FivEiK4dfXWJGlZKmLOetaMYelaU7ThjWcxVpr42vL9Wdp/M5GlYIIuQ8zRqbE6XYUN5MqdM8m2SMsXPrn+mpX//2Q==')",
  }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Sentiment Analysis Results</h1>
          <p className="text-lg text-white">
            Comprehensive analysis of 1,254 stakeholder comments
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {sentimentData.map((item, index) => (
            <div key={item.name} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">{item.name} Comments</h3>
                {item.name === 'Positive' && <TrendingUp className="h-6 w-6 text-green-500" />}
                {item.name === 'Negative' && <TrendingDown className="h-6 w-6 text-red-500" />}
                {item.name === 'Neutral' && <Minus className="h-6 w-6 text-yellow-500" />}
              </div>
              <p className="text-3xl font-bold mb-2" style={{ color: COLORS[index] }}>
                {item.value}
              </p>
              <p className="text-sm text-gray-500">{item.percentage}% of total</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sentiment Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
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
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comment Volume by Sentiment</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Most Frequent Words */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(topWords).map(([sentiment, words], index) => (
            <div key={sentiment} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 capitalize" style={{ color: COLORS[index] }}>
                Top {sentiment} Words
              </h3>
              <div className="space-y-2">
                {words.map((word, wordIndex) => (
                  <div key={word} className="flex items-center justify-between">
                    <span className="font-medium">{wordIndex + 1}. {word}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${100 - wordIndex * 8}%`,
                          backgroundColor: COLORS[index]
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Word Cloud Placeholders */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {['Positive', 'Neutral', 'Negative'].map((sentiment, index) => (
            <div key={sentiment} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: COLORS[index] }}>
                {sentiment} Word Cloud
              </h3>
              <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-2">☁️</div>
                  <p className="text-sm text-gray-500">{sentiment} Word Cloud</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights & Summaries */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            Key Insights & Summaries
          </h2>
          <div className="space-y-4">
            {summaries.map((summary, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-gray-700">{summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ML Model Performance */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
              <p className="text-gray-600">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">91.8%</div>
              <p className="text-gray-600">Precision</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">93.5%</div>
              <p className="text-gray-600">Recall</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">92.6%</div>
              <p className="text-gray-600">F1-Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}