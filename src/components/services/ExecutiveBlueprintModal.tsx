"use client";

import React, { useState, useRef } from "react";
import { 
  FileText, 
  Download, 
  X, 
  CheckCircle2, 
  Printer, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  BarChart3,
  Check
} from "lucide-react";

export default function ExecutiveBlueprintModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "preview">("form");
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("Manufacturing & Logistics");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail || !fullName) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          workEmail,
          companyName: company || "Executive Client",
          serviceOfInterest: `Executive Blueprint Download - ${industry}`,
          message: `User downloaded the 1-Page Feasibility Study Blueprint for industry: ${industry}.`
        })
      });
    } catch (err) {
      console.error("Lead tracking error:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep("preview");
    }, 400);
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-[#0E1626] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0A101D]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#A33C29]/15 text-[#A33C29] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#A33C29] tracking-wider">
                EXECUTIVE RESOURCE
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#152238] dark:text-white font-display">
                Factual Solutions Feasibility Study Blueprint
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === "preview" && (
              <button
                onClick={handlePrintOrDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {step === "form" ? (
            <div className="max-w-xl mx-auto space-y-6 py-2">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Immediate 1-Page Advisory Blueprint</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#152238] dark:text-white">
                  Download Sample Feasibility Study Framework
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enter your executive work details to immediately unlock and print our proprietary 1-Page Feasibility Assessment blueprint used for Saudi &amp; GCC enterprise clients.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Al-Ghamdi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Corporate Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="tariq@enterprise.com.sa"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Al-Mashriq Holding"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Primary Industry Sector
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white focus:outline-none focus:border-[#A33C29]"
                    >
                      <option value="Manufacturing & Logistics">Manufacturing &amp; Logistics</option>
                      <option value="Retail & Multi-Branch">Retail &amp; Multi-Branch Networks</option>
                      <option value="Real Estate & Construction">Real Estate &amp; Construction</option>
                      <option value="Financial & Investment Funds">Financial &amp; Investment Funds</option>
                      <option value="Healthcare & Life Sciences">Healthcare &amp; Life Sciences</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !fullName || !workEmail}
                  className="w-full py-3.5 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Generating Custom Blueprint..." : "Unlock & Generate Blueprint PDF"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A33C29]" />
                  <span>Strict confidentiality. Your information is never shared with third parties.</span>
                </div>
              </form>
            </div>
          ) : (
            /* Printable PDF Preview */
            <div className="space-y-6">
              <div 
                ref={printableRef}
                className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 print:m-0 print:p-0 print:border-none print:shadow-none"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-[#152238] pb-4">
                  <div className="space-y-1">
                    <div className="text-lg font-black tracking-tight text-[#152238] font-display">
                      FACTUAL SOLUTIONS
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#A33C29]">
                      EXECUTIVE ADVISORY &amp; CORPORATE STRATEGY
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-slate-600 font-mono">
                    <div>DOC REF: FS-FEAS-2026</div>
                    <div>SECTOR: {industry.toUpperCase()}</div>
                    <div>PREPARED FOR: {fullName.toUpperCase()} ({company || "CONFIDENTIAL"})</div>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h1 className="text-base sm:text-lg font-extrabold text-[#152238]">
                    FEASIBILITY STUDY &amp; STRATEGIC TURNAROUND BLUEPRINT
                  </h1>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    A comprehensive 4-stage operational validation and financial risk framework engineered for enterprise expansion across Saudi Arabia, GCC, and international markets.
                  </p>
                </div>

                {/* 4 Pillars Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-[#A33C29] uppercase">Pillar 1</div>
                    <div className="text-xs font-extrabold text-[#152238]">Market Feasibility</div>
                    <p className="text-[10px] text-slate-600">TAM/SAM validation, competitor pricing power, regulatory entry compliance.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-[#A33C29] uppercase">Pillar 2</div>
                    <div className="text-xs font-extrabold text-[#152238]">Financial Modeling</div>
                    <p className="text-[10px] text-slate-600">5-year DCF, sensitivity simulations, CAPEX recovery horizon, IRR benchmarks.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-[#A33C29] uppercase">Pillar 3</div>
                    <div className="text-xs font-extrabold text-[#152238]">Operational Audit</div>
                    <p className="text-[10px] text-slate-600">Scrap reduction, supply chain friction analysis, labor efficiency audits.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-[#A33C29] uppercase">Pillar 4</div>
                    <div className="text-xs font-extrabold text-[#152238]">Execution Roadmap</div>
                    <p className="text-[10px] text-slate-600">Milestone timeline, partner governance, vendor contracts, risk mitigations.</p>
                  </div>
                </div>

                {/* KPI Benchmark Table */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#152238] uppercase tracking-wider">
                    Target Turnaround &amp; Optimization Benchmarks
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] border border-slate-200">
                      <thead className="bg-[#152238] text-white text-[10px]">
                        <tr>
                          <th className="p-2">Diagnostic Dimension</th>
                          <th className="p-2">Pre-Advisory Average</th>
                          <th className="p-2">Factual Solutions Target</th>
                          <th className="p-2">Typical Timeframe</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-2 font-semibold">Manufacturing Scrap &amp; Waste</td>
                          <td className="p-2 text-slate-600">8% &ndash; 14% of gross output</td>
                          <td className="p-2 font-bold text-emerald-700">&lt; 3.5% controlled rate</td>
                          <td className="p-2 text-slate-600">60 &ndash; 90 Days</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">Working Capital Cycle</td>
                          <td className="p-2 text-slate-600">75 &ndash; 110 Days</td>
                          <td className="p-2 font-bold text-emerald-700">42 &ndash; 50 Days (Cash Optimized)</td>
                          <td className="p-2 text-slate-600">45 Days</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">Multi-Branch EBITDA Margin</td>
                          <td className="p-2 text-slate-600">9% &ndash; 13%</td>
                          <td className="p-2 font-bold text-emerald-700">18% &ndash; 24%</td>
                          <td className="p-2 text-slate-600">120 Days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Stamp & Signoff */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-[10px] text-slate-500">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#152238]">Factual Solutions Corporate Advisory</div>
                    <div>Riyadh, KSA &bull; Dubai, UAE &bull; Global Operations</div>
                    <div>Confidential Corporate Intelligence Document</div>
                  </div>
                  <div className="border border-emerald-600 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-center uppercase tracking-wider text-[9px]">
                    VERIFIED METHODOLOGY<br />STAMP OF ACCREDITATION
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setStep("form")}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium"
                >
                  &larr; Modify Information
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrintOrDownload}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#152238] dark:bg-white text-white dark:text-[#152238] text-xs font-bold shadow-md hover:opacity-90 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Print Blueprint</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
