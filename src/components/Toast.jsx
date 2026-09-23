'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-primary/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-luxury border border-gold/40 flex items-center space-x-3 text-xs sm:text-sm font-medium">
        <Sparkles className="w-4 h-4 text-gold flex-shrink-0 animate-pulse" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
