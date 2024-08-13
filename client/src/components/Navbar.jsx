import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../HOC/AuthContext";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { IoCarSportSharp } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import { MdNotes } from "react-icons/md";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="header">
      <nav className="nav flex justify-between items-center px-7 text-lg">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-40" />
        </Link>

        <ul className="nav-link mt-[-5px] max-md:hidden text-[#353452] text-sm">
          <li>
            <Link to="/" className="flex flex-col items-center">
              <GoHome className="text-2xl" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/find-drivers"
              className="flex flex-col items-center bg-gradient-to-r  from-fuchsia-500 to-indigo-400  bg-clip-text "
            >
              <IoSearchOutline className="text-2xl" />
              Find Drivers
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="flex justify-center items-center gap-3">
                <Link
                  to="/appointments"
                  className="flex flex-col items-center pt-1"
                >
                  <BsClockHistory className="text-xl" />
                  Bookings
                </Link>
              </div>
            ) : null}
          </li>
          <li>
            {isAuthenticated && user && user.type === "manager" ? (
              <div className="flex justify-center items-center gap-3">
                <Link to="/all-cars" className="flex flex-col items-center">
                  <IoCarSportSharp className="text-2xl" />
                  Cars
                </Link>
              </div>
            ) : null}
          </li>
          <li>
            {isAuthenticated && user && user.type === "manager" ? (
              <div className="flex justify-center items-center gap-3">
                <Link to="/register-car" className="flex flex-col items-center">
                  <MdNotes className="text-2xl" />
                  Resiter Car
                </Link>
              </div>
            ) : null}
          </li>
          <li>
            {isAuthenticated && user && user.type === "driver" ? (
              <div className="flex justify-center items-center gap-3">
                <Link to="/profile" className="flex flex-col items-center">
                  <LuUser2 className="text-2xl" /> Profile
                </Link>
              </div>
            ) : null}
          </li>
          <li>
            {isAuthenticated && user && user.type === "driver" ? (
              <div className="flex justify-center items-center gap-3">
                <Link to="/cars" className="flex flex-col items-center">
                  <IoCarSportSharp className="text-2xl" />
                  Find Cars
                </Link>
              </div>
            ) : null}
          </li>
          <li>
            {isAuthenticated && user && user.type === "driver" ? (
              <div className="flex justify-center items-center gap-3">
                <Link to="/my-rentals" className="flex flex-col items-center">
                  <FaKey className="text-2xl" />
                  my Rentals
                </Link>
              </div>
            ) : null}
          </li>
        </ul>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="max-md:hidden flex-center gap-1 text-white px-6 py-1 rounded-[2px] bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 duration-300"
          >
            Logout <CiLogout />
          </button>
        ) : (
          <Link
            to="/selection"
            className="max-md:hidden flex-center gap-1 text-white px-6 py-1 rounded-[2px] bg-gradient-to-r from-fuchsia-400 to-purple-600 hover:from-fuchsia-500 hover:to-purple-700 duration-300"
          >
            Login <IoIosArrowRoundForward />
          </Link>
        )}
        <button className="md:hidden text-3xl" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <IoClose className="text-black z-50" />
          ) : (
            <IoIosMenu />
          )}
        </button>

        {/* Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 w-[250px] h-screen z-20 bg-white border shadow-2xl flex flex-col items-center transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <img src="/logo.png" alt="Logo" className="mt-5 w-40" />
          <ul className="flex flex-col text-center font-medium text-[#353452]  gap-5 mt-2">
            <li>
              <Link
                to="/"
                onClick={toggleSidebar}
                className="flex justify-center gap-1"
              >
                <GoHome className="text-2xl" /> Home
              </Link>
            </li>
            <li className="duration-300">
              <a
                href="/#about"
                onClick={toggleSidebar}
                className="flex justify-center gap-1 items-center mx-2"
              >
                <IoIosInformationCircleOutline className="text-2xl" />
                About
              </a>
            </li>
            <li>
              <Link
                to="/find-drivers"
                onClick={toggleSidebar}
                className="flex justify-center gap-1  items-center bg-gradient-to-r  from-fuchsia-500 to-indigo-400  bg-clip-text "
              >
                <IoSearchOutline className="text-2xl" />
                Find Drivers
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <div className="flex justify-center items-center gap-3">
                  <Link
                    to="/appointments"
                    onClick={toggleSidebar}
                    className="flex justify-center gap-1 items-center pt-1"
                  >
                    <BsClockHistory className="text-xl" />
                    Appointments
                  </Link>
                </div>
              ) : null}
            </li>
            <li>
              {isAuthenticated && user && user.type === "driver" ? (
                <div className="flex justify-center items-center gap-3">
                  <Link
                    to="/profile"
                    onClick={toggleSidebar}
                    className="flex justify-center gap-1 items-center"
                  >
                    <LuUser2 className="text-2xl" /> Profile
                  </Link>
                </div>
              ) : null}
            </li>
          </ul>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                toggleSidebar();
              }}
              className="flex-center gap-1 mt-5 text-white px-6 py-1 rounded-[2px] bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 duration-300"
            >
              Logout <CiLogout />
            </button>
          ) : (
            <Link
              to="/selection"
              onClick={toggleSidebar}
              className="flex-center gap-1 mt-5 text-white px-6 py-1 rounded-[2px] bg-gradient-to-r from-fuchsia-400 to-purple-600 hover:from-fuchsia-500 hover:to-purple-700 duration-300"
            >
              Login <IoIosArrowRoundForward />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
