import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/shreyal1.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img src={logo} alt="logo" className="h-12" />
      </div>
      <div className="nav-socials flex items-center justify-center gap-2 text-xl sm:gap-4 sm:text-2xl">
        <a href="https://www.linkedin.com/in/shreyalsinh-raj2107/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://www.github.com/Shreyal216" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.twitter.com/Shreyalsinh_Raj" target="_blank" rel="noopener noreferrer">
          <FaSquareXTwitter />
        </a>
        <a href="https://www.instagram.com/shreyalsinhraj/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
