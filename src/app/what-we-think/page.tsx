"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Workflow, BarChart3, Users, Puzzle, GraduationCap, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const content = {
  en: {
    badge: "What We Think",
    headline: "Improvement That Lasts Starts with How You Think",
    lead: "Tools are easy to buy. Lasting results come from the thinking behind them.",
    sub: "Here are the principles that guide how we approach every engagement:",
    principles: [
      { title: "Fix the process before you buy the software.", desc: "ERP systems amplify whatever process they are given. We map, challenge, and improve the process first—so technology supports good practice rather than simply automating waste." },
      { title: "Make decisions based on data.", desc: "From statistical process control to gap analysis, we measure first, analyze rigorously, and recommend based on evidence—not assumptions." },
      { title: "People make change stick.", desc: "Methods such as ADKAR exist because even the best-designed improvement can fail if the people responsible for it aren't ready. We build skills, engagement, and ownership alongside every system." },
      { title: "Fit the method to the problem.", desc: "Lean, Six Sigma, TPM, TRIZ, and the Balanced Scorecard each address different challenges. We choose the approach the situation requires—not simply the one we happen to prefer." },
      { title: "Leave clients stronger than we found them.", desc: "Our goal is to build teams that can continue improving long after our engagement ends. That's why capability building and training sit at the center of our consulting." },
    ],
    deeperTitle: "Want to go deeper?",
    deeperText: "Explore our Blog for practical insights, frameworks, and ideas on process improvement, operational excellence, technology, and sustainable organizational change.",
    blogCta: "Read the Blog",
    servicesCta: "See What We Do",
  },
  ar: {
    badge: "رؤيتنا",
    headline: "التحسين الذي يدوم يبدأ بطريقة التفكير",
    lead: "شراء الأدوات سهل. أما النتائج المستدامة فتأتي من التفكير الذي يقف خلفها.",
    sub: "هذه هي المبادئ التي توجّه طريقة عملنا في كل مشروع:",
    principles: [
      { title: "أصلح العملية قبل أن تشتري البرنامج.", desc: "تضخّم أنظمة ERP أي عملية تُعطى لها. لذلك نرسم العملية ونراجعها ونحسّنها أولاً، لتدعم التقنية الممارسات الجيدة بدلاً من أتمتة الهدر." },
      { title: "اتخذ قراراتك بناءً على البيانات.", desc: "من التحكم الإحصائي في العمليات إلى تحليل الفجوات، نقيس أولاً ونحلل بدقة ونوصي بناءً على الأدلة لا الافتراضات." },
      { title: "الأفراد هم من يرسّخون التغيير.", desc: "وُجدت منهجيات مثل ADKAR لأن أفضل تحسين قد يفشل إذا لم يكن المسؤولون عنه مستعدين. نبني المهارات والتفاعل والمسؤولية إلى جانب كل نظام." },
      { title: "اختر المنهجية التي تناسب المشكلة.", desc: "تعالج لين وستة سيجما والصيانة الإنتاجية الشاملة وTRIZ وبطاقة الأداء المتوازن تحديات مختلفة. نختار النهج الذي يتطلبه الموقف، لا الذي نفضّله." },
      { title: "اترك عملاءك أقوى مما وجدتهم.", desc: "هدفنا بناء فرق قادرة على مواصلة التحسين بعد انتهاء عملنا بوقت طويل، ولهذا يقع بناء القدرات والتدريب في صميم استشاراتنا." },
    ],
    deeperTitle: "هل تريد التعمق أكثر؟",
    deeperText: "تصفح مدونتنا للاطلاع على رؤى عملية وأطر وأفكار حول تحسين العمليات والتميز التشغيلي والتقنية والتغيير المؤسسي المستدام.",
    blogCta: "اقرأ المدونة",
    servicesCta: "اطّلع على ما نقوم به",
  },
};

const icons = [Workflow, BarChart3, Users, Puzzle, GraduationCap];
const tones = ["bg-navy text-white", "bg-steel text-ink", "bg-rust text-white", "bg-navy text-white", "bg-steel text-ink"];

export default function WhatWeThinkPage() {
  const { language } = useLanguage();
  const c = language === "ar" ? content.ar : content.en;

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-transparent text-ink dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Hero */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 text-navy dark:text-steel-light border border-navy/10 dark:border-white/10 text-[11px] font-bold uppercase tracking-widest shadow-xs">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink dark:text-white leading-tight font-display">
            {c.headline}
          </h1>
          <p className="text-base sm:text-xl font-bold text-navy dark:text-steel-light">{c.lead}</p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{c.sub}</p>
        </ScrollReveal>

        {/* Principles */}
        <StaggerContainer delayChildren={0.05} staggerChildren={0.08} className="space-y-4 sm:space-y-5 mb-16 sm:mb-20">
          {c.principles.map((p, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem
                key={p.title}
                className="group relative overflow-hidden grid grid-cols-[auto,1fr] gap-4 sm:gap-6 items-start bg-white dark:bg-night-800/80 rounded-2xl p-5 sm:p-7 border border-slate-200/80 dark:border-white/10 shadow-card hover:shadow-lift hover:border-navy/25 dark:hover:border-steel/30 transition-all"
              >
                <span className="absolute top-0 inset-x-0 h-[3px] bg-brand-tri scale-x-0 origin-left rtl:origin-right group-hover:scale-x-100 transition-transform duration-500" aria-hidden="true" />
                <div className="flex flex-col items-center gap-2">
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${tones[i]}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.14em] text-slate-400">0{i + 1}</span>
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-lg sm:text-xl font-bold font-display text-ink dark:text-white">{p.title}</h2>
                  <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Go deeper */}
        <ScrollReveal variant="fade-up" className="rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 dark:from-night-800 dark:via-night-850 dark:to-night-950 text-white p-7 sm:p-12 border border-navy-700 dark:border-white/10 shadow-lift relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-brand-tri" aria-hidden="true" />
          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">{c.deeperTitle}</h2>
            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">{c.deeperText}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link href="/blog" className="btn-sheen inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rust hover:bg-rust-light text-white text-sm font-bold shadow-cta">
                <span>{c.blogCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold">
                <span>{c.servicesCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
