import { useState } from "react";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaJava, FaPython,  FaGithub, FaPhp } from "react-icons/fa";
import { SiJavascript, SiC, SiCplusplus, SiBootstrap, SiNextdotjs, SiMongodb, SiTailwindcss, } from "react-icons/si";
import { motion } from "framer-motion";

// Floating & rotation animation
const createIconVariants = (duration) => ({
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [10, -10],
    rotate: [-5, 5],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  },
});

// Click bounce animation
const clickAnimation = {
  whileTap: { scale: 0.8, transition: { duration: 0.2, ease: "easeOut" } },
};

const Technologies = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, id: null });

  // Play sound on click
  const playSound = () => {
    const audio = new Audio("/click.mp3"); // Add 'click.mp3' to your public folder
    audio.volume = 0.5; // Set volume
    audio.play();
  };

  // Handle tilt effect on mouse move
  const handleMouseMove = (e, index) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const offsetX = (e.clientX - centerX) / (width / 4);
    const offsetY = (e.clientY - centerY) / (height / 4);

    setTilt({ x: offsetY * 10, y: -offsetX * 10, id: index });
  };

  // Reset tilt on mouse leave
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, id: null });
  };

  const technologies = [
    { name: "C", icon: <SiC />, color: "bg-blue-700", glow: "shadow-blue-700", duration: 2.8 },
    { name: "C++", icon: <SiCplusplus />, color: "bg-blue-800", glow: "shadow-blue-800", duration: 3.2 },
    { name: "HTML", icon: <FaHtml5 />, color: "bg-orange-500", glow: "shadow-orange-500", duration: 2.5 },
    { name: "CSS", icon: <FaCss3Alt />, color: "bg-blue-600", glow: "shadow-blue-600", duration: 3 },
    { name: "PHP", icon: <FaPhp />, color: "bg-indigo-500", glow: "shadow-indigo-500", duration: 2.9 },
    { name: "Java", icon: <FaJava />, color: "bg-red-600", glow: "shadow-red-600", duration: 4 },
    { name: "Python", icon: <FaPython />, color: "bg-blue-400", glow: "shadow-blue-400", duration: 2.6 },
    { name: "JavaScript", icon: <SiJavascript />, color: "bg-yellow-500", glow: "shadow-yellow-500", duration: 2.3 },
    { name: "React", icon: <FaReact />, color: "bg-blue-500", glow: "shadow-blue-500", duration: 2 },
    { name: "Node.js", icon: <FaNodeJs />, color: "bg-green-600", glow: "shadow-green-600", duration: 3.5 },
    { name: "Next.js", icon: <SiNextdotjs />, color: "bg-gray-800", glow: "shadow-gray-800", duration: 3.3 },
    { name: "MongoDB", icon: <SiMongodb />, color: "bg-green-700", glow: "shadow-green-700", duration: 3.1 },
    // { name: "Git", icon: <FaGitAlt />, color: "bg-red-500", glow: "shadow-red-500", duration: 3.9 },
    { name: "GitHub", icon: <FaGithub />, color: "bg-gray-700", glow: "shadow-gray-700", duration: 2.2 },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "bg-teal-500", glow: "shadow-teal-500", duration: 2.4 },
    { name: "Bootstrap", icon: <SiBootstrap />, color: "bg-purple-600", glow: "shadow-purple-600", duration: 3.7 },
    // { name: "TypeScript", icon: <SiTypescript />, color: "bg-blue-400", glow: "shadow-blue-400", duration: 3.1 },
  ];

  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h1
        whileInView={{ opacity: 1,y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h1>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.8 }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="relative flex justify-center items-center"
            variants={createIconVariants(tech.duration)}
            initial="initial"
            animate="animate"
            whileTap={clickAnimation.whileTap}
            onClick={playSound} // Play sound on click
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform:
                tilt.id === index
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.1)`
                  : "rotateX(0deg) rotateY(0deg)",
              transition: "transform 0.2s ease-out, box-shadow 0.3s ease-out",
            }}
          >
            {/* Tooltip */}
            {hoveredIndex === index && (
              <span className="absolute -top-10 px-3 py-1 rounded-lg bg-neutral-900 text-white text-sm transition-opacity duration-300 opacity-100">
                {tech.name}
              </span>
            )}

            {/* Icon */}
            <div
              className={`rounded-3xl border-4 border-neutral-800 p-6 text-7xl flex justify-center items-center
                ${tech.color} text-white transition-all duration-300 transform hover:scale-110 hover:shadow-4xl hover:${tech.glow}`}
            >
              {tech.icon}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technologies;
