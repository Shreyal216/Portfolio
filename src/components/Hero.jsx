import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { HERO_CONTENT } from "../constants";
import RobotScene from "./RobotScene";
import useCompactDevice from "../hooks/useCompactDevice";

const Hero = () => {
  const compact = useCompactDevice();
  const ref = useRef(null);
  const proximityFrame = useRef(0);
  const pointer = useRef(null);
  useEffect(() => () => cancelAnimationFrame(proximityFrame.current), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const sceneRotate = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.76]);

  const updateProximity = (event) => {
    if (compact) return;
    pointer.current = { x: event.clientX, y: event.clientY, heading: event.currentTarget };
    if (proximityFrame.current) return;
    proximityFrame.current = requestAnimationFrame(() => {
      proximityFrame.current = 0;
      const { x, y, heading } = pointer.current;
      // Read all geometry before changing font weights to avoid repeated layouts.
      const letters = Array.from(heading.querySelectorAll("[data-proximity-letter]"));
      const bounds = letters.map(letter => letter.getBoundingClientRect());
      letters.forEach((letter, index) => {
        const rect = bounds[index];
        const distance = Math.hypot(x - rect.left - rect.width / 2, y - rect.top - rect.height / 2);
        const proximity = Math.max(0, 1 - distance / 180);
        const eased = proximity * proximity * (3 - 2 * proximity);
        letter.style.setProperty("--letter-weight", `${500 + eased * 420}`);
        letter.style.setProperty("--letter-lift", `${-eased * 5}px`);
      });
    });
  };

  const resetProximity = (event) => {
    cancelAnimationFrame(proximityFrame.current);
    proximityFrame.current = 0;
    event.currentTarget.querySelectorAll("[data-proximity-letter]").forEach((letter) => {
      letter.style.setProperty("--letter-weight", "500");
      letter.style.setProperty("--letter-lift", "0px");
    });
  };

  const renderLetters = (text) => Array.from(text).map((character, index) => (
    <span data-proximity-letter key={`${text}-${index}`} className={character === " " ? "hero-letter hero-letter-space" : "hero-letter"}>
      {character === " " ? "\u00a0" : character}
    </span>
  ));

  return (
    <section ref={ref} className="hero-stage relative flex items-center border-b border-white/10 pt-10 pb-20">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative z-10 min-w-0">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
            <span className="status-dot" /> SOFTWARE DEVELOPER <span className="text-white/30">/</span> VADODARA, INDIA
          </motion.p>
          <motion.h1 aria-label="Shreyalsinh Raj" onPointerMove={updateProximity} onPointerLeave={resetProximity} className="hero-title mt-7" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
            <span className="hero-name-line">{renderLetters("Shreyalsinh")}</span><span className="hero-name-line hero-accent-line">{renderLetters("Raj")}<span className="hero-period">.</span></span>
          </motion.h1>
          <motion.p className="mt-7 max-w-xl text-base leading-8 text-slate-300/70 md:text-lg" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7 }}>
            {HERO_CONTENT}
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}>
            <a className="button-primary" href="#projects">Explore my work <span>↗</span></a>
            <a className="button-quiet" href="#contact">Let’s connect <span>↓</span></a>
          </motion.div>
          <motion.div className="mt-14 flex gap-9 text-sm text-white/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}>
            <div><strong className="block text-2xl font-medium text-white">08.58</strong>CGPA / 10</div>
            <div><strong className="block text-2xl font-medium text-white">2026</strong>IT graduate</div>
            <div><strong className="block text-2xl font-medium text-white">01</strong>Current role</div>
          </motion.div>
        </div>

        <motion.div className="min-w-0" style={compact ? undefined : { y: sceneY, rotateX: sceneRotate, scale: sceneScale }}>
          <RobotScene />
        </motion.div>
      </div>
      <a href="#experience" className="scroll-cue"><span /> SCROLL TO EXPLORE</a>
    </section>
  );
};

export default Hero;
