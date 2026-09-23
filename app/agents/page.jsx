'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../../src/context/AppContext';
import CustomSelect from '../../src/components/CustomSelect';
import { 
  Search, 
  Star, 
  Award, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Building2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AgentsPage() {
  const { agents, properties, openInquiry } = useApp();

  const [keyword, setKeyword] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Extract all unique specializations & languages
  const specialties = useMemo(() => {
    const set = new Set(agents.map((a) => a.specialization));
    return Array.from(set).sort();
  }, [agents]);

  const languages = useMemo(() => {
    const set = new Set();
    agents.forEach((a) => a.languages?.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [agents]);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matches = 
          agent.name.toLowerCase().includes(q) ||
          agent.specialization.toLowerCase().includes(q) ||
          agent.cea_number.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedSpecialty && agent.specialization !== selectedSpecialty) {
        return false;
      }
      if (selectedLanguage && !agent.languages?.includes(selectedLanguage)) {
        return false;
      }
      return true;
    });
  }, [agents, keyword, selectedSpecialty, selectedLanguage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>CEA Licensed Private Partners</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-textPrimary tracking-tight">
          Private Client Real Estate Advisors
        </h1>
        <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
          Elite real estate partners providing confidential representation, capital preservation guidance, and off-market access across Singapore.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface rounded-luxury-lg p-5 sm:p-6 border border-luxury-border shadow-soft grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Name Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search advisor by name or CEA..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-luxury-border focus:border-gold rounded-xl text-xs text-primary outline-none transition-colors"
          />
        </div>

        {/* Specialization Filter */}
        <CustomSelect
          value={selectedSpecialty}
          onChange={setSelectedSpecialty}
          placeholder="All Specializations"
          options={[
            { value: '', label: 'All Specializations' },
            ...specialties.map((s) => ({ value: s, label: s }))
          ]}
        />

        {/* Language Filter */}
        <CustomSelect
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          placeholder="All Languages Spoken"
          options={[
            { value: '', label: 'All Languages Spoken' },
            ...languages.map((l) => ({ value: l, label: l }))
          ]}
        />
      </div>

      {/* Agents Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map((agent) => {
          const agentListingCount = properties.filter((p) => p.agent_id === agent.id).length || 3;
          return (
            <div
              key={agent.id}
              className="bg-white rounded-luxury border border-luxury-border hover:border-gold/60 shadow-soft hover:shadow-luxury-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Agent Header Photo & Badges */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold/40">
                    CEA {agent.cea_number}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium">
                      {agent.experience_years} Years Experience
                    </span>
                    <span className="bg-gold text-slate-950 font-bold px-2 py-1 rounded-md text-[11px] flex items-center space-x-1 shadow-sm">
                      <Star className="w-3 h-3 fill-slate-950" />
                      <span>{agent.rating}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-luxury-textPrimary">
                      {agent.name}
                    </h3>
                    <div className="text-xs font-semibold text-gold-dark mt-0.5">
                      {agent.specialization}
                    </div>
                  </div>

                  <p className="text-xs text-luxury-textSecondary leading-relaxed line-clamp-3">
                    {agent.bio}
                  </p>

                  {/* Languages & Sales Metrics */}
                  <div className="pt-3 border-t border-luxury-borderLight space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Closed Transactions:</span>
                      <span className="font-bold text-primary font-mono">S$ {agent.sales_volume_sgd_m}M+</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Languages:</span>
                      <span className="text-primary font-medium">{agent.languages?.join(', ')}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Active Prime Listings:</span>
                      <span className="text-primary font-medium">{agentListingCount} Properties</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => openInquiry(null, agent)}
                  className="w-full bg-gold hover:bg-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-soft hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Consultation</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <a
                    href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-center space-x-1 py-2 rounded-lg border border-luxury-border hover:bg-surface text-slate-600 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-gold" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/6580001234?text=Hello%20${encodeURIComponent(agent.name)},%20I%20would%20like%20to%20consult%20on%20Singapore%20luxury%20real%20estate.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
