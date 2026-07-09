"use client";

import { useState } from "react";
import { contactInfo, sectionCopy } from "@/lib/data";
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
      className="contact-section luxury-section portfolio-section section-padding-luxury"
    >
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="luxury-section-rule" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-16 md:mb-20">
          <PortfolioHeader
            label={sectionCopy.contact.label}
            title={sectionCopy.contact.title}
            highlight={sectionCopy.contact.highlight}
            description={sectionCopy.contact.description}
          />
        </ScrollReveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <RevealStagger className="lg:col-span-5">
            <div className="reveal-stagger-item contact-info-card contact-info-card-luxury">
              <div className="contact-info-line mb-6 h-px w-14 bg-gradient-to-r from-cyan via-gold to-transparent" />
              <p className="contact-info-lead">
                We welcome inquiries for residential, commercial, and hospitality
                commissions worldwide — from first concept to final reveal.
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

            <div className="reveal-stagger-item contact-studio-panel mt-10">
              <span className="hero-premium-label mb-3 block">Atelier Promise</span>
              <p className="contact-studio-panel-text">
                Every inquiry receives a personal response within 48 hours. Your
                vision deserves our full attention.
              </p>
            </div>
          </RevealStagger>

          <ScrollReveal variant="scale" delay={120} className="lg:col-span-7">
            <div className="contact-form-panel contact-form-panel-luxury">
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
                        <label
                          htmlFor={field.name}
                          className="hero-premium-label mb-3 block"
                        >
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

        <ScrollReveal variant="fade" delay={200} className="mt-16 md:mt-20">
          <div className="contact-cta-strip">
            <p className="contact-cta-strip-text">{sectionCopy.contact.ctaStrip}</p>
            <a href={`mailto:${contactInfo.email}`} className="contact-cta-strip-link">
              {contactInfo.email}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </CosmicSection>
  );
}