import React from 'react'
import { Link } from 'react-router-dom'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";

const Selection = () => {
  return (
    <section className='max-w-7xl mx-auto pb-40'>
        <div className='flex max-md:flex-col-reverse items-center px-9 mt-16'>
            <div className='flex-1 ps-5 flex flex-col justify-start  max-md:mt-10'>
                <h2 className='text-5xl font-medium text-[#353452]'>
                    Welcome to Edumate,
                    <span className='bg-gradient-to-r from-fuchsia-500  to-indigo-400 inline-block text-transparent bg-clip-text me-2'>Sign-in </span>
                     based on your profession
                </h2>
                <p className='text-gray-500 text-sm mt-7 font-medium'>
                    Please select your role to proceed with sign-in. Whether you're a  <br className='hidden md:inline-block' />  User looking to Book a Driver  or a Driver ready  <br className='hidden md:inline-block'  />  to manage your Books and Rentals, we're here to help you get started.
                </p>
                <Link to='/find-teachers' className='flex mt-7 text-lg w-[210px] items-center gap-1 text-white px-6 py-1 rounded-[2px] bg-gradient-to-r from-fuchsia-400 to-purple-600 hover:from-fuchsia-500 hover:to-purple-700 duration-300'>View all Drivers <LiaLongArrowAltRightSolid /></Link>
            </div>
            <div className='flex-1 flex-center gap-7'>
                <Link to='/teacher-login' className='rounded-[30px] shadow-lg hover:scale-105 duration-300 '>
                    <img src="/assets/images/SelectionTeacher.png" alt="Teacher" className=''/>
                </Link>
                <Link to='/student-login'  className='rounded-[30px] shadow-lg hover:scale-105 duration-300'>
                    <img src="/assets/images/selectionStudent.png" alt="Student" />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Selection