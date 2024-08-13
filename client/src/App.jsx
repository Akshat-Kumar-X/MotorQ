import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Selection from "./pages/Selection";
import DriverLogin from "./pages/Login/DriverLogin";
import DriverRegister from "./pages/Register/DriverRegister";
import ManagerLogin from "./pages/Login/ManagerLogin";
import ManagerRegister from "./pages/Register/ManagerRegister";
import { AuthProvider, AuthContext } from "../HOC/AuthContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FindDrivers from "./pages/FindDrivers";
import DriverProfile from "./pages/DriverProfile";
import Appointments from "./pages/Appointments";
import CarRegister from "./pages/Register/CarRegister";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyRentals from "./pages/MyRentals";
import AllCars from "./pages/AllCars";
import AvailableCars from "./pages/AvailableCars";
import MapSearch from "./pages/MapSearch";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/selection" element={<Selection />} />
              <Route
                path="/driver-login"
                element={
                  <AuthContext.Consumer>
                    {({ isAuthenticated }) =>
                      isAuthenticated ? <Navigate to="/" /> : <DriverLogin />
                    }
                  </AuthContext.Consumer>
                }
              />
              <Route
                path="/driver-register"
                element={
                  <AuthContext.Consumer>
                    {({ isAuthenticated }) =>
                      isAuthenticated ? <Navigate to="/" /> : <DriverRegister />
                    }
                  </AuthContext.Consumer>
                }
              />
              <Route
                path="/manager-login"
                element={
                  <AuthContext.Consumer>
                    {({ isAuthenticated }) =>
                      isAuthenticated ? <Navigate to="/" /> : <ManagerLogin />
                    }
                  </AuthContext.Consumer>
                }
              />
              <Route
                path="/manager-register"
                element={
                  <AuthContext.Consumer>
                    {({ isAuthenticated }) =>
                      isAuthenticated ? (
                        <Navigate to="/" />
                      ) : (
                        <ManagerRegister />
                      )
                    }
                  </AuthContext.Consumer>
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/register-car" element={<CarRegister />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/all-cars" element={<AllCars />} />
              <Route path="/available-cars" element={<AvailableCars />} />
              <Route path="/map" element={<MapSearch />} />
              <Route
                path="/my-rentals"
                element={
                  <AuthContext.Consumer>
                    {({ isAuthenticated }) =>
                      isAuthenticated ? <MyRentals /> : <Navigate to="/" />
                    }
                  </AuthContext.Consumer>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthContext.Consumer>
                    {({ isAuthenticated }) =>
                      isAuthenticated ? (
                        <Profile />
                      ) : (
                        <Navigate to="/selection" />
                      )
                    }
                  </AuthContext.Consumer>
                }
              />
              <Route path="/find-drivers" element={<FindDrivers />} />
              <Route path="/driver-profile/:id" element={<DriverProfile />} />
              <Route
                path="/appointments"
                element={
                  <AuthContext.Consumer>
                    {({ isAuthenticated }) =>
                      isAuthenticated ? (
                        <Appointments />
                      ) : (
                        <Navigate to="/selection" />
                      )
                    }
                  </AuthContext.Consumer>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
