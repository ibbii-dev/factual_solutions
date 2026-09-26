"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw,
  CheckCircle2, 
  Maximize2, 
  Minimize2,
  MessageCircle,
  MessageSquare,
  History,
  Clock,
  Search,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { contactDetails } from "@/data/companyData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isLeadCard?: boolean;
  leadDetails?: any;
}

interface ChatLogItem {
  _id?: string;
  sessionId?: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string | Date;
  leadCaptured?: boolean;
}

const QUICK_PROMPTS = [
  { label: "Feasibility Study", query: "Can you provide a feasibility study framework for our new venture?" },
  { label: "Scrap & Waste Reduction", query: "How do you help manufacturing plants reduce scrap and material waste?" },
  { label: "Multi-Branch Financials", query: "We need financial modeling and cash-flow forecasting for a multi-branch retail network." },
  { label: "12 Consulting Practices", query: "What are the 12 corporate consulting practices offered by Factual Solutions?" },
  { label: "Book Discovery Session", query: "I want to schedule a confidential strategy session with a Senior Partner." }
];

export default function AiAdvisoryChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "history">("chat");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // History state
  const [historyLogs, setHistoryLogs] = useState<ChatLogItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState("");

  const initialMessage: Message = {
    id: "welcome-jarvis",
    role: "assistant",
    content: "Welcome to **Factual Solutions Corporate Advisory**.\n\nI am **JARVIS**, your strategic AI advisor. I can evaluate business feasibility, outline operational turnaround plans, discuss financial models, or connect you with our Senior Partners.\n\n*How can I assist your enterprise today?*",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Broadcast chat state to other components (e.g. WhatsApp button on mobile)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("jarvis-chat-state", { detail: { isOpen } }));
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [messages, isOpen, activeTab]);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch("/api/admin/chat-logs");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setHistoryLogs(data.data);
      }
    } catch (e) {
      console.error("Failed to load advisory history logs:", e);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...initialMessage,
        id: `welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

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
        content: data.reply || "Thank you for reaching out. A Senior Consultant will be in touch shortly to review your requirements.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isLeadCard: data.leadCaptured,
        leadDetails: data.leadDetails
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content: "Thank you for your interest. You can also reach our advisory team directly at contact@factual-solutions.com or via direct WhatsApp.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadHistoryToChat = (query: string, reply?: string) => {
    setActiveTab("chat");
    if (reply) {
      setMessages((prev) => [
        ...prev,
        {
          id: `user-hist-${Date.now()}`,
          role: "user",
          content: query,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        },
        {
          id: `ai-hist-${Date.now() + 1}`,
          role: "assistant",
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } else {
      handleSendMessage(query);
    }
  };

  // Organize history logs into query and response pairs
  const pairedHistory = useMemo(() => {
    const list: {
      id: string;
      userText: string;
      assistantText: string;
      timestamp: string;
      leadCaptured?: boolean;
    }[] = [];

    // History is returned sorted descending by timestamp
    for (let i = 0; i < historyLogs.length; i++) {
      const item = historyLogs[i];
      if (item.role === "user") {
        const nextItem = historyLogs[i - 1];
        const prevItem = historyLogs[i + 1];
        const assistantMsg =
          nextItem && nextItem.role === "assistant" && nextItem.sessionId === item.sessionId
            ? nextItem.content
            : prevItem && prevItem.role === "assistant" && prevItem.sessionId === item.sessionId
            ? prevItem.content
            : "";

        list.push({
          id: item._id || `log-${i}`,
          userText: item.content,
          assistantText: assistantMsg,
          timestamp: new Date(item.timestamp).toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          leadCaptured: item.leadCaptured
        });
      }
    }

    if (historySearch.trim()) {
      const q = historySearch.toLowerCase();
      return list.filter(
        (p) =>
          p.userText.toLowerCase().includes(q) ||
          p.assistantText.toLowerCase().includes(q)
      );
    }
    return list;
  }, [historyLogs, historySearch]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end print:hidden">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-[#0C1527] via-[#111F38] to-[#172A4C] border border-brand-steel/40 text-white shadow-2xl shadow-black/60 hover:shadow-brand-rust/25 hover:border-brand-rust transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
          aria-label="Open JARVIS AI Corporate Advisory Chat"
        >
          {/* Pulsating Online Beacon */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-rust opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-rust border-2 border-[#0C1527]"></span>
          </span>

          {/* JARVIS Glowing Core Emblem */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-brand-rust/30 to-brand-rust/10 border border-brand-rust/50 flex items-center justify-center text-brand-rust-light group-hover:rotate-12 transition-transform shadow-inner shrink-0">
            <Sparkles className="w-4 h-4 text-brand-rust group-hover:scale-110 transition-transform" />
          </div>

          {/* Clean Brand Typography */}
          <div className="flex items-center gap-1.5 text-left pr-1">
            <div className="flex flex-col">
              <div className="text-xs sm:text-sm font-bold tracking-wider text-slate-100 flex items-center gap-1.5">
                <span>JARVIS</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  AI
                </span>
              </div>
              <span className="hidden md:inline-block text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                Corporate Advisor
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Chatbot Window UI */}
      {isOpen && (
        <div
          className={`flex flex-col bg-[#0B1322]/98 backdrop-blur-2xl border border-slate-700/70 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
            isExpanded
              ? "w-[calc(100vw-1.5rem)] sm:w-[640px] h-[86vh] max-h-[800px]"
              : "w-[calc(100vw-1.5rem)] sm:w-[420px] h-[80vh] max-h-[620px]"
          }`}
        >
          {/* Top Brand Accent Line */}
          <div className="h-1 bg-gradient-to-r from-brand-rust via-brand-steel to-emerald-400 shrink-0" />

          {/* Executive Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#0F1A2E] via-[#122038] to-[#152542] border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-rust/25 to-brand-rust/5 border border-brand-rust/40 flex items-center justify-center overflow-hidden shadow-inner">
                <Image
                  src="/images/logo-symbol.png"
                  alt="Factual Solutions"
                  width={22}
                  height={22}
                  className="object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0F1A2E]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    JARVIS
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-rust/20 text-brand-rust-light border border-brand-rust/30">
                    AI Partner
                  </span>
                </div>
                <div className="text-[10.5px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>12 Advisory Practices Active</span>
                </div>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
                title={isExpanded ? "Restore standard size" : "Expand window"}
                aria-label="Toggle window size"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Header Tab Bar: Chat & History */}
          <div className="px-3.5 py-2 bg-[#091120] border-b border-slate-800/90 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 bg-[#060C17] p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "chat"
                    ? "bg-gradient-to-r from-brand-rust to-[#933423] text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("history");
                  fetchHistory();
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "history"
                    ? "bg-gradient-to-r from-brand-rust to-[#933423] text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History</span>
                {historyLogs.length > 0 && (
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {Math.ceil(historyLogs.length / 2)}
                  </span>
                )}
              </button>
            </div>

            {activeTab === "history" && (
              <button
                type="button"
                onClick={fetchHistory}
                disabled={isLoadingHistory}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors px-2 py-1 rounded-md hover:bg-slate-800/70"
                title="Refresh history from database"
              >
                <RotateCcw className={`w-3 h-3 ${isLoadingHistory ? "animate-spin text-brand-rust" : ""}`} />
                <span>Refresh</span>
              </button>
            )}
          </div>

          {/* VIEW 1: ACTIVE CHAT TAB */}
          {activeTab === "chat" && (
            <>
              {/* Messages Feed */}
              <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs leading-relaxed">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-rust/25 to-brand-rust/10 border border-brand-rust/35 flex items-center justify-center shrink-0 mt-0.5 text-brand-rust-light shadow-inner">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-brand-rust to-[#933423] text-white shadow-lg shadow-brand-rust/20 rounded-tr-sm"
                          : "bg-[#111C2E]/90 text-slate-200 border border-slate-700/60 rounded-tl-sm shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-sans text-xs sm:text-[12.5px] leading-relaxed">
                        {msg.content}
                      </div>

                      {/* High-Impact Lead Captured Certificate Card */}
                      {msg.isLeadCard && msg.leadDetails && (
                        <div className="mt-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-[11px] space-y-1.5 shadow-md">
                          <div className="font-bold flex items-center gap-1.5 text-emerald-200 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Corporate Advisory Lead Logged</span>
                          </div>
                          <div className="text-slate-300">
                            Reference Code: <span className="font-mono text-emerald-300 font-semibold">{msg.leadDetails.id}</span>
                          </div>
                          {msg.leadDetails.email && (
                            <div className="text-slate-300">
                              Assigned to Partner Routing: <span className="text-white font-medium">{msg.leadDetails.email}</span>
                            </div>
                          )}
                          <a
                            href={`https://wa.me/${contactDetails.whatsappRaw || "923241775662"}?text=${encodeURIComponent(`Hello Factual Solutions, I submitted advisory inquiry #${msg.leadDetails.id} via JARVIS.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10.5px] transition-colors shadow"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Fast-Track via Partner WhatsApp</span>
                          </a>
                        </div>
                      )}

                      <div
                        className={`text-[9px] mt-1.5 font-medium ${
                          msg.role === "user" ? "text-white/70 text-right" : "text-slate-500 text-left"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-xl bg-brand-rust/20 border border-brand-rust/35 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-brand-rust animate-pulse" />
                    </div>
                    <div className="bg-[#111C2E]/90 text-slate-300 border border-slate-700/60 rounded-2xl rounded-tl-sm p-3 flex items-center gap-2.5">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rust animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rust animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rust animate-bounce"></span>
                      </div>
                      <span className="text-[11px] text-slate-400">JARVIS is formulating corporate advisory response...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Curated Quick Strategic Prompts */}
              <div className="px-3 py-2 bg-[#0C1525]/90 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {QUICK_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.query)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-brand-rust/20 hover:border-brand-rust/50 text-[10.5px] font-medium text-slate-300 hover:text-white border border-slate-700/60 transition-all shrink-0 hover:scale-102"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Executive Input Dock */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#0D1627] border-t border-slate-800/90 flex flex-col gap-1.5 shrink-0"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask JARVIS about feasibility, audits, operations..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-steel focus:ring-1 focus:ring-brand-steel/40 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] hover:from-[#B84530] hover:to-brand-rust disabled:opacity-35 text-white transition-all shrink-0 shadow-md hover:scale-105 active:scale-95"
                    title="Send message"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[9.5px] text-slate-500 px-1 font-medium">
                  <span>🔒 Enterprise Confidential</span>
                  <span>Factual Solutions Advisory</span>
                </div>
              </form>
            </>
          )}

          {/* VIEW 2: HISTORY TAB */}
          {activeTab === "history" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* History Search & Filter */}
              <div className="p-3 bg-[#0C1525]/90 border-b border-slate-800 flex items-center gap-2 shrink-0">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search past advisory consultations..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#070D18] border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-steel transition-all"
                  />
                </div>
              </div>

              {/* History List */}
              <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs">
                {isLoadingHistory ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-brand-rust/30 border-t-brand-rust animate-spin" />
                    <span className="text-slate-400 text-xs">Loading consultation history from MongoDB Atlas...</span>
                  </div>
                ) : pairedHistory.length === 0 ? (
                  <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 max-w-[280px]">
                      <h4 className="text-sm font-semibold text-slate-200">No Chat History Found</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {historySearch ? "No consultation logs matched your search terms." : "Conversations with JARVIS are securely archived here."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("chat")}
                      className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] text-white text-xs font-semibold shadow hover:scale-102 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Start a Consultation</span>
                    </button>
                  </div>
                ) : (
                  pairedHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#111C2E]/90 border border-slate-700/70 hover:border-brand-steel/50 transition-all space-y-2.5 shadow-sm group"
                    >
                      {/* Query Header */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-2">
                        <span className="flex items-center gap-1 text-slate-300 font-medium">
                          <Clock className="w-3 h-3 text-brand-rust" />
                          <span>{item.timestamp}</span>
                        </span>
                        {item.leadCaptured && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[9.5px] font-semibold">
                            Lead Captured
                          </span>
                        )}
                      </div>

                      {/* User Query */}
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-brand-rust uppercase tracking-wider shrink-0 mt-0.5">
                          Query:
                        </span>
                        <p className="text-slate-100 font-medium text-xs leading-snug">
                          {item.userText}
                        </p>
                      </div>

                      {/* Assistant Response Preview */}
                      {item.assistantText && (
                        <div className="p-2.5 rounded-xl bg-[#0B1322] border border-slate-800/90 text-slate-300 text-[11.5px] leading-relaxed line-clamp-3">
                          {item.assistantText}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleLoadHistoryToChat(item.userText, item.assistantText)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-brand-rust/20 text-slate-300 hover:text-white border border-slate-700 hover:border-brand-rust/40 text-[11px] font-medium transition-all"
                        >
                          <span>Load into Chat</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* History Footer Dock */}
              <div className="p-3 bg-[#0D1627] border-t border-slate-800/90 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-slate-500">Live MongoDB Atlas Archive</span>
                <button
                  type="button"
                  onClick={() => setActiveTab("chat")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] text-white text-xs font-semibold shadow hover:scale-102 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Return to Chat</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
