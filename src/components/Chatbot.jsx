'use client';

import React from 'react';
import Script from 'next/script';

export default function Chatbot() {
  return (
    <Script
      src="https://dagsis.jsuite.in/widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          if (typeof window !== 'undefined' && window.DagsisChat) {
            window.DagsisChat.init({
              agentId: "e6177c88-a70b-4059-baa3-381d70d1c432",
              apiKey: "a3faad11-aa05-4dee-99c7-f15c66be3c5b"
            });
          }
        } catch (error) {
          console.error("DagsisChat initialization error:", error);
        }
      }}
    />
  );
}
