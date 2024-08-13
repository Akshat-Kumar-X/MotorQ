import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxShadowNone } from "react-icons/rx";
import defaultImage from '/assets/profile.jpg';
import BASE_URL from '../constants';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  axios.defaults.withCredentials = true;

  const fetchAppointments = async () => {
    try {
      const id = user._id;
      let response;

      if (user.type === 'student') {
        response = await axios.get(`${BASE_URL}/api/my-appointments`, {
          params: { studentId: id },
        });
      } else if (user.type === 'teacher') {
        response = await axios.get(`${BASE_URL}/api/my-appointments`, {
          params: { teacherId: id },
        });
      }

      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user._id, user.type]);

  const updateStatus = async (appointmentId, status) => {
    try {
      await axios.put(`${BASE_URL}/api/update-appointment-status`, {
        appointmentId,
        status,
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <section className='max-w-7xl mx-auto md:px-9 px-5 mb-16'>
      <div className='relative flex md:justify-center items-center rounded-3xl mt-10 h-[150px] bg-cover bg-center' style={{ backgroundImage: "url(https://i.ibb.co/p4n1d2p/appointment-banner.png)" }}>
        <h1 className='md:text-5xl text-3xl font-bold text-white z-10 max-md:ms-10'>Appointments</h1>
        <img src="/assets/images/tutor.png" alt="Login Banner" className='w-40 absolute bottom-0 right-40 max-md:right-10 z-0'/>
      </div>
      <div className='flex-col'>
        <h1 className='text-2xl text-[#353452] text-center my-5'>Latest Appointments</h1>

        {appointments.length === 0 ? (
          <p className='text-center pb-20 pt-16 text-2xl text-[#353452] flex-center gap-2'>No appointments found <RxShadowNone /></p>
        ) : (
          <div className='flex justify-center'>
            <ul className='flex flex-col gap-1 text-[#353452]'>
              {appointments.toReversed().map((appointment) => (
                <li key={appointment._id} className="mb-4 p-4 px-10 border shadow rounded-lg hover:bg-zinc-100 duration-300">
                  {user.type === 'student' ? (
                    <div className='flex md:items-center md:flex-row flex-col md:gap-10 gap-1 text-xs text-gray-600'>
                      <p className='md:flex hidden flex-col '>Status: <span className='text-white px-6 py-1 text-base font-medium rounded-full bg-gradient-to-r from-pink-400 to-rose-500'>{appointment.status}</span></p>
                      <img src={appointment.teacherId?.image ? appointment.teacherId.image : defaultImage} alt="Profile" className='h-16 w-16 object-cover rounded-full shadow-xl' />
                      <p className='flex flex-col'>Driver: <span className='font-medium text-lg text-[#353452]'>{appointment.teacherId?.name}</span></p>
                      <p className='flex flex-col'>Start Date: <span className='font-medium text-lg text-[#353452]'>{new Date(appointment.startDate).toLocaleDateString()}</span></p>
                      <p className='flex flex-col'>End Date: <span className='font-medium text-lg text-[#353452]'>{new Date(appointment.endDate).toLocaleDateString()}</span></p>
                      <p className='flex flex-col'>Vehicle: <span className='font-medium text-lg text-[#353452]'>{appointment.vehicleId?.name}</span> </p>
                      <p className='hidden max-md:flex flex-col '>Status: <span className='text-white text-center px-6 py-1 text-base font-medium rounded-full bg-gradient-to-r from-pink-400 to-rose-500'>{appointment.status}</span></p>
                    </div>
                  ) : (
                    <div className='flex md:items-center md:flex-row flex-col md:gap-10 gap-1 text-xs text-gray-600'>
                      <p className='md:flex hidden flex-col '>Status: <span className='text-white px-6 py-1 text-base font-medium rounded-full bg-gradient-to-r from-pink-400 to-rose-500'>{appointment.status}</span></p>
                      <p className='flex flex-col'>Customer: <span className='font-medium text-lg text-[#353452]'>{appointment.studentId?.name}</span></p>
                      <p className='flex flex-col'>Email: <span className='font-medium text-lg text-[#353452]'>{appointment.studentId?.email}</span></p>
                      <p className='flex flex-col'>Start Date: <span className='font-medium text-lg text-[#353452]'>{new Date(appointment.startDate).toLocaleDateString()}</span></p>
                      <p className='flex flex-col'>End Date: <span className='font-medium text-lg text-[#353452]'>{new Date(appointment.endDate).toLocaleDateString()}</span></p>
                      <p className='flex flex-col'>Vehicle: <span className='font-medium text-lg text-[#353452]'>{appointment.vehicleId?.name}</span> </p>
                      <p className='hidden max-md:flex flex-col '>Status: <span className='text-white text-center px-6 py-1 text-base font-medium rounded-full bg-gradient-to-r from-pink-400 to-rose-500'>{appointment.status}</span></p>
                      {appointment.status === 'pending' && (
                        <div>
                          <button
                            onClick={() => updateStatus(appointment._id, 'accepted')}
                            className="bg-green-500 text-white p-2 px-5 rounded-md mr-2 font-semibold"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(appointment._id, 'rejected')}
                            className="bg-red-500 text-white p-2 px-5 rounded-md font-semibold"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Appointments;
