import { FaAngleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const TeacherCard = ({ id, name, subject, experience, location, image, description }) => {
  const defaultImage = '/assets/profile.jpg';
  const profileImage = image != "" ? image : defaultImage;
 
  return (
    <Link to={`/teacher-profile/${id}`}>
    <div className='max-md:pb-4 md:rounded-2xl rounded-xl shadow-lg hover:scale-105 duration-300 bg-white md:p-3  '>
      <div className="flex max-md:pb-5 max-md:shadow  gap-8 justify-start items-center max-md:p-4 max-md:bg-slate-100 max-md:rounded-t-xl relative">
        <img src={profileImage} alt="Profile" className='md:h-20 md:w-20 h-16 w-16 object-cover rounded-full shadow-xl ' />
        <div className='flex flex-col md:gap-1'>
          <p className="text-sm text-gray-500 md:hidden ps-1">Name: </p>
          <h1 className='text-3xl font-medium text-[#353452]  '>{name}</h1>
          <p className='text-gray-500 text-base mt-2 font-medium w-[450px] max-md:hidden'>
            {`${description.slice(0, 108)}...`}
          </p>
          
        </div>
        
      </div>
      <hr className="md:mb-2 mb-5 md:mt-5 " />
        <div className="flex justify-center md:hidden  gap-3">
          <div className='flex max-md:flex-col mt-1  gap-5'>
            <p className='text-sm text-gray-500  flex items-center gap-1'><IoTimeOutline /> Experience:</p>
            <p className='text-sm text-gray-500 flex items-center gap-1'><FaLocationDot />Location:</p>
          </div>
          <div className='flex max-md:flex-col  gap-3'>
            <p className='text-sm text-gray-500 gap-1'><span className='text-lg text-white px-4 py-1 rounded-full  bg-gradient-to-r from-pink-400 to-rose-500  font-semibold'>{experience}+ years</span></p>
            <p className='text-sm text-gray-500  gap-1'><span className='text-lg bg-gradient-to-r from-blue-500  to-sky-400 text-transparent bg-clip-text  font-semibold'>{location}</span></p>
          </div>
        </div>
        <div className='md:flex max-md:flex-col hidden  gap-5'>
          <p className='text-sm text-gray-500 flex-center gap-1'><IoTimeOutline /> Experience: <span className='text-lg text-white px-4 py-1 rounded-full  bg-gradient-to-r from-pink-400 to-rose-500  font-semibold'>{experience}+ years</span></p>
          <p className='text-sm text-gray-500 flex-center gap-1'><FaLocationDot />Location: <span className='text-lg bg-gradient-to-r from-blue-500  to-sky-400 text-transparent bg-clip-text  font-semibold'>{location}</span></p>
        </div>
    </div>
    </Link>
  );
}

export default TeacherCard;
