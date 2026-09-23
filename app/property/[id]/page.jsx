'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '../../../src/context/AppContext';
import PropertyCard from '../../../src/components/PropertyCard';
import { 
  Heart, 
  Layers, 
  Share2, 
  MapPin, 
  Train, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  MessageSquare, 
  Calculator, 
  Maximize,
  Check,
  Star
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id;

  const { 
    properties, 
    agents, 
    developers, 
    formatPrice, 
    toggleSaveProperty, 
    isSaved, 
    toggleCompareProperty, 
    isCompared,
    openMortgageCalculator,
    openInquiry,
    showToast 
  } = useApp();

  const property = properties.find((p) => p.id === id) || properties[0];
  const agent = agents.find((a) => a.id === property.agent_id) || agents[0];
  const developer = developers.find((d) => d.name === property.developer || d.id === property.developer_id) || developers[0];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Similar properties: same district or same property type
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.district === property.district || p.property_type === property.property_type))
    .slice(0, 3);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'];

  const saved = isSaved(property.id);
  const compared = isCompared(property.id);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Listing dossier link copied to clipboard');
    }
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in">
          <div className="flex justify-between items-center text-white">
            <span className="text-xs uppercase tracking-widest text-gold font-mono">
              Photo {activePhotoIdx + 1} of {images.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="text-white hover:text-gold text-sm uppercase tracking-wider font-semibold py-1 px-3 border border-white/20 rounded-lg hover:border-gold transition-colors"
            >
              Close ✕
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={images[activePhotoIdx] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'}
              alt={property.title}
              className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80';
              }}
            />
            <button
              onClick={() => setActivePhotoIdx((p) => (p === 0 ? images.length - 1 : p - 1))}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActivePhotoIdx((p) => (p === images.length - 1 ? 0 : p + 1))}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails strip */}
          <div className="flex justify-center space-x-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setActivePhotoIdx(idx)}
                className={`w-16 h-12 object-cover rounded-lg cursor-pointer transition-all ${
                  activePhotoIdx === idx ? 'border-2 border-gold scale-105' : 'opacity-50 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* TOP HERO GALLERY MOSAIC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back Link & Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/properties"
            className="text-xs uppercase tracking-wider font-semibold text-slate-500 hover:text-primary flex items-center space-x-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Listings</span>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-luxury-border hover:border-gold text-luxury-textSecondary hover:text-primary transition-colors bg-white shadow-soft"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleCompareProperty(property.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                compared 
                  ? 'bg-primary text-gold border-primary' 
                  : 'bg-white text-luxury-textSecondary border-luxury-border hover:border-gold'
              }`}
              title="Compare Property"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                saved 
                  ? 'bg-white text-rose-500 border-rose-200 shadow-sm' 
                  : 'bg-white text-luxury-textSecondary border-luxury-border hover:border-rose-300'
              }`}
              title="Save to Portfolio"
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Gallery Grid (1 Large Hero + 4 Mosaic Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[450px] sm:h-[540px] rounded-luxury-lg overflow-hidden shadow-luxury">
          {/* Main Large Photo */}
          <div 
            onClick={() => { setActivePhotoIdx(0); setIsLightboxOpen(true); }}
            className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden bg-slate-900"
          >
            <img
              src={images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
              }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-primary/95 text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-gold/40 shadow-sm flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Prime {property.district}</span>
              </span>
              <span className="bg-white/90 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                For {property.listing_type}
              </span>
            </div>
          </div>

          {/* Mosaic 4 Photos */}
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => { setActivePhotoIdx(idx + 1); setIsLightboxOpen(true); }}
              className="relative group cursor-pointer overflow-hidden bg-slate-900 hidden md:block"
            >
              <img
                src={img || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              {idx === 3 && (
                <div className="absolute inset-0 bg-primary/70 backdrop-blur-xs flex items-center justify-center text-white">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold">
                    <Maximize className="w-4 h-4" />
                    <span>View All {images.length} Photos</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PROPERTY DETAILS CONTENT & ASIDE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header Titles & Pricing Strip */}
            <div className="border-b border-luxury-border pb-8">
              <div className="flex items-center space-x-2 text-xs text-luxury-textSecondary uppercase tracking-wider mb-2 font-medium">
                <span className="text-gold-dark font-bold">{property.district}</span>
                <span>•</span>
                <span>{property.location}</span>
                <span>•</span>
                <span>{property.property_type}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-textPrimary tracking-tight mb-4">
                {property.title}
              </h1>

              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                    {formatPrice(property.price_sgd, property.listing_type === 'Rent')}
                  </div>
                  {property.psf > 0 && property.listing_type === 'Sale' && (
                    <div className="text-xs text-slate-500 font-medium mt-1">
                      {formatPrice(property.psf)} per sq ft • {property.tenure}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Train className="w-4 h-4 text-gold" />
                  <span>Nearest Transit: <strong className="text-primary">{property.nearest_mrt}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Specs Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-luxury bg-surface border border-luxury-border">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Bedrooms</div>
                <div className="font-serif text-xl font-bold text-primary flex items-center space-x-1.5">
                  <Bed className="w-5 h-5 text-gold" />
                  <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Commercial'}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Bathrooms</div>
                <div className="font-serif text-xl font-bold text-primary flex items-center space-x-1.5">
                  <Bath className="w-5 h-5 text-gold" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Floor Area</div>
                <div className="font-serif text-xl font-bold text-primary flex items-center space-x-1.5">
                  <Maximize2 className="w-5 h-5 text-gold" />
                  <span>{property.area_sqft.toLocaleString()} sqft</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Elevation</div>
                <div className="font-serif text-sm font-bold text-primary mt-1 line-clamp-1">
                  {property.floor_level}
                </div>
              </div>
            </div>

            {/* Editorial Overview & Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-primary">
                Property Overview
              </h2>
              <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed font-light">
                {property.description}
              </p>
              <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed font-light">
                Designed to harmonize sophisticated residential grandeur with private comfort, this residence boasts floor-to-ceiling double-glazed thermal glass curtains capturing unhindered horizon panoramas. The master suite commands bespoke Italian cabinetry, private ensuite with freestanding marble soaking tub, and custom integrated climate control.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-6 pt-4 border-t border-luxury-border">
              <h2 className="font-serif text-2xl font-bold text-primary">
                Curated Amenities & Lifestyle
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-luxury-border shadow-soft"
                  >
                    <div className="w-8 h-8 rounded-lg bg-surface border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                      <Check className="w-4 h-4 text-gold-dark" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-luxury-textPrimary">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Specifications Table */}
            <div className="space-y-6 pt-4 border-t border-luxury-border">
              <h2 className="font-serif text-2xl font-bold text-primary">
                Architectural Specifications
              </h2>
              <div className="overflow-hidden rounded-luxury border border-luxury-border text-xs sm:text-sm">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-luxury-borderLight">
                    <tr className="bg-surface">
                      <td className="p-4 font-semibold text-slate-500 w-1/3">Property Reference ID</td>
                      <td className="p-4 font-mono font-bold text-primary">{property.id}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Legal Land Tenure</td>
                      <td className="p-4 text-primary font-medium">{property.tenure}</td>
                    </tr>
                    <tr className="bg-surface">
                      <td className="p-4 font-semibold text-slate-500">Year Built / TOP</td>
                      <td className="p-4 text-primary">{property.year_built}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Furnishing Condition</td>
                      <td className="p-4 text-primary">{property.furnishing}</td>
                    </tr>
                    <tr className="bg-surface">
                      <td className="p-4 font-semibold text-slate-500">District & Zone</td>
                      <td className="p-4 text-primary">{property.district} — Core Central Region (CCR)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Master Developer</td>
                      <td className="p-4 text-primary font-semibold">{property.developer}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Developer Spotlight */}
            <div className="p-6 sm:p-8 rounded-luxury-lg bg-surface border border-luxury-border space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-gold flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary">
                    Developed by {developer.name}
                  </h3>
                  <p className="text-xs text-slate-400">Founded {developer.founded} • Headquarters {developer.headquarters}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                {developer.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="font-semibold text-slate-500">Other Landmark Developments:</span>
                {developer.iconic_projects?.map((proj, pIdx) => (
                  <span key={pIdx} className="bg-white border border-luxury-border px-2.5 py-1 rounded-md text-primary font-medium">
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Embedded Mortgage & Stamp Duty Banner */}
            <div className="p-6 sm:p-8 rounded-luxury bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury">
              <div className="space-y-1">
                <div className="text-gold text-xs font-semibold uppercase tracking-widest">
                  Financial Structuring
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Estimate Mortgage & Singapore Stamp Duty
                </h3>
                <p className="text-xs text-slate-400 max-w-lg">
                  Calculate monthly installments, Buyer's Stamp Duty (BSD), and Additional Buyer's Stamp Duty (ABSD) for this {formatPrice(property.price_sgd)} asset.
                </p>
              </div>
              <button
                onClick={() => openMortgageCalculator(property)}
                className="bg-gold hover:bg-gold-dark text-slate-950 font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-soft transition-all flex items-center space-x-2 flex-shrink-0"
              >
                <Calculator className="w-4 h-4" />
                <span>Open Calculator</span>
              </button>
            </div>
          </div>

          {/* Sticky Aside Column: Assigned Agent Card & Viewing Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-white rounded-luxury-lg border border-luxury-border shadow-luxury p-6 sm:p-8 space-y-6">
              {/* Agent Profile Header */}
              <div className="flex items-center space-x-4 pb-6 border-b border-luxury-border">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gold/40 shadow-sm"
                />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Exclusive Listing Advisor
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary">
                    {agent.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-gold">
                    <Star className="w-3.5 h-3.5 fill-gold" />
                    <span className="font-semibold text-primary">{agent.rating}</span>
                    <span className="text-slate-400">({agent.review_count} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Agent Credentials */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">CEA License:</span>
                  <span className="font-mono font-semibold text-primary">{agent.cea_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-semibold text-primary">{agent.experience_years} Years Luxury Advisory</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Specialization:</span>
                  <span className="font-semibold text-primary text-right">{agent.specialization}</span>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-center space-x-1.5 py-3 rounded-xl border border-luxury-border hover:border-primary text-primary text-xs font-semibold bg-surface transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Direct Call</span>
                </a>
                <a
                  href={`https://wa.me/6580001234?text=Inquiry%20regarding%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Schedule Viewing CTA Button */}
              <button
                onClick={() => openInquiry(property, agent)}
                className="w-full bg-gold hover:bg-gold-dark text-slate-950 font-bold uppercase tracking-wider text-xs py-4 rounded-xl shadow-soft hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Request Private Viewing</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Strict Non-Disclosure & Privileged Advisory</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIMILAR PROPERTIES CAROUSEL / GRID */}
      {similarProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-luxury-border">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-1">
                Portfolio Synergy
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                Similar Prime Residences
              </h2>
            </div>
            <Link
              href="/properties"
              className="text-xs font-semibold text-primary hover:text-gold uppercase tracking-wider flex items-center space-x-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
