import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ServicePage from "@/components/ServicePage";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import Footer from "@/components/Footer";
import { SERVICE_PAGES, getServicePage } from "@/lib/service-pages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

/**
 * SERVICE PILLAR ROUTES — /home-theater, /smart-lighting, etc.
 * Slugs deliberately match the old electronicdreams.biz URLs so
 * existing search rankings carry over without redirects.
 * Content lives in lib/service-pages.ts.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function ServicePillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = getServicePage((await params).slug);
  if (!page) notFound();

  const jsonLd = [
    serviceSchema(page),
    faqSchema(page.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.navLabel, path: `/${page.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-glow-ink"
      >
        Skip to content
      </a>

      <Header />

      {/* pt-16 clears the fixed header */}
      <main id="main" className="pt-16">
        <ServicePage page={page} />
        <ServiceRequestForm />
      </main>

      <Footer />
    </>
  );
}
