'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Subscribed to AUREA Quarterly Private Wealth Intelligence');
    setEmail('');
  };

  return (
    <footer className="bg-primary text-slate-300 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Advisory Banner */}
        <div className="bg-slate-900/80 rounded-luxury-lg p-8 sm:p-12 border border-slate-800/80 mb-16 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center space-x-2 text-gold text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Wealth Intelligence</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Receive the Singapore Luxury Property Report
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Curated quarterly analysis of prime district transaction volumes, off-market GCB transactions, and high-net-worth real estate capital flows.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center space-x-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 px-5 py-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Thank you. Your dossier subscription has been confirmed.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email..."
                    className="flex-1 bg-slate-950/80 border border-slate-700/80 focus:border-gold rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-slate-950 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-soft hover:shadow-luxury"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Multi-column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800 text-sm">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-gold/40 flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-gold">A</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wide">AUREA</span>
                <span className="block text-[9px] tracking-[0.2em] text-gold uppercase font-medium">Private Office</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pr-4">
              AUREA is Singapore's foremost private client brokerage, representing international family offices, sovereign principals, and discerning individuals across trophy residential and commercial real estate.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Marina Bay Financial Centre, Tower 2, Level 38, Singapore 018983</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+65 6789 2800 | Concierge: +65 8920 1888</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>privateoffice@aurea-estates.com</span>
              </div>
            </div>
          </div>

          {/* Prime Districts */}
          <div className="space-y-4">
            <h4 className="font-serif text-white font-semibold tracking-wider text-sm uppercase">Prime Districts</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/properties?location=Marina+Bay" className="hover:text-gold transition-colors">Marina Bay (D01)</Link></li>
              <li><Link href="/properties?location=Tanjong+Pagar" className="hover:text-gold transition-colors">Tanjong Pagar & CBD (D02)</Link></li>
              <li><Link href="/properties?location=Sentosa+Cove" className="hover:text-gold transition-colors">Sentosa Cove Oceanfront (D04)</Link></li>
              <li><Link href="/properties?location=Orchard" className="hover:text-gold transition-colors">Orchard & Paterson (D09)</Link></li>
              <li><Link href="/properties?location=Tanglin+%26+Nassim" className="hover:text-gold transition-colors">Tanglin & Nassim GCBs (D10)</Link></li>
              <li><Link href="/properties?location=Bukit+Timah" className="hover:text-gold transition-colors">Bukit Timah Estates (D10)</Link></li>
              <li><Link href="/properties?location=East+Coast+%26+Marine+Parade" className="hover:text-gold transition-colors">East Coast & Marine (D15)</Link></li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-white font-semibold tracking-wider text-sm uppercase">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/properties" className="hover:text-gold transition-colors">All Prime Listings</Link></li>
              <li><Link href="/new-projects" className="hover:text-gold transition-colors">New Developments</Link></li>
              <li><Link href="/market-insights" className="hover:text-gold transition-colors">Market Insights & Trends</Link></li>
              <li><Link href="/agents" className="hover:text-gold transition-colors">Licensed Private Advisors</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">Our Advisory Heritage</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Private Client Offices</Link></li>
            </ul>
          </div>

          {/* Advisory & Compliance */}
          <div className="space-y-4">
            <h4 className="font-serif text-white font-semibold tracking-wider text-sm uppercase">Advisory & Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><span className="text-slate-400">Buyer's Stamp Duty (BSD) Guide</span></li>
              <li><span className="text-slate-400">ABSD Advisory for Foreigners</span></li>
              <li><span className="text-slate-400">Off-Market Acquisitions</span></li>
              <li><span className="text-slate-400">Family Office Relocation</span></li>
              <li><span className="text-slate-400">CEA Code of Practice</span></li>
              <li><span className="text-slate-400">Privacy & Confidentiality Charter</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & CEA License */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-gold/80" />
            <span>
              Registered Estate Agent | CEA Licence No. L3008920K | © 2026 AUREA International Realty Pte Ltd. All Rights Reserved.
            </span>
          </div>
          <div className="flex items-center space-x-6 text-slate-400">
            <span className="hover:text-gold cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Anti-Money Laundering Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
