export type ProjectCategory = "All" | "Residential" | "Commercial" | "Hospitality";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: Exclude<ProjectCategory, "All">;
  year: string;
  image: string;
  images: string[];
  description: string;
  aspect: "tall" | "wide" | "square";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}