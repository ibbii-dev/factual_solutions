import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { contactLinks } from "@/data/navigation";
import { ChatIcon, ClockIcon, MailIcon, PhoneIcon } from "@/components/layout/Icons";
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

const channels = [
  { label: "Call us", value: contactLinks.phone, href: contactLinks.phoneHref, Icon: PhoneIcon, external: false },
  { label: "WhatsApp", value: "Message us on WhatsApp", href: contactLinks.whatsappHref, Icon: ChatIcon, external: true },
  { label: "Email", value: contactLinks.email, href: contactLinks.emailHref, Icon: MailIcon, external: false },
];

const steps = [
  "We read your message and look at what you want to improve.",
  "We arrange a short call at a time that suits you.",
  "We suggest the right approach: consulting, training, a system, or a mix.",
];

export default function ContactPage({ searchParams }: { searchParams: { topic?: string } }) {
  const initialTopic = searchParams.topic ? TOPIC_BY_PARAM[searchParams.topic] : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-20 sm:pb-24 flex flex-col gap-10 lg:gap-12">
      <header className="max-w-3xl flex flex-col gap-4">
        <p className="eyebrow">Contact</p>
        <h1 className="text-display text-heading">Let&apos;s talk about what you want to improve.</h1>
        <p className="text-lede text-muted">
          Tell us a little about your organisation and goals, and we&apos;ll get back to you to arrange a conversation.
        </p>
      </header>

      {/* Phones: the quickest routes first. */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        <a href={contactLinks.phoneHref} className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-band text-heading font-semibold">
          <PhoneIcon className="w-5 h-5" />
          Call
        </a>
        <a href={contactLinks.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-band text-heading font-semibold">
          <ChatIcon className="w-5 h-5" />
          WhatsApp
        </a>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <ContactForm initialTopic={initialTopic} />
        </div>

        <aside className="lg:col-span-5 flex flex-col gap-7">
          <div className="hidden lg:flex flex-col gap-3">
            <h2 className="text-h3 text-heading">Prefer to talk?</h2>
            {channels.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-3.5 rounded-2xl border border-line bg-surface p-4 hover:border-primary transition-colors"
              >
                <span className="w-11 h-11 shrink-0 rounded-full bg-band text-heading inline-flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-small text-muted">{label}</span>
                  <span className="font-semibold text-heading break-words">{value}</span>
                </span>
              </a>
            ))}
          </div>

          <p className="flex items-center gap-2 text-small text-muted">
            <ClockIcon />
            {contactLinks.hours} · {contactLinks.city}
          </p>

          <div className="rounded-2xl bg-band p-6 flex flex-col gap-4">
            <h2 className="text-h3 text-heading">What happens next</h2>
            <ol className="flex flex-col gap-3.5">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-display w-7 h-7 shrink-0 rounded-full bg-bg text-heading text-small inline-flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
