"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Tv, 
  FolderPlus, 
  Scale, 
  Monitor, 
  TrendingUp, 
  BarChart3,
  ArrowRight 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const cardIcons: Record<string, React.ReactNode> = {
  "strategic-consulting": <Tv className="w-6 h-6 stroke-[1.75]" />,
  "investment-planning": <BarChart3 className="w-6 h-6 stroke-[1.75]" />,
  "projects-management": <FolderPlus className="w-6 h-6 stroke-[1.75]" />,
  "process-transformation": <Scale className="w-6 h-6 stroke-[1.75]" />,
  "studies-research": <Monitor className="w-6 h-6 stroke-[1.75]" />,
  "business-growth": <TrendingUp className="w-6 h-6 stroke-[1.75]" />
};

const cardImages: Record<string, string> = {
  "strategic-consulting": "/images/service-strategy.jpg",
  "investment-planning": "/images/service-financial.jpg",
  "projects-management": "/images/service-projects.jpg",
  "process-transformation": "/images/service-erp.jpg",
  "studies-research": "/images/service-research.jpg",
  "business-growth": "/images/service-growth.jpg"
};

const cardLinks: Record<string, string> = {
  "strategic-consulting": "/services/strategic-consulting",
  "investment-planning": "/services/investment-planning",
  "projects-management": "/services/projects-management",
  "process-transformation": "/services/process-transformation",
  "studies-research": "/services/studies-research",
  "business-growth": "/services/business-growth"
};

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function DualEngineSection() {
  const { t, isRTL } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            {t.services.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
            {t.services.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* 6 Divided Interactive Blocks Grid with Cascading Scroll Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {t.services.cards.map((service) => {
            const isHovered = hoveredCard === service.id;
            const icon = cardIcons[service.id] || <Tv className="w-6 h-6" />;
            const image = cardImages[service.id] || "/images/service-strategy.jpg";
            const link = cardLinks[service.id] || `/services/${service.id}`;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[320px] shadow-lg hover:shadow-2xl group select-none cursor-pointer border border-[#8EA9D3]/30 dark:border-slate-800"
              >
                {/* 1. DEFAULT BASE STATE: Logo Navy-Blue Card */}
                <div
                  className={`absolute inset-0 bg-[#152238] dark:bg-[#0D192E] p-7 sm:p-8 flex flex-col items-center text-center justify-center transition-all duration-500 ease-out z-10 ${
                    isHovered ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                  }`}
                >
                  {/* Top Icon with subtle glow pill */}
                  <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/15 flex items-center justify-center text-brand-steel-light mb-4 group-hover:scale-110 group-hover:bg-brand-rust/20 group-hover:text-brand-rust-light transition-all duration-300">
                    {icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 font-display tracking-tight">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 leading-relaxed max-w-[280px] font-normal">
                    {service.shortDescription}
                  </p>
                </div>

                {/* 2. HOVER STATE: Image Background + Dark Navy Overlay + Detail + "Learn more" Button */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center p-7 sm:p-8 transition-all duration-500 ease-out z-20 ${
                    isHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out scale-105"
                  />

                  {/* Deep Brand Navy Overlay */}
                  <div className="absolute inset-0 bg-[#0B1526]/90 dark:bg-[#070D18]/92 backdrop-blur-[2px]" />

                  {/* Hover Content */}
                  <div className="relative z-10 space-y-4 max-w-[280px] mx-auto flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-steel-light font-display">
                      {service.title}
                    </span>

                    <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed line-clamp-4">
                      {service.hoverDetail}
                    </p>

                    <Link
                      href={link}
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs sm:text-sm font-bold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 gap-1.5"
                    >
                      <span>{t.services.learnMore}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Services Footer Link */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#152238] dark:text-brand-steel-light hover:text-brand-rust transition-colors"
          >
            <span>{t.services.exploreAll}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
