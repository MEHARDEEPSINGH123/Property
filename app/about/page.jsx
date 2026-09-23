'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../src/context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Globe2, 
  ArrowRight,
  Landmark,
  Scale
} from 'lucide-react';

export default function AboutPage() {
  const { openInquiry } = useApp();

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Header */}
      <section className="relative py-20 bg-surface border-b border-luxury-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Singapore Private Office</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-luxury-textPrimary tracking-tight">
            The Pinnacle of Discretion & Architectural Eminence
          </h1>
          <p className="text-sm sm:text-base text-luxury-textSecondary max-w-2xl mx-auto font-light leading-relaxed">
            Founded to provide ultra-high-net-worth families, institutional trusts, and sovereign principals with an unrivaled standard of real estate advisory in Singapore.
          </p>
        </div>
      </section>

      {/* Narrative & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
              Our Heritage & Philosophy
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Where Family Office Rigor Meets Architectural Stewardship
            </h2>
            <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
              At AUREA, we view prime Singapore real estate not merely as square footage, but as generational wealth preservation vehicles and architectural masterworks. Our private advisory model deliberately rejects high-volume brokerage in favor of bespoke, confidential representation.
            </p>
            <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
              Operating out of Marina Bay Financial Centre, our senior partners coordinate directly with private banks, Singapore legal counsel, and tax advisors to orchestrate frictionless cross-border acquisitions, off-market Good Class Bungalows, and trophy commercial shophouse portfolios.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-luxury-border">
              <div>
                <div className="font-serif text-3xl font-bold text-primary">S$ 4.8B+</div>
                <div className="text-xs text-slate-500 mt-1">Cumulative Transactions Advised</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-gold">100%</div>
                <div className="text-xs text-slate-500 mt-1">Discretion & CEA Regulatory Track Record</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-luxury-lg overflow-hidden shadow-luxury border border-luxury-border">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="AUREA Private Office Singapore"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-2xl border border-gold/40 hidden sm:block max-w-xs">
              <div className="flex items-center space-x-2 text-gold text-xs font-bold uppercase tracking-wider mb-1">
                <Landmark className="w-4 h-4" />
                <span>Monetary Authority of Singapore (MAS)</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Full compliance with Singapore anti-money laundering and real estate escrow legalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="bg-surface py-20 border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
              Advisory Standards
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              The Four Pillars of AUREA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Absolute Confidentiality",
                desc: "We enforce strict non-disclosure covenants and private escrow routing to safeguard our clients' identities and financial sovereignty."
              },
              {
                icon: Landmark,
                title: "Off-Market Access",
                desc: "Over 40% of our ultra-luxury transactions occur completely off-market, granting our clients privileged access to generational Nassim estates."
              },
              {
                icon: Scale,
                title: "Tax & ABSD Optimization",
                desc: "Proprietary structuring advice navigating IRAS Buyer's Stamp Duty, Entity transfers, and commercial exemptions."
              },
              {
                icon: Globe2,
                title: "Cross-Border Wealth Desk",
                desc: "Bilingual advisors assisting private banking clients from Zurich, London, Hong Kong, and Dubai in Singapore asset diversification."
              }
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-luxury p-8 border border-luxury-border shadow-soft space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-gold flex items-center justify-center">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary">
                  {pillar.title}
                </h3>
                <p className="text-xs text-luxury-textSecondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Office CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
          Begin a Confidential Dialogue
        </h2>
        <p className="text-xs sm:text-sm text-luxury-textSecondary max-w-xl mx-auto leading-relaxed">
          Whether you are evaluating Singapore residential relocation, commercial shophouse capital allocation, or estate divestment, our Senior Partners are at your disposal.
        </p>
        <button
          onClick={() => openInquiry()}
          className="bg-gold hover:bg-gold-dark text-slate-950 font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-xl shadow-soft hover:shadow-luxury transition-all"
        >
          Consult AUREA Senior Partner
        </button>
      </section>
    </div>
  );
}
