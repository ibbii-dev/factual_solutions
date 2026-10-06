"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/ui/PageHeader";

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

export default function WhatWeThinkPage() {
  const { language } = useLanguage();
  const c = language === "ar" ? content.ar : content.en;

  return (
    <div className="pb-20 sm:pb-28 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={c.badge} title={c.headline} lede={<><p className="font-semibold text-ink dark:text-white">{c.lead}</p><p className="mt-3">{c.sub}</p></>} />

        {/* Principles as a numbered essay */}
        <ol className="mb-20 sm:mb-28">
          {c.principles.map((p, i) => (
            <li key={p.title} data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 py-10 border-b border-ink/15 dark:border-white/15 first:pt-0">
              <span className="lg:col-span-3 section-no text-3xl sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
              <div className="lg:col-span-9 max-w-3xl space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold font-display leading-snug text-ink dark:text-white">{p.title}</h2>
                <p className="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Go deeper */}
        <section className="fs-rule grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-ink/15 dark:border-white/15 pt-10">
          <div data-reveal className="lg:col-span-9 lg:col-start-4 max-w-3xl space-y-5">
            <h2 className="text-3xl sm:text-[2.6rem] font-bold font-display leading-[1.1] text-ink dark:text-white">{c.deeperTitle}</h2>
            <p className="lede text-slate-700 dark:text-slate-300">{c.deeperText}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
              <Link href="/blog" className="btn-ink inline-flex items-center gap-2 px-6 py-3.5 bg-ink hover:bg-navy dark:bg-white dark:text-ink text-white text-sm font-semibold transition-colors">
                {c.blogCta}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="link-arrow text-sm text-ink dark:text-white">
                {c.servicesCta}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
