import React from "react";
import Link from "next/link";

/** "From knowledge to results": the navy panel shared by the services pages. */
export default function ApproachPanel() {
  return (
    <section data-reveal aria-labelledby="approach-title" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-[#25346B] text-white p-8 sm:p-12 mb-16 shadow-lift">
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-brand-tri" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <p className="lg:col-span-3 text-[11px] font-bold uppercase tracking-[0.16em] text-steel-light pt-2">Approach</p>
        <div className="lg:col-span-9 space-y-5 max-w-3xl">
          <h2 id="approach-title" className="text-3xl sm:text-[2.4rem] font-extrabold leading-[1.1]">From knowledge to results</h2>
          <p className="lede text-slate-200">
            Consulting identifies what needs to change. Training builds the capability to change it. Digital implementation
            helps make the improvement part of everyday work.
          </p>
          <p className="text-[15px] text-slate-200">
            <Link href="/blog" className="link-arrow text-white">Explore our blog</Link> for practical insights, tools and
            real-world perspectives on operational excellence, strategy, quality and sustainable improvement.
          </p>
        </div>
      </div>
    </section>
  );
}
