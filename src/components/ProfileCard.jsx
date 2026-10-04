import { useRef } from "react";
import profilepic from "../assets/profilepic.jpg";


const ProfileCard = () => {
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 22;
    const rotateX = (0.5 - y) * 22;
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.parentElement?.style.setProperty("--pointer-x", `${x * 100}%`);
    card.parentElement?.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--card-scale", "1.035");
    card.classList.add("profile-card-active");
  };

  const resetCard = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--card-scale", "1");
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.parentElement?.style.setProperty("--pointer-x", "50%");
    card.parentElement?.style.setProperty("--pointer-y", "50%");
    card.classList.remove("profile-card-active");
  };

  return (
    <div className="profile-card-scene">
      <div className="profile-card-glow" />
      <article ref={cardRef} className="profile-card" onPointerMove={handlePointerMove} onPointerLeave={resetCard}>
        <div className="profile-card-image-wrap"><img src={profilepic} alt="Shreyalsinh Raj" loading="lazy" decoding="async" className="profile-card-image" /></div>
        <div className="profile-card-grain" />
        <div className="profile-card-sheen" />
        <div className="profile-card-topline"><span>PROFILE / 01</span><span>INDIA ↗</span></div>
        <div className="profile-card-caption"><span className="profile-card-mark">SR</span><div><strong>Shreyalsinh Raj</strong><small>Software Developer</small></div><span className="profile-card-arrow">↗</span></div>
      </article>
      <span className="profile-card-note">MOVE YOUR CURSOR TO EXPLORE</span>
    </div>
  );
};

export default ProfileCard;

