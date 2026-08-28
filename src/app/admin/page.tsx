"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  getInquiries, 
  updateInquiryStatus, 
  deleteInquiry, 
  saveInquiry,
  Inquiry 
} from "@/data/inquiriesStore";
import { 
  Users, 
  Mail, 
  Phone, 
  Building2, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  Download, 
  Plus, 
  Eye, 
  X,
  ShieldCheck,
  RefreshCw,
  Lock,
  LogOut,
  KeyRound,
  ExternalLink
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInquiryData, setNewInquiryData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    phone: "",
    serviceOfInterest: "Business Growth & Sales Optimization",
    message: ""
  });

  // Check login session on load
  useEffect(() => {
    const session = sessionStorage.getItem("factual_admin_logged_in");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const loadData = () => {
    setInquiries(getInquiries());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("factual_admin_logged_in", "true");
        setAuthError("");
        return;
      }
    } catch (err) {
      console.error("Auth API error:", err);
    }

    if (
      (authEmail.toLowerCase().trim() === "admin@factual-solutions.com" || authEmail.toLowerCase().trim() === "admin") &&
      (authPassword === "admin123" || authPassword === "factual2026" || authPassword === "admin")
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("factual_admin_logged_in", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. Use admin@factual-solutions.com / admin123");
    }
  };

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("factual_admin_logged_in", "true");
    setAuthError("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("factual_admin_logged_in");
  };

  const handleStatusChange = (id: string, newStatus: Inquiry["status"]) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this inquiry?")) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const handleAddInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiryData.fullName || !newInquiryData.workEmail) return;
    saveInquiry(newInquiryData);
    setNewInquiryData({
      fullName: "",
      workEmail: "",
      companyName: "",
      phone: "",
      serviceOfInterest: "Business Growth & Sales Optimization",
      message: ""
    });
    setShowAddModal(false);
    loadData();
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Email,Company,Phone,Service,Status,Date,Message\n";
    const rows = inquiries.map(i => 
      `"${i.id}","${i.fullName}","${i.workEmail}","${i.companyName}","${i.phone}","${i.serviceOfInterest}","${i.status}","${i.date}","${i.message.replace(/"/g, '""')}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `factual_inquiries_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      inq.fullName.toLowerCase().includes(query) ||
      inq.companyName.toLowerCase().includes(query) ||
      inq.workEmail.toLowerCase().includes(query) ||
      inq.serviceOfInterest.toLowerCase().includes(query) ||
      inq.id.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter(i => i.status === "New").length;
  const inProgressCount = inquiries.filter(i => i.status === "In Progress").length;
  const contactedCount = inquiries.filter(i => i.status === "Contacted").length;

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080D16] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#101826] border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-3">
            <div className="relative w-12 h-12 mx-auto">
              <Image
                src="/images/logo-symbol.png"
                alt="Factual Solutions Symbol"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Inquiries Portal</h1>
              <p className="text-xs text-slate-400 mt-1">
                Factual Solutions Management & Consultation Portal
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Administrator Email</label>
              <input
                type="text"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@factual-solutions.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-steel transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Security Password / PIN</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-steel transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-all shadow-md shadow-brand-rust/20 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Admin Portal</span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5 text-brand-steel-light" />
              <span>One-Click Quick Access (Demo)</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-800/80">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-[#080D16] text-slate-100 font-sans pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Bar Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/images/logo-symbol.png"
                alt="Factual Solutions Symbol"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Factual Solutions <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-rust/20 text-brand-rust-light border border-brand-rust/30">Admin Portal</span>
              </h1>
              <p className="text-xs text-slate-400">
                Direct client inquiries & consultation lead management
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadData}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              New Inquiry
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-red-800/40"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#101826] p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Inquiries</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalCount}</div>
            <div className="text-[11px] text-slate-500">All recorded client leads</div>
          </div>

          <div className="bg-[#101826] p-5 rounded-2xl border border-amber-500/30 shadow-sm space-y-1">
            <div className="text-xs font-medium text-amber-400 uppercase tracking-wider">New / Uncontacted</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{newCount}</div>
            <div className="text-[11px] text-amber-400/70">Awaiting initial callback</div>
          </div>

          <div className="bg-[#101826] p-5 rounded-2xl border border-sky-500/30 shadow-sm space-y-1">
            <div className="text-xs font-medium text-brand-steel-light uppercase tracking-wider">In Progress</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-steel-light">{inProgressCount}</div>
            <div className="text-[11px] text-slate-500">Under diagnostic review</div>
          </div>

          <div className="bg-[#101826] p-5 rounded-2xl border border-emerald-500/30 shadow-sm space-y-1">
            <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Contacted / Closed</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{contactedCount}</div>
            <div className="text-[11px] text-emerald-400/70">Followed up with client</div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-[#101826] p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-steel"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {["All", "New", "In Progress", "Contacted", "Closed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === status
                    ? "bg-brand-rust text-white shadow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* Inquiries Table */}
        <div className="bg-[#101826] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Client & Company</th>
                  <th className="px-5 py-3.5">Service Requested</th>
                  <th className="px-5 py-3.5">Contact Info</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Name & Company */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-sm">{inq.fullName}</div>
                        <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{inq.companyName || "Independent"}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{inq.id}</div>
                      </td>

                      {/* Service */}
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] font-medium text-slate-200">
                          {inq.serviceOfInterest}
                        </span>
                      </td>

                      {/* Contact Info */}
                      <td className="px-5 py-4 space-y-1">
                        <a
                          href={`mailto:${inq.workEmail}`}
                          className="text-brand-steel-light hover:underline flex items-center gap-1.5"
                        >
                          <Mail className="w-3 h-3 shrink-0" />
                          <span>{inq.workEmail}</span>
                        </a>
                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone.replace(/\s+/g, '')}`}
                            className="text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                          >
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>{inq.phone}</span>
                          </a>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                        {inq.date}
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as Inquiry["status"])}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none transition-colors ${
                            inq.status === "New"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : inq.status === "In Progress"
                              ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                              : inq.status === "Contacted"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          <option value="New" className="bg-slate-900 text-white">New</option>
                          <option value="In Progress" className="bg-slate-900 text-white">In Progress</option>
                          <option value="Contacted" className="bg-slate-900 text-white">Contacted</option>
                          <option value="Closed" className="bg-slate-900 text-white">Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500">
                      No inquiries match your current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#101826] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{selectedInquiry.id}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedInquiry.fullName}</h3>
                <p className="text-xs text-slate-400">{selectedInquiry.companyName} • Received {selectedInquiry.date}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
              <div>
                <div className="text-slate-500 font-medium">Email Address</div>
                <div className="text-white font-semibold mt-0.5">{selectedInquiry.workEmail}</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Phone Number</div>
                <div className="text-white font-semibold mt-0.5">{selectedInquiry.phone || "Not provided"}</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Service Practice</div>
                <div className="text-brand-steel-light font-semibold mt-0.5">{selectedInquiry.serviceOfInterest}</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Current Status</div>
                <div className="text-brand-rust-light font-semibold mt-0.5">{selectedInquiry.status}</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Inquiry Message / Context</label>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-normal">
                {selectedInquiry.message || "No additional message provided."}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Mark Status:</span>
                {(["New", "In Progress", "Contacted", "Closed"] as Inquiry["status"][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      selectedInquiry.status === st
                        ? "bg-brand-rust text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <a
                href={`mailto:${selectedInquiry.workEmail}?subject=Factual Solutions: Follow-up regarding ${encodeURIComponent(selectedInquiry.serviceOfInterest)}`}
                className="px-4 py-2 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add New Inquiry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#101826] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Record New Client Inquiry</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddInquiry} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newInquiryData.fullName}
                    onChange={(e) => setNewInquiryData({ ...newInquiryData, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1 focus:outline-none focus:border-brand-steel"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Email *</label>
                  <input
                    type="email"
                    required
                    value={newInquiryData.workEmail}
                    onChange={(e) => setNewInquiryData({ ...newInquiryData, workEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1 focus:outline-none focus:border-brand-steel"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Company Name</label>
                  <input
                    type="text"
                    value={newInquiryData.companyName}
                    onChange={(e) => setNewInquiryData({ ...newInquiryData, companyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1 focus:outline-none focus:border-brand-steel"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Phone</label>
                  <input
                    type="tel"
                    value={newInquiryData.phone}
                    onChange={(e) => setNewInquiryData({ ...newInquiryData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1 focus:outline-none focus:border-brand-steel"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Service Area</label>
                <input
                  type="text"
                  value={newInquiryData.serviceOfInterest}
                  onChange={(e) => setNewInquiryData({ ...newInquiryData, serviceOfInterest: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1 focus:outline-none focus:border-brand-steel"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Inquiry Message</label>
                <textarea
                  rows={3}
                  value={newInquiryData.message}
                  onChange={(e) => setNewInquiryData({ ...newInquiryData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1 focus:outline-none focus:border-brand-steel"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-rust text-white text-xs font-bold"
                >
                  Save Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
