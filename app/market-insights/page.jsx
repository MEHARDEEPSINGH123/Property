'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../src/context/AppContext';
import CustomSelect from '../../src/components/CustomSelect';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  Building2, 
  ShieldCheck, 
  Scale 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function MarketInsightsPage() {
  const { marketInsights, formatPrice } = useApp();
  const [mounted, setMounted] = useState(false);

  const [compareDistrictA, setCompareDistrictA] = useState('D10 Tanglin/GCB');
  const [compareDistrictB, setCompareDistrictB] = useState('D01 Marina Bay');

  useEffect(() => {
    setMounted(true);
  }, []);

  const districtAData = marketInsights.district_psf.find((d) => d.district === compareDistrictA) || marketInsights.district_psf[0];
  const districtBData = marketInsights.district_psf.find((d) => d.district === compareDistrictB) || marketInsights.district_psf[2];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Singapore Real Estate Intelligence</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-textPrimary tracking-tight">
          Market Insights & Financial Dashboards
        </h1>
        <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
          Comprehensive econometric indices, district PSF comparisons, and asset allocation dynamics tracked by AUREA Private Office Research.
        </p>
      </div>

      {/* Top Key Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">
            CCR Luxury Benchmark
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
            {formatPrice(marketInsights.summary.avg_psf_overall)} / sqft
          </div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{marketInsights.summary.year_on_year_growth}% Annual Appreciation</span>
          </span>
        </div>

        <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">
            Prime Residential Yield
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
            {marketInsights.summary.rental_yield_avg}% p.a.
          </div>
          <span className="text-xs text-slate-500">
            Gross Prime Rental Yield
          </span>
        </div>

        <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">
            Average Portfolio Value
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
            {formatPrice(marketInsights.summary.avg_property_price_sgd)}
          </div>
          <span className="text-xs text-slate-500">
            Across 100+ Monitored Listings
          </span>
        </div>

        <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">
            Core Central Coverage
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
            20 Districts
          </div>
          <span className="text-xs text-slate-500">
            From Marina Bay to Sentosa & Nassim
          </span>
        </div>
      </div>

      {/* DASHBOARD 1: QUARTERLY PRICE INDEX TREND */}
      <div className="bg-white rounded-luxury-lg p-6 sm:p-10 border border-luxury-border shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
              Private Residential Property Price Index (2024 - 2026)
            </h2>
            <p className="text-xs text-slate-500">
              Tracking CCR (Core Central Region), RCR (Rest of Central), and OCR (Outside Central) quarterly index growth.
            </p>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketInsights.quarterly_index}>
                <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} 
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Line 
                  type="monotone" 
                  dataKey="ccr_index" 
                  name="Core Central Region (CCR)" 
                  stroke="#D4AF37" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#D4AF37' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="rcr_index" 
                  name="Rest of Central (RCR)" 
                  stroke="#0F172A" 
                  strokeWidth={2} 
                  dot={{ r: 3 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="ocr_index" 
                  name="Outside Central (OCR)" 
                  stroke="#94A3B8" 
                  strokeWidth={2} 
                  strokeDasharray="4 4" 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
          )}
        </div>
      </div>

      {/* DASHBOARD 2: DISTRICT PSF & ASSET ALLOCATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* District PSF Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-luxury-lg p-6 sm:p-8 border border-luxury-border shadow-soft space-y-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary">
              Average Price per Sq Ft by District
            </h2>
            <p className="text-xs text-slate-500">
              Singapore prime districts ranked by transaction PSF
            </p>
          </div>

          <div className="h-80 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketInsights.district_psf} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="district" type="category" width={115} tick={{ fontSize: 10 }} />
                  <Tooltip 
                    formatter={(val) => [formatPrice(val) + ' / sqft', 'Average PSF']}
                    contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
                  />
                  <Bar dataKey="psf" fill="#0F172A" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-slate-50 animate-pulse rounded-xl" />
            )}
          </div>
        </div>

        {/* Property Type Allocation */}
        <div className="lg:col-span-4 bg-white rounded-luxury-lg p-6 sm:p-8 border border-luxury-border shadow-soft flex flex-col justify-between space-y-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary">
              Market Distribution
            </h2>
            <p className="text-xs text-slate-500 mb-2">
              Share of luxury portfolio by asset class
            </p>

            <div className="h-56 w-full flex items-center justify-center">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketInsights.property_distribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {marketInsights.property_distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-44 w-44 rounded-full bg-slate-50 animate-pulse mx-auto" />
              )}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-luxury-borderLight">
            {marketInsights.property_distribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-primary">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DASHBOARD 3: INTERACTIVE DISTRICT COMPARISON TOOL */}
      <div className="bg-surface rounded-luxury-lg p-6 sm:p-10 border border-luxury-border shadow-soft space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-gold flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
              Interactive District Comparator
            </h2>
            <p className="text-xs text-luxury-textSecondary">
              Select any two Singapore districts to compare capital appreciation, PSF valuations, and gross rental yield.
            </p>
          </div>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomSelect
            label="Select District A"
            value={compareDistrictA}
            onChange={setCompareDistrictA}
            options={marketInsights.district_psf.map((d) => ({
              value: d.district,
              label: d.district
            }))}
          />

          <CustomSelect
            label="Select District B"
            value={compareDistrictB}
            onChange={setCompareDistrictB}
            options={marketInsights.district_psf.map((d) => ({
              value: d.district,
              label: d.district
            }))}
          />
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Card A */}
          <div className="bg-white rounded-luxury p-6 border-2 border-primary shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold">District A</span>
                <h3 className="font-serif text-xl font-bold text-primary">{districtAData.district}</h3>
              </div>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-full">
                {districtAData.growth} YoY
              </span>
            </div>

            <div className="space-y-3 pt-3 border-t border-luxury-border text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Benchmark Price:</span>
                <strong className="text-primary font-serif text-base">{formatPrice(districtAData.psf)} / sqft</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Rental Yield:</span>
                <strong className="text-primary">{districtAData.rental_yield}% per annum</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Typical 3-Bed Capital Outlay:</span>
                <strong className="text-primary">{formatPrice(districtAData.psf * 1400)}</strong>
              </div>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-white rounded-luxury p-6 border-2 border-gold shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold">District B</span>
                <h3 className="font-serif text-xl font-bold text-primary">{districtBData.district}</h3>
              </div>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-full">
                {districtBData.growth} YoY
              </span>
            </div>

            <div className="space-y-3 pt-3 border-t border-luxury-border text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Benchmark Price:</span>
                <strong className="text-primary font-serif text-base">{formatPrice(districtBData.psf)} / sqft</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Rental Yield:</span>
                <strong className="text-primary">{districtBData.rental_yield}% per annum</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Typical 3-Bed Capital Outlay:</span>
                <strong className="text-primary">{formatPrice(districtBData.psf * 1400)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
