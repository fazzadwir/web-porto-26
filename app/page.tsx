import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Experience from "@/components/sections/Experience";
import Toolkit from "@/components/sections/Toolkit";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <SelectedWork />
      <Toolkit />
      <Experience />
    </main>
  );
}
