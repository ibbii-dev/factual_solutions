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
            ? "bg-[#0B1320]/90 backdrop-blur-md shadow-lg border-b border-brand-steel/15 py-3.5"
            : "bg-[#152238]/90 backdrop-blur-md shadow-lg border-b border-brand-steel/25 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo at Top Left */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-light tracking-tight text-white">
                Factual
              </span>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white -mt-0.5">
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
                          ? "text-white font-semibold bg-white/15 shadow-sm"
                          : "text-slate-200 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-brand-rust-light" : "text-slate-300"}`} />
                    </Link>

                    {/* Services Mega Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 border bg-[#1C2E4A] dark:bg-[#0E182A] border-brand-steel/25 dark:border-slate-700/80 text-white">
                        {/* Business Category */}
                        <Link
                          href="/services?category=business"
                          className="group/cat p-4 rounded-xl transition-all border bg-[#152238] dark:bg-[#111C2E] border-brand-steel/20 dark:border-slate-800 hover:border-brand-steel/40"
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-steel/20 text-brand-steel-light flex items-center justify-center group-hover/cat:bg-brand-steel group-hover/cat:text-[#152238] transition-colors">
                              <Briefcase className="w-4 h-4" />
                            </div>
                            <h4 className="font-semibold text-sm text-white">Business Solutions</h4>
                          </div>
                          <p className="text-xs text-slate-300 dark:text-slate-400 line-clamp-2">
                            Market analysis, capital budgeting, business planning & commercial sales expansion.
                          </p>
                          <div className="mt-3 text-xs font-medium text-brand-steel-light flex items-center gap-1 group-hover/cat:text-brand-rust-light">
                            Explore 5 Services <ArrowRight className="w-3 h-3 group-hover/cat:translate-x-1 transition-transform" />
                          </div>
                        </Link>

                        {/* Consultancy Category */}
                        <Link
                          href="/services?category=consultancy"
                          className="group/cat p-4 rounded-xl transition-all border bg-[#152238] dark:bg-[#111C2E] border-brand-rust/30 dark:border-slate-800 hover:border-brand-rust/50"
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-rust/20 text-brand-rust-light flex items-center justify-center group-hover/cat:bg-brand-rust group-hover/cat:text-white transition-colors">
                              <Compass className="w-4 h-4" />
                            </div>
                            <h4 className="font-semibold text-sm text-white">Consultancy Services</h4>
                          </div>
                          <p className="text-xs text-slate-300 dark:text-slate-400 line-clamp-2">
                            Management consulting, Lean Six Sigma, ERP transformation, and operational excellence.
                          </p>
                          <div className="mt-3 text-xs font-medium text-brand-rust-light flex items-center gap-1">
                            Explore 5 Services <ArrowRight className="w-3 h-3 group-hover/cat:translate-x-1 transition-transform" />
                          </div>
                        </Link>

                        {/* Bottom Bar in Dropdown */}
                        <div className="col-span-2 pt-3 border-t border-brand-steel/15 dark:border-slate-800 flex items-center justify-between text-xs text-slate-300 dark:text-slate-400">
                          <span className="flex items-center gap-1 font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-brand-rust-light" /> Need a tailored recommendation?
                          </span>
                          <Link href="/services#quiz" className="font-semibold text-brand-steel-light hover:text-brand-rust-light">
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
                      ? "text-white font-semibold bg-white/15 shadow-sm"
                      : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-white bg-white/10 hover:bg-white/20 border border-white/10"
              title={`Switch to ${isDark ? "Logo Navy Blue Mode" : "Deep Midnight Blue Mode"}`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-steel-light" />}
            </button>

            {/* Request Consultation CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-all duration-200 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Request Consultation</span>
            </Link>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/10 border border-white/10"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-steel-light" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b shadow-2xl p-6 space-y-4 animate-in slide-in-from-top-5 duration-200 bg-[#152238] dark:bg-[#0B1320] border-brand-steel/20 dark:border-slate-800 text-white">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-brand-steel/15 dark:border-slate-800">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-rust text-white font-bold text-sm shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Consultation</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
