import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/Aboutme";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import InteractiveBackground from "./components/InteractiveBackground";

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <InteractiveBackground />

      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <AboutMe />
        <Technologies />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

export default App;
