import { useReducedMotion } from "framer-motion";
import GradientWaves from "./GradientWaves";

const InteractiveBackground = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="portfolio-wave-background" aria-hidden="true">
      <GradientWaves
        horizonColor="#5227FF"
        waveColor="#FF9FFC"
        crestColor="#FFFFFF"
        speed={reducedMotion ? 0 : 0.4}
        grain={!reducedMotion}
        mouseInteraction={!reducedMotion}
      />
      <div className="wave-contrast-shade" />
    </div>
  );
};

export default InteractiveBackground;
