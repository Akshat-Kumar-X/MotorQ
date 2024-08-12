import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

import { MdLocalPhone } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import BASE_URL from '../constants';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [name, setName] = useState(user?.name);
  const [experience, setExperience] = useState(user?.experience || '');
  const [location, setLocation] = useState(user?.location || '');
  const [contact, setContact] = useState(user?.contact || '');
  const [image, setImage] = useState(user?.image || '');
  const [description, setDescription] = useState(user?.description);
  const [imageFile, setImageFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${BASE_URL}/api/profile`, {
        name, email, password, experience, location, contact, description, image
      });

      if (result.data.message === 'Update successful') {
        toast.success('Profile Updated.');
        localStorage.setItem('user', JSON.stringify({ ...user, name, experience, location, contact, description, image }));
      } else {
        toast.error(result.data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-7xl mx-auto md:px-9 px-5 mb-20'>
      <div className='rounded-lg bg-gradient-to-r from-fuchsia-200 via-indigo-100 to bg-purple-300 h-[150px] bg-cover' style={{ backgroundImage: "url(https://png.pngtree.com/thumb_back/fh260/background/20220511/pngtree-abstract-pastel-purple-gradient-background-ecology-concept-for-your-graphic-design-image_1324968.jpg)" }}>
      </div>
      <div className='rounded-lg flex gap-5 lg:flex-row flex-col justify-between  px-5 pb-5 md:px-10 md:pt-5 pt-3 relative'>
        <div className='flex-1'>
          <div className='flex gap-10 items-start justify-start'>
            <div {...getRootProps()} className='bg-gray-100 md:w-48 md:h-48 w-36 h-36 rounded-xl object-cover absolute md:top-[-90px] top-[-70px] border-[5px] border-white cursor-pointer'>
              <input {...getInputProps()} />
              {image ? (
                <img src={image} alt="Profile" className="md:w-48 md:h-48 w-36 h-36 rounded-xl object-cover" />
              ) : (
                <p className='text-center text-3xl font-medium mt-10 flex flex-col  text-gray-600  '>
                  Add <br /> Profile <br /> Picture
                </p>
              )}
            </div>
            <div className='flex flex-col gap-1 md:ps-52 ps-40'>
              <p className='ps-1 text-sm font-medium text-[#353452]'>Name</p>
              <input
                type="name"
                name="name"
                placeholder='Enter Name..'
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='md:w-full w-full py-2 px-2 shadow-md border rounded-md md:text-3xl text-2xl font-bold text-[#353452] '
                required
              />
            </div>
          </div>
          <div className='flex flex-col mx-auto mt-10 px-2'>
            <h2 className=' text-2xl font-medium text-[#353452] mb-1'>About</h2>
            <textarea
              className="py-2 px-2 border font-medium text-[#3e3e4a] h-[150px]  shadow-md rounded-md resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

        </div>
        <div className='flex-1 flex flex-col w-full mx-auto mt-4 px-2 gap-5'>
          <h2 className='lg:ps-6 text-2xl font-medium text-[#353452] mb-1'>Details</h2>
          <div className="flex">
            <div className='w-[9px] rounded-full bg-gradient-to-b from-fuchsia-500 to-indigo-400'>
            </div>
            <div className='flex w-full flex-col gap-4 ms-5 md:mr-20 mr-5'>
              
              <div className='flex flex-col'>
                <h3 className=' text-xl font-medium text-[#353452] mb-1  flex items-center gap-2 '><TfiLocationPin /> Location</h3>
                <input
                  type="text"
                  name="location"
                  placeholder='Location'
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  className='py-2 px-2 w-full shadow-md rounded-md font-medium  text-fuchsia-500  border'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <h3 className=' text-xl font-medium text-[#353452] mb-1 flex items-center gap-2 '><MdLocalPhone /> Conatct</h3>
                <input
                  type="text"
                  name="contact"
                  placeholder='contact'
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                  className='py-2 px-2 w-full shadow-md rounded-md font-medium  text-fuchsia-500  border'
                  required
                />
              </div>

            </div>
            <div className='flex w-full flex-col gap-4'>
              <div className='flex flex-col'>
                <h3 className=' text-xl font-medium text-[#353452] mb-1 flex items-center gap-2'><BsClockHistory /> Experience</h3>
                <input
                  type="number"
                  name="experience"
                  placeholder='Experience'
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className='py-2 px-2 w-full shadow-md rounded-md font-medium  text-fuchsia-500  border'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <h3 className=' text-xl font-medium text-[#353452] mb-1 flex items-center gap-2'><MdOutlineEmail /> Email</h3>
                <input
                  type="email"
                  name="email"
                  placeholder='Email'
                  value={email}
                  className='py-2 px-2 w-full shadow-md rounded-md text-gray-500 bg-zinc-100 font-medium bg-gradient-to-r from-fuchsia-500 to-indigo-400 text-transparent bg-clip-text border'
                  required
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-center gap-2 mb-10'>
        <input
          type="password"
          name="password"
          placeholder='Confirm password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='py-3 px-2 shadow-lg rounded-md'
          required
        />
        <button type="submit" className='px-3 text-lg  font-medium text-white py-2 rounded-[2px] bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 duration-300'>
          Update Details
        </button>
      </div>

    </form>
  );
};

export default Profile;
