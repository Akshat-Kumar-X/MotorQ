import { Link } from "react-router-dom";

import { MdLocalPhone } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-transparent'>
      <div className=" pt-[3px] pointer-events-none bg-gradient-to-r from-transparent via-[#E7E7E9] to-transparent"></div>
      <div className='max-w-7xl mx-auto px-10 max-md:px-16'>
        <div className='flex md:flex-row flex-col justify-between items-center md:pe-5'>
          <div className="md:pe-10 md:pb-2 pb-5 pt-3   flex flex-row gap-10 relative">
            <div >
              <img src="/logo.png" alt="Logo" className='w-36' />
              <p className='text-[#494954] font-medium ps-3 text-lg hidden md:block'>Get Best Teachers Near you</p>
              <div className="flex items-center text-[#292941] font-medium ps-3 pt-2 text-sm gap-2">
                <MdOutlineEmail />
                <p>akshat.kumar1077@gmail.com</p>
              </div>
              <div className="flex items-center text-[#292941] font-medium ps-3 pt-2 text-sm gap-2">
                <TfiLocationPin />
                <p>Noida, UP, India.</p>
              </div>
              <div className="flex items-center text-[#292941] font-medium ps-3 pt-2 text-sm gap-2">
                <MdLocalPhone />
                <p>+91 8800403533</p>
              </div>
            </div>
            <div className="max-md:absolute md:hidden max-md:ms-[-10px] h-[230px] w-[3px] top-0 left-[250px] pointer-events-none bg-gradient-to-b from-[#E7E7E9] to-transparent"></div>
            <div className="md:hidden flex flex-col max-md:ms-[-20px] md:gap-3 gap-5 text-[#353452]">
              <h3 className="flex items-center text-2xl gap-2">Socials <span className=" font-xm text-xl text-[#5f5e75] ">⟶</span></h3>
              <Link to='https://www.linkedin.com/in/akshat-kumar-86203224a/' className="flex items-center gap-2"><FaLinkedinIn /> Linkedin</Link>
              <a href='https://github.com/Akshat-Kumar-X' className="flex items-center gap-2"><FaGithub /> GitHub</a>
              <Link to='https://www.youtube.com/@DemonClanRoblox' className="flex items-center gap-2"><FaYoutube/> Youtube</Link>
            </div>
          </div>
          <div className=" w-[3px] mt-0 hidden md:block h-52 pointer-events-none bg-gradient-to-b from-[#E7E7E9]  to-transparent"></div>

          <div className="md:ps-10 md:pe-10 md:pb-2 md:pt-2 relative">
            <div className="flex items-center gap-5 text-[#353452]">
              <h3 className="flex items-center text-2xl gap-2">Main Links <span className="text-[#5f5e75] font-xm text-3xl">⟶</span></h3>
              <a href='/#hero'>Home</a>
              <a href='/#about'>About</a>
              <a href='/find-teachers'>Teachers</a>
              <a href='/selection' className="max-md:hidden">Get Started</a>
            </div>
            <div className=" h-[3px] my-2    pointer-events-none bg-gradient-to-r from-transparent via-[#E7E7E9]  to-transparent"></div>

            <div className="flex items-center gap-5 text-[#353452]">
              <h3 className="flex items-center text-2xl gap-2">Explore <span className="text-[#5f5e75]  font-xm text-3xl">⟶</span></h3>
              <a href='/#hero'>Landing</a>
              <a href='/#about'>Know More</a>
              <a href='/find-teachers'>Courses</a>
              <a href='/selection' className="max-md:hidden">Login</a>
            </div>
            
            <div className="md: h-[3px] my-2  pointer-events-none bg-gradient-to-r from-transparent via-[#E7E7E9]  to-transparent"></div>
            <div className="max-md:hidden text-[#353452] text-lg mt-4">
              <p className="text-center text-gray-500 text-sm">Copyright @Akshat AllrightsReserved</p>
            </div>
          </div>
          <div className=" w-[3px] mt-0 hidden md:block  h-52 pointer-events-none bg-gradient-to-b from-[#E7E7E9]  to-transparent"></div>
          <div className=" md:ps-10 md:pe-10  max-md:pb-2 relative">
            <div className="md:flex hidden md:flex-col md:gap-3  text-[#353452]">
              <h3 className="flex items-center text-2xl gap-2">Socials <span className=" font-xm text-3xl text-[#5f5e75] ">⟶</span></h3>
              <Link to='https://www.linkedin.com/in/akshat-kumar-86203224a/' className="flex items-center gap-2"><FaLinkedinIn /> Linkedin</Link>
              <a href='https://github.com/Akshat-Kumar-X' className="flex items-center gap-2"><FaGithub /> GitHub</a>
              <Link to='https://www.youtube.com/@DemonClanRoblox' className="flex items-center gap-2"><FaYoutube/> Youtube</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
