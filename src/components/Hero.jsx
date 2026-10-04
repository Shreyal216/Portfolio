import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HERO_CONTENT } from "../constants";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const sceneRotate = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.76]);

  return (
    <section ref={ref} className="hero-stage relative flex min-h-[88vh] items-center border-b border-white/10 py-20 lg:min-h-[calc(100vh-7rem)]">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative z-10">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
            <span className="status-dot" /> SOFTWARE DEVELOPER <span className="text-white/30">/</span> VADODARA, INDIA
          </motion.p>
          <motion.h1 className="hero-title mt-7" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
            Shreyalsinh<br /><span>Raj<span className="hero-period">.</span></span>
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

        <div className="hero-scene-wrap" aria-label="Interactive dimensional abstract orbital artwork">
          <motion.div className="hero-scene" style={{ y: sceneY, rotateX: sceneRotate, scale: sceneScale }}>
            <div className="scene-grid" />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <motion.div className="core-sphere" animate={{ y: [0, -13, 0], rotateY: [0, 18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <div className="sphere-shine" /><div className="sphere-line" />
            </motion.div>
            <motion.div className="satellite satellite-one" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="satellite satellite-two" animate={{ y: [0, 9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <div className="scene-label label-top"><span>CREATIVE ENGINEERING</span><i>↗</i></div>
            <div className="scene-label label-bottom"><span>BUILDING WHAT’S NEXT</span><i>IND / 22°18′</i></div>
            <div className="scene-index">SR <span>—</span> 01</div>
          </motion.div>
          <span className="scene-caption">A little motion. A lot of intention.</span>
        </div>
      </div>
      <a href="#experience" className="scroll-cue"><span /> SCROLL TO EXPLORE</a>
    </section>
  );
};

export default Hero;
