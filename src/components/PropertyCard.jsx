'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Layers, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Train, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function PropertyCard({ property, layout = 'grid' }) {
  const { 
    formatPrice, 
    toggleSaveProperty, 
    isSaved, 
    toggleCompareProperty, 
    isCompared 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const saved = isSaved(property.id);
  const compared = isCompared(property.id);

  if (layout === 'list') {
    return (
      <div className="group bg-white rounded-luxury border border-luxury-border hover:border-gold/60 shadow-soft hover:shadow-luxury-hover transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={images[activeImageIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
            }}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {property.featured && (
              <span className="bg-primary text-gold text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold/40 shadow-sm flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Featured</span>
              </span>
            )}
            <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {property.listing_type}
            </span>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCompareProperty(property.id);
              }}
              title={compared ? 'Remove from compare' : 'Add to compare'}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                compared 
                  ? 'bg-primary text-gold shadow-md' 
                  : 'bg-white/80 text-luxury-textSecondary hover:text-primary hover:bg-white'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSaveProperty(property.id);
              }}
              title={saved ? 'Remove from saved' : 'Save property'}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                saved 
                  ? 'bg-white text-rose-500 shadow-md' 
                  : 'bg-white/80 text-luxury-textSecondary hover:text-rose-500 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Image carousel arrows */}
          {images.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePrevImage}
                className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md transition-transform active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md transition-transform active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-luxury-textSecondary mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-primary uppercase tracking-wider">{property.district}</span>
                <span>•</span>
                <span>{property.location}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500">{property.property_type}</span>
            </div>

            <Link href={`/property/${property.id}`} className="block group/title">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-textPrimary group-hover/title:text-gold transition-colors line-clamp-1 mb-2">
                {property.title}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-luxury-textSecondary line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>

            <div className="flex items-center text-xs text-slate-500 mb-6 space-x-4">
              <div className="flex items-center space-x-1.5">
                <Train className="w-3.5 h-3.5 text-gold" />
                <span>{property.nearest_mrt}</span>
              </div>
              <span>•</span>
              <span className="text-slate-500">{property.tenure}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-luxury-borderLight flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-5 text-xs text-luxury-textSecondary font-medium">
              <div className="flex items-center space-x-1.5" title="Bedrooms">
                <Bed className="w-4 h-4 text-slate-400" />
                <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Commercial'}</span>
              </div>
              <div className="flex items-center space-x-1.5" title="Bathrooms">
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center space-x-1.5" title="Floor Area">
                <Maximize2 className="w-4 h-4 text-slate-400" />
                <span>{property.area_sqft.toLocaleString()} sqft</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg sm:text-xl font-bold font-serif text-primary">
                  {formatPrice(property.price_sgd, property.listing_type === 'Rent')}
                </div>
                {property.psf > 0 && property.listing_type === 'Sale' && (
                  <div className="text-[11px] text-slate-400 font-medium">
                    {formatPrice(property.psf)} / sqft
                  </div>
                )}
              </div>

              <Link
                href={`/property/${property.id}`}
                className="inline-flex items-center space-x-1.5 bg-primary hover:bg-gold hover:text-slate-950 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Layout
  return (
    <div className="group bg-white rounded-luxury border border-luxury-border hover:border-gold/60 shadow-soft hover:shadow-luxury-hover transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={images[activeImageIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
          }}
        />

        {/* Gradient overlay on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {property.featured && (
            <span className="bg-primary/95 text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold/40 shadow-sm flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Featured</span>
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {property.district}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3.5 right-3.5 flex space-x-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompareProperty(property.id);
            }}
            title={compared ? 'Remove from compare' : 'Add to compare'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              compared 
                ? 'bg-primary text-gold shadow-md' 
                : 'bg-white/80 text-luxury-textSecondary hover:text-primary hover:bg-white shadow-sm'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaveProperty(property.id);
            }}
            title={saved ? 'Remove from saved' : 'Save property'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              saved 
                ? 'bg-white text-rose-500 shadow-md' 
                : 'bg-white/80 text-luxury-textSecondary hover:text-rose-500 hover:bg-white shadow-sm'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Image carousel arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md transition-transform active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md transition-transform active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Property Type & Location overlay */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
          <span className="font-medium text-slate-200 tracking-wide drop-shadow-md">
            {property.property_type}
          </span>
          <span className="text-[10px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md font-mono text-slate-300">
            {activeImageIndex + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & MRT */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <div className="flex items-center space-x-1 text-slate-600 truncate max-w-[65%]">
              <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-500 truncate text-[11px]">
              <Train className="w-3 h-3 text-slate-400" />
              <span className="truncate">{property.nearest_mrt.replace(' MRT', '')}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/property/${property.id}`} className="block group/title">
            <h3 className="font-serif text-lg font-bold text-luxury-textPrimary group-hover/title:text-gold transition-colors line-clamp-1 mb-2">
              {property.title}
            </h3>
          </Link>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-luxury-borderLight text-xs text-luxury-textSecondary">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Bedrooms</span>
              <span className="font-semibold text-primary">
                {property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Studio/Off'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Baths</span>
              <span className="font-semibold text-primary">{property.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Area</span>
              <span className="font-semibold text-primary">{property.area_sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>

        {/* Price & View CTA */}
        <div className="pt-3 flex items-center justify-between">
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-primary">
              {formatPrice(property.price_sgd, property.listing_type === 'Rent')}
            </div>
            {property.psf > 0 && property.listing_type === 'Sale' && (
              <div className="text-[10px] text-slate-400 font-medium">
                {formatPrice(property.psf)} psf
              </div>
            )}
          </div>

          <Link
            href={`/property/${property.id}`}
            className="inline-flex items-center space-x-1 bg-surface hover:bg-gold hover:text-slate-950 text-primary font-semibold text-xs px-3.5 py-2 rounded-xl border border-luxury-border hover:border-gold transition-all"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
