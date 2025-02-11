import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/Aboutme";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import bgVideo from "./assets/Aurora.mp4"

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      {/* Video Background */}
      <video 
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
