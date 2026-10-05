'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import dataset from '../data/dataset.json';

const AppContext = createContext();

const CURRENCY_RATES = {
  SGD: { symbol: 'S$', rate: 1.0, label: 'Singapore Dollar' },
  USD: { symbol: '$', rate: 0.75, label: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.69, label: 'Euro' },
  GBP: { symbol: '£', rate: 0.59, label: 'British Pound' }
};

export function AppProvider({ children }) {
  // Currency
  const [currency, setCurrency] = useState('SGD');

  // Favorites / Saved Properties
  const [savedPropertyIds, setSavedPropertyIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aurea_saved_properties');
      return saved ? JSON.parse(saved) : ['PR001', 'PR007', 'PR013'];
    } catch {
      return ['PR001', 'PR007', 'PR013'];
    }
  });

  // Comparison (max 4 properties)
  const [comparePropertyIds, setComparePropertyIds] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Modals
  const [isMortgageOpen, setIsMortgageOpen] = useState(false);
  const [mortgageProperty, setMortgageProperty] = useState(null);

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryProperty, setInquiryProperty] = useState(null);
  const [inquiryAgent, setInquiryAgent] = useState(null);

  const openChatbot = () => {
    if (typeof window !== 'undefined') {
      if (window.DagsisChat) {
        if (typeof window.DagsisChat.open === 'function') {
          window.DagsisChat.open();
          return;
        }
        if (typeof window.DagsisChat.toggle === 'function') {
          window.DagsisChat.toggle();
          return;
        }
        if (typeof window.DagsisChat.show === 'function') {
          window.DagsisChat.show();
          return;
        }
      }
      const el = document.querySelector(
        '#dagsis-launcher, .dagsis-launcher, .dagsis-widget-button, #dagsis-chat-button, [class*="dagsis"], [id*="dagsis"]'
      );
      if (el && typeof el.click === 'function') {
        el.click();
      }
    }
  };

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('aurea_saved_properties', JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPropertyIds]);

  const toggleSaveProperty = (id) => {
    setSavedPropertyIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Property removed from saved collection');
        return prev.filter((pId) => pId !== id);
      } else {
        showToast('Property saved to private portfolio');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id) => savedPropertyIds.includes(id);

  const toggleCompareProperty = (id) => {
    setComparePropertyIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from comparison');
        return prev.filter((pId) => pId !== id);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 properties can be compared simultaneously');
        return prev;
      }
      showToast('Added to comparison drawer');
      return [...prev, id];
    });
  };

  const isCompared = (id) => comparePropertyIds.includes(id);

  const clearCompare = () => {
    setComparePropertyIds([]);
    setIsCompareOpen(false);
    showToast('Comparison cleared');
  };

  const formatPrice = (priceSgd, isRent = false) => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.SGD;
    const converted = Math.round(priceSgd * rateInfo.rate);

    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(converted);

    if (isRent) {
      return `${rateInfo.symbol}${formatted} / mo`;
    }
    return `${rateInfo.symbol}${formatted}`;
  };

  const openMortgageCalculator = (property = null) => {
    setMortgageProperty(property);
    setIsMortgageOpen(true);
  };

  const openInquiry = (property = null, agent = null) => {
    setInquiryProperty(property);
    setInquiryAgent(agent);
    setIsInquiryOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        dataset,
        properties: dataset.properties,
        agents: dataset.agents,
        developers: dataset.developers,
        reviews: dataset.reviews,
        locations: dataset.locations,
        newProjects: dataset.new_projects,
        marketInsights: dataset.market_insights,
        
        currency,
        setCurrency,
        currencyRates: CURRENCY_RATES,
        formatPrice,

        savedPropertyIds,
        toggleSaveProperty,
        isSaved,

        comparePropertyIds,
        toggleCompareProperty,
        isCompared,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,

        isMortgageOpen,
        setIsMortgageOpen,
        mortgageProperty,
        openMortgageCalculator,

        isInquiryOpen,
        setIsInquiryOpen,
        inquiryProperty,
        inquiryAgent,
        openInquiry,

        isAiAssistantOpen: false,
        setIsAiAssistantOpen: openChatbot,
        openChatbot,

        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
