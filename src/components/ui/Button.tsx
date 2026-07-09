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
    "btn-premium touch-manipulation",
    variant === "gold" ? "btn-premium-gold" : "btn-premium-outline",
    className
  );

  const content = (
    <>
      {variant === "gold" && <span className="btn-premium-shine" aria-hidden />}
      <span className="btn-premium-label">{children}</span>
      {variant === "gold" && (
        <span className="btn-premium-arrow" aria-hidden>
          →
        </span>
      )}
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