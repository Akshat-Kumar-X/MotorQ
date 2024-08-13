import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Selection from './pages/Selection';
import TeacherLogin from './pages/Login/TeacherLogin';
import DriverRegister from './pages/Register/DriverRegister';
import StudentLogin from './pages/Login/StudentLogin';
import StudentRegister from './pages/Register/StudentRegister';
import { AuthProvider, AuthContext } from '../HOC/AuthContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import FindDrivers from './pages/FindDrivers';
import DriverProfile from './pages/DriverProfile';
import Appointments from './pages/Appointments';
import CarRegister from './pages/Register/CarRegister';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyRentals from './pages/MyRentals';
import AllCars from './pages/AllCars';
import AvailableCars from './pages/AvailableCars';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className='flex flex-col min-h-screen overflow-hidden'>
        <Navbar />
        <div className='flex-grow'>
          <Routes>
            <Route path='/selection' element={<Selection />} />
            <Route
              path='/teacher-login'
              element={
                <AuthContext.Consumer>
                  {({ isAuthenticated }) =>
                    isAuthenticated ? <Navigate to='/' /> : <TeacherLogin />
                  }
                </AuthContext.Consumer>
              }
            />
            <Route
              path='/teacher-register'
              element={
                <AuthContext.Consumer>
                  {({ isAuthenticated }) =>
                    isAuthenticated ? <Navigate to='/' /> : <DriverRegister />
                  }
                </AuthContext.Consumer>
              }
            />
            <Route
              path='/student-login'
              element={
                <AuthContext.Consumer>
                  {({ isAuthenticated }) =>
                    isAuthenticated ? <Navigate to='/' /> : <StudentLogin />
                  }
                </AuthContext.Consumer>
              }
            />
            <Route
              path='/student-register'
              element={
                <AuthContext.Consumer>
                  {({ isAuthenticated }) =>
                    isAuthenticated ? <Navigate to='/' /> : <StudentRegister />
                  }
                </AuthContext.Consumer>
              }
            />
            <Route path='/' element={<Home />} />
            <Route path='/register-car' element={<CarRegister />} />
            <Route path='/cars' element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/all-cars" element={<AllCars />} />
            <Route path="/available-cars" element={<AvailableCars/>} />
            <Route
              path='/my-rentals'
              element={
                <AuthContext.Consumer>
                  {({ isAuthenticated }) =>
                    isAuthenticated ? <MyRentals /> : <Navigate to='/' />
                  }
                </AuthContext.Consumer>
              }
            />
            <Route path='/profile' element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
                  isAuthenticated ? <Profile /> : <Navigate to='/selection' />
                }
              </AuthContext.Consumer>
            } />
            <Route path='/find-teachers' element={<FindDrivers />} />
            <Route path='/teacher-profile/:id' element={<DriverProfile />} /> {/* Add Route for teacher-profile with id param */}
            <Route path='/appointments' element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
                  isAuthenticated ? <Appointments /> : <Navigate to='/selection' />
                }
              </AuthContext.Consumer>} />
          </Routes>
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
