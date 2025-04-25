import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import Navbar from './componant/Navbar';
import Footer from './componant/Footer';
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Cars from './Pages/Cars';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import RenterDashboard from './Pages/RenterDashboard ';
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
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <DotLoader color="#B6B6B6" loading={loading} size={200} />
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Cars" element={<Cars />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/RenterDashboard" element={<RenterDashboard />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
