import { HERO_CONTENT } from "../constants";
import profilepic from "../assets/profilepic.jpg"; // Ensure the correct path

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-8 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start px-4">
            <h1 className="pb-8 text-5xl lg:text-8xl font-thin tracking-tight lg:mt-16">
              Shreyalsinh Raj
            </h1>
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl md:text-4xl tracking-tight text-transparent">
              Frontend Developer
            </span>
            <p className="my-2 max-w-xl py-6 font-light tracking-tighter">
              {HERO_CONTENT}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <img  src={profilepic} alt="Shreyalsinh Raj" className="rounded-2xl w-50 h-50 md:w-70 md:h-70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
