import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherCard from '../components/TeacherCard';

import { BsArrowUpRight } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import BASE_URL from '../constants';

const FindDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchState, setSearchState] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/teachers`);
        setDrivers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDrivers();
  }, []);

  const filterDrivers = () => {
    return drivers.filter(teacher => {
      const nameMatch = teacher.name.toLowerCase().includes(searchName.toLowerCase());
      const locationMatch = teacher.location.toLowerCase().includes(searchCity.toLowerCase()) &&
                            teacher.location.toLowerCase().includes(searchState.toLowerCase());
      return nameMatch && locationMatch;
    });
  };

  const filteredDrivers = filterDrivers();

  return (
    <div className='bg-gradient-to-r from-fuchsia-200 via-indigo-100 to bg-purple-300 h-full bgscreen pb-20'>  
      <div className='bg-white mt-5 pb-5'>
        <div className='max-w-7xl mx-auto flex-center flex-col gap-7'>
          <div className='flex max-md:flex-col justify-center items-center max-md:gap-4'>
            <h2 className='text-5xl font-medium text-[#353452] md:w-[500px] text-center '>
              Find a <span className='bg-gradient-to-r from-pink-400 to-rose-500 text-transparent bg-clip-text '>Driver</span> 
            </h2>
            <div className="relative  flex items-center w-full h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden border border-1 shadow-lg ">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                className="peer h-full w-full outline-none text-gray-700 pr-2 text-xl ps-2"
                type="text"
                id="search"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Search something.." 
              /> 
              <button className=' h-full px-5 bg-gradient-to-r text-xl text-white from-fuchsia-400 to-purple-400'>Search</button>
            </div>
          </div>
          <div className='flex max-md:hidden flex-col gap-2 text-sm'>
            <div className='flex gap-3 font-bold text-gray-500'>
              <p 
                className='rounded-full px-3 py-2 border-2 cursor-pointer hover:scale-105 duration-300' 
                onClick={() => setSearchCity('Delhi')}
              >
                Delhi
              </p>
              <p 
                className='rounded-full px-3 py-2 b text-white bg-gradient-to-r from-fuchsia-400 to-purple-400 flex items-center gap-2 cursor-pointer  hover:scale-105 duration-300' 
                onClick={() => setSearchCity('Banglore')}
              >
                <BsArrowUpRight /> Banglore
              </p>
              <p 
                className='rounded-full px-3 py-2 border-2 cursor-pointer hover:scale-105 duration-300' 
                onClick={() => setSearchCity('Chennai')}
              >
                Chennai
              </p>
              <p 
                className='rounded-full px-3 py-2 text-white bg-gradient-to-r from-pink-400 to-rose-500 flex items-center gap-2 cursor-pointer  hover:scale-105 duration-300' 
                onClick={() => setSearchCity('Mumbai')}
              >
                <BsArrowUpRight /> Mumbai
              </p>
              <p 
                className='rounded-full px-3 py-2 border-2 cursor-pointer hover:scale-105 duration-300' 
                onClick={() => setSearchCity('Punjab')}
              >
                Punjab
              </p>
              <p 
                className='rounded-full px-3 py-2 border-2 cursor-pointer hover:scale-105 duration-300' 
                onClick={() => setSearchCity('Pune')}
              >
                Pune
              </p>
            </div> 
          </div>
        </div>
      </div>
      <section className='max-w-7xl mx-auto'>
        <div className='flex md:flex-row flex-col justify-center max-md:items-center  w-full py-8 px-8 gap-8'>
          <div className='flex md:flex-col  gap-8'>
            <div className='bg-white border rounded-lg px-8 py-8 flex flex-col gap-3 flex-2'>
              <h2 className='text-3xl font-medium text-[#353452]  text-center  flex items-center gap-2'> 
                <IoFilter /> Filter by 
                <span className='bg-gradient-to-r from-yellow-300  to-orange-400 i text-transparent bg-clip-text'>Location</span>
              </h2>
              <p className='text-gray-500 font-medium mb-3'>Search the best Drivers Near You</p>

              <div className="relative  flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-1 shadow-lg ">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-gray-700 pr-2 text-md ps-2"
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Enter City.." 
                /> 
                <button className=' h-full px-4 bg-gradient-to-r text-xl  text-white from-fuchsia-400 to-purple-400'><FaLocationDot /></button>
              </div>

              <div className="relative  flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-1 shadow-lg ">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-gray-700 pr-2 text-md ps-2"
                  type="text"
                  placeholder='Enter State..' 
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)} 
                /> 
                <button className=' h-full px-4 bg-gradient-to-r text-xl  text-white from-fuchsia-400 to-purple-400'><FaLocationDot /></button>
              </div>
              <h2 className='mt-4 text-xl font-medium text-[#353452]  text-center  md:hidden flex items-center gap-2'> 
                <IoFilter /> Search by 
                <span className='bg-gradient-to-r from-yellow-300  to-orange-400 i text-transparent bg-clip-text'>Name</span>
              </h2>
              <div className=" relative md:hidden flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-1 shadow-lg ">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-gray-700 pr-2 text-md ps-2"
                  type="text"
                  placeholder='Enter Name..' 
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                /> 
                <button className=' h-full px-4 bg-gradient-to-r text-xl  text-white from-fuchsia-400 to-purple-400'><FaLocationDot /></button>
              </div>
            </div>
            <div className='bg-white border rounded-lg px-8 py-8 md:flex flex-col gap-3 flex-2 hidden'>
              <h2 className='text-3xl font-medium text-[#353452]  text-center  flex items-center gap-2'> 
                <IoFilter /> Search by 
                <span className='bg-gradient-to-r from-yellow-300  to-orange-400 i text-transparent bg-clip-text'>Name</span>
              </h2>
              <p className='text-gray-500 font-medium mb-3'>Search by Driver Name</p>
              <div className="relative  flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-1 shadow-lg ">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-gray-700 pr-2 text-md ps-2"
                  type="text"
                  placeholder='Enter Name..' 
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                /> 
                <button className=' h-full px-4 bg-gradient-to-r text-xl  text-white from-fuchsia-400 to-purple-400'><FaLocationDot /></button>
              </div>
              <div className="relative  flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-1 shadow-lg ">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-gray-700 pr-2 text-md ps-2"
                  type="text"
                  placeholder='Enter Name..' 
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                /> 
                <button className=' h-full px-4 bg-gradient-to-r text-xl  text-white from-fuchsia-400 to-purple-400'><FaLocationDot /></button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-8 flex-1 max-md:mt-5'>
            {filteredDrivers.length === 0 ? (<div className='text-[#353452] text-3xl font-semibold mt-20 flex-center'>Loading...</div>) : (<></>)}{
            filteredDrivers.map((teacher) => (
              <TeacherCard
                key={teacher._id}
                id={teacher._id}
                name={teacher.name}
                experience={teacher.experience}
                location={teacher.location}
                description={teacher.description}
                image={teacher.image}
              />
            ))}
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default FindDrivers;
