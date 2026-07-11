import type { Metadata } from "next";
import Header from "@/components/Header";
import TriageWizard from "@/components/TriageWizard";
import RescueDesk from "@/components/RescueDesk";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Home Rescue Desk — Fix Control4, Theater, Wi-Fi & More",
  description:
    "Smart home not working? Start at the Rescue Desk: pick your symptom, try the same first checks our technicians run, and get routed to the fastest fix — remote or on-site, even if we didn't install your system.",
  alternates: { canonical: "/rescue-desk" },
};

export default function RescueDeskPage() {
  return (
    <>

      <Header />

      {/* pt-16 clears the fixed header */}
      <main id="main" className="pt-16">
        <TriageWizard />
        <RescueDesk />
        <ServiceRequestForm />
      </main>

      <Footer />
    </>
  );
}
