"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "outline";
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  children,
  className,
  variant = "gold",
  href,
  type = "button",
  onClick,
}: ButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-sm tracking-[0.2em] uppercase transition-[transform,opacity] duration-200 touch-manipulation hover:scale-[1.02] active:scale-[0.97] active:opacity-90",
    variant === "gold"
      ? "bg-gold font-medium text-btn-on-gold"
      : "border border-gold/60 bg-transparent text-gold-accessible hover:bg-gold/5",
    className
  );

  const content = (
    <>
      {variant === "gold" && (
        <span className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-500 ease-out group-hover:translate-x-0" />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} data-cursor="hover" className={base}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} data-cursor="hover" className={base}>
      {content}
    </button>
  );
}