"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Clock, 
  Target, 
  ShieldCheck 
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { language, isRTL } = useLanguage();
  if (!service) return null;

  const isBusiness = service.category === "business";

  const labels = language === "ar" ? {
    categoryBusiness: "حلول أعمال",
    categoryConsultancy: "استشارات إدارية",
    idealFor: "الملف المؤسسي المستهدف",
    duration: "المدة الزمنية التقديرية",
    deliverables: "مخرجات العمل الاستشارية",
    confidentiality: "سرية تامة واتفاقية عدم إفصاح متبادلة",
    bookBtn: "حجز جلسة استكشافية لهذه الخدمة"
  } : {
    categoryBusiness: "Business Solution",
    categoryConsultancy: "Consultancy Advisory",
    idealFor: "Ideal Organization Profile",
    duration: "Engagement Timeline",
    deliverables: "Core Strategic Deliverables",
    confidentiality: "Full confidentiality & NDA on initial consultation",
    bookBtn: "Book Discovery Call for this Service"
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white dark:bg-[#111C2E] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700/80 max-w-3xl w-full p-6 sm:p-10 z-10 max-h-[90vh] overflow-y-auto text-slate-900 dark:text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Tag & Metric */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isBusiness
                  ? "bg-brand-navy dark:bg-brand-steel/20 text-white dark:text-brand-steel-light"
                  : "bg-brand-rust dark:bg-brand-rust/20 text-white dark:text-brand-rust-light"
              }`}
            >
              {isBusiness ? labels.categoryBusiness : labels.categoryConsultancy}
            </span>

            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
              {service.metrics}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 font-display">
            {service.title}
          </h2>

          {/* Full Description */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {service.fullDescription}
          </p>

          {/* Key Specs: Ideal For & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-[#0B1320] p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-brand-steel" /> {labels.idealFor}
              </div>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{service.idealFor}</p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0B1320] p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-brand-rust" /> {labels.duration}
              </div>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{service.duration}</p>
            </div>
          </div>

          {/* Core Deliverables Framework */}
          <div className="space-y-3 mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <Layers className="w-4 h-4 text-brand-steel" />
              {labels.deliverables}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1320] border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {service.tags.map((tag, tIdx) => (
              <span key={tIdx} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                #{tag}
              </span>
            ))}
          </div>

          {/* Modal Action CTA */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-brand-steel" />
              <span>{labels.confidentiality}</span>
            </div>

            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-rust hover:bg-brand-rust-light text-white text-sm font-bold transition-all shadow-md hover:shadow-lg"
            >
              <span>{labels.bookBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
