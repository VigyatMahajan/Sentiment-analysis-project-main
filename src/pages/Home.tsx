import React, { useState, useEffect } from "react";
import { BarChart2, FileText, Cloud, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Sentiment Data for Chart
const sentimentData = [
  { name: "Positive", value: 62 },
  { name: "Neutral", value: 25 },
  { name: "Negative", value: 13 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function Home() {


  return (
    <div
  
>

      {/* Meta Tags */}
      <Helmet>
        <marquee><title>AI Sentiment Analysis Platform</title></marquee>
        <meta
          name="description"
          content="AI-powered feedback analysis tool for public consultations – sentiment, summaries, visualizations."
        />
      </Helmet>

      

      {/* Hero Section */}
      <section className="relative text-center py-24 bg-[url('https://as2.ftcdn.net/jpg/07/44/21/21/1000_F_744212183_nSgEbtUQYZf0wd1x5bel6Jt5NfMOkFvA.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-indigo-700/80"></div>

        <motion.div
          className="relative z-10 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-6xl font-extrabold drop-shadow-lg overflow-hidden">
            <span className="inline-block whitespace-nowrap">
              Sentiment Analysis Platform
            </span>
          </h3>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-200">
            Analyze stakeholder feedback on draft legislations with{" "}
            <span className="font-semibold text-white">
              sentiment detection, summaries, and insights
            </span>{" "}
            — ensuring every voice is heard.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <Link
              to="/upload"
              className="px-6 py-3 bg-indigo-800 text-white font-semibold rounded-xl shadow hover:bg-indigo-900 hover:scale-105 transition-transform duration-200"
            >
              Upload Draft
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 ">
        {/* Sentiment Summary Graph */}
        <section id="overview" className="py-16 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">
              Recent Sentiment Overview
            </h3>
            <div className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
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
        </section>

        {/* Problem Statement */}
        <section id="challenge" className="px-6 md:px-12 py-20 text-center">
          <h2 className="text-3xl font-bold">The Challenge</h2>
          <p className="mt-6 text-lg max-w-4xl mx-auto leading-relaxed">
            Proposed amendments and draft legislations often receive{" "}
            <span className="text-blue-400 font-semibold">
              thousands of public comments
            </span>{" "}
            within a short window. Manually reviewing each suggestion is{" "}
            <span className="font-semibold text-red-400">
              time-consuming, error-prone, and risks overlooking key voices
            </span>
            .
          </p>
        </section>

        {/* Solution */}
        <section id="solution" className="px-6 md:px-12 py-20 text-center">
          <h2 className="text-3xl font-bold">Our AI-Driven Solution</h2>
          <p className="mt-6 text-lg max-w-4xl mx-auto leading-relaxed">
            Using{" "}
            <span className="font-semibold text-blue-400">
              sentiment analysis, summary generation, and word cloud
              visualization
            </span>
            , our system processes feedback systematically—reducing analyst
            effort and boosting decision-making.
          </p>
        </section>

        {/* Features */}
        <section
          id="features"
          className="grid md:grid-cols-3 gap-10 px-6 md:px-12 py-20"
        >
          {[
            {
              icon: <BarChart2 className="mx-auto text-blue-400" size={50} />,
              title: "Sentiment Analysis",
              desc: "Detect positive, negative, and neutral sentiments in all comments.",
            },
            {
              icon: <FileText className="mx-auto text-green-400" size={50} />,
              title: "Summary Generation",
              desc: "Generate concise, meaningful summaries from lengthy feedback.",
            },
            {
              icon: <Cloud className="mx-auto text-purple-400" size={50} />,
              title: "Word Cloud",
              desc: "Visualize keywords most frequently mentioned by stakeholders.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              {f.icon}
              <h3 className="mt-4 font-bold text-xl">{f.title}</h3>
              <p className="mt-2">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Workflow */}
        <section id="workflow" className="px-6 md:px-12 py-20">
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <div className="mt-10 max-w-4xl mx-auto">
            {[
              "Upload Draft / Comments",
              "AI Cleans & Processes Feedback",
              "Sentiment Detection",
              "Summaries & Insights",
              "Visualizations (Word Cloud + Charts)",
              "Download Reports",
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl hover:shadow-lg p-4"
              >
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">
                  {i + 1}
                </span>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sentiment Monitor Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <p className="text-gray-500 text-sm mb-2">
                  Feedback Sentiment Analysis
                </p>
                <img
                  src="https://influencermarketinghub.com/wp-content/uploads/2025/02/AI-Sentiment-Analysis.jpg"
                  alt="Citizen feedback sentiment analysis"
                  className="rounded-md"
                />
              </div>
              <span className="absolute -top-6 -right-6 text-4xl">📊</span>
              <span className="absolute top-10 -left-6 text-4xl">🗣️</span>
              <span className="absolute bottom-12 -right-8 text-4xl">✅</span>
            </div>

            {/* Right: Text */}
            <div>
              <h2 className="text-4xl font-bold leading-snug">
                Government{" "}
                <span className="text-blue-600">Stakeholder Feedback</span>{" "}
                Analysis in Real Time
              </h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Our platform helps ministries and departments analyze public
                comments on draft legislations and policies. Visualize citizen
                sentiments, identify concerns, and make data-driven decisions
                for better governance.
              </p>
            </div>
          </div>
        </section>

        {/* New Features */}
        <section
          id="new-features"
          className="px-6 md:px-12 py-20 bg-gray-50 dark:bg-gray-900"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            New Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              {
                img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                title: "Real-time Dashboard",
                desc: "Monitor stakeholder feedback in real-time with live charts and insights.",
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
                title: "Multi-Language Support",
                desc: "Analyze comments in multiple languages with instant AI translation.",
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/1997/1997928.png",
                title: "AI Summarizer",
                desc: "Automatically extract key points and themes from lengthy submissions.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition text-center"
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3 className="mt-2 font-bold text-xl">{f.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 px-6 py-12 mt-12 text-gray-300">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Branding */}
            <div>
              <h3 className="text-xl font-bold text-white">eConsult AI</h3>
              <p className="mt-3 text-sm">
                Empowering digital legislation review with AI. Built for
                transparency, inclusiveness, and insight.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                
                <li>
                  <Link to="/upload" className="hover:underline">
                    Upload Draft
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="hover:underline">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 rounded-l-md text-black w-full"
                />
                <button className="px-4 py-2 bg-yellow-400 text-black rounded-r-md font-semibold hover:bg-yellow-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-400">
            © {new Date().getFullYear()} eConsult AI. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}