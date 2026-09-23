'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Check, 
  ExternalLink, 
  Building2, 
  Bed, 
  Bath, 
  Maximize2, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function CompareDrawer() {
  const { 
    properties, 
    comparePropertyIds, 
    toggleCompareProperty, 
    clearCompare, 
    isCompareOpen, 
    setIsCompareOpen,
    formatPrice 
  } = useApp();

  if (!isCompareOpen) return null;

  const comparedList = properties.filter((p) => comparePropertyIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-primary/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-t-luxury-lg sm:rounded-luxury-lg shadow-2xl flex flex-col border border-luxury-border overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-luxury-border flex items-center justify-between bg-surface">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-gold flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                Property Comparison Portfolio
              </h2>
              <p className="text-xs text-luxury-textSecondary">
                Side-by-side architectural and financial specification analysis ({comparedList.length}/4 selected)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {comparedList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-auto p-5 sm:p-8">
          {comparedList.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-surface border border-dashed border-luxury-border flex items-center justify-center mx-auto text-slate-400">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-primary">No Properties in Comparison</h3>
              <p className="text-xs text-luxury-textSecondary max-w-md mx-auto">
                Select the layer icon on any property card or detail page to add up to 4 prime assets for side-by-side evaluation.
              </p>
              <Link
                href="/properties"
                onClick={() => setIsCompareOpen(false)}
                className="inline-flex items-center space-x-2 bg-gold text-slate-950 px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-gold-dark transition-all"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-luxury-border">
                    <th className="p-4 w-40 text-slate-400 font-medium uppercase tracking-wider bg-surface">
                      Metric
                    </th>
                    {comparedList.map((item) => (
                      <th key={item.id} className="p-4 min-w-[220px] align-top">
                        <div className="relative group">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-xl mb-3 shadow-sm"
                          />
                          <button
                            onClick={() => toggleCompareProperty(item.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center shadow-md transition-colors"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="font-serif text-sm font-bold text-primary line-clamp-1 mb-1">
                          {item.title}
                        </h4>
                        <div className="font-serif text-base font-bold text-gold-dark mb-2">
                          {formatPrice(item.price_sgd, item.listing_type === 'Rent')}
                        </div>
                        <Link
                          href={`/property/${item.id}`}
                          onClick={() => setIsCompareOpen(false)}
                          className="inline-flex items-center space-x-1 text-primary hover:text-gold text-[11px] font-semibold"
                        >
                          <span>View dossier</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxury-borderLight">
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">District & Location</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 font-medium text-primary">
                        <span className="font-bold">{item.district}</span> — {item.location}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">Property Type</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 text-primary font-medium">{item.property_type}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">Price PSF</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 font-mono font-medium text-primary">
                        {item.psf > 0 ? `${formatPrice(item.psf)} / sqft` : 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">Bedrooms & Baths</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 text-primary">
                        {item.bedrooms} Beds / {item.bathrooms} Baths
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">Floor Area</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 font-medium text-primary">
                        {item.area_sqft.toLocaleString()} sq ft
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">Nearest MRT</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 text-primary">{item.nearest_mrt}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">Tenure</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 text-primary font-medium">{item.tenure}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface">Master Developer</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 text-primary font-semibold">{item.developer}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-500 bg-surface align-top">Amenities</td>
                    {comparedList.map((item) => (
                      <td key={item.id} className="p-4 align-top">
                        <ul className="space-y-1 text-slate-600">
                          {item.amenities.map((amenity, idx) => (
                            <li key={idx} className="flex items-center space-x-1.5">
                              <Check className="w-3 h-3 text-gold flex-shrink-0" />
                              <span className="text-[11px]">{amenity}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
