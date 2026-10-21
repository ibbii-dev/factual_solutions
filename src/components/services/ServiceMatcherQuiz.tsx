"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { getServices, ServiceItem } from "@/data/servicesData";

const CHALLENGES = [
  { id: "ops", label: "Improve operations & productivity", service: "operational-excellence" },
  { id: "strategy", label: "Strategy & performance management", service: "strategy-performance" },
  { id: "quality", label: "Quality, risk & compliance", service: "quality-risk-compliance" },
  { id: "skills", label: "Build my team's skills (training)", service: "training-lean-quality" },
  { id: "digital", label: "ERP & digital systems", service: "erp-implementation" },
];

const TIMEFRAMES = [
  { id: "immediate", label: "Immediate (within 30 days)" },
  { id: "quarter", label: "Next quarter (1-3 months)" },
  { id: "strategic", label: "Planning ahead (3-6 months)" },
];

/** "Help me choose": two questions, then one recommended service. */
export default function ServiceMatcherQuiz() {
  const services = getServices();
  const [step, setStep] = useState(1);
  const [challenge, setChallenge] = useState("");
  const [result, setResult] = useState<ServiceItem | null>(null);

  const pickTimeframe = () => {
    const target = CHALLENGES.find((c) => c.id === challenge)?.service;
    setResult(services.find((s) => s.id === target) ?? services[0]);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setChallenge("");
    setResult(null);
  };

  const rowBtn =
    "w-full flex items-center justify-between gap-4 rounded-xl border border-paper-line dark:border-white/10 bg-paper dark:bg-night-900/60 px-4 py-3.5 text-start text-[15px] font-medium text-ink dark:text-white hover:border-navy/30 hover:text-navy dark:hover:text-steel-light transition-colors group";
  const arrow = <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent rtl:rotate-180 shrink-0" />;

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="scroll-mt-28 fs-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 space-y-4">
        <p className="fs-label">Help me choose</p>
        <h2 id="quiz-title" className="text-3xl sm:text-[2.3rem] font-extrabold leading-[1.1] text-ink dark:text-white">
          Not sure which service fits your needs?
        </h2>
      </div>
      <div className="lg:col-span-8 space-y-6" aria-live="polite">
        {step === 1 && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Step 1 of 2: What do you want to improve most right now?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CHALLENGES.map((item) => (
                <button key={item.id} type="button" onClick={() => { setChallenge(item.id); setStep(2); }} className={rowBtn}>
                  <span>{item.label}</span>
                  {arrow}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Step 2 of 2: When would you like to start?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TIMEFRAMES.map((item) => (
                <button key={item.id} type="button" onClick={pickTimeframe} className={rowBtn}>
                  <span>{item.label}</span>
                  {arrow}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div className="rounded-2xl border border-paper-line dark:border-white/10 bg-paper dark:bg-night-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase font-semibold tracking-[0.14em] text-slate-500 dark:text-slate-400">We recommend</p>
              <button type="button" onClick={reset} className="text-sm text-slate-500 hover:text-ink dark:hover:text-white inline-flex items-center gap-1.5 min-h-[44px]">
                <RotateCcw className="w-3.5 h-3.5" /> Start again
              </button>
            </div>
            <h3 className="text-2xl font-bold font-display text-ink dark:text-white">{result.title}</h3>
            <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">{result.shortDescription}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <Link href={`/contact?topic=${result.category}`} className="btn-primary">
                Discuss this service
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href={`/services/${result.id}`} className="link-arrow text-sm text-ink dark:text-white">
                View details
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
