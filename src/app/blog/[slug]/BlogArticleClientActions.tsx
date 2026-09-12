"use client";

import React, { useState } from "react";
import { Share2, Copy, CheckCircle2, Linkedin, Twitter, MessageCircle } from "lucide-react";

export default function BlogArticleClientActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = (platform: "linkedin" | "twitter" | "whatsapp") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Insight: ${title} | Factual Solutions`);

    let shareUrl = "";
    if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      <button
        onClick={handleCopyLink}
        title="Copy article link"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
      >
        {copied ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={() => handleShare("linkedin")}
        title="Share on LinkedIn"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] text-slate-600 dark:text-slate-300 transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare("twitter")}
        title="Share on X (Twitter)"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
      >
        <Twitter className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare("whatsapp")}
        title="Share via WhatsApp"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-500 text-slate-600 dark:text-slate-300 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
      </button>
    </div>
  );
}
