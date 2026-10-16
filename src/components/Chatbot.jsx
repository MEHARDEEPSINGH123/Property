'use client';

import Script from "next/script";

export default function Chatbot() {
  return (
    <Script
      src="https://dagsis.ai/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.DagsisChat) {
          if (!document.getElementById('dagsis-chat-button')) {
            window.DagsisChat.init({
              agentId: "6145a5ca-4d1a-489a-af23-9ab3cf7df1b1",
              apiKey: "21f9e3d6-98f1-4cea-819e-54efc323e887"
            });
          }
        }
      }}
    />
  );
}
