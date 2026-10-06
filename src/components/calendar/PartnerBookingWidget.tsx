"use client";

import React, { useRef, useState } from "react";
import GoogleRecaptcha, { GoogleRecaptchaHandle, RECAPTCHA_ENABLED } from "@/components/ui/GoogleRecaptcha";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video, 
  CheckCircle2, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Building2,
  CalendarCheck
} from "lucide-react";

interface BookingSlot {
  date: string;
  dayName: string;
  times: string[];
}

export default function PartnerBookingWidget({
  onBookingComplete,
  compact = false
}: {
  onBookingComplete?: (details: any) => void;
  compact?: boolean;
}) {
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>("Consulting Discussion");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("Asia/Karachi");
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);

  // Generate the next 5 business days dynamically
  const availableDates: BookingSlot[] = React.useMemo(() => {
    const dates: BookingSlot[] = [];
    const now = new Date();
    let count = 0;
    let daysAhead = 1;

    while (count < 5) {
      const d = new Date();
      d.setDate(now.getDate() + daysAhead);
      const dayOfWeek = d.getDay();
      // Skip Friday (5) or Sunday/weekend depending on Gulf & international scheduling
      if (dayOfWeek !== 5 && dayOfWeek !== 0) {
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const dayStr = d.toLocaleDateString("en-US", { weekday: "short" });
        dates.push({
          date: dateStr,
          dayName: dayStr,
          times: ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"]
        });
        count++;
      }
      daysAhead++;
    }
    return dates;
  }, []);

  const { language } = useLanguage();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const recaptchaRef = useRef<GoogleRecaptchaHandle>(null);

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || !clientName || !clientEmail) return;

    setIsSubmitting(true);

    const bookingDetails = {
      meetingType: selectedMeetingType,
      date: availableDates[selectedDateIndex]?.date,
      time: selectedTime,
      timezone: selectedTimezone,
      clientName,
      clientEmail,
      clientCompany,
      advisor: "Senior Advisory Partner",
      meetingPlatform: "Google Meet / Microsoft Teams",
      id: `FS-CAL-${Math.floor(100000 + Math.random() * 900000)}`
    };

    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      setBookingError("Please tick \"I'm not a robot\" to confirm the booking.");
      setIsSubmitting(false);
      return;
    }
    setBookingError("");

    try {
      // Record the booking as an inquiry (verified on the server)
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: clientName,
          workEmail: clientEmail,
          companyName: clientCompany || "",
          serviceOfInterest: `Reserved: ${selectedMeetingType} (${bookingDetails.date} at ${selectedTime})`,
          message: `Client reserved a 30-minute discovery consultation on ${bookingDetails.date} at ${selectedTime} (${selectedTimezone}). Ref: ${bookingDetails.id}`,
          recaptchaToken,
          website: honeypot,
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setBookingError(data.message || "We couldn't confirm the booking. Please try again.");
        setIsSubmitting(false);
        return;
      }
    } catch (e) {
      console.error("Booking sync error:", e);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setBookingError("Connection problem. Please check your internet and try again.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsBooked(true);
    setBookingConfirmation(bookingDetails);
    if (onBookingComplete) onBookingComplete(bookingDetails);
  };

  if (isBooked && bookingConfirmation) {
    return (
      <div className="p-6 sm:p-8 bg-emerald-500/10 dark:bg-emerald-950/40 rounded-3xl border border-emerald-500/30 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CalendarCheck className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
            CONSULTATION RESERVED
          </span>
          <h3 className="text-xl font-bold text-ink dark:text-white font-display">
            Discovery Session Confirmed
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            Calendar invitation and video conference link have been queued for <strong className="text-ink dark:text-white">{bookingConfirmation.clientEmail}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-transparent backdrop-blur-md border border-emerald-500/20 text-left max-w-md mx-auto space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span>Consultation:</span>
            <span className="font-bold text-ink dark:text-white">{bookingConfirmation.meetingType}</span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span>Date &amp; Time:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {bookingConfirmation.date} &bull; {bookingConfirmation.time}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span>Timezone:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{bookingConfirmation.timezone}</span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span>Reference Code:</span>
            <span className="font-mono font-bold text-accent">{bookingConfirmation.id}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsBooked(false);
            setSelectedTime("");
          }}
          className="text-xs text-accent font-bold hover:underline inline-block pt-1"
        >
          Book another slot or modify &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className={`border-t-2 border-ink dark:border-white ${compact ? 'pt-4' : 'pt-6'}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink dark:text-white">
            Schedule a Confidential Consultation
          </h3>
          <p className="text-xs text-slate-500">
            Direct 30-minute strategic dialogue with Factual Solutions Advisory Partners.
          </p>
        </div>

        {/* Timezone picker */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 px-3 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-300 shrink-0">
          <Globe className="w-3.5 h-3.5 text-accent" />
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer text-ink dark:text-white"
          >
            <option value="Asia/Karachi" className="dark:bg-slate-900">Pakistan (PKT GMT+5)</option>
            <option value="Asia/Riyadh" className="dark:bg-slate-900">Riyadh (AST GMT+3)</option>
            <option value="Asia/Dubai" className="dark:bg-slate-900">Dubai (GST GMT+4)</option>
            <option value="Europe/London" className="dark:bg-slate-900">London (BST GMT+1)</option>
            <option value="America/New_York" className="dark:bg-slate-900">New York (EST GMT-5)</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleConfirmBooking} className="space-y-5 pt-5">
        
        {/* Step 1: Meeting Type */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-[0.14em] flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-accent" />
            <span>1. Select a Topic</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: "Consulting Discussion", label: "Consulting", desc: "Operations, Strategy, Quality" },
              { id: "Training Program Discussion", label: "Training", desc: "Lean Six Sigma, PMP, TPM & more" },
              { id: "ERP & Digital Discussion", label: "ERP & Digital", desc: "ERPNext, Workflows, Software" },
            ].map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedMeetingType(track.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedMeetingType === track.id
                    ? "bg-ink dark:bg-white/15 text-white border-transparent shadow-md"
                    : "bg-white dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                }`}
              >
                <div className="text-xs font-bold">{track.label}</div>
                <div className={`text-[10px] mt-0.5 ${selectedMeetingType === track.id ? "text-slate-300" : "text-slate-500"}`}>
                  {track.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Date Selector */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-[0.14em] flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-accent" />
            <span>2. Choose Meeting Date</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {availableDates.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedDateIndex(idx);
                  setSelectedTime("");
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedDateIndex === idx
                    ? "bg-ink text-white border-ink dark:bg-white dark:text-ink"
                    : "bg-white dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                }`}
              >
                <span className="text-[10px] font-semibold block uppercase tracking-wider opacity-75">
                  {item.dayName}
                </span>
                <span className="text-xs sm:text-sm font-extrabold block">
                  {item.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Time Slot Selector */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-[0.14em] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>3. Available Time Slots</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {availableDates[selectedDateIndex]?.times.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                  selectedTime === slot
                    ? "bg-ink text-white border-ink dark:bg-white dark:text-ink"
                    : "bg-white dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Executive Details */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/10">
          <label className="text-[11px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-[0.14em] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-accent" />
            <span>4. Attendee Details</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Your Full Name"
              className="px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
            />
            <input
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Corporate Work Email"
              className="px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
            />
            <input
              type="text"
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              placeholder="Company / Enterprise"
              className="px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
            />
          </div>
        </div>

        {/* Spam protection */}
        <div aria-hidden="true" className="absolute left-0 top-0 opacity-0 pointer-events-none -z-10 w-px h-px overflow-hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>
        <GoogleRecaptcha
          ref={recaptchaRef}
          language={language}
          onVerify={(token) => {
            setRecaptchaToken(token);
            if (token) setBookingError("");
          }}
        />
        {bookingError && (
          <p role="alert" className="text-[11px] text-rose-700 dark:text-rose-300 font-semibold">
            {bookingError}
          </p>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !selectedTime || !clientName || !clientEmail || (RECAPTCHA_ENABLED && !recaptchaToken)}
            className="w-full py-3.5 px-6 bg-ink hover:bg-navy dark:bg-white dark:text-ink disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>
              {isSubmitting
                ? "Reserving Calendar..."
                : selectedTime
                ? `Confirm 30-Min Session for ${availableDates[selectedDateIndex]?.date} at ${selectedTime}`
                : "Select a Time Slot to Reserve"}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Strict NDA applies. Private calendar invite sent immediately upon reservation.</span>
          </div>
        </div>

      </form>
    </div>
  );
}
