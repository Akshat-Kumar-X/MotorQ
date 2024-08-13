import React from "react";
import { Link } from "react-router-dom";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const Home = () => {
  return (
    <div id="hero" className="max-w-7xl mx-auto max-md:pe-5 max-md:ps-3">
      <section className="flex max-md:flex-col md:ps-8 justify-center items-center max-md:gap-16">
        <div className="flex-1 flex flex-col pt-10 md:ps-5 max-w-[630px]">
          <h2 className="text-7xl max-md:text-6xl  text-[#353452] dm-sans-font-bold">
            Move
            <span className="bg-gradient-to-r ms-4 from-sky-400 to-indigo-500 inline-block text-transparent bg-clip-text me-2">
              {" "}
              Smarter{" "}
            </span>
            <br />
            <span className="relative">
              with Device Free Insights
              <div className="absolute right-[-90px] bottom-1 rotate-12 text-lg w-[95px] text-center text-white font-medium bg-gradient-to-r from-orange-400 to-rose-500 px-3 py-1 rounded-full">
                Limited
              </div>
            </span>
          </h2>
          <h2 className="text-3xl w-[200px] font-extrabold bg-gradient-to-r from-yellow-300  to-orange-500 i text-transparent bg-clip-text ">
            Data is Power
          </h2>
          <div className="flex max-md:flex-col mt-5 max-md:items-center">
            <p className="text-gray-500 text-base mt-7 font-medium w-80">
              Motorq’s Connected Vehicle Data Platform gives you powerful
              insights from your fleet’s data, no dongles required.
            </p>
            <div className="flex flex-col max-md:items-center">
              <img
                src="/assets/images/teachers.png"
                alt="Drivers"
                className="w-[200px]"
              />
              <p className="text-gray-700 text-sm md:ps-6 font-medium w-80 max-md:text-center">
                Experienced Professionals
              </p>
            </div>
          </div>
          <div className="flex max-md:flex-col md:items-center mt-10">
            <div className="max-md:flex-center">
              <Link
                to="/find-drivers"
                className="flex md:ms-12 text-lg w-[210px] items-center gap-1 text-white px-6 py-1 rounded-[2px] bg-gradient-to-r from-fuchsia-400 to-purple-600 hover:from-fuchsia-500 hover:to-purple-700 duration-300"
              >
                View all Drivers <LiaLongArrowAltRightSolid />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <img src="/assets/images/heroBanner.png" alt="Hero Banner" />
        </div>
      </section>
    </div>
  );
};

export default Home;
