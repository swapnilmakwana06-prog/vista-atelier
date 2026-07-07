"use client";

import { useState } from "react";
import { contactInfo } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { RevealStagger, ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const projectTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "hospitality", label: "Hospitality" },
  { value: "consultation", label: "Private Consultation" },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <CosmicSection
      id="contact"
      className="contact-section portfolio-section section-padding"
    >
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-16">
          <PortfolioHeader
            label="Get in Touch"
            title="Begin Your"
            highlight="Project"
            description="Every extraordinary space begins with a conversation. Share your vision, and let us craft an atmosphere worthy of it."
          />
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <RevealStagger className="lg:col-span-5">
            <div className="reveal-stagger-item contact-info-card">
              <div className="contact-info-line mb-6 h-px w-14 bg-gradient-to-r from-cyan via-gold to-transparent" />
              <p className="contact-info-lead">
                We welcome inquiries for residential, commercial, and hospitality
                commissions worldwide.
              </p>
            </div>

            {[
              {
                label: "Email",
                value: contactInfo.email,
                href: `mailto:${contactInfo.email}`,
              },
              {
                label: "Telephone",
                value: contactInfo.phone,
                href: `tel:${contactInfo.phone.replace(/\D/g, "")}`,
              },
              {
                label: "Studio",
                value: contactInfo.address,
              },
              {
                label: "Hours",
                value: contactInfo.hours,
              },
            ].map((item) => (
              <div key={item.label} className="reveal-stagger-item contact-detail">
                <span className="hero-premium-label mb-2 block">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    data-cursor="hover"
                    className="contact-detail-value transition-colors duration-300 hover:text-gold-accessible"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="contact-detail-value">{item.value}</span>
                )}
              </div>
            ))}
          </RevealStagger>

          <ScrollReveal variant="scale" delay={120} className="lg:col-span-7">
            <div className="contact-form-panel">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-line mb-8 h-px w-16 bg-gradient-to-r from-cyan via-gold to-transparent" />
                  <p className="hero-premium-label mb-4">Inquiry Received</p>
                  <h3 className="portfolio-section-title mb-4 text-4xl">
                    Thank <span className="hero-gold-shimmer">You</span>
                  </h3>
                  <p className="contact-info-lead max-w-sm">
                    Your vision has reached our studio. We will be in touch within
                    48 hours to begin the conversation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    {[
                      { name: "name", label: "Full Name", type: "text" },
                      { name: "email", label: "Email Address", type: "email" },
                    ].map((field) => (
                      <div key={field.name} className="contact-field">
                        <label htmlFor={field.name} className="hero-premium-label mb-3 block">
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          type={field.type}
                          name={field.name}
                          required
                          className="contact-input"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="type" className="hero-premium-label mb-3 block">
                      Project Type
                    </label>
                    <select id="type" name="type" className="contact-input contact-select">
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="message" className="hero-premium-label mb-3 block">
                      Your Vision
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your space, timeline, and aspirations..."
                      className={cn("contact-input contact-textarea resize-none")}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    className="hero-btn-gold-glow px-12 py-5"
                  >
                    Send Inquiry
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </CosmicSection>
  );
}