import { useEffect, useRef } from "react";
import useCompactDevice from "../hooks/useCompactDevice";

// Confine blur to viewport edges instead of rasterizing the entire page.
const ScrollBlur = () => {
  const compact = useCompactDevice();
  const ref = useRef(null);
  useEffect(() => {
    const overlay = ref.current;
    if (!overlay || compact) return undefined;
    let timer;
    let active = false;
    const onScroll = () => {
      if (!active) {
        active = true;
        overlay.dataset.active = "true";
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        active = false;
        delete overlay.dataset.active;
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      delete overlay.dataset.active;
    };
  }, [compact]);
  return compact ? null : <div ref={ref} className="scroll-edge-blur" aria-hidden="true"><span /><span /></div>;
};
export default ScrollBlur;
