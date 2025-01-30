// import logo from "../assets/kevinRushLogo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/shreyal1.png"

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      {/*<h1 className="mx-6 logo">SR 

      </h1>*/}
      <div className="flex flex-shrink-0 items-center">
        <img src={logo}  alt= "logo" className="h-12" /> 
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <FaLinkedin />
        <FaGithub />
        <FaSquareXTwitter />
        <FaInstagram />
      </div>
    </nav>
  );
};

export default Navbar;