import { motion } from "framer-motion";

const Experience = () => (
  <section id="experience" className="section-shell experience-section">
    <div className="section-kicker">01 / NOW</div>
    <div className="experience-layout">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .7 }}>
        <p className="eyebrow"><span className="status-dot" /> CURRENTLY WORKING</p>
        <h2 className="section-heading mt-5">Turning real needs<br />into <span>useful software.</span></h2>
      </motion.div>
      <motion.article className="experience-card" initial={{ opacity: 0, y: 30, rotateX: 5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .75 }} whileHover={{ rotateY: 2, rotateX: -1, y: -5 }}>
        <div className="experience-card-top"><span>JUN 2026 — PRESENT</span><span className="current-pill"><i /> CURRENT</span></div>
        <h3>Junior Software Developer</h3>
        <p className="company-line">Enlighten Infosystems <span>·</span> Vadodara, India</p>
        <p className="experience-copy">Building and maintaining CRM software that brings customer management, sales, quotations, inventory, and everyday business workflows together.</p>
        <div className="experience-divider" />
        <div className="experience-bottom"><span>FOCUS AREAS</span><div>{["Laravel", "PHP", "JavaScript", "MySQL", "CRM"].map((item) => <span key={item} className="skill-chip">{item}</span>)}</div></div>
      </motion.article>
    </div>
  </section>
);

export default Experience;
