import { CtaBanner } from "@/components/home/cta-banner";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <CtaBanner />
    </>
  );
}
