import type { Metadata } from "next";
import Header from "@/components/Header";
import SupportPlans from "@/components/SupportPlans";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Home Support Plans — One-Time Rescue to Estate Care",
  description:
    "Support plans for Houston smart homes: one-time rescue visits, Priority Care with remote monitoring, and Estate Care for large properties. Every plan works on systems we didn't install.",
  alternates: { canonical: "/support-plans" },
};

export default function SupportPlansPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-glow-ink"
      >
        Skip to content
      </a>

      <Header />

      {/* pt-16 clears the fixed header */}
      <main id="main" className="pt-16">
        <SupportPlans />
        <ServiceRequestForm />
      </main>

      <Footer />
    </>
  );
}
