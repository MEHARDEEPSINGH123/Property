'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  X, 
  ExternalLink 
} from 'lucide-react';

export default function Chatbot() {
  const { isChatbotOpen, openChatbot, closeChatbot } = useApp();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Official Dagsis AI Agent credentials
  const agentId = "e6177c88-a70b-4059-baa3-381d70d1c432";
  const apiKey = "a3faad11-aa05-4dee-99c7-f15c66be3c5b";
  const agentName = "AURELIA AI";
  
  // Real live Dagsis AI production embed endpoint
  const embedUrl = `https://dagsis.ai/embed/${agentId}?name=${encodeURIComponent(agentName)}#apiKey=${encodeURIComponent(apiKey)}`;

  return (
    <>
      {/* 1. Floating 'Ask AURELIA' Button */}
      {!isChatbotOpen && (
        <button
          onClick={openChatbot}
          className="fixed bottom-6 right-6 z-50 bg-[#0F172A] hover:bg-slate-900 text-white rounded-full p-3.5 sm:px-5 sm:py-3.5 shadow-2xl border-2 border-[#D4AF37] flex items-center space-x-2.5 transition-all duration-300 hover:scale-105 group"
          title="Open AURELIA AI Concierge"
        >
          <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
          </div>
          <span className="hidden sm:inline font-serif text-sm font-semibold tracking-wide text-[#D4AF37]">
            Ask AURELIA
          </span>
        </button>
      )}

      {/* 2. Real Live Dagsis AI Chat Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[620px] max-h-[calc(100vh-80px)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#0F172A] text-white p-3.5 px-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                    AURELIA
                  </h3>
                  <span className="flex items-center space-x-1 text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Dagsis AI Live</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Singapore Private Office Intelligence</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={closeChatbot}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dagsis AI Live Embedded Agent */}
          <div className="flex-1 w-full h-full relative bg-white">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 space-y-3 z-10">
                <div className="w-9 h-9 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin"></div>
                <p className="text-xs text-slate-500 font-medium">Connecting to Dagsis AI Agent...</p>
              </div>
            )}
            <iframe
              src={embedUrl}
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-none"
              allow="clipboard-write; microphone"
              title="AURELIA Dagsis AI Agent"
            />
          </div>
        </div>
      )}
    </>
  );
}
