"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandMark from "@/components/ui/BrandMark";
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

  // Header steps out of the way while reading down, returns as soon as you scroll up.
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrolled(y > 20);
        if (Math.abs(y - lastY) > 6) {
          setIsHidden(y > lastY && y > 160);
          lastY = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  const isDark = theme === "dark";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHidden && !mobileMenuOpen && !servicesDropdownOpen ? "-translate-y-full" : "translate-y-0"}`}>
      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-canvas/95 backdrop-blur-sm border-b border-ink/10 dark:border-white/10 py-2 sm:py-2.5"
            : "bg-canvas border-b border-ink/10 dark:border-white/10 py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Brand Logo */}
            <Link href="/" aria-label="Factual Solutions home" className="flex items-center gap-2.5 sm:gap-3 group select-none shrink min-w-0">
              <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 dark:bg-white dark:p-1 dark:rounded-sm">
                <BrandMark className="w-full h-full overflow-visible" />
              </span>
              <span className="fs-wordmark font-display text-[1.15rem] sm:text-[1.3rem] lg:text-[1.4rem] leading-none tracking-[-0.01em] text-ink dark:text-white truncate" translate="no" dir="ltr">
                <span className="font-normal">Factual </span>
                <span className="font-semibold">Solutions</span>
              </span>
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
                      className="relative"
                      onMouseEnter={handleServicesMouseEnter}
                      onMouseLeave={handleServicesMouseLeave}
                    >
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`fs-navlink relative px-3 py-2 text-[15px] transition-colors duration-200 flex items-center gap-1.5 ${
                          isActive ? "text-ink dark:text-white font-semibold" : "text-slate-500 hover:text-ink dark:text-slate-300 dark:hover:text-white"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-accent" : "text-slate-500 dark:text-slate-300"}`} />
                      </Link>

                      {/* SERVICES DROPDOWN */}
                      {servicesDropdownOpen && (
                          <div
                            className="fs-menu-in absolute top-full left-0 rtl:left-auto rtl:right-0 mt-3 w-[min(420px,calc(100vw-48px))] max-h-[calc(100vh-110px)] overflow-y-auto shadow-lg p-5 border bg-canvas dark:bg-night-850 border-ink/10 dark:border-white/15 text-slate-900 dark:text-white z-[100]"
                          >
                            <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/10">
                              {servicePillars.map((pillar) => {
                                return (
                                  <div key={pillar.id} className="py-2.5 first:pt-1">
                                    <Link
                                      href={`/services?line=${pillar.id}#${pillar.id}`}
                                      onClick={() => setServicesDropdownOpen(false)}
                                      className="group/head flex items-baseline gap-2.5 mb-2"
                                    >
                                      <span className="section-no text-xs">{String(servicePillars.indexOf(pillar) + 1).padStart(2, "0")}</span>
                                      <span className="font-display font-bold text-[15px] text-ink dark:text-white group-hover/head:text-accent transition-colors leading-tight">
                                        {pillar.title}
                                      </span>
                                    </Link>
                                    <ul className="flex flex-col ps-7">
                                      {allServiceItems.filter((s) => s.category === pillar.id).map((srv) => (
                                        <li key={srv.id}>
                                          <Link
                                            href={`/services/${srv.id}`}
                                            onClick={() => setServicesDropdownOpen(false)}
                                            className="block py-1 text-[13px] text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white hover:underline underline-offset-4 transition-colors"
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
                                className="link-arrow text-xs text-ink dark:text-white"
                              >
                                <span>{language === "ar" ? "ساعدني في الاختيار" : "Help Me Choose"}</span>
                                <ArrowRight className="w-3 h-3 rtl:rotate-180" />
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
                    aria-current={isActive ? "page" : undefined}
                    className={`fs-navlink relative px-3 py-2 text-[15px] transition-colors duration-200 ${
                      isActive ? "text-ink dark:text-white font-semibold" : "text-slate-500 hover:text-ink dark:text-slate-300 dark:hover:text-white"
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
                className="w-8 h-8 flex items-center justify-center transition-colors text-slate-600 hover:text-ink dark:text-slate-300 dark:hover:text-white"
                title={`Switch to ${isDark ? "Light Mode" : "Dark Mode"}`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Rust Consultation CTA */}
              <Link
                href="/contact"
                className="fs-btn fs-btn-navy !min-h-[44px] !px-5 !text-[14px]"
              >
                <span>{language === "ar" ? "طلب استشارة" : "Request Consultation"}</span>
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
                        <Image sizes="40px" src={user.avatar} alt={user.name} fill className="object-cover" />
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
                    className="inline-flex items-center gap-1.5 py-1.5 text-[13px] font-medium text-slate-600 hover:text-ink dark:text-slate-300 dark:hover:text-white transition-colors"
                    title={language === "ar" ? "تسجيل الدخول" : "Sign In"}
                  >
                    <span>{language === "ar" ? "تسجيل الدخول" : "Sign in"}</span>
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
                          <span>{language === "ar" ? "طلب استشارة" : "Request Consultation"}</span>
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
                        <span>{language === "ar" ? "تسجيل الخروج" : "Sign Out"}</span>
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
                className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-ink dark:text-white shrink-0"
                aria-label={language === "ar" ? "القائمة" : "Toggle Menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b p-5 space-y-3 bg-canvas dark:bg-night-900 border-ink/10 dark:border-white/15 text-slate-900 dark:text-white max-h-[calc(100vh-70px)] overflow-y-auto">
          <div className="flex flex-col divide-y divide-ink/10 dark:divide-white/10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3 font-display text-lg font-bold transition-colors ${
                pathname === "/"
                  ? "text-accent"
                  : "text-ink dark:text-white hover:text-accent"
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
                  className={`py-3 font-display text-lg font-bold transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-ink dark:text-white hover:text-accent"
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
                <span>{language === "ar" ? "دخول العملاء" : "Client Sign In"}</span>
              </button>
            )}

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="fs-btn fs-btn-navy w-full"
            >
              <span>{language === "ar" ? "طلب استشارة" : "Request Consultation"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
