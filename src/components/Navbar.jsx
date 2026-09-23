'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Layers, 
  Menu, 
  X, 
  Sparkles, 
  Globe, 
  ChevronDown,
  PhoneCall
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { 
    currency, 
    setCurrency, 
    currencyRates, 
    savedPropertyIds, 
    comparePropertyIds, 
    setIsCompareOpen,
    setIsAiAssistantOpen,
    openInquiry
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Properties', path: '/properties' },
    { label: 'New Projects', path: '/new-projects' },
    { label: 'Market Insights', path: '/market-insights' },
    { label: 'Private Advisors', path: '/agents' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-luxury-border">
      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center border border-gold/40 shadow-sm group-hover:border-gold transition-colors">
            <span className="font-serif text-xl font-bold text-gold">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              AUREA
            </span>
            <span className="text-[10px] tracking-[0.25em] text-luxury-textSecondary uppercase font-medium">
              Private Estates
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-gold ${
                isActive(link.path) 
                  ? 'text-primary font-semibold border-b-2 border-gold pb-1' 
                  : 'text-luxury-textSecondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center space-x-1 text-xs font-semibold text-luxury-textSecondary hover:text-primary px-2.5 py-1.5 rounded-lg border border-luxury-border hover:border-gold/50 transition-all bg-surface"
              title="Change Currency"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
            </button>

            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-luxury border border-luxury-border py-1.5 z-50 animate-in fade-in">
                {Object.entries(currencyRates).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-surface transition-colors ${
                      currency === code ? 'text-primary font-bold bg-gold-subtle/50' : 'text-luxury-textSecondary'
                    }`}
                  >
                    <span>{info.label}</span>
                    <span className="font-semibold text-primary">{code} ({info.symbol})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compare Button */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="relative p-2.5 rounded-xl border border-luxury-border hover:border-gold/60 text-luxury-textSecondary hover:text-primary transition-all bg-surface"
            title="Compare Properties"
          >
            <Layers className="w-4 h-4" />
            {comparePropertyIds.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-gold text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                {comparePropertyIds.length}
              </span>
            )}
          </button>

          {/* Saved / Favorites Button */}
          <Link
            href="/properties?filter=saved"
            className="relative p-2.5 rounded-xl border border-luxury-border hover:border-gold/60 text-luxury-textSecondary hover:text-primary transition-all bg-surface"
            title="Saved Properties"
          >
            <Heart className={`w-4 h-4 ${savedPropertyIds.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {savedPropertyIds.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                {savedPropertyIds.length}
              </span>
            )}
          </Link>

          {/* Book Consultation Gold Button */}
          <button
            onClick={() => openInquiry()}
            className="hidden sm:inline-flex items-center space-x-2 bg-gold hover:bg-gold-dark text-slate-950 font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-xl shadow-soft hover:shadow-luxury transition-all"
          >
            <span>Consult Advisor</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-primary hover:text-gold transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-luxury-border px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium py-1.5 ${
                  isActive(link.path) ? 'text-gold font-semibold' : 'text-luxury-textPrimary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-luxury-border flex flex-col space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAiAssistantOpen(true);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-gold text-sm font-semibold py-3 rounded-xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AURELIA AI Concierge</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openInquiry();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-gold text-slate-950 text-sm font-semibold py-3 rounded-xl"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Private Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
