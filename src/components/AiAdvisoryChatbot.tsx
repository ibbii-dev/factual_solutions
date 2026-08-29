"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronDown, 
  CheckCircle2, 
  PhoneCall, 
  Building, 
  Maximize2, 
  Minimize2, 
  HelpCircle,
  MessageSquareQuote
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isLeadCard?: boolean;
  leadDetails?: any;
}

const QUICK_PROMPTS = [
  "💡 Assess my new business idea",
  "🏭 How to reduce factory scrap/waste?",
  "📊 Multi-branch retail financial modeling",
  "📋 View all 12 consulting practices",
  "📞 Book Senior Partner discovery call"
];

export default function AiAdvisoryChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Welcome to **Factual Solutions Corporate Advisory**.\n\nI am your 24/7 AI Strategic Consultant. How can I assist your business planning, market feasibility, or operational transformation today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Thank you for reaching out. A Senior Consultant will be in touch shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isLeadCard: data.leadCaptured,
        leadDetails: data.captureDetails
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content: "Thank you for your interest. You can also reach our advisory team directly at contact@factualsolutions.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans print:hidden">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#10192A] hover:bg-[#16233B] text-white border border-brand-rust/50 shadow-2xl shadow-brand-rust/20 transition-all duration-300 hover:scale-105 hover:border-brand-rust"
          aria-label="Open AI Corporate Advisor"
        >
          {/* Pulsating Ping */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#10192A]"></span>
          </span>

          <div className="w-8 h-8 rounded-full bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center text-brand-rust-light group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 text-brand-rust" />
          </div>

          <div className="text-left">
            <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>AI Corporate Advisor</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">24/7</span>
            </div>
            <div className="text-[10px] text-slate-400">Ask strategic questions & get instant advice</div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col bg-[#0C1424]/95 backdrop-blur-xl border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
            isExpanded
              ? "w-[92vw] sm:w-[580px] h-[82vh] max-h-[780px]"
              : "w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh]"
          }`}
        >
          {/* Executive Header */}
          <div className="p-4 bg-gradient-to-r from-[#101B2E] to-[#14233D] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-2xl bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo-symbol.png"
                  alt="Factual Solutions"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#101B2E]"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Factual Solutions AI
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-rust/20 text-brand-rust-light border border-brand-rust/30">
                    Partner Advisor
                  </span>
                </h3>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • 12 Consulting Practices Loaded
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                title={isExpanded ? "Restore standard size" : "Expand window"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-brand-rust/20 border border-brand-rust/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-brand-rust" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand-rust text-white shadow-md rounded-br-none"
                      : "bg-[#142034] text-slate-200 border border-slate-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* If lead card was generated */}
                  {msg.isLeadCard && msg.leadDetails && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Executive Consultation Request Logged
                      </div>
                      <div>Reference: <span className="font-mono text-white font-semibold">{msg.leadDetails.id}</span></div>
                      <div>Direct Partner routing to: <span className="text-white">{msg.leadDetails.email}</span></div>
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1.5 ${
                      msg.role === "user" ? "text-white/70 text-right" : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xl bg-brand-rust/20 border border-brand-rust/30 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-brand-rust animate-pulse" />
                </div>
                <div className="bg-[#142034] text-slate-400 border border-slate-800 rounded-2xl rounded-bl-none p-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-rust animate-ping"></span>
                  <span>Synthesizing strategic advisory analysis...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#0E1728]/90 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt.replace(/^[^a-zA-Z0-9]+/, ""))}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-brand-rust/20 hover:border-brand-rust/40 text-[10.5px] font-medium text-slate-300 hover:text-white border border-slate-700/60 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#10192A] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about feasibility, factory audits, services, or leave your email..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#09101C] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light disabled:opacity-40 text-white transition-colors shrink-0 shadow-md"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
