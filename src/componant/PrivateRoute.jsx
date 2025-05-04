import React from 'react';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
         Please log in to access this page.
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
         You are not authorized to access this page.
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
