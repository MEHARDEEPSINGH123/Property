'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '../../src/context/AppContext';
import PropertyCard from '../../src/components/PropertyCard';
import CustomSelect from '../../src/components/CustomSelect';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw
} from 'lucide-react';

function ListingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { properties, savedPropertyIds } = useApp();

  // URL Query Params state initializers
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [listingType, setListingType] = useState(searchParams.get('type') || 'All');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedPropertyType, setSelectedPropertyType] = useState(searchParams.get('propertyType') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('beds') || 'All');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSavedOnly, setShowSavedOnly] = useState(searchParams.get('filter') === 'saved');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const itemsPerPage = 9;

  useEffect(() => {
    if (searchParams.get('filter') === 'saved') {
      setShowSavedOnly(true);
    }
  }, [searchParams]);

  // Unique lists for dropdowns
  const uniqueLocations = useMemo(() => {
    const set = new Set(properties.map((p) => p.location));
    return Array.from(set).sort();
  }, [properties]);

  const uniquePropertyTypes = useMemo(() => {
    const set = new Set(properties.map((p) => p.property_type));
    return Array.from(set).sort();
  }, [properties]);

  // Filtering & Sorting
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (showSavedOnly) {
      result = result.filter((p) => savedPropertyIds.includes(p.id));
    }

    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      result = result.filter((p) => 
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.nearest_mrt.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q)
      );
    }

    if (listingType !== 'All') {
      result = result.filter((p) => p.listing_type === listingType);
    }

    if (selectedLocation) {
      result = result.filter((p) => p.location === selectedLocation);
    }

    if (selectedPropertyType) {
      result = result.filter((p) => p.property_type === selectedPropertyType);
    }

    if (bedrooms !== 'All') {
      if (bedrooms === '5+') {
        result = result.filter((p) => p.bedrooms >= 5);
      } else {
        result = result.filter((p) => p.bedrooms === parseInt(bedrooms, 10));
      }
    }

    if (minPrice) {
      result = result.filter((p) => p.price_sgd >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price_sgd <= Number(maxPrice));
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price_sgd - b.price_sgd);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price_sgd - a.price_sgd);
    } else if (sortBy === 'area_desc') {
      result.sort((a, b) => b.area_sqft - a.area_sqft);
    } else if (sortBy === 'psf_asc') {
      result.sort((a, b) => (a.psf || 0) - (b.psf || 0));
    } else if (sortBy === 'psf_desc') {
      result.sort((a, b) => (b.psf || 0) - (a.psf || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.year_built - a.year_built);
    }

    return result;
  }, [
    properties,
    showSavedOnly,
    savedPropertyIds,
    keyword,
    listingType,
    selectedLocation,
    selectedPropertyType,
    bedrooms,
    minPrice,
    maxPrice,
    sortBy
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setKeyword('');
    setListingType('All');
    setSelectedLocation('');
    setSelectedPropertyType('');
    setBedrooms('All');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
    setShowSavedOnly(false);
    setCurrentPage(1);
    router.push('/properties');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-luxury-border pb-8 gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-2">
            Singapore Luxury Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-textPrimary">
            {showSavedOnly ? 'Saved Portfolio Residences' : 'Prime Real Estate Listings'}
          </h1>
          <p className="text-xs sm:text-sm text-luxury-textSecondary mt-1">
            Displaying {filteredProperties.length} verified trophy residences and commercial opportunities.
          </p>
        </div>

        {/* View Layout Controls & Filter Toggle */}
        <div className="flex items-center space-x-3">
          {showSavedOnly && (
            <button
              onClick={() => setShowSavedOnly(false)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center space-x-1"
            >
              <span>View All Properties</span>
            </button>
          )}

          <div className="flex items-center bg-surface border border-luxury-border rounded-xl p-1">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'grid' ? 'bg-primary text-gold shadow-sm' : 'text-slate-400 hover:text-primary'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'list' ? 'bg-primary text-gold shadow-sm' : 'text-slate-400 hover:text-primary'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="md:hidden flex items-center space-x-2 bg-primary text-gold px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface rounded-luxury-lg p-5 sm:p-6 border border-luxury-border shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by building, MRT, developer..."
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-luxury-border focus:border-gold rounded-xl text-xs text-primary outline-none transition-colors"
            />
          </div>

          {/* Buy / Rent */}
          <CustomSelect
            value={listingType}
            onChange={(val) => {
              setListingType(val);
              setCurrentPage(1);
            }}
            options={[
              { value: 'All', label: 'Buy & Rent' },
              { value: 'Sale', label: 'For Sale' },
              { value: 'Rent', label: 'For Rent' }
            ]}
          />

          {/* Location */}
          <CustomSelect
            value={selectedLocation}
            onChange={(val) => {
              setSelectedLocation(val);
              setCurrentPage(1);
            }}
            placeholder="All Locations"
            options={[
              { value: '', label: 'All Locations' },
              ...uniqueLocations.map((loc) => ({ value: loc, label: loc }))
            ]}
          />

          {/* Property Type */}
          <CustomSelect
            value={selectedPropertyType}
            onChange={(val) => {
              setSelectedPropertyType(val);
              setCurrentPage(1);
            }}
            placeholder="All Property Types"
            options={[
              { value: '', label: 'All Property Types' },
              ...uniquePropertyTypes.map((type) => ({ value: type, label: type }))
            ]}
          />

          {/* Bedrooms */}
          <CustomSelect
            value={bedrooms}
            onChange={(val) => {
              setBedrooms(val);
              setCurrentPage(1);
            }}
            options={[
              { value: 'All', label: 'Any Bedrooms' },
              { value: '1', label: '1 Bedroom' },
              { value: '2', label: '2 Bedrooms' },
              { value: '3', label: '3 Bedrooms' },
              { value: '4', label: '4 Bedrooms' },
              { value: '5+', label: '5+ Bedrooms' }
            ]}
          />
        </div>

        {/* Bottom Filter Row: Price Range, Sorting & Reset */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-3 border-t border-luxury-borderLight gap-3 text-xs">
          <div className="flex items-center space-x-2 w-full lg:w-auto">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Price:</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Min SGD"
              className="w-28 py-1.5 px-2.5 bg-white border border-luxury-border rounded-lg text-xs outline-none focus:border-gold"
            />
            <span className="text-slate-400">-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Max SGD"
              className="w-28 py-1.5 px-2.5 bg-white border border-luxury-border rounded-lg text-xs outline-none focus:border-gold"
            />
          </div>

          <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Sort:</span>
              <CustomSelect
                value={sortBy}
                onChange={setSortBy}
                buttonClassName="py-1.5 px-3 min-w-[170px]"
                menuClassName="right-0 left-auto min-w-[190px]"
                options={[
                  { value: 'newest', label: 'Sort by Newest' },
                  { value: 'price_asc', label: 'Price: Low to High' },
                  { value: 'price_desc', label: 'Price: High to Low' },
                  { value: 'psf_desc', label: 'PSF: High to Low' },
                  { value: 'area_desc', label: 'Floor Area: Largest' }
                ]}
              />
            </div>

            <button
              onClick={handleResetFilters}
              className="text-slate-500 hover:text-primary flex items-center space-x-1 py-1.5 px-2.5 rounded-lg hover:bg-slate-200/50 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Property Results List */}
      {paginatedProperties.length === 0 ? (
        <div className="text-center py-24 bg-surface rounded-luxury-lg border border-dashed border-luxury-border space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white border border-luxury-border flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary">No Matching Properties Found</h3>
          <p className="text-xs text-luxury-textSecondary max-w-md mx-auto">
            Try adjusting your search criteria or resetting filters to explore other luxury residences in our Singapore portfolio.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-gold text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-xs hover:bg-gold-dark transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              : 'space-y-6'
          }
        >
          {paginatedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} layout={layout} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8 border-t border-luxury-border">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 200, behavior: 'smooth' });
            }}
            className="p-2.5 rounded-xl border border-luxury-border hover:border-gold disabled:opacity-40 disabled:hover:border-luxury-border text-primary transition-colors bg-white shadow-soft"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-primary text-gold shadow-sm'
                    : 'bg-white text-luxury-textSecondary hover:bg-surface border border-luxury-border'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 200, behavior: 'smooth' });
            }}
            className="p-2.5 rounded-xl border border-luxury-border hover:border-gold disabled:opacity-40 disabled:hover:border-luxury-border text-primary transition-colors bg-white shadow-soft"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-slate-400">Loading listings...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
