import { HERO_CONTENT } from "../constants";
import devloper from "../assets/devloper.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5, delay: delay },
  },
});

const TITLES = ["Software Developer", "Frontend Developer", "Backend Developer"];

const getLetterVariants = (title) => {
  switch (title) {
    case "Software Developer":
      return {
        initial: { opacity: 0, x: -10 },
        animate: (i) => ({
          opacity: 1,
          x: 0,
          transition: { delay: i * 0.05 },
        }),
        exit: (i) => ({
          opacity: 0,
          x: 10,
          transition: { delay: i * 0.03 },
        }),
      };
    case "Frontend Developer":
      return {
        initial: { opacity: 0, scale: 0.8, rotate: -15 },
        animate: (i) => ({
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { delay: i * 0.06 },
        }),
        exit: (i) => ({
          opacity: 0,
          scale: 0.8,
          rotate: 15,
          transition: { delay: i * 0.03 },
        }),
      };
    case "Backend Developer":
      return {
        initial: { opacity: 0, y: 10 },
        animate: (i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.05 },
        }),
        exit: (i) => ({
          opacity: 0,
          y: -10,
          transition: { delay: i * 0.02 },
        }),
      };
    default:
      return {
        initial: { opacity: 0 },
        animate: (i) => ({ opacity: 1, transition: { delay: i * 0.05 } }),
        exit: (i) => ({ opacity: 0, transition: { delay: i * 0.03 } }),
      };
  }
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTitle(false); // trigger exit
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % TITLES.length);
        setShowTitle(true); // trigger enter
      }, 600); // allow exit to finish
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentTitle = TITLES[index];
  const letters = currentTitle.split("");
  const variants = getLetterVariants(currentTitle);

  return (
    <div className="border-b border-neutral-900 pb-8 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start px-4">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-8 text-5xl lg:text-8xl font-thin tracking-tight lg:mt-16"
            >
              Shreyalsinh Raj
            </motion.h1>

            {/* Dynamic Letter-by-Letter Title */}
            <div className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent h-12">
              <AnimatePresence mode="wait">
                {showTitle && (
                  <motion.div
                    key={currentTitle}
                    className="flex"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {letters.map((char, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={variants}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.p
              variants={container(1.5)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 font-light tracking-tighter"
            >
              {HERO_CONTENT}
            </motion.p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              src={devloper}
              alt="Shreyalsinh Raj"
              className="rounded-2xl w-50 h-50 md:w-70 md:h-70"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
