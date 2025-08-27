import { RevealOnScroll } from "../RevealOnScroll";
import Hero from "./Hero";

export const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <Hero />
        </div>

      </RevealOnScroll>
    </section>
  );
};