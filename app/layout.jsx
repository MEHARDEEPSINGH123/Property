import React from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { AppProvider } from '../src/context/AppContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import CompareDrawer from '../src/components/CompareDrawer';
import MortgageCalculatorModal from '../src/components/MortgageCalculatorModal';
import AiAssistantModal from '../src/components/AiAssistantModal';
import InquiryModal from '../src/components/InquiryModal';
import Toast from '../src/components/Toast';
import Chatbot from '../src/components/Chatbot';
import '../src/index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'AUREA | Prime Singapore Real Estate & Private Residences',
  description: 'Explore ultra-luxury penthouses, Good Class Bungalows, and prime commercial assets in Singapore. Curated by AUREA Private Office.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%230F172A'/><path d='M50 20 L78 68 L68 68 L60 52 L40 52 L32 68 L22 68 Z M50 34 L43 47 L57 47 Z' fill='%23D4AF37'/></svg>"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-luxury-textPrimary font-sans antialiased selection:bg-gold-subtle selection:text-gold-dark min-h-screen flex flex-col">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Modals & Drawers */}
          <CompareDrawer />
          <MortgageCalculatorModal />
          <AiAssistantModal />
          <InquiryModal />
          <Toast />
          <Chatbot />
        </AppProvider>
      </body>
    </html>
  );
}
