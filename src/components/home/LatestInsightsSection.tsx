"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const articles = [
  {
    id: "cash-flow-forecasts",
    category: "FINANCIAL MODELING",
    date: "May 14, 2024",
    readTime: "7 min read",
    title: "Constructing 5-Year Resilient Cash Flow Forecasts in Volatile Markets",
    excerpt: "Actionable techniques to identify and isolate key cash drivers, navigate capital balance risk, adjust ratios, and supply chain disruptions.",
    image: "/images/service-financial.jpg",
    slug: "financial-modeling-5-year-cash-flow"
  },
  {
    id: "shop-floor-waste",
    category: "LEAN OPERATIONS",
    date: "Apr 22, 2024",
    readTime: "9 min read",
    title: "Eliminating Shop-Floor Waste: A Six Sigma Framework for Factories",
    excerpt: "Practical techniques for identification and elimination of recurring waste, cycle bottlenecks, and embedded excess equipment requirements.",
    image: "/images/service-projects.jpg",
    slug: "lean-six-sigma-factory-operations"
  },
  {
    id: "feasibility-standard",
    category: "MARKET FEASIBILITY",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    title: "Validating New Business Lines: The Bank-Ready Feasibility Standard",
    excerpt: "What commercial lenders, regional equity partners, and boards look for before approving seed capital or expansion facilities.",
    image: "/images/consulting-meeting.jpg",
    slug: "bank-ready-feasibility-study-guide"
  }
];

export default function LatestInsightsSection() {
  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#0E1626] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#A33C29]">
              THOUGHT LEADERSHIP &amp; BLOG
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
              Latest Strategic Blog
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Practical frameworks, corporate valuation models, and market intelligence published by our senior advisory board.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#A33C29] hover:text-[#8E3221] transition-colors shrink-0"
          >
            <span>Explore All 18 Blogs</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {articles.map((art) => (
            <StaggerItem
              key={art.id}
              className="bg-white dark:bg-[#111C2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-[#152238]/85 backdrop-blur-md text-white uppercase">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#152238] dark:text-white leading-snug font-display group-hover:text-[#A33C29] transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 font-normal">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Read full article link */}
              <div className="p-5 sm:p-6 pt-0 mt-auto">
                <Link
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#152238] dark:text-slate-200 group-hover:text-[#A33C29] transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
