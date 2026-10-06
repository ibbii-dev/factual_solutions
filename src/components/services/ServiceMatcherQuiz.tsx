"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
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

  const rowBtn = "w-full flex items-center justify-between gap-4 py-4 border-b border-ink/10 dark:border-white/10 text-start text-[15px] text-ink dark:text-white hover:text-accent transition-colors group";

  return (
    <section id="quiz" className="fs-rule scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-ink/15 dark:border-white/15 pt-10">
      <p className="lg:col-span-3 eyebrow pt-2">{labels.badge}</p>
      <div data-reveal className="lg:col-span-9 max-w-3xl space-y-6">
        <h2 className="text-3xl sm:text-[2.6rem] font-bold font-display leading-[1.1] text-ink dark:text-white">{labels.title}</h2>

        {step === 1 && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">{labels.step1Title}</p>
            <div className="border-t border-ink/15 dark:border-white/15">
              {labels.challenges.map((item) => (
                <button key={item.id} onClick={() => handleSelectChallenge(item.id)} className={rowBtn}>
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent rtl:rotate-180 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">{labels.step2Title}</p>
            <div className="border-t border-ink/15 dark:border-white/15">
              {labels.timeframes.map((item) => (
                <button key={item.id} onClick={() => handleSelectUrgency(item.id)} className={rowBtn}>
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent rtl:rotate-180 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && recommendedService && (
          <div className="border-t border-ink/15 dark:border-white/15 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase font-semibold tracking-[0.14em] text-slate-500 dark:text-slate-400">{labels.recTag}</p>
              <button onClick={handleReset} className="text-sm text-slate-500 hover:text-ink dark:hover:text-white inline-flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> {labels.retake}
              </button>
            </div>
            <h3 className="text-2xl font-bold font-display text-ink dark:text-white">{recommendedService.title}</h3>
            <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">{recommendedService.shortDescription}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <Link
                href={`/contact?service=${encodeURIComponent(recommendedService.title)}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink hover:bg-navy dark:bg-white dark:text-ink text-white text-sm font-semibold transition-colors"
              >
                {labels.bookBtn}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href={`/services/${recommendedService.id}`} className="link-arrow text-sm text-ink dark:text-white">
                {language === "ar" ? "تفاصيل الخدمة" : "View details"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
