import React from "react";

// Small stroke icons used by the header and footer. Decorative: callers label
// the control they sit in.
type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const PhoneIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const MailIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const ClockIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ChatIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z" />
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MenuIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const MoonIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const SunIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
