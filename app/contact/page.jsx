'use client';

import React, { useState } from 'react';
import { useApp } from '../../src/context/AppContext';
import CustomSelect from '../../src/components/CustomSelect';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Send,
  MessageSquare,
  Navigation
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Acquisition & Buyer Representation',
    budgetRange: 'S$ 10,000,000 - S$ 25,000,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been encrypted and routed to the Managing Partner.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Singapore Flagship Office</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-textPrimary tracking-tight">
          Private Client Offices & Enquiries
        </h1>
        <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
          Contact our Singapore advisory desk for private consultations, accompanied viewings, and bespoke market intelligence dossiers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Office Information Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-primary text-white rounded-luxury-lg p-8 sm:p-10 space-y-6 shadow-luxury border border-slate-800">
            <div>
              <span className="text-gold text-xs font-semibold uppercase tracking-widest block mb-1">
                Headquarters
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Marina Bay Financial Centre
              </h3>
              <p className="text-xs text-slate-400 mt-1">Level 38, Tower 2, 10 Marina Boulevard, Singapore 018983</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Downtown & Marina Bay MRT directly accessible via underground passage</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Direct Switchboard: +65 6789 2800</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <MessageSquare className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Concierge WhatsApp: +65 8920 1888</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>privateoffice@aurea-estates.com</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-300">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Advisory Desk: Monday – Friday 09:00 - 18:30 SGT</span>
                  <span className="text-slate-400 text-[11px]">Private accompanied viewings arranged 7 days a week by appointment</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>CEA Licence: L3008920K • Strictly Privileged</span>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="bg-surface rounded-luxury-lg overflow-hidden border border-luxury-border shadow-soft p-2">
            <div className="relative h-64 rounded-xl overflow-hidden bg-slate-900">
              <iframe
                title="AUREA Singapore Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819921477759!2d103.85223067579697!3d1.2818169987060375!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x31da19098df4ab19%3A0xe54b9d5a6a684b66!2sMarina%20Bay%20Financial%20Centre%20Tower%202!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
              ></iframe>
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-luxury-border text-xs flex items-center space-x-2">
                <Navigation className="w-3.5 h-3.5 text-gold-dark" />
                <span className="font-semibold text-primary">MBFC Tower 2, Level 38</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white rounded-luxury-lg border border-luxury-border p-8 sm:p-10 shadow-soft">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary">
                Inquiry Successfully Logged
              </h3>
              <p className="text-xs sm:text-sm text-luxury-textSecondary max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-primary">{form.name}</strong>. Your correspondence has been directed to the Private Office Partner desk. A confidential reply will follow within 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-primary text-gold font-semibold text-xs px-6 py-2.5 rounded-xl hover:bg-slate-900 transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-gold-dark text-xs font-semibold uppercase tracking-widest block mb-1">
                  Confidential Form
                </span>
                <h2 className="font-serif text-2xl font-bold text-primary">
                  Connect with a Senior Partner
                </h2>
                <p className="text-xs text-luxury-textSecondary mt-1">
                  All communications are governed by Singapore legal confidentiality and strict client non-disclosure standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    Your Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Alistair Montgomery"
                    className="w-full bg-surface border border-luxury-border rounded-xl px-4 py-3 text-xs text-primary outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    Private Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. montgomery@capital.com"
                    className="w-full bg-surface border border-luxury-border rounded-xl px-4 py-3 text-xs text-primary outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    Direct Contact / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+65 8123 4567"
                    className="w-full bg-surface border border-luxury-border rounded-xl px-4 py-3 text-xs text-primary outline-none focus:border-gold"
                  />
                </div>

                <CustomSelect
                  label="Nature of Inquiry"
                  value={form.inquiryType}
                  onChange={(val) => setForm({ ...form, inquiryType: val })}
                  options={[
                    'Acquisition & Buyer Representation',
                    'Trophy Asset Divestment',
                    'Family Office Real Estate Structuring',
                    'Commercial Shophouse & Grade A Advisory',
                    'Press & Media Relations'
                  ]}
                />
              </div>

              <CustomSelect
                label="Anticipated Capital Allocation / Budget"
                value={form.budgetRange}
                onChange={(val) => setForm({ ...form, budgetRange: val })}
                options={[
                  'S$ 3,000,000 - S$ 10,000,000',
                  'S$ 10,000,000 - S$ 25,000,000',
                  'S$ 25,000,000 - S$ 50,000,000',
                  'S$ 50,000,000+ (Trophy Estate / Commercial)'
                ]}
              />

              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Detailed Brief & Non-Disclosure Requirements
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Outline your acquisition criteria, preferred enclaves (e.g. Nassim, Marina Bay, Sentosa), tax considerations, or private viewing dates..."
                  className="w-full bg-surface border border-luxury-border rounded-xl p-4 text-xs text-primary outline-none focus:border-gold"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>256-Bit SSL Encrypted Communication</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-slate-950 font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-xl shadow-soft hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                  <span>Submit Confidential Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
