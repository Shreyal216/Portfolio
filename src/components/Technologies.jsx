import { motion } from "framer-motion";
import CircularCarousel from "./CircularCarousel";
import "./Technologies.css";

const names = ["C", "C++", "HTML", "CSS", "PHP", "Java", "Python", "JavaScript", "React", "Node.js", "Next.js", "MongoDB", "GitHub", "Tailwind", "Bootstrap"];
const technologies = names.map((name, index) => ({
  src: `/technologies/technology-${index}.svg`,
  alt: `${name} technology card`,
  title: name,
}));

const Technologies = () => (
  <section className="tech-section border-b border-white/10 pb-24" aria-labelledby="technology-heading">
    <motion.h2 id="technology-heading" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -35 }} transition={{ duration: .7 }} className="my-20 text-center text-4xl font-light">
      Technologies <span className="text-white/40">I work with</span>
    </motion.h2>
    <div className="technology-carousel-stage">
      <CircularCarousel items={technologies} preset="cylinder" intro="rise" cardWidth={220} aspectRatio={1} gap={25} autoplay="drift" speed={14} fadeColor="#060010" />
    </div>
    <p className="technology-carousel-hint">Drag to rotate · Click a card to focus · Use arrow keys when focused</p>
  </section>
);

export default Technologies;
