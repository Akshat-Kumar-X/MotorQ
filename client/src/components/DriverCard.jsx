import React, { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import ScheduleAppointmentModal from "./ScheduleAppointment"; 
import { Link } from "react-router-dom";

const DriverCard = ({ id, name, experience, location, image, description }) => {
  const defaultImage = "/assets/profile.jpg";
  const profileImage = image ? image : defaultImage;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-md:pb-4 md:rounded-2xl rounded-xl shadow-lg hover:scale-105 duration-300 bg-white md:p-3">
      <Link to={`/driver-profile/${id}`}>
      <div className="flex max-md:pb-5 max-md:shadow gap-8 justify-start items-center max-md:p-4 max-md:bg-slate-100 max-md:rounded-t-xl relative">
        <img
          src={profileImage}
          alt="Profile"
          className="md:h-20 md:w-20 h-16 w-16 object-cover rounded-full shadow-xl"
        />
        <div className="flex flex-col md:gap-1">
          <h1 className="text-3xl font-medium text-[#353452]">{name}</h1>
          <p className="text-gray-500 text-base mt-2 font-medium w-[450px] max-md:hidden">
            {`${description.slice(0, 108)}...`}
          </p>
        </div>
      </div>
      </Link>
      <hr className="md:mb-2 mb-5 md:mt-5" />
      <div className="md:flex max-md:flex-col justify-between gap-5 mb-4">
        <p className="text-sm text-gray-500 flex-center gap-1">
          <IoTimeOutline /> Experience:{" "}
          <span className="text-lg text-white px-4 py-1 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 font-semibold">
            {experience}+ years
          </span>
        </p>
        <p className="text-sm text-gray-500 flex-center gap-1">
          <FaLocationDot />
          Location:{" "}
          <span className="text-lg bg-gradient-to-r from-blue-500 to-sky-400 text-transparent bg-clip-text font-semibold">
            {location}
          </span>
        </p>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-2 px-5 rounded-md font-semibold full"
        >
          Schedule Appointment
        </button>
      </div>

      {/* Modal for scheduling appointment */}
      {isModalOpen && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 z-40"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <ScheduleAppointmentModal driverId={id} closeModal={closeModal} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverCard;
