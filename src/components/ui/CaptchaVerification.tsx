"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { RotateCw, ShieldCheck, Check, AlertCircle, HelpCircle } from "lucide-react";

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  language?: string;
  className?: string;
}

// Characters that avoid visual confusion (no 0/O, 1/I/l)
const CHAR_SET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function generateRandomCode(length = 5): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
  }
  return result;
}

export default function CaptchaVerification({
  onVerify,
  language = "en",
  className = "",
}: CaptchaProps) {
  const isAr = language === "ar";

  const [code, setCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mode, setMode] = useState<"visual" | "math">("visual");
  const [mathQuestion, setMathQuestion] = useState({ q: "4 + 3", a: 7 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawVisualCaptcha = useCallback((text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Subtle gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "rgba(226, 92, 67, 0.08)");
    bgGrad.addColorStop(1, "rgba(15, 23, 42, 0.12)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw interference lines
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      );
      ctx.strokeStyle = i % 2 === 0 ? "rgba(226, 92, 67, 0.35)" : "rgba(100, 116, 139, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Draw noise dots
    for (let i = 0; i < 35; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
      ctx.fill();
    }

    // Draw each character with random rotation & scale
    const charSpacing = width / (text.length + 1);
    const colors = ["#A2351E", "#0E1A38", "#1F3A7D", "#872A17", "#5E86C4"];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = (i + 1) * charSpacing;
      const y = height / 2 + 6;

      ctx.save();
      ctx.translate(x, y);
      const angle = (Math.random() - 0.5) * 0.45;
      ctx.rotate(angle);

      ctx.font = "bold 22px 'Outfit', 'Inter', monospace, sans-serif";
      ctx.fillStyle = colors[i % colors.length];
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
      ctx.shadowBlur = 3;

      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  }, []);

  const refreshCaptcha = useCallback(() => {
    setIsRefreshing(true);
    setUserInput("");
    setIsVerified(false);
    setHasError(false);
    onVerify(false);

    if (mode === "visual") {
      const newCode = generateRandomCode(5);
      setCode(newCode);
      setTimeout(() => {
        drawVisualCaptcha(newCode);
        setIsRefreshing(false);
      }, 100);
    } else {
      const n1 = Math.floor(Math.random() * 12) + 2;
      const n2 = Math.floor(Math.random() * 9) + 1;
      const isSub = Math.random() > 0.6 && n1 > n2;
      if (isSub) {
        setMathQuestion({ q: `${n1} - ${n2} = ?`, a: n1 - n2 });
      } else {
        setMathQuestion({ q: `${n1} + ${n2} = ?`, a: n1 + n2 });
      }
      setIsRefreshing(false);
    }
  }, [drawVisualCaptcha, mode, onVerify]);

  useEffect(() => {
    refreshCaptcha();
  }, [mode]); // Re-run when mode changes

  const handleInputChange = (val: string) => {
    setUserInput(val);
    setHasError(false);

    const cleanInput = val.trim();

    if (mode === "visual") {
      if (cleanInput.toUpperCase() === code.toUpperCase()) {
        setIsVerified(true);
        onVerify(true);
      } else {
        setIsVerified(false);
        onVerify(false);
        if (cleanInput.length >= code.length) {
          setHasError(true);
        }
      }
    } else {
      if (parseInt(cleanInput, 10) === mathQuestion.a) {
        setIsVerified(true);
        onVerify(true);
      } else {
        setIsVerified(false);
        onVerify(false);
        if (cleanInput.length >= String(mathQuestion.a).length) {
          setHasError(true);
        }
      }
    }
  };

  return (
    <div className={`space-y-2 p-3.5 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 ${className}`}>
      
      {/* Header with security icon & mode switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          <span>{isAr ? "التحقق الأمني من الهوية" : "Human Verification"}</span>
        </div>

        <button
          type="button"
          onClick={() => setMode(mode === "visual" ? "math" : "visual")}
          className="text-[10px] text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-white transition-colors underline"
        >
          {mode === "visual"
            ? (isAr ? "التبديل إلى سؤال رياضي" : "Switch to math challenge")
            : (isAr ? "التبديل إلى رمز بصري" : "Switch to visual code")}
        </button>
      </div>

      {/* Challenge Display & Refresh */}
      <div className="flex items-center gap-3">
        {mode === "visual" ? (
          <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={160}
              height={44}
              className="block cursor-pointer select-none"
              onClick={refreshCaptcha}
              title={isAr ? "انقر لتجديد الرمز" : "Click to refresh code"}
            />
          </div>
        ) : (
          <div className="h-[44px] min-w-[160px] px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 flex items-center justify-center font-mono font-bold text-sm text-ink dark:text-white shadow-inner select-none">
            {mathQuestion.q}
          </div>
        )}

        <button
          type="button"
          onClick={refreshCaptcha}
          className="p-2.5 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/30 text-slate-600 dark:text-slate-200 hover:text-accent transition-colors shadow-xs"
          title={isAr ? "تحديث الرمز" : "Regenerate challenge"}
          aria-label="Refresh Captcha"
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-accent" : ""}`} />
        </button>

        {isVerified && (
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" />
            <span>{isAr ? "تم التحقق" : "Verified"}</span>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="space-y-1">
        <input
          type="text"
          required
          autoComplete="off"
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={
            mode === "visual"
              ? (isAr ? "أدخل الرمز الموضح في الصورة" : "Enter verification characters")
              : (isAr ? "أدخل ناتج العملية الحسابية" : "Enter the calculated answer")
          }
          className={`w-full px-3 py-2 rounded-lg bg-white dark:bg-white/10 border text-xs text-ink dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none transition-colors ${
            isVerified
              ? "border-emerald-500 focus:border-emerald-500 bg-emerald-500/5"
              : hasError
              ? "border-rose-500 focus:border-rose-500 bg-rose-500/5"
              : "border-slate-200 dark:border-white/10 focus:border-rust"
          }`}
        />

        {hasError && (
          <div className="flex items-center gap-1 text-[10px] text-rose-600 dark:text-rose-400 font-medium pt-0.5">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>
              {isAr
                ? "رمز التحقق غير متطابق. يرجى إعادة المحاولة أو تجديد الرمز."
                : "Security verification mismatch. Please recheck or refresh the code."}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
