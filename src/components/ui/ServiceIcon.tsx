interface ServiceIconProps {
  name: string;
  className?: string;
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.15,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export function ServiceIcon({ name, className = "w-5 h-5" }: ServiceIconProps) {
  const icons: Record<string, React.ReactNode> = {
    residential: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" {...stroke} />
        <path d="M9 21v-4h6v4" {...stroke} />
      </svg>
    ),
    commercial: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M5 21V5a1 1 0 011-1h12a1 1 0 011 1v16" {...stroke} />
        <path d="M9 7h2M9 11h2M9 15h2M13 7h2M13 11h2M13 15h2" {...stroke} />
        <path d="M3 21h18" {...stroke} />
      </svg>
    ),
    hospitality: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M4 10h16v11H4z" {...stroke} />
        <path d="M2 21h20" {...stroke} />
        <path d="M8 10V7a4 4 0 018 0v3" {...stroke} />
        <path d="M12 14v3" {...stroke} />
      </svg>
    ),
    consultation: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M12 3a7 7 0 00-4 12.7V19l4-2 4 2v-3.3A7 7 0 0012 3z" {...stroke} />
        <path d="M9.5 14.5h5" {...stroke} />
      </svg>
    ),
    styling: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M12 3l1.8 5.5H19l-4.6 3.3 1.8 5.5L12 14l-4.2 3.3 1.8-5.5L5 8.5h5.2L12 3z" {...stroke} />
      </svg>
    ),
    renovation: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l-7.8 7.8a2 2 0 001.4 3.4h.1l3.5-1 6.9-6.9a1 1 0 00-1.4-1.4l-6.9 6.9-1-3.5a2 2 0 00-3.4-1.4l7.8-7.8z" {...stroke} />
        <path d="M3 21h7" {...stroke} />
      </svg>
    ),
  };

  return icons[name] ?? icons.consultation;
}