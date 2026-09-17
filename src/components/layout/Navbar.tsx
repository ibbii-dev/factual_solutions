"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Briefcase, 
  Compass, 
  Sparkles,
  User,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CustomLanguageSelector from "@/components/CustomLanguageSelector";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Methodology", href: "/#methodology" },
    { name: "About FS", href: "/about" },
    { name: "Portals", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
  ];

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Advisory Ribbon */}
      <div className="bg-[#152238] dark:bg-[#090F1A] text-slate-300 py-1.5 px-4 text-[10px] sm:text-[11px] font-medium tracking-wider border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29] animate-pulse shrink-0" />
            <span className="tracking-widest uppercase font-semibold text-slate-200">
              CORPORATE SOLUTIONS <span className="text-slate-500 mx-1">•</span> MANAGEMENT CONSULTING <span className="text-slate-500 mx-1">•</span> FINANCIAL ADVISORY
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
            <Link href="/admin" className="hover:text-white transition-colors cursor-pointer">Client Portal</Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium">Global Practice: KSA &amp; UAE</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-[#0E1626]/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800 py-2.5"
            : "bg-white/90 dark:bg-[#0E1626]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0">
                <Image
                  src="/images/logo-symbol.png"
                  alt="Factual Solutions Symbol"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-[#152238] dark:text-white">
                    Factual Solutions
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase -mt-0.5">
                  Engineering &amp; Advisory
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = link.href === "/" 
                  ? pathname === "/" 
                  : (pathname === link.href || (link.href !== "/#methodology" && pathname.startsWith(link.href)));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 ${
                          isActive
                            ? "bg-[#EBF1FA] dark:bg-white/15 text-[#152238] dark:text-white shadow-xs font-bold"
                            : "text-slate-700 dark:text-slate-200 hover:text-[#A33C29] dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-[#A33C29]" : "text-slate-400"}`} />
                      </Link>

                      {/* Services Mega Dropdown */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[540px] rounded-2xl shadow-xl p-4 grid grid-cols-2 gap-3.5 animate-in fade-in slide-in-from-top-2 duration-200 border bg-white dark:bg-[#0E182A] border-slate-200 dark:border-slate-700/80 text-[#152238] dark:text-white">
                          <Link
                            href="/services?category=business"
                            className="p-3.5 rounded-xl transition-all border bg-[#F8FAFC] dark:bg-[#111C2E] border-slate-200/80 dark:border-slate-800 hover:border-[#8EA9D3] group/cat"
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-7 h-7 rounded-lg bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center group-hover/cat:bg-[#152238] group-hover/cat:text-white transition-colors">
                                <Briefcase className="w-3.5 h-3.5" />
                              </div>
                              <h4 className="font-bold text-xs text-[#152238] dark:text-white">Business Solutions</h4>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                              Market analysis, capital budgeting, business planning &amp; sales expansion.
                            </p>
                            <div className="mt-2 text-[11px] font-semibold text-[#A33C29] dark:text-brand-steel-light flex items-center gap-1 group-hover/cat:translate-x-1 transition-transform">
                              Explore Solutions <ArrowRight className="w-3 h-3" />
                            </div>
                          </Link>

                          <Link
                            href="/services?category=consultancy"
                            className="p-3.5 rounded-xl transition-all border bg-[#F8FAFC] dark:bg-[#111C2E] border-slate-200/80 dark:border-slate-800 hover:border-[#A33C29] group/cat"
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-7 h-7 rounded-lg bg-[#A33C29]/15 text-[#A33C29] dark:text-brand-rust-light flex items-center justify-center group-hover/cat:bg-[#A33C29] group-hover/cat:text-white transition-colors">
                                <Compass className="w-3.5 h-3.5" />
                              </div>
                              <h4 className="font-bold text-xs text-[#152238] dark:text-white">Consultancy Advisory</h4>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                              Management consulting, Lean Six Sigma, ERP transformation, and operational excellence.
                            </p>
                            <div className="mt-2 text-[11px] font-semibold text-[#A33C29] dark:text-brand-steel-light flex items-center gap-1 group-hover/cat:translate-x-1 transition-transform">
                              Explore Services <ArrowRight className="w-3 h-3" />
                            </div>
                          </Link>

                          <div className="col-span-2 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1 font-medium">
                              <Sparkles className="w-3 h-3 text-[#A33C29]" /> Need a tailored recommendation?
                            </span>
                            <Link href="/services#quiz" className="font-bold text-[#152238] dark:text-brand-steel-light hover:text-[#A33C29]">
                              Take 60-Sec Advisor Quiz →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#EBF1FA] dark:bg-white/15 text-[#152238] dark:text-white shadow-xs font-bold"
                        : "text-slate-700 dark:text-slate-200 hover:text-[#A33C29] dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: Language + Theme + CTA + User Avatar */}
            <div className="hidden lg:flex items-center gap-2 sm:gap-3">
              {/* Language Selector */}
              <CustomLanguageSelector />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[#152238] dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10"
                title={`Switch to ${isDark ? "Light Navy Mode" : "Dark Mode"}`}
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#152238]" />}
              </button>

              {/* Rust Consultation CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all duration-200 shadow-sm hover:shadow"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>

              {/* User / Profile Avatar Button */}
              <Link
                href="/admin"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#152238] text-white hover:bg-[#1E3150] transition-colors shadow-xs"
                title="Client / Admin Portal"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu & Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <CustomLanguageSelector />

              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#152238] dark:text-white bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#152238]" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-[#152238] dark:text-white bg-slate-100 dark:bg-white/10"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b shadow-2xl p-5 space-y-3 bg-white/95 dark:bg-[#0E1626]/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 text-[#152238] dark:text-white">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#EBF1FA] dark:bg-white/15 text-[#152238] dark:text-white font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:text-[#A33C29]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#A33C29] text-white font-bold text-xs shadow-sm"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
