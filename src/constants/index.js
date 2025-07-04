import project1 from "../assets/projects/project-1.jpg";
import mouse from "../assets/projects/mouse.png";
import Screenshot 2025-07-04 202120 from "../assets/projects/Screenshot 2025-07-04 202120.png";


export const HERO_CONTENT = `I am a passionate frontend developer skilled in creating dynamic, responsive, and user-friendly web interfaces. Proficient in Html, Css, Java, Javascript, Sql, React and Node.js, I focus on delivering seamless user experiences and visually engaging designs. My goal is to build innovative, high-performance applications that enhance user interaction and drive engagement.`;

export const ABOUT_TEXT = `Hello! I’m Shreyal, a passionate developer and tech enthusiast with a strong interest in AI, computer vision, and web development. I’m focused on improving my programming skills and working on innovative projects.I aim to enhance my skills and secure a high-paying software development role by continuously learning and building impactful projects.

Let’s connect and create something amazing!`;



export const PROJECTS = [
  {
    title: "Railway Ticket Booking System",
    image: project1,
    description:
      "A Railway Ticket Booking System is an online platform that allows passengers to book, manage, and cancel train tickets seamlessly. This system enhances the convenience of railway travel by providing real-time ticket availability, seat selection, and secure payment options.",
    technologies: ["HTML", "CSS", "PHP", "SQL", "Bootstrap"],
  },
  {
    title: "Gesture Based Mouse Control",
    image: mouse,
    description:
      "A Computer Vision Project That has the following touchless device control through hand gesture, built using Python and OpenCV. \n It comprises of: 1. Mouse Control: Pointer control, scrolling, and clicking via gestures.\n 2. Volume/Brightness Control: Configure system settings through gestures.",
    technologies: ["Python", "OpenCV"],
  },
  {
    title: "Portfolio Website",
    image: Screenshot 2025-07-04 202120,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "Tailwind CSS","Javascript"],
  },
//   {
//     title: "Biometric Fingerprint Payment",
//     image: project4,
// description:
//       "Biometric Fingerprint Payment is an advanced, secure, and contactless payment system that uses fingerprint recognition technology to authorize transactions. This innovative solution eliminates the need for traditional payment methods like cards, PINs, or passwords, providing a seamless and fraud-resistant experience.",
// technologies: ["HTML", "CSS", "Javascript", "Python", "c++","mySQL"],
//   },
];

export const CONTACT = {
  address: "L-327, Sarvoday Society, Nandelav Road, Bharuch, Gujarat, India",
  phoneNo: "+91 7016752479",
  email: "shreyalsinhraj2107@gmail.com",
};
