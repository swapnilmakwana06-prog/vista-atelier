import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { getAllProjectIds, getProjectById, getProjectNeighbors } from "@/lib/projects";

const ProjectDetail = dynamic(
  () =>
    import("@/components/sections/ProjectDetail").then((m) => m.ProjectDetail),
  { loading: () => <div className="min-h-[60vh]" aria-hidden /> }
);

const Footer = dynamic(
  () => import("@/components/layout/Footer").then((m) => m.Footer),
  { loading: () => <div className="min-h-[20vh]" aria-hidden /> }
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vistaatelier.com";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | VISTA Atelier`,
      description: project.description,
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const { prev, next } = getProjectNeighbors(id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    locationCreated: project.location,
    dateCreated: project.year,
    url: `${siteUrl}/projects/${project.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        <ProjectDetail project={project} prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}