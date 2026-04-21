import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCars } from "@/components/FeaturedCars";
import { Collections } from "@/components/Collections";
import { CategorySection } from "@/components/CategorySection";
import { NewArrivals } from "@/components/NewArrivals";
import { About } from "@/components/About";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotwheelz — Shop Premium Die-Cast Cars | Classics, Supercars & Limited" },
      {
        name: "description",
        content:
          "Shop the official Hotwheelz drop: classic muscle, futuristic supercars, and rare limited-edition collectibles. Fast checkout, free shipping over $50.",
      },
      { property: "og:title", content: "Hotwheelz — Shop Premium Die-Cast Cars" },
      {
        property: "og:description",
        content: "Classic muscle, supercars, and rare limited collectibles. Shop the drop.",
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
      <CategorySection
        id="classics"
        eyebrow="Heritage"
        title="Classic"
        highlight="Muscle"
        description="Chrome-trimmed icons from the golden age. Built to be displayed and driven."
        category="Classic"
      />
      <CategorySection
        id="supercars"
        eyebrow="Future"
        title="Modern"
        highlight="Supercars"
        description="Aero-tuned hypercars with razor-sharp lines and premium die-cast finishes."
        category="Supercar"
        bg="bg-secondary/30"
      />
      <CategorySection
        id="limited"
        eyebrow="Rare"
        title="Limited"
        highlight="Edition"
        description="Numbered, hand-finished, never restocked. For serious collectors only."
        category="Limited"
      />
      <NewArrivals />
      <About />
      <Newsletter />
      <Footer />
    </main>
  );
}
