import { type ReactElement } from "react";

export default function ToothIcon({ className = "w-6 h-6" }: { className?: string }): ReactElement {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Dental tooth shape */}
      <path d="M8 4C8 2 10 2 12 2C14 2 16 2 16 4C16 6 16 8 16 10C16 12 16 14 16 16C16 18 14 18 12 18C10 18 8 18 8 16C8 14 8 12 8 10C8 8 8 6 8 4Z" />
      {/* Tooth roots */}
      <path d="M10 18C10 20 12 20 14 20" />
      <path d="M9 20C9 22 11 22 13 22" />
      <path d="M11 20C11 22 13 22 15 22" />
      {/* Tooth details */}
      <path d="M10 6C10 8 12 8 14 8" />
      <path d="M10 10C10 12 12 12 14 12" />
    </svg>
  );
}
