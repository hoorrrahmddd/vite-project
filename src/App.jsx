import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import Navbar from './componant/Navbar';
import Footer from './componant/Footer';
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Cars from './Pages/Cars';
import Register from './Pages/Register';
import Login from './Pages/Login';
import RenterDashboard from './Pages/RenterDashboard ';
import RentDetails from './Pages/RentDetails'
import AdminDashboard from './Pages/AdminDashboard';
import CarOwnerDashboard from './Pages/CarOwnerDashboard';
import AddCar from './Pages/AddCar';
import EditCar from './Pages/EditCar';
import RefreshTokenHandler from './Pages/RefreshTokenHandler';
import Feedback from './componant/feedback';
import ApplyForRent from './Pages/ApplyForRent'; 
import PrivateRoute from './componant/PrivateRoute';
import PublicLayout from './Layout/PublicLayout';
import CarOwnerLayout from './Layout/CarOwnerLayout';
import AdminLayout from './Layout/AdminLayout';
import RenterLayout from './Layout/RenterLayout';
const App = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);

  return (
    <BrowserRouter>
      <RefreshTokenHandler />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <DotLoader color="#B6B6B6" loading={loading} size={200} />
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/"
              element=
              {<PublicLayout>
                <Home />
              </PublicLayout>} />

            <Route path="/About"
              element=
              {<PublicLayout>
                <About />
              </PublicLayout>} />

            <Route
              path="/Cars"
              element={
                <PublicLayout>
                  <Cars />
                </PublicLayout>
              }
            />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Register" element=
              {<PublicLayout>
                <Register />
              </PublicLayout>} />
            <Route path="/Login"
              element={
                <PublicLayout>
                  <Login />
                </PublicLayout>
              } />
            {/*Renter*/}
            <Route
              path="/RenterDashboard"
              element={
                <PrivateRoute allowedRoles={['Renter']}>
                <RenterLayout>
                <RenterDashboard />
                </RenterLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/Feedback/:id"
              element={
                <PrivateRoute allowedRoles={['Renter']}>
                   <RenterLayout>
                <RenterDashboard />
                </RenterLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/apply-rent/:carId"
              element={
                <PrivateRoute allowedRoles={['Renter']}>
                  <RenterLayout>
                <ApplyForRent />
                </RenterLayout>
                </PrivateRoute>
              }
            />
            {/*Admin */}

            <Route
              path="/AdminDashboard"
              element={
                <PrivateRoute allowedRoles={['Admin']}>
               <AdminLayout>
               <AdminDashboard />
               </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* CarOwner */}
            <Route
              path="/CarOwnerDashboard"
              element={
                <PrivateRoute allowedRoles={['CarOwner']}>
                  <CarOwnerLayout>
                    <CarOwnerDashboard />
                  </CarOwnerLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/AddCar"
              element={
                <PrivateRoute allowedRoles={['CarOwner']}>
                  <CarOwnerLayout>
                    <AddCar />
                  </CarOwnerLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/EditCar/:id"
              element={
                <PrivateRoute allowedRoles={['CarOwner']}>
                  <CarOwnerLayout>
                    <EditCar />
                  </CarOwnerLayout>
                </PrivateRoute>
              }
            />
          </Routes>

        </>
      )}
    </BrowserRouter>
  );
};

export default App;
