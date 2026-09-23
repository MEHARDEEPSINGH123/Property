'use client';

import React, { useState } from 'react';
import { useApp } from '../../src/context/AppContext';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Download, 
  Check, 
  FileText, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function NewProjectsPage() {
  const { newProjects, formatPrice, openInquiry, showToast } = useApp();
  const [downloadModalProject, setDownloadModalProject] = useState(null);

  const handleDownloadBrochure = (projectName) => {
    showToast(`VIP Architectural Dossier for ${projectName} is downloading.`);
    setDownloadModalProject(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Prime Developer Launches</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-textPrimary tracking-tight">
          New Architectural Developments
        </h1>
        <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
          Exclusive master-planned launches by CapitaLand, CDL, GuocoLand, and Shun Tak. Early VIP phase pricing and direct developer allocations.
        </p>
      </div>

      {/* Projects Showcase List */}
      <div className="space-y-12">
        {newProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-luxury-lg border border-luxury-border shadow-soft hover:shadow-luxury transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden bg-slate-100">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-primary text-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold/40 shadow-sm">
                  {project.district}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  TOP {project.completion_year}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center space-x-1.5 text-primary font-semibold">
                    <Building2 className="w-4 h-4 text-gold" />
                    <span>{project.developer}</span>
                  </div>
                  <span>Architect: <strong>{project.architect}</strong></span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-textPrimary">
                  {project.name}
                </h2>

                <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                  {project.description}
                </p>

                {/* Project Specs Table */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-surface border border-luxury-border text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tenure</span>
                    <strong className="text-primary">{project.tenure}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Units</span>
                    <strong className="text-primary">{project.units} Residences</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starting Price</span>
                    <strong className="text-gold-dark font-serif text-sm font-bold">
                      Fr. {formatPrice(project.starting_price)}
                    </strong>
                  </div>
                </div>

                {/* Features Checklist */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                    Key Architectural Highlights
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-luxury-borderLight flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setDownloadModalProject(project)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs font-semibold text-primary hover:text-gold py-2.5 px-4 rounded-xl border border-luxury-border hover:border-gold transition-colors"
                >
                  <Download className="w-4 h-4 text-gold" />
                  <span>Download E-Brochure & Floorplans</span>
                </button>

                <button
                  onClick={() => openInquiry(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-dark text-slate-950 text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl shadow-soft hover:shadow-luxury transition-all"
                >
                  <span>VIP Launch Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Brochure Confirmation Modal */}
      {downloadModalProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-luxury max-w-md w-full p-6 space-y-4 shadow-2xl border border-luxury-border">
            <div className="w-12 h-12 rounded-xl bg-primary text-gold flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-center text-primary">
              Download {downloadModalProject.name} Dossier
            </h3>
            <p className="text-xs text-center text-slate-500">
              The full architectural catalog including unit mix, floorplates, developer specifications, and private pricing schedule will be downloaded immediately.
            </p>
            <div className="pt-2 flex space-x-3">
              <button
                onClick={() => setDownloadModalProject(null)}
                className="flex-1 py-2.5 rounded-xl border border-luxury-border text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDownloadBrochure(downloadModalProject.name)}
                className="flex-1 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-slate-950 text-xs font-bold uppercase tracking-wider"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
