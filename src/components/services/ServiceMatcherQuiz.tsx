"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Compass, Briefcase } from "lucide-react";
import { allServices, ServiceItem } from "@/data/servicesData";

export default function ServiceMatcherQuiz() {
  const [step, setStep] = useState(1);
  const [challengeType, setChallengeType] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [recommendedService, setRecommendedService] = useState<ServiceItem | null>(null);

  const handleSelectChallenge = (type: string) => {
    setChallengeType(type);
    setStep(2);
  };

  const handleSelectUrgency = (timeframe: string) => {
    setUrgency(timeframe);
    // Determine recommendation
    let match: ServiceItem;
    if (challengeType === "modernize") {
      match = allServices.find((s) => s.id === "digital-transformation") || allServices[0];
    } else if (challengeType === "expansion") {
      match = allServices.find((s) => s.id === "market-expansion") || allServices[1];
    } else if (challengeType === "governance") {
      match = allServices.find((s) => s.id === "strategic-advisory") || allServices[5];
    } else if (challengeType === "ai") {
      match = allServices.find((s) => s.id === "ai-data-consulting") || allServices[6];
    } else {
      match = allServices.find((s) => s.id === "operational-streamlining") || allServices[2];
    }
    setRecommendedService(match);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setChallengeType("");
    setUrgency("");
    setRecommendedService(null);
  };

  return (
    <div id="quiz" className="bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-brand-steel/30 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-steel/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-rust/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-steel-light text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-rust-light" />
          <span>Interactive Service Advisor</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Not Sure Which Engagement Fits Your Milestone?
        </h3>

        {/* Step 1: Bottleneck */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-2"
          >
            <p className="text-sm text-slate-300">
              Step 1 of 2: What is your primary enterprise objective right now?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                { id: "modernize", label: "Modernize Tech & Digital Workflows", category: "Business" },
                { id: "expansion", label: "Regional / GTM Market Expansion", category: "Business" },
                { id: "ai", label: "Deploy Enterprise AI & Data Strategy", category: "Consultancy" },
                { id: "governance", label: "C-Suite Advisory & Corporate Governance", category: "Consultancy" },
                { id: "ops", label: "Reduce Operational Overhead & Supply Waste", category: "Business" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectChallenge(item.id)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-brand-steel/40 text-xs font-semibold text-white transition-all text-left flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-brand-steel-light group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Urgency */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-2"
          >
            <p className="text-sm text-slate-300">
              Step 2 of 2: What is your intended timeline for execution?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "immediate", label: "Immediate (Within 30 Days)" },
                { id: "quarter", label: "Next Quarter (1-3 Months)" },
                { id: "strategic", label: "Fiscal Year Planning (3-6 Months)" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectUrgency(item.id)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-brand-rust/30 border border-white/10 hover:border-brand-rust/50 text-xs font-semibold text-white transition-all text-center"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Recommendation Result */}
        {step === 3 && recommendedService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 text-left space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                  Recommended Engagement
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            </div>

            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-brand-navy/10 text-brand-navy font-bold text-[11px] uppercase mb-2">
                {recommendedService.category === "business" ? "Business Solutions" : "Consultancy Advisory"}
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">
                {recommendedService.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {recommendedService.shortDescription}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Expected ROI Benchmark:</span>
              <span className="font-bold text-emerald-700">{recommendedService.metrics}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(recommendedService.title)}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-navy-light transition-colors"
              >
                <span>Book Priority Consultation for this Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
