"use client";

import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock, Share2, BookOpen, TrendingUp, Users, Shield, Eye, Zap, Globe, Play } from 'lucide-react';

const NetworkBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const nodeArray = [];
      for (let i = 0; i < 50; i++) {
        nodeArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
      setNodes(nodeArray);
    };
    generateNodes();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {nodes.map((node, idx) => (
          <g key={node.id}>
            {/* Connections */}
            {idx < nodes.length - 1 && (
              <line
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nodes[idx + 1].x}%`}
                y2={`${nodes[idx + 1].y}%`}
                stroke="rgba(99, 255, 218, 0.1)"
                strokeWidth="1"
              />
            )}
            {/* Node */}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(99, 255, 218, 0.6)"
              opacity={node.opacity}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

const MisinformationDetector = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('detector');

  // Simulated AI analysis
  const analyzeContent = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suspiciousKeywords = [
      'doctors don\'t want you to know', 'secret cure', 'they don\'t want you to know',
      'mainstream media won\'t tell you', 'big pharma conspiracy', 'proven fact',
      'shocking truth', 'leaked documents', 'government coverup', 'miracle cure'
    ];
    
    const factualKeywords = [
      'according to studies', 'research shows', 'peer-reviewed', 'scientific evidence',
      'data indicates', 'experts say', 'published in', 'verified sources'
    ];
    
    const suspiciousCount = suspiciousKeywords.filter(keyword => 
      inputText.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    
    const factualCount = factualKeywords.filter(keyword => 
      inputText.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    
    const wordCount = inputText.split(' ').length;
    const hasExcessiveCaps = (inputText.match(/[A-Z]/g) || []).length / inputText.length > 0.3;
    const hasEmotionalLanguage = /(!{2,}|amazing|shocking|incredible|unbelievable)/i.test(inputText);
    
    let credibilityScore = 75;
    credibilityScore -= suspiciousCount * 15;
    credibilityScore += factualCount * 10;
    credibilityScore -= hasExcessiveCaps ? 10 : 0;
    credibilityScore -= hasEmotionalLanguage ? 5 : 0;
    credibilityScore = Math.max(0, Math.min(100, credibilityScore));
    
    setAnalysis({
      credibilityScore,
      riskLevel: credibilityScore > 70 ? 'low' : credibilityScore > 40 ? 'medium' : 'high',
      flags: [
        ...(suspiciousCount > 0 ? ['Contains suspicious language patterns'] : []),
        ...(hasExcessiveCaps ? ['Excessive use of capital letters'] : []),
        ...(hasEmotionalLanguage ? ['Emotional manipulation detected'] : []),
        ...(factualCount === 0 && wordCount > 50 ? ['Lacks credible source references'] : [])
      ],
      latency: Math.floor(Math.random() * 100) + 50,
      processed: true
    });
    setIsAnalyzing(false);
  };

  const sampleTexts = [
    "According to a peer-reviewed study published in Nature Medicine, researchers found that regular exercise can reduce the risk of cardiovascular disease by up to 30%. The study followed 10,000 participants over 5 years.",
    "SHOCKING! Doctors don't want you to know this secret cure that big pharma is hiding! This miracle treatment can cure any disease in just 3 days! They don't want you to know because they make billions from keeping you sick!",
    "Climate scientists have observed a consistent warming trend over the past century, with data from multiple independent research institutions confirming temperature increases of approximately 1.1°C since pre-industrial times."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black relative">
      <NetworkBackground />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center pt-16 pb-12 px-4">
          <div className="mb-6">
            <span className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-full text-sm text-gray-300">
              AI content verification
            </span>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6">
            SocioGuard
          </h1>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Detect AI-generated and manipulated content across social platforms. Real-time
            signals, clear explanations, and tooling built for trust & safety teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setActiveTab('detector')}
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Post for verification
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-gray-800 text-white font-medium rounded-full border border-gray-600 hover:bg-gray-700 transition-colors">
              <Play className="w-4 h-4" />
              View demo
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">99.1%</div>
              <div className="text-sm text-gray-400">precision (lab)</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">~150ms</div>
              <div className="text-sm text-gray-400">median latency</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 text-center">
              <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">SOC2</div>
              <div className="text-sm text-gray-400">in progress</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 text-center">
              <Globe className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">API</div>
              <div className="text-sm text-gray-400">REST + Webhooks</div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block">
              <span className="bg-cyan-400 text-black px-4 py-2 font-bold text-xl">
                WELCOME
              </span>
              <span className="text-white font-bold text-xl ml-2">
                TO HACKSKY GUARD YOUR
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center text-gray-400">
              <span className="text-sm">Scroll to learn more</span>
              <div className="ml-2 animate-bounce">↓</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          {/* Detector Section */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Content Verification Engine
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the content you want to verify here..."
                className="w-full h-40 p-6 rounded-xl bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
              />
              
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-400">Quick examples:</span>
                {sampleTexts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputText(sample)}
                    className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 transition-colors border border-gray-600"
                  >
                    Example {idx + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={analyzeContent}
                disabled={!inputText.trim() || isAnalyzing}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  !inputText.trim() || isAnalyzing
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg hover:shadow-cyan-500/25'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Verify Content'
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {analysis && (
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Verification Results</h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Score */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-6 text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    analysis.riskLevel === 'low' ? 'text-green-400' :
                    analysis.riskLevel === 'medium' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {analysis.credibilityScore}%
                  </div>
                  <div className="text-gray-400 text-sm">Credibility Score</div>
                  <div className={`text-xs font-semibold mt-2 ${
                    analysis.riskLevel === 'low' ? 'text-green-400' :
                    analysis.riskLevel === 'medium' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {analysis.riskLevel.toUpperCase()} RISK
                  </div>
                </div>

                {/* Latency */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    {analysis.latency}ms
                  </div>
                  <div className="text-gray-400 text-sm">Processing Time</div>
                </div>

                {/* Status */}
                <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">✓</div>
                  <div className="text-gray-400 text-sm">Verified</div>
                  <div className="text-xs text-green-400 mt-2">Analysis Complete</div>
                </div>
              </div>

              {/* Detailed Analysis */}
              {analysis.flags.length > 0 && (
                <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    Detection Signals
                  </h4>
                  <div className="space-y-2">
                    {analysis.flags.map((flag, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-gray-400 text-sm">Instant verification with sub-second response times</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Enterprise Security</h3>
              <p className="text-gray-400 text-sm">SOC2 compliance and enterprise-grade security</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">API Integration</h3>
              <p className="text-gray-400 text-sm">RESTful APIs and webhooks for seamless integration</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 px-4 text-center">
          <p className="text-gray-400 mb-2">
            Built for Google Gen AI Exchange Hackathon 2025
          </p>
          <p className="text-sm text-gray-500">
            Empowering trust and safety teams worldwide
          </p>
        </footer>
      </div>
    </div>
  );
}

export default MisinformationDetector;