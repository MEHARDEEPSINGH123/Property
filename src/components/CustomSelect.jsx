'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  icon: Icon = null,
  label = null,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  dropUp = false,
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options to [{ value, label }]
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        value: opt.value !== undefined ? opt.value : opt.label,
        label: opt.label !== undefined ? opt.label : String(opt.value)
      };
    }
    return { value: opt, label: String(opt) };
  });

  // Find currently selected option
  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value));
  const displayLabel = selectedOption ? selectedOption.label : (placeholder || (normalizedOptions[0] ? normalizedOptions[0].label : ''));

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2.5 bg-surface border rounded-xl text-xs transition-all duration-200 text-left outline-none cursor-pointer ${
          isOpen
            ? 'border-gold ring-1 ring-gold/40 shadow-sm'
            : 'border-luxury-border hover:border-gold'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''} ${buttonClassName}`}
      >
        <div className="flex items-center space-x-2 truncate mr-1.5">
          {Icon && (
            <Icon className="w-4 h-4 text-gold flex-shrink-0" />
          )}
          <span className="truncate font-medium text-primary text-xs">
            {displayLabel}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-gold' : ''
          }`}
        />
      </button>

      {/* Luxury Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 bg-white rounded-xl border border-luxury-border shadow-luxury py-1 overflow-hidden animate-in fade-in duration-150 ${
            dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          } ${menuClassName}`}
          style={{ minWidth: '100%' }}
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {normalizedOptions.length === 0 ? (
              <div className="px-3.5 py-2 text-xs text-slate-400 italic">No options available</div>
            ) : (
              normalizedOptions.map((opt, idx) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <button
                    key={`${opt.value}-${idx}`}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-primary text-gold font-semibold'
                        : 'text-luxury-textPrimary hover:bg-surface hover:text-primary font-medium'
                    }`}
                  >
                    <span className="truncate pr-2">{opt.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
