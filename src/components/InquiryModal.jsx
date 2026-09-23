'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CustomSelect from './CustomSelect';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function InquiryModal() {
  const { 
    isInquiryOpen, 
    setIsInquiryOpen, 
    inquiryProperty, 
    inquiryAgent,
    agents,
    formatPrice,
    showToast 
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-01');
  const [timeSlot, setTimeSlot] = useState('Sunset Private Viewing (5:00 PM)');
  const [clientType, setClientType] = useState('Private Principal / Buyer');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isInquiryOpen) return null;

  // Determine which agent handles this
  const activeAgent = inquiryAgent || (
    inquiryProperty 
      ? agents.find(a => a.id === inquiryProperty.agent_id) 
      : agents[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Viewing request submitted. Your Private Advisor will confirm via WhatsApp.');
  };

  const handleClose = () => {
    setSubmitted(false);
    setIsInquiryOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/70 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-luxury-lg shadow-2xl border border-luxury-border overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-surface border-b border-luxury-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-gold flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                Book a Private Viewing
              </h2>
              <p className="text-xs text-luxury-textSecondary">
                Confidential accompanied tour with our licensed private wealth advisor
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-primary rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">
              Private Viewing Requested
            </h3>
            <p className="text-sm text-luxury-textSecondary max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-primary">{fullName}</span>. Your request has been dispatched directly to <span className="font-semibold text-primary">{activeAgent?.name}</span>. You will receive an encrypted itinerary and building clearance code.
            </p>
            <div className="p-4 rounded-xl bg-surface border border-luxury-border max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Property:</span>
                <span className="font-semibold text-primary">{inquiryProperty?.title || 'Private Portfolio Consultation'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-semibold text-primary">{preferredDate} — {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Advisor:</span>
                <span className="font-semibold text-primary">{activeAgent?.name} (CEA: {activeAgent?.cea_number})</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="bg-primary text-gold font-semibold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-900 transition-colors"
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Property / Consultation summary banner */}
            {inquiryProperty && (
              <div className="p-3.5 rounded-xl bg-surface border border-luxury-border flex items-center space-x-3.5">
                <img
                  src={inquiryProperty.images[0]}
                  alt={inquiryProperty.title}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    {inquiryProperty.district} • {inquiryProperty.location}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-primary truncate">
                    {inquiryProperty.title}
                  </h4>
                  <div className="text-xs font-bold text-gold-dark">
                    {formatPrice(inquiryProperty.price_sgd, inquiryProperty.listing_type === 'Rent')}
                  </div>
                </div>
              </div>
            )}

            {/* Advisor profile bar */}
            {activeAgent && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary text-white text-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src={activeAgent.photo}
                    alt={activeAgent.name}
                    className="w-10 h-10 rounded-full object-cover border border-gold/40"
                  />
                  <div>
                    <span className="font-semibold text-gold block">{activeAgent.name}</span>
                    <span className="text-[10px] text-slate-300">{activeAgent.role} • CEA {activeAgent.cea_number}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-300 block">Direct Line</span>
                  <span className="font-mono text-xs text-white">{activeAgent.phone}</span>
                </div>
              </div>
            )}

            {/* Client Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Lord James Montgomery"
                  className="w-full bg-surface border border-luxury-border rounded-xl px-3.5 py-2.5 text-xs text-primary outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Private Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. j.montgomery@familyoffice.com"
                  className="w-full bg-surface border border-luxury-border rounded-xl px-3.5 py-2.5 text-xs text-primary outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+65 8000 1234"
                  className="w-full bg-surface border border-luxury-border rounded-xl px-3.5 py-2.5 text-xs text-primary outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-surface border border-luxury-border rounded-xl px-3.5 py-2 text-xs text-primary outline-none focus:border-gold"
                />
              </div>

              <CustomSelect
                label="Time Slot"
                value={timeSlot}
                onChange={setTimeSlot}
                buttonClassName="py-2"
                options={[
                  'Morning Viewing (10:00 AM)',
                  'Afternoon Viewing (2:00 PM)',
                  'Sunset Private Viewing (5:00 PM)',
                  'Twilight VIP Viewing (7:00 PM)'
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                Specific Inquiries or Non-Disclosure Requirements
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Indicate any special requests, financial confidentiality guidelines, or specific areas of interest..."
                className="w-full bg-surface border border-luxury-border rounded-xl p-3 text-xs text-primary outline-none focus:border-gold"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Encrypted & Protected by AUREA Client Privilege</span>
              </div>
              <button
                type="submit"
                className="bg-gold hover:bg-gold-dark text-slate-950 font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-soft hover:shadow-luxury transition-all"
              >
                Confirm Viewing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
