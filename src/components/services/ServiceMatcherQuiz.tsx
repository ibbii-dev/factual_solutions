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
    title: "لست متأكداً من الخدمة الأنسب لاحتياجاتك؟",
    step1Title: "الخطوة 1 من 2: ما هو هدفك المؤسسي الأبرز حالياً؟",
    step2Title: "الخطوة 2 من 2: ما هو الإطار الزمني المستهدف للتنفيذ؟",
    recTag: "الاستشارة الموصى بها",
    retake: "إعادة التقييم",
    roiLabel: "مجال الخدمة:",
    bookBtn: "حجز جلسة استشارية لهذه الخدمة",
    challenges: [
      { id: "ops", label: "رفع الإنتاجية وتحسين العمليات" },
      { id: "strategy", label: "الاستراتيجية وإدارة الأداء" },
      { id: "quality", label: "الجودة والمخاطر والامتثال" },
      { id: "skills", label: "بناء مهارات الفرق (التدريب)" },
      { id: "digital", label: "أنظمة ERP والأدوات الرقمية" }
    ],
    timeframes: [
      { id: "immediate", label: "فوري (خلال 30 يوماً)" },
      { id: "quarter", label: "الربع القادم (1-3 أشهر)" },
      { id: "strategic", label: "تخطيط استراتيجي (3-6 أشهر)" }
    ]
  } : {
    badge: "Interactive Service Advisor",
    title: "Not Sure Which Service Fits Your Needs?",
    step1Title: "Step 1 of 2: What do you want to improve most right now?",
    step2Title: "Step 2 of 2: What is your intended timeline for execution?",
    recTag: "Recommended Engagement",
    retake: "Retake Quiz",
    roiLabel: "Service line:",
    bookBtn: "Book Priority Consultation for this Service",
    challenges: [
      { id: "ops", label: "Improve operations & productivity" },
      { id: "strategy", label: "Strategy & performance management" },
      { id: "quality", label: "Quality, risk & compliance" },
      { id: "skills", label: "Build my team's skills (training)" },
      { id: "digital", label: "ERP & digital systems" }
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
    const target: Record<string, string> = {
      ops: "operational-excellence",
      strategy: "strategy-performance",
      quality: "quality-risk-compliance",
      skills: "training-lean-quality",
      digital: "erp-implementation",
    };
    const match: ServiceItem = currentServices.find((s) => s.id === target[challengeType]) || currentServices[0];
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
    <div id="quiz" className="bg-white dark:bg-night-800/80 text-ink dark:text-white rounded-3xl p-8 sm:p-12 shadow-lift border border-slate-200/80 dark:border-white/10 relative overflow-hidden transition-colors">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-steel/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rust/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-ink dark:text-white text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>{labels.badge}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-ink dark:text-white">
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
                  className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/10 hover:bg-slate-200/80 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/40 text-xs font-semibold text-ink dark:text-white transition-all text-start flex items-center justify-between group shadow-xs"
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
                  className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/10 hover:bg-rust/20 border border-slate-200/80 dark:border-white/10 hover:border-accent/60 text-xs font-semibold text-ink dark:text-white transition-all text-center shadow-xs"
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
            className="bg-slate-50 dark:bg-night-900/85 backdrop-blur-md text-ink dark:text-white rounded-2xl p-6 sm:p-8 text-start space-y-4 shadow-lift border border-slate-200 dark:border-white/10"
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
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/15 text-ink dark:text-white font-bold text-[11px] uppercase mb-2 border border-slate-300 dark:border-white/10">
                {language === "ar" ? "ممارسة استشارية متخصصة" : "Advisory Practice"}
              </div>
              <h4 className="text-xl font-extrabold text-ink dark:text-white font-display">
                {recommendedService.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-100 mt-1.5 leading-relaxed font-medium">
                {recommendedService.shortDescription}
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/15 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600 dark:text-slate-200">{labels.roiLabel}</span>
              <span className="font-bold text-navy dark:text-steel-light">{recommendedService.metrics}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(recommendedService.title)}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-rust hover:bg-rust-dark text-white text-xs font-bold transition-colors shadow-cta"
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
