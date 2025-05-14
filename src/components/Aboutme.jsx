import profilepic from "../assets/profilepic.jpg";
import { ABOUT_TEXT } from "../constants";
import { motion } from "framer-motion";

const About = () => {
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Shreyal resume.pdf"; // Path to the PDF in the public folder
    link.download = "Shreyal resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="my-20 text-center text-4xl"
      >
        About <span className="text-neutral-500">Me</span>
      </motion.h1>
      <div className="flex flex-wrap">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
          className="w-full lg:w-1/2 lg:p-8"
        >
          <div className="flex item-center justify-center">
            <img className="rounded-2xl w-70 h-70 md:w-80 md:h-90" src={profilepic} alt="aboutme" />
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="flex justify-center lg:justify-start">
            <p className="my-2 max-w-xl py-6">{ABOUT_TEXT}</p>
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={handleResumeDownload}
              className="group mt-4 px-6 py-3 bg-gradient-to-r text-white font-semibold rounded-full transform transition-all duration-300 ease-in-out flex items-center relative overflow-hidden border-2 border-teal-400 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 transition-all duration-300 ease-in-out transform group-hover:translate-x-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v10.586l2.707-2.707a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 14.586V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Resume
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-500 opacity-0 transform scale-0 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:opacity-40"></span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
