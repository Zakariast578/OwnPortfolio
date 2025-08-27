import React, { useState } from "react";
import "./index.css";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { Skills } from "./components/sections/Skills";
import { Contact } from "./components/sections/Contact";
import { Projects } from "./components/sections/Projects";
import { RevealOnScroll } from "./components/RevealOnScroll";
import Footer from "./components/sections/Footer";
import { Toaster } from "./components/ui/sonner";
import ExperienceEducation from "./components/sections/ExperienceEducation";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-background text-foreground`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <Skills />
        <ExperienceEducation />
        <Projects />
        <Contact />
        <RevealOnScroll>
          <Footer />
        </RevealOnScroll>
      </div>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
