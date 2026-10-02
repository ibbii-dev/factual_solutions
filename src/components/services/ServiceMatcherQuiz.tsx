"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { getServices, ServiceItem } from "@/data/servicesData";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiceMatcherQuiz() {
  const { language, isRTL } = useLanguage();
  const currentServices = getServices(language);

  const [step, setStep] = useState(1);
  const [challengeType, setChallengeType] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [recommendedService, setRecommendedService] = useState<ServiceItem | null>(null);

  const labels = language === "ar" ? {
    badge: "┘à╪│╪¬╪┤╪º╪▒ ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä╪¬┘ü╪º╪╣┘ä┘è",
    title: "╪ú┘ä╪│╪¬ ┘à╪¬╪ú┘â╪»╪º┘ï ┘à┘å ╪º┘ä╪«╪»┘à╪⌐ ╪º┘ä╪ú┘å╪│╪¿ ┘ä┘à╪▒╪¡┘ä╪⌐ ┘à╪┤╪▒┘ê╪╣┘â ╪º┘ä╪¡╪º┘ä┘è╪⌐╪ƒ",
    step1Title: "╪º┘ä╪«╪╖┘ê╪⌐ 1 ┘à┘å 2: ┘à╪º ┘ç┘ê ┘ç╪»┘ü┘â ╪º┘ä┘à╪ñ╪│╪│┘è ╪º┘ä╪ú╪¿╪▒╪▓ ╪¡╪º┘ä┘è╪º┘ï╪ƒ",
    step2Title: "╪º┘ä╪«╪╖┘ê╪⌐ 2 ┘à┘å 2: ┘à╪º ┘ç┘ê ╪º┘ä╪Ñ╪╖╪º╪▒ ╪º┘ä╪▓┘à┘å┘è ╪º┘ä┘à╪│╪¬┘ç╪»┘ü ┘ä┘ä╪¬┘å┘ü┘è╪░╪ƒ",
    recTag: "╪º┘ä╪º╪│╪¬╪┤╪º╪▒╪⌐ ╪º┘ä┘à┘ê╪╡┘ë ╪¿┘ç╪º",
    retake: "╪Ñ╪╣╪º╪»╪⌐ ╪º┘ä╪¬┘é┘è┘è┘à",
    roiLabel: "╪º┘ä┘à╪«╪▒╪¼╪º╪¬ ╪º┘ä┘à╪¬┘ê┘é╪╣╪⌐:",
    bookBtn: "╪¡╪¼╪▓ ╪¼┘ä╪│╪⌐ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘ä┘ç╪░┘ç ╪º┘ä╪«╪»┘à╪⌐",
    challenges: [
      { id: "modernize", label: "╪ú┘ü┘â╪º╪▒ ╪¬╪¼╪º╪▒┘è╪⌐ ┘ê╪»╪▒╪º╪│╪º╪¬ ╪¼╪»┘ê┘ë ╪º┘é╪¬╪╡╪º╪»┘è╪⌐" },
      { id: "expansion", label: "╪º┘ä╪¬┘ê╪│╪╣ ╪º┘ä╪Ñ┘é┘ä┘è┘à┘è ┘ê╪¬╪¡┘ä┘è┘ä ╪º┘ä╪│┘ê┘é ┘ê╪º┘ä┘à┘å╪º┘ü╪│┘è┘å" },
      { id: "governance", label: "╪º┘ä╪º╪│╪¬╪┤╪º╪▒╪º╪¬ ╪º┘ä╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪⌐ ┘ê╪Ñ╪╣╪º╪»╪⌐ ╪º┘ä┘ç┘è┘â┘ä╪⌐" },
      { id: "financial", label: "╪º┘ä┘å┘à╪░╪¼╪⌐ ╪º┘ä┘à╪º┘ä┘è╪⌐ ┘ê╪º┘ä╪¬╪«╪╖┘è╪╖ ╪º┘ä╪º╪│╪¬╪½┘à╪º╪▒┘è" },
      { id: "ops", label: "╪¬╪╖┘ê┘è╪▒ ╪º┘ä╪╣┘à┘ä┘è╪º╪¬ ┘ê╪¬╪¡╪│┘è┘å ┘à╪│╪º╪▒╪º╪¬ ╪º┘ä┘à╪¿┘è╪╣╪º╪¬" }
    ],
    timeframes: [
      { id: "immediate", label: "┘ü┘ê╪▒┘è (╪«┘ä╪º┘ä 30 ┘è┘ê┘à╪º┘ï)" },
      { id: "quarter", label: "╪º┘ä╪▒╪¿╪╣ ╪º┘ä┘é╪º╪»┘à (1-3 ╪ú╪┤┘ç╪▒)" },
      { id: "strategic", label: "╪¬╪«╪╖┘è╪╖ ╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è (3-6 ╪ú╪┤┘ç╪▒)" }
    ]
  } : {
    badge: "Interactive Service Advisor",
    title: "Not Sure Which Engagement Fits Your Milestone?",
    step1Title: "Step 1 of 2: What is your primary enterprise objective right now?",
    step2Title: "Step 2 of 2: What is your intended timeline for execution?",
    recTag: "Recommended Engagement",
    retake: "Retake Quiz",
    roiLabel: "Expected Benchmark Deliverable:",
    bookBtn: "Book Priority Consultation for this Service",
    challenges: [
      { id: "modernize", label: "Business Idea & Feasibility Modeling" },
      { id: "expansion", label: "Market Analysis & Industry Research" },
      { id: "governance", label: "Strategic Management & Corporate Advisory" },
      { id: "financial", label: "Investment Planning & Financial Modeling" },
      { id: "ops", label: "Business Growth & Sales Optimization" }
    ],
    timeframes: [
      { id: "immediate", label: "Immediate (Within 30 Days)" },
      { id: "quarter", label: "Next Quarter (1-3 Months)" },
      { id: "strategic", label: "Fiscal Year Planning (3-6 Months)" }
    ]
  };

  const handleSelectChallenge = (type: string) => {
    setChallengeType(type);
    setStep(2);
  };

  const handleSelectUrgency = (timeframe: string) => {
    setUrgency(timeframe);
    let match: ServiceItem;
    if (challengeType === "modernize") {
      match = currentServices.find((s) => s.id === "business-idea") || currentServices[0];
    } else if (challengeType === "expansion") {
      match = currentServices.find((s) => s.id === "market-analysis") || currentServices[1];
    } else if (challengeType === "governance") {
      match = currentServices.find((s) => s.id === "strategic-consulting") || currentServices[5];
    } else if (challengeType === "financial") {
      match = currentServices.find((s) => s.id === "investment-planning") || currentServices[2];
    } else {
      match = currentServices.find((s) => s.id === "business-growth") || currentServices[3];
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
    <div id="quiz" className="bg-black/45 backdrop-blur-md text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#8EA9D3]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#E25C43]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E25C43]" />
          <span>{labels.badge}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white drop-shadow-sm">
          {labels.title}
        </h3>

        {/* Step 1: Bottleneck */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-2"
          >
            <p className="text-sm text-slate-200 font-medium">
              {labels.step1Title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-start">
              {labels.challenges.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectChallenge(item.id)}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-xs font-semibold text-white transition-all text-start flex items-center justify-between group shadow-sm"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
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
            <p className="text-sm text-slate-200 font-medium">
              {labels.step2Title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {labels.timeframes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectUrgency(item.id)}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-[#E25C43]/30 border border-white/20 hover:border-[#E25C43]/60 text-xs font-semibold text-white transition-all text-center shadow-sm"
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
            className="bg-black/60 backdrop-blur-md text-white rounded-2xl p-6 sm:p-8 text-start space-y-4 shadow-2xl border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  {labels.recTag}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> {labels.retake}
              </button>
            </div>

            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-white font-bold text-[11px] uppercase mb-2 border border-white/20">
                {language === "ar" ? "┘à┘à╪º╪▒╪│╪⌐ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘à╪¬╪«╪╡╪╡╪⌐" : "Advisory Practice"}
              </div>
              <h4 className="text-xl font-extrabold text-white font-display drop-shadow-sm">
                {recommendedService.title}
              </h4>
              <p className="text-xs text-slate-100 mt-1.5 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {recommendedService.shortDescription}
              </p>
            </div>

            <div className="p-3 bg-white/10 rounded-xl border border-white/15 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200">{labels.roiLabel}</span>
              <span className="font-bold text-emerald-400">{recommendedService.metrics}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(recommendedService.title)}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs font-bold transition-colors shadow-md"
              >
                <span>{labels.bookBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}