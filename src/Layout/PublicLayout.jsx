// src/layouts/PublicLayout.jsx

import React from 'react';
import Navbar from '../componant/Navbar';
import Footer from '../componant/Footer';
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
