import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../HOC/AuthContext';
import { Link } from 'react-router-dom';
import BASE_URL from '../../constants';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Logging in...');

    try {
      const result = await axios.post(`${BASE_URL}/api/student-login`, { email, password });
      const { message, user } = result.data;
      toast.dismiss(loadingToast);

      if (message === 'Login successful') {
        toast.success(message);
        login(user);
        navigate('/');
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log(err.message);
      toast.error('Login failed');
    }
  };

  return (
    <div className='bg-gradient-to-r from-fuchsia-200 via-indigo-100 to bg-purple-300 min-h-screen flex flex-col  items-center bg-cover pb-20'>
      <section className='w-full py-10'>
        <div className='flex flex-col justify-center items-center h-full'>
          <div className='flex flex-row rounded-3xl bg-white shadow-2xl'>
            <div className='flex-1 max-w-[550px] object-cover max-md:hidden p-5 pr-0' >
              <img loading='lazy' src="/assets/images/login.png" alt="Login Banner" />
            </div>
            <div className='flex-1 flex items-center'>
              <div className='flex flex-col w-full bg-white p-10 text-black rounded-md '>
                <img src="/logo.png" alt="Logo" className='w-40 mb-5 ml-[-10px]' />
                <h1 className='text-[#353452] text-5xl  font-semibold mb-5'>
                  <span className='bg-gradient-to-r from-pink-400 to-rose-500 text-transparent bg-clip-text font-bold'>Student</span> Login
                </h1>
                <p className='mb-4 text-gray-500'>Connect With the Best Teachers Near You</p>
                <form onSubmit={handleSubmit} className='flex flex-col '>
                  <label htmlFor="email" className='text-sm text-[#353452] ms-1'>Email</label>
                  <input
                    type='email'
                    name='email'
                    placeholder='Enter Email...'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className='py-3 px-2  rounded-md bg-purple-100 border-4 border-white'
                    required
                  />
                  <label htmlFor="password" className='text-sm text-[#353452] ms-1 mt-5' >Password</label>
                  <input
                    type='password'
                    name='password'
                    placeholder='Enter Password...'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className='py-3 px-2 rounded-md bg-purple-100 border-4 mb-5 border-white'
                    required
                  />
                  
                  <button type='submit' className='bg-gradient-to-r text-xl text-white font-bold from-fuchsia-400 to-purple-500  py-2 rounded-md  duration-150'>
                    Submit
                  </button>
                </form>
                <p className='mt-3 text-gray-600'>
                  Not registered? <Link to='/student-register' className='text-blue-500 underline'>Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLogin;
