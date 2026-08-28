"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Tv, 
  FolderPlus, 
  Scale, 
  Monitor, 
  TrendingUp, 
  BarChart3,
  ArrowRight 
} from "lucide-react";

interface ServiceCardData {
  id: string;
  category: "business" | "consultancy";
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  hoverDetail: string;
  image: string;
  link: string;
}

const serviceCards: ServiceCardData[] = [
  {
    id: "strategic-consulting",
    category: "consultancy",
    icon: <Tv className="w-7 h-7 stroke-[1.75]" />,
    title: "Strategic Management Consulting",
    shortDescription: "Driving success through tailored strategic plans with a seasoned advisory team. Unlock your operational potential with structured corporate governance.",
    hoverDetail: "We help organizations align leadership, resolve operational bottlenecks, and execute structured corporate growth strategies.",
    image: "/images/service-strategy.jpg",
    link: "/services?category=consultancy&id=strategic-consulting"
  },
  {
    id: "investment-planning",
    category: "business",
    icon: <BarChart3 className="w-7 h-7 stroke-[1.75]" />,
    title: "Financial Modeling & Budgeting",
    shortDescription: "Realistic financial forecasting, unit economics, cash flow modeling, and investor-ready documentation for growing companies.",
    hoverDetail: "We construct 3-year cash flow projections, unit-economic models, and CapEx/OpEx budgets for banks, partners, and executive decisions.",
    image: "/images/service-financial.jpg",
    link: "/services?category=business&id=investment-planning"
  },
  {
    id: "projects-management",
    category: "consultancy",
    icon: <FolderPlus className="w-7 h-7 stroke-[1.75]" />,
    title: "Projects & Lean Management",
    shortDescription: "We provide project management and Lean Six Sigma services to ensure initiatives are executed efficiently, on time, within budget, and with top quality.",
    hoverDetail: "Certified PMP and Master Black Belt leadership ensuring zero-waste project execution, milestone accountability, and verified ROI.",
    image: "/images/service-projects.jpg",
    link: "/services?category=consultancy&id=leadership-advisory"
  },
  {
    id: "process-transformation",
    category: "consultancy",
    icon: <Scale className="w-7 h-7 stroke-[1.75]" />,
    title: "Process & ERP Transformation",
    shortDescription: "Streamlining business operations, eliminating shop-floor waste, and supervising ERP implementation to ensure maximum productivity and compliance.",
    hoverDetail: "We optimize departmental handovers, eliminate operational scrap, and manage ERP software rollouts to modernize enterprise workflows.",
    image: "/images/service-erp.jpg",
    link: "/services?category=consultancy&id=risk-management"
  },
  {
    id: "studies-research",
    category: "business",
    icon: <Monitor className="w-7 h-7 stroke-[1.75]" />,
    title: "Studies & Feasibility Research",
    shortDescription: "Rigorous market analysis, unit-economic modeling, capital budgeting, and commercial feasibility studies for new ventures and enterprise expansions.",
    hoverDetail: "Empirical market research, customer demand surveys, competitor benchmarking, and bank-ready commercial feasibility studies.",
    image: "/images/service-research.jpg",
    link: "/services?category=business&id=business-idea"
  },
  {
    id: "business-growth",
    category: "business",
    icon: <TrendingUp className="w-7 h-7 stroke-[1.75]" />,
    title: "Specialized Business Solutions",
    shortDescription: "Tailored commercial advisory, sales funnel optimization, customer retention strategies, and transparent monthly KPI analytics reporting.",
    hoverDetail: "Identifying sales conversion bottlenecks, restructuring customer acquisition funnels, and scaling recurring commercial revenue.",
    image: "/images/service-growth.jpg",
    link: "/services?category=business&id=business-growth"
  }
];

export default function DualEngineSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            Our Advisory Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white">
            Comprehensive Consulting Services
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Structured business advisory, financial feasibility, and operational excellence designed to drive sustainable growth.
          </p>
        </div>

        {/* 6 Divided Interactive Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {serviceCards.map((service) => {
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative rounded-2xl overflow-hidden min-h-[290px] sm:min-h-[310px] transition-all duration-300 shadow-sm hover:shadow-xl group select-none"
              >
                {/* 1. DEFAULT BASE STATE: Sky-Blue Card */}
                <div
                  className={`absolute inset-0 bg-[#66C2EC] dark:bg-[#153456] p-7 sm:p-8 flex flex-col items-center text-center justify-center transition-all duration-500 ease-out z-10 ${
                    isHovered ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                  }`}
                >
                  {/* Top Outline Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#083366] dark:text-sky-200 mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#083366] dark:text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#083366]/85 dark:text-slate-200 leading-relaxed max-w-[280px] font-normal">
                    {service.shortDescription}
                  </p>
                </div>

                {/* 2. HOVER STATE: Image Background + Dark Blue Overlay + Detail + "Learn more" Button */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center p-7 sm:p-8 transition-all duration-500 ease-out z-20 ${
                    isHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out scale-105"
                  />

                  {/* Dark Blue Overlay */}
                  <div className="absolute inset-0 bg-[#0B203E]/85 dark:bg-[#07162C]/90 backdrop-blur-[2px]" />

                  {/* Hover Content */}
                  <div className="relative z-10 space-y-4 max-w-[280px] mx-auto flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                      {service.title}
                    </span>

                    <p className="text-xs sm:text-sm font-medium text-white leading-relaxed line-clamp-4">
                      {service.hoverDetail}
                    </p>

                    <Link
                      href={service.link}
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#005CE6] hover:bg-[#0047BA] text-white text-xs sm:text-sm font-bold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 gap-1.5"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* View All Services Footer Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#152238] dark:text-brand-steel-light hover:text-brand-rust transition-colors"
          >
            <span>Explore all services and detailed engagement deliverables</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
