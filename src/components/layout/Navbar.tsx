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
  CheckCircle2,
  Layers,
  Cpu
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useUserAuth } from "@/context/UserAuthContext";
import { useLanguage } from "@/context/LanguageContext";
import CustomLanguageSelector from "@/components/CustomLanguageSelector";
import { getServicePillars, getServices } from "@/data/servicesData";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal, logout } = useUserAuth();
  const { language } = useLanguage();
  
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
    { 
      name: language === "ar" ? "ما نقوم به" : "What we do", 
      href: "/services", 
      dropdownType: "services" as const
    },
    { 
      name: language === "ar" ? "رؤيتنا" : "What we think", 
      href: "/what-we-think",
      dropdownType: null 
    },
    { 
      name: language === "ar" ? "من نحن" : "Who we are", 
      href: "/about", 
      dropdownType: null 
    },
    { 
      name: language === "ar" ? "المدونة" : "Blog", 
      href: "/blog",
      dropdownType: null 
    },
  ];

  const servicePillars = getServicePillars(language);
  const allServiceItems = getServices(language);
  const pillarIcons = { consulting: Briefcase, training: Compass, digital: Cpu } as const;
  const pillarColors = { consulting: "#1F3A7D", training: "#5E86C4", digital: "#A2351E" } as const;

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Logo tri-color hairline */}
      <div className="h-[3px] w-full bg-brand-tri" aria-hidden="true" />
      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-night-900/90 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(14,26,56,0.18)] border-b border-slate-200/80 dark:border-white/10 py-2 sm:py-2.5"
            : "bg-white/60 dark:bg-night-900/50 backdrop-blur-md border-b border-transparent py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group select-none shrink min-w-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0 dark:bg-white dark:rounded-lg dark:ring-4 dark:ring-white">
                <Image
                  src="/images/logo-symbol.png"
                  alt="Factual Solutions Symbol"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <div className="flex items-baseline gap-1 font-display">
                  <span className="text-sm sm:text-base lg:text-lg font-medium tracking-tight text-ink dark:text-slate-200 truncate">
                    Factual
                  </span>
                  <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-navy dark:text-white truncate">
                    Solutions
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.14em] text-slate-500 dark:text-steel-light/80 uppercase mt-0.5 truncate max-w-[150px] xs:max-w-[200px] sm:max-w-none">
                  {language === "ar" ? "شركاؤكم في التميز المؤسسي" : "Your Business Excellence Partners"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = link.href === "/" 
                  ? pathname === "/" 
                  : (pathname === link.href || pathname.startsWith(link.href));

                if (link.dropdownType === "services") {
                  return (
                    <div
                      key={link.name}
                      onMouseEnter={handleServicesMouseEnter}
                      onMouseLeave={handleServicesMouseLeave}
                    >
                      <Link
                        href={link.href}
                        className={`relative px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                          isActive
                            ? "text-navy dark:text-white bg-navy/[0.06] dark:bg-white/10 font-bold after:absolute after:left-3.5 after:right-3.5 after:-bottom-[5px] after:h-[2px] after:rounded-full after:bg-rust"
                            : "text-slate-600 hover:text-navy hover:bg-navy/[0.04] dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-accent" : "text-slate-500 dark:text-slate-300"}`} />
                      </Link>

                      {/* SERVICES DROPDOWN */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, x: "-50%", y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: "-50%", y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 mt-0 w-[min(860px,calc(100vw-48px))] rounded-2xl shadow-lift p-4 border bg-white dark:bg-night-850 border-slate-200 dark:border-white/20 text-slate-900 dark:text-white z-[100] overflow-hidden"
                          >
                            <div className="grid grid-cols-3 gap-3">
                              {servicePillars.map((pillar) => {
                                const IconComp = pillarIcons[pillar.id];
                                return (
                                  <div key={pillar.id} className="rounded-xl p-2">
                                    <Link
                                      href={`/services?line=${pillar.id}#${pillar.id}`}
                                      onClick={() => setServicesDropdownOpen(false)}
                                      className="group/head flex items-center gap-2.5 mb-2 px-1"
                                    >
                                      <span className="w-8 h-8 rounded-lg text-white flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: pillarColors[pillar.id] }}>
                                        <IconComp className="w-4 h-4" />
                                      </span>
                                      <span className="font-extrabold text-[13px] text-ink dark:text-white group-hover/head:text-accent transition-colors leading-tight">
                                        {pillar.title}
                                      </span>
                                    </Link>
                                    <ul className="space-y-0.5">
                                      {allServiceItems.filter((s) => s.category === pillar.id).map((srv) => (
                                        <li key={srv.id}>
                                          <Link
                                            href={`/services/${srv.id}`}
                                            onClick={() => setServicesDropdownOpen(false)}
                                            className="block px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-white hover:bg-navy-50 dark:hover:bg-white/10 transition-colors"
                                          >
                                            {srv.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Bottom Callout Bar */}
                            <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs px-1">
                              <Link
                                href="/services"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="flex items-center gap-1.5 font-bold text-accent hover:underline text-xs"
                              >
                                <span>{language === "ar" ? "عرض جميع الخدمات" : "View All Services"}</span>
                                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                              </Link>
                              <Link
                                href="/services#quiz"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="font-bold text-xs text-slate-800 dark:text-white bg-slate-100 hover:bg-rust hover:text-white dark:bg-white/15 dark:hover:bg-rust px-3 py-1 rounded-full transition-colors flex items-center gap-1 shadow-xs border border-slate-200 dark:border-white/20"
                              >
                                <span>{language === "ar" ? "ساعدني في الاختيار" : "Help Me Choose"}</span>
                                <ArrowRight className="w-3 h-3 rtl:rotate-180" />
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
                    className={`relative px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-navy dark:text-white bg-navy/[0.06] dark:bg-white/10 font-bold after:absolute after:left-3.5 after:right-3.5 after:-bottom-[5px] after:h-[2px] after:rounded-full after:bg-rust"
                        : "text-slate-600 hover:text-navy hover:bg-navy/[0.04] dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
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
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-slate-700 dark:text-white bg-white hover:bg-navy-50 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15"
                title={`Switch to ${isDark ? "Light Mode" : "Dark Mode"}`}
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-steel-light" /> : <Moon className="w-3.5 h-3.5 text-navy" />}
              </button>

              {/* Rust Consultation CTA */}
              <Link
                href="/contact"
                className="btn-sheen inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-rust hover:bg-rust-dark text-white text-xs font-bold transition-all duration-200 shadow-cta hover:-translate-y-px active:translate-y-0"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>

              {/* USER CLIENT PORTAL BUTTON */}
              <div className="relative" ref={userMenuRef}>
                {user ? (
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/35 transition-all text-xs font-semibold text-slate-800 dark:text-white shadow-xs"
                    title="Client Account"
                  >
                    <div className="relative w-7 h-7 rounded-full overflow-hidden bg-rust text-white flex items-center justify-center font-bold text-xs">
                      {user.avatar ? (
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="max-w-[80px] truncate text-slate-800 dark:text-white">{user.name.split(" ")[0]}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-500 dark:text-slate-300 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <button
                    onClick={() => openAuthModal("login")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 hover:bg-navy-50 dark:hover:bg-white/10 text-xs font-bold text-ink dark:text-white border border-slate-200 dark:border-white/15 transition-colors"
                    title="Sign In"
                  >
                    <User className="w-3.5 h-3.5 text-navy dark:text-steel" />
                    <span>Sign In</span>
                  </button>
                )}

                {/* User Dropdown Menu */}
                {user && userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white/95 dark:bg-night-900/95 backdrop-blur-2xl border border-slate-200 dark:border-white/20 shadow-2xl p-3 z-50 text-slate-800 dark:text-white space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 border-b border-slate-100 dark:border-white/10">
                      <div className="font-bold text-xs truncate text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-300 truncate">{user.email}</div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/contact"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-accent" />
                          <span>Request Consultation</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-300" />
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-white/10">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
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
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-700 dark:text-white bg-white hover:bg-navy-50 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 shrink-0"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-steel-light" /> : <Moon className="w-3.5 h-3.5 text-navy" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-slate-800 dark:text-white bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-white/20 shadow-xs shrink-0"
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
        <div className="lg:hidden border-b shadow-lift p-5 space-y-3 bg-white dark:bg-night-900 backdrop-blur-2xl border-slate-200 dark:border-white/20 text-slate-900 dark:text-white max-h-[calc(100vh-70px)] overflow-y-auto">
          <div className="flex flex-col space-y-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "bg-navy/[0.06] text-navy dark:bg-white/10 dark:text-white font-bold border-s-[3px] border-rust"
                  : "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10"
              }`}
            >
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-navy/[0.06] text-navy dark:bg-white/10 dark:text-white font-bold border-s-[3px] border-rust"
                      : "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-800 dark:text-white">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span className="font-bold text-slate-900 dark:text-white">{user.name.split(" ")[0]}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="font-bold text-rose-500 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal("login");
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white font-bold text-xs shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-accent" />
                <span>Client Sign In</span>
              </button>
            )}

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rust hover:bg-rust-dark text-white font-bold text-sm shadow-cta"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
