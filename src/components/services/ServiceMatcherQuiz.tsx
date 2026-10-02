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
    badge: "مستشار الخدمات التفاعلي",
    title: "ألست متأكداً من الخدمة الأنسب لمرحلة مشروعك الحالية؟",
    step1Title: "الخطوة 1 من 2: ما هو هدفك المؤسسي الأبرز حالياً؟",
    step2Title: "الخطوة 2 من 2: ما هو الإطار الزمني المستهدف للتنفيذ؟",
    recTag: "الاستشارة الموصى بها",
    retake: "إعادة التقييم",
    roiLabel: "المخرجات المتوقعة:",
    bookBtn: "حجز جلسة استشارية لهذه الخدمة",
    challenges: [
      { id: "modernize", label: "أفكار تجارية ودراسات جدوى اقتصادية" },
      { id: "expansion", label: "التوسع الإقليمي وتحليل السوق والمنافسين" },
      { id: "governance", label: "الاستشارات الاستراتيجية وإعادة الهيكلة" },
      { id: "financial", label: "النمذجة المالية والتخطيط الاستثماري" },
      { id: "ops", label: "تطوير العمليات وتحسين مسارات المبيعات" }
    ],
    timeframes: [
      { id: "immediate", label: "فوري (خلال 30 يوماً)" },
      { id: "quarter", label: "الربع القادم (1-3 أشهر)" },
      { id: "strategic", label: "تخطيط استراتيجي (3-6 أشهر)" }
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
    <div id="quiz" className="bg-white/90 dark:bg-black/45 backdrop-blur-md text-slate-900 dark:text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200/80 dark:border-white/20 relative overflow-hidden transition-colors">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#8EA9D3]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#E25C43]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/80 dark:border-white/20 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E25C43]" />
          <span>{labels.badge}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white drop-shadow-xs">
          {labels.title}
        </h3>

        {/* Step 1: Bottleneck */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-2"
          >
            <p className="text-sm text-slate-600 dark:text-slate-200 font-medium">
              {labels.step1Title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-start">
              {labels.challenges.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectChallenge(item.id)}
                  className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/10 hover:bg-slate-200/80 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/40 text-xs font-semibold text-slate-800 dark:text-white transition-all text-start flex items-center justify-between group shadow-xs"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
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
            <p className="text-sm text-slate-600 dark:text-slate-200 font-medium">
              {labels.step2Title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {labels.timeframes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectUrgency(item.id)}
                  className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/10 hover:bg-[#E25C43]/20 border border-slate-200/80 dark:border-white/20 hover:border-[#E25C43]/60 text-xs font-semibold text-slate-800 dark:text-white transition-all text-center shadow-xs"
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
            className="bg-slate-50 dark:bg-black/60 backdrop-blur-md text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 text-start space-y-4 shadow-2xl border border-slate-200 dark:border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <span className="text-xs uppercase font-bold text-slate-600 dark:text-slate-300 tracking-wider">
                  {labels.recTag}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> {labels.retake}
              </button>
            </div>

            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white font-bold text-[11px] uppercase mb-2 border border-slate-300 dark:border-white/20">
                {language === "ar" ? "ممارسة استشارية متخصصة" : "Advisory Practice"}
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white font-display drop-shadow-xs">
                {recommendedService.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-100 mt-1.5 leading-relaxed font-medium">
                {recommendedService.shortDescription}
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/15 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600 dark:text-slate-200">{labels.roiLabel}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{recommendedService.metrics}</span>
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
