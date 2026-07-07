interface ServiceIconProps {
  name: string;
  className?: string;
}

export function ServiceIcon({ name, className = "w-8 h-8" }: ServiceIconProps) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <path d="M3 10.5L12 3l9 7.5V21H3z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    building: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <rect x="4" y="2" width="16" height="20" />
        <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6" />
      </svg>
    ),
    key: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <circle cx="8" cy="8" r="4" />
        <path d="M12 8h10M18 8v3M15 8v2" />
      </svg>
    ),
    compass: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-2.5 7.5L8 16l2.5-7.5z" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <circle cx="11" cy="11" r="7" />
        <path d="M16 16l5 5" />
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <path d="M12 2l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5M3 17l9 5 9-5" />
      </svg>
    ),
    pen: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <path d="M4 20l4-1 9-9-3-3-9 9-1 4z" />
        <path d="M14 5l3 3" />
      </svg>
    ),
    hammer: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <path d="M14 4l6 6-4 4-6-6 4-4z" />
        <path d="M3 21l7-7" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
      </svg>
    ),
  };

  return <>{icons[name] ?? icons.compass}</>;
}