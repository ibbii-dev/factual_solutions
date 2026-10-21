"use client";

import React, { useState, useEffect } from "react";
import { contactDetails } from "@/data/companyData";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleChatState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (customEvent.detail) {
        setIsChatOpen(customEvent.detail.isOpen);
      }
    };

    window.addEventListener("jarvis-chat-state", handleChatState);
    return () => window.removeEventListener("jarvis-chat-state", handleChatState);
  }, []);

  // Clean phone number for WhatsApp wa.me link
  const rawPhone = contactDetails.whatsappRaw || contactDetails.phone.replace(/[^0-9]/g, "");
  const defaultMessage = language === "ar" 
    ? "مرحباً فاكتشوال سوليوشنز، أود الاستفسار عن خدمات الاستشارات وتخطيط الأعمال."
    : "Hello Factual Solutions, I would like to inquire about your business consulting services.";

  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div 
      className={`fixed bottom-4 right-4 rtl:right-auto rtl:left-4 sm:bottom-6 sm:right-6 sm:rtl:left-6 z-40 print:hidden transition-all duration-300 ${
        isChatOpen ? "max-sm:opacity-0 max-sm:pointer-events-none max-sm:scale-90" : "opacity-100 scale-100"
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1f7a4d] hover:bg-[#186640] text-white transition-colors shadow-lg"
        aria-label={language === "ar" ? "تواصل معنا عبر واتساب" : "Chat with Factual Solutions on WhatsApp"}
        title="WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.517l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.201 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.175-1.431-.075-.125-.276-.201-.577-.351zM12.042 21.996h-.008a9.93 9.93 0 0 1-5.068-1.391l-.364-.216-3.766.988 1.005-3.67-.237-.378a9.92 9.92 0 0 1-1.523-5.275c0-5.485 4.464-9.95 9.955-9.95 2.657 0 5.155 1.036 7.032 2.915a9.88 9.88 0 0 1 2.913 7.034c0 5.487-4.465 9.953-9.957 9.953z" />
        </svg>
      </a>
    </div>
  );
}
