"use client";

import React, { useState } from "react";
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
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>("30-Min Executive Discovery");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("Asia/Riyadh");
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

    try {
      // Record inquiry in backend
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: clientName,
          workEmail: clientEmail,
          companyName: clientCompany || "Enterprise Client",
          serviceOfInterest: `Reserved: ${selectedMeetingType} (${bookingDetails.date} at ${selectedTime})`,
          message: `Client reserved a 30-minute discovery consultation on ${bookingDetails.date} at ${selectedTime} (${selectedTimezone}). Ref: ${bookingDetails.id}`
        })
      });
    } catch (e) {
      console.error("Booking sync error:", e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
      setBookingConfirmation(bookingDetails);
      if (onBookingComplete) onBookingComplete(bookingDetails);
    }, 600);
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
          <h3 className="text-xl font-bold text-[#152238] dark:text-white font-display">
            Discovery Session Confirmed
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            Calendar invitation and video conference link have been queued for <strong className="text-[#152238] dark:text-white">{bookingConfirmation.clientEmail}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111C2E] border border-emerald-500/20 text-left max-w-md mx-auto space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
            <span>Consultation:</span>
            <span className="font-bold text-[#152238] dark:text-white">{bookingConfirmation.meetingType}</span>
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
            <span className="font-mono font-bold text-[#A33C29]">{bookingConfirmation.id}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsBooked(false);
            setSelectedTime("");
          }}
          className="text-xs text-[#A33C29] font-bold hover:underline inline-block pt-1"
        >
          Book another slot or modify &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-[#111C2E] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden ${compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8'}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A33C29]/10 text-[#A33C29] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>DIRECT PARTNER CALENDAR</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-[#152238] dark:text-white">
            Schedule a Confidential Consultation
          </h3>
          <p className="text-xs text-slate-500">
            Direct 30-minute strategic dialogue with Factual Solutions Advisory Partners.
          </p>
        </div>

        {/* Timezone picker */}
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-300 shrink-0">
          <Globe className="w-3.5 h-3.5 text-[#A33C29]" />
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer text-[#152238] dark:text-white"
          >
            <option value="Asia/Riyadh">Riyadh (AST GMT+3)</option>
            <option value="Asia/Dubai">Dubai (GST GMT+4)</option>
            <option value="Europe/London">London (BST GMT+1)</option>
            <option value="America/New_York">New York (EST GMT-5)</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleConfirmBooking} className="space-y-5 pt-5">
        
        {/* Step 1: Meeting Type */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-[#A33C29]" />
            <span>1. Select Consulting Track</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: "30-Min Executive Discovery", label: "Executive Discovery", desc: "Strategy & Turnaround Overview" },
              { id: "Feasibility & Financial Modeling", label: "Feasibility & Modeling", desc: "CAPEX, Scrap, Multi-Branch" },
              { id: "M&A & Partner Expansion", label: "M&A & Expansion", desc: "Valuation & KSA / GCC Entry" },
            ].map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedMeetingType(track.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedMeetingType === track.id
                    ? "bg-[#152238] dark:bg-[#1E3150] text-white border-transparent shadow-md"
                    : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
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
          <label className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-[#A33C29]" />
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
                    ? "bg-[#A33C29] text-white border-[#A33C29] shadow-sm scale-102"
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
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
          <label className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#A33C29]" />
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
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white dark:bg-[#15233A] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Executive Details */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#A33C29]" />
            <span>4. Attendee Details</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Your Full Name"
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29]"
            />
            <input
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Corporate Work Email"
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29]"
            />
            <input
              type="text"
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              placeholder="Company / Enterprise"
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !selectedTime || !clientName || !clientEmail}
            className="w-full py-3.5 px-6 rounded-full bg-[#A33C29] hover:bg-[#8E3221] disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
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
