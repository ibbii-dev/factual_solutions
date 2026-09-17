"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Layers, 
  LogOut, 
  Plus, 
  User, 
  ChevronDown,
  RefreshCw,
  Building2,
  Calendar
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { DatabaseInquiry } from "@/lib/mongodb";

export default function ClientPortalPage() {
  const router = useRouter();
  const { user, logout, openAuthModal, isLoading } = useUserAuth();

  const [inquiries, setInquiries] = useState<DatabaseInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  const fetchUserInquiries = async () => {
    if (!user?.email) return;
    setLoadingInquiries(true);
    try {
      const res = await fetch(`/api/inquiries?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setInquiries(data.data);
        if (data.data.length > 0 && !expandedInquiryId) {
          setExpandedInquiryId(data.data[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load user inquiries:", err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserInquiries();
    } else {
      setLoadingInquiries(false);
    }
  }, [user]);

  const handleSendFollowUp = async (inquiryId: string) => {
    if (!replyMessage.trim()) return;
    setIsSendingReply(true);

    try {
      const res = await fetch(`/api/inquiries/${inquiryId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "client",
          authorName: user?.name || "Client",
          message: replyMessage.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackSent(inquiryId);
        setReplyMessage("");
        await fetchUserInquiries();
        setTimeout(() => setFeedbackSent(null), 4000);
      }
    } catch (e) {
      console.error("Follow up send error:", e);
    } finally {
      setIsSendingReply(false);
    }
  };

  // If not authenticated, show welcoming portal sign in screen
  if (!isLoading && !user) {
    return (
      <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white pt-36 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-[#111C2E] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#A33C29]/10 text-[#A33C29] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A33C29]">
              SECURE CLIENT ENVIRONMENT
            </span>
            <h1 className="text-2xl font-bold font-display text-[#152238] dark:text-white">
              Enterprise Client Portal
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Please sign in with Google or your corporate email to check responses to your inquiries, monitor review milestones, and receive advisory updates.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal("login")}
              className="w-full py-3.5 px-5 rounded-full bg-[#152238] hover:bg-[#1E3150] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <User className="w-4 h-4" />
              <span>Sign In to Access Portal</span>
            </button>

            <button
              onClick={() => openAuthModal("login")}
              className="w-full py-3 px-5 rounded-full bg-white dark:bg-[#15233A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Quick Sign In with Google</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link href="/contact" className="text-xs text-[#A33C29] font-semibold hover:underline">
              Submit a new advisory inquiry →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white pt-32 sm:pt-36 pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Portal Header & Client Identity */}
        <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#152238] text-white flex items-center justify-center font-bold text-lg shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.name} fill className="object-cover" />
              ) : (
                <span>{user?.name?.charAt(0) || "C"}</span>
              )}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-[#152238] dark:text-white">
                  {user?.name}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email} &bull; Connected via {user?.provider === "google" ? "Google Authentication" : "Corporate Email"}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:self-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Advisory Request</span>
            </Link>

            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#111C2E] p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Inquiries</span>
            <div className="text-2xl font-extrabold text-[#152238] dark:text-white">{inquiries.length}</div>
            <p className="text-[11px] text-slate-500">Registered under this corporate account</p>
          </div>

          <div className="bg-white dark:bg-[#111C2E] p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Active Consultations</span>
            <div className="text-2xl font-extrabold text-[#A33C29]">
              {inquiries.filter((i) => i.status !== "Closed").length}
            </div>
            <p className="text-[11px] text-slate-500">Under evaluation or ongoing review</p>
          </div>

          <div className="bg-white dark:bg-[#111C2E] p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Consultant Responses</span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {inquiries.reduce((acc, i) => acc + (i.replies?.length || 0), 0)}
            </div>
            <p className="text-[11px] text-slate-500">Official briefs received from advisors</p>
          </div>
        </div>

        {/* Inquiries & Advisory Requests Management Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-display text-[#152238] dark:text-white">
                My Enquiries &amp; Advisory Tracking
              </h2>
              <p className="text-xs text-slate-500">
                Live statuses, preliminary AI diagnostics, and official updates from our senior consulting partners.
              </p>
            </div>

            <button
              onClick={fetchUserInquiries}
              disabled={loadingInquiries}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loadingInquiries ? (
            <div className="bg-white dark:bg-[#111C2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-12 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-[#A33C29] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Retrieving your consultation records...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-10 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#152238] dark:text-white">
                  No consultation inquiries found for {user?.email}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You haven&apos;t submitted any consultation requests with this email yet. Submit your first business planning or financial advisory request to track live progress here.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A33C29] text-white text-xs font-bold hover:bg-[#8E3221] transition-colors"
              >
                <span>Submit Initial Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => {
                const isExpanded = expandedInquiryId === inq.id;
                const statusColors = {
                  New: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
                  Contacted: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
                  "In Progress": "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
                  Closed: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/20",
                };

                return (
                  <div
                    key={inq.id}
                    className="bg-white dark:bg-[#111C2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-all duration-200"
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => setExpandedInquiryId(isExpanded ? null : inq.id)}
                      className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs font-bold text-[#152238] dark:text-white font-mono">
                            {inq.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[inq.status] || statusColors.New}`}>
                            {inq.status}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            &bull; {inq.date}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[#152238] dark:text-white">
                          {inq.serviceOfInterest}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                          {inq.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {inq.replies?.length || 0} Advisor Update{(inq.replies?.length || 0) === 1 ? '' : 's'}
                        </span>
                        <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-6">
                        
                        {/* 1. Status Progress Tracker */}
                        <div className="bg-slate-50 dark:bg-slate-900/80 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] uppercase font-bold text-slate-400 mb-3 block">
                            Milestone Tracking
                          </span>
                          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                            <div className="space-y-1">
                              <div className="h-1.5 rounded-full bg-[#152238] dark:bg-white" />
                              <span className="text-[#152238] dark:text-white">1. Submitted</span>
                            </div>
                            <div className="space-y-1">
                              <div className={`h-1.5 rounded-full ${inq.status !== 'New' ? 'bg-[#152238] dark:bg-white' : 'bg-slate-200 dark:bg-slate-700'}`} />
                              <span className={inq.status !== 'New' ? 'text-[#152238] dark:text-white' : 'text-slate-400'}>2. Under Review</span>
                            </div>
                            <div className="space-y-1">
                              <div className={`h-1.5 rounded-full ${inq.status === 'In Progress' || inq.status === 'Closed' ? 'bg-[#152238] dark:bg-white' : 'bg-slate-200 dark:bg-slate-700'}`} />
                              <span className={inq.status === 'In Progress' || inq.status === 'Closed' ? 'text-[#152238] dark:text-white' : 'text-slate-400'}>3. Advisor Assigned</span>
                            </div>
                            <div className="space-y-1">
                              <div className={`h-1.5 rounded-full ${inq.status === 'Closed' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                              <span className={inq.status === 'Closed' ? 'text-emerald-600' : 'text-slate-400'}>4. Deliverables Ready</span>
                            </div>
                          </div>
                        </div>

                        {/* 2. Original Request Scope */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Original Submission Scope
                          </h4>
                          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {inq.message}
                          </div>
                        </div>

                        {/* 3. AI Preliminary Diagnostic Assessment (if generated) */}
                        {inq.aiAssessment && (
                          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#8EA9D3]/10 to-[#A33C29]/5 border border-[#8EA9D3]/20 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#152238] dark:text-white">
                              <Bot className="w-4 h-4 text-[#A33C29]" />
                              <span>AI Preliminary Diagnostic Assessment</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {inq.aiAssessment.executiveSummary || inq.aiAssessment.recommendedConsultingPath}
                            </p>
                            {inq.aiAssessment.keyStrategicFocus && inq.aiAssessment.keyStrategicFocus.length > 0 && (
                              <div className="space-y-1 pt-1">
                                <div className="text-[10px] font-bold text-slate-400 uppercase">Recommended Call Milestones:</div>
                                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                                  {inq.aiAssessment.keyStrategicFocus.map((pt: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A33C29] shrink-0 mt-0.5" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 4. Official Consultant Responses & Updates */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#152238] dark:text-white flex items-center gap-2">
                            <MessageSquare className="w-3.5 h-3.5 text-[#A33C29]" />
                            <span>Consultant Responses &amp; Progress Updates</span>
                          </h4>

                          {inq.replies && inq.replies.length > 0 ? (
                            <div className="space-y-3">
                              {inq.replies.map((reply: any, rIdx: number) => (
                                <div
                                  key={rIdx}
                                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                                    reply.sender === 'client'
                                      ? 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 ml-6'
                                      : 'bg-white dark:bg-[#15233A] border-slate-200/90 dark:border-slate-700 shadow-xs mr-6'
                                  }`}
                                >
                                  <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span className={reply.sender === 'client' ? 'text-slate-600 dark:text-slate-300' : 'text-[#A33C29]'}>
                                      {reply.sender === 'client' ? 'You' : (reply.authorName || 'Lead Consultant - Factual Solutions')}
                                    </span>
                                    <span className="text-slate-400">{reply.date}</span>
                                  </div>
                                  <p className="text-slate-700 dark:text-slate-200">{reply.message}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 italic">
                              Our advisory board is reviewing your inquiry. An assigned consultant will post your initial feedback and scheduling details here shortly.
                            </div>
                          )}
                        </div>

                        {/* 5. Follow-Up Message Input */}
                        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                            Ask a follow-up or provide additional project requirements:
                          </label>

                          {feedbackSent === inq.id && (
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Your follow-up note has been transmitted to your assigned advisor.</span>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type your question or clarification here..."
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29]"
                            />
                            <button
                              onClick={() => handleSendFollowUp(inq.id)}
                              disabled={isSendingReply || !replyMessage.trim()}
                              className="px-5 py-2.5 rounded-xl bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 disabled:opacity-50"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{isSendingReply ? 'Sending...' : 'Send'}</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
