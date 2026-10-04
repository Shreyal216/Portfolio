import { useEffect } from "react";

const ScrollBlur = () => {
  useEffect(() => {
    const content = document.getElementById("portfolio-content");
    if (!content || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let previousY = window.scrollY;
    let previousTime = performance.now();
    let frame = 0;
    let settleTimer;
    let blur = 0;

    const renderBlur = () => {
      content.style.setProperty("--scroll-blur", `${blur.toFixed(2)}px`);
    };

    const settle = () => {
      cancelAnimationFrame(frame);
      const decay = () => {
        blur *= 0.84;
        if (blur < 0.04) blur = 0;
        renderBlur();
        if (blur > 0) frame = requestAnimationFrame(decay);
      };
      frame = requestAnimationFrame(decay);
    };

    const handleScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const elapsed = Math.max(8, now - previousTime);
      const speed = Math.abs(y - previousY) / elapsed;
      previousY = y;
      previousTime = now;
      blur = Math.min(2.6, Math.max(0.35, speed * 1.7));
      renderBlur();
      clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 75);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimer);
      cancelAnimationFrame(frame);
      content.style.removeProperty("--scroll-blur");
    };
  }, []);

  return null;
};

export default ScrollBlur;
