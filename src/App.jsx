import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/Aboutme";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import bgVideo from "./assets/video (1).mp4";

const App = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; 
    }
  }, []);

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
