import { useState } from 'react';
import { RiReactjsLine } from "react-icons/ri";
import { AiFillHtml5, AiFillGithub } from "react-icons/ai";
import { DiCss3, DiNodejs, DiJava, DiJavascript1, DiPython, DiGit, DiMongodb } from "react-icons/di";
import { SiC, SiCplusplus, SiBootstrap, SiNextdotjs, SiPhp } from "react-icons/si";

const Technologies = () => {
  // State to store the rotation values for each icon
  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
    id: null
  });

  // Handle mouse movement for each icon
  const handleMouseMove = (e, index) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const offsetX = (e.clientX - centerX) / (width / 2); // Horizontal offset for X axis
    const offsetY = (e.clientY - centerY) / (height / 2); // Vertical offset for Y axis

    // Set rotation for the hovered icon
    setRotate({
      x: offsetY * 15, // Adjust the sensitivity for X rotation
      y: -offsetX * 15, // Adjust the sensitivity for Y rotation (negative to reverse direction)
      id: index // Store the current icon's index that is being hovered
    });
  };

  // Reset rotation when mouse leaves the icon
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0, id: null });
  };

  return (
    <div className="border-b border-neutral-800 pb-24">
      <h1 className="my-20 text-center text-4xl">Technologies</h1>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[{
          icon: <RiReactjsLine />, color: "bg-gradient-to-r from-cyan-400 to-teal-500", hoverColor: "bg-gradient-to-r from-teal-500 to-cyan-400", textColor: "text-white"
        },
        {
          icon: <AiFillHtml5 />, color: "bg-gradient-to-r from-orange-500 to-yellow-500", hoverColor: "bg-gradient-to-r from-yellow-500 to-orange-500", textColor: "text-white"
        },
        {
          icon: <DiCss3 />, color: "bg-gradient-to-r from-blue-500 to-blue-700", hoverColor: "bg-gradient-to-r from-blue-700 to-blue-500", textColor: "text-white"
        },
        {
          icon: <DiNodejs />, color: "bg-gradient-to-r from-green-500 to-green-700", hoverColor: "bg-gradient-to-r from-green-700 to-green-500", textColor: "text-white"
        },
        {
          icon: <DiJava />, color: "bg-gradient-to-r from-red-600 to-red-800", hoverColor: "bg-gradient-to-r from-red-800 to-red-600", textColor: "text-white"
        },
        {
          icon: <DiJavascript1 />, color: "bg-gradient-to-r from-yellow-400 to-yellow-600", hoverColor: "bg-gradient-to-r from-yellow-600 to-yellow-400", textColor: "text-white"
        },
        {
          icon: <SiC />, color: "bg-gradient-to-r from-blue-500 to-blue-700", hoverColor: "bg-gradient-to-r from-blue-700 to-blue-500", textColor: "text-white"
        },
        {
          icon: <SiCplusplus />, color: "bg-gradient-to-r from-blue-600 to-blue-800", hoverColor: "bg-gradient-to-r from-blue-800 to-blue-600", textColor: "text-white"
        },
        {
          icon: <SiBootstrap />, color: "bg-gradient-to-r from-purple-500 to-purple-700", hoverColor: "bg-gradient-to-r from-purple-700 to-purple-500", textColor: "text-white"
        },
        {
          icon: <DiPython />, color: "bg-gradient-to-r from-blue-500 to-yellow-400", hoverColor: "bg-gradient-to-r from-yellow-400 to-blue-500", textColor: "text-white"
        },
        {
          icon: <DiMongodb />, color: "bg-gradient-to-r from-green-600 to-green-800", hoverColor: "bg-gradient-to-r from-green-800 to-green-600", textColor: "text-white"
        },
        {
          icon: <SiNextdotjs />, color: "bg-gradient-to-r from-black to-gray-800", hoverColor: "bg-gradient-to-r from-gray-800 to-black", textColor: "text-white"
        },
        {
          icon: <DiGit />, color: "bg-gradient-to-r from-red-500 to-red-700", hoverColor: "bg-gradient-to-r from-red-700 to-red-500", textColor: "text-white"
        },
        {
          icon: <AiFillGithub />, color: "bg-gradient-to-r from-gray-400 to-gray-600", hoverColor: "bg-gradient-to-r from-gray-600 to-gray-400", textColor: "text-white"
        },
        {
          icon: <SiPhp />, color: "bg-gradient-to-r from-indigo-500 to-indigo-700", hoverColor: "bg-gradient-to-r from-indigo-700 to-indigo-500", textColor: "text-white"
        }].map((tech, index) => (
          <div key={index} className="relative flex justify-center items-center">
            <div
              className={`rounded-3xl border-4 border-neutral-800 p-6 text-7xl flex justify-center items-center
                ${tech.color} ${tech.textColor} transition-all duration-300 transform hover:scale-110 hover:rotate-90 hover:shadow-4xl`}
              onMouseMove={(e) => handleMouseMove(e, index)} // Track mouse movement for each icon
              onMouseLeave={handleMouseLeave} // Reset the rotation when the mouse leaves the icon
              style={{
                transform: rotate.id === index ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` : 'rotateX(5deg) rotateY(5deg)',
                transition: 'transform 0.2s ease-out, box-shadow 0.3s ease-out, background 0.5s ease-in-out' // Added smoother transition for background
              }}
            >
              <div className={`rounded-3xl w-full h-full flex justify-center items-center transition-all duration-400 ${tech.hoverColor}`}>
                {tech.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;
