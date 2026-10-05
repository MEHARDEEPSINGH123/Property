'use client';

import React, { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  RotateCcw,
  Minimize2,
  Building2,
  ShieldCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

export default function Chatbot() {
  const { isChatbotOpen, openChatbot, closeChatbot, properties, formatPrice } = useApp();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Greetings. I am AURELIA, your Private Client Real Estate AI Concierge. How may I assist your portfolio search or Singapore property structuring today?",
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    "Foreign buyer ABSD rate?",
    "Sentosa Cove waterfront villas",
    "Commercial shophouses (0% ABSD)",
    "Penthouses in Marina Bay",
    "Good Class Bungalow rules"
  ];

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isChatbotOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isChatbotOpen]);

  const handleSend = (textToSend = null) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI Response generation
    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";

      if (q.includes('absd') || q.includes('tax') || q.includes('stamp duty') || q.includes('foreigner')) {
        reply = "In Singapore, Additional Buyer's Stamp Duty (ABSD) for foreign nationals is 60% on residential acquisitions. Singapore Citizens pay 0% on their 1st residential property, 20% on their 2nd, and 30% on their 3rd+. Permanent Residents pay 5% on their 1st, 30% on their 2nd, and 35% on their 3rd+.\n\nKey Strategy: Commercial properties (such as Conservation Shophouses and Grade A Commercial Offices) are 100% EXEMPT from ABSD for all buyers (including foreigners).";
      } else if (q.includes('sentosa') || q.includes('waterfront') || q.includes('yacht') || q.includes('cove')) {
        reply = "Sentosa Cove is Singapore's only oceanfront enclave where non-citizens can legally purchase landed property with expedited SLA approval. Homes feature private berths for yachts and uninhibited South China Sea panoramas, with price points ranging from S$15M to S$50M+.";
      } else if (q.includes('penthouse') || q.includes('marina') || q.includes('sky')) {
        reply = "Our portfolio includes premier sky residences and super penthouses in Marina Bay (D01) and Orchard (D09). Notable developments include Marina Bay Residences, Boulevard 88, and Wallich Residence, offering private lap pools and 360° city vistas.";
      } else if (q.includes('gcb') || q.includes('bungalow') || q.includes('nassim') || q.includes('tanglin')) {
        reply = "Good Class Bungalows (GCBs) in Tanglin, Nassim, and Cluny Hill represent the peak of Southeast Asian prestige. Located across 39 designated gazetted enclaves with a minimum plot size of 15,070 sqft, GCBs are reserved strictly for Singapore Citizens.";
      } else if (q.includes('shophouse') || q.includes('commercial') || q.includes('yield') || q.includes('office')) {
        reply = "Full-commercial conservation shophouses in D01/D02 (Tanjong Pagar, Telok Ayer, Amoy) generate robust net yields between 3.5% and 4.5%. Because they are commercial assets, international buyers enjoy 0% ABSD and zero Seller's Stamp Duty.";
      } else if (q.includes('mortgage') || q.includes('loan') || q.includes('tdsr') || q.includes('interest')) {
        reply = "Under MAS regulations, the Total Debt Servicing Ratio (TDSR) caps debt obligations at 55% of gross monthly income. First residential mortgages allow up to 75% Loan-to-Value (LTV) with a minimum 5% cash downpayment.";
      } else {
        reply = "I would be delighted to assist your property acquisition. Our portfolio covers 105 verified prime Singapore listings across Marina Bay, Orchard, Sentosa Cove, and prime commercial districts. You can ask me about tax structuring (ABSD), district price benchmarks, or schedule a private viewing.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: "Greetings. I am AURELIA, your Private Client Real Estate AI Concierge. How may I assist your portfolio search or Singapore property structuring today?",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* 1. DagsisChat Script Integration */}
      <Script
        src="https://dagsis.jsuite.in/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            if (typeof window !== 'undefined' && window.DagsisChat) {
              window.DagsisChat.init({
                agentId: "e6177c88-a70b-4059-baa3-381d70d1c432",
                apiKey: "a3faad11-aa05-4dee-99c7-f15c66be3c5b"
              });
            }
          } catch (error) {
            console.error("DagsisChat initialization error:", error);
          }
        }}
      />

      {/* 2. Floating 'Ask AURELIA' Button (Always visible on bottom-right) */}
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

      {/* 3. Sleek Floating AI Chatbot Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-80px)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                    AURELIA
                  </h3>
                  <span className="flex items-center space-x-1 text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AI Concierge</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Singapore Private Office Intelligence</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleResetChat}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={closeChatbot}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-[#0F172A] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-2xl p-3 w-16 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] whitespace-nowrap bg-slate-100 hover:bg-[#D4AF37] hover:text-slate-950 text-slate-600 px-2.5 py-1 rounded-full transition-colors font-medium border border-slate-200"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about properties, taxes, or districts..."
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-[#0F172A] hover:bg-[#D4AF37] hover:text-slate-950 disabled:opacity-40 text-[#D4AF37] p-2.5 rounded-xl transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
