"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ExternalLink, 
  Database,
  Send,
  MessageSquare,
  Bot,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Activity,
  AlertCircle,
  Copy,
  ChevronRight,
  TrendingUp,
  FileText,
  BookOpen,
  Edit3,
  Star,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote
} from "lucide-react";
import { IInquiry, IInquiryReply, IBlogPost } from "@/models";

interface Subscriber {
  _id?: string;
  email: string;
  source?: string;
  subscribedAt: string;
  isActive?: boolean;
}

interface ChatLog {
  _id?: string;
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  leadCaptured?: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"inquiries" | "subscribers" | "chatlogs" | "blog" | "system">("inquiries");

  // Blog Management State
  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogStatusFilter, setBlogStatusFilter] = useState<string>("all");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>("All");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogEditorTab, setBlogEditorTab] = useState<"edit" | "preview">("edit");
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [blogFeedback, setBlogFeedback] = useState("");

  const initialBlogForm = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    category: "Strategic Management",
    authorName: "Ahsan Malik",
    authorRole: "Managing Director & Principal Consultant",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    readTime: "5 min read",
    tags: "Strategy, Restructuring, Advisory",
    status: "published" as "published" | "draft",
    featured: false
  };

  const [blogFormData, setBlogFormData] = useState(initialBlogForm);

  // Inquiries State
  const [inquiries, setInquiries] = useState<IInquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<IInquiry | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Reply Composer State inside selected inquiry modal
  const [replyText, setReplyText] = useState("");
  const [replyChannel, setReplyChannel] = useState<"Email" | "WhatsApp" | "Internal Note">("Email");
  const [replyAuthor, setReplyAuthor] = useState("Managing Partner");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState("");

  // New Inquiry Form
  const [newInquiryData, setNewInquiryData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    phone: "",
    serviceOfInterest: "Strategic Management Consulting",
    message: ""
  });

  // Subscribers State
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subSearchQuery, setSubSearchQuery] = useState("");
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);

  // Chat Logs State
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [isLoadingChatLogs, setIsLoadingChatLogs] = useState(false);

  // System Diagnostics State
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  // Check login session on mount
  useEffect(() => {
    const session = sessionStorage.getItem("factual_admin_logged_in");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch live inquiries from MongoDB Atlas
  const loadInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error("Error loading inquiries from Atlas:", err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  // Fetch live subscribers from MongoDB Atlas
  const loadSubscribers = async () => {
    setIsLoadingSubscribers(true);
    try {
      const res = await fetch("/api/newsletter");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setSubscribers(json.data);
      }
    } catch (err) {
      console.error("Error loading subscribers:", err);
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  // Fetch live chat logs from MongoDB Atlas
  const loadChatLogs = async () => {
    setIsLoadingChatLogs(true);
    try {
      const res = await fetch("/api/admin/chat-logs");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setChatLogs(json.data);
      }
    } catch (err) {
      console.error("Error loading chat logs:", err);
    } finally {
      setIsLoadingChatLogs(false);
    }
  };

  // Check cluster health
  const checkHealth = async () => {
    try {
      const res = await fetch("/api/health");
      const json = await res.json();
      setDbStatus(json);
    } catch (err) {
      console.error("Health check error:", err);
    }
  };

  // Fetch live blog posts from MongoDB Atlas
  const loadBlogPosts = async () => {
    setIsLoadingBlog(true);
    try {
      const res = await fetch("/api/blog?all=true");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBlogPosts(json.data);
      }
    } catch (err) {
      console.error("Error loading blog posts:", err);
    } finally {
      setIsLoadingBlog(false);
    }
  };

  const handleOpenNewBlogModal = () => {
    setEditingPostId(null);
    setBlogFormData(initialBlogForm);
    setBlogEditorTab("edit");
    setBlogFeedback("");
    setShowBlogModal(true);
  };

  const handleOpenEditBlogModal = (post: IBlogPost) => {
    setEditingPostId(post.id);
    setBlogFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      coverImage: post.coverImage || "",
      category: post.category || "Strategic Management",
      authorName: post.author?.name || "Executive Team",
      authorRole: post.author?.role || "Principal Consultant",
      authorAvatar: post.author?.avatar || "",
      readTime: post.readTime || "5 min read",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : (post.tags || ""),
      status: post.status,
      featured: Boolean(post.featured)
    });
    setBlogEditorTab("edit");
    setBlogFeedback("");
    setShowBlogModal(true);
  };

  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFormData.title.trim() || !blogFormData.content.trim()) {
      setBlogFeedback("Title and content are required.");
      return;
    }

    setIsSavingBlog(true);
    setBlogFeedback("");
    try {
      const payload = {
        title: blogFormData.title,
        slug: blogFormData.slug,
        excerpt: blogFormData.excerpt,
        content: blogFormData.content,
        coverImage: blogFormData.coverImage,
        category: blogFormData.category,
        author: {
          name: blogFormData.authorName,
          role: blogFormData.authorRole,
          avatar: blogFormData.authorAvatar
        },
        readTime: blogFormData.readTime,
        tags: blogFormData.tags.split(",").map((s) => s.trim()).filter(Boolean),
        status: blogFormData.status,
        featured: blogFormData.featured
      };

      let res;
      if (editingPostId) {
        res = await fetch(`/api/blog/${editingPostId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const json = await res.json();
      if (json.success) {
        await loadBlogPosts();
        setShowBlogModal(false);
      } else {
        setBlogFeedback(json.message || "Failed to save article.");
      }
    } catch (err: any) {
      setBlogFeedback(err.message || "Network error saving article.");
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleToggleBlogStatus = async (post: IBlogPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      const json = await res.json();
      if (json.success) {
        setBlogPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: nextStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleToggleBlogFeatured = async (post: IBlogPost) => {
    const nextFeatured = !post.featured;
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: nextFeatured })
      });
      const json = await res.json();
      if (json.success) {
        setBlogPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, featured: nextFeatured } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle featured:", err);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const insertMarkdownInContent = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("blogContentTextarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = blogFormData.content;
    const selected = currentText.substring(start, end) || "Insert text here";
    const replacement = `${prefix}${selected}${suffix}`;

    const newContent = currentText.substring(0, start) + replacement + currentText.substring(end);
    setBlogFormData({ ...blogFormData, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const handleScaffoldOutline = () => {
    const template = `## Executive Overview & Problem Statement
Outline the core strategic challenge faced by mid-market or enterprise leadership in this domain.

### 1. Root Cause Diagnostic
Analyze the fundamental organizational, financial, or market inefficiencies causing friction:
- Inefficient capital deployment or misallocated operational overhead
- Lack of visibility into departmental unit economics
- Fragmented execution governance across functional teams

> "A precise strategic thesis executed decisively always outperforms broad generalizations."

### 2. Implementation Methodology & Action Roadmap
Detail the tactical 3-phase consulting framework applied:
1. **Discovery & Benchmarking**: Quantitative audit of current baselines.
2. **Model Engineering & Scenario Stress-Testing**: Formulate probabilistic outcomes.
3. **Execution Enablement**: War-room governance, KPI dashboards, and team alignment.

### 3. Projected Commercial Returns & Governance
Summarize expected EBITDA improvements, working capital cycle velocity, and risk mitigation protocols.`;

    if (!blogFormData.content || confirm("Replace editor content with Executive Article Template?")) {
      setBlogFormData({ ...blogFormData, content: template });
    }
  };

  // Load appropriate data when tab or auth changes
  useEffect(() => {
    if (isAuthenticated) {
      checkHealth();
      loadBlogPosts(); // pre-load to show count in tab badge
      if (activeTab === "inquiries") loadInquiries();
      if (activeTab === "subscribers") loadSubscribers();
      if (activeTab === "chatlogs") loadChatLogs();
      if (activeTab === "blog") loadBlogPosts();
      if (activeTab === "system") {
        checkHealth();
        loadInquiries();
      }
    }
  }, [isAuthenticated, activeTab]);

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

  // Status Change handler
  const handleStatusChange = async (id: string, newStatus: IInquiry["status"]) => {
    setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }

    try {
      await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this inquiry from MongoDB Atlas?")) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }

      try {
        await fetch(`/api/inquiries/${id}`, {
          method: "DELETE"
        });
      } catch (err) {
        console.error("Failed to delete inquiry:", err);
      }
    }
  };

  // Add Manual Inquiry
  const handleAddInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiryData.fullName || !newInquiryData.workEmail) return;

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiryData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setInquiries((prev) => [data.data, ...prev]);
        setShowAddModal(false);
        setNewInquiryData({
          fullName: "",
          workEmail: "",
          companyName: "",
          phone: "",
          serviceOfInterest: "Strategic Management Consulting",
          message: ""
        });
      }
    } catch (err) {
      console.error("Failed to add inquiry:", err);
    }
  };

  // Send / Record Reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !replyText.trim() || isSendingReply) return;

    setIsSendingReply(true);
    setReplyFeedback("");

    try {
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: replyAuthor,
          content: replyText,
          channel: replyChannel
        })
      });

      const data = await res.json();

      if (data.success) {
        setReplyFeedback(`✅ Reply logged & status updated to Contacted.`);
        
        // Append reply locally in selected inquiry
        const updatedReplies = [...(selectedInquiry.replies || []), data.reply];
        const updatedInquiry = { ...selectedInquiry, replies: updatedReplies, status: "Contacted" as const };
        
        setSelectedInquiry(updatedInquiry);
        setInquiries((prev) => prev.map((inq) => (inq.id === selectedInquiry.id ? updatedInquiry : inq)));
        setReplyText("");

        // If WhatsApp, automatically open link
        if (replyChannel === "WhatsApp" && data.whatsappUrl) {
          window.open(data.whatsappUrl, "_blank");
        } else if (replyChannel === "Email") {
          // Open client's email in default mail app as well
          const mailto = `mailto:${selectedInquiry.workEmail}?subject=${encodeURIComponent(`Factual Solutions Advisory: Consultation Response (#${selectedInquiry.id})`)}&body=${encodeURIComponent(replyText)}`;
          window.location.href = mailto;
        }
      } else {
        setReplyFeedback(`⚠️ ${data.message}`);
      }
    } catch (err: any) {
      setReplyFeedback(`❌ Error: ${err.message}`);
    } finally {
      setIsSendingReply(false);
      setTimeout(() => setReplyFeedback(""), 5000);
    }
  };

  // Use AI Recommended Draft
  const handleUseAiDraft = () => {
    if (selectedInquiry?.aiAssessment?.autoReplyEmailBody) {
      setReplyText(selectedInquiry.aiAssessment.autoReplyEmailBody);
      setReplyChannel("Email");
    }
  };

  // Resync Atlas Database
  const handleSyncAtlas = async () => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSyncMessage(`✅ Atlas Synced: ${JSON.stringify(data.collectionsCreated)}`);
        loadInquiries();
        checkHealth();
      } else {
        setSyncMessage(`⚠️ ${data.message}`);
      }
    } catch (err: any) {
      setSyncMessage(`❌ Error: ${err.message}`);
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncMessage(""), 6000);
    }
  };

  // Export Inquiries to CSV
  const handleExportCSV = () => {
    const headers = "ID,Name,Email,Company,Phone,Service,Status,Priority,Date,RepliesCount,Message\n";
    const rows = inquiries.map(i => 
      `"${i.id}","${i.fullName}","${i.workEmail}","${i.companyName || ''}","${i.phone || ''}","${i.serviceOfInterest}","${i.status}","${i.priority}","${i.date}","${i.replies?.length || 0}","${(i.message || '').replace(/"/g, '""')}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `factual_inquiries_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Subscribers to CSV
  const handleExportSubscribersCSV = () => {
    const headers = "Email,Source,SubscribedAt,Status\n";
    const rows = subscribers.map(s => 
      `"${s.email}","${s.source || 'Website'}","${s.subscribedAt}","${s.isActive ? 'Active' : 'Inactive'}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `factual_subscribers_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered queries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      inq.fullName?.toLowerCase().includes(query) ||
      inq.companyName?.toLowerCase().includes(query) ||
      inq.workEmail?.toLowerCase().includes(query) ||
      inq.serviceOfInterest?.toLowerCase().includes(query) ||
      inq.id?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter((s) => 
    s.email.toLowerCase().includes(subSearchQuery.toLowerCase())
  );

  // Filtered blog posts
  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesStatus =
      blogStatusFilter === "all" || post.status === blogStatusFilter;
    const matchesCategory =
      blogCategoryFilter === "All" ||
      post.category.toLowerCase() === blogCategoryFilter.toLowerCase();
    const query = blogSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query) ||
      post.author?.name?.toLowerCase().includes(query) ||
      post.tags?.some((t) => t.toLowerCase().includes(query));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalBlogCount = blogPosts.length;
  const publishedBlogCount = blogPosts.filter(p => p.status === "published").length;
  const draftBlogCount = blogPosts.filter(p => p.status === "draft").length;
  const featuredBlogCount = blogPosts.filter(p => p.featured).length;

  // Counts
  const totalCount = inquiries.length;
  const newCount = inquiries.filter(i => i.status === "New").length;
  const inProgressCount = inquiries.filter(i => i.status === "In Progress").length;
  const contactedCount = inquiries.filter(i => i.status === "Contacted").length;
  const closedCount = inquiries.filter(i => i.status === "Closed").length;

  // ==========================================
  // LOGIN SCREEN (UNAUTHENTICATED)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070D18] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-rust/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-steel/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-[#0E1626]/95 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl backdrop-blur-xl relative z-10">
          
          <div className="text-center space-y-3">
            <div className="relative w-14 h-14 mx-auto p-2 rounded-2xl bg-gradient-to-br from-brand-rust/20 to-[#10192A] border border-brand-rust/30 flex items-center justify-center">
              <Image
                src="/images/logo-symbol.png"
                alt="Factual Solutions"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight font-display">
                Partner Management Portal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Factual Solutions Executive Advisory Engine
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
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Administrator Email
              </label>
              <input
                type="text"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@factual-solutions.com"
                className="w-full px-4 py-3 rounded-xl bg-[#09101C] border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-steel transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Security Password / PIN
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#09101C] border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-steel transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] hover:from-[#B84530] hover:to-brand-rust text-white text-xs font-bold transition-all shadow-lg shadow-brand-rust/20 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Executive Portal</span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5 text-brand-steel-light" />
              <span>1-Click Partner Demo Access</span>
            </button>
          </form>

          <div className="pt-3 text-center border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Website</span>
            </Link>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              MongoDB Cluster0 Live
            </span>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED EXECUTIVE DASHBOARD SCREEN
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col">
      {/* Top Portal Executive Header */}
      <header className="border-b border-slate-800/80 bg-[#0C1424]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-xl bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo-symbol.png"
                alt="Factual Solutions"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Factual Solutions</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-rust/20 text-brand-rust-light border border-brand-rust/30 font-semibold">
                  Partner Portal
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Enterprise Consultation & Lead Engine</div>
            </div>
          </Link>
        </div>

        {/* Global Action Header Controls */}
        <div className="flex items-center gap-3">
          {/* Cluster Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className={`w-2 h-2 rounded-full ${dbStatus?.mongodb?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="font-medium text-[11px]">
              {dbStatus?.mongodb?.connected ? "Atlas Cluster0 Synced" : "Connecting to Atlas..."}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 text-xs font-semibold transition-colors border border-red-500/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-Header Bar */}
      <div className="bg-[#0A101D] border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "inquiries"
                ? "bg-brand-rust text-white shadow-md shadow-brand-rust/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Queries & Inquiries</span>
            {newCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-white text-brand-rust font-bold">
                {newCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("subscribers")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "subscribers"
                ? "bg-brand-rust text-white shadow-md shadow-brand-rust/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("chatlogs")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "chatlogs"
                ? "bg-brand-rust text-white shadow-md shadow-brand-rust/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>JARVIS AI Chats</span>
          </button>

          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "blog"
                ? "bg-brand-rust text-white shadow-md shadow-brand-rust/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog & Insights ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("system")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "system"
                ? "bg-brand-rust text-white shadow-md shadow-brand-rust/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Atlas Health & Diagnostics</span>
          </button>
        </div>

        {/* Sync message badge */}
        {syncMessage && (
          <div className="text-xs font-medium text-emerald-400 px-2 py-0.5 bg-emerald-950/40 rounded-lg border border-emerald-500/30 shrink-0">
            {syncMessage}
          </div>
        )}
      </div>

      {/* Main Panel Content Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">

        {/* ============================================================== */}
        {/* TAB 1: INQUIRIES & REPLIES MANAGEMENT                         */}
        {/* ============================================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Total Leads</span>
                  <Layers className="w-4 h-4 text-brand-steel" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {totalCount}
                </div>
                <div className="text-[11px] text-slate-500">All-time inquiries recorded</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <span>New & Unreplied</span>
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-display">
                  {newCount}
                </div>
                <div className="text-[11px] text-slate-500">Requires Partner contact</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  <span>Contacted / Active</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">
                  {contactedCount + inProgressCount}
                </div>
                <div className="text-[11px] text-slate-500">Replies dispatched</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Completed</span>
                  <ShieldCheck className="w-4 h-4 text-brand-rust" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-300 font-display">
                  {closedCount}
                </div>
                <div className="text-[11px] text-slate-500">Consultations finalized</div>
              </div>
            </div>

            {/* Filter & Action Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#0E1626] border border-slate-800 p-3 sm:p-4 rounded-2xl">
              <div className="flex-1 flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client, email, company, service..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#09101C] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
                  />
                </div>

                {/* Status Filter Dropdown */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {["All", "New", "In Progress", "Contacted", "Closed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        statusFilter === st
                          ? "bg-slate-700 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={loadInquiries}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
                  title="Refresh Inquiries"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingInquiries ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-xs font-bold text-white transition-colors shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Query</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-[#0E1626] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A101D] text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10.5px]">
                    <tr>
                      <th className="py-3.5 px-4">Ref Code</th>
                      <th className="py-3.5 px-4">Client & Company</th>
                      <th className="py-3.5 px-4">Practice Requested</th>
                      <th className="py-3.5 px-4">Priority</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Replies</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500">
                          No inquiries found matching current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr
                          key={inq.id}
                          className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-brand-steel-light">
                            {inq.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{inq.fullName}</div>
                            <div className="text-[11px] text-slate-400">{inq.workEmail}</div>
                            {inq.companyName && (
                              <div className="text-[10px] text-slate-500 font-medium">{inq.companyName}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-slate-200">
                              {inq.serviceOfInterest}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                inq.priority === "Urgent"
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : inq.priority === "High"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {inq.priority}
                            </span>
                          </td>
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none border ${
                                inq.status === "New"
                                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                  : inq.status === "In Progress"
                                  ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                                  : inq.status === "Contacted"
                                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                  : "bg-slate-800 text-slate-400 border-slate-700"
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4">
                            {inq.replies && inq.replies.length > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10.5px] font-semibold">
                                <CheckCircle className="w-3 h-3" />
                                <span>{inq.replies.length} replies</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500">None yet</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                            {inq.date}
                          </td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-brand-rust/30 text-slate-300 hover:text-white transition-colors"
                                title="View & Reply"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/30 text-slate-400 hover:text-red-300 transition-colors"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: NEWSLETTER SUBSCRIBERS MANAGEMENT                       */}
        {/* ============================================================== */}
        {activeTab === "subscribers" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0E1626] border border-slate-800 p-4 rounded-2xl">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={subSearchQuery}
                  onChange={(e) => setSubSearchQuery(e.target.value)}
                  placeholder="Filter subscriber emails..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#09101C] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadSubscribers}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
                  title="Refresh Subscribers"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingSubscribers ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleExportSubscribersCSV}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Mailing List CSV</span>
                </button>
              </div>
            </div>

            <div className="bg-[#0E1626] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A101D] text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10.5px]">
                    <tr>
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4">Subscriber Email</th>
                      <th className="py-3.5 px-4">Subscription Source</th>
                      <th className="py-3.5 px-4">Date Subscribed</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          No newsletter subscribers found.
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-white">{sub.email}</td>
                          <td className="py-3.5 px-4 text-slate-400">{sub.source || "Website Footer"}</td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                            {new Date(sub.subscribedAt).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: JARVIS AI CHAT LOGS                                     */}
        {/* ============================================================== */}
        {activeTab === "chatlogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#0E1626] border border-slate-800 p-4 rounded-2xl">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-brand-rust" />
                  <span>JARVIS AI Real-Time Conversational Transcripts</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live interaction memory synced directly into MongoDB Atlas `chat_logs` collection.
                </p>
              </div>
              <button
                onClick={loadChatLogs}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingChatLogs ? 'animate-spin' : ''}`} />
                <span>Refresh Logs</span>
              </button>
            </div>

            <div className="bg-[#0E1626] border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-3.5 shadow-xl">
              {chatLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No chat logs recorded yet. All inquiries initiated with JARVIS will stream here automatically.
                </div>
              ) : (
                chatLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                      log.role === "assistant"
                        ? "bg-[#111C2E] border-slate-700/60 text-slate-200"
                        : "bg-brand-rust/10 border-brand-rust/30 text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                        {log.role === "assistant" ? (
                          <>
                            <Bot className="w-3.5 h-3.5 text-brand-rust" />
                            <span className="text-brand-steel-light">JARVIS AI</span>
                          </>
                        ) : (
                          <>
                            <Users className="w-3.5 h-3.5 text-brand-rust-light" />
                            <span className="text-brand-rust-light">Prospective Client ({log.sessionId})</span>
                          </>
                        )}
                      </span>
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{log.content}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SYSTEM & ATLAS CLUSTER DIAGNOSTICS                     */}
        {/* ============================================================== */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cluster Health Card */}
              <div className="bg-[#0E1626] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>MongoDB Atlas Cluster0 Telemetry</span>
                  </h3>
                  <button
                    onClick={checkHealth}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Ping Atlas"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Connection Status:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {dbStatus?.mongodb?.status || "Live & Connected"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Database Name:</span>
                    <span className="font-mono text-white font-semibold">
                      {dbStatus?.mongodb?.database || "factual_solutions"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Cluster Diagnostic:</span>
                    <span className="text-slate-300 font-medium">
                      {dbStatus?.mongodb?.details || "Cluster0 ping verified successfully"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">API Uptime:</span>
                    <span className="font-mono text-slate-300">
                      {Math.floor((dbStatus?.uptime || 0) / 60)} minutes
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSyncAtlas}
                    disabled={syncing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] hover:from-[#B84530] hover:to-brand-rust text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                    <span>{syncing ? "Seeding & Syncing Atlas Collections..." : "1-Click Atlas Re-Sync & Seed Default Practices"}</span>
                  </button>
                </div>
              </div>

              {/* Service Interest Breakdown */}
              <div className="bg-[#0E1626] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-rust" />
                  <span>Inquiry Demand by Consulting Practice</span>
                </h3>

                <div className="space-y-3 text-xs">
                  {inquiries.length === 0 ? (
                    <div className="text-slate-500 py-6 text-center">No inquiry distribution data yet.</div>
                  ) : (
                    Object.entries(
                      inquiries.reduce((acc, inq) => {
                        const svc = inq.serviceOfInterest || "General Consultation";
                        acc[svc] = (acc[svc] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([service, count]) => {
                      const pct = Math.round((count / inquiries.length) * 100);
                      return (
                        <div key={service} className="space-y-1">
                          <div className="flex justify-between text-slate-300 font-medium text-[11px]">
                            <span className="truncate max-w-[280px]">{service}</span>
                            <span className="font-mono text-brand-steel-light font-bold">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-brand-rust to-brand-steel rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: BLOG & INSIGHTS MANAGEMENT                             */}
        {/* ============================================================== */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Total Articles</span>
                  <BookOpen className="w-4 h-4 text-brand-steel" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {totalBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Live & draft publications</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  <span>Published Online</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">
                  {publishedBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Visible on public /blog</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <span>Drafts in Progress</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-display">
                  {draftBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Unpublished internal drafts</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-brand-rust-light font-semibold uppercase tracking-wider">
                  <span>Spotlight Featured</span>
                  <Star className="w-4 h-4 text-brand-rust" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-rust-light font-display">
                  {featuredBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Top hero showcase</div>
              </div>
            </div>

            {/* Filter, Search & Primary Action Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#0E1626] border border-slate-800 p-3 sm:p-4 rounded-2xl">
              <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                    placeholder="Search articles by title, tags, author, category..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#09101C] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1">
                  {[
                    { id: "all", label: "All Status" },
                    { id: "published", label: "Published" },
                    { id: "draft", label: "Drafts" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setBlogStatusFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        blogStatusFilter === tab.id
                          ? "bg-slate-700 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Category Dropdown */}
                <select
                  value={blogCategoryFilter}
                  onChange={(e) => setBlogCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#09101C] border border-slate-700 text-xs text-slate-300 font-semibold focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Strategic Management">Strategic Management</option>
                  <option value="Financial Modeling">Financial Modeling</option>
                  <option value="Feasibility Studies">Feasibility Studies</option>
                  <option value="Operational Excellence">Operational Excellence</option>
                  <option value="Enterprise Growth">Enterprise Growth</option>
                </select>
              </div>

              {/* Write New Article CTA */}
              <button
                onClick={handleOpenNewBlogModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] hover:from-[#B84530] hover:to-brand-rust text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>

            {/* Articles Table / List */}
            <div className="bg-[#0E1626] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              {isLoadingBlog ? (
                <div className="py-20 text-center text-xs text-slate-400 space-y-2">
                  <div className="w-6 h-6 border-2 border-brand-rust border-t-transparent rounded-full animate-spin mx-auto" />
                  <div>Loading live blog articles from MongoDB Atlas...</div>
                </div>
              ) : filteredBlogPosts.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-400 space-y-3">
                  <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
                  <div className="text-sm font-bold text-white">No articles found</div>
                  <p className="max-w-xs mx-auto text-slate-500">
                    No articles match your current search or filter criteria. Click &quot;Write New Article&quot; to draft one.
                  </p>
                  <button
                    onClick={handleOpenNewBlogModal}
                    className="px-4 py-2 rounded-xl bg-brand-rust text-white font-semibold text-xs inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create First Article</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-[#09101C]/60 text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                        <th className="py-3 px-4">Article & Cover</th>
                        <th className="py-3 px-4">Category & Discipline</th>
                        <th className="py-3 px-4">Status & Visibility</th>
                        <th className="py-3 px-4">Author & Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredBlogPosts.map((post) => (
                        <tr
                          key={post.id}
                          className="hover:bg-slate-800/40 transition-colors group"
                        >
                          {/* Article Title & Cover Preview */}
                          <td className="py-3.5 px-4 max-w-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 relative shrink-0 border border-slate-700/60">
                                {post.coverImage ? (
                                  <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                                    <BookOpen className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-white group-hover:text-brand-rust-light transition-colors line-clamp-1">
                                  {post.title}
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                                  /blog/{post.slug}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category & Tags */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className="px-2.5 py-1 rounded-md bg-brand-rust/15 text-brand-rust-light border border-brand-rust/30 text-[10.5px] font-semibold">
                                {post.category}
                              </span>
                              <div className="text-[10px] text-slate-400">
                                {post.readTime || "5 min read"}
                              </div>
                            </div>
                          </td>

                          {/* Status & Featured Toggle */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {/* 1-Click Status Switcher */}
                              <button
                                onClick={() => handleToggleBlogStatus(post)}
                                title="Click to toggle between Published and Draft"
                                className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold border transition-all flex items-center gap-1.5 ${
                                  post.status === "published"
                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                                    : "bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${post.status === "published" ? "bg-emerald-400" : "bg-amber-400"}`} />
                                <span className="capitalize">{post.status}</span>
                              </button>

                              {/* Featured Toggle */}
                              <button
                                onClick={() => handleToggleBlogFeatured(post)}
                                title={post.featured ? "Featured on Homepage" : "Click to feature on Homepage"}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  post.featured
                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                    : "bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300"
                                }`}
                              >
                                <Star className="w-3.5 h-3.5 fill-current" />
                              </button>
                            </div>
                          </td>

                          {/* Author & Published Date */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="space-y-0.5">
                              <div className="font-semibold text-slate-200 text-xs">
                                {post.author?.name || "Executive Team"}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {post.publishedAt || "Recently drafted"}
                              </div>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Edit Article */}
                              <button
                                onClick={() => handleOpenEditBlogModal(post)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                                title="Edit Article Content"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* View on Public Site */}
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-steel-light hover:text-white transition-colors border border-slate-700"
                                title="Open Live Page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>

                              {/* Delete Article */}
                              <button
                                onClick={() => handleDeleteBlogPost(post.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
                                title="Delete Article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ============================================================== */}
      {/* INQUIRY DETAIL & INTERACTIVE REPLY DRAWER / MODAL               */}
      {/* ============================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0B1322] border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0F1A2E] to-[#14243F] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center text-brand-rust-light font-bold font-mono">
                  {selectedInquiry.id.slice(-3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{selectedInquiry.fullName}</h2>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                      {selectedInquiry.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{selectedInquiry.workEmail}</span>
                    {selectedInquiry.phone && <span>• {selectedInquiry.phone}</span>}
                    {selectedInquiry.companyName && <span>• {selectedInquiry.companyName}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none"
                >
                  <option value="New">Status: New</option>
                  <option value="In Progress">Status: In Progress</option>
                  <option value="Contacted">Status: Contacted</option>
                  <option value="Closed">Status: Closed</option>
                </select>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 text-xs custom-scrollbar">
              
              {/* Client Original Inquiry Message */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Client Inquiry Scope
                </div>
                <div className="p-4 rounded-2xl bg-[#09101C] border border-slate-800 text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message || "No custom message provided."}
                </div>
              </div>

              {/* JARVIS AI Strategic Assessment */}
              {selectedInquiry.aiAssessment && (
                <div className="p-4 rounded-2xl bg-[#101C30]/90 border border-brand-steel/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand-steel-light font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-brand-rust" />
                      <span>JARVIS AI Strategic Diagnostic</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Category: {selectedInquiry.aiAssessment.industryCategory || "Advisory"}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-[11.5px]">
                    {selectedInquiry.aiAssessment.executiveSummary}
                  </p>

                  {selectedInquiry.aiAssessment.keyStrategicFocus && (
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Recommended Engagement Steps:
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                        {selectedInquiry.aiAssessment.keyStrategicFocus.map((point: string, idx: number) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Previous Replies / Interaction Thread */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Official Client Responses ({selectedInquiry.replies?.length || 0})</span>
                  {selectedInquiry.replies && selectedInquiry.replies.length > 0 && (
                    <span className="text-emerald-400 text-[10px] font-normal">Active thread logged in Atlas</span>
                  )}
                </div>

                {!selectedInquiry.replies || selectedInquiry.replies.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-[#080E18] border border-slate-800/80 text-center text-slate-500 text-xs">
                    No replies sent yet. Use the response composer below to contact this client.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedInquiry.replies.map((reply) => (
                      <div key={reply.id} className="p-3.5 rounded-2xl bg-[#0E1726] border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-[10.5px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{reply.author}</span>
                            <span className="px-1.5 py-0.2 rounded bg-brand-steel/20 text-brand-steel-light text-[9.5px]">
                              via {reply.channel}
                            </span>
                          </span>
                          <span>{reply.sentAt}</span>
                        </div>
                        <div className="text-slate-200 whitespace-pre-wrap leading-relaxed text-xs">
                          {reply.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interactive Reply Composer */}
              <form onSubmit={handleSendReply} className="p-4 rounded-2xl bg-[#0E1726] border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-white flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-brand-rust" />
                    <span>Compose Official Partner Response</span>
                  </div>

                  {selectedInquiry.aiAssessment?.autoReplyEmailBody && (
                    <button
                      type="button"
                      onClick={handleUseAiDraft}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-rust/20 hover:bg-brand-rust/30 text-brand-rust-light border border-brand-rust/40 text-[10.5px] font-semibold transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-brand-rust" />
                      <span>Use AI Recommended Draft</span>
                    </button>
                  )}
                </div>

                <textarea
                  rows={5}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Draft your proposal, discovery session invitation, or message to the client..."
                  className="w-full p-3.5 rounded-xl bg-[#080D16] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel leading-relaxed custom-scrollbar"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {/* Channel Selection */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">Send via:</span>
                    {(["Email", "WhatsApp", "Internal Note"] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setReplyChannel(ch)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          replyChannel === ch
                            ? ch === "WhatsApp"
                              ? "bg-emerald-600 text-white"
                              : "bg-brand-rust text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSendingReply}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] hover:from-[#B84530] hover:to-brand-rust text-white text-xs font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSendingReply ? "Logging..." : `Dispatch & Record (${replyChannel})`}</span>
                  </button>
                </div>

                {replyFeedback && (
                  <div className="text-xs font-medium text-center pt-1 text-slate-300">
                    {replyFeedback}
                  </div>
                )}
              </form>

            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MANUAL ADD INQUIRY MODAL                                       */}
      {/* ============================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0B1322] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-brand-rust" />
                <span>Log Executive Consultation Query</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddInquiry} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={newInquiryData.fullName}
                  onChange={(e) => setNewInquiryData({ ...newInquiryData, fullName: e.target.value })}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Work Email *</label>
                <input
                  type="email"
                  required
                  value={newInquiryData.workEmail}
                  onChange={(e) => setNewInquiryData({ ...newInquiryData, workEmail: e.target.value })}
                  placeholder="client@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Company Name</label>
                  <input
                    type="text"
                    value={newInquiryData.companyName}
                    onChange={(e) => setNewInquiryData({ ...newInquiryData, companyName: e.target.value })}
                    placeholder="e.g. Apex Industrial"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={newInquiryData.phone}
                    onChange={(e) => setNewInquiryData({ ...newInquiryData, phone: e.target.value })}
                    placeholder="+92 324 1775662"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Service Practice</label>
                <select
                  value={newInquiryData.serviceOfInterest}
                  onChange={(e) => setNewInquiryData({ ...newInquiryData, serviceOfInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                >
                  <option value="Strategic Management Consulting">Strategic Management Consulting</option>
                  <option value="Operational Excellence & Process Engineering">Operational Excellence & Process Engineering</option>
                  <option value="Financial Feasibility & Investment Modeling">Financial Feasibility & Investment Modeling</option>
                  <option value="Specialized Business Planning">Specialized Business Planning</option>
                  <option value="Business Idea & Model Development">Business Idea & Model Development</option>
                  <option value="Market Analysis & Industry Research">Market Analysis & Industry Research</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Consultation Scope / Notes</label>
                <textarea
                  rows={3}
                  value={newInquiryData.message}
                  onChange={(e) => setNewInquiryData({ ...newInquiryData, message: e.target.value })}
                  placeholder="Client objective and requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white font-bold"
                >
                  Save to Atlas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ARTICLE EDITOR & LIVE PREVIEW MODAL                             */}
      {/* ============================================================== */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0B1322] border border-slate-700/90 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0E1726] to-[#14233A] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center text-brand-rust-light">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {editingPostId ? "Edit Executive Article" : "Write & Publish Strategic Article"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Live publication on public /blog and executive perspectives
                  </p>
                </div>
              </div>

              {/* View Switcher: Edit vs Live Preview */}
              <div className="flex items-center gap-2">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setBlogEditorTab("edit")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      blogEditorTab === "edit"
                        ? "bg-brand-rust text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBlogEditorTab("preview")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      blogEditorTab === "preview"
                        ? "bg-brand-rust text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar text-xs">
              {blogEditorTab === "edit" ? (
                <form id="blogPostForm" onSubmit={handleSaveBlogPost} className="space-y-4">
                  
                  {/* Title & Auto-slug */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold uppercase tracking-wider text-[10.5px]">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={blogFormData.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        const autoSlug = val
                          .toLowerCase()
                          .trim()
                          .replace(/[^\w\s-]/g, "")
                          .replace(/[\s_-]+/g, "-");
                        setBlogFormData({
                          ...blogFormData,
                          title: val,
                          slug: editingPostId ? blogFormData.slug : autoSlug
                        });
                      }}
                      placeholder="e.g. Navigating Enterprise Restructuring in High Rate Regimes"
                      className="w-full px-4 py-3 rounded-xl bg-[#080D16] border border-slate-700 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-steel"
                    />
                  </div>

                  {/* URL Slug Preview */}
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold text-[10.5px]">
                      URL Path Slug
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono text-[11px] bg-[#080D16] px-3 py-2.5 rounded-xl border border-slate-800">
                        /blog/
                      </span>
                      <input
                        type="text"
                        required
                        value={blogFormData.slug}
                        onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                        placeholder="article-slug-url"
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 font-mono text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-steel"
                      />
                    </div>
                  </div>

                  {/* Summary / Excerpt */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold uppercase tracking-wider text-[10.5px]">
                      Summary / Lead Excerpt
                    </label>
                    <textarea
                      rows={2}
                      value={blogFormData.excerpt}
                      onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                      placeholder="A short executive briefing summarizing the core thesis and practical takeaways..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-steel leading-relaxed"
                    />
                  </div>

                  {/* Category, Read Time, Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Strategic Discipline</label>
                      <select
                        value={blogFormData.category}
                        onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                      >
                        <option value="Strategic Management">Strategic Management</option>
                        <option value="Financial Modeling">Financial Modeling</option>
                        <option value="Feasibility Studies">Feasibility Studies</option>
                        <option value="Operational Excellence">Operational Excellence</option>
                        <option value="Enterprise Growth">Enterprise Growth</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Read Time</label>
                      <input
                        type="text"
                        value={blogFormData.readTime}
                        onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                        placeholder="5 min read"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Publication Visibility</label>
                      <select
                        value={blogFormData.status}
                        onChange={(e) => setBlogFormData({ ...blogFormData, status: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white font-bold"
                      >
                        <option value="published">Published (Live Online)</option>
                        <option value="draft">Draft (Internal Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Author Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Author Name & Role</label>
                      <input
                        type="text"
                        value={blogFormData.authorName}
                        onChange={(e) => setBlogFormData({ ...blogFormData, authorName: e.target.value })}
                        placeholder="e.g. Ahsan Malik"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white mb-2"
                      />
                      <input
                        type="text"
                        value={blogFormData.authorRole}
                        onChange={(e) => setBlogFormData({ ...blogFormData, authorRole: e.target.value })}
                        placeholder="e.g. Managing Director & Senior Partner"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#080D16] border border-slate-800 text-slate-300 text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Author Avatar Image URL</label>
                      <input
                        type="text"
                        value={blogFormData.authorAvatar}
                        onChange={(e) => setBlogFormData({ ...blogFormData, authorAvatar: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                      />
                      <div className="text-[10.5px] text-slate-500 pt-1">
                        Professional headshot URL for the author profile box.
                      </div>
                    </div>
                  </div>

                  {/* Cover Image URL with Presets */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-bold uppercase tracking-wider text-[10.5px]">
                        Article Cover Image URL
                      </label>
                      <div className="flex items-center gap-1.5 text-[10.5px]">
                        <span className="text-slate-500">Presets:</span>
                        <button
                          type="button"
                          onClick={() => setBlogFormData({ ...blogFormData, coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Corporate
                        </button>
                        <button
                          type="button"
                          onClick={() => setBlogFormData({ ...blogFormData, coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Financial
                        </button>
                        <button
                          type="button"
                          onClick={() => setBlogFormData({ ...blogFormData, coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Strategy
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={blogFormData.coverImage}
                      onChange={(e) => setBlogFormData({ ...blogFormData, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                    />
                  </div>

                  {/* Tags and Featured toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Keywords & Tags (comma separated)</label>
                      <input
                        type="text"
                        value={blogFormData.tags}
                        onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                        placeholder="Strategy, M&A, Feasibility, Cost Reduction"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-slate-700 text-white"
                      />
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={blogFormData.featured}
                          onChange={(e) => setBlogFormData({ ...blogFormData, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-brand-rust focus:ring-brand-rust bg-[#080D16] border-slate-700"
                        />
                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Star className={`w-3.5 h-3.5 ${blogFormData.featured ? "text-amber-400 fill-current" : "text-slate-500"}`} />
                          <span>Pin as Featured Headline Article</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Content Toolbar & Textarea */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="text-slate-300 font-bold uppercase tracking-wider text-[10.5px]">
                        Article Body Content (Markdown Supported) *
                      </label>

                      {/* Formatting Helper Buttons */}
                      <div className="flex flex-wrap items-center gap-1">
                        <button
                          type="button"
                          onClick={() => insertMarkdownInContent("## ", "\n")}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px]"
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownInContent("### ", "\n")}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px]"
                          title="Heading 3"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownInContent("**", "**")}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px]"
                          title="Bold text"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownInContent("> ", "\n")}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                          title="Executive Quote / Highlight"
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownInContent("- ", "\n")}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                          title="Bullet point"
                        >
                          List
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownInContent("1. ", "\n")}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                          title="Numbered list"
                        >
                          1. 2. 3.
                        </button>
                        <button
                          type="button"
                          onClick={handleScaffoldOutline}
                          className="px-2.5 py-1 rounded bg-brand-rust/20 hover:bg-brand-rust/30 text-brand-rust-light border border-brand-rust/40 text-[10px] font-semibold flex items-center gap-1 ml-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Advisory Template</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      id="blogContentTextarea"
                      required
                      rows={14}
                      value={blogFormData.content}
                      onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                      placeholder={`Write your executive analysis here...

## Executive Overview
Detail the strategic context...

### 1. Root Cause Analysis
Explain the primary drivers...

> "Key strategic quotation or insight."

- Bullet insight 1
- Bullet insight 2`}
                      className="w-full p-4 rounded-2xl bg-[#080D16] border border-slate-700 font-sans text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-steel leading-relaxed custom-scrollbar"
                    />
                  </div>

                </form>
              ) : (
                /* LIVE PREVIEW TAB */
                <div className="space-y-6 max-w-3xl mx-auto py-2">
                  <div className="p-3 bg-brand-steel/10 border border-brand-steel/20 rounded-xl text-[11px] text-brand-steel-light flex items-center gap-2">
                    <Eye className="w-4 h-4 shrink-0" />
                    <span>Live reader simulation previewing layout as visible to site visitors.</span>
                  </div>

                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-brand-rust/20 text-brand-rust-light font-bold text-[10px] uppercase">
                        {blogFormData.category}
                      </span>
                      <span className="text-slate-400 text-xs">• {blogFormData.readTime}</span>
                      <span className="text-slate-400 text-xs">• Today</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                      {blogFormData.title || "Untitled Article"}
                    </h1>

                    {blogFormData.excerpt && (
                      <p className="text-sm text-slate-300 italic border-l-2 border-brand-rust pl-3 py-1">
                        {blogFormData.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Cover preview */}
                  {blogFormData.coverImage && (
                    <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                      <Image
                        src={blogFormData.coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Author Card preview */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-rust/20 relative shrink-0">
                      <Image
                        src={blogFormData.authorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"}
                        alt="Author"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{blogFormData.authorName}</div>
                      <div className="text-[11px] text-slate-400">{blogFormData.authorRole}</div>
                    </div>
                  </div>

                  {/* Content body preview */}
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {blogFormData.content ? (
                      blogFormData.content.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <div key={idx} className="h-2" />;
                        if (trimmed.startsWith("## ")) {
                          return (
                            <h2 key={idx} className="text-lg sm:text-xl font-bold text-white mt-4 mb-2">
                              {trimmed.replace("## ", "")}
                            </h2>
                          );
                        }
                        if (trimmed.startsWith("### ")) {
                          return (
                            <h3 key={idx} className="text-base font-bold text-brand-rust-light mt-3 mb-1.5">
                              {trimmed.replace("### ", "")}
                            </h3>
                          );
                        }
                        if (trimmed.startsWith("> ")) {
                          return (
                            <div key={idx} className="p-3 my-2 bg-brand-rust/10 border-l-4 border-brand-rust rounded-r-xl italic text-slate-200">
                              {trimmed.replace(/^>\s*/, "")}
                            </div>
                          );
                        }
                        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                          return (
                            <li key={idx} className="ml-4 list-disc text-slate-300 my-0.5">
                              {trimmed.replace(/^[-*]\s*/, "")}
                            </li>
                          );
                        }
                        if (/^\d+\.\s/.test(trimmed)) {
                          return (
                            <li key={idx} className="ml-4 list-decimal text-slate-300 my-0.5">
                              {trimmed.replace(/^\d+\.\s*/, "")}
                            </li>
                          );
                        }
                        return (
                          <p key={idx} className="text-slate-300 leading-relaxed my-1.5">
                            {trimmed}
                          </p>
                        );
                      })
                    ) : (
                      <div className="text-slate-500 italic py-8 text-center">
                        No content written yet. Switch back to the Editor tab to compose.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#0E1726] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-red-400 font-medium">
                {blogFeedback}
              </div>

              <div className="flex items-center gap-2 self-end">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBlogFormData({ ...blogFormData, status: "draft" });
                    const form = document.getElementById("blogPostForm") as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={isSavingBlog}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  Save as Draft
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBlogFormData({ ...blogFormData, status: "published" });
                    const form = document.getElementById("blogPostForm") as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={isSavingBlog}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-rust to-[#933423] hover:from-[#B84530] hover:to-brand-rust text-white text-xs font-bold transition-all shadow-md shadow-brand-rust/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingBlog ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Publish to Website</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
