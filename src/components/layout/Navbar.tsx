"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Moon,
  LogOut,
  FileText,
  Plus,
  ShieldCheck,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useUserAuth } from "@/context/UserAuthContext";
import CustomLanguageSelector from "@/components/CustomLanguageSelector";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal, logout } = useUserAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServicesMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Methodology", href: "/#methodology" },
    { name: "About FS", href: "/about" },
    { name: "Portals", href: user ? "/portal" : "/services" },
    { name: "Blog", href: "/blog" },
  ];

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Advisory Ribbon */}
      <div className="bg-[#152238] dark:bg-[#090F1A] text-slate-300 py-1.5 px-3 sm:px-4 text-[10px] sm:text-[11px] font-medium tracking-wider border-b border-white/10 select-none overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Indicator & Core Practice Areas */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29] animate-pulse shrink-0" />
            <span className="tracking-wider uppercase font-semibold text-slate-200 truncate">
              <span className="sm:hidden text-[9px] tracking-wide">FS ADVISORY &bull; FINANCIAL &bull; MANAGEMENT</span>
              <span className="hidden sm:inline">CORPORATE SOLUTIONS <span className="text-slate-500 mx-1">•</span> MANAGEMENT CONSULTING <span className="text-slate-500 mx-1">•</span> FINANCIAL ADVISORY</span>
            </span>
          </div>

          {/* Right: Portal Access & Global Practice */}
          <div className="flex items-center gap-2 sm:gap-4 text-slate-400 text-[10px] sm:text-[11px] shrink-0">
            {user ? (
              <Link href="/portal" className="text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate max-w-[85px] sm:max-w-none">Portal: {user.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <button onClick={() => openAuthModal("login")} className="text-[#8EA9D3] sm:text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer whitespace-nowrap">
                <span className="sm:hidden">Portal Sign In</span>
                <span className="hidden sm:inline">Client Portal Sign In</span>
              </button>
            )}
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-300 font-medium hidden md:inline">Global Practice: KSA &amp; UAE</span>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-[#0E1626]/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800 py-2 sm:py-2.5"
            : "bg-white/90 dark:bg-[#0E1626]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 py-2 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group select-none shrink min-w-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0">
                <Image
                  src="/images/logo-symbol.png"
                  alt="Factual Solutions Symbol"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#152238] dark:text-white truncate">
                    Factual Solutions
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase -mt-0.5 truncate">
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
                      onMouseEnter={handleServicesMouseEnter}
                      onMouseLeave={handleServicesMouseLeave}
                    >
                      <Link
                        href={link.href}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                          isActive
                            ? "bg-[#EBF1FA] dark:bg-white/15 text-[#152238] dark:text-white shadow-xs font-bold"
                            : "text-slate-700 dark:text-slate-200 hover:text-[#A33C29] dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-[#A33C29]" : "text-slate-400"}`} />
                      </Link>

                      {/* REDESIGNED SERVICES MEGA DROPDOWN */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] rounded-3xl shadow-2xl p-5 border bg-white/98 dark:bg-[#0C1424]/98 backdrop-blur-2xl border-slate-200 dark:border-slate-800 text-[#152238] dark:text-white z-50 overflow-hidden"
                          >
                            {/* Subtle internal gradient accent */}
                            <div className="absolute top-0 right-1/4 w-40 h-40 bg-[#8EA9D3]/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-10 w-40 h-40 bg-[#A33C29]/10 rounded-full blur-2xl pointer-events-none" />

                            <div className="relative z-10 grid grid-cols-2 gap-4">
                              
                              {/* 1. Business Solutions Card */}
                              <Link
                                href="/services?category=business"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="group/card p-4 rounded-2xl transition-all duration-200 border bg-[#FAFBFD] dark:bg-[#111C2E]/90 border-slate-200/80 dark:border-slate-800 hover:border-[#8EA9D3] hover:shadow-md flex flex-col justify-between"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="w-9 h-9 rounded-xl bg-[#152238] text-white flex items-center justify-center group-hover/card:scale-105 transition-transform shadow-xs">
                                      <Briefcase className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light uppercase">
                                      6 Practices
                                    </span>
                                  </div>

                                  <div>
                                    <h4 className="font-bold text-sm text-[#152238] dark:text-white group-hover/card:text-[#A33C29] transition-colors font-display">
                                      Business Solutions
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                      Market analysis, capital budgeting, financial modeling &amp; corporate revenue targets.
                                    </p>
                                  </div>

                                  {/* Sub-capability bullet shortcuts */}
                                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#8EA9D3]" />
                                      <span className="truncate">5-Year Financial Cash Flow Models</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#8EA9D3]" />
                                      <span className="truncate">Studies &amp; Feasibility Research</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#8EA9D3]" />
                                      <span className="truncate">Corporate Restructuring &amp; Turnaround</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 text-[11px] font-bold text-[#152238] dark:text-brand-steel-light flex items-center justify-between group-hover/card:text-[#A33C29]">
                                  <span>Explore Solutions</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                                </div>
                              </Link>

                              {/* 2. Consultancy Advisory Card */}
                              <Link
                                href="/services?category=consultancy"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="group/card p-4 rounded-2xl transition-all duration-200 border bg-[#FAFBFD] dark:bg-[#111C2E]/90 border-slate-200/80 dark:border-slate-800 hover:border-[#A33C29] hover:shadow-md flex flex-col justify-between"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="w-9 h-9 rounded-xl bg-[#A33C29] text-white flex items-center justify-center group-hover/card:scale-105 transition-transform shadow-xs">
                                      <Compass className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A33C29]/15 text-[#A33C29] dark:text-brand-rust-light uppercase">
                                      Management
                                    </span>
                                  </div>

                                  <div>
                                    <h4 className="font-bold text-sm text-[#152238] dark:text-white group-hover/card:text-[#A33C29] transition-colors font-display">
                                      Consultancy Advisory
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                      Strategic management, Lean Six Sigma, ERP transformation &amp; operational governance.
                                    </p>
                                  </div>

                                  {/* Sub-capability bullet shortcuts */}
                                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29]" />
                                      <span className="truncate">Strategic Planning &amp; OKR Audits</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29]" />
                                      <span className="truncate">Lean Six Sigma &amp; PMO Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29]" />
                                      <span className="truncate">ERP Transformation &amp; Workflows</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 text-[11px] font-bold text-[#A33C29] flex items-center justify-between">
                                  <span>Explore Services</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                                </div>
                              </Link>

                            </div>

                            {/* Bottom Callout Bar */}
                            <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/90 flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 text-[11px]">
                                <Sparkles className="w-3.5 h-3.5 text-[#A33C29]" /> Looking for immediate tailored diagnosis?
                              </span>
                              <Link
                                href="/services#quiz"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="font-bold text-xs text-white bg-[#152238] dark:bg-[#1A2A47] hover:bg-[#A33C29] px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-xs"
                              >
                                <span>Take 60-Sec Advisor Quiz</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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

            {/* Right Action Controls: Language + Theme + CTA + User Client Account */}
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>

              {/* USER CLIENT PORTAL BUTTON (Replaced Admin Icon) */}
              <div className="relative" ref={userMenuRef}>
                {user ? (
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-slate-100 dark:bg-[#15233A] border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-all text-xs font-semibold text-[#152238] dark:text-white shadow-xs"
                    title="Client Portal Account"
                  >
                    <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#152238] text-white flex items-center justify-center font-bold text-xs">
                      {user.avatar ? (
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <button
                    onClick={() => openAuthModal("login")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#15233A] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-[#152238] dark:text-white border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
                    title="Sign In to Client Portal"
                  >
                    <User className="w-3.5 h-3.5 text-[#A33C29]" />
                    <span>Sign In</span>
                  </button>
                )}

                {/* User Dropdown Menu */}
                {user && userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white dark:bg-[#0E182A] border border-slate-200 dark:border-slate-700 shadow-2xl p-3 z-50 text-[#152238] dark:text-white space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-xs truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/portal"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#FAFBFD] dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#A33C29]" />
                          <span>My Enquiries &amp; Status</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </Link>

                      <Link
                        href="/contact"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#FAFBFD] dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#8EA9D3]" />
                          <span>New Consultation</span>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Mobile Menu & Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
              <CustomLanguageSelector />

              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#152238] dark:text-white bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 shrink-0"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#152238]" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-[#152238] dark:text-white bg-slate-100 dark:bg-white/10 shrink-0"
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
        <div className="lg:hidden border-b shadow-2xl p-5 space-y-3 bg-white/98 dark:bg-[#0E1626]/98 backdrop-blur-xl border-slate-200 dark:border-slate-800 text-[#152238] dark:text-white">
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
            {user ? (
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#152238] text-white font-bold text-xs shadow-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Client Portal ({user.name.split(" ")[0]})</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal("login");
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#152238] dark:text-white font-bold text-xs"
              >
                <User className="w-3.5 h-3.5 text-[#A33C29]" />
                <span>Client Sign In</span>
              </button>
            )}

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
