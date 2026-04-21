import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCars } from "@/components/FeaturedCars";
import { Collections } from "@/components/Collections";
import { NewArrivals } from "@/components/NewArrivals";
import { BuildTrack } from "@/components/BuildTrack";
import { About } from "@/components/About";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotwheelz — Unleash the Speed | Premium Die-Cast Cars & Tracks" },
      {
        name: "description",
        content:
          "Premium die-cast cars, futuristic supercars, and limited collectibles. Build tracks, race hard, collect more. Drop 2026 live now.",
      },
      { property: "og:title", content: "Hotwheelz — Unleash the Speed" },
      {
        property: "og:description",
        content: "Bold die-cast cars and racing tracks for collectors and kids at heart.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Collections />
      <NewArrivals />
      <BuildTrack />
      <About />
      <Newsletter />
      <Footer />
    </main>
  );
}
