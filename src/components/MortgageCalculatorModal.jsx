'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import CustomSelect from './CustomSelect';
import { 
  X, 
  Calculator, 
  HelpCircle, 
  PieChart, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function MortgageCalculatorModal() {
  const { 
    isMortgageOpen, 
    setIsMortgageOpen, 
    mortgageProperty, 
    formatPrice,
    currency 
  } = useApp();

  const [propertyPrice, setPropertyPrice] = useState(18500000);
  const [downpaymentPercent, setDownpaymentPercent] = useState(25);
  const [loanTenureYears, setLoanTenureYears] = useState(25);
  const [interestRatePercent, setInterestRatePercent] = useState(3.2);

  // Singapore Residency Profile for ABSD
  const [buyerType, setBuyerType] = useState('citizen'); // 'citizen' | 'pr' | 'foreigner' | 'entity'
  const [propertyCount, setPropertyCount] = useState(1); // 1, 2, 3+

  useEffect(() => {
    if (mortgageProperty && mortgageProperty.price_sgd) {
      setPropertyPrice(mortgageProperty.price_sgd);
    }
  }, [mortgageProperty]);

  if (!isMortgageOpen) return null;

  // Calculations
  const loanAmount = propertyPrice * (1 - downpaymentPercent / 100);
  const monthlyRate = (interestRatePercent / 100) / 12;
  const totalMonths = loanTenureYears * 12;

  const monthlyPayment = monthlyRate > 0 
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    : Math.round(loanAmount / totalMonths);

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  // Singapore Buyer's Stamp Duty (BSD) Calculation
  const calculateBSD = (price) => {
    let bsd = 0;
    if (price <= 180000) {
      bsd += price * 0.01;
    } else {
      bsd += 180000 * 0.01;
      if (price <= 360000) {
        bsd += (price - 180000) * 0.02;
      } else {
        bsd += 180000 * 0.02;
        if (price <= 1000000) {
          bsd += (price - 360000) * 0.03;
        } else {
          bsd += 640000 * 0.03;
          if (price <= 1500000) {
            bsd += (price - 1000000) * 0.04;
          } else {
            bsd += 500000 * 0.04;
            if (price <= 3000000) {
              bsd += (price - 1500000) * 0.05;
            } else {
              bsd += 1500000 * 0.05;
              bsd += (price - 3000000) * 0.06;
            }
          }
        }
      }
    }
    return Math.round(bsd);
  };

  // Additional Buyer's Stamp Duty (ABSD)
  const getAbsdRate = () => {
    if (buyerType === 'citizen') {
      if (propertyCount === 1) return 0.0;
      if (propertyCount === 2) return 0.20;
      return 0.30;
    }
    if (buyerType === 'pr') {
      if (propertyCount === 1) return 0.05;
      if (propertyCount === 2) return 0.30;
      return 0.35;
    }
    if (buyerType === 'foreigner') {
      return 0.60;
    }
    if (buyerType === 'entity') {
      return 0.65;
    }
    return 0;
  };

  const bsdAmount = calculateBSD(propertyPrice);
  const absdRate = getAbsdRate();
  const absdAmount = Math.round(propertyPrice * absdRate);
  const totalDuties = bsdAmount + absdAmount;
  const initialCashNeeded = Math.round(propertyPrice * (downpaymentPercent / 100)) + totalDuties;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/70 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-luxury-lg shadow-2xl border border-luxury-border overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-surface border-b border-luxury-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-gold flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                Singapore Luxury Mortgage & Stamp Duty Calculator
              </h2>
              <p className="text-xs text-luxury-textSecondary">
                Official BSD tiers, 2026 ABSD regulatory schedule, and bank financing projections
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMortgageOpen(false)}
            className="p-2 text-slate-400 hover:text-primary rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Property Price Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-luxury-textPrimary uppercase tracking-wider">
                  Property Value (SGD)
                </label>
                <span className="font-serif text-sm font-bold text-primary">
                  {formatPrice(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="500000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>S$ 1M</span>
                <span>S$ 50M</span>
                <span>S$ 100M+</span>
              </div>
            </div>

            {/* Downpayment & Loan Tenure */}
            <div className="grid grid-cols-2 gap-4">
              <CustomSelect
                label={`Downpayment: ${downpaymentPercent}%`}
                value={downpaymentPercent}
                onChange={(val) => setDownpaymentPercent(Number(val))}
                options={[
                  { value: 25, label: '25% (Standard MAS LTV 75%)' },
                  { value: 30, label: '30% Downpayment' },
                  { value: 40, label: '40% Downpayment' },
                  { value: 50, label: '50% Downpayment' },
                  { value: 100, label: '100% Full Cash Purchase' }
                ]}
              />

              <CustomSelect
                label={`Tenure: ${loanTenureYears} Years`}
                value={loanTenureYears}
                onChange={(val) => setLoanTenureYears(Number(val))}
                options={[
                  { value: 15, label: '15 Years' },
                  { value: 20, label: '20 Years' },
                  { value: 25, label: '25 Years' },
                  { value: 30, label: '30 Years' }
                ]}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-luxury-textPrimary uppercase tracking-wider">
                  Annual Interest Rate
                </label>
                <span className="text-xs font-bold text-primary font-mono">{interestRatePercent}% p.a.</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="6.0"
                step="0.1"
                value={interestRatePercent}
                onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
            </div>

            {/* Buyer Residency Category for ABSD */}
            <div className="p-4 rounded-xl bg-surface border border-luxury-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Buyer Residency Status</span>
                <span className="text-[10px] text-gold-dark font-semibold">IRAS Schedule</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'citizen', label: 'Singapore Citizen' },
                  { id: 'pr', label: 'Permanent Resident' },
                  { id: 'foreigner', label: 'Foreign National' },
                  { id: 'entity', label: 'Entity / Trust' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBuyerType(item.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left transition-all ${
                      buyerType === item.id
                        ? 'bg-primary text-gold font-bold shadow-sm'
                        : 'bg-white text-luxury-textSecondary hover:bg-slate-100 border border-luxury-border'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {(buyerType === 'citizen' || buyerType === 'pr') && (
                <div className="pt-2">
                  <span className="block text-[11px] font-medium text-slate-500 mb-1.5">
                    Total Properties Owned in Singapore
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPropertyCount(num)}
                        className={`py-1.5 text-xs rounded-lg transition-all ${
                          propertyCount === num
                            ? 'bg-gold text-slate-950 font-bold'
                            : 'bg-white text-slate-600 border border-luxury-border'
                        }`}
                      >
                        {num === 3 ? '3 or more' : `${num}${num === 1 ? 'st' : 'nd'} Property`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-luxury p-6 flex flex-col justify-between shadow-luxury">
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-1">
                Estimated Monthly Outlay
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-gold mb-1">
                {downpaymentPercent === 100 ? 'S$ 0 (Full Cash)' : formatPrice(monthlyPayment)}
                {downpaymentPercent < 100 && <span className="text-sm text-slate-400 font-sans font-normal"> / mo</span>}
              </div>
              <p className="text-[11px] text-slate-400 mb-6">
                Based on {loanTenureYears}y loan tenure at {interestRatePercent}% interest.
              </p>

              {/* Financial Breakdown Table */}
              <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Loan Principal:</span>
                  <span className="font-mono font-medium">{formatPrice(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Downpayment ({downpaymentPercent}%):</span>
                  <span className="font-mono font-medium">{formatPrice(propertyPrice * (downpaymentPercent / 100))}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Buyer's Stamp Duty (BSD):</span>
                  <span className="font-mono text-emerald-400 font-medium">{formatPrice(bsdAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>
                    Additional Buyer's Stamp Duty (ABSD {(absdRate * 100).toFixed(0)}%):
                  </span>
                  <span className="font-mono text-rose-400 font-medium">{formatPrice(absdAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Cumulative Interest:</span>
                  <span className="font-mono text-slate-400 font-medium">{formatPrice(totalInterest)}</span>
                </div>
              </div>
            </div>

            {/* Total Upfront Cash / CPF Box */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Total Upfront Cash / CPF Required
                </span>
                <span className="font-serif text-xl font-bold text-white">
                  {formatPrice(initialCashNeeded)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Includes statutory BSD + ABSD duties payable within 14 days of Option Exercise. AUREA Private Office can coordinate pre-approved international private bank facility financing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
