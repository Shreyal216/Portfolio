import { useEffect, useRef, useState } from "react";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaJava, FaPython, FaGithub, FaPhp } from "react-icons/fa";
import { SiJavascript, SiC, SiCplusplus, SiBootstrap, SiNextdotjs, SiMongodb, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

const technologies = [
  { name: "C", icon: <SiC />, color: "#72a8ff" },
  { name: "C++", icon: <SiCplusplus />, color: "#76a9ff" },
  { name: "HTML", icon: <FaHtml5 />, color: "#ff875e" },
  { name: "CSS", icon: <FaCss3Alt />, color: "#67b8ff" },
  { name: "PHP", icon: <FaPhp />, color: "#a99bff" },
  { name: "Java", icon: <FaJava />, color: "#ff7979" },
  { name: "Python", icon: <FaPython />, color: "#ffe07b" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#ffe279" },
  { name: "React", icon: <FaReact />, color: "#6ce5ff" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#9eea8b" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#f3f4f6" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#8fe9a4" },
  { name: "GitHub", icon: <FaGithub />, color: "#f3f4f6" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#72e4ed" },
  { name: "Bootstrap", icon: <SiBootstrap />, color: "#c5a0ff" },
];

const Technologies = () => {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const dragRef = useRef(null);
  const frameRef = useRef(0);

  const updateRotation = (value) => {
    rotationRef.current = value;
    setRotation(value);
  };

  useEffect(() => {
    let previous = performance.now();
    let frame;
    const animate = (now) => {
      const elapsed = Math.min(now - previous, 40);
      previous = now;
      if (!dragRef.current) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduceMotion && Math.abs(frameRef.current) > 0.08) {
          frameRef.current *= 0.965;
          updateRotation(rotationRef.current + frameRef.current * elapsed);
        } else {
          frameRef.current = 0;
          if (!reduceMotion) updateRotation(rotationRef.current + elapsed * 0.004);
        }
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const startDrag = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, last: performance.now() };
  };

  const moveDrag = (event) => {
    if (!dragRef.current) return;
    const now = performance.now();
    const dx = event.clientX - dragRef.current.x;
    const dt = Math.max(1, now - dragRef.current.last);
    const delta = dx * 0.34;
    frameRef.current = delta / dt;
    dragRef.current = { x: event.clientX, last: now };
    updateRotation(rotationRef.current + delta);
  };

  const endDrag = () => { dragRef.current = null; };
  const moveOne = (direction) => updateRotation(rotationRef.current + direction * (360 / technologies.length));

  return (
    <section className="tech-section border-b border-white/10 pb-24" aria-labelledby="technology-heading">
      <motion.h2 id="technology-heading" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -35 }} transition={{ duration: .7 }} className="my-20 text-center text-4xl font-light">
        Technologies <span className="text-white/40">I work with</span>
      </motion.h2>
      <motion.div className="tech-carousel-stage" initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8 }}>
        <div className="tech-carousel-glow" />
        <div className="tech-orbit-ring" />
        <div className="tech-carousel" role="group" aria-label="Interactive carousel of technologies. Drag to rotate." onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>
          <div className="tech-carousel-ring" style={{ "--tech-rotation": `${rotation}deg` }}>
            {technologies.map((tech, index) => {
              const angle = (360 / technologies.length) * index;
              return (
                <div className="tech-carousel-item" key={tech.name} style={{ "--tech-angle": `${angle}deg` }}>
                  <div className="tech-icon-card" style={{ "--tech-color": tech.color }}>
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tech-carousel-controls">
          <button type="button" aria-label="Rotate technologies left" onClick={() => moveOne(-1)}>←</button>
          <span>DRAG TO ROTATE <i /> 15 TECHNOLOGIES</span>
          <button type="button" aria-label="Rotate technologies right" onClick={() => moveOne(1)}>→</button>
        </div>
      </motion.div>
      <ul className="sr-only">{technologies.map((tech) => <li key={tech.name}>{tech.name}</li>)}</ul>
    </section>
  );
};

export default Technologies;
