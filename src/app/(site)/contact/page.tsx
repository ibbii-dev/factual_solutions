import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { contactLinks } from "@/data/navigation";
import { officeLocations } from "@/data/companyData";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm, { type Topic } from "./ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Factual Solutions about consulting, training or ERP & digital transformation. Call, WhatsApp, email, or send us a message.",
  path: "/contact",
});

// /contact?topic=training preselects a service (used by the service pages).
const TOPIC_BY_PARAM: Record<string, Topic> = {
  consulting: "Consulting",
  training: "Training",
  digital: "ERP & Digital",
};

const steps = [
  "We read your message and look at what you want to improve.",
  "We arrange a short call at a time that suits you.",
  "We suggest the right approach: consulting, training, a system, or a mix.",
];

const row = "flex items-center gap-3 rounded-xl border border-paper-line dark:border-white/10 bg-paper dark:bg-night-900/60 p-3.5 hover:border-navy/30 dark:hover:border-white/25 transition-colors";
const rowLabel = "block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400";

// Contact: the classic "Contact our advisory team" layout around the secured form.
export default function ContactPage({ searchParams }: { searchParams: { topic?: string } }) {
  const initialTopic = searchParams.topic ? TOPIC_BY_PARAM[searchParams.topic] : undefined;

  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Contact us"
          title="Contact our advisory team"
          lede="Talk to our consultants about consulting, training, or ERP and digital transformation for your organisation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ContactForm initialTopic={initialTopic} />
          </div>

          <aside className="lg:col-span-5 order-1 lg:order-2 space-y-5">
            <div className="fs-card p-6 space-y-3">
              <h2 className="text-lg font-bold text-ink dark:text-white">Direct contact</h2>
              <a href={contactLinks.emailHref} className={row}>
                <span className="fs-icon !w-10 !h-10 bg-rust/10 !text-rust dark:bg-rust/20 dark:!text-rust-light"><Mail className="w-4 h-4" aria-hidden="true" /></span>
                <span className="min-w-0">
                  <span className={rowLabel}>Email</span>
                  <span className="block text-[15px] font-semibold break-all">{contactLinks.email}</span>
                </span>
              </a>
              <a href={contactLinks.phoneHref} className={row}>
                <span className="fs-icon !w-10 !h-10 bg-navy/10 !text-navy dark:bg-steel/15 dark:!text-steel"><Phone className="w-4 h-4" aria-hidden="true" /></span>
                <span>
                  <span className={rowLabel}>Phone</span>
                  <span className="block text-[15px] font-semibold" dir="ltr">{contactLinks.phone}</span>
                </span>
              </a>
              <a
                href={contactLinks.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-3.5 hover:border-emerald-400 transition-colors"
              >
                <span className="fs-icon !w-10 !h-10 bg-emerald-700"><MessageSquare className="w-4 h-4" aria-hidden="true" /></span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-300">WhatsApp</span>
                  <span className="block text-[15px] font-semibold" dir="ltr">{contactLinks.phone}</span>
                </span>
              </a>
              <p className="flex items-center gap-2 pt-1 text-sm text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                {contactLinks.hours}
              </p>
            </div>

            <div className="hidden lg:block fs-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-ink dark:text-white">What happens next</h2>
              <ol className="space-y-3.5">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span aria-hidden="true" className={`fs-icon !w-7 !h-7 !rounded-lg text-xs font-bold ${["bg-navy", "bg-steel !text-navy", "bg-rust"][i]}`}>{i + 1}</span>
                    <span className="text-[15px] text-slate-700 dark:text-slate-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="hidden lg:block fs-card p-6 space-y-3">
              <h2 className="text-lg font-bold text-ink dark:text-white">Head office</h2>
              {officeLocations.map((loc) => (
                <address key={loc.city} className="not-italic flex items-start gap-3 rounded-xl border border-paper-line dark:border-white/10 bg-paper dark:bg-night-900/60 p-3.5">
                  <MapPin className="w-4 h-4 mt-1 text-rust dark:text-rust-light shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-[15px] font-semibold">{loc.city}, {loc.country}</span>
                    <span className="block text-[13px] text-slate-500 dark:text-slate-400">{loc.address}</span>
                  </span>
                </address>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
