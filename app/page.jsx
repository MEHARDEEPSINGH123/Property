'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../src/context/AppContext';
import PropertyCard from '../src/components/PropertyCard';
import CustomSelect from '../src/components/CustomSelect';
import { 
  Search, 
  MapPin, 
  Building2, 
  DollarSign, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  BadgePercent, 
  Star, 
  Quote, 
  ArrowRight,
  CheckCircle,
  Calendar,
  Users
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function HomePage() {
  const router = useRouter();
  const { 
    properties, 
    agents, 
    reviews, 
    locations, 
    marketInsights, 
    formatPrice,
    openInquiry 
  } = useApp();

  // Hero Search Form State
  const [listingType, setListingType] = useState('Sale');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Active filter for featured section
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Testimonial slider index
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.append('type', listingType);
    if (selectedLocation) params.append('location', selectedLocation);
    if (selectedType) params.append('propertyType', selectedType);
    if (maxPrice) params.append('maxPrice', maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  // Filtered featured properties
  const featuredProperties = properties.filter((p) => {
    if (!p.featured) return false;
    if (featuredFilter === 'All') return true;
    if (featuredFilter === 'Penthouses') return p.property_type === 'Penthouse';
    if (featuredFilter === 'Condominiums') return p.property_type === 'Condominium';
    if (featuredFilter === 'Landed & GCB') return p.property_type === 'Good Class Bungalow' || p.property_type === 'Waterfront Villa';
    if (featuredFilter === 'Commercial') return p.property_type.includes('Commercial') || p.property_type.includes('Shophouse');
    return true;
  }).slice(0, 6);

  // Top agents for homepage
  const featuredAgents = agents.slice(0, 4);

  // Curated testimonials
  const curatedReviews = reviews.slice(0, 6);

  // Popular locations requested in spec: Marina Bay, Orchard, Sentosa, Jurong East, Tampines, Punggol, plus Tanglin, Bukit Timah
  const popularLocationsNames = ['Marina Bay', 'Orchard', 'Sentosa Cove', 'Tanglin & Nassim', 'Jurong East', 'Tampines', 'Punggol', 'Bukit Timah'];
  const popularLocations = locations.filter(l => popularLocationsNames.includes(l.name));

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* SECTION 1: LUXURY HERO BANNER */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Full-width Luxury Property Image with subtle ambient pulse */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
            alt="Singapore Luxury Sky Penthouse"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle dark gradient overlay to ensure perfect contrast without harsh dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20">
          {/* Small Gold Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-6 shadow-luxury">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Singapore Premier Real Estate Portfolio</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md">
            Find Your Dream Property <br className="hidden sm:inline" />
            in Singapore
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow">
            Explore premium residences, investment opportunities, and luxury developments curated for the world's most discerning individuals.
          </p>

          {/* Luxury Search Bar Container */}
          <div className="bg-white rounded-luxury-lg p-4 sm:p-5 shadow-2xl border border-luxury-border max-w-4xl mx-auto text-left">
            {/* Buy / Rent Toggle */}
            <div className="flex items-center space-x-2 mb-4 border-b border-luxury-borderLight pb-3">
              <button
                type="button"
                onClick={() => setListingType('Sale')}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  listingType === 'Sale'
                    ? 'bg-primary text-gold shadow-sm'
                    : 'text-luxury-textSecondary hover:text-primary hover:bg-slate-100'
                }`}
              >
                Buy Properties
              </button>
              <button
                type="button"
                onClick={() => setListingType('Rent')}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  listingType === 'Rent'
                    ? 'bg-primary text-gold shadow-sm'
                    : 'text-luxury-textSecondary hover:text-primary hover:bg-slate-100'
                }`}
              >
                Rent Residences
              </button>
            </div>

            {/* Inputs & Selectors Form */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
              {/* Location Selector */}
              <CustomSelect
                label="Location / District"
                value={selectedLocation}
                onChange={setSelectedLocation}
                icon={MapPin}
                placeholder="All Prime Enclaves"
                buttonClassName="bg-surface py-2.5"
                options={[
                  { value: '', label: 'All Prime Enclaves' },
                  { value: 'Marina Bay', label: 'Marina Bay (D01)' },
                  { value: 'Tanjong Pagar', label: 'Tanjong Pagar (D02)' },
                  { value: 'Sentosa Cove', label: 'Sentosa Cove (D04)' },
                  { value: 'Orchard', label: 'Orchard (D09)' },
                  { value: 'Tanglin & Nassim', label: 'Tanglin & Nassim (D10)' },
                  { value: 'Bukit Timah', label: 'Bukit Timah (D10)' },
                  { value: 'Jurong East', label: 'Jurong East (D22)' },
                  { value: 'Tampines', label: 'Tampines (D18)' },
                  { value: 'Punggol', label: 'Punggol (D19)' }
                ]}
              />

              {/* Property Type Selector */}
              <CustomSelect
                label="Property Type"
                value={selectedType}
                onChange={setSelectedType}
                icon={Building2}
                placeholder="All Asset Classes"
                buttonClassName="bg-surface py-2.5"
                options={[
                  { value: '', label: 'All Asset Classes' },
                  { value: 'Penthouse', label: 'Super Penthouses' },
                  { value: 'Condominium', label: 'Luxury Condominiums' },
                  { value: 'Good Class Bungalow', label: 'Good Class Bungalows' },
                  { value: 'Waterfront Villa', label: 'Waterfront Villas' },
                  { value: 'Conservation Shophouse', label: 'Conservation Shophouses' },
                  { value: 'Grade A Commercial Office', label: 'Grade A Commercial' }
                ]}
              />

              {/* Max Budget Selector */}
              <CustomSelect
                label="Maximum Budget"
                value={maxPrice}
                onChange={setMaxPrice}
                icon={DollarSign}
                placeholder="Any Budget"
                buttonClassName="bg-surface py-2.5"
                options={[
                  { value: '', label: 'Any Budget' },
                  { value: '3000000', label: 'Under S$ 3,000,000' },
                  { value: '5000000', label: 'Under S$ 5,000,000' },
                  { value: '10000000', label: 'Under S$ 10,000,000' },
                  { value: '25000000', label: 'Under S$ 25,000,000' },
                  { value: '50000000', label: 'Under S$ 50,000,000+' }
                ]}
              />

              {/* Search Submit Button */}
              <div className="pt-4 sm:pt-0 sm:self-end">
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-slate-950 font-bold uppercase tracking-wider text-xs py-3 px-5 rounded-xl shadow-soft hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">
              Curated Selection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-textPrimary">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-luxury-textSecondary mt-1">
              Handpicked trophy residences and commercial investments across Singapore's prime districts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Penthouses', 'Condominiums', 'Landed & GCB', 'Commercial'].map((category) => (
              <button
                key={category}
                onClick={() => setFeaturedFilter(category)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  featuredFilter === category
                    ? 'bg-primary text-gold shadow-sm'
                    : 'bg-surface text-luxury-textSecondary hover:bg-slate-200/70 border border-luxury-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Properties Link */}
        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-primary hover:text-gold px-6 py-3 rounded-xl border border-luxury-border hover:border-gold transition-all bg-white shadow-soft"
          >
            <span>Explore All 100+ Exclusive Listings</span>
            <ChevronRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </section>

      {/* SECTION 3: POPULAR LOCATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">
            Singapore Enclaves
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-textPrimary">
            Popular Locations
          </h2>
          <p className="text-xs sm:text-sm text-luxury-textSecondary mt-2">
            From the futuristic Marina Bay financial hub to the oceanfront estates of Sentosa Cove and high-growth regional centres.
          </p>
        </div>

        {/* Large Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularLocations.map((loc) => {
            const count = properties.filter(p => p.location.includes(loc.name)).length || 5;
            return (
              <Link
                key={loc.name}
                href={`/properties?location=${encodeURIComponent(loc.name)}`}
                className="group relative h-80 rounded-luxury-lg overflow-hidden shadow-soft hover:shadow-luxury-hover transition-all duration-500 block border border-luxury-border"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-primary font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {loc.district}
                  </span>
                </div>

                <div className="absolute bottom-5 inset-x-5 text-white">
                  <div className="text-[11px] text-gold font-medium mb-1">
                    Avg. {formatPrice(loc.avg_psf)} / sqft
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition-colors">
                    {loc.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-300 mt-2 pt-2 border-t border-white/20">
                    <span>{count} Available Listings</span>
                    <span className="text-gold flex items-center group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="bg-surface py-20 border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">
              The AUREA Standard
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-textPrimary">
              Why Discerning Clients Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-luxury-textSecondary mt-2">
              Combining absolute confidentiality with analytical rigor to serve family offices, sovereigns, and international investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Listings",
                desc: "Every residence is directly verified with legal title deed verification, SLA cadastral checks, and complete URA zoning authenticity.",
                stat: "100% Due Diligence"
              },
              {
                icon: Award,
                title: "Trusted Agents",
                desc: "Represented exclusively by top-tier CEA-licensed private wealth partners averaging over 15 years in luxury transactions.",
                stat: "30+ Private Partners"
              },
              {
                icon: Building2,
                title: "Luxury Developments",
                desc: "Direct master partnership with Singapore's blue-chip developers including CapitaLand, CDL, GuocoLand, and SC Global.",
                stat: "15 Master Developers"
              },
              {
                icon: BadgePercent,
                title: "Easy Financing & ABSD",
                desc: "Dedicated mortgage structuring, private banking offshore credit lines, and specialized ABSD tax optimization advisory.",
                stat: "IRAS & MAS Compliant"
              }
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-luxury p-8 border border-luxury-border shadow-soft hover:shadow-luxury hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary text-gold flex items-center justify-center mb-6 shadow-sm">
                    <pillar.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-luxury-textPrimary mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-luxury-textSecondary leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-luxury-borderLight text-xs font-bold text-gold-dark uppercase tracking-wider">
                  {pillar.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED AGENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">
              Private Advisors
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-textPrimary">
              Featured Luxury Agents
            </h2>
            <p className="text-xs sm:text-sm text-luxury-textSecondary mt-1">
              Top licensed realtors representing Singapore's most prestigious commercial and residential transactions.
            </p>
          </div>

          <Link
            href="/agents"
            className="text-xs font-bold text-primary hover:text-gold uppercase tracking-wider flex items-center space-x-1"
          >
            <span>View All 30 Advisors</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-luxury border border-luxury-border overflow-hidden shadow-soft hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-md text-gold text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold/30">
                    ★ {agent.rating} ({agent.review_count} reviews)
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    CEA {agent.cea_number} • {agent.experience_years}y Exp
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary mb-1">
                    {agent.name}
                  </h3>
                  <div className="text-xs text-gold-dark font-medium mb-3">
                    {agent.specialization}
                  </div>
                  <div className="text-[11px] text-luxury-textSecondary">
                    Sales Volume: <span className="font-bold text-primary">S$ {agent.sales_volume_sgd_m}M+</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => openInquiry(null, agent)}
                  className="w-full bg-surface hover:bg-gold hover:text-slate-950 text-primary border border-luxury-border hover:border-gold py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Contact Advisor
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Accolades</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Trusted by Private Clients & Family Offices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Excerpts from over 200 verified acquisitions across Singapore's prime districts.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="bg-slate-800/80 rounded-luxury-lg p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative">
            <Quote className="w-12 h-12 text-gold/30 absolute top-8 right-8" />
            
            <div className="flex items-center space-x-1 mb-6 text-gold">
              {[...Array(curatedReviews[activeReviewIdx].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>

            <p className="font-serif text-xl sm:text-2xl italic text-slate-100 leading-relaxed mb-8">
              "{curatedReviews[activeReviewIdx].comment}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-700/80 pt-6 gap-4">
              <div>
                <h4 className="font-serif text-base font-bold text-white">
                  {curatedReviews[activeReviewIdx].author}
                </h4>
                <div className="text-xs text-slate-400">
                  Acquisition: <span className="text-gold">{curatedReviews[activeReviewIdx].property_title}</span>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center space-x-2">
                {curatedReviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIdx(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeReviewIdx === idx ? 'w-8 bg-gold' : 'w-2 bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: MARKET INSIGHTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">
              Financial Intelligence
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-textPrimary">
              Market Insights & Statistics
            </h2>
            <p className="text-xs sm:text-sm text-luxury-textSecondary mt-1">
              Live snapshot of average pricing, transaction distribution, and district performance.
            </p>
          </div>

          <Link
            href="/market-insights"
            className="text-xs font-bold text-primary hover:text-gold uppercase tracking-wider flex items-center space-x-1"
          >
            <span>Full Market Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Statistics KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">
              Average Property Price
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
              {formatPrice(marketInsights.summary.avg_property_price_sgd)}
            </div>
            <div className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{marketInsights.summary.year_on_year_growth}% YoY Growth</span>
            </div>
          </div>

          <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">
              Active Prime Listings
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
              {marketInsights.summary.total_listings} Properties
            </div>
            <div className="text-xs text-slate-500">
              Across 20 Singapore Districts
            </div>
          </div>

          <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">
              Average Price per Sq Ft
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
              {formatPrice(marketInsights.summary.avg_psf_overall)} psf
            </div>
            <div className="text-xs text-slate-500">
              Core Central Region (CCR)
            </div>
          </div>

          <div className="bg-white rounded-luxury p-6 border border-luxury-border shadow-soft">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">
              Average Rental Yield
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
              {marketInsights.summary.rental_yield_avg}% p.a.
            </div>
            <div className="text-xs text-slate-500">
              Gross Prime Yield
            </div>
          </div>
        </div>

        {/* Mini Preview Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Average PSF by District Chart */}
          <div className="lg:col-span-8 bg-white rounded-luxury p-6 sm:p-8 border border-luxury-border shadow-soft">
            <h3 className="font-serif text-lg font-bold text-primary mb-1">
              Average PSF by Prime District
            </h3>
            <p className="text-xs text-slate-500 mb-6">Comparing prices per square foot across key enclaves</p>
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketInsights.district_psf.slice(0, 6)}>
                  <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    formatter={(val) => [formatPrice(val) + ' / sqft', 'Average PSF']}
                    contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
                  />
                  <Bar dataKey="psf" fill="#0F172A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Type Breakdown Chart */}
          <div className="lg:col-span-4 bg-white rounded-luxury p-6 sm:p-8 border border-luxury-border shadow-soft flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-primary mb-1">
                Asset Allocation
              </h3>
              <p className="text-xs text-slate-500 mb-4">Distribution by property category</p>
              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketInsights.property_distribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {marketInsights.property_distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-luxury-borderLight">
              {marketInsights.property_distribution.slice(0, 4).map((item) => (
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
      </section>

      {/* SECTION 8: CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-luxury-lg p-8 sm:p-16 text-white text-center relative overflow-hidden shadow-2xl border border-gold/30">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.25em] block">
              Private Client Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Book a Private Viewing Today
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Experience the pinnacle of Singapore luxury residences with accompanied private viewings, bespoke financial dossier analysis, and complete discretion.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openInquiry()}
                className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-slate-950 font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-xl shadow-soft hover:shadow-luxury transition-all"
              >
                Schedule Private Viewing
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-xl border border-slate-700 transition-all"
              >
                Contact Private Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
