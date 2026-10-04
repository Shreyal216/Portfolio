import { useReducedMotion } from "framer-motion";
import GradientWaves from "./GradientWaves";
import useCompactDevice from "../hooks/useCompactDevice";

const InteractiveBackground = () => {
  const reducedMotion = useReducedMotion();
  const compact = useCompactDevice();

  return (
    <div className="portfolio-wave-background" aria-hidden="true">
      <GradientWaves
        horizonColor="#5227FF"
        waveColor="#FF9FFC"
        crestColor="#FFFFFF"
        speed={reducedMotion ? 0 : 0.4}
        grain={false}
        mouseInteraction={!reducedMotion && !compact}
        detail={compact ? "low" : "medium"}
        pixelRatio={compact ? 0.75 : 1}
        maxFps={compact ? 24 : 30}
        pauseOnScroll
        frozen={Boolean(reducedMotion)}
      />
      <div className="wave-contrast-shade" />
    </div>
  );
};

export default InteractiveBackground;
