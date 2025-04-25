import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm py-6 text-center mt-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <h4 className="text-xl font-semibold tracking-widest text-white">
          CAR<span className="text-[#B6B6B6]">RENTAL</span>
        </h4>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} CarRental. All right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
