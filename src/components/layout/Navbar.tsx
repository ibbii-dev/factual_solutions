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
  PhoneCall,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isDark = theme === "dark";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? "bg-[#0B1320]/85 backdrop-blur-md shadow-lg border-b border-brand-steel/15 py-3.5"
            : "bg-white/85 backdrop-blur-md shadow-sm border-b border-brand-steel/15 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo at Top Left */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-light tracking-tight text-slate-900 dark:text-white">
                Factual
              </span>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white -mt-0.5">
                Solutions
              </span>
            </div>
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <Image
                src="/images/logo-symbol.png"
                alt="Factual Solutions 3D Symbol"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

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
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? isDark
                            ? "text-white font-semibold bg-white/10"
                            : "text-brand-navy font-semibold bg-brand-steel/15"
                          : isDark
                          ? "text-slate-300 hover:text-white hover:bg-white/5"
                          : "text-slate-700 hover:text-brand-navy hover:bg-slate-100/70"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-brand-rust" : "text-slate-400"}`} />
                    </Link>

                    {/* Services Mega Dropdown */}
                    {servicesDropdownOpen && (
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 border ${
                        isDark 
                          ? "bg-[#0E182A] border-slate-700/80 text-white" 
                          : "bg-white border-slate-100 text-slate-900"
                      }`}>
                        {/* Business Category */}
                        <Link
                          href="/services?category=business"
                          className={`group/cat p-4 rounded-xl transition-all border ${
                            isDark
                              ? "hover:bg-white/5 border-transparent hover:border-brand-steel/20"
                              : "hover:bg-gradient-to-br hover:from-brand-steel/10 hover:to-transparent border-transparent hover:border-brand-steel/20"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-steel/20 text-brand-steel-light flex items-center justify-center group-hover/cat:bg-brand-steel group-hover/cat:text-brand-navy transition-colors">
                              <Briefcase className="w-4 h-4" />
                            </div>
                            <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-brand-navy"}`}>Business Solutions</h4>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            Digital modernization, market expansion, operational efficiency & enterprise financial scaling.
                          </p>
                          <div className="mt-3 text-xs font-medium text-brand-steel-light flex items-center gap-1 group-hover/cat:text-brand-rust">
                            Explore 5 Services <ArrowRight className="w-3 h-3 group-hover/cat:translate-x-1 transition-transform" />
                          </div>
                        </Link>

                        {/* Consultancy Category */}
                        <Link
                          href="/services?category=consultancy"
                          className={`group/cat p-4 rounded-xl transition-all border ${
                            isDark
                              ? "hover:bg-white/5 border-transparent hover:border-brand-rust/20"
                              : "hover:bg-gradient-to-br hover:from-brand-rust/10 hover:to-transparent border-transparent hover:border-brand-rust/20"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-rust/20 text-brand-rust-light flex items-center justify-center group-hover/cat:bg-brand-rust group-hover/cat:text-white transition-colors">
                              <Compass className="w-4 h-4" />
                            </div>
                            <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-brand-navy"}`}>Consultancy Services</h4>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            Executive advisory, enterprise AI strategy, regulatory risk, and post-merger integration.
                          </p>
                          <div className="mt-3 text-xs font-medium text-brand-rust-light flex items-center gap-1">
                            Explore 5 Services <ArrowRight className="w-3 h-3 group-hover/cat:translate-x-1 transition-transform" />
                          </div>
                        </Link>

                        {/* Bottom Bar in Dropdown */}
                        <div className={`col-span-2 pt-3 border-t flex items-center justify-between text-xs ${
                          isDark ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"
                        }`}>
                          <span className="flex items-center gap-1 font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-brand-rust-light" /> Need a tailored recommendation?
                          </span>
                          <Link href="/services#quiz" className="font-semibold text-brand-steel-light hover:text-brand-rust">
                            Take 60-Sec Advisor Quiz &rarr;
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? "text-white font-semibold bg-white/10"
                        : "text-brand-navy font-semibold bg-brand-steel/15"
                      : isDark
                      ? "text-slate-300 hover:text-white hover:bg-white/5"
                      : "text-slate-700 hover:text-brand-navy hover:bg-slate-100/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons & Theme Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className={`p-2.5 rounded-full transition-all duration-300 border ${
                isDark
                  ? "bg-white/10 text-amber-300 border-white/15 hover:bg-white/20"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Midnight Navy Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-rust text-white text-sm font-semibold hover:bg-brand-rust-light transition-all duration-300 shadow-md shadow-brand-rust/20 hover:shadow-lg hover:shadow-brand-rust/35"
            >
              <span>Book Strategic Advisory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg ${isDark ? "text-amber-300 bg-white/10" : "text-slate-700 bg-slate-100"}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isDark ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden absolute top-full inset-x-0 border-b shadow-2xl p-5 space-y-4 max-h-[80vh] overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200 ${
          isDark ? "bg-[#0B1320] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-850"
        }`}>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-brand-rust text-white"
                      : isDark ? "text-slate-200 hover:bg-white/5" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-3 py-1.5 space-y-1">
                    <Link
                      href="/services?category=business"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-brand-steel-light rounded-lg"
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-steel shrink-0" /> Business Solutions
                    </Link>
                    <Link
                      href="/services?category=consultancy"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-brand-rust-light rounded-lg"
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-rust shrink-0" /> Consultancy Services
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-rust text-white text-xs font-bold shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
