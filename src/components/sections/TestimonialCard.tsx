import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  active?: boolean;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  active = true,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "testimonial-card",
        active && "testimonial-card-active",
        className
      )}
    >
      <div className="testimonial-card-inner">
        <span className="testimonial-quote-mark" aria-hidden>
          &ldquo;
        </span>

        <div
          className="testimonial-stars mb-6 flex justify-center gap-1"
          aria-hidden
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="testimonial-star">
              ★
            </span>
          ))}
        </div>

        <div className="testimonial-card-line mb-8 h-px w-14 bg-gradient-to-r from-cyan via-gold to-transparent" />

        <blockquote className="testimonial-quote">{testimonial.quote}</blockquote>

        <footer className="testimonial-author mt-10 flex flex-col items-center">
          <div className="testimonial-author-row">
            <span className="testimonial-avatar" aria-hidden>
              {getInitials(testimonial.author)}
            </span>
            <div>
              <p className="testimonial-author-name">{testimonial.author}</p>
              <p className="testimonial-author-meta">
                {testimonial.role} · {testimonial.location}
              </p>
            </div>
          </div>
          <div className="testimonial-author-accent mt-4 h-px w-10" aria-hidden />
        </footer>
      </div>
    </div>
  );
}