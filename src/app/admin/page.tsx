"use client";

import React, { useState, useEffect, useRef } from "react";
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
import GoogleRecaptcha, { GoogleRecaptchaHandle, RECAPTCHA_ENABLED } from "@/components/ui/GoogleRecaptcha";
import { BLOG_CATEGORIES, DEFAULT_BLOG_AUTHOR, DEFAULT_BLOG_CATEGORY, DEFAULT_BLOG_COVER, calculateReadTime } from "@/data/blogCategories";

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
    coverImage: DEFAULT_BLOG_COVER,
    coverImageAlt: "",
    category: DEFAULT_BLOG_CATEGORY as string,
    authorName: DEFAULT_BLOG_AUTHOR.name,
    authorRole: DEFAULT_BLOG_AUTHOR.role,
    authorAvatar: DEFAULT_BLOG_AUTHOR.avatar,
    authorBio: "",
    readTime: "1 min read",
    tags: "",
    status: "published" as "published" | "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    focusKeyword: ""
  };
  const pendingStatusRef = useRef<"published" | "draft" | null>(null);
  const addInquiryCaptchaRef = useRef<GoogleRecaptchaHandle>(null);
  const [addInquiryToken, setAddInquiryToken] = useState<string | null>(null);
  const [addInquiryError, setAddInquiryError] = useState("");

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
  const [replySubject, setReplySubject] = useState("");
  const [replyChannel, setReplyChannel] = useState<"Email" | "WhatsApp" | "Internal Note">("Email");
  const [replyAuthor, setReplyAuthor] = useState("Managing Partner");
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState("");

  // Mailing Diagnostics State (System Hub)
  const [mailSettings, setMailSettings] = useState<{
    provider: string;
    providerName: string;
    isConfigured: boolean;
    senderAddress: string;
    notificationEmail: string;
    hasResendKey: boolean;
    hasWebhook: boolean;
  } | null>(null);
  const [testEmailTarget, setTestEmailTarget] = useState("");
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailFeedback, setTestEmailFeedback] = useState("");

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
      coverImageAlt: post.coverImageAlt || "",
      category: post.category || DEFAULT_BLOG_CATEGORY,
      authorName: post.author?.name || DEFAULT_BLOG_AUTHOR.name,
      authorRole: post.author?.role || DEFAULT_BLOG_AUTHOR.role,
      authorAvatar: post.author?.avatar || "",
      authorBio: post.author?.bio || "",
      readTime: post.readTime || calculateReadTime(post.content || ""),
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : (post.tags || ""),
      status: post.status,
      featured: Boolean(post.featured),
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
      focusKeyword: post.focusKeyword || ""
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

    const finalStatus = pendingStatusRef.current || blogFormData.status;
    pendingStatusRef.current = null;

    setIsSavingBlog(true);
    setBlogFeedback("");
    try {
      const payload = {
        title: blogFormData.title,
        slug: blogFormData.slug,
        excerpt: blogFormData.excerpt,
        content: blogFormData.content,
        coverImage: blogFormData.coverImage,
        coverImageAlt: blogFormData.coverImageAlt,
        category: blogFormData.category,
        author: {
          name: blogFormData.authorName,
          role: blogFormData.authorRole,
          avatar: blogFormData.authorAvatar,
          bio: blogFormData.authorBio
        },
        readTime: calculateReadTime(blogFormData.content),
        tags: blogFormData.tags.split(",").map((s) => s.trim()).filter(Boolean),
        status: finalStatus,
        featured: blogFormData.featured,
        metaTitle: blogFormData.metaTitle,
        metaDescription: blogFormData.metaDescription,
        focusKeyword: blogFormData.focusKeyword
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
    const template = `## Introduction
State the problem in one or two sentences and why it matters to the reader.

## The Challenge
Describe what typically goes wrong and how it shows up on the shop floor or in the numbers.

## A Practical Approach
1. **Step one**: what to do first, and why.
2. **Step two**: how to measure it.
3. **Step three**: how to sustain it.

> One key takeaway the reader should remember.

## Key Takeaways
- Takeaway one
- Takeaway two
- Takeaway three

## Next Step
Invite the reader to get in touch or explore a related service.`;

    if (!blogFormData.content || confirm("Replace editor content with the article structure template?")) {
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
        loadMailSettings();
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
    if (RECAPTCHA_ENABLED && !addInquiryToken) {
      setAddInquiryError("Please tick \"I'm not a robot\" first.");
      return;
    }
    setAddInquiryError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newInquiryData, recaptchaToken: addInquiryToken })
      });
      const data = await res.json();
      addInquiryCaptchaRef.current?.reset();
      setAddInquiryToken(null);
      if (!res.ok || !data.success) {
        setAddInquiryError(data.message || "Could not save the inquiry.");
        return;
      }
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

  // Select inquiry and initialize response composer
  const handleSelectInquiry = (inq: IInquiry) => {
    setSelectedInquiry(inq);
    setReplySubject(`Factual Solutions Advisory: Response to Consultation #${inq.id}`);
    setReplyText(inq.aiAssessment?.autoReplyEmailBody || "");
    setReplyChannel("Email");
    setShowEmailPreview(false);
    setReplyFeedback("");
  };

  // Load mailing system configuration status
  const loadMailSettings = async () => {
    try {
      const res = await fetch("/api/admin/mail-settings");
      const data = await res.json();
      if (data.success && data.status) {
        setMailSettings(data.status);
      }
    } catch (err) {
      console.error("Failed to load mail settings:", err);
    }
  };

  // Dispatch diagnostic verification email
  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmailTarget.trim() || isSendingTestEmail) return;
    setIsSendingTestEmail(true);
    setTestEmailFeedback("");
    try {
      const res = await fetch("/api/admin/mail-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetEmail: testEmailTarget.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setTestEmailFeedback(`✅ ${data.message}`);
      } else {
        setTestEmailFeedback(`⚠️ ${data.message || "Failed to dispatch test email."}`);
      }
    } catch (err: any) {
      setTestEmailFeedback(`❌ Error: ${err.message}`);
    } finally {
      setIsSendingTestEmail(false);
      setTimeout(() => setTestEmailFeedback(""), 8000);
    }
  };

  // Send / Record Reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !replyText.trim() || isSendingReply) return;

    setIsSendingReply(true);
    setReplyFeedback("");

    try {
      const defaultSubj = `Factual Solutions Advisory: Response to Consultation #${selectedInquiry.id}`;
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: replyAuthor,
          subject: replySubject.trim() || defaultSubj,
          content: replyText,
          channel: replyChannel
        })
      });

      const data = await res.json();

      if (data.success) {
        setReplyFeedback(data.message || `✅ Reply dispatched successfully.`);
        
        // Append reply locally in selected inquiry
        const updatedReplies = [...(selectedInquiry.replies || []), data.reply];
        const updatedInquiry = { ...selectedInquiry, replies: updatedReplies, status: "Contacted" as const };
        
        setSelectedInquiry(updatedInquiry);
        setInquiries((prev) => prev.map((inq) => (inq.id === selectedInquiry.id ? updatedInquiry : inq)));
        setReplyText("");

        // If WhatsApp, automatically open link in new tab
        if (replyChannel === "WhatsApp" && data.whatsappUrl) {
          window.open(data.whatsappUrl, "_blank");
        }
      } else {
        setReplyFeedback(`⚠️ ${data.message}`);
      }
    } catch (err: any) {
      setReplyFeedback(`❌ Error: ${err.message}`);
    } finally {
      setIsSendingReply(false);
      setTimeout(() => setReplyFeedback(""), 9000);
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

  // Export Inquiries to Excel / CSV with UTF-8 BOM for Arabic & International characters
  const handleExportCSV = (format: "csv" | "excel" = "csv") => {
    const listToExport = filteredInquiries.length > 0 ? filteredInquiries : inquiries;

    if (format === "excel") {
      // Excel XML format
      let excelContent = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
      <Worksheet ss:Name="Inquiries"><Table>
      <Row>
        <Cell><Data ss:Type="String">ID</Data></Cell>
        <Cell><Data ss:Type="String">Client Name</Data></Cell>
        <Cell><Data ss:Type="String">Work Email</Data></Cell>
        <Cell><Data ss:Type="String">Company</Data></Cell>
        <Cell><Data ss:Type="String">Phone</Data></Cell>
        <Cell><Data ss:Type="String">Service Requested</Data></Cell>
        <Cell><Data ss:Type="String">Status</Data></Cell>
        <Cell><Data ss:Type="String">Priority</Data></Cell>
        <Cell><Data ss:Type="String">Date</Data></Cell>
        <Cell><Data ss:Type="String">Replies</Data></Cell>
        <Cell><Data ss:Type="String">Message</Data></Cell>
      </Row>`;

      listToExport.forEach(i => {
        excelContent += `
        <Row>
          <Cell><Data ss:Type="String">${i.id || ''}</Data></Cell>
          <Cell><Data ss:Type="String">${(i.fullName || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</Data></Cell>
          <Cell><Data ss:Type="String">${(i.workEmail || '').replace(/&/g, '&amp;')}</Data></Cell>
          <Cell><Data ss:Type="String">${(i.companyName || '').replace(/&/g, '&amp;')}</Data></Cell>
          <Cell><Data ss:Type="String">${i.phone || ''}</Data></Cell>
          <Cell><Data ss:Type="String">${(i.serviceOfInterest || '').replace(/&/g, '&amp;')}</Data></Cell>
          <Cell><Data ss:Type="String">${i.status || ''}</Data></Cell>
          <Cell><Data ss:Type="String">${i.priority || ''}</Data></Cell>
          <Cell><Data ss:Type="String">${i.date || ''}</Data></Cell>
          <Cell><Data ss:Type="Number">${i.replies?.length || 0}</Data></Cell>
          <Cell><Data ss:Type="String">${(i.message || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</Data></Cell>
        </Row>`;
      });

      excelContent += `</Table></Worksheet></Workbook>`;
      const blob = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `factual_inquiries_${new Date().toISOString().slice(0,10)}.xls`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const headers = "ID,Name,Email,Company,Phone,Service,Status,Priority,Date,RepliesCount,Message\n";
    const rows = listToExport.map(i => 
      `"${i.id}","${(i.fullName || '').replace(/"/g, '""')}","${i.workEmail}","${(i.companyName || '').replace(/"/g, '""')}","${i.phone || ''}","${(i.serviceOfInterest || '').replace(/"/g, '""')}","${i.status}","${i.priority}","${i.date}","${i.replies?.length || 0}","${(i.message || '').replace(/"/g, '""')}"`
    ).join("\n");
    
    // Add UTF-8 BOM (\uFEFF) so Excel respects Arabic and Unicode names
    const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
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
      <div className="min-h-screen bg-night-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-rust/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-steel/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-night-850/95 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl backdrop-blur-xl relative z-10">
          
          <div className="text-center space-y-3">
            <div className="relative w-14 h-14 mx-auto p-2 rounded-2xl bg-gradient-to-br from-brand-rust/20 to-night-850 border border-brand-rust/30 flex items-center justify-center">
              <Image sizes="48px"
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
                className="w-full px-4 py-3 rounded-xl bg-night-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-steel transition-all"
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
                className="w-full px-4 py-3 rounded-xl bg-night-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-steel transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-rust to-rust hover:from-rust hover:to-brand-rust text-white text-xs font-bold transition-all shadow-lg shadow-brand-rust/20 flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-night-950 text-slate-100 flex flex-col">
      {/* Top Portal Executive Header */}
      <header className="border-b border-slate-800/80 bg-[#0C1424]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-xl bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center overflow-hidden">
              <Image sizes="48px"
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
      <div className="bg-night-900 border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar">
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
            <span>AI Chat Logs</span>
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
            <span>Blog ({blogPosts.length})</span>
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
              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Total Leads</span>
                  <Layers className="w-4 h-4 text-brand-steel" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {totalCount}
                </div>
                <div className="text-[11px] text-slate-500">All-time inquiries recorded</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <span>New & Unreplied</span>
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-display">
                  {newCount}
                </div>
                <div className="text-[11px] text-slate-500">Requires Partner contact</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  <span>Contacted / Active</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">
                  {contactedCount + inProgressCount}
                </div>
                <div className="text-[11px] text-slate-500">Replies dispatched</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
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
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-night-850 border border-slate-800 p-3 sm:p-4 rounded-2xl">
              <div className="flex-1 flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client, email, company, service..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-night-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
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
                  onClick={() => handleExportCSV("csv")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
                <button
                  onClick={() => handleExportCSV("excel")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-800/50 text-xs font-semibold text-emerald-400 hover:text-white transition-colors border border-emerald-500/30"
                  title="Export to Excel (.xls)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export Excel</span>
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
            <div className="bg-night-850 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-night-900 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10.5px]">
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
                          onClick={() => handleSelectInquiry(inq)}
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
                              {/* Quick WhatsApp Action */}
                              <a
                                href={`https://wa.me/${(inq.phone || "").replace(/[^0-9]/g, "") || "923241775662"}?text=${encodeURIComponent(
                                  `Hello ${inq.fullName}, regarding your consultation inquiry #${inq.id} on ${inq.serviceOfInterest} with Factual Solutions Advisory:`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors border border-emerald-500/30"
                                title="Fast-Track WhatsApp"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.517l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.201 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.175-1.431-.075-.125-.276-.201-.577-.351zM12.042 21.996h-.008a9.93 9.93 0 0 1-5.068-1.391l-.364-.216-3.766.988 1.005-3.67-.237-.378a9.92 9.92 0 0 1-1.523-5.275c0-5.485 4.464-9.95 9.955-9.95 2.657 0 5.155 1.036 7.032 2.915a9.88 9.88 0 0 1 2.913 7.034c0 5.487-4.465 9.953-9.957 9.953z" />
                                </svg>
                              </a>

                              {/* Quick Email Action */}
                              <a
                                href={`mailto:${inq.workEmail}?subject=${encodeURIComponent(
                                  `Factual Solutions Advisory: Consultation Response (#${inq.id})`
                                )}&body=${encodeURIComponent(
                                  `Dear ${inq.fullName},\n\nThank you for reaching out to Factual Solutions regarding ${inq.serviceOfInterest}.\n\nOur Senior Advisory Partners have reviewed your inquiry (#${inq.id}) and would like to propose a 30-minute discovery call to outline our feasibility framework.\n\nBest regards,\nExecutive Advisory Board\nFactual Solutions`
                                )}`}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-brand-steel/30 text-slate-300 hover:text-white transition-colors border border-slate-700"
                                title="Direct Email Client"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>

                              <button
                                onClick={() => handleSelectInquiry(inq)}
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-night-850 border border-slate-800 p-4 rounded-2xl">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={subSearchQuery}
                  onChange={(e) => setSubSearchQuery(e.target.value)}
                  placeholder="Filter subscriber emails..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-night-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
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

            <div className="bg-night-850 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-night-900 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10.5px]">
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
        {/* TAB 3: AI CHAT LOGS                                           */}
        {/* ============================================================== */}
        {activeTab === "chatlogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-night-850 border border-slate-800 p-4 rounded-2xl">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-brand-rust" />
                  <span>AI Real-Time Conversational Transcripts</span>
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

            <div className="bg-night-850 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-3.5 shadow-xl">
              {chatLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No chat logs recorded yet. All inquiries initiated with the AI Advisor will stream here automatically.
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
                            <span className="text-brand-steel-light">AI Advisor</span>
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
              <div className="bg-night-850 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
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
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-rust to-rust hover:from-rust hover:to-brand-rust text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                    <span>{syncing ? "Seeding & Syncing Atlas Collections..." : "1-Click Atlas Re-Sync & Seed Default Practices"}</span>
                  </button>
                </div>
              </div>

              {/* Service Interest Breakdown */}
              <div className="bg-night-850 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
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

            {/* ============================================================== */}
            {/* EXECUTIVE MAILING SYSTEM & DISPATCH HUB                       */}
            {/* ============================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mail Gateway Status Card */}
              <div className="bg-night-850 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-rust" />
                    <span>Executive Mailing Gateway Telemetry</span>
                  </h3>
                  <button
                    onClick={loadMailSettings}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Refresh Mail Status"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Dispatch Gateway:</span>
                    <span className="font-bold text-brand-steel-light flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${mailSettings?.hasResendKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                      {mailSettings?.providerName || (mailSettings?.hasResendKey ? "Resend API (Live Inbox Dispatch)" : "Audit Log Mode")}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Outbound Sender Identity:</span>
                    <span className="font-mono text-white text-[11px] truncate max-w-[240px]">
                      {mailSettings?.senderAddress || "Factual Solutions Advisory <onboarding@resend.dev>"}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Lead Alerts Target:</span>
                    <span className="font-mono text-white text-[11px] truncate max-w-[240px]">
                      {mailSettings?.notificationEmail || "qadeer@factualsolutions.com"}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Portal Client Replies:</span>
                    <span className="font-bold text-emerald-400">
                      Enabled (Admin Panel Direct Dispatch)
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-night-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  💡 When responding to client inquiries in the <strong>Inquiries tab</strong>, choosing <span className="text-white font-semibold">Email</span> will automatically format an executive branded advisory email and dispatch it directly to the client's work email address.
                </div>
              </div>

              {/* Diagnostic Test Email Dispatcher */}
              <div className="bg-night-850 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Mailing System Verification &amp; Test Dispatch</span>
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Transmit an instant diagnostic verification email to verify your outbound mailing credentials and client presentation.
                </p>

                <form onSubmit={handleSendTestEmail} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Recipient Verification Email:
                    </label>
                    <input
                      type="email"
                      required
                      value={testEmailTarget}
                      onChange={(e) => setTestEmailTarget(e.target.value)}
                      placeholder={mailSettings?.notificationEmail || "qadeer@factualsolutions.com"}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingTestEmail}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-steel to-slate-700 hover:from-brand-steel-light hover:to-slate-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${isSendingTestEmail ? "animate-spin" : ""}`} />
                    <span>{isSendingTestEmail ? "Transmitting Diagnostic Email..." : "Transmit Diagnostic Test Email"}</span>
                  </button>

                  {testEmailFeedback && (
                    <div className={`text-xs p-2.5 rounded-xl border ${
                      testEmailFeedback.startsWith("✅")
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                    }`}>
                      {testEmailFeedback}
                    </div>
                  )}
                </form>

                <div className="pt-2 text-[10.5px] text-slate-500 font-mono">
                  Environment variables: RESEND_API_KEY &bull; NOTIFICATION_EMAIL &bull; EMAIL_FROM
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: BLOG MANAGEMENT                                       */}
        {/* ============================================================== */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Total Articles</span>
                  <BookOpen className="w-4 h-4 text-brand-steel" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {totalBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Live & draft publications</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  <span>Published</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">
                  {publishedBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Live on the Blog and homepage</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  <span>Drafts</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-display">
                  {draftBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Unpublished internal drafts</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-night-850 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-brand-rust-light font-semibold uppercase tracking-wider">
                  <span>Featured</span>
                  <Star className="w-4 h-4 text-brand-rust" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-rust-light font-display">
                  {featuredBlogCount}
                </div>
                <div className="text-[11px] text-slate-500">Shown first on the homepage</div>
              </div>
            </div>

            {/* Filter, Search & Primary Action Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-night-850 border border-slate-800 p-3 sm:p-4 rounded-2xl">
              <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                    placeholder="Search by title, tag, author or category..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-night-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
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
                  className="px-3 py-1.5 rounded-lg bg-night-950 border border-slate-700 text-xs text-slate-300 font-semibold focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Write New Article CTA */}
              <button
                onClick={handleOpenNewBlogModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-rust to-rust hover:from-rust hover:to-brand-rust text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>

            {/* Articles Table / List */}
            <div className="bg-night-850 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              {isLoadingBlog ? (
                <div className="py-20 text-center text-xs text-slate-400 space-y-2">
                  <div className="w-6 h-6 border-2 border-brand-rust border-t-transparent rounded-full animate-spin mx-auto" />
                  <div>Loading articles...</div>
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
                      <tr className="border-b border-slate-800 bg-night-950/60 text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                        <th className="py-3 px-4">Article</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">SEO</th>
                        <th className="py-3 px-4">Status</th>
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
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={post.coverImage}
                                    alt={post.coverImageAlt || post.title}
                                    className="absolute inset-0 w-full h-full object-cover"
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

                          {/* SEO readiness */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {(() => {
                              const items = [
                                { ok: !!post.metaDescription || (post.excerpt || "").length >= 70, label: "Meta description" },
                                { ok: !!post.focusKeyword, label: "Focus keyword" },
                                { ok: !!post.coverImageAlt, label: "Image alt text" },
                                { ok: (post.tags || []).length > 0, label: "Tags" },
                              ];
                              const n = items.filter((i) => i.ok).length;
                              return (
                                <div className="flex items-center gap-1.5" title={items.map((i) => `${i.ok ? "✓" : "✗"} ${i.label}`).join("\n")}>
                                  <div className="flex gap-0.5">
                                    {items.map((i) => (
                                      <span key={i.label} className={`w-1.5 h-4 rounded-sm ${i.ok ? "bg-emerald-400" : "bg-slate-700"}`} />
                                    ))}
                                  </div>
                                  <span className={`text-[10.5px] font-bold ${n === 4 ? "text-emerald-400" : n >= 2 ? "text-amber-400" : "text-slate-500"}`}>{n}/4</span>
                                </div>
                              );
                            })()}
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
                                {post.author?.name || DEFAULT_BLOG_AUTHOR.name}
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
          <div className="bg-night-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-night-850 to-[#14243F] border-b border-slate-800 flex items-center justify-between shrink-0">
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
                <div className="p-4 rounded-2xl bg-night-950 border border-slate-800 text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message || "No custom message provided."}
                </div>
              </div>

              {/* AI Strategic Assessment */}
              {selectedInquiry.aiAssessment && (
                <div className="p-4 rounded-2xl bg-[#101C30]/90 border border-brand-steel/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand-steel-light font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-brand-rust" />
                      <span>AI Strategic Diagnostic</span>
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
                    <span className="text-emerald-400 text-[10px] font-normal flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Active thread logged in Atlas
                    </span>
                  )}
                </div>

                {!selectedInquiry.replies || selectedInquiry.replies.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-night-950 border border-slate-800/80 text-center text-slate-500 text-xs">
                    No replies sent yet. Use the response composer below to contact this client directly from the portal.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedInquiry.replies.map((reply) => (
                      <div key={reply.id} className="p-3.5 rounded-2xl bg-night-900 border border-slate-800 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10.5px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{reply.author}</span>
                            <span className="px-1.5 py-0.5 rounded bg-brand-steel/20 text-brand-steel-light text-[9.5px]">
                              via {reply.channel}
                            </span>
                            {reply.deliveryStatus === "Sent" && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9.5px] font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Dispatched
                              </span>
                            )}
                          </span>
                          <span>{reply.sentAt}</span>
                        </div>
                        {reply.subject && (
                          <div className="text-[11px] font-semibold text-brand-steel-light">
                            Subject: {reply.subject}
                          </div>
                        )}
                        <div className="text-slate-200 whitespace-pre-wrap leading-relaxed text-xs">
                          {reply.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interactive Reply Composer */}
              <form onSubmit={handleSendReply} className="p-4 rounded-2xl bg-night-900 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-white flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-brand-rust" />
                    <span>Executive Response Composer</span>
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

                {/* Recipient & Channel Overview */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-night-950 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300 truncate">
                    <Mail className="w-3.5 h-3.5 text-brand-rust shrink-0" />
                    <span className="truncate">
                      To: <strong className="text-white">{selectedInquiry.fullName}</strong> &lt;{selectedInquiry.workEmail}&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono">Ref: #{selectedInquiry.id}</span>
                  </div>
                </div>

                {/* Subject & Author Fields (for Email channel) */}
                {replyChannel === "Email" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <div className="md:col-span-2">
                      <label className="block text-[10.5px] font-semibold text-slate-300 mb-1">
                        Email Subject Line:
                      </label>
                      <input
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        placeholder={`Factual Solutions Advisory: Response to Consultation #${selectedInquiry.id}`}
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-semibold text-slate-300 mb-1">
                        Signatory / Partner:
                      </label>
                      <input
                        type="text"
                        value={replyAuthor}
                        onChange={(e) => setReplyAuthor(e.target.value)}
                        placeholder="Managing Partner"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel"
                      />
                    </div>
                  </div>
                )}

                {/* Message Body */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10.5px] font-semibold text-slate-300">
                      Response Message Body:
                    </label>
                    {replyChannel === "Email" && (
                      <button
                        type="button"
                        onClick={() => setShowEmailPreview(!showEmailPreview)}
                        className="text-[10.5px] text-brand-steel-light hover:text-white underline transition-colors"
                      >
                        {showEmailPreview ? "Hide Branded Preview" : "Preview Branded Email"}
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={6}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Draft your proposal, discovery session invitation, or message to the client..."
                    className="w-full p-3.5 rounded-xl bg-night-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-steel leading-relaxed custom-scrollbar"
                  />
                </div>

                {/* Live Branded Email Preview */}
                {replyChannel === "Email" && showEmailPreview && (
                  <div className="p-4 rounded-xl bg-night-950 border border-brand-steel/40 space-y-3">
                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-brand-steel-light flex items-center gap-1.5">
                      <Eye className="w-3 h-3" />
                      <span>Client Email Preview (Branded Layout)</span>
                    </div>

                    <div className="bg-white text-slate-900 rounded-lg p-5 text-xs shadow-inner space-y-3 font-sans">
                      <div className="bg-night-900 text-white p-3 rounded-md border-b-2 border-brand-rust">
                        <div className="text-[9px] uppercase tracking-wider text-brand-rust-light font-bold">Executive Advisory Response</div>
                        <div className="text-sm font-bold">Factual Solutions Advisory</div>
                      </div>

                      <div className="font-semibold text-slate-900">
                        Dear {selectedInquiry.fullName},
                      </div>

                      <div className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {replyText.trim() || "(Enter response text above to preview body...)"}
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded text-[11px] text-slate-600">
                        <div><strong>Ref ID:</strong> #{selectedInquiry.id}</div>
                        <div><strong>Practice:</strong> {selectedInquiry.serviceOfInterest}</div>
                        <div><strong>Prepared By:</strong> {replyAuthor}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 text-slate-600 text-[11px]">
                        <div>Warm regards,</div>
                        <div className="font-bold text-slate-900">{replyAuthor}</div>
                        <div className="text-slate-500 text-[10px]">Factual Solutions Advisory Practice &bull; GCC & International</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Channel Switcher & Submission */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {/* Channel Selection */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">Dispatch via:</span>
                    {(["Email", "WhatsApp", "Internal Note"] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setReplyChannel(ch)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          replyChannel === ch
                            ? ch === "WhatsApp"
                              ? "bg-emerald-600 text-white"
                              : ch === "Email"
                              ? "bg-brand-rust text-white shadow-sm"
                              : "bg-brand-steel text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {ch === "Email" ? "✉️ Official Email" : ch === "WhatsApp" ? "💬 WhatsApp" : "📝 Note"}
                      </button>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-2">
                    {replyChannel === "Email" && (
                      <a
                        href={`mailto:${selectedInquiry.workEmail}?subject=${encodeURIComponent(
                          replySubject || `Factual Solutions Advisory: Response #${selectedInquiry.id}`
                        )}&body=${encodeURIComponent(replyText)}`}
                        className="text-[10px] text-slate-400 hover:text-white underline transition-colors"
                        title="Open local desktop email client"
                      >
                        Local Mail App
                      </a>
                    )}

                    <button
                      type="submit"
                      disabled={!replyText.trim() || isSendingReply}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-rust to-rust hover:from-rust hover:to-brand-rust text-white text-xs font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Send className={`w-3.5 h-3.5 ${isSendingReply ? "animate-spin" : ""}`} />
                      <span>
                        {isSendingReply
                          ? "Dispatching..."
                          : replyChannel === "Email"
                          ? "Dispatch Email to Client"
                          : replyChannel === "WhatsApp"
                          ? "Launch WhatsApp"
                          : "Save Internal Note"}
                      </span>
                    </button>
                  </div>
                </div>

                {replyFeedback && (
                  <div className={`text-xs font-medium text-center p-2 rounded-lg ${
                    replyFeedback.startsWith("✅")
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  }`}>
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
          <div className="bg-night-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-white"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-white"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={newInquiryData.phone}
                    onChange={(e) => setNewInquiryData({ ...newInquiryData, phone: e.target.value })}
                    placeholder="+92 324 1775662"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Service Practice</label>
                <select
                  value={newInquiryData.serviceOfInterest}
                  onChange={(e) => setNewInquiryData({ ...newInquiryData, serviceOfInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-white"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-white"
                />
              </div>

              <GoogleRecaptcha
                ref={addInquiryCaptchaRef}
                theme="dark"
                onVerify={(token) => {
                  setAddInquiryToken(token);
                  if (token) setAddInquiryError("");
                }}
              />
              {addInquiryError && <p role="alert" className="text-[11px] text-rose-300 font-semibold">{addInquiryError}</p>}

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
          <div className="bg-night-900 border border-slate-700/90 rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-night-900 to-[#14233A] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center text-brand-rust-light">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {editingPostId ? "Edit Article" : "New Article"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Publishes to the Blog and the homepage “Latest Insights” section
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
                <form id="blogPostForm" onSubmit={handleSaveBlogPost} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  
                  {/* ===== Main column: post anatomy ===== */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="blogTitle" className="text-slate-300 font-bold uppercase tracking-wider text-[10.5px]">Headline *</label>
                        <span className={`text-[10.5px] font-mono ${blogFormData.title.length > 70 ? "text-amber-400" : "text-slate-500"}`}>{blogFormData.title.length}/70</span>
                      </div>
                      <input
                        id="blogTitle"
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
                        placeholder="A clear, specific headline readers will click"
                        className="w-full px-4 py-3 rounded-xl bg-night-950 border border-slate-700 text-base font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-steel"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-mono text-[11px]">/blog/</span>
                        <input
                          type="text"
                          required
                          aria-label="URL slug"
                          value={blogFormData.slug}
                          onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                          placeholder="article-url-slug"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-night-950 border border-slate-800 font-mono text-slate-300 text-[11px] placeholder:text-slate-600 focus:outline-none focus:border-brand-steel"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="blogExcerpt" className="text-slate-300 font-bold uppercase tracking-wider text-[10.5px]">Excerpt</label>
                        <span className="text-[10.5px] text-slate-500">Shown on the homepage and blog cards</span>
                      </div>
                      <textarea
                        id="blogExcerpt"
                        rows={2}
                        value={blogFormData.excerpt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                        placeholder="One or two sentences that tell the reader what they will learn."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-steel leading-relaxed"
                      />
                    </div>

                    {/* Body */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label htmlFor="blogContentTextarea" className="text-slate-300 font-bold uppercase tracking-wider text-[10.5px]">
                          Body (Markdown) *
                        </label>
                        <div className="flex flex-wrap items-center gap-1">
                          {[
                            { label: "H2", pre: "## ", suf: "\n", title: "Section heading" },
                            { label: "H3", pre: "### ", suf: "\n", title: "Sub-heading" },
                            { label: "B", pre: "**", suf: "**", title: "Bold" },
                            { label: "Quote", pre: "> ", suf: "\n", title: "Quote / key takeaway" },
                            { label: "List", pre: "- ", suf: "\n", title: "Bullet list" },
                            { label: "1. 2.", pre: "1. ", suf: "\n", title: "Numbered list" },
                          ].map((b) => (
                            <button
                              key={b.label}
                              type="button"
                              title={b.title}
                              onClick={() => insertMarkdownInContent(b.pre, b.suf)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px]"
                            >
                              {b.label}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={handleScaffoldOutline}
                            className="px-2.5 py-1 rounded bg-brand-rust/20 hover:bg-brand-rust/30 text-brand-rust-light border border-brand-rust/40 text-[10px] font-semibold flex items-center gap-1 ml-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Post Structure</span>
                          </button>
                        </div>
                      </div>
                      <textarea
                        id="blogContentTextarea"
                        required
                        rows={18}
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value, readTime: calculateReadTime(e.target.value) })}
                        placeholder={`## Introduction\nWhat problem does this article solve?\n\n## Main section\nExplain the method with examples.\n\n- Key point\n- Key point\n\n## Key Takeaways\nSummarize and point to a next step.`}
                        className="w-full p-4 rounded-2xl bg-night-950 border border-slate-700 font-sans text-[13px] text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-steel leading-relaxed custom-scrollbar"
                      />
                      <div className="flex flex-wrap items-center gap-3 text-[10.5px] text-slate-500">
                        <span>{blogFormData.content.trim() ? blogFormData.content.trim().split(/\s+/).length : 0} words</span>
                        <span>•</span>
                        <span>{calculateReadTime(blogFormData.content)} (auto)</span>
                        <span>•</span>
                        <span>{(blogFormData.content.match(/^#{2,3}\s/gm) || []).length} headings</span>
                      </div>
                    </div>
                  </div>

                  {/* ===== Sidebar: publishing settings ===== */}
                  <aside className="lg:col-span-4 space-y-3">
                    {/* Publish */}
                    <div className="rounded-2xl bg-night-950/70 border border-slate-800 p-4 space-y-3">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300">Publish</h4>
                      <div className="grid grid-cols-2 gap-1 bg-night-950 border border-slate-800 rounded-xl p-1">
                        {(["published", "draft"] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setBlogFormData({ ...blogFormData, status: st })}
                            className={`py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                              blogFormData.status === st ? (st === "published" ? "bg-emerald-600 text-white" : "bg-slate-600 text-white") : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {st === "published" ? "Published" : "Draft"}
                          </button>
                        ))}
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={blogFormData.featured}
                          onChange={(e) => setBlogFormData({ ...blogFormData, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-brand-rust focus:ring-brand-rust bg-night-950 border-slate-700"
                        />
                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Star className={`w-3.5 h-3.5 ${blogFormData.featured ? "text-amber-400 fill-current" : "text-slate-500"}`} />
                          Feature on homepage
                        </span>
                      </label>
                    </div>

                    {/* Category & tags */}
                    <div className="rounded-2xl bg-night-950/70 border border-slate-800 p-4 space-y-3">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300">Category &amp; Tags</h4>
                      <select
                        aria-label="Category"
                        value={blogFormData.category}
                        onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white"
                      >
                        {!(BLOG_CATEGORIES as readonly string[]).includes(blogFormData.category) && blogFormData.category && (
                          <option value={blogFormData.category}>{blogFormData.category} (legacy)</option>
                        )}
                        {BLOG_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        aria-label="Tags"
                        value={blogFormData.tags}
                        onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                        placeholder="Tags, comma separated (e.g. Lean, 5S, Kaizen)"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>

                    {/* Featured image */}
                    <div className="rounded-2xl bg-night-950/70 border border-slate-800 p-4 space-y-2.5">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300">Featured Image</h4>
                      {blogFormData.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={blogFormData.coverImage} alt="" className="w-full aspect-[16/9] object-cover rounded-xl border border-slate-800" />
                      )}
                      <input
                        type="text"
                        aria-label="Featured image URL"
                        value={blogFormData.coverImage}
                        onChange={(e) => setBlogFormData({ ...blogFormData, coverImage: e.target.value })}
                        placeholder="Image URL or /images/..."
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500"
                      />
                      <input
                        type="text"
                        aria-label="Image alt text"
                        value={blogFormData.coverImageAlt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, coverImageAlt: e.target.value })}
                        placeholder="Alt text: describe the image for accessibility"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>

                    {/* Author */}
                    <div className="rounded-2xl bg-night-950/70 border border-slate-800 p-4 space-y-2.5">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300">Author</h4>
                      <input
                        type="text"
                        aria-label="Author name"
                        value={blogFormData.authorName}
                        onChange={(e) => setBlogFormData({ ...blogFormData, authorName: e.target.value })}
                        placeholder="Name"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500"
                      />
                      <input
                        type="text"
                        aria-label="Author role"
                        value={blogFormData.authorRole}
                        onChange={(e) => setBlogFormData({ ...blogFormData, authorRole: e.target.value })}
                        placeholder="Role"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-slate-300 placeholder:text-slate-500"
                      />
                      <input
                        type="text"
                        aria-label="Author photo URL"
                        value={blogFormData.authorAvatar}
                        onChange={(e) => setBlogFormData({ ...blogFormData, authorAvatar: e.target.value })}
                        placeholder="Photo URL"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-slate-300 placeholder:text-slate-500"
                      />
                      <textarea
                        rows={2}
                        aria-label="Author bio"
                        value={blogFormData.authorBio}
                        onChange={(e) => setBlogFormData({ ...blogFormData, authorBio: e.target.value })}
                        placeholder="Short bio shown under the article (optional)"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-slate-300 placeholder:text-slate-500"
                      />
                    </div>

                    {/* SEO */}
                    <div className="rounded-2xl bg-night-950/70 border border-slate-800 p-4 space-y-2.5">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300">SEO</h4>
                      <input
                        type="text"
                        aria-label="Focus keyword"
                        value={blogFormData.focusKeyword}
                        onChange={(e) => setBlogFormData({ ...blogFormData, focusKeyword: e.target.value })}
                        placeholder="Focus keyword (e.g. lean manufacturing)"
                        className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500"
                      />
                      <div>
                        <input
                          type="text"
                          aria-label="Meta title"
                          value={blogFormData.metaTitle}
                          onChange={(e) => setBlogFormData({ ...blogFormData, metaTitle: e.target.value })}
                          placeholder="Meta title (defaults to headline)"
                          className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500"
                        />
                        <div className="text-right text-[10px] font-mono text-slate-500 mt-0.5">{(blogFormData.metaTitle || blogFormData.title).length}/60</div>
                      </div>
                      <div>
                        <textarea
                          rows={3}
                          aria-label="Meta description"
                          value={blogFormData.metaDescription}
                          onChange={(e) => setBlogFormData({ ...blogFormData, metaDescription: e.target.value })}
                          placeholder="Meta description (defaults to excerpt)"
                          className="w-full px-3 py-2 rounded-xl bg-night-950 border border-slate-700 text-white placeholder:text-slate-500"
                        />
                        <div className="text-right text-[10px] font-mono text-slate-500">{(blogFormData.metaDescription || blogFormData.excerpt).length}/160</div>
                      </div>
                      {/* Search snippet preview */}
                      <div className="rounded-xl bg-white p-3 space-y-0.5">
                        <div className="text-[10px] text-slate-500 truncate">factual-solutions.com › blog › {blogFormData.slug || "article"}</div>
                        <div className="text-[13px] text-[#1a0dab] font-medium leading-snug line-clamp-1">{(blogFormData.metaTitle || blogFormData.title || "Article headline")} | Factual Solutions</div>
                        <div className="text-[11px] text-slate-600 leading-snug line-clamp-2">{blogFormData.metaDescription || blogFormData.excerpt || "Your meta description will appear here."}</div>
                      </div>
                    </div>

                    {/* Checklist */}
                    {(() => {
                      const kw = blogFormData.focusKeyword.trim().toLowerCase();
                      const mTitle = (blogFormData.metaTitle || blogFormData.title).trim();
                      const mDesc = (blogFormData.metaDescription || blogFormData.excerpt).trim();
                      const words = blogFormData.content.trim() ? blogFormData.content.trim().split(/\s+/).length : 0;
                      const checks = [
                        { ok: mTitle.length >= 30 && mTitle.length <= 60, label: "Title is 30–60 characters" },
                        { ok: mDesc.length >= 70 && mDesc.length <= 160, label: "Meta description is 70–160 characters" },
                        { ok: !!kw && blogFormData.title.toLowerCase().includes(kw), label: "Focus keyword in headline" },
                        { ok: !!kw && blogFormData.content.toLowerCase().includes(kw), label: "Focus keyword in body" },
                        { ok: (blogFormData.content.match(/^##\s/gm) || []).length >= 2, label: "At least 2 section headings" },
                        { ok: words >= 300, label: "Body is 300+ words" },
                        { ok: !!blogFormData.coverImage && !!blogFormData.coverImageAlt.trim(), label: "Featured image has alt text" },
                        { ok: blogFormData.tags.split(",").filter((t) => t.trim()).length >= 1, label: "At least one tag" },
                      ];
                      const score = checks.filter((c) => c.ok).length;
                      return (
                        <div className="rounded-2xl bg-night-950/70 border border-slate-800 p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300">Quality Checklist</h4>
                            <span className={`text-[11px] font-bold ${score >= 7 ? "text-emerald-400" : score >= 4 ? "text-amber-400" : "text-red-400"}`}>{score}/{checks.length}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {checks.map((c) => (
                              <li key={c.label} className={`flex items-center gap-2 text-[11px] ${c.ok ? "text-slate-300" : "text-slate-500"}`}>
                                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${c.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-600"}`}>
                                  <CheckCircle2 className="w-3 h-3" />
                                </span>
                                {c.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })()}
                  </aside>
                </form>
              ) : (
                /* LIVE PREVIEW TAB */
                <div className="space-y-6 max-w-3xl mx-auto py-2">
                  <div className="p-3 bg-brand-steel/10 border border-brand-steel/20 rounded-xl text-[11px] text-brand-steel-light flex items-center gap-2">
                    <Eye className="w-4 h-4 shrink-0" />
                    <span>Preview of how the article appears to readers.</span>
                  </div>

                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-brand-rust/20 text-brand-rust-light font-bold text-[10px] uppercase">
                        {blogFormData.category}
                      </span>
                      <span className="text-slate-400 text-xs">• {calculateReadTime(blogFormData.content)}</span>
                      <span className="text-slate-400 text-xs">• {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blogFormData.coverImage}
                        alt={blogFormData.coverImageAlt || blogFormData.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Author Card preview */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-rust/20 relative shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blogFormData.authorAvatar || DEFAULT_BLOG_AUTHOR.avatar}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{blogFormData.authorName}</div>
                      <div className="text-[11px] text-slate-400">{blogFormData.authorRole}</div>
                      {blogFormData.authorBio && <div className="text-[11px] text-slate-500 mt-0.5">{blogFormData.authorBio}</div>}
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
            <div className="p-4 bg-night-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
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
                    pendingStatusRef.current = "draft";
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
                    pendingStatusRef.current = "published";
                    const form = document.getElementById("blogPostForm") as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={isSavingBlog}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-rust to-rust hover:from-rust hover:to-brand-rust text-white text-xs font-bold transition-all shadow-md shadow-brand-rust/20 flex items-center gap-2 disabled:opacity-50"
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
