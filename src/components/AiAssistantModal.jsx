'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ExternalLink, 
  Bed, 
  Maximize2, 
  MapPin, 
  CornerDownRight,
  ShieldCheck
} from 'lucide-react';

export default function AiAssistantModal() {
  const { 
    isAiAssistantOpen, 
    setIsAiAssistantOpen, 
    properties, 
    formatPrice,
    openMortgageCalculator 
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Greetings. I am AURELIA, your Private Client Real Estate Concierge. How may I assist your portfolio search or Singapore property structuring today?",
      suggestions: [
        "Waterfront villas in Sentosa Cove",
        "Penthouses in Marina Bay under $25M",
        "Good Class Bungalows in Tanglin & Nassim",
        "What is the ABSD rate for foreign buyers?",
        "High-yield commercial shophouses in D02"
      ],
      recommendedProperties: []
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOpenAssistant = (e) => {
    if (typeof window !== 'undefined') {
      if (window.DagsisChat) {
        if (typeof window.DagsisChat.open === 'function') {
          window.DagsisChat.open();
          return;
        }
        if (typeof window.DagsisChat.toggle === 'function') {
          window.DagsisChat.toggle();
          return;
        }
        if (typeof window.DagsisChat.show === 'function') {
          window.DagsisChat.show();
          return;
        }
      }
      const dagsisEl = document.querySelector(
        '#dagsis-launcher, .dagsis-launcher, .dagsis-widget-button, #dagsis-chat-button'
      );
      if (dagsisEl && typeof dagsisEl.click === 'function' && dagsisEl !== e?.currentTarget) {
        dagsisEl.click();
        return;
      }
    }
    setIsAiAssistantOpen(true);
  };

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // AI Query Matching Logic
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matchedProps = [];
      let replyText = "";
      let newSuggestions = [];

      // 1. ABSD / Taxes
      if (qLower.includes('absd') || qLower.includes('tax') || qLower.includes('stamp duty') || qLower.includes('foreigner')) {
        replyText = "In Singapore, Additional Buyer's Stamp Duty (ABSD) for foreign nationals is 60% for any residential acquisition. Singapore Citizens pay 0% on their 1st home, 20% on 2nd, and 30% on 3rd+. Permanent Residents pay 5% on 1st, 30% on 2nd, and 35% on 3rd+. Note: Commercial properties (e.g. conservation shophouses and Grade A offices) are completely EXEMPT from ABSD. Would you like me to open the Singapore Stamp Duty Calculator?";
        newSuggestions = ["Open ABSD Calculator", "Show commercial shophouses (No ABSD)", "Show Sentosa Cove villas"];
      } 
      // 2. Sentosa / Waterfront
      else if (qLower.includes('sentosa') || qLower.includes('waterfront') || qLower.includes('cove') || qLower.includes('yacht')) {
        matchedProps = properties.filter(p => 
          p.location.toLowerCase().includes('sentosa') || 
          p.property_type.toLowerCase().includes('waterfront') ||
          p.district === 'D04'
        ).slice(0, 3);
        replyText = `Sentosa Cove represents Singapore's premier oceanfront enclave, offering private berths for superyachts and uninhibited South China Sea panoramas. Here are ${matchedProps.length} trophy waterfront residences currently available in our portfolio:`;
        newSuggestions = ["Marina Bay penthouses", "Tanglin & Nassim GCBs", "Book private viewing"];
      } 
      // 3. Marina Bay / Penthouses
      else if (qLower.includes('marina bay') || qLower.includes('penthouse') || qLower.includes('sky')) {
        matchedProps = properties.filter(p => 
          (p.location.toLowerCase().includes('marina') || p.district === 'D01' || p.property_type === 'Penthouse') &&
          p.price_sgd <= 35000000
        ).slice(0, 3);
        replyText = `Marina Bay is the world-renowned nexus of Singapore's financial skyline. Here are ${matchedProps.length} premier sky residences featuring panoramic city and ocean vistas:`;
        newSuggestions = ["Show under $15M", "Orchard luxury residences", "Schedule viewing"];
      } 
      // 4. GCB / Landed / Tanglin / Nassim
      else if (qLower.includes('gcb') || qLower.includes('bungalow') || qLower.includes('nassim') || qLower.includes('tanglin')) {
        matchedProps = properties.filter(p => 
          p.property_type === 'Good Class Bungalow' || 
          p.location.toLowerCase().includes('nassim') || 
          p.district === 'D10'
        ).slice(0, 3);
        replyText = `Good Class Bungalows (GCBs) in Tanglin, Nassim, and Cluny Hill represent the apex of Southeast Asian prestige. Here are private estates currently listed:`;
        newSuggestions = ["Bukit Timah residences", "What is GCB eligibility?", "Sentosa villas"];
      }
      // 5. Commercial / Shophouses
      else if (qLower.includes('shophouse') || qLower.includes('commercial') || qLower.includes('office') || qLower.includes('d02')) {
        matchedProps = properties.filter(p => 
          p.property_type.includes('Shophouse') || 
          p.property_type.includes('Commercial') || 
          p.district === 'D02'
        ).slice(0, 3);
        replyText = `Commercial shophouses in Tanjong Pagar and Telok Ayer are among the most sought-after institutional capital preservation assets in Asia, with 0% ABSD for all foreign and corporate buyers:`;
        newSuggestions = ["Tell me about rental yields", "Show Marina Bay offices", "Contact commercial advisor"];
      }
      // 6. Generic or Budget-based Search
      else {
        matchedProps = properties.filter(p => p.featured).slice(0, 3);
        replyText = `I have scanned our curated portfolio of 100+ prime Singapore residences and commercial landmarks. Here are highly recommended trophy opportunities tailored to discerning private clients:`;
        newSuggestions = ["Sentosa waterfront villas", "Orchard residences", "ABSD advisory"];
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: replyText,
          suggestions: newSuggestions,
          recommendedProperties: matchedProps
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
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
          } catch (err) {
            console.error("DagsisChat initialization error:", err);
          }
        }}
      />

      {!isAiAssistantOpen ? (
        <button
          onClick={handleOpenAssistant}
          className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-slate-900 text-white rounded-full p-3.5 sm:px-5 sm:py-3.5 shadow-2xl border-2 border-gold/70 flex items-center space-x-2.5 transition-all duration-300 hover:scale-105 group"
          title="Open AURELIA AI Concierge"
        >
          <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
          </div>
          <span className="hidden sm:inline font-serif text-sm font-semibold tracking-wide text-gold">
            Ask AURELIA
          </span>
        </button>
      ) : (
        <div className="fixed inset-0 z-50 overflow-hidden bg-primary/60 backdrop-blur-sm flex justify-end sm:p-4 animate-in fade-in">
      <div className="bg-white w-full sm:max-w-lg h-full sm:h-[88vh] sm:rounded-luxury-lg shadow-2xl flex flex-col border border-luxury-border overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-primary text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-gold/40 flex items-center justify-center text-gold">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  AURELIA
                </h3>
                <span className="text-[9px] bg-gold/20 text-gold border border-gold/40 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  AI Concierge
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Singapore Private Office Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-surface">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-soft ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white text-luxury-textPrimary border border-luxury-border rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* Recommended Property Cards */}
              {msg.recommendedProperties && msg.recommendedProperties.length > 0 && (
                <div className="mt-3 space-y-2 w-full max-w-[95%]">
                  {msg.recommendedProperties.map((p) => (
                    <Link
                      key={p.id}
                      href={`/property/${p.id}`}
                      onClick={() => setIsAiAssistantOpen(false)}
                      className="group bg-white rounded-xl border border-luxury-border hover:border-gold p-3 flex space-x-3 shadow-sm hover:shadow-md transition-all"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                          <span className="font-semibold text-primary">{p.district}</span>
                          <span className="font-mono text-gold-dark font-bold">
                            {formatPrice(p.price_sgd, p.listing_type === 'Rent')}
                          </span>
                        </div>
                        <h5 className="font-serif text-xs font-bold text-primary truncate group-hover:text-gold transition-colors">
                          {p.title}
                        </h5>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-1">
                          <span>{p.bedrooms > 0 ? `${p.bedrooms} Beds` : 'Commercial'}</span>
                          <span>•</span>
                          <span>{p.area_sqft.toLocaleString()} sqft</span>
                          <span>•</span>
                          <span className="truncate">{p.nearest_mrt.replace(' MRT', '')}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Quick suggestion chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 max-w-[95%]">
                  {msg.suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        if (sug.toLowerCase().includes('calculator')) {
                          openMortgageCalculator();
                        } else {
                          handleSend(sug);
                        }
                      }}
                      className="text-[11px] bg-white hover:bg-gold hover:text-slate-950 text-luxury-textSecondary font-medium px-3 py-1.5 rounded-full border border-luxury-border transition-colors text-left"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 bg-white rounded-xl p-3 border border-luxury-border w-24">
              <span className="w-2 h-2 rounded-full bg-gold animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Query Input */}
        <div className="p-3 sm:p-4 bg-white border-t border-luxury-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about properties, districts, or ABSD..."
              className="flex-1 bg-surface border border-luxury-border focus:border-gold rounded-xl px-4 py-2.5 text-xs text-primary placeholder-slate-400 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="bg-primary hover:bg-gold hover:text-slate-950 disabled:opacity-40 text-gold p-2.5 rounded-xl transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )}
</>
  );
}
